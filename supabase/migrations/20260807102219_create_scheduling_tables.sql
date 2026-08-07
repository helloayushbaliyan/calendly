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
CREATE TABLE IF NOT EXISTS event_types (
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
GRANT SELECT ON event_types TO anon, authenticated, service_role;

-- ============================================================
-- SAMPLE DATA — so you can test immediately in Postman
-- ============================================================

-- Create a test user
INSERT INTO profiles (user_id)
VALUES ('11111111-1111-1111-1111-111111111111');

-- Create a schedule for that user
INSERT INTO availability_schedules (id, user_id, name)
VALUES ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Work Hours');

-- Add Monday availability
INSERT INTO availability_days (id, schedule_id, day)
VALUES ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Monday');

-- Add Tuesday availability
INSERT INTO availability_days (id, schedule_id, day)
VALUES ('44444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Tuesday');

-- Monday: 09:00 to 12:00
INSERT INTO availability_time_slots (day_id, start_time, end_time)
VALUES ('33333333-3333-3333-3333-333333333333', '09:00', '12:00');

-- Monday: 14:00 to 17:00 (afternoon block)
INSERT INTO availability_time_slots (day_id, start_time, end_time)
VALUES ('33333333-3333-3333-3333-333333333333', '14:00', '17:00');

-- Tuesday: 10:00 to 13:00
INSERT INTO availability_time_slots (day_id, start_time, end_time)
VALUES ('44444444-4444-4444-4444-444444444444', '10:00', '13:00');

-- Create a 30-minute event type linked to the schedule
INSERT INTO event_types (id, user_id, availability_id, duration, title)
VALUES (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  30,
  'Quick Chat'
);
