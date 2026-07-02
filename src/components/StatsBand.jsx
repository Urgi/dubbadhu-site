import { METRICS, EXPERIENCE_FEATURES } from "../config/homeCopy.js";
import { useCurriculumStats } from "../lib/useCurriculumStats.js";
import SectionHeader from "./SectionHeader.jsx";

export default function StatsBand() {
  const { seriesCount, lessonCount } = useCurriculumStats();

  const metrics = METRICS.map((m, i) => {
    if (i === 0 && lessonCount != null && lessonCount > 0) {
      return { ...m, value: String(lessonCount), label: "Lessons", detail: "Across all series" };
    }
    if (i === 2 && seriesCount != null && seriesCount > 0) {
      return { ...m, value: String(seriesCount), label: "Lesson series", detail: "In the curriculum" };
    }
    return m;
  });

  return (
    <section className="metrics-band" aria-label="Key metrics">
      <div className="metrics-band-inner">
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <p className="metric-value">{m.value}</p>
            <p className="metric-label">{m.label}</p>
            <p className="metric-detail">{m.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function IntroSection() {
  return (
    <section className="intro-band" id="experience" aria-labelledby="experience-heading">
      <div className="intro-band-inner">
        <SectionHeader
          id="experience-heading"
          label="The Dubbadhu experience"
          title="Language learning built for how you actually speak"
          lede="Every feature serves one goal: help you speak with confidence—not just memorize lists."
        />
        <div className="intro-stats">
          {EXPERIENCE_FEATURES.map((f) => (
            <article key={f.title} className="intro-stat-card">
              <p className="intro-stat-value">{f.value}</p>
              <h3 className="intro-stat-label">{f.title}</h3>
              <p className="intro-stat-detail">{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
