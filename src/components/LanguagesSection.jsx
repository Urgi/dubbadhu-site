import EastAfricaPicker from "./EastAfricaPicker.jsx";
import HighlightsStrip from "./HighlightsStrip.jsx";
import useReveal from "../hooks/useReveal.js";

const ROADMAP = [
  {
    status: "Available",
    tone: "live",
    label: "Afaan Oromo",
    detail: "iOS · Android",
  },
  {
    status: "In development",
    tone: "next",
    label: "Amharic · Tigrinya",
    detail: "Speaking curriculum",
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
    <section
      className="languages languages--with-reviews reveal"
      id="mission"
      ref={ref}
      aria-labelledby="mission-heading"
    >
      <div className="languages-intro">
        <p className="section-label">Languages</p>
        <h2 id="mission-heading" className="section-title">
          Dubbadhu means “Speak”
        </h2>
        <ul className="languages-roadmap languages-roadmap--plain" aria-label="Language availability">
          {ROADMAP.map((item) => (
            <li key={item.label} className={`languages-roadmap-plain languages-roadmap-plain--${item.tone}`}>
              <span className="languages-roadmap-label">{item.label}</span>
              <span className="languages-roadmap-meta">
                {item.status}
                {item.detail ? ` · ${item.detail}` : ""}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="languages-duo">
        <div
          id="country-picker-root"
          className="country-picker languages-map"
          aria-label="Regional language picker"
        >
          <div className="languages-map-card">
            <EastAfricaPicker />
          </div>
        </div>

        <HighlightsStrip embedded />
      </div>
    </section>
  );
}
