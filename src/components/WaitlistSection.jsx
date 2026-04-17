import { useState } from "react";
import { joinWaitlist, IOS_WEB_WAITLIST_LANGUAGE } from "../lib/waitlist.js";

export default function WaitlistSection() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    const res = await joinWaitlist(email, IOS_WEB_WAITLIST_LANGUAGE);
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok && (res.code === "added" || res.code === "already_on_list")) {
      setDone(true);
    }
  }

  return (
    <section className="coming-soon" id="waitlist">
      <div className="section-label">Early Access</div>
      <div className="waitlist-brand" aria-label="Dubbadhu on the App Store">
        <div className="waitlist-brand-left">
          <img className="waitlist-brand-logo" src="/assets/talking.png" alt="" loading="lazy" />
          <span className="waitlist-brand-name">Dubbadhu</span>
        </div>
        <div className="waitlist-brand-store" aria-label="App Store">
          <svg
            className="waitlist-apple"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.365 1.43c0 1.14-.423 2.21-1.164 3.05-.79.9-2.096 1.6-3.24 1.5-.14-1.11.47-2.28 1.19-3.08.79-.88 2.15-1.53 3.214-1.47zM20.11 17.02c-.59 1.37-1.29 2.62-2.2 3.77-.83 1.03-1.51 1.74-2.53 1.76-.98.02-1.29-.64-2.52-.64-1.23 0-1.58.62-2.5.66-1 .04-1.76-.79-2.6-1.82-1.7-2.07-3-5.84-1.25-8.39.87-1.25 2.43-2.05 4.12-2.07.96-.02 1.87.68 2.52.68.64 0 1.86-.84 3.13-.72.53.02 2.01.21 2.96 1.6-.08.05-1.77 1.03-1.75 3.07.02 2.44 2.13 3.25 2.15 3.26-.02.06-.34 1.17-1.03 2.6z" />
          </svg>
          <span className="waitlist-store-text">App Store</span>
        </div>
      </div>
      <h2>Be the first to learn.</h2>
      <p>
        We&apos;re launching on <strong style={{ fontWeight: 500, color: "var(--text)" }}>iOS</strong> first;
        Android will follow. Join the waitlist and we&apos;ll email you when Dubbadhu hits the App Store.
      </p>
      <form className="waitlist-form" noValidate onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          placeholder="your@email.com"
          autoComplete="email"
          required
          value={email}
          disabled={done}
          onChange={(e) => setEmail(e.target.value)}
          style={done ? { opacity: 0.5 } : undefined}
        />
        <button
          type="submit"
          disabled={done || busy}
          style={
            done
              ? { background: "#1a5c3a", color: "#7dccaa" }
              : undefined
          }
        >
          {done ? "You're in ✓" : busy ? "…" : "Notify Me"}
        </button>
      </form>
      {msg ? (
        <p
          className={"waitlist-form-msg" + (err ? " waitlist-form-msg--err" : " waitlist-form-msg--ok")}
          role="status"
        >
          {msg}
        </p>
      ) : null}
    </section>
  );
}
