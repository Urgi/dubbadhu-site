import { useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import useReveal from "../hooks/useReveal.js";

const EMPTY =
  "Series covers aren’t available here right now. Open Dubbadhu on iOS or Android to see speaking series filmed with native speakers.";

function sortByOrder(a, b) {
  const ao = typeof a?.sort_order === "number" ? a.sort_order : 0;
  const bo = typeof b?.sort_order === "number" ? b.sort_order : 0;
  return ao - bo;
}

function coverUrl(row) {
  const url = typeof row?.list_cover_url === "string" ? row.list_cover_url.trim() : "";
  return url;
}

export default function EthiopiaProofSection() {
  const ref = useReveal();
  const [loading, setLoading] = useState(true);
  const [seriesRows, setSeriesRows] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      if (!supabase) {
        setLoading(false);
        return;
      }
      try {
        const { data, error } = await supabase
          .from("lesson_series")
          .select("id,title,sort_order,list_cover_url,series_status")
          .order("sort_order", { ascending: true });
        if (error) throw error;
        const allowed = new Set(["admin_draft", "approved", "complete", "published"]);
        const filtered = (data || []).filter((s) => {
          const st = typeof s?.series_status === "string" ? s.series_status : "";
          if (!st) return true;
          return allowed.has(st);
        });
        if (!cancelled) setSeriesRows(filtered);
      } catch {
        if (!cancelled) setSeriesRows([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void run();
    return () => {
      cancelled = true;
    };
  }, []);

  const series = useMemo(() => [...seriesRows].sort(sortByOrder), [seriesRows]);
  const withCover = useMemo(() => series.filter((s) => coverUrl(s)), [series]);
  const shown = (withCover.length ? withCover : series).slice(0, 3);
  const moreCount = Math.max(0, series.length - shown.length);

  return (
    <section className="ethiopia ethiopia--split reveal" id="ethiopia" ref={ref} aria-labelledby="ethiopia-heading">
      <div className="ethiopia-copy">
        <p className="section-label">Filmed with native speakers</p>
        <h2 id="ethiopia-heading" className="section-title">
          Filmed and validated in Ethiopia
        </h2>
        <p className="section-lede">
          Speaking conversations are validated by professional language teachers in Oromia, and filmed
          with native speakers.
        </p>
        {loading ? (
          <p className="curriculum-state" role="status">
            Loading series…
          </p>
        ) : null}
        {!loading && series.length === 0 ? <p className="curriculum-state">{EMPTY}</p> : null}
        {!loading && moreCount > 0 ? (
          <a className="proof-more" href="#download">
            <span className="proof-more-plus" aria-hidden="true">
              +
            </span>
            <span className="proof-more-copy">
              <span className="proof-more-label">Many more</span>
              <span className="proof-more-detail">Speaking series in the app</span>
            </span>
          </a>
        ) : null}
      </div>

      {!loading && shown.length > 0 ? (
        <div className="proof-carousel-wrap">
          <div className="proof-carousel">
            {shown.map((s) => {
              const cover = coverUrl(s);
              const title = s.title || s.id;
              return (
                <article key={s.id} className="proof-card">
                  <div className="proof-cover">
                    {cover ? (
                      <img src={cover} alt="" loading="lazy" decoding="async" />
                    ) : (
                      <div className="curriculum-cover-fallback" aria-hidden="true" />
                    )}
                  </div>
                  <h3>{title}</h3>
                </article>
              );
            })}
          </div>
        </div>
      ) : null}
    </section>
  );
}
