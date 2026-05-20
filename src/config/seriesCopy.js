/** Editorial copy for curriculum cards (keyed by lowercase title substring). */
const BY_TITLE = [
  {
    match: ["greeting", "hello", "salam"],
    focus: "Everyday hellos & introductions",
    blurb: "Start with phrases you hear at home, at the mosque, and on the phone with family.",
    statusNote: "Foundational series",
  },
  {
    match: ["family", "home"],
    focus: "Family & household",
    blurb: "Names, relationships, and the language of home—so visits feel natural, not rehearsed.",
    statusNote: "Conversation-first",
  },
  {
    match: ["food", "eat", "cooking"],
    focus: "Food & hospitality",
    blurb: "Order, cook, and share meals using the words that show up at every gathering.",
    statusNote: "Cultural context",
  },
  {
    match: ["travel", "market", "shop"],
    focus: "Out & about",
    blurb: "Markets, directions, and practical exchanges for trips back or life abroad.",
    statusNote: "Real situations",
  },
  {
    match: ["qubee", "script", "alphabet"],
    focus: "Qubee & reading",
    blurb: "Build literacy in the Latin Oromo alphabet with guided practice tied to pronunciation.",
    statusNote: "Reading foundation",
  },
  {
    match: ["vocab", "word"],
    focus: "Core vocabulary",
    blurb: "High-frequency words with native audio and clear translations you can reuse in speech.",
    statusNote: "Daily practice",
  },
];

const DEFAULT = {
  focus: "Structured lessons",
  blurb: "Video-led lessons with native speakers, pronunciation practice, and examples you can use in real conversation.",
  statusNote: "In the app",
};

export function launchLabel(seriesStatus) {
  const st = typeof seriesStatus === "string" ? seriesStatus : "";
  if (st === "published") return { label: "Launch series", tone: "live" };
  if (st === "approved" || st === "complete") return { label: "Ready in app", tone: "ready" };
  if (st === "admin_draft") return { label: "In production", tone: "draft" };
  return { label: "Coming with app", tone: "ready" };
}

export function seriesEditorial(title) {
  const t = (title || "").toLowerCase();
  for (const row of BY_TITLE) {
    if (row.match.some((m) => t.includes(m))) {
      return { focus: row.focus, blurb: row.blurb, statusNote: row.statusNote };
    }
  }
  return DEFAULT;
}
