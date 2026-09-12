import SectionHeader from "./SectionHeader.jsx";
import {
  PAYWALL_BENEFITS,
  PAYWALL_COMMUNITY_IMPACT,
  PAYWALL_TAGLINE,
  PLAN_COMPARISON,
  WHY_UNIQUE,
} from "../config/productOffers.js";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";

export default function OffersSection() {
  return (
    <section className="offers" id="offers" aria-labelledby="offers-heading">
      <div className="offers-inner">
        <SectionHeader
          id="offers-heading"
          label="What you get with Dubbadhu"
          title={PAYWALL_TAGLINE}
          lede={`${PAYWALL_COMMUNITY_IMPACT}. Speaking-first African languages—native conversation, not flashcards. Amharic and Tigrinya are next.`}
        />

        <ul className="offers-benefits">
          {PAYWALL_BENEFITS.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>

        <div className="offers-unique">
          <h3 className="offers-unique-title">Why Dubbadhu is unique</h3>
          <div className="offers-unique-grid">
            {WHY_UNIQUE.map((item) => (
              <article key={item.title} className="offers-unique-card">
                <h4>{item.title}</h4>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="offers-compare-wrap">
          <h3 className="offers-unique-title">Free vs Premium</h3>
          <div className="offers-compare" role="table" aria-label="Free versus Premium features">
            <div className="offers-compare-row offers-compare-row--head" role="row">
              <span role="columnheader">Feature</span>
              <span role="columnheader">Free</span>
              <span role="columnheader">Premium</span>
            </div>
            {PLAN_COMPARISON.map((row) => (
              <div key={row.feature} className="offers-compare-row" role="row">
                <span role="cell">{row.feature}</span>
                <span role="cell">{row.free}</span>
                <span role="cell">{row.premium}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="offers-cta">
          <AppStoreLink />
          <PlayStoreLink className="btn btn-secondary" />
          <a href="/about" className="btn btn-secondary">
            Full product overview
          </a>
        </div>
      </div>
    </section>
  );
}
