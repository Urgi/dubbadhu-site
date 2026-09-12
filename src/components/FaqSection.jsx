import { useState } from "react";
import { FAQ_ITEMS } from "../config/homeCopy.js";
import useReveal from "../hooks/useReveal.js";

export default function FaqSection() {
  const ref = useReveal();
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq faq--split reveal" id="faq" ref={ref} aria-labelledby="faq-heading">
      <div className="faq-copy">
        <p className="section-label">FAQ</p>
        <h2 id="faq-heading" className="section-title">
          More questions?
        </h2>
        <p className="section-lede">
          Common answers about subscriptions, languages, and support. For anything else, visit our
          full support page.
        </p>
      </div>

      <div className="faq-body">
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
          <a href="/support/" className="btn btn-secondary">
            Full support page
          </a>
        </p>
      </div>
    </section>
  );
}
