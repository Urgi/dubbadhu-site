import useReveal from "../hooks/useReveal.js";
import { COMPANY } from "../config/homeCopy.js";
import { SUPPORT_EMAIL } from "../config/brand.js";

export default function CompanySection() {
  const ref = useReveal();

  return (
    <section className="company company--split reveal" id="company" ref={ref} aria-labelledby="company-heading">
      <div className="company-copy">
        <p className="section-label">{COMPANY.label}</p>
        <h2 id="company-heading" className="section-title">
          {COMPANY.title}
        </h2>
        <p className="mission-lede">{COMPANY.lede}</p>
        <p className="section-lede">{COMPANY.built}</p>
        <p className="section-lede">{COMPANY.impact}</p>
      </div>
      <div className="company-aside">
        <address className="company-address">
          {COMPANY.address.map((line) => (
            <span key={line}>{line}</span>
          ))}
          <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
        </address>
        <p className="company-links">
          <a href="/about/">About Dubbadhu</a>
          <a href="/support/">Support</a>
          <a href="/privacy/">Privacy</a>
        </p>
      </div>
    </section>
  );
}
