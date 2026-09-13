import { useEffect, useState } from "react";
import { fetchTodayWordOfTheDay } from "../lib/wordOfTheDay.js";
import {
  APP_STORE_REVIEWS,
  APP_STORE_TRUST,
  FEATURED_REVIEW,
  HERO_EYEBROW,
  HERO_HEADLINE,
  HERO_LEDE,
  HERO_SUPPORT,
} from "../config/homeCopy.js";
import { APP_STORE_REVIEWS_URL } from "../config/appLinks.js";
import { displayReviewerName } from "../lib/reviewerName.js";

const FALLBACK_WOTD = {
  oromo: "Akkam jirta?",
  english: "How are you?",
};

const HERO_REVIEWS = [FEATURED_REVIEW, ...APP_STORE_REVIEWS];
const HOLD_MS = 6400;
const FADE_MS = 520;

export default function Hero() {
  const [wotd, setWotd] = useState(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    void fetchTodayWordOfTheDay().then((row) => {
      if (!cancelled && row) setWotd(row);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (HERO_REVIEWS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let fadeTimer = 0;
    const tick = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % HERO_REVIEWS.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  const word = wotd ?? FALLBACK_WOTD;
  const review = HERO_REVIEWS[index];

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="hero-eyebrow">{HERO_EYEBROW}</p>
        <h1 id="hero-heading">{HERO_HEADLINE}</h1>
        <p className="hero-lede">{HERO_LEDE}</p>
        <p className="hero-support">{HERO_SUPPORT}</p>
        <p className="hero-wotd">
          Today · {word.oromo} — {word.english}
        </p>
      </div>

      <div className="hero-visual">
        <figure className="hero-review">
          <div className="hero-review-brand">
            <img
              className="hero-review-logo"
              src="/assets/talking.png"
              alt="Dubbadhu"
              width={160}
              height={160}
            />
            <span className="hero-review-stars" aria-hidden="true">
              ★★★★★
            </span>
          </div>
          <div
            className={`hero-review-swap${visible ? " is-in" : ""}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <blockquote>
              <p>“{review.quote}”</p>
            </blockquote>
            <figcaption>
              <strong>{displayReviewerName(review.name)}</strong>
            </figcaption>
          </div>
          <p className="hero-review-meta">
            App Store · {APP_STORE_TRUST.ratingValue.toFixed(1)} from {APP_STORE_TRUST.ratingCount} ratings
          </p>
          <a
            className="hero-review-link"
            href={APP_STORE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            Read reviews
          </a>
        </figure>
      </div>
    </section>
  );
}
