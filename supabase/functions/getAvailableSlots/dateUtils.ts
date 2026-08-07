// ============================================================
// dateUtils.ts — Date conversion helpers
// ============================================================
// WHY this file exists:
// Converting a date string to a weekday name is a small but
// important piece of business logic. Extracting it keeps the
// main handler declarative and makes the mapping testable.
// ============================================================

/**
 * Converts an ISO date string ("YYYY-MM-DD") into the full
 * English weekday name ("Monday", "Tuesday", etc.).
 *
 * WHY we append "T00:00:00":
 * Without a time component, `new Date("2026-08-10")` is parsed
 * as UTC midnight. Depending on the server's timezone offset,
 * `getDay()` could return the wrong day. Appending T00:00:00
 * forces local-time interpretation, which keeps the weekday
 * consistent with what the user intended.
 *
 * @param dateString - e.g. "2026-08-10"
 * @returns Full weekday name, e.g. "Monday"
 */
export function getWeekdayFromDate(dateString: string): string {
  // Map of JS getDay() indices → weekday names.
  // getDay() returns 0 for Sunday, 1 for Monday, etc.
  const weekdays: string[] = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateString + "T00:00:00");
  return weekdays[date.getDay()];
}
