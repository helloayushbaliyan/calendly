// ============================================================
// response.ts — Standardised HTTP response builders
// ============================================================
// WHY this file exists:
// Every response from this function needs the same headers
// (Content-Type, CORS) and the same JSON structure. Repeating
// that in every return statement is error-prone. These helpers
// guarantee consistency and make the handler code read like
// a story: "return success(…)" or "return error(400, …)".
// ============================================================

import { SlotResponse } from "./types.ts";

/**
 * Shared headers applied to every response.
 *
 * WHY Access-Control-Allow-Origin: *
 * During development and for public APIs, this lets any origin
 * call the function. In production, replace "*" with your
 * app's domain (e.g. "https://schedly.app") for security.
 */
const CORS_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

// ─────────────────────────────────────────────────────────
// Success response (200)
// ─────────────────────────────────────────────────────────

/**
 * Returns a 200 JSON response with the slot data.
 */
export function successResponse(data: SlotResponse): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: CORS_HEADERS,
  });
}

// ─────────────────────────────────────────────────────────
// Error response (configurable status code)
// ─────────────────────────────────────────────────────────

/**
 * Returns an error JSON response.
 *
 * WHY a separate `error` key:
 * Clients can always check `if (response.error)` to decide
 * whether the call succeeded. This avoids ambiguity between
 * "server returned empty slots" and "server returned an error".
 */
export function errorResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({ error: message }),
    {
      status,
      headers: CORS_HEADERS,
    }
  );
}

// ─────────────────────────────────────────────────────────
// CORS preflight response (204)
// ─────────────────────────────────────────────────────────

/**
 * Handles the browser's OPTIONS preflight request.
 *
 * WHY this is needed:
 * When the mobile app (or a browser client) sends a POST with
 * custom headers (Authorization, apikey), the browser first
 * sends an OPTIONS request. If we don't respond with the right
 * CORS headers, the actual POST never fires.
 */
export function corsPreflightResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
