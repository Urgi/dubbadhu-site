import EastAfricaPicker from "./EastAfricaPicker.jsx";

export default function LanguagesSection() {
  return (
    <section className="languages" id="languages" aria-labelledby="languages-heading">
      <div className="languages-header">
        <div className="languages-copy">
          <p className="section-label">Languages</p>
          <h2 id="languages-heading" className="section-title">
            Launch language and roadmap
          </h2>
          <p className="languages-intro">
            An African language learning platform. <strong className="text-em">Afaan Oromo</strong> on iOS
            today; Amharic, Tigrinya, and additional languages in development.
          </p>
          <ul className="languages-roadmap">
            <li>
              <span className="roadmap-badge roadmap-badge--live">Available</span>
              <span>Afaan Oromo · iOS</span>
            </li>
            <li>
              <span className="roadmap-badge">Next</span>
              <span>Amharic · Tigrinya</span>
            </li>
            <li>
              <span className="roadmap-badge">Planned</span>
              <span>More Horn &amp; East African languages</span>
            </li>
          </ul>
        </div>
        <div id="country-picker-root" className="country-picker" aria-label="Regional language picker">
          <EastAfricaPicker />
        </div>
      </div>
    </section>
  );
}
