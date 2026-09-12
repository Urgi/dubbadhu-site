import useReveal from "../hooks/useReveal.js";
import { APP_STORE_TRUST, FEATURED_REVIEW } from "../config/homeCopy.js";
import { APP_STORE_REVIEWS_URL } from "../config/appLinks.js";

export default function TrustSection() {
  const ref = useReveal();
  const { ratingValue, ratingCount, storefrontLabel } = APP_STORE_TRUST;

  return (
    <section className="trust reveal" ref={ref} aria-labelledby="trust-heading">
      <div className="trust-inner">
        <a
          className="trust-rating"
          href={APP_STORE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <p className="trust-score">
            {ratingValue.toFixed(1)}
            <span className="trust-stars" aria-hidden="true">
              ★★★★★
            </span>
          </p>
          <p className="trust-meta" id="trust-heading">
            {ratingCount} ratings on the {storefrontLabel}
          </p>
        </a>

        <figure className="trust-quote">
          <blockquote>
            <p>“{FEATURED_REVIEW.quote}”</p>
          </blockquote>
          <figcaption>
            <strong>{FEATURED_REVIEW.name}</strong>
            <span>App Store review · {FEATURED_REVIEW.title}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
