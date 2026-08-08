import EastAfricaPicker from "./EastAfricaPicker.jsx";
import SectionHeader from "./SectionHeader.jsx";

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
    label: "East African languages",
    detail: "Horn & beyond",
  },
];

export default function LanguagesSection() {
  return (
    <section className="languages languages--explorer" id="languages" aria-labelledby="languages-heading">
      <div className="languages-inner">
        <SectionHeader
          id="languages-heading"
          label="Explore the Dubbadhu range"
          title="Languages of the Horn and East Africa"
          lede="Select a region on the map to see what’s live and what’s next."
        />

        <ul className="languages-roadmap" aria-label="Language availability">
          {ROADMAP.map((item) => (
            <li key={item.status} className={`languages-roadmap-item languages-roadmap-item--${item.tone}`}>
              <span className={`roadmap-badge roadmap-badge--${item.tone}`}>{item.status}</span>
              <span className="languages-roadmap-label">{item.label}</span>
              <span className="languages-roadmap-detail">{item.detail}</span>
            </li>
          ))}
        </ul>

        <div id="country-picker-root" className="country-picker languages-map" aria-label="Regional language picker">
          <EastAfricaPicker />
        </div>
      </div>
    </section>
  );
}
