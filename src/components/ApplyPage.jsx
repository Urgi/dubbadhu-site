import { CAREERS_ROLES } from "../config/careers.js";
import { applyPathForRole } from "../lib/routes.js";
import CareerApplyForm from "./CareerApplyForm.jsx";
import SiteFooter from "./SiteFooter.jsx";
import SiteNav from "./SiteNav.jsx";

export default function ApplyPage({ role }) {
  if (!role) {
    return (
      <>
        <SiteNav />
        <main id="main" className="apply-page">
          <div className="apply-page-inner">
            <p className="section-label">Careers</p>
            <h1 className="section-title">Role not found</h1>
            <p className="section-lede">
              That opening isn’t listed right now. Choose a current role below.
            </p>
            <ul className="careers-roles">
              {CAREERS_ROLES.map((item) => (
                <li key={item.id}>
                  <a className="careers-role" href={applyPathForRole(item.id)}>
                    <p className="careers-role-kicker">{item.location}</p>
                    <h2>{item.title}</h2>
                    <p>{item.blurb}</p>
                    <span className="careers-role-cta">Apply</span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="careers-back" href="/careers">
              Back to join the team
            </a>
          </div>
        </main>
        <SiteFooter />
      </>
    );
  }

  return (
    <>
      <SiteNav />
      <main id="main" className="apply-page">
        <div className="apply-page-inner apply-page-inner--form">
          <p className="section-label">Application</p>
          <h1 className="section-title">{role.title}</h1>
          <p className="section-lede">{role.blurb}</p>
          <p className="apply-page-meta">{role.location}</p>
          <a className="careers-back" href="/careers#careers-roles">
            All openings
          </a>
          <CareerApplyForm role={role} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
