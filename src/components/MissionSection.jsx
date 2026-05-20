export default function MissionSection() {
  return (
    <section className="mission" id="mission" aria-labelledby="mission-heading">
      <div className="mission-pattern" aria-hidden="true" />
      <div className="mission-grid">
        <div className="mission-copy">
          <p className="section-label">Our mission</p>
          <h2 id="mission-heading" className="section-title section-title--light">
            Make African languages accessible, interactive, and spoken with confidence
          </h2>
          <p>
            Too many learners have few high-quality options for African languages—especially compared with what
            major apps offer for European languages. Afaan LLC exists to close that gap with products that are
            rigorous, enjoyable, and built for real speaking practice.
          </p>
          <p>
            Dubbadhu combines structured curriculum, native-speaker video, pronunciation tools, and engaging
            lesson techniques backed by modern technology—so learning stays interactive, progress stays clear,
            and the language stays alive in daily use.
          </p>
        </div>
        <aside className="mission-aside">
          <blockquote className="mission-quote">
            <p>
              &ldquo;Accessibility is not enough if learners never speak. We design for confidence, enjoyment,
              and technology that supports both.&rdquo;
            </p>
            <footer>— Afaan LLC</footer>
          </blockquote>
          <div className="mission-values">
            <div className="mission-value">
              <span className="mission-value-k">Mission</span>
              <span className="mission-value-v">Accessible African language learning</span>
            </div>
            <div className="mission-value">
              <span className="mission-value-k">Approach</span>
              <span className="mission-value-v">Engaging techniques &amp; native expertise</span>
            </div>
            <div className="mission-value">
              <span className="mission-value-k">Launch</span>
              <span className="mission-value-v">Afaan Oromo on iOS, more languages ahead</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
