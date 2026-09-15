import useReveal from "../hooks/useReveal.js";
import { EAST_AFRICA_LANGS } from "../config/eastAfricaLanguagesConfig.js";

const LANGUAGE_INFO = EAST_AFRICA_LANGS.map((lang) => {
  const status =
    lang.id === 0
      ? { label: "Available now", tone: "live", meta: "iOS · Android" }
      : { label: "In development", tone: "next", meta: "Speaking curriculum" };

  return {
    name: lang.name,
    native: lang.native,
    family: lang.family,
    speakers: lang.speakers,
    fact: lang.facts[0],
    ...status,
  };
});

export default function LanguagesSection() {
  const ref = useReveal();

  return (
    <section
      className="languages languages--info reveal"
      id="mission"
      ref={ref}
      aria-labelledby="mission-heading"
    >
      <div className="languages-intro">
        <p className="section-label">Languages</p>
        <h2 id="mission-heading" className="section-title">
          Dubbadhu means “Speak”
        </h2>
      </div>

      <ul className="languages-info" aria-label="Language details">
        {LANGUAGE_INFO.map((lang) => (
          <li key={lang.name} className={`languages-info-item languages-info-item--${lang.tone}`}>
            <div className="languages-info-top">
              <h3 className="languages-info-name">{lang.name}</h3>
              <p className="languages-info-status">
                {lang.label}
                {lang.meta ? ` · ${lang.meta}` : ""}
              </p>
            </div>
            <p className="languages-info-meta">
              <span>{lang.native}</span>
              <span aria-hidden="true"> · </span>
              <span>{lang.family}</span>
              <span aria-hidden="true"> · </span>
              <span>{lang.speakers} speakers</span>
            </p>
            <p className="languages-info-fact">{lang.fact}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
