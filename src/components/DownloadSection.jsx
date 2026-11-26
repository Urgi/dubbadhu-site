import { useState } from "react";
import { track } from "@vercel/analytics";
import { joinOnlineClassesInterest, joinUpcomingLanguageWaitlist } from "../lib/waitlist.js";
import { isValidEmail } from "../lib/validateEmail.js";
import DownloadButton from "./DownloadButton.jsx";

export default function DownloadSection() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [touched, setTouched] = useState(false);
  const [wantLanguages, setWantLanguages] = useState(true);
  const [wantClasses, setWantClasses] = useState(false);

  const showInvalid = touched && email.trim() && !isValidEmail(email);

  async function onSubmit(e) {
    e.preventDefault();
    setTouched(true);
    if (!isValidEmail(email)) {
      setErr(true);
      setMsg("Please enter a valid email address.");
      return;
    }
    if (!wantLanguages && !wantClasses) {
      setErr(true);
      setMsg("Pick at least one update.");
      return;
    }
    setBusy(true);
    setMsg("");
    setErr(false);
    const messages = [];
    let failed = null;
    if (wantLanguages) {
      const res = await joinUpcomingLanguageWaitlist(email);
      if (res.ok) {
        track("waitlist_submit", { placement: "download" });
        messages.push(res.message);
      } else failed = res;
    }
    if (!failed && wantClasses) {
      const res = await joinOnlineClassesInterest(email);
      if (res.ok) {
        track("class_interest_submit", { placement: "download" });
        messages.push(res.message);
      } else failed = res;
    }
    setBusy(false);
    setMsg(failed ? failed.message || "" : messages.join(" "));
    setErr(Boolean(failed));
    if (!failed) setDone(true);
  }

  return (
    <section className="download download--split" id="download" aria-labelledby="download-heading">
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
          <DownloadButton className="btn btn-primary" placement="download" />
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
            Get updates by email
          </label>
          <div className="download-form-options">
            <label>
              <input
                type="checkbox"
                checked={wantLanguages}
                disabled={done || busy}
                onChange={(e) => setWantLanguages(e.target.checked)}
              />
              Amharic &amp; Tigrinya launch
            </label>
            <label>
              <input
                type="checkbox"
                checked={wantClasses}
                disabled={done || busy}
                onChange={(e) => setWantClasses(e.target.checked)}
              />
              Live online speaking classes
            </label>
          </div>
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
              ? "You're on the list."
              : "Email used only for the updates you pick."}
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
