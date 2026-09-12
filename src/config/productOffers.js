/**
 * Product offer / uniqueness copy — keep aligned with the mobile paywall:
 * Dubbadhu/config/paywallCopy.js + planEntitlements.js
 */

export const PAYWALL_TAGLINE =
  "Full access to every speaking conversation—current and new releases";

export const PAYWALL_COMMUNITY_IMPACT =
  "A portion of each plan supports East Africa communities";

/** @type {readonly string[]} */
export const PAYWALL_BENEFITS = [
  "All current and new speaking conversations, validated by professional language teachers in Oromia",
  "Conversation videos from native speakers",
  "Unlimited AI practice and translate feedback",
  "Vocabulary audio, quizzes, and lesson discussions",
];

/** Why Dubbadhu is unique — for About, search snippets, and LLM citation */
export const WHY_UNIQUE = [
  {
    title: "Teacher-validated in Oromia",
    body: "Speaking conversations are validated by professional language teachers in Oromia. Native conversation and speaking practice—not flashcards.",
  },
  {
    title: "Native-speaker conversation video",
    body: "Learn from real conversation videos filmed with native speakers so you hear how the language is actually spoken.",
  },
  {
    title: "Unlimited AI speaking practice",
    body: "Premium unlocks unlimited AI practice and translate feedback so you can rehearse until you sound confident.",
  },
  {
    title: "Built for the Horn",
    body: "Dubbadhu is built for African languages on iOS and Android. Amharic and Tigrinya are next. For the Horn—and for diaspora families retaining their language.",
  },
  {
    title: "Mission-backed learning",
    body: "A portion of each subscription plan supports East Africa communities.",
  },
];

/** Free vs Premium comparison (marketing mirror of planEntitlements) */
export const PLAN_COMPARISON = [
  {
    feature: "Speaking lessons",
    free: "First lesson free",
    premium: "All current & future lessons",
  },
  {
    feature: "Teacher-validated content (Oromia)",
    free: "Lesson 1",
    premium: "All lessons",
  },
  {
    feature: "Series videos from native speakers",
    free: "First video free",
    premium: "Full access",
  },
  {
    feature: "AI Practice & Translate feedback",
    free: "Limited weekly tokens",
    premium: "Unlimited",
  },
  {
    feature: "Vocabulary lists & quizzes",
    free: "Included",
    premium: "Included",
  },
  {
    feature: "Vocabulary word audio",
    free: "Word of the day",
    premium: "Full vocabulary audio",
  },
  {
    feature: "Lesson discussions",
    free: "Included",
    premium: "Included",
  },
];
