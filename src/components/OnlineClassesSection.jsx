import { useState } from "react";
import { joinOnlineClassesInterest } from "../lib/waitlist.js";
import { isValidEmail } from "../lib/validateEmail.js";
import useReveal from "../hooks/useReveal.js";

export default function OnlineClassesSection() {
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
    const res = await joinOnlineClassesInterest(email);
    setBusy(false);
    setMsg(res.message || "");
    setErr(!res.ok);
    if (res.ok && (res.code === "added" || res.code === "already_on_list")) {
      setDone(true);
    }
  }

  return (
    <section className="classes classes--split reveal" id="classes" ref={ref} aria-labelledby="classes-heading">
      <div className="classes-copy">
        <p className="section-label">Online classes</p>
        <h2 id="classes-heading" className="section-title">
          Live speaking classes
        </h2>
        <p className="section-lede">
          Register interest for online speaking classes. The app stays the place to practice every
          day. We’ll email you when classes open.
        </p>
      </div>

      <form className="download-form" noValidate onSubmit={onSubmit} aria-busy={busy}>
        <label className="download-label" htmlFor="classes-email">
          Interest form
        </label>
        <div className="download-form-row">
          <input
            id="classes-email"
            type="email"
            name="email"
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            required
            value={email}
            disabled={done || busy}
            aria-invalid={showInvalid || err}
            aria-describedby="classes-hint classes-msg"
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <button type="submit" className="btn btn-primary" disabled={done || busy}>
            {done ? "You're in" : busy ? "Sending…" : "I'm interested"}
          </button>
        </div>
        <p id="classes-hint" className="download-hint">
          {done
            ? "On the interest list for online classes."
            : "Email used only to tell you when online classes open."}
        </p>
        <p
          id="classes-msg"
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
