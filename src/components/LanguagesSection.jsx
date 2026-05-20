import EastAfricaPicker from "./EastAfricaPicker.jsx";

export default function LanguagesSection() {
  return (
    <section className="languages" id="languages" aria-labelledby="languages-heading">
      <div className="languages-header">
        <div className="languages-copy">
          <p className="section-label">Languages</p>
          <h2 id="languages-heading" className="section-title">
            Starting with Oromo, expanding across the continent
          </h2>
          <p className="languages-intro">
            Underrepresented languages deserve the same depth, interactivity, and production quality learners
            expect elsewhere. Dubbadhu launches with <strong className="text-em">Afaan Oromo</strong>—one of
            Africa&apos;s most widely spoken languages—and grows deliberately into Amharic, Tigrinya, and more.
            Each language receives dedicated curriculum and native expertise, not a one-size-fits-all port.
          </p>
          <ul className="languages-roadmap">
            <li>
              <span className="roadmap-badge roadmap-badge--live">Now</span>
              <span>Afaan Oromo — launch language on iOS</span>
            </li>
            <li>
              <span className="roadmap-badge">Next</span>
              <span>Amharic &amp; Tigrinya — waitlist by language</span>
            </li>
            <li>
              <span className="roadmap-badge">Future</span>
              <span>Additional Horn &amp; East African languages as we scale</span>
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
