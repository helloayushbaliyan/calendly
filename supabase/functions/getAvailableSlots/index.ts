// ============================================================
// index.ts — Entry point for the getAvailableSlots Edge Function
// ============================================================
// WHY this file exists:
// This is the orchestrator. It wires together validation,
// database queries, slot generation, and response building
// in a single linear flow. It should read like a recipe:
//
//   1. Validate input
//   2. Fetch event type
//   3. Convert date → weekday
//   4. Find matching availability day
//   5. Read time slots
//   6. Generate meeting slots
//   7. Return JSON
//
// No business logic lives here — each step delegates to a
// dedicated module. If this file grows beyond ~80 lines,
// something is wrong.
// ============================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { validateRequest } from "./validation.ts";
import { getWeekdayFromDate } from "./dateUtils.ts";
import {
  createSupabaseClient,
  getEventType,
  getAvailabilityDay,
  getTimeSlots,
} from "./database.ts";
import { generateSlots } from "./slotGenerator.ts";
import {
  successResponse,
  errorResponse,
  corsPreflightResponse,
} from "./response.ts";

// ─────────────────────────────────────────────────────────
// Edge Function handler
// ─────────────────────────────────────────────────────────

/**
 * Deno.serve is the Supabase Edge Function entry point.
 * Each incoming HTTP request triggers this callback.
 *
 * WHY Deno.serve and not export default:
 * Supabase Edge Functions run on the Deno runtime. Deno.serve
 * is the standard API for handling HTTP requests in Deno,
 * and it's what the Supabase platform expects.
 */
Deno.serve(async (req: Request): Promise<Response> => {
  // ── Step 0: Handle CORS preflight ──────────────────────
  // Browsers send an OPTIONS request before the real POST
  // when custom headers are present. We must respond to it.
  if (req.method === "OPTIONS") {
    return corsPreflightResponse();
  }

  // ── Step 0.5: Enforce POST method ─────────────────────
  // This endpoint only accepts POST requests. Reject anything
  // else immediately to avoid confusing error messages downstream.
  if (req.method !== "POST") {
    return errorResponse(405, "Method not allowed. Use POST.");
  }

  try {
    // ── Step 1: Parse and validate request body ───────────
    const body = await req.json();
    const { event_type_id, selected_date } = validateRequest(body);

    // ── Step 2: Initialise Supabase client ────────────────
    // Created per-request so env vars are always fresh and
    // the function stays stateless.
    const supabase = createSupabaseClient();

    // ── Step 3: Fetch event type from database ────────────
    const eventType = await getEventType(supabase, event_type_id);

    if (!eventType) {
      return errorResponse(404, "Event type not found.");
    }

    // ── Step 4: Extract what we need from event type ──────
    const { availability_id, duration } = eventType;

    // ── Step 5: Convert selected date to weekday ──────────
    // e.g. "2026-08-10" → "Monday"
    const weekday = getWeekdayFromDate(selected_date);

    // ── Step 6: Find matching availability day ────────────
    // If the user hasn't configured availability for this
    // weekday, we return an empty slots array (not an error).
    const availabilityDay = await getAvailabilityDay(
      supabase,
      availability_id,
      weekday
    );

    if (!availabilityDay) {
      return successResponse({
        event: {
          id: eventType.id,
          title: eventType.title,
          duration: eventType.duration,
        },
        selectedDate: selected_date,
        weekday,
        availability: {
          schedule_id: availability_id,
          day_id: "",
          timeSlots: [],
        },
        slots: [],
      });
    }

    // ── Step 7: Read time slots for that day ──────────────
    const timeSlots = await getTimeSlots(supabase, availabilityDay.id);

    // ── Step 8: Generate meeting slots ────────────────────
    // Pure function — takes time windows + duration, returns
    // an array of start times like ["09:00", "09:30", ...].
    const slots = generateSlots(timeSlots, duration);

    // ── Step 9: Return successful response ────────────────
    return successResponse({
      event: {
        id: eventType.id,
        title: eventType.title,
        duration: eventType.duration,
      },
      selectedDate: selected_date,
      weekday,
      availability: {
        schedule_id: availability_id,
        day_id: availabilityDay.id,
        timeSlots: timeSlots.map((ts) => ({
          start_time: ts.start_time,
          end_time: ts.end_time,
        })),
      },
      slots,
    });
  } catch (error) {
    // ── Global error handler ─────────────────────────────
    // Any unhandled throw (validation, DB, JSON parse) lands
    // here. We log the full error for debugging but return
    // a safe message to the client.
    console.error("getAvailableSlots error:", error);

    const message =
      error instanceof Error ? error.message : "Internal server error";

    // Validation errors get 400; everything else gets 500.
    const status = message.includes("Missing required")
      || message.includes("Invalid")
      ? 400
      : 500;

    return errorResponse(status, message);
  }
});
