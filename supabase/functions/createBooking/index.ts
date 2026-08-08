// ============================================================
// index.ts — Entry point for the createBooking Edge Function
// ============================================================
// WHY this file exists:
// This is the orchestrator. It handles the linear flow of validating
// the booking request, fetching related entities, verifying availability,
// and safely inserting the booking into the database.
// ============================================================

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

import { validateRequest } from "./validation.ts";
import {
  createSupabaseClient,
  getEventType,
  getAvailabilityDay,
  getTimeSlots,
  createBookingAtomic,
} from "./database.ts";
import { calculateBookingTimes, isWithinAvailability } from "./bookingLogic.ts";
import { successResponse, errorResponse, corsPreflightResponse } from "./response.ts";
// We reuse the date logic from getAvailableSlots since it's identical
import { getWeekdayFromDate } from "../getAvailableSlots/dateUtils.ts";

Deno.serve(async (req: Request): Promise<Response> => {
  // ── Step 0: Handle CORS ─────────────────────────────────
  if (req.method === "OPTIONS") {
    return corsPreflightResponse();
  }

  // ── Step 0.5: Enforce POST ─────────────────────────────
  if (req.method !== "POST") {
    return errorResponse(405, "Method not allowed. Use POST.");
  }

  try {
    // ── Step 1: Parse and validate request body ───────────
    const body = await req.json();
    const validatedReq = validateRequest(body);
    const {
      event_type_id,
      selected_date,
      selected_slot,
      guest_name,
      guest_email,
      notes,
    } = validatedReq;

    // ── Step 2: Initialise Supabase client ────────────────
    const supabase = createSupabaseClient();

    // ── Step 3: Fetch event & host details ────────────────
    const eventType = await getEventType(supabase, event_type_id);
    if (!eventType) {
      return errorResponse(404, "Event type not found.");
    }
    
    const host_id = eventType.user_id;
    const duration = eventType.duration;
    const availability_id = eventType.availability_id;

    // ── Step 4: Verify Date and Availability Day ──────────
    const weekday = getWeekdayFromDate(selected_date);
    const availabilityDay = await getAvailabilityDay(supabase, availability_id, weekday);
    
    if (!availabilityDay) {
      return errorResponse(400, "The host is not available on this day.");
    }

    // ── Step 5: Verify Time Slot against Availability ─────
    const timeSlots = await getTimeSlots(supabase, availabilityDay.id);
    
    const { start_time, end_time, start, end } = calculateBookingTimes(
      selected_slot,
      duration
    );

    if (!isWithinAvailability(start, end, timeSlots)) {
      return errorResponse(
        400,
        "The requested time slot is outside the host's availability."
      );
    }

    // ── Step 6: Create Booking (Atomic) ───────────────────
    // This calls our RPC which will lock, check for double bookings,
    // and insert all in one atomic transaction.
    const booking = await createBookingAtomic(supabase, {
      p_event_type_id: event_type_id,
      p_host_id: host_id,
      p_guest_name: guest_name,
      p_guest_email: guest_email,
      p_notes: notes,
      p_booking_date: selected_date,
      p_start_time: start_time,
      p_end_time: end_time,
      p_status: "confirmed",
    });

    // ── Step 7: Return Success ────────────────────────────
    return successResponse({
      success: true,
      message: "Booking created successfully.",
      booking,
    });
  } catch (error) {
    console.error("createBooking error:", error);

    const message = error instanceof Error ? error.message : "Internal server error";

    // Standardize error mapping based on message
    if (message === "CONFLICT_DETECTED") {
      return errorResponse(409, "This time slot is already booked.");
    }
    
    if (message.includes("Missing required") || message.includes("Invalid")) {
      return errorResponse(400, message);
    }

    return errorResponse(500, message);
  }
});
