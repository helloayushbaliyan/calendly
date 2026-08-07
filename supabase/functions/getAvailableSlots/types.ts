// ============================================================
// types.ts — Central type definitions for getAvailableSlots
// ============================================================
// WHY this file exists:
// Every module in this function needs to agree on the shape of
// data flowing through it. Keeping types in a single file
// prevents circular imports and makes refactoring painless.
// ============================================================

// --- Request types ---

/**
 * The JSON body the client sends to this Edge Function.
 * Both fields are required; validation.ts enforces this.
 */
export interface SlotRequest {
  event_type_id: string;
  selected_date: string; // ISO date string, e.g. "2026-08-10"
}

// --- Database row types ---

/**
 * Maps to the `event_types` table.
 * We only select the columns we need — never SELECT *.
 */
export interface EventType {
  id: string;
  title: string;
  duration: number;         // meeting length in minutes
  availability_id: string;  // FK → availability_schedules.id
}

/**
 * Maps to the `availability_days` table.
 * Each row represents one weekday an availability schedule covers.
 */
export interface AvailabilityDay {
  id: string;
  schedule_id: string;
  day: string; // e.g. "Monday", "Tuesday"
}

/**
 * Maps to the `availability_time_slots` table.
 * Defines a block of available time within a single day.
 * start_time / end_time are stored as PostgreSQL `time` — they
 * arrive as strings like "09:00:00" from the Supabase JS client.
 */
export interface AvailabilityTimeSlot {
  id: string;
  day_id: string;
  start_time: string; // "HH:MM:SS"
  end_time: string;   // "HH:MM:SS"
}

// --- Response types ---

/**
 * The shape of the successful JSON response returned to the client.
 * Matches the exact contract defined in the project spec.
 */
export interface SlotResponse {
  event: {
    id: string;
    title: string;
    duration: number;
  };
  selectedDate: string;
  weekday: string;
  availability: {
    schedule_id: string;
    day_id: string;
    timeSlots: {
      start_time: string;
      end_time: string;
    }[];
  };
  slots: string[]; // Generated meeting start times, e.g. ["09:00", "09:30"]
}
