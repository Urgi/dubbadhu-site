import EastAfricaPicker from "./EastAfricaPicker.jsx";
import useReveal from "../hooks/useReveal.js";

const ROADMAP = [
  {
    status: "Available",
    tone: "live",
    label: "Afaan Oromo",
    detail: "iOS · Android",
  },
  {
    status: "Next",
    tone: "next",
    label: "Amharic · Tigrinya",
    detail: "In development",
  },
  {
    status: "Planned",
    tone: "planned",
    label: "More Horn languages",
    detail: "After Amharic & Tigrinya",
  },
];

export default function LanguagesSection() {
  const ref = useReveal();

  return (
    <section className="languages languages--split reveal" id="mission" ref={ref} aria-labelledby="mission-heading">
      <div className="languages-copy">
        <p className="section-label">Languages</p>
        <h2 id="mission-heading" className="section-title">
          Dubbadhu means “speak”
        </h2>
        <p className="languages-lede">
          Speak with Confidence: native conversation, not flashcards. Afaan Oromo is on iOS and
          Android now. Amharic and Tigrinya are next.
        </p>

        <ul className="languages-roadmap languages-roadmap--stack" aria-label="Language availability">
          {ROADMAP.map((item) => (
            <li key={item.status} className={`languages-roadmap-item languages-roadmap-item--${item.tone}`}>
              <span className={`roadmap-badge roadmap-badge--${item.tone}`}>{item.status}</span>
              <span>
                <span className="languages-roadmap-label">{item.label}</span>
                <span className="languages-roadmap-detail">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div id="country-picker-root" className="country-picker languages-map" aria-label="Regional language picker">
        <EastAfricaPicker />
      </div>
    </section>
  );
}
