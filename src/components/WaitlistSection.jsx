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
