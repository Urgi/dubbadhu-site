/**
 * Show first name + last initial. Leave App Store handles as-is.
 */
export function displayReviewerName(name) {
  const raw = String(name || "").trim();
  if (!raw) return "";

  const parts = raw.split(/\s+/);
  if (parts.length < 2) return raw;

  const first = parts[0];
  const lastLetters = parts[parts.length - 1].replace(/[^A-Za-z]/g, "");
  if (!lastLetters) return raw;

  return `${first} ${lastLetters[0].toUpperCase()}.`;
}
