import { useEffect, useRef, useState } from "react";
import { PAYWALL_TAGLINE } from "../config/productOffers.js";
import { PRODUCT_FEATURES, PRODUCT_SCREENS } from "../config/homeCopy.js";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";

const FEATURE_HOLD_MS = 3200;

export default function ProductSection() {
  const ref = useRef(null);
  const [activeFeature, setActiveFeature] = useState(0);

  useEffect(() => {
    if (PRODUCT_FEATURES.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    let intervalId = 0;

    function start() {
      if (intervalId) return;
      intervalId = window.setInterval(() => {
        setActiveFeature((current) => (current + 1) % PRODUCT_FEATURES.length);
      }, FEATURE_HOLD_MS);
    }

    function stop() {
      window.clearInterval(intervalId);
      intervalId = 0;
    }

    if (!node || typeof IntersectionObserver === "undefined") {
      start();
      return () => stop();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0, rootMargin: "80px 0px 80px 0px" }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      stop();
    };
  }, []);

  return (
    <section className="product" id="product" ref={ref} aria-labelledby="product-heading">
      <div className="product-split">
        <div className="product-copy">
          <p className="section-label">Inside the app</p>
          <h2 id="product-heading" className="section-title">
            Native conversation, not flashcards
          </h2>
          <p className="section-lede">
            {PAYWALL_TAGLINE}. Premium includes native-speaker video and unlimited AI practice.
          </p>
          <div className="hero-actions">
            <AppStoreLink className="btn btn-primary" placement="product" />
            <PlayStoreLink className="btn btn-secondary" placement="product" />
          </div>
        </div>

        <div className="product-screens" aria-label="Official App Store screenshots">
          {PRODUCT_SCREENS.map((screen) => (
            <figure key={screen.src} className="product-screen">
              <img src={screen.src} alt={screen.alt} loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </div>

      <ol className="product-features">
        {PRODUCT_FEATURES.map((item, i) => (
          <li
            key={item.title}
            className={i === activeFeature ? "is-lit" : undefined}
          >
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
