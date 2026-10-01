/** Dubbadhu on the App Store (com.afaanllc.dubbadhu) — canonical slug URL */
export const APP_STORE_URL =
  "https://apps.apple.com/us/app/dubbadhu-learn-afaan-oromo/id6765779408";

export const APP_STORE_LABEL = "Download on the App Store";

/** Dubbadhu on Google Play (com.afaanllc.dubbadhu) */
export const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=com.afaanllc.dubbadhu";

export const PLAY_STORE_LABEL = "Get it on Google Play";

/** Shared link for bios, ads, and QR codes. Desktop visitors land here. */
export const DOWNLOAD_PATH = "/download";

export const DOWNLOAD_APP_LABEL = "Download the app";

export const APP_STORE_REVIEWS_URL =
  "https://apps.apple.com/us/app/dubbadhu-learn-afaan-oromo/id6765779408?see-all=reviews";

/**
 * @param {"ios" | "android" | "desktop"} platform
 * @returns {{ platform: "ios" | "android" | "desktop", href: string, label: string, external: boolean }}
 */
export function downloadOffer(platform) {
  if (platform === "ios") {
    return { platform, href: APP_STORE_URL, label: APP_STORE_LABEL, external: true };
  }
  if (platform === "android") {
    return { platform, href: PLAY_STORE_URL, label: PLAY_STORE_LABEL, external: true };
  }
  return {
    platform: "desktop",
    href: DOWNLOAD_PATH,
    label: DOWNLOAD_APP_LABEL,
    external: false,
  };
}
