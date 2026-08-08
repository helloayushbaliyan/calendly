// ============================================================
// validation.ts — Input validation for incoming requests
// ============================================================
// WHY this file exists:
// Validation logic is isolated here to fail fast before hitting
// the database, keeping the main handler clean.
// ============================================================

import { BookingRequest } from "./types.ts";

/**
 * Validates the raw request body and returns a typed BookingRequest.
 */
export function validateRequest(body: Record<string, unknown>): BookingRequest {
  const {
    event_type_id,
    selected_date,
    selected_slot,
    guest_name,
    guest_email,
    notes,
  } = body;

  // --- Presence check ---
  if (
    !event_type_id ||
    !selected_date ||
    !selected_slot ||
    !guest_name ||
    !guest_email
  ) {
    throw new Error(
      "Missing required fields: event_type_id, selected_date, selected_slot, guest_name, and guest_email are required."
    );
  }

  // --- Type check ---
  if (
    typeof event_type_id !== "string" ||
    typeof selected_date !== "string" ||
    typeof selected_slot !== "string" ||
    typeof guest_name !== "string" ||
    typeof guest_email !== "string" ||
    (notes !== undefined && typeof notes !== "string")
  ) {
    throw new Error("Invalid field types. Expected strings.");
  }

  // --- Date format check ---
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(selected_date)) {
    throw new Error("Invalid date format: selected_date must be in YYYY-MM-DD format.");
  }

  const parsedDate = new Date(selected_date + "T00:00:00");
  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date: selected_date is not a real calendar date.");
  }

  // --- Time format check ---
  const timeRegex = /^\d{2}:\d{2}$/;
  if (!timeRegex.test(selected_slot)) {
    throw new Error("Invalid time format: selected_slot must be in HH:MM format.");
  }

  // --- Email format check ---
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(guest_email)) {
    throw new Error("Invalid email format: guest_email is not valid.");
  }

  return {
    event_type_id: event_type_id.trim(),
    selected_date,
    selected_slot,
    guest_name: guest_name.trim(),
    guest_email: guest_email.trim(),
    notes: notes ? notes.trim() : undefined,
  };
}
