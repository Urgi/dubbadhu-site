import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient.js";

export function useCurriculumStats() {
  const [seriesCount, setSeriesCount] = useState(null);
  const [lessonCount, setLessonCount] = useState(null);

  useEffect(() => {
    let cancelled = false;
    if (!supabase) return;

    async function run() {
      try {
        const allowed = new Set(["admin_draft", "approved", "complete", "published"]);
        const { data: series, error: seriesErr } = await supabase
          .from("lesson_series")
          .select("id,series_status");
        if (seriesErr) throw seriesErr;

        const filtered = (series || []).filter((s) => {
          const st = typeof s?.series_status === "string" ? s.series_status : "";
          if (!st) return true;
          return allowed.has(st);
        });

        const ids = filtered.map((s) => s.id).filter(Boolean);
        let lessons = 0;
        if (ids.length) {
          const { count, error: lessonErr } = await supabase
            .from("lessons")
            .select("id", { count: "exact", head: true })
            .in("series_id", ids);
          if (lessonErr) throw lessonErr;
          lessons = count ?? 0;
        }

        if (!cancelled) {
          setSeriesCount(filtered.length);
          setLessonCount(lessons);
        }
      } catch {
        /* keep null — UI falls back to static copy */
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  return { seriesCount, lessonCount };
}
