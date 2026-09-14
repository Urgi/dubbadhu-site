import { useEffect, useState } from "react";
import { CAREERS_ROLES, CAREERS_TRACKS } from "../config/careers.js";
import { applyPathForRole } from "../lib/routes.js";
import useReveal from "../hooks/useReveal.js";

function stepFromLocation() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (hash === "careers-roles") return "roles";
  return "learn";
}

function setHash(hash) {
  const next = `#${hash}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${next}`);
  }
}

export default function CareersSection() {
  const ref = useReveal();
  const [step, setStep] = useState(() =>
    typeof window !== "undefined" ? stepFromLocation() : "learn"
  );

  useEffect(() => {
    const sync = () => setStep(stepFromLocation());
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function goLearn() {
    setStep("learn");
    setHash("careers");
  }

  function goRoles() {
    setStep("roles");
    setHash("careers-roles");
  }

  return (
    <section className="careers reveal" id="careers" ref={ref} aria-labelledby="careers-heading">
      <ol className="careers-steps" aria-label="Application steps">
        <li className={step === "learn" ? "is-current" : ""}>Learn</li>
        <li className={step === "roles" ? "is-current" : ""}>Roles</li>
        <li>Apply</li>
      </ol>

      {step === "learn" ? (
        <div className="careers-panel">
          <p className="section-label">Join the team</p>
          <h2 id="careers-heading" className="section-title">
            Learn about the roles
          </h2>
          <p className="section-lede">
            Dubbadhu is speaking-first African language learning. Afaan Oromo is live. Amharic and
            Tigrinya are in development. We hire part-time teammates who can make those languages, keep the
            work on schedule, and tell the story.
          </p>
          <ul className="careers-tracks">
            {CAREERS_TRACKS.map((track) => (
              <li key={track.title}>
                <h3>{track.title}</h3>
                <p>{track.body}</p>
              </li>
            ))}
          </ul>
          <button type="button" className="btn btn-primary" onClick={goRoles}>
            See open roles
          </button>
        </div>
      ) : null}

      {step === "roles" ? (
        <div className="careers-panel">
          <p className="section-label">Open roles</p>
          <h2 id="careers-heading" className="section-title">
            Choose a position
          </h2>
          <p className="section-lede">
            Pick the role that fits. Apply opens a dedicated page for your resume and fit note.
          </p>
          <ul className="careers-roles">
            {CAREERS_ROLES.map((item) => (
              <li key={item.id}>
                <a className="careers-role" href={applyPathForRole(item.id)}>
                  <p className="careers-role-kicker">{item.location}</p>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                  <span className="careers-role-cta">Apply</span>
                </a>
              </li>
            ))}
          </ul>
          <button type="button" className="careers-back" onClick={goLearn}>
            Back to roles overview
          </button>
        </div>
      ) : null}
    </section>
  );
}
