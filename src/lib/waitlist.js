/**
 * Waitlist signups use the same Supabase RPC as the Dubbadhu mobile app:
 * `check_and_join_waitlist(p_email, p_language)` (SECURITY DEFINER) → `waitlist_signups` (unique on lower(email)+language).
 *
 * Parity with app: `p_language` is the display language name (e.g. "Amharic", "Tigrinya"), same as
 * `EAST_AFRICA_LANGS[i].name` in `ProfileLanguageSelectScreen.js` / `OnboardingScreen.js` → `supabase.rpc(...)`.
 * Schema / RPC: Dubbadhu repo `supabase/migrations/20260313_create_waitlist_signups.sql` and
 * `20260314_waitlist_check_and_join_rpc.sql`.
 *
 * Use the same Supabase project as `SUPABASE_URL` / `SUPABASE_ANON_KEY` in the mobile app.
 */
import { createClient } from "@supabase/supabase-js";

const rawIosLang = import.meta.env.VITE_WAITLIST_IOS_LANGUAGE;
export const IOS_WEB_WAITLIST_LANGUAGE =
  typeof rawIosLang === "string" && rawIosLang.trim() ? rawIosLang.trim() : "Afaan Oromo";

const url = (import.meta.env.VITE_SUPABASE_URL || "").trim();
const anon = (import.meta.env.VITE_SUPABASE_ANON_KEY || "").trim();

let devMissingEnvWarned = false;

export async function joinWaitlist(email, languageName) {
  const trimmed = (email || "").trim();
  if (!trimmed || !trimmed.includes("@") || !trimmed.includes(".")) {
    return { ok: false, code: "validation", message: "Please enter a valid email address." };
  }
  if (!languageName || !String(languageName).trim()) {
    return { ok: false, code: "validation", message: "Missing language." };
  }
  if (!url || !anon) {
    if (import.meta.env.DEV && !devMissingEnvWarned) {
      devMissingEnvWarned = true;
      console.warn(
        "[dubbadhu-site] Waitlist: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env (same Supabase project as the app), then restart the dev server."
      );
    }
    return {
      ok: false,
      code: "configure",
      message:
        "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in a .env file (same values as the Dubbadhu app), rebuild for production, and redeploy.",
    };
  }

  const supabase = createClient(url, anon, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data: status, error } = await supabase.rpc("check_and_join_waitlist", {
    p_email: trimmed,
    p_language: String(languageName).trim(),
  });

  if (error) {
    return { ok: false, code: "rpc", message: error.message || "Could not reach the server. Try again." };
  }

  if (status === "already_on_list") {
    return {
      ok: true,
      code: "already_on_list",
      message: `You're already on the waitlist for ${languageName}. We'll notify you at ${trimmed} when it's available.`,
    };
  }
  if (status === "added") {
    return {
      ok: true,
      code: "added",
      message: `You're on the list! We'll notify you at ${trimmed} when ${languageName} is available on Dubbadhu.`,
    };
  }
  if (status === "invalid") {
    return { ok: false, code: "invalid", message: "Invalid email or language." };
  }

  return { ok: true, code: String(status || "ok"), message: "You're on the list!" };
}
