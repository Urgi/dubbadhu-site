import { useState } from "react";
import { joinUpcomingLanguageWaitlist } from "../lib/waitlist.js";
import { isValidEmail } from "../lib/validateEmail.js";
import SectionHeader from "./SectionHeader.jsx";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config/appLinks.js";

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
    const res = await joinUpcomingLanguageWaitlist(email);
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
          <SectionHeader
            id="waitlist-heading"
            label="Afaan Oromo is live"
            title="Get notified for Amharic & Tigrinya"
            lede="Dubbadhu is already on the App Store and Google Play for Afaan Oromo. This list is only for a note when Amharic and Tigrinya ship."
          />
          <div className="waitlist-store-row">
            <AppStoreLink className="btn btn-primary waitlist-store-btn" />
            <PlayStoreLink className="btn btn-secondary waitlist-store-btn" />
          </div>
          <ul className="waitlist-trust">
            <li>Afaan Oromo available now</li>
            <li>Amharic &amp; Tigrinya launch notes only</li>
            <li>No spam</li>
          </ul>
          <div className="waitlist-brand-row">
            <a
              className="waitlist-brand"
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Download Dubbadhu on the App Store"
            >
              <img className="waitlist-brand-logo" src="/assets/app-icon.png" alt="" width={36} height={36} />
              <div>
                <div className="waitlist-brand-name">Dubbadhu</div>
                <div className="waitlist-brand-store">On the App Store</div>
              </div>
            </a>
            <a
              className="waitlist-brand"
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Get Dubbadhu on Google Play"
            >
              <img className="waitlist-brand-logo" src="/assets/app-icon.png" alt="" width={36} height={36} />
              <div>
                <div className="waitlist-brand-name">Dubbadhu</div>
                <div className="waitlist-brand-store">On Google Play</div>
              </div>
            </a>
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
              Notify me for Amharic &amp; Tigrinya
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
                ? "On the list for Amharic and Tigrinya."
                : "Email used only for Amharic and Tigrinya launch updates."}
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
