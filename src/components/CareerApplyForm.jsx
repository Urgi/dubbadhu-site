import { useState } from "react";
import { CAREER_CONTACT_METHODS } from "../config/careers.js";
import { submitCareerApplication } from "../lib/careers.js";

export default function CareerApplyForm({ role }) {
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
      roleId: role.id,
      fit,
      resume,
    });
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok) setDone(true);
  }

  return (
    <form className="careers-form" noValidate onSubmit={onSubmit} aria-busy={busy}>
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
  );
}
