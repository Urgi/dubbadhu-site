import { useState } from "react";
import { joinUpcomingLanguageWaitlist } from "../lib/waitlist.js";
import { isValidEmail } from "../lib/validateEmail.js";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";
import useReveal from "../hooks/useReveal.js";

export default function DownloadSection() {
  const ref = useReveal();
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);

  const showInvalid = touched && email.trim() && !isValidEmail(email);

  async function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValidEmail(email)) {
      setErr(true);
      setMsg("Please enter a valid email address.");
      return;
    }
    setBusy(true);
    setMsg("");
    setErr(false);
    const res = await joinUpcomingLanguageWaitlist(email);
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok && (res.code === "added" || res.code === "already_on_list")) {
      setDone(true);
    }
  }

  return (
    <section className="download download--split reveal" id="download" ref={ref} aria-labelledby="download-heading">
      <div className="download-copy">
        <p className="section-label">Get the app</p>
        <h2 id="download-heading" className="section-title">
          Speak with Confidence
        </h2>
        <p className="section-lede">
          Afaan Oromo is on the App Store and Google Play now. Amharic and Tigrinya are in development.
          Download and start with native conversation—not flashcards.
        </p>
        <div className="download-actions">
          <AppStoreLink className="btn btn-primary" />
          <PlayStoreLink className="btn btn-secondary" />
        </div>
      </div>

      <form
        className="download-form"
        id="waitlist"
        noValidate
        onSubmit={onSubmit}
        aria-busy={busy}
      >
          <label className="download-label" htmlFor="waitlist-email">
            Get notified for Amharic &amp; Tigrinya
          </label>
          <div className="download-form-row">
            <input
              id="waitlist-email"
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              required
              value={email}
              disabled={done || busy}
              aria-invalid={showInvalid || err}
              aria-describedby="waitlist-hint waitlist-msg"
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setTouched(true)}
            />
            <button type="submit" className="btn btn-secondary" disabled={done || busy}>
              {done ? "You're in" : busy ? "Joining…" : "Notify me"}
            </button>
          </div>
          <p id="waitlist-hint" className="download-hint">
            {done
              ? "On the list for Amharic and Tigrinya."
              : "Email used only for Amharic and Tigrinya launch updates."}
          </p>
          <p
            id="waitlist-msg"
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
    </section>
  );
}
