// ============================================================
// database.ts — All Supabase database queries live here
// ============================================================
// WHY this file exists:
// Database access is the most likely layer to change — table
// names get renamed, columns get added, RLS policies shift.
// Centralizing queries here means the rest of the codebase
// never imports the Supabase client directly and never writes
// raw queries. If a table changes, you fix ONE file.
// ============================================================

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import {
  EventType,
  AvailabilityDay,
  AvailabilityTimeSlot,
} from "./types.ts";

// ─────────────────────────────────────────────────────────
// Client initialisation
// ─────────────────────────────────────────────────────────

/**
 * Creates a Supabase admin client using the SERVICE_ROLE key.
 *
 * WHY SERVICE_ROLE and not ANON:
 * This Edge Function fetches availability data that may be
 * protected by RLS. The service-role key bypasses RLS so the
 * function always has read access. In production, scope this
 * down with a dedicated Postgres role if you need tighter
 * security.
 *
 * WHY we create the client per-request:
 * Edge Functions are short-lived isolates. A module-level
 * singleton would work, but passing env vars explicitly keeps
 * the function testable and avoids stale connection issues.
 */
export function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = Deno.env.get("REMOTE_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL");
  const supabaseKey = Deno.env.get("REMOTE_SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables."
    );
  }

  return createClient(supabaseUrl, supabaseKey);
}

// ─────────────────────────────────────────────────────────
// Query: Fetch Event Type by ID
// ─────────────────────────────────────────────────────────

/**
 * Fetches a single event type by its UUID.
 *
 * WHY .single():
 * We expect exactly one row for a given UUID primary key.
 * .single() tells PostgREST to return a plain object instead
 * of an array, and to error if 0 or 2+ rows are found.
 *
 * @returns The event type row, or null if not found.
 */
export async function getEventType(
  client: SupabaseClient,
  eventTypeId: string
): Promise<EventType | null> {
  const { data, error } = await client
    .from("events_types")
    .select("id, title, duration, availability_id")
    .eq("id", eventTypeId)
    .single();

  // PostgREST returns an error with code PGRST116 when .single()
  // finds zero rows. We treat that as "not found" rather than a
  // server error.
  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch event type: ${error.message}`);
  }

  return data as EventType;
}

// ─────────────────────────────────────────────────────────
// Query: Find availability day matching weekday
// ─────────────────────────────────────────────────────────

/**
 * Finds the availability_day row that matches the given
 * schedule and weekday name.
 *
 * WHY we filter by schedule_id AND day:
 * A user can have multiple schedules. We need the day record
 * that belongs to the specific schedule linked to this event
 * type.
 *
 * @returns The matching day row, or null if the user has no
 *          availability configured for this weekday.
 */
export async function getAvailabilityDay(
  client: SupabaseClient,
  scheduleId: string,
  weekday: string
): Promise<AvailabilityDay | null> {
  const { data, error } = await client
    .from("availability_days")
    .select("id, schedule_id, day")
    .eq("schedule_id", scheduleId)
    .ilike("day", weekday)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch availability day: ${error.message}`);
  }

  return data as AvailabilityDay;
}

// ─────────────────────────────────────────────────────────
// Query: Fetch time slots for a given day
// ─────────────────────────────────────────────────────────

/**
 * Retrieves all time-slot windows for a specific
 * availability_day row.
 *
 * WHY order by start_time:
 * The slot generator expects windows in chronological order
 * so the output is naturally sorted for the client.
 *
 * @returns Array of time slots (may be empty if none configured).
 */
export async function getTimeSlots(
  client: SupabaseClient,
  dayId: string
): Promise<AvailabilityTimeSlot[]> {
  const { data, error } = await client
    .from("availability_time_slots")
    .select("id, day_id, start_time, end_time")
    .eq("day_id", dayId)
    .order("start_time", { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch time slots: ${error.message}`);
  }

  return (data ?? []) as AvailabilityTimeSlot[];
}
