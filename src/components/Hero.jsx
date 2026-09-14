import { useEffect, useState } from "react";
import { fetchTodayWordOfTheDay } from "../lib/wordOfTheDay.js";
import {
  HERO_EYEBROW,
  HERO_HEADLINE_AFTER,
  HERO_HEADLINE_ACCENT,
  HERO_HEADLINE_BEFORE,
  HERO_LEDE,
  HERO_SUPPORT,
} from "../config/homeCopy.js";
import AppStoreLink from "./AppStoreLink.jsx";
import HighlightsStrip from "./HighlightsStrip.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";

const FALLBACK_WOTD = {
  oromo: "Akkam jirta?",
  english: "How are you?",
};

export default function Hero() {
  const [wotd, setWotd] = useState(null);

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
        <p className="hero-eyebrow">{HERO_EYEBROW}</p>
        <h1 id="hero-heading">
          {HERO_HEADLINE_BEFORE ? <>{HERO_HEADLINE_BEFORE} </> : null}
          <span className="text-gradient">{HERO_HEADLINE_ACCENT}</span>{" "}
          {HERO_HEADLINE_AFTER}
        </h1>
        <p className="hero-lede">{HERO_LEDE}</p>
        {HERO_SUPPORT ? <p className="hero-support">{HERO_SUPPORT}</p> : null}
        <div className="hero-actions">
          <AppStoreLink className="btn btn-primary" placement="hero" />
          <PlayStoreLink className="btn btn-secondary" placement="hero" />
        </div>
        <p className="hero-wotd">
          Today · {word.oromo} — {word.english}
        </p>
      </div>

      <div className="hero-reviews">
        <div className="hero-reviews-media" aria-hidden="true">
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
          <div className="hero-reviews-mask" />
        </div>
        <div className="hero-reviews-content">
          <HighlightsStrip embedded />
        </div>
      </div>
    </section>
  );
}
