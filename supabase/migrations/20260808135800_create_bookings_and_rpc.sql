-- ============================================================
-- Creates the bookings table and an atomic RPC to prevent
-- race-condition double bookings.
-- ============================================================

-- 1. Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  event_type_id UUID NOT NULL REFERENCES events_types(id) ON DELETE CASCADE,
  host_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_email TEXT NOT NULL,
  notes TEXT,
  booking_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (start_time < end_time)
);

-- GRANT permissions to Supabase API roles
GRANT SELECT, INSERT, UPDATE, DELETE ON bookings TO anon, authenticated, service_role;

-- 2. Atomic RPC for creating a booking safely
-- WHY: If two users book the same slot at the exact same millisecond, 
-- a simple SELECT then INSERT might result in a double booking.
-- This function locks the host's profile row for the duration of the transaction,
-- serializing concurrent requests for the same host.
CREATE OR REPLACE FUNCTION create_booking_atomic(
  p_event_type_id UUID,
  p_host_id UUID,
  p_guest_name TEXT,
  p_guest_email TEXT,
  p_booking_date DATE,
  p_start_time TIME,
  p_end_time TIME,
  p_status TEXT,
  p_notes TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_conflict_id UUID;
  v_new_booking_id UUID;
BEGIN
  -- 1. Lock the host's profile row to serialize concurrent booking requests
  -- for this specific host. This guarantees that only one request can check
  -- and insert for a host at a time.
  PERFORM 1 FROM profiles WHERE user_id = p_host_id FOR UPDATE;

  -- 2. Check for overlapping active bookings for the same host on the same date.
  -- Overlap condition: (Start A < End B) AND (End A > Start B)
  SELECT id INTO v_conflict_id
  FROM bookings
  WHERE host_id = p_host_id
    AND booking_date = p_booking_date
    AND status != 'cancelled'
    AND start_time < p_end_time
    AND end_time > p_start_time
  LIMIT 1;

  -- 3. If a conflict is found, abort the transaction
  IF v_conflict_id IS NOT NULL THEN
    RAISE EXCEPTION 'Double booking conflict detected.';
  END IF;

  -- 4. No conflict, perform the insert
  INSERT INTO bookings (
    event_type_id, host_id, guest_name, guest_email, 
    booking_date, start_time, end_time, status, notes
  )
  VALUES (
    p_event_type_id, p_host_id, p_guest_name, p_guest_email,
    p_booking_date, p_start_time, p_end_time, p_status, p_notes
  )
  RETURNING id INTO v_new_booking_id;

  -- 5. Return the created row as JSON
  RETURN (
    SELECT row_to_json(b)::jsonb 
    FROM bookings b 
    WHERE b.id = v_new_booking_id
  );
END;
$$;
