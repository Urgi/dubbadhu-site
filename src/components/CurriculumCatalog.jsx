import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";

function sortByOrder(a, b) {
  const ao = typeof a?.sort_order === "number" ? a.sort_order : 0;
  const bo = typeof b?.sort_order === "number" ? b.sort_order : 0;
  return ao - bo;
}

function coverForSeries(series) {
  const url = series?.list_cover_url;
  return typeof url === "string" && url.trim() ? url.trim() : null;
}

export default function CurriculumCatalog() {
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [seriesRows, setSeriesRows] = useState([]);
  const [lessonRows, setLessonRows] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) {
        setLoading(false);
        setErr("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
        return;
      }

      setLoading(true);
      setErr("");
      try {
        const { data: series, error: seriesErr } = await supabase
          .from("lesson_series")
          .select("id,title,sort_order,list_cover_url,series_status")
          .order("sort_order", { ascending: true });
        if (seriesErr) throw seriesErr;

        const allowed = new Set(["admin_draft", "approved", "complete", "published"]);
        const filteredSeries = (series || []).filter((s) => {
          const st = typeof s?.series_status === "string" ? s.series_status : "";
          // Backwards-compat: if status column is missing/null, show it (older DBs).
          if (!st) return true;
          return allowed.has(st);
        });

        const seriesIds = filteredSeries.map((s) => s.id).filter(Boolean);
        const { data: lessons, error: lessonErr } = await supabase
          .from("lessons")
          .select("id,series_id,lesson_number,title")
          .in("series_id", seriesIds);
        if (lessonErr) throw lessonErr;

        if (cancelled) return;
        setSeriesRows(Array.isArray(filteredSeries) ? filteredSeries : []);
        setLessonRows(Array.isArray(lessons) ? lessons : []);
      } catch (e) {
        if (cancelled) return;
        setErr(e?.message || "Could not load curriculum.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const bySeries = useMemo(() => {
    /** @type {Record<string, {id:string, title:string, n:number}[]>} */
    const bucket = {};
    for (const row of lessonRows) {
      const sid = row?.series_id;
      if (!sid) continue;
      if (!bucket[sid]) bucket[sid] = [];
      bucket[sid].push({
        id: String(row.id || ""),
        title: String(row.title || row.id || "").trim(),
        n: typeof row.lesson_number === "number" ? row.lesson_number : 0,
      });
    }
    for (const sid of Object.keys(bucket)) bucket[sid].sort((a, b) => a.n - b.n);
    return bucket;
  }, [lessonRows]);

  const series = useMemo(() => {
    return [...seriesRows].sort(sortByOrder);
  }, [seriesRows]);

  return (
    <section className="curriculum" id="curriculum">
      <div className="section-label">Curriculum</div>
      <h2 className="curriculum-head">Series & lessons</h2>
      <p className="curriculum-intro">
        Browse series and see what ships with the app.
      </p>

      {loading ? <p className="curriculum-state">Loading…</p> : null}
      {!loading && err ? <p className="curriculum-state curriculum-state--err">{err}</p> : null}

      {!loading && !err ? (
        <div className="curriculum-grid">
          {series.map((s) => {
            const cover = coverForSeries(s);
            const lessons = bySeries[s.id] || [];
            return (
              <article key={s.id} className="curriculum-card">
                <div className="curriculum-cover">
                  {cover ? (
                    <img className="curriculum-cover-img" src={cover} alt="" loading="lazy" />
                  ) : (
                    <div className="curriculum-cover-fallback" aria-hidden="true" />
                  )}
                </div>

                <div className="curriculum-card-body">
                  <div className="curriculum-series-title">{s.title || s.id}</div>
                  <div className="curriculum-series-meta">{lessons.length} lessons</div>
                  <div className="curriculum-series-note">Lessons released with app</div>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

