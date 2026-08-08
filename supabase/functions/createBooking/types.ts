// ============================================================
// types.ts — Central type definitions for createBooking
// ============================================================
// WHY this file exists:
// Centralized types keep the modules loosely coupled and provide
// a single source of truth for the data flowing through the function.
// ============================================================

// --- Request types ---

/**
 * The JSON body expected from the Guest Booking Screen.
 */
export interface BookingRequest {
  event_type_id: string;
  selected_date: string; // ISO format "YYYY-MM-DD"
  selected_slot: string; // "HH:MM"
  guest_name: string;
  guest_email: string;
  notes?: string;
}

// --- Database row types ---

export interface EventType {
  id: string;
  user_id: string; // the host
  duration: number;
  availability_id: string;
  title: string;
}

export interface AvailabilityDay {
  id: string;
  schedule_id: string;
  day: string;
}

export interface AvailabilityTimeSlot {
  id: string;
  day_id: string;
  start_time: string; // "HH:MM:SS"
  end_time: string;   // "HH:MM:SS"
}

export interface Booking {
  id: string;
  event_type_id: string;
  host_id: string;
  guest_name: string;
  guest_email: string;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}
