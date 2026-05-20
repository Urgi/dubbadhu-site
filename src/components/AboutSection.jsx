const PILLARS = [
  {
    num: "01",
    title: "Speak out loud",
    desc: "Confidence comes from saying phrases yourself—not only reading them. Exercises push your voice, with feedback shaped for pronunciation.",
  },
  {
    num: "02",
    title: "Learn with structure",
    desc: "Clear series and lessons so you always know what to do next—the same learning home you open in the app, built for steady progress.",
  },
  {
    num: "03",
    title: "Preserve what matters",
    desc: "Language lives in family, faith, music, and stories—not only textbooks. Content reflects how Oromo is actually spoken at home.",
  },
  {
    num: "04",
    title: "Built to grow",
    desc: "Afaan Oromo is our foundation. We are designing Dubbadhu so more Horn and East African languages can receive the same care.",
  },
];

export default function AboutSection() {
  return (
    <section className="about" id="about" aria-labelledby="about-heading">
      <div className="about-grid">
        <div className="about-lead">
          <p className="section-label">About Dubbadhu</p>
          <h2 id="about-heading" className="section-title">
            A command, not a suggestion
          </h2>
          <p className="about-intro">
            <strong className="text-em">Dubbadhu</strong> means &ldquo;speak.&rdquo; Too many of us grew up
            understanding our parents but answering in English. The app is for learners who want to show up in
            family conversations—with lessons grounded in real speech, not phrasebook trivia.
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
