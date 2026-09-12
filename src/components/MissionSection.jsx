import useReveal from "../hooks/useReveal.js";
import { MISSION } from "../config/homeCopy.js";

export default function MissionSection() {
  const ref = useReveal();

  return (
    <section className="mission reveal" id="mission" ref={ref} aria-labelledby="mission-heading">
      <div className="mission-inner">
        <p className="section-label">{MISSION.label}</p>
        <h2 id="mission-heading" className="section-title">
          {MISSION.title}
        </h2>
        <p className="mission-lede">{MISSION.lede}</p>
        <p className="section-lede">{MISSION.body}</p>
        <p className="section-lede">{MISSION.welcome}</p>
        <p className="mission-languages">
          {MISSION.languages}{" "}
          <a href="/languages/">Language roadmap</a>
        </p>
      </div>
    </section>
  );
}
