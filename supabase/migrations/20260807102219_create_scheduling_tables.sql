-- ============================================================
-- Creates the 5 core scheduling tables for Schedly
-- + GRANTs read access to Supabase API roles
-- + inserts sample data so you can test getAvailableSlots
-- ============================================================

-- 1. Profiles (your users)
CREATE TABLE IF NOT EXISTS profiles (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid()
);

-- 2. Availability Schedules (a named schedule per user)
CREATE TABLE IF NOT EXISTS availability_schedules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT 'Default Schedule'
);

-- 3. Availability Days (which weekdays a schedule covers)
CREATE TABLE IF NOT EXISTS availability_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  schedule_id UUID NOT NULL REFERENCES availability_schedules(id) ON DELETE CASCADE,
  day TEXT NOT NULL CHECK (day IN ('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'))
);

-- 4. Availability Time Slots (time windows within a day)
CREATE TABLE IF NOT EXISTS availability_time_slots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_id UUID NOT NULL REFERENCES availability_days(id) ON DELETE CASCADE,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  CHECK (start_time < end_time)
);

-- 5. Event Types (the meeting types a user offers)
CREATE TABLE IF NOT EXISTS events_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(user_id) ON DELETE CASCADE,
  availability_id UUID NOT NULL REFERENCES availability_schedules(id) ON DELETE CASCADE,
  duration INTEGER NOT NULL DEFAULT 30,
  title TEXT NOT NULL
);

-- ============================================================
-- GRANT permissions to Supabase API roles
-- ============================================================
-- WHY: Newer Supabase versions do NOT auto-expose new tables.
-- Without these GRANTs, the service_role key gets
-- "permission denied" when querying via the Supabase JS client.
-- ============================================================

GRANT SELECT ON profiles TO anon, authenticated, service_role;
GRANT SELECT ON availability_schedules TO anon, authenticated, service_role;
GRANT SELECT ON availability_days TO anon, authenticated, service_role;
GRANT SELECT ON availability_time_slots TO anon, authenticated, service_role;
GRANT SELECT ON events_types TO anon, authenticated, service_role;

