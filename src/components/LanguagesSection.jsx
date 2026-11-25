import { EAST_AFRICA_LANGS } from "../config/eastAfricaLanguagesConfig.js";

const LANGUAGE_INFO = EAST_AFRICA_LANGS.map((lang) => {
  const status =
    lang.id === 0
      ? { label: "Available now", tone: "live", meta: "iOS and Android" }
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
  return (
    <section
      className="languages languages--info"
      id="mission"
      aria-labelledby="mission-heading"
    >
      <div className="languages-intro">
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
                {lang.meta ? `, ${lang.meta}` : ""}
              </p>
            </div>
            <p className="languages-info-meta">
              {lang.native}, {lang.family}, {lang.speakers} speakers
            </p>
            <p className="languages-info-fact">{lang.fact}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
