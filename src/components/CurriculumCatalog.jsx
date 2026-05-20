import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import { launchLabel, seriesEditorial } from "../config/seriesCopy.js";

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

  const series = useMemo(() => [...seriesRows].sort(sortByOrder), [seriesRows]);

  return (
    <section className="curriculum" id="curriculum" aria-labelledby="curriculum-heading">
      <div className="curriculum-header">
        <p className="section-label">Curriculum</p>
        <h2 id="curriculum-heading" className="section-title">
          The curriculum inside the app
        </h2>
        <p className="curriculum-intro">
          Live lesson series from the Dubbadhu catalog: native-speaker video, structured progression, and
          content developed with academic partners and language specialists.
        </p>
      </div>

      {loading ? (
        <p className="curriculum-state" role="status">
          Loading curriculum…
        </p>
      ) : null}
      {!loading && err ? (
        <p className="curriculum-state curriculum-state--err" role="alert">
          {err}
        </p>
      ) : null}

      {!loading && !err ? (
        <div className="curriculum-grid">
          {series.map((s) => {
            const cover = coverForSeries(s);
            const lessons = bySeries[s.id] || [];
            const title = s.title || s.id;
            const editorial = seriesEditorial(title);
            const status = launchLabel(s.series_status);
            return (
              <article key={s.id} className="curriculum-card">
                <div className="curriculum-cover">
                  {cover ? (
                    <img
                      className="curriculum-cover-img"
                      src={cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                    />
                  ) : (
                    <div className="curriculum-cover-fallback" aria-hidden="true" />
                  )}
                  <span className={`curriculum-badge curriculum-badge--${status.tone}`}>
                    {status.label}
                  </span>
                </div>

                <div className="curriculum-card-body">
                  <h3 className="curriculum-series-title">{title}</h3>
                  <p className="curriculum-series-focus">{editorial.focus}</p>
                  <p className="curriculum-series-blurb">{editorial.blurb}</p>
                  <dl className="curriculum-meta">
                    <div>
                      <dt>Lessons</dt>
                      <dd>{lessons.length || "—"}</dd>
                    </div>
                    <div>
                      <dt>Format</dt>
                      <dd>{editorial.statusNote}</dd>
                    </div>
                  </dl>
                </div>
              </article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
