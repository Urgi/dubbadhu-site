/** Dubbadhu on the App Store (com.afaanllc.dubbadhu) — canonical slug URL */
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/dubbadhu-learn-afaan-oromo/id6765779408";

export const APP_STORE_LABEL = "Download on the App Store";

/** Dubbadhu on Google Play (com.afaanllc.dubbadhu) */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.afaanllc.dubbadhu";

export const PLAY_STORE_LABEL = "Get it on Google Play";

export const APP_STORE_REVIEWS_URL =
  "https://apps.apple.com/us/app/dubbadhu-learn-afaan-oromo/id6765779408?see-all=reviews";

/** Android UA prefers Play first; both stores still stay visible. */
export function prefersAndroidStore() {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}
