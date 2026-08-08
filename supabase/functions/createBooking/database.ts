// ============================================================
// database.ts — All Supabase database queries live here
// ============================================================
// WHY this file exists:
// Centralizes all database logic so the rest of the app doesn't
// need to know about PostgREST or RPC syntax.
// ============================================================

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2";
import { EventType, AvailabilityDay, AvailabilityTimeSlot, Booking } from "./types.ts";

/**
 * Creates a Supabase admin client using the SERVICE_ROLE key.
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

export async function getEventType(
  client: SupabaseClient,
  eventTypeId: string
): Promise<EventType | null> {
  const { data, error } = await client
    .from("events_types")
    .select("id, user_id, title, duration, availability_id")
    .eq("id", eventTypeId)
    .single();

  if (error) {
    if (error.code === "PGRST116") return null;
    throw new Error(`Failed to fetch event type: ${error.message}`);
  }

  return data as EventType;
}

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

export async function getTimeSlots(
  client: SupabaseClient,
  dayId: string
): Promise<AvailabilityTimeSlot[]> {
  const { data, error } = await client
    .from("availability_time_slots")
    .select("id, day_id, start_time, end_time")
    .eq("day_id", dayId);

  if (error) {
    throw new Error(`Failed to fetch time slots: ${error.message}`);
  }

  return (data ?? []) as AvailabilityTimeSlot[];
}

/**
 * Calls the secure Postgres RPC to insert a booking while
 * preventing race-condition double bookings.
 */
export async function createBookingAtomic(
  client: SupabaseClient,
  payload: {
    p_event_type_id: string;
    p_host_id: string;
    p_guest_name: string;
    p_guest_email: string;
    p_booking_date: string;
    p_start_time: string;
    p_end_time: string;
    p_status: string;
    p_notes?: string;
  }
): Promise<Booking> {
  const { data, error } = await client.rpc("create_booking_atomic", payload);

  if (error) {
    // If our RPC threw the 'Double booking conflict detected.' exception
    if (error.message.includes("Double booking conflict")) {
      throw new Error("CONFLICT_DETECTED");
    }
    throw new Error(`Failed to create booking: ${error.message}`);
  }

  return data as Booking;
}
