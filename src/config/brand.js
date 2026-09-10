/**
 * Canonical brand / product URLs for SEO, schema.org sameAs, and UI links.
 * Keep these in sync with App Store / Play / social profiles.
 */
export const SITE_URL = "https://dubbadhu.com";

export const INSTAGRAM_URL = "https://www.instagram.com/dubbadhu.app";
export const INSTAGRAM_HANDLE = "@dubbadhu.app";

export const TIKTOK_URL = "https://www.tiktok.com/@dubbadhu.app";
export const TIKTOK_HANDLE = "@dubbadhu.app";

export const SUPPORT_EMAIL = "support@afaantech.com";
export const COMPANY_NAME = "Afaan LLC";
export const PRODUCT_NAME = "Dubbadhu";

export { APP_STORE_URL, PLAY_STORE_URL } from "./appLinks.js";

/** Short facts LLMs and press can cite without ambiguity */
export const BRAND_FACTS = {
  oneLiner:
    "Dubbadhu is the speaking-first Afaan Oromo language learning app from Afaan LLC — native conversation, not flashcards. For learners in the Horn and US/diaspora families. Available on iOS and Android, with Amharic and Tigrinya coming next.",
  meaning: 'Dubbadhu means "speak" in Afaan Oromo.',
  availableLanguages: ["Afaan Oromo"],
  upcomingLanguages: ["Amharic", "Tigrinya"],
  platforms: ["iOS (App Store)", "Android (Google Play)"],
  website: SITE_URL,
  instagram: INSTAGRAM_URL,
  tiktok: TIKTOK_URL,
};
