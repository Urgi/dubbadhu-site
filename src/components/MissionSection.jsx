export default function MissionSection() {
  return (
    <section className="mission" id="mission" aria-labelledby="mission-heading">
      <div className="mission-pattern" aria-hidden="true" />
      <div className="mission-grid">
        <div className="mission-copy">
          <p className="section-label">Why we exist</p>
          <h2 id="mission-heading" className="section-title section-title--light">
            Language is how we stay close to the people who raised us
          </h2>
          <p>
            Across the diaspora, many of us hear Afaan Oromo every day—at home, in songs, in prayer—yet still
            hesitate when it is our turn to answer. The gap is not desire. It is practice: accessible lessons,
            examples that sound like real life, and a reason to open the app again tomorrow.
          </p>
          <p>
            Dubbadhu closes that gap with structured series, native-speaker video, pronunciation work, and
            conversation practice tied to family, identity, and everyday situations—not abstract drills alone.
          </p>
        </div>
        <aside className="mission-aside">
          <blockquote className="mission-quote">
            <p>
              &ldquo;When someone speaks to you in the language of your household, you should not have to
              apologize for answering.&rdquo;
            </p>
            <footer>— The spirit behind Dubbadhu</footer>
          </blockquote>
          <div className="mission-values">
            <div className="mission-value">
              <span className="mission-value-k">For</span>
              <span className="mission-value-v">Diaspora learners &amp; families</span>
            </div>
            <div className="mission-value">
              <span className="mission-value-k">With</span>
              <span className="mission-value-v">Professors &amp; native speakers</span>
            </div>
            <div className="mission-value">
              <span className="mission-value-k">Starting</span>
              <span className="mission-value-v">Afaan Oromo on iOS</span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
