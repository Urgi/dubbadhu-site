import EastAfricaPicker from "./components/EastAfricaPicker.jsx";
import WaitlistSection from "./components/WaitlistSection.jsx";

export default function App() {
  return (
    <>
      <nav>
        <a href="./" className="nav-logo">
          Dubbadhu<span>.</span>
        </a>
        <ul className="nav-links">
          <li className="nav-desktop-only">
            <a href="#about">About</a>
          </li>
          <li className="nav-desktop-only">
            <a href="#mission">Mission</a>
          </li>
          <li className="nav-desktop-only">
            <a href="#contact">Contact</a>
          </li>
          <li>
            <a href="#languages">Languages</a>
          </li>
          <li>
            <a href="#waitlist" className="nav-cta">
              Join Waitlist
            </a>
          </li>
        </ul>
      </nav>

      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-tag">Coming Soon — iOS</div>
        <h1>
          Learn Afaan Oromo.
          <br />
          <span className="hero-app-tagline">SPEAK · LEARN · PRESERVE</span>
        </h1>
        <p className="hero-sub">
          Dubbadhu exists so more people can speak with confidence—through real speaking practice, structured lessons, and
          tools that meet learners where they are. Dubbadhu started with Afaan Oromo, and we&apos;re building toward a
          future where learning any African language feels just as accessible, high-quality, and community-supported.
        </p>
        <div className="hero-actions">
          <a href="#waitlist" className="btn-primary">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.5C4.41 1.5 1.5 4.41 1.5 8S4.41 14.5 8 14.5 14.5 11.59 14.5 8 11.59 1.5 8 1.5zm0 5.5a1 1 0 110 2 1 1 0 010-2zm1 4.5H7v-3h2v3z"
                fill="currentColor"
              />
            </svg>
            Join the Waitlist
          </a>
          <a href="#about" className="btn-secondary">
            Learn more
          </a>
        </div>
      </section>

      <section className="about" id="about">
        <div className="section-label">About Dubbadhu</div>
        <p className="about-intro">
          The name <strong style={{ fontWeight: 500, color: "var(--text)" }}>&ldquo;Dubbadhu&rdquo;</strong> translates
          to <strong style={{ fontWeight: 500, color: "var(--text)" }}>&ldquo;Speak.&rdquo;</strong> — a command, not a
          slogan. The pillars below are how we turn that into something you can use every day.
        </p>
        <div className="about-features">
          <div className="feature-item">
            <div className="feature-num">01</div>
            <div className="feature-title">Out loud</div>
            <div className="feature-desc">
              Confidence comes from real speaking practice—not generic drills alone. Feedback and exercises are built to
              help you improve with your voice.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-num">02</div>
            <div className="feature-title">Learn</div>
            <div className="feature-desc">
              Structured lessons and clearer paths to progress, with a learning home you can return to every day—the
              same product philosophy as in the app.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-num">03</div>
            <div className="feature-title">Preserve</div>
            <div className="feature-desc">
              Language is culture in motion: voices, stories, and everyday conversation—not only textbooks. That value
              guides what we ship.
            </div>
          </div>
          <div className="feature-item">
            <div className="feature-num">04</div>
            <div className="feature-title">Where we&apos;re headed</div>
            <div className="feature-desc">
              Afaan Oromo is where we started; we&apos;re building toward a future where more African languages feel just
              as accessible, high-quality, and community-supported.
            </div>
          </div>
        </div>
      </section>

      <div className="divider">
        <div className="divider-line" />
        <div className="divider-text">Our Mission</div>
        <div className="divider-line" />
      </div>

      <section className="mission" id="mission">
        <div className="mission-inner">
          <div className="section-label">Why we exist</div>
          <h2>We believe language is culture in motion.</h2>
          <p>
            Preserving and passing on Afaan Oromo matters—not only in textbooks, but in voices, stories, and everyday
            conversation. That value guides what we build and how we grow.
          </p>
          <p>
            There is a real gap between wanting to speak the language and having accessible, high-quality ways to
            practice and stay motivated. We are building Dubbadhu to close that gap: clearer paths to progress, feedback
            that helps you improve, and a learning home you can return to every day.
          </p>
          <p>
            Dubbadhu is operated by{" "}
            <strong style={{ fontWeight: 500, color: "var(--text)" }}>Afaan LLC</strong>, an Arizona-based company
            building the language infrastructure the Horn of Africa deserves—starting with the app learners hold in
            their hands, and the production tools our team uses to capture real speech and ship it responsibly.
          </p>
        </div>
      </section>

      <section className="languages" id="languages">
        <div className="section-label">Languages</div>
        <h2 className="languages-head">Afaan Oromo, Amharic, and Tigrinya</h2>
        <p className="languages-intro">Browse where each language sits on this map of eastern Africa.</p>
        <div id="country-picker-root" className="country-picker" aria-label="Regional language picker">
          <EastAfricaPicker />
        </div>
      </section>

      <WaitlistSection />

      <section className="contact" id="contact">
        <h2>Get in touch</h2>
        <p>Questions, press inquiries, or partnership requests:</p>
        <a href="mailto:admin@afaantech.com">admin@afaantech.com</a>
      </section>

      <footer>
        <div className="footer-logo">
          Dubbadhu<span>.</span>
        </div>
        <div className="footer-copy">© 2026 Afaan LLC. All rights reserved.</div>
        <div className="footer-links">
          <a href="/privacy/">Privacy Policy</a>
          <a href="/terms/">Terms of Use</a>
          <a href="mailto:admin@afaantech.com">Contact</a>
        </div>
      </footer>
    </>
  );
}
