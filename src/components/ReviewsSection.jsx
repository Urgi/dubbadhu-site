import useReveal from "../hooks/useReveal.js";
import { APP_STORE_REVIEWS, APP_STORE_TRUST } from "../config/homeCopy.js";
import { APP_STORE_REVIEWS_URL } from "../config/appLinks.js";
import { displayReviewerName } from "../lib/reviewerName.js";

function Stars({ count }) {
  const n = Math.max(0, Math.min(5, Number(count) || 0));
  return (
    <span className="review-stars" aria-label={`${n} out of 5 stars`}>
      {"★★★★★".slice(0, n)}
    </span>
  );
}

export default function ReviewsSection() {
  const ref = useReveal();

  return (
    <section className="reviews reviews--split reveal" id="reviews" ref={ref} aria-labelledby="reviews-heading">
      <header className="reviews-header">
        <p className="section-label">Learner voices</p>
        <h2 id="reviews-heading" className="section-title">
          Loved by people learning to speak
        </h2>
        <p className="section-lede">
          {`${APP_STORE_TRUST.ratingValue.toFixed(1)} from ${APP_STORE_TRUST.ratingCount} ratings on the ${APP_STORE_TRUST.storefrontLabel}.`}
        </p>
        <a
          className="reviews-source"
          href={APP_STORE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read reviews on the App Store
        </a>
      </header>

      <div className="reviews-list">
        {APP_STORE_REVIEWS.map((review) => (
          <figure key={review.title} className="review">
            <Stars count={review.stars} />
            <blockquote>
              <p>“{review.quote}”</p>
            </blockquote>
            <figcaption>
              <strong>{displayReviewerName(review.name)}</strong>
              <span>App Store review · {review.title}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
