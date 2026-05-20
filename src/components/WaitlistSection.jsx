import { useState } from "react";
import { joinWaitlist, IOS_WEB_WAITLIST_LANGUAGE } from "../lib/waitlist.js";
import { isValidEmail } from "../lib/validateEmail.js";

export default function WaitlistSection() {
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
    const res = await joinWaitlist(email, IOS_WEB_WAITLIST_LANGUAGE);
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok && (res.code === "added" || res.code === "already_on_list")) {
      setDone(true);
    }
  }

  return (
    <section className="waitlist" id="waitlist" aria-labelledby="waitlist-heading">
      <div className="waitlist-inner">
        <div className="waitlist-copy">
          <p className="section-label">Early access</p>
          <h2 id="waitlist-heading" className="section-title">
            Be first when Dubbadhu lands on the App Store
          </h2>
          <p className="waitlist-lede">
            Afaan LLC is launching Dubbadhu on iOS first. Join the list for release updates—one email when it
            matters, not a weekly newsletter.
          </p>
          <ul className="waitlist-trust">
            <li>No spam</li>
            <li>Launch updates only</li>
            <li>iOS first · Android next</li>
          </ul>
          <div className="waitlist-brand" aria-label="Dubbadhu on the App Store">
            <img className="waitlist-brand-logo" src="/assets/talking.png" alt="" width={36} height={36} />
            <div>
              <div className="waitlist-brand-name">Dubbadhu</div>
              <div className="waitlist-brand-store">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16.365 1.43c0 1.14-.423 2.21-1.164 3.05-.79.9-2.096 1.6-3.24 1.5-.14-1.11.47-2.28 1.19-3.08.79-.88 2.15-1.53 3.214-1.47zM20.11 17.02c-.59 1.37-1.29 2.62-2.2 3.77-.83 1.03-1.51 1.74-2.53 1.76-.98.02-1.29-.64-2.52-.64-1.23 0-1.58.62-2.5.66-1 .04-1.76-.79-2.6-1.82-1.7-2.07-3-5.84-1.25-8.39.87-1.25 2.43-2.05 4.12-2.07.96-.02 1.87.68 2.52.68.64 0 1.86-.84 3.13-.72.53.02 2.01.21 2.96 1.6-.08.05-1.77 1.03-1.75 3.07.02 2.44 2.13 3.25 2.15 3.26-.02.06-.34 1.17-1.03 2.6z" />
                </svg>
                Coming to the App Store
              </div>
            </div>
          </div>
        </div>

        <div className="waitlist-form-wrap">
          <form
            className="waitlist-form"
            noValidate
            onSubmit={onSubmit}
            aria-busy={busy}
          >
            <label className="waitlist-label" htmlFor="waitlist-email">
              Email address
            </label>
            <div className="waitlist-form-row">
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
              <button type="submit" className="btn btn-primary" disabled={done || busy}>
                {done ? "You're in" : busy ? "Joining…" : "Notify me"}
              </button>
            </div>
            <p id="waitlist-hint" className="waitlist-hint">
              {done
                ? "You're on the list. We'll email you at launch."
                : "We only use your email for Dubbadhu updates."}
            </p>
          </form>
          <p
            id="waitlist-msg"
            className={
              "waitlist-form-msg" +
              (msg ? (err ? " waitlist-form-msg--err" : " waitlist-form-msg--ok") : "")
            }
            role="status"
            aria-live="polite"
          >
            {msg}
          </p>
        </div>
      </div>
    </section>
  );
}
