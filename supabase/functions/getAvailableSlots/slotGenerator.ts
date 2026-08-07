// ============================================================
// slotGenerator.ts — Generates meeting time slots
// ============================================================
// WHY this file exists:
// Slot generation is pure business logic — it takes a time
// window and a duration and produces an array of start times.
// No database, no HTTP, no side effects. This makes it the
// easiest module to unit-test and the safest to refactor.
// ============================================================

import { AvailabilityTimeSlot } from "./types.ts";

/**
 * Generates all possible meeting start times within the given
 * availability windows for a specific meeting duration.
 *
 * ALGORITHM:
 * For each time-slot window (e.g. 09:00 → 12:00):
 *   1. Convert start_time and end_time to total minutes from
 *      midnight (e.g. "09:00" → 540, "12:00" → 720).
 *   2. Starting at `startMinutes`, add the duration repeatedly
 *      until `currentMinutes + duration > endMinutes`.
 *   3. Each `currentMinutes` value becomes a slot.
 *
 * WHY currentMinutes + duration <= endMinutes:
 * A 30-minute meeting starting at 11:30 ends at 12:00 — that
 * fits. But one starting at 11:31 would end at 12:01, which
 * exceeds the window. We must ensure the entire meeting fits
 * inside the availability window, not just the start time.
 *
 * @param timeSlots - Array of availability time windows
 * @param duration  - Meeting length in minutes
 * @returns Array of slot strings in "HH:MM" format, sorted chronologically
 */
export function generateSlots(
  timeSlots: AvailabilityTimeSlot[],
  duration: number
): string[] {
  const slots: string[] = [];

  for (const slot of timeSlots) {
    const startMinutes = timeToMinutes(slot.start_time);
    const endMinutes = timeToMinutes(slot.end_time);

    // Walk through the window in `duration`-minute steps.
    let current = startMinutes;
    while (current + duration <= endMinutes) {
      slots.push(minutesToTime(current));
      current += duration;
    }
  }

  return slots;
}

// ─────────────────────────────────────────────────────────
// Helper: "HH:MM" or "HH:MM:SS" → total minutes since midnight
// ─────────────────────────────────────────────────────────

/**
 * Converts a time string to minutes since midnight.
 *
 * WHY we support both "HH:MM" and "HH:MM:SS":
 * PostgreSQL `time` columns return "HH:MM:SS" through
 * Supabase JS, but users might send "HH:MM". Handling
 * both avoids brittle parsing.
 *
 * @param time - "09:00" or "09:00:00"
 * @returns 540 for "09:00"
 */
function timeToMinutes(time: string): number {
  const parts = time.split(":");
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  return hours * 60 + minutes;
}

// ─────────────────────────────────────────────────────────
// Helper: total minutes since midnight → "HH:MM"
// ─────────────────────────────────────────────────────────

/**
 * Converts minutes since midnight back to "HH:MM" format.
 *
 * WHY padStart(2, "0"):
 * Ensures single-digit hours and minutes get a leading zero
 * (e.g. 540 → "09:00", not "9:0").
 *
 * @param totalMinutes - e.g. 540
 * @returns "09:00"
 */
function minutesToTime(totalMinutes: number): string {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
