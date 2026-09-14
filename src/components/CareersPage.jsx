import CareersSection from "./CareersSection.jsx";
import SiteFooter from "./SiteFooter.jsx";
import SiteNav from "./SiteNav.jsx";

export default function CareersPage() {
  return (
    <>
      <SiteNav />
      <main id="main" className="apply-page careers-page">
        <CareersSection />
      </main>
      <SiteFooter />
    </>
  );
}
