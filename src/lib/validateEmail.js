/** Client-side email check before RPC (server still validates). */
export function isValidEmail(value) {
  const trimmed = (value || "").trim();
  if (!trimmed || trimmed.length > 254) return false;
  // Practical RFC-ish pattern — not exhaustive; Supabase RPC is source of truth.
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed);
}
