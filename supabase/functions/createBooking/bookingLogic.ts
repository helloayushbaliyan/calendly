// ============================================================
// bookingLogic.ts — Pure functions for time calculation
// ============================================================
// WHY this file exists:
// Calculating times and checking overlap is complex logic that
// shouldn't pollute the main handler or the database layer.
// ============================================================

import { AvailabilityTimeSlot } from "./types.ts";

/**
 * Calculates start and end times in "HH:MM:SS" format.
 * Expects selectedSlot as "HH:MM" and duration in minutes.
 */
export function calculateBookingTimes(selectedSlot: string, durationMinutes: number) {
  // Parse "HH:MM"
  const [hoursStr, minutesStr] = selectedSlot.split(":");
  const hours = parseInt(hoursStr, 10);
  const minutes = parseInt(minutesStr, 10);

  // Create a Date object at 1970-01-01 to manipulate time safely without timezones
  const start = new Date(1970, 0, 1, hours, minutes, 0, 0);
  
  // Calculate end time
  const end = new Date(start.getTime() + durationMinutes * 60000);

  // Format back to "HH:MM:SS" for Postgres
  const start_time = `${String(start.getHours()).padStart(2, "0")}:${String(start.getMinutes()).padStart(2, "0")}:00`;
  const end_time = `${String(end.getHours()).padStart(2, "0")}:${String(end.getMinutes()).padStart(2, "0")}:00`;

  return { start_time, end_time, start, end };
}

/**
 * Validates that the requested meeting fits entirely within one of the host's
 * availability time slots for the given day.
 */
export function isWithinAvailability(
  requestedStart: Date,
  requestedEnd: Date,
  availableSlots: AvailabilityTimeSlot[]
): boolean {
  for (const slot of availableSlots) {
    // Parse slot start and end times (HH:MM:SS)
    const [sHours, sMins, sSecs] = slot.start_time.split(":").map(Number);
    const [eHours, eMins, eSecs] = slot.end_time.split(":").map(Number);

    const slotStart = new Date(1970, 0, 1, sHours, sMins, sSecs || 0);
    const slotEnd = new Date(1970, 0, 1, eHours, eMins, eSecs || 0);

    // If the requested block fits perfectly inside this availability block
    if (requestedStart >= slotStart && requestedEnd <= slotEnd) {
      return true;
    }
  }

  return false;
}
