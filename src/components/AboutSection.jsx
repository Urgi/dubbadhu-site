const PILLARS = [
  {
    num: "01",
    title: "Confidence in speech",
    desc: "Learners build real speaking habits—not passive reading. Pronunciation feedback and out-loud exercises are core to every series.",
  },
  {
    num: "02",
    title: "Structured & clear",
    desc: "Progressive lesson paths so learners always know what to practice next—designed for consistency, not confusion.",
  },
  {
    num: "03",
    title: "Engaging by design",
    desc: "Interactive formats, native video, and varied activities keep sessions enjoyable so people return and keep speaking.",
  },
  {
    num: "04",
    title: "Technology-forward",
    desc: "Modern mobile learning tools paired with rigorous content—starting with Afaan Oromo, expanding to more African languages over time.",
  },
];

export default function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="about-grid">
        <div className="about-lead">
          <p className="section-label">About Dubbadhu</p>
          <h2 id="about-heading" className="section-title">
            Built by Afaan LLC for African language learners
          </h2>
          <p className="about-intro">
            <strong className="text-em">Dubbadhu</strong> means &ldquo;speak.&rdquo; Afaan LLC is an organization
            focused on a single mission: make African languages more accessible, interactive, and effective to
            learn—so more people speak with confidence, not just recognize words on a screen.
          </p>
        </div>
        <div className="about-features">
          {PILLARS.map((p) => (
            <article key={p.num} className="feature-item">
              <div className="feature-num">{p.num}</div>
              <h3 className="feature-title">{p.title}</h3>
              <p className="feature-desc">{p.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
