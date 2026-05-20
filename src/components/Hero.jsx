export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            iOS first · Android next
          </p>
          <h1 id="hero-heading">
            Speak the language
            <br />
            <em>your family carries</em>
          </h1>
          <p className="hero-tagline" aria-label="Speak, learn, preserve">
            Speak · Learn · Preserve
          </p>
          <p className="hero-sub">
            Dubbadhu means &ldquo;speak&rdquo; in Afaan Oromo. Built for diaspora learners who understand
            phrases but freeze in conversation—structured lessons, native-speaker video, and practice you
            can return to between visits home.
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn btn-primary">
              Join the waitlist
            </a>
            <a href="#mission" className="btn btn-secondary">
              Why we built this
            </a>
          </div>
          <ul className="hero-proof">
            <li>Professor-reviewed content</li>
            <li>Native-speaker video</li>
            <li>Pronunciation &amp; Qubee</li>
          </ul>
        </div>

        <div className="hero-visual" aria-hidden="false">
          <div className="hero-card">
            <div className="hero-card-top">
              <img
                className="hero-card-logo"
                src="/assets/talking.png"
                alt=""
                width={40}
                height={40}
              />
              <div>
                <div className="hero-card-app">Dubbadhu</div>
                <div className="hero-card-series">Series · First conversations</div>
              </div>
            </div>
            <div className="hero-card-lesson">
              <span className="hero-card-label">Today&apos;s phrase</span>
              <p className="hero-card-oromo">Akkam jirta?</p>
              <p className="hero-card-english">How are you? (informal)</p>
            </div>
            <div className="hero-card-audio" aria-hidden="true">
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
              <span className="wave-bar" />
            </div>
            <p className="hero-card-foot">Tap to hear · Repeat out loud</p>
          </div>
          <div className="hero-card-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
