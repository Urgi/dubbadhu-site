import { DOWNLOAD_PATH, downloadOffer } from "../config/appLinks.js";

/**
 * Link-preview and search crawlers. They must receive the fallback page, not a
 * store hop, so shared-link previews stay on dubbadhu.com. Real in-app browsers
 * (Instagram, TikTok) are not matched here.
 */
const PREVIEW_BOT_UA =
  /googlebot|adsbot-google|bingbot|applebot|duckduckbot|baiduspider|yandexbot|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|embedly|quora link preview|telegrambot|slackbot|discordbot|pinterestbot|redditbot|ia_archiver|\bcrawler\b|\bspider\b/i;

function normalizePath(pathname) {
  return (pathname || "/").replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
}

/**
 * Which store a visitor should use.
 * Returns "ios", "android", or "desktop" (desktop and unknown).
 *
 * Safe without a browser: missing navigator is treated as desktop so this can
 * run during server rendering without touching browser-only APIs.
 *
 * iPadOS 13+ often sends a desktop Safari user agent ("Macintosh") and omits
 * "iPad". Those devices still report a touchscreen via maxTouchPoints.
 *
 * @param {Navigator | { userAgent?: string, platform?: string, maxTouchPoints?: number, userAgentData?: { platform?: string } }} [nav]
 * @returns {"ios" | "android" | "desktop"}
 */
export function detectDownloadPlatform(nav) {
  const agent = nav ?? (typeof navigator !== "undefined" ? navigator : undefined);
  if (!agent) return "desktop";

  const ua = String(agent.userAgent || "");
  const platform = String(agent.platform || "");
  const uaPlatform = String(agent.userAgentData?.platform || "");
  const maxTouch = Number(agent.maxTouchPoints) || 0;

  if (/Android/i.test(ua) || uaPlatform === "Android") return "android";

  if (
    /iPad|iPhone|iPod/i.test(ua) ||
    platform === "iPad" ||
    platform === "iPhone" ||
    platform === "iPod" ||
    uaPlatform === "iOS"
  ) {
    return "ios";
  }

  const desktopClassApple =
    platform === "MacIntel" || uaPlatform === "macOS" || /Macintosh|Mac OS X/i.test(ua);

  if (desktopClassApple && maxTouch > 1) return "ios";

  return "desktop";
}

export function isPreviewBot(userAgent) {
  const ua = String(userAgent || "");
  // WhatsApp's link unfurl is a bare product token. Its in-app browser is a
  // normal Mozilla UA that also mentions WhatsApp, and should still redirect.
  if (/WhatsApp\//i.test(ua) && !/Mozilla\//i.test(ua)) return true;
  return PREVIEW_BOT_UA.test(ua);
}

/**
 * Store URL for a phone or tablet, or null when the fallback page should stay.
 * Preview bots always stay so unfurls are not sent to a store.
 *
 * @param {Navigator | { userAgent?: string, platform?: string, maxTouchPoints?: number, userAgentData?: { platform?: string } }} [nav]
 * @returns {string | null}
 */
export function mobileStoreRedirectUrl(nav) {
  const agent = nav ?? (typeof navigator !== "undefined" ? navigator : undefined);
  if (!agent || isPreviewBot(agent.userAgent)) return null;
  const platform = detectDownloadPlatform(agent);
  if (platform !== "ios" && platform !== "android") return null;
  return downloadOffer(platform).href;
}

/**
 * Leave /download for the matching store with location.replace.
 * Replace does not add a history entry, so Back does not bounce the visitor
 * onto this page and redirect them again. This is not an HTTP redirect, so
 * CDNs cannot cache a device-specific 301/302.
 *
 * @returns {boolean} true when navigation to a store was started
 */
export function redirectMobileStore() {
  if (typeof window === "undefined") return false;
  if (normalizePath(window.location.pathname) !== DOWNLOAD_PATH) return false;

  const href = mobileStoreRedirectUrl(window.navigator);
  if (!href || window.location.href === href) return false;

  try {
    window.location.replace(href);
    return true;
  } catch {
    return false;
  }
}
