import { useEffect, useState } from "react";
import { fetchTodayWordOfTheDay, wordOfTheDayDateLabel } from "../lib/wordOfTheDay.js";

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
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading">
            African languages,
            <br />
            <em>spoken with confidence</em>
          </h1>
          <p className="hero-tagline" aria-label="Speak, learn, preserve">
            Speak · Learn · Preserve
          </p>
          <p className="hero-sub">
            Dubbadhu means &ldquo;speak&rdquo; in Afaan Oromo. An African language learning platform where
            culture and language go hand in hand—Afaan Oromo on iOS, with structured lessons, native-speaker
            video, and pronunciation practice.
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn btn-primary">
              Get Dubbadhu
            </a>
            <a href="#curriculum" className="btn btn-secondary">
              See curriculum
            </a>
          </div>
          <ul className="hero-proof">
            <li>Interactive lessons</li>
            <li>Native-speaker video</li>
            <li>Pronunciation tools</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="false">
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
        </div>
      </div>
    </section>
  );
}
