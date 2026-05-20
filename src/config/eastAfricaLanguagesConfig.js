/**
 * East Africa languages selector — aligned with Dubbadhu `config/eastAfricaLanguagesConfig.js` facts/copy.
 * `pan` (tx, ty, s, optional origin) is tuned for the web picker.
 * Higher `ty` moves the map graphic **down** on screen (reveals the north Horn); lower/negative `ty` moves it **up** (clips the north).
 * `origin` is CSS `transform-origin` on the east map mover (helps Tigrinya zoom stay on the Horn).
 */

export const EAST_AFRICA_LANGS = [
  {
    name: "Afaan Oromo",
    native: "Afaan Oromoo",
    family: "Cushitic",
    speakers: "40M",
    id: 0,
    accent: "#c07828",
    pan: { tx: 2, ty: 11, s: 1.2, origin: "50% 52%" },
    facts: [
      "Africa's most spoken Cushitic language.",
      "Official language of Gadaa — earth's oldest recognized democracies.",
      "4th most spoken in all of the continent of Africa.",
    ],
  },
  {
    name: "Amharic",
    native: "አማርኛ",
    family: "Semitic",
    speakers: "57M",
    id: 1,
    accent: "#1e8c7a",
    pan: { tx: -3, ty: 9, s: 1.05, origin: "50% 50%" },
    facts: [
      "Written in Ge'ez script — second most spoken Semitic language after Arabic.",
      "Ethiopia's administrative language since the 13th century.",
      "Qine poetry hides 'gold' beneath 'wax' — practised in Orthodox churches for centuries.",
    ],
  },
  {
    name: "Tigrinya",
    native: "ትግርኛ",
    family: "Semitic",
    speakers: "10M",
    id: 2,
    accent: "#8b5cf6",
    /* Positive ty shifts the SVG down so the north Horn (Eritrea/Tigray) sits in the upper frame */
    pan: {
      tx: 2,
      ty: 21,
      s: 1.58,
      origin: "52% 30%",
    },
    facts: [
      "Uses Ge'ez script — not mutually intelligible with Amharic.",
      "Dominant in Tigray and Eritrea — home of the obelisks of Axum.",
      "Honorific pronouns encode gender, age, and social rank.",
    ],
  },
];

export const AFRICA_VIEW = { tx: 12, ty: 20, s: 0.62 };

export const AFRICA_ZOOM_END = {
  tx: -0.95,
  ty: -0.1,
  scale: 2.9,
};

export const AFRICA_ZOOM_MS = 1200;
export const HANDOFF_OVERLAP_MS = 300;
export const OROMIA_ZOOM_MS = 1650;
export const OROMIA_ZOOM_START_SCALE = 0.82;
export const OROMIA_ZOOM_FROM_RIGHT_OFFSET = 8;

/** Same as Dubbadhu onboarding / Profile language screen. */
export const LANGUAGE_IDS_WAITLIST = [1, 2];

/**
 * Value for Supabase RPC `check_and_join_waitlist` → column `waitlist_signups.language`.
 * Must stay identical to the mobile app: `p_language: EAST_AFRICA_LANGS[i].name`
 * (see Dubbadhu `ProfileLanguageSelectScreen.js` / `OnboardingScreen.js`).
 */
export function waitlistLanguageFromIndex(index) {
  if (!LANGUAGE_IDS_WAITLIST.includes(index)) return null;
  const lg = EAST_AFRICA_LANGS[index];
  return lg?.name?.trim() || null;
}
