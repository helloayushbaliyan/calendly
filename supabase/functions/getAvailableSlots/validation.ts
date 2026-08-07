// ============================================================
// validation.ts — Input validation for incoming requests
// ============================================================
// WHY this file exists:
// Validation logic is its own concern. By isolating it we can
// unit-test it without spinning up a Supabase client, and the
// main handler stays clean. Fail fast — bad input should never
// reach the database layer.
// ============================================================

import { SlotRequest } from "./types.ts";

/**
 * Validates the raw request body and returns a typed SlotRequest.
 *
 * Checks:
 * 1. Both `event_type_id` and `selected_date` are present.
 * 2. `selected_date` is a valid ISO date (YYYY-MM-DD) that
 *    JavaScript's Date constructor can parse without producing NaN.
 *
 * @throws {Error} with a descriptive message when validation fails.
 *         The caller converts this into a 400 response.
 */
export function validateRequest(body: Record<string, unknown>): SlotRequest {
  const { event_type_id, selected_date } = body;

  // --- Presence check ---
  // These are the two mandatory fields defined in the API contract.
  if (!event_type_id || !selected_date) {
    throw new Error(
      "Missing required fields: event_type_id and selected_date are both required."
    );
  }

  // --- Type check ---
  if (typeof event_type_id !== "string" || typeof selected_date !== "string") {
    throw new Error(
      "Invalid field types: event_type_id and selected_date must be strings."
    );
  }

  // --- Date format check ---
  // We expect "YYYY-MM-DD". The regex enforces the format, and the
  // Date constructor confirms it's an actual calendar date (e.g.
  // rejects "2026-02-30").
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(selected_date)) {
    throw new Error(
      "Invalid date format: selected_date must be in YYYY-MM-DD format."
    );
  }

  const parsed = new Date(selected_date + "T00:00:00");
  if (isNaN(parsed.getTime())) {
    throw new Error(
      "Invalid date: selected_date is not a real calendar date."
    );
  }

  return { event_type_id, selected_date };
}
