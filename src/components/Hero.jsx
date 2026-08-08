import { useEffect, useState } from "react";
import { fetchTodayWordOfTheDay, wordOfTheDayDateLabel } from "../lib/wordOfTheDay.js";
import { HERO_BULLETS } from "../config/homeCopy.js";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";

const FALLBACK_WOTD = {
  oromo: "Akkam jirta?",
  english: "How are you?",
  partOfSpeech: "phrase",
  example: "",
};

function formatPos(pos) {
  const p = (pos || "").trim();
  if (!p) return "";
  const lower = p.toLowerCase();
  const abbr = {
    noun: "n.",
    verb: "v.",
    adjective: "adj.",
    adverb: "adv.",
    phrase: "phr.",
    interjection: "interj.",
  };
  return abbr[lower] || (p.length <= 6 ? `${p}.` : p);
}

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
  const pos = formatPos(word.partOfSpeech);

  return (
    <section className="product-hero" aria-labelledby="hero-heading">
      <div className="product-hero-bg" aria-hidden="true">
        <div className="product-hero-gradient" />
        <div className="product-hero-grid" />
      </div>

      <div className="product-hero-inner">
        <div className="product-hero-copy">
          <p className="product-hero-eyebrow">Dubbadhu · Afaan Oromo</p>
          <h1 id="hero-heading">The language learning platform for the Horn</h1>
          <ul className="product-hero-bullets">
            {HERO_BULLETS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="product-hero-actions">
            <AppStoreLink />
            <PlayStoreLink className="btn btn-secondary" />
            <a href="#curriculum" className="btn btn-secondary">
              Explore curriculum
            </a>
          </div>
        </div>

        <aside className="product-hero-aside" aria-label="Word of the day">
          <div className="hero-card">
            <div className="hero-card-top">
              <img
                className="hero-card-logo"
                src="/assets/talking.png"
                alt=""
                width={40}
                height={40}
              />
              <div>
                <div className="hero-card-app">Dubbadhu</div>
                <div className="hero-card-series">Afaan Oromo · Vocabulary</div>
              </div>
            </div>

            <article className="hero-card-dict" aria-live="polite">
              <div className="hero-card-dict-head">
                <p className="hero-card-label">Word of the day</p>
                <time className="hero-card-date" dateTime={new Date().toISOString().slice(0, 10)}>
                  {wordOfTheDayDateLabel()}
                </time>
              </div>
              <div className="hero-card-headword-row">
                <h3 className="hero-card-headword">{word.oromo}</h3>
                {pos ? <span className="hero-card-pos">{pos}</span> : null}
              </div>
              <p className="hero-card-def">{word.english}</p>
              {word.example ? (
                <p className="hero-card-example">&ldquo;{word.example}&rdquo;</p>
              ) : null}
            </article>
          </div>
          <div className="hero-card-glow" aria-hidden="true" />
        </aside>
      </div>

      <div className="product-hero-scroll" aria-hidden="true">
        <span>Scroll to explore</span>
      </div>
    </section>
  );
}
