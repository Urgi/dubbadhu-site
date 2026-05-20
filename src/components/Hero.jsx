export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-pattern" aria-hidden="true" />
      <div className="hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading">
            African languages,
            <br />
            <em>spoken with confidence</em>
          </h1>
          <p className="hero-tagline" aria-label="Speak, learn, preserve">
            Speak · Learn · Preserve
          </p>
          <p className="hero-sub">
            Dubbadhu means &ldquo;speak&rdquo; in Afaan Oromo. An African language learning platform where
            culture and language go hand in hand—Afaan Oromo on iOS, with structured lessons, native-speaker
            video, and pronunciation practice.
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="btn btn-primary">
              Get Dubbadhu
            </a>
            <a href="#curriculum" className="btn btn-secondary">
              See curriculum
            </a>
          </div>
          <ul className="hero-proof">
            <li>Interactive lessons</li>
            <li>Native-speaker video</li>
            <li>Pronunciation tools</li>
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
                <div className="hero-card-series">Afaan Oromo · First conversations</div>
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
          </div>
          <div className="hero-card-glow" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
