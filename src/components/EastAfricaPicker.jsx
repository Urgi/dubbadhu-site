import {
  useRef,
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  EAST_AFRICA_LANGS,
  AFRICA_ZOOM_END,
  AFRICA_ZOOM_MS,
  HANDOFF_OVERLAP_MS,
  OROMIA_ZOOM_MS,
  OROMIA_ZOOM_START_SCALE,
  OROMIA_ZOOM_FROM_RIGHT_OFFSET,
  LANGUAGE_IDS_WAITLIST,
} from "../config/eastAfricaLanguagesConfig.js";
import {
  mountEastAfricaMap,
  interpolatePan,
  setRegionVisibility,
} from "../map/buildEastAfricaMap.js";
import { joinWaitlist } from "../lib/waitlist.js";

/** CSS `transform-origin` for the east SVG mover; optional per language in config `pan`. */
function eastPanTransformOrigin(pan) {
  return pan?.origin ?? "50% 50%";
}

/** `#rrggbb` + alpha for shadows/borders from config accent strings */
function accentRGBA(hex, alpha) {
  const m = /^#?([0-9a-f]{6})$/i.exec(String(hex || "").trim());
  if (!m) return `rgba(255,255,255,${alpha})`;
  const n = parseInt(m[1], 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

/** Integer slide width so scrollLeft lines up when swiping LTR (fixes off-center Amharic after scrolling from the right). */
function carouselStepWidth(el) {
  if (!el) return 0;
  return Math.max(0, Math.floor(el.getBoundingClientRect().width || el.clientWidth));
}

export default function EastAfricaPicker() {
  const clipIdRef = useRef(
    `clip-${typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)}`
  );

  const mapBgRef = useRef(null);
  const africaLayerRef = useRef(null);
  const africaMoverRef = useRef(null);
  const eastLayerRef = useRef(null);
  const eastMoverRef = useRef(null);
  const bottomRef = useRef(null);
  const carouselRef = useRef(null);
  const layersRef = useRef(null);
  const lastEastTransformRef = useRef("");
  const eastAnimRef = useRef(null);
  const mapPhaseRef = useRef("africa");
  const oromiaHighlightRef = useRef(0);

  const [activeIndex, setActiveIndex] = useState(0);
  const [mapReady, setMapReady] = useState(false);
  const [footEmail, setFootEmail] = useState("");
  const [footMsg, setFootMsg] = useState("");
  const [footErr, setFootErr] = useState(false);
  const [footBusy, setFootBusy] = useState(false);
  const [footDone, setFootDone] = useState(false);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const measure = useCallback(() => {
    const el = mapBgRef.current;
    return { W: el?.clientWidth || 360, H: el?.clientHeight || 400 };
  }, []);

  const applyAfricaTransform = useCallback(
    (frac) => {
      const node = africaMoverRef.current;
      if (!node) return;
      const { W, H } = measure();
      const t0y = (H * 6) / 100;
      const endTx = W * AFRICA_ZOOM_END.tx;
      const endTy = t0y + H * AFRICA_ZOOM_END.ty;
      const endSc = AFRICA_ZOOM_END.scale;
      const tx = endTx * frac;
      const ty = t0y + (endTy - t0y) * frac;
      const sc = 1.1 + (endSc - 1.1) * frac;
      node.style.transform = `translate(${tx}px, ${ty}px) scale(${sc})`;
    },
    [measure]
  );

  const syncMapToLanguage = useCallback(
    (index) => {
      const eastMover = eastMoverRef.current;
      const layers = layersRef.current;
      if (!eastMover || !layers) return;
      const pan = EAST_AFRICA_LANGS[index].pan;
      const { W, H } = measure();
      eastMover.style.transformOrigin = eastPanTransformOrigin(pan);
      const target = interpolatePan(pan.tx, pan.ty, pan.s, W, H);
      const from = lastEastTransformRef.current || target;
      if (eastAnimRef.current) eastAnimRef.current.cancel();
      const anim = eastMover.animate(
        [{ transform: from }, { transform: target }],
        {
          duration: 520,
          easing: "cubic-bezier(0.175, 0.885, 0.32, 1.05)",
          fill: "forwards",
        }
      );
      eastAnimRef.current = anim;
      anim.finished.then(() => {
        lastEastTransformRef.current = target;
        eastMover.style.transform = target;
      });
      const oroHi =
        index === 0 ? Math.max(oromiaHighlightRef.current, 0.58) : 0.00001;
      setRegionVisibility(layers, index, oroHi);
    },
    [measure]
  );

  const syncCarouselSlideWidth = useCallback(() => {
    const c = carouselRef.current;
    if (!c) return;
    const w = carouselStepWidth(c);
    if (w > 0) c.style.setProperty("--picker-slide-w", `${w}px`);
  }, []);

  /** Match carousel block height to the visible slide so waitlist slides are not stretched to Oromo's badge row. */
  const syncCarouselHeight = useCallback(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    const track = carousel.firstElementChild;
    if (!track || track.children.length === 0) return;
    const w = carouselStepWidth(carousel);
    const idx =
      w > 0
        ? Math.min(
            EAST_AFRICA_LANGS.length - 1,
            Math.max(0, Math.round(carousel.scrollLeft / w))
          )
        : activeIndexRef.current;
    const slide = track.children.item(idx);
    if (!slide || !(slide instanceof HTMLElement)) return;
    const h = slide.getBoundingClientRect().height;
    if (h > 0) carousel.style.height = `${Math.ceil(h)}px`;
  }, []);

  /** Arrow / button navigation: set scroll first, then state (avoids fighting smooth scroll). */
  const goToIndex = useCallback((i) => {
    const c = carouselRef.current;
    const safe = Math.max(0, Math.min(EAST_AFRICA_LANGS.length - 1, i));
    const w = c ? carouselStepWidth(c) : 0;
    if (c && w) {
      c.scrollLeft = safe * w;
    }
    setActiveIndex(safe);
  }, []);

  /** After swipe / momentum: snap to nearest slide and sync index. Never snap mid-scroll — that broke arrow smooth scroll. */
  const onCarouselScrollEnd = useCallback(() => {
    const c = carouselRef.current;
    if (!c) return;
    const w = carouselStepWidth(c);
    if (!w) return;
    const i = Math.min(
      EAST_AFRICA_LANGS.length - 1,
      Math.max(0, Math.round(c.scrollLeft / w))
    );
    const target = i * w;
    if (Math.abs(c.scrollLeft - target) > 0.5) {
      c.scrollLeft = target;
    }
    setActiveIndex(i);
    requestAnimationFrame(() => {
      syncCarouselHeight();
    });
  }, [syncCarouselHeight]);

  useLayoutEffect(() => {
    const host = eastMoverRef.current;
    if (!host) return;
    const layers = mountEastAfricaMap(host, clipIdRef.current);
    layersRef.current = layers;
    return () => {
      host.replaceChildren();
      layersRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapReady) return;
    syncMapToLanguage(activeIndex);
  }, [activeIndex, mapReady, syncMapToLanguage]);

  useEffect(() => {
    const timeouts = [];
    let cancelled = false;

    const startHandoff = () => {
      if (cancelled) return;
      mapPhaseRef.current = "handoff";
      const { W, H } = measure();
      const eth = EAST_AFRICA_LANGS[1].pan;
      const orom = EAST_AFRICA_LANGS[0].pan;
      const eastLayer = eastLayerRef.current;
      const eastMover = eastMoverRef.current;
      const africaLayer = africaLayerRef.current;
      const layers = layersRef.current;
      const bottom = bottomRef.current;
      if (!eastLayer || !eastMover || !africaLayer || !layers || !bottom) return;

      eastLayer.style.display = "block";
      eastLayer.style.opacity = "0";

      eastLayer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, fill: "forwards" });
      africaLayer
        .animate([{ opacity: 1 }, { opacity: 0 }], { duration: 220, fill: "forwards" })
        .finished.then(() => {
          if (!cancelled) africaLayer.style.display = "none";
        });

      const fromT = interpolatePan(
        eth.tx + OROMIA_ZOOM_FROM_RIGHT_OFFSET,
        eth.ty,
        eth.s * OROMIA_ZOOM_START_SCALE,
        W,
        H
      );
      lastEastTransformRef.current = fromT;
      eastMover.style.transformOrigin = eastPanTransformOrigin(eth);
      eastMover.style.transform = fromT;
      setRegionVisibility(layers, 0, 0.01);
      const toT = interpolatePan(orom.tx, orom.ty, orom.s, W, H);
      eastMover.style.transformOrigin = eastPanTransformOrigin(orom);
      const zoomAnim = eastMover.animate(
        [{ transform: fromT }, { transform: toT }],
        {
          duration: OROMIA_ZOOM_MS,
          easing: "cubic-bezier(0.215, 0.61, 0.355, 1)",
          fill: "forwards",
        }
      );
      zoomAnim.finished.then(() => {
        if (cancelled) return;
        mapPhaseRef.current = "eastAfrica";
        oromiaHighlightRef.current = 1;
        lastEastTransformRef.current = toT;
        eastMover.style.transform = toT;
        setRegionVisibility(layers, activeIndexRef.current, 1);
        bottom.classList.add("country-picker-bottom--live");
        setMapReady(true);
      });
    };

    const t0 = window.setTimeout(() => {
      if (cancelled) return;
      mapPhaseRef.current = "africaZooming";
      const node = africaMoverRef.current;
      if (!node) return;
      const { W, H } = measure();
      const t0y = (H * 6) / 100;
      const endTx = W * AFRICA_ZOOM_END.tx;
      const endTy = t0y + H * AFRICA_ZOOM_END.ty;
      const endSc = AFRICA_ZOOM_END.scale;
      node.animate(
        [
          { transform: `translate(0px, ${t0y}px) scale(1.1)` },
          { transform: `translate(${endTx}px, ${endTy}px) scale(${endSc})` },
        ],
        { duration: AFRICA_ZOOM_MS, easing: "cubic-bezier(0.55, 0.055, 0.675, 0.19)" }
      );
      const tHand = window.setTimeout(startHandoff, AFRICA_ZOOM_MS - HANDOFF_OVERLAP_MS);
      timeouts.push(tHand);
    }, 1000);
    timeouts.push(t0);

    requestAnimationFrame(() => {
      applyAfricaTransform(0);
      syncCarouselSlideWidth();
      syncCarouselHeight();
    });

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [applyAfricaTransform, measure, syncCarouselSlideWidth, syncCarouselHeight]);

  useEffect(() => {
    setFootEmail("");
    setFootMsg("");
    setFootErr(false);
    setFootDone(false);
    setFootBusy(false);
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      if (!mapReady) return;
      if (eastAnimRef.current) eastAnimRef.current.cancel();
      const pan = EAST_AFRICA_LANGS[activeIndex].pan;
      const { W, H } = measure();
      const t = interpolatePan(pan.tx, pan.ty, pan.s, W, H);
      lastEastTransformRef.current = t;
      if (eastMoverRef.current) {
        eastMoverRef.current.style.transformOrigin = eastPanTransformOrigin(pan);
        eastMoverRef.current.style.transform = t;
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mapReady, activeIndex, measure]);

  useEffect(() => {
    const mapBg = mapBgRef.current;
    if (!mapBg) return;
    const ro = new ResizeObserver(() => {
      if (mapPhaseRef.current === "africa" && !mapReady) applyAfricaTransform(0);
    });
    ro.observe(mapBg);
    return () => ro.disconnect();
  }, [applyAfricaTransform, mapReady]);

  useEffect(() => {
    const c = carouselRef.current;
    if (!c) return;
    let t;
    const onScroll = () => {
      window.clearTimeout(t);
      t = window.setTimeout(onCarouselScrollEnd, 160);
    };
    c.addEventListener("scroll", onScroll, { passive: true });
    c.addEventListener("scrollend", onCarouselScrollEnd);
    return () => {
      c.removeEventListener("scroll", onScroll);
      c.removeEventListener("scrollend", onCarouselScrollEnd);
      window.clearTimeout(t);
    };
  }, [onCarouselScrollEnd]);

  useEffect(() => {
    const c = carouselRef.current;
    if (!c) return;
    const ro = new ResizeObserver(() => {
      syncCarouselSlideWidth();
      syncCarouselHeight();
      if (mapReady) {
        const w = carouselStepWidth(c);
        if (w > 0) {
          const safe = Math.max(0, Math.min(EAST_AFRICA_LANGS.length - 1, activeIndexRef.current));
          c.scrollLeft = safe * w;
        }
      }
    });
    ro.observe(c);
    return () => ro.disconnect();
  }, [syncCarouselSlideWidth, syncCarouselHeight, mapReady]);

  useEffect(() => {
    if (!mapReady) return;
    const c = carouselRef.current;
    if (!c) return;
    const w = carouselStepWidth(c);
    if (w > 0) {
      c.scrollLeft = activeIndexRef.current * w;
    }
    syncCarouselHeight();
  }, [mapReady, syncCarouselHeight]);

  useLayoutEffect(() => {
    syncCarouselSlideWidth();
    syncCarouselHeight();
  }, [activeIndex, mapReady, syncCarouselSlideWidth, syncCarouselHeight]);

  const lang = EAST_AFRICA_LANGS[activeIndex];

  const onFooterSubmit = async (e) => {
    e.preventDefault();
    setFootBusy(true);
    setFootMsg("");
    const res = await joinWaitlist(footEmail, lang.name);
    setFootBusy(false);
    setFootMsg(res.message || "");
    setFootErr(!res.ok);
    if (res.ok && (res.code === "added" || res.code === "already_on_list")) {
      setFootDone(true);
    }
  };

  return (
    <div className="country-picker-inner">
      <div ref={mapBgRef} className="country-picker-mapbg">
        <div ref={africaLayerRef} className="country-picker-africa-layer">
          <div ref={africaMoverRef} className="country-picker-africa-mover">
            <img
              className="country-picker-africa-img"
              src="/assets/Blank_Map-Africa.svg"
              alt=""
            />
          </div>
        </div>
        <div
          ref={eastLayerRef}
          className="country-picker-east-layer"
          style={{ display: "none" }}
        >
          <div ref={eastMoverRef} className="country-picker-east-mover" />
        </div>
        <div className="country-picker-grad country-picker-grad--top" />
        <div className="country-picker-grad country-picker-grad--bottom" />
      </div>

      <div className="country-picker-header">
        <div className="country-picker-header-eyebrow">Languages</div>
        <p className="country-picker-header-lede">Browse available languages on Dubbadhu on this map.</p>
      </div>

      <div ref={bottomRef} className="country-picker-bottom">
        <div className="country-picker-controls" aria-live="polite" aria-atomic="true">
          <div className="country-picker-langrow">
            <span className="country-picker-hint">Swipe or tap arrows</span>
            <div className="country-picker-arrows">
              <button
                type="button"
                className="country-picker-arrow"
                aria-label="Previous language"
                disabled={activeIndex === 0}
                onClick={() => goToIndex(activeIndex - 1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="country-picker-arrow"
                aria-label="Next language"
                disabled={activeIndex === EAST_AFRICA_LANGS.length - 1}
                onClick={() => goToIndex(activeIndex + 1)}
              >
                ›
              </button>
            </div>
          </div>

          <div className="country-picker-focus-well">
          <div ref={carouselRef} className="country-picker-carousel">
            <div className="country-picker-track">
              {EAST_AFRICA_LANGS.map((lg, i) => {
                const on = i === activeIndex;
                return (
                  <div key={lg.id} className="country-picker-slide">
                    <div
                      className="country-picker-slide-name"
                      style={{
                        color: on ? lg.accent : "rgba(240,230,208,0.28)",
                        transform: on ? "scale(1)" : "scale(0.88)",
                        textShadow: on
                          ? `0 0 36px ${accentRGBA(lg.accent, 0.5)}, 0 3px 18px rgba(0,0,0,0.55)`
                          : undefined,
                      }}
                    >
                      {lg.name}
                    </div>
                  <div
                    className="country-picker-slide-meta"
                    style={{ opacity: mapReady && on ? 1 : 0 }}
                  >
                    <span className="country-picker-slide-native" style={{ color: on ? lg.accent : undefined }}>
                      {lg.native}
                    </span>
                    <span className="country-picker-slide-sep"> • </span>
                    <span
                      className="country-picker-slide-speakers"
                      style={{ color: on ? "rgba(240,230,208,0.75)" : undefined }}
                    >
                      {lg.speakers} speakers
                    </span>
                  </div>
                  <div
                    className={
                      "country-picker-slide-badge-slot" +
                      (LANGUAGE_IDS_WAITLIST.includes(i)
                        ? " country-picker-slide-badge-slot--waitlist"
                        : "")
                    }
                  >
                    {mapReady && on && !LANGUAGE_IDS_WAITLIST.includes(i) ? (
                      <span className="country-picker-slide-badge">Available in app</span>
                    ) : null}
                  </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="country-picker-dots" aria-hidden="true">
            {EAST_AFRICA_LANGS.map((lg, i) => (
              <span
                key={lg.id}
                className={
                  "country-picker-dot" +
                  (i === activeIndex ? " country-picker-dot--on country-picker-dot--wide" : "")
                }
                style={{
                  backgroundColor:
                    i === activeIndex ? lg.accent : "rgba(240,230,208,0.2)",
                }}
              />
            ))}
          </div>
          </div>
        </div>

        <div className="country-picker-facts">
          {[0, 1, 2].map((fi) => (
            <div key={fi} className="country-picker-fact" style={{ borderLeftColor: lang.accent }}>
              <span className="country-picker-fact-txt">{lang.facts[fi]}</span>
            </div>
          ))}
        </div>

        <div className="country-picker-footer">
          {LANGUAGE_IDS_WAITLIST.includes(activeIndex) ? (
            <>
              <p
                className={
                  "country-picker-foot-hint" +
                  (activeIndex === 2 ? " country-picker-foot-hint--facts-gap" : "")
                }
              >
                We&apos;ll notify you when this language is available.
              </p>
              <form className="country-picker-foot-form" onSubmit={onFooterSubmit}>
                <input
                  className="country-picker-foot-input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="Email address"
                  required
                  value={footEmail}
                  disabled={footDone || footBusy}
                  onChange={(e) => setFootEmail(e.target.value)}
                />
                <button
                  type="submit"
                  className="country-picker-foot-btn country-picker-foot-btn--gold"
                  disabled={footDone || footBusy}
                >
                  {footDone ? "Joined ✓" : footBusy ? "…" : "Join waitlist"}
                </button>
              </form>
              {footMsg ? (
                <p
                  className={
                    "country-picker-foot-msg" +
                    (footErr ? " country-picker-foot-msg--err" : " country-picker-foot-msg--ok")
                  }
                  role="status"
                >
                  {footMsg}
                </p>
              ) : null}
            </>
          ) : (
            <div className="country-picker-foot-cta">
              <a className="country-picker-foot-link" href="#waitlist">
                iOS launch waitlist →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
