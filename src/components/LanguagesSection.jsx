import EastAfricaPicker from "./EastAfricaPicker.jsx";

export default function LanguagesSection() {
  return (
    <section className="languages" id="languages" aria-labelledby="languages-heading">
      <div className="languages-header">
        <div className="languages-copy">
          <p className="section-label">Languages</p>
          <h2 id="languages-heading" className="section-title">
            Starting with Oromo, built for languages that deserve better tools
          </h2>
          <p className="languages-intro">
            Major apps rarely invest in Afaan Oromo, Amharic, or Tigrinya with the same depth they give
            European languages. Dubbadhu begins with <strong className="text-em">Afaan Oromo</strong>—40+
            million speakers, a living culture, and a diaspora that wants to pass it on. The map shows where we
            are headed next; each language will earn the same rigor, not a translated template.
          </p>
          <ul className="languages-roadmap">
            <li>
              <span className="roadmap-badge roadmap-badge--live">Now</span>
              <span>Afaan Oromo — launch language</span>
            </li>
            <li>
              <span className="roadmap-badge">Next</span>
              <span>Amharic &amp; Tigrinya — join the waitlist per language</span>
            </li>
            <li>
              <span className="roadmap-badge">Future</span>
              <span>More Horn &amp; East African languages as quality allows</span>
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
