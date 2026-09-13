import { useEffect, useState } from "react";
import { CAREER_CONTACT_METHODS, CAREERS_ROLES, CAREERS_TRACKS, careerRoleById } from "../config/careers.js";
import { submitCareerApplication } from "../lib/careers.js";
import useReveal from "../hooks/useReveal.js";

function stepFromLocation() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (hash.startsWith("apply-")) {
    const role = careerRoleById(hash.slice("apply-".length));
    if (role) return { step: "apply", roleId: role.id };
  }
  if (hash === "careers-roles") return { step: "roles", roleId: "" };
  return { step: "learn", roleId: "" };
}

function setHash(hash) {
  const next = `#${hash}`;
  if (window.location.hash !== next) {
    history.replaceState(null, "", `${window.location.pathname}${window.location.search}${next}`);
  }
}

export default function CareersSection() {
  const ref = useReveal();
  const initial = typeof window !== "undefined" ? stepFromLocation() : { step: "learn", roleId: "" };
  const [step, setStep] = useState(initial.step);
  const [roleId, setRoleId] = useState(initial.roleId);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [contactMethod, setContactMethod] = useState("email");
  const [contactDetail, setContactDetail] = useState("");
  const [fit, setFit] = useState("");
  const [resumeName, setResumeName] = useState("");
  const [resume, setResume] = useState(null);
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  const role = careerRoleById(roleId);

  useEffect(() => {
    const sync = () => {
      const next = stepFromLocation();
      setStep(next.step);
      setRoleId(next.roleId);
    };
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

  function goApply(id) {
    setRoleId(id);
    setStep("apply");
    setDone(false);
    setMsg("");
    setErr(false);
    setHash(`apply-${id}`);
  }

  function onResumeChange(e) {
    const file = e.target.files?.[0] || null;
    setResume(file);
    setResumeName(file ? file.name : "");
  }

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    setErr(false);
    const res = await submitCareerApplication({
      name,
      city,
      email,
      contactMethod,
      contactDetail,
      roleId,
      fit,
      resume,
    });
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok) setDone(true);
  }

  return (
    <section className="careers reveal" id="careers" ref={ref} aria-labelledby="careers-heading">
      <ol className="careers-steps" aria-label="Application steps">
        <li className={step === "learn" ? "is-current" : ""}>Learn</li>
        <li className={step === "roles" ? "is-current" : ""}>Roles</li>
        <li className={step === "apply" ? "is-current" : ""}>Apply</li>
      </ol>

      {step === "learn" ? (
        <div className="careers-panel">
          <p className="section-label">Join the team</p>
          <h2 id="careers-heading" className="section-title">
            Learn about the roles
          </h2>
          <p className="section-lede">
            Dubbadhu is speaking-first African language learning. Afaan Oromo is live. Amharic and
            Tigrinya are next. We hire people who can make those languages, keep the work on
            schedule, and tell the story.
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
            Pick the role that fits. The application is the next step—resume and why you’re a good
            fit.
          </p>
          <ul className="careers-roles">
            {CAREERS_ROLES.map((item) => (
              <li key={item.id}>
                <button type="button" className="careers-role" onClick={() => goApply(item.id)}>
                  <p className="careers-role-kicker">{item.location}</p>
                  <h3>{item.title}</h3>
                  <p>{item.blurb}</p>
                  <span className="careers-role-cta">Apply</span>
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="careers-back" onClick={goLearn}>
            Back to roles overview
          </button>
        </div>
      ) : null}

      {step === "apply" && role ? (
        <div className="careers-panel careers-panel--apply">
          <p className="section-label">Application</p>
          <h2 id="careers-heading" className="section-title">
            {role.title}
          </h2>
          <p className="section-lede">{role.blurb}</p>
          <button type="button" className="careers-back" onClick={goRoles}>
            All openings
          </button>

          <form id="careers-form" className="careers-form" noValidate onSubmit={onSubmit} aria-busy={busy}>
            <input type="hidden" name="role" value={role.id} />
            <label className="careers-field" htmlFor="careers-name">
              Name
              <input
                id="careers-name"
                type="text"
                name="name"
                autoComplete="name"
                required
                value={name}
                disabled={done || busy}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="careers-field" htmlFor="careers-city">
              City / country
              <input
                id="careers-city"
                type="text"
                name="city"
                autoComplete="address-level2"
                required
                placeholder="Addis Ababa, Ethiopia"
                value={city}
                disabled={done || busy}
                onChange={(e) => setCity(e.target.value)}
              />
            </label>
            <label className="careers-field" htmlFor="careers-email">
              Email
              <input
                id="careers-email"
                type="email"
                name="email"
                autoComplete="email"
                inputMode="email"
                required
                value={email}
                disabled={done || busy}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <div className="careers-field-row">
              <label className="careers-field" htmlFor="careers-contact-method">
                Preferred contact
                <select
                  id="careers-contact-method"
                  name="contact_method"
                  required
                  value={contactMethod}
                  disabled={done || busy}
                  onChange={(e) => setContactMethod(e.target.value)}
                >
                  {CAREER_CONTACT_METHODS.map((method) => (
                    <option key={method.id} value={method.id}>
                      {method.label}
                    </option>
                  ))}
                </select>
              </label>
              {contactMethod !== "email" ? (
                <label className="careers-field" htmlFor="careers-contact-detail">
                  {contactMethod === "telegram" ? "Handle" : "Phone number"}
                  <input
                    id="careers-contact-detail"
                    type="text"
                    name="contact_detail"
                    autoComplete={contactMethod === "telegram" ? "username" : "tel"}
                    required
                    placeholder={contactMethod === "telegram" ? "@username" : "+251…"}
                    value={contactDetail}
                    disabled={done || busy}
                    onChange={(e) => setContactDetail(e.target.value)}
                  />
                </label>
              ) : null}
            </div>
            <label className="careers-field" htmlFor="careers-fit">
              Why are you a good fit?
              <textarea
                id="careers-fit"
                name="fit"
                rows={6}
                required
                minLength={40}
                maxLength={4000}
                value={fit}
                disabled={done || busy}
                placeholder="Your background, and why this role at Dubbadhu."
                onChange={(e) => setFit(e.target.value)}
              />
            </label>
            <label className="careers-field careers-file" htmlFor="careers-resume">
              Resume
              <input
                id="careers-resume"
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                required
                disabled={done || busy}
                onChange={onResumeChange}
              />
              <span className="careers-file-name">{resumeName || "PDF or Word · 5 MB max"}</span>
            </label>
            <button type="submit" className="btn btn-primary" disabled={done || busy}>
              {done ? "Application sent" : busy ? "Sending…" : "Submit application"}
            </button>
            <p className="download-hint">Used only to review your application. Resumes stay private.</p>
            <p
              className={
                "download-form-msg" +
                (msg ? (err ? " download-form-msg--err" : " download-form-msg--ok") : "")
              }
              role="status"
              aria-live="polite"
            >
              {msg}
            </p>
          </form>
        </div>
      ) : null}
    </section>
  );
}
