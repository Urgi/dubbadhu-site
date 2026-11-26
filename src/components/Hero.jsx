import { useEffect, useState } from "react";
import { fetchTodayWordOfTheDay } from "../lib/wordOfTheDay.js";
import {
  HERO_HEADLINE_AFTER,
  HERO_HEADLINE_ACCENT,
  HERO_HEADLINE_BEFORE,
  HERO_LEDE,
  HERO_SUPPORT,
  PRODUCT_SCREENS,
} from "../config/homeCopy.js";
import DownloadButton from "./DownloadButton.jsx";
import HighlightsStrip from "./HighlightsStrip.jsx";

const FALLBACK_WOTD = {
  oromo: "Akkam jirta?",
  english: "How are you?",
};

const HERO_SCREEN = PRODUCT_SCREENS[0];

/** Phones get the poster image instead of the 2.4 MB video. */
function wantsHeroVideo() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  if (navigator.connection?.saveData) return false;
  return window.matchMedia("(min-width: 769px)").matches;
}

export default function Hero() {
  const [wotd, setWotd] = useState(null);
  const [showVideo, setShowVideo] = useState(false);

  useEffect(() => {
    setShowVideo(wantsHeroVideo());
  }, []);

  useEffect(() => {
    let cancelled = false;
    void fetchTodayWordOfTheDay().then((row) => {
      if (!cancelled && row) setWotd(row);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const word = wotd ?? FALLBACK_WOTD;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <h1 id="hero-heading">
          {HERO_HEADLINE_BEFORE ? <>{HERO_HEADLINE_BEFORE} </> : null}
          {HERO_HEADLINE_ACCENT}{" "}
          {HERO_HEADLINE_AFTER}
        </h1>
        <p className="hero-lede">{HERO_LEDE}</p>
        {HERO_SUPPORT ? <p className="hero-support">{HERO_SUPPORT}</p> : null}
        <div className="hero-actions">
          <DownloadButton className="btn btn-primary" placement="hero" />
        </div>
        <p className="hero-wotd">
          Today · {word.oromo} — {word.english}
        </p>
        <img
          className="hero-shot"
          src={HERO_SCREEN.src}
          alt={HERO_SCREEN.alt}
          width="1242"
          height="2688"
          decoding="async"
        />
      </div>

      <div className="hero-reviews">
        <div className="hero-reviews-media" aria-hidden="true">
          {showVideo ? (
            <video
              className="hero-reviews-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/assets/intro-poster.jpg"
            >
              <source src="/assets/IntroVideo.mp4" type="video/mp4" />
            </video>
          ) : (
            <img className="hero-reviews-video" src="/assets/intro-poster.jpg" alt="" />
          )}
          <div className="hero-reviews-mask" />
        </div>
        <div className="hero-reviews-content">
          <HighlightsStrip embedded />
        </div>
      </div>
    </section>
  );
}
