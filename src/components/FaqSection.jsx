import { useState } from "react";
import { FAQ_ITEMS } from "../config/homeCopy.js";
import SectionHeader from "./SectionHeader.jsx";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq" aria-labelledby="faq-heading">
      <div className="faq-inner">
        <SectionHeader
          id="faq-heading"
          label="FAQ"
          title="More questions?"
          lede="Common answers about subscriptions, languages, and support. For anything else, visit our full support page."
        />

        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i;
            const panelId = `faq-panel-${i}`;
            const btnId = `faq-btn-${i}`;
            return (
              <article key={item.q} className={`faq-item${open ? " faq-item--open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    id={btnId}
                    className="faq-question"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true" />
                  </button>
                </h3>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  className="faq-answer"
                  hidden={!open}
                >
                  <p>{item.a}</p>
                </div>
              </article>
            );
          })}
        </div>

        <p className="faq-more">
          <a href="/support" className="btn btn-secondary">
            Full support page
          </a>
        </p>
      </div>
    </section>
  );
}
