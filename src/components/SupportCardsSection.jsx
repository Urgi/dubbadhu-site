import { SUPPORT_CARDS } from "../config/homeCopy.js";
import SectionHeader from "./SectionHeader.jsx";

export default function SupportCardsSection() {
  return (
    <section className="support-cards" id="support" aria-labelledby="support-heading">
      <div className="support-cards-inner">
        <SectionHeader
          id="support-heading"
          label="Support"
          title="Discover all the ways we support you"
          lede="Help with subscriptions, product questions, and community standards—clear paths when you need us."
        />
        <div className="support-cards-grid">
          {SUPPORT_CARDS.map((card) => (
            <article key={card.title} className="support-card">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <a
                href={card.href}
                className="support-card-link"
                {...(card.href.startsWith("http") || card.href.startsWith("mailto")
                  ? { rel: "noopener noreferrer" }
                  : {})}
              >
                {card.cta} →
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
