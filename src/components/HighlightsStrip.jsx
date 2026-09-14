import { useEffect, useState } from "react";
import {
  APP_STORE_REVIEWS,
  APP_STORE_TRUST,
  FEATURED_REVIEW,
} from "../config/homeCopy.js";
import { APP_STORE_REVIEWS_URL } from "../config/appLinks.js";
import { displayReviewerName } from "../lib/reviewerName.js";

const REVIEWS = [FEATURED_REVIEW, ...APP_STORE_REVIEWS];
const HOLD_MS = 7000;
const FADE_MS = 420;

export default function HighlightsStrip({ embedded = false }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (REVIEWS.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let fadeTimer = 0;
    const tick = window.setInterval(() => {
      setVisible(false);
      fadeTimer = window.setTimeout(() => {
        setIndex((current) => (current + 1) % REVIEWS.length);
        setVisible(true);
      }, FADE_MS);
    }, HOLD_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(fadeTimer);
    };
  }, []);

  const review = REVIEWS[index];
  const Tag = embedded ? "aside" : "section";
  const className = embedded ? "highlights highlights--embedded" : "highlights";

  return (
    <Tag className={className} id="highlights" aria-labelledby="highlights-heading">
      {!embedded ? <div className="highlights-dots" aria-hidden="true" /> : null}

      <header className="highlights-header">
        <p className="highlights-kicker" id="highlights-heading">
          Reviews
        </p>
        <p className="highlights-rating">
          App Store · {APP_STORE_TRUST.ratingValue.toFixed(1)} from{" "}
          {APP_STORE_TRUST.ratingCount} ratings
        </p>
      </header>

      <div className="highlights-stage">
        <div
          className={`highlights-focus${visible ? " is-in" : ""}`}
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="highlights-stars" aria-hidden="true">
            ★★★★★
          </p>
          <blockquote className="highlights-quote">
            <p>{review.quote}</p>
          </blockquote>
          <p className="highlights-person">
            <strong>{displayReviewerName(review.name)}</strong>
          </p>
        </div>
      </div>

      <p className="highlights-footer">
        <a href={APP_STORE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
          Read more on the App Store
        </a>
      </p>
    </Tag>
  );
}
