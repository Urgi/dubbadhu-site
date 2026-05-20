/**
 * Same RPC and UTC date as Dubbadhu Home (`get_word_of_the_day`).
 * @see Dubbadhu/features/HomeTab/HomeScreen.js
 */
import { supabase } from "./supabaseClient.js";

export function utcTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

/** Display date for WOTD header (matches HomeScreen `toDateString()`). */
export function wordOfTheDayDateLabel() {
  return new Date().toDateString();
}

/**
 * @returns {Promise<{
 *   oromo: string;
 *   english: string;
 *   partOfSpeech: string;
 *   example: string;
 * } | null>}
 */
export async function fetchTodayWordOfTheDay() {
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("get_word_of_the_day", {
    p_date: utcTodayDateString(),
  });
  if (error) return null;

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;

  const oromo = String(row.oromo || "").trim();
  const english = String(row.english || "").trim();
  if (!oromo || !english) return null;

  return {
    oromo,
    english,
    partOfSpeech: String(row.part_of_speech || "").trim(),
    example: String(row.example || "").trim(),
  };
}
