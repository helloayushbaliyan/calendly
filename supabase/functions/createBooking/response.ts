// ============================================================
// response.ts — Standardised HTTP response builders
// ============================================================
// WHY this file exists:
// Ensures every response has the exact same CORS headers and
// JSON structure. Follows the pattern in getAvailableSlots.
// ============================================================

const CORS_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey",
};

// ─────────────────────────────────────────────────────────
// Success response (201)
// ─────────────────────────────────────────────────────────

export function successResponse(data: Record<string, unknown>): Response {
  return new Response(JSON.stringify(data), {
    status: 201, // Created
    headers: CORS_HEADERS,
  });
}

// ─────────────────────────────────────────────────────────
// Error response (configurable status code)
// ─────────────────────────────────────────────────────────

export function errorResponse(status: number, message: string): Response {
  return new Response(
    JSON.stringify({ success: false, message }),
    {
      status,
      headers: CORS_HEADERS,
    }
  );
}

// ─────────────────────────────────────────────────────────
// CORS preflight response (204)
// ─────────────────────────────────────────────────────────

export function corsPreflightResponse(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}
