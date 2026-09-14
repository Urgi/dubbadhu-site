import { useEffect, useState } from "react";
import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import ProductSection from "./components/ProductSection.jsx";
import LanguagesSection from "./components/LanguagesSection.jsx";
import OnlineClassesSection from "./components/OnlineClassesSection.jsx";
import DownloadSection from "./components/DownloadSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import ApplyPage from "./components/ApplyPage.jsx";
import CareersPage from "./components/CareersPage.jsx";
import { parseAppRoute, redirectLegacyApplyHash } from "./lib/routes.js";

function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <ProductSection />
        <LanguagesSection />
        <OnlineClassesSection />
        <DownloadSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}

function ApplyIndexPage() {
  return <ApplyPage role={null} />;
}

export default function App() {
  const [route, setRoute] = useState(() => parseAppRoute());

  useEffect(() => {
    if (redirectLegacyApplyHash()) return undefined;

    const sync = () => setRoute(parseAppRoute());
    window.addEventListener("popstate", sync);
    return () => window.removeEventListener("popstate", sync);
  }, []);

  useEffect(() => {
    if (route.name === "apply" && route.role) {
      document.title = `Apply · ${route.role.title} — Dubbadhu`;
    } else if (route.name === "apply" || route.name === "apply-index") {
      document.title = "Apply — Dubbadhu careers";
    } else if (route.name === "careers") {
      document.title = "Careers — Dubbadhu";
    } else {
      document.title = "Dubbadhu | Speak with Confidence — African languages";
    }
  }, [route]);

  if (route.name === "apply") {
    return <ApplyPage role={route.role} />;
  }
  if (route.name === "apply-index") {
    return <ApplyIndexPage />;
  }
  if (route.name === "careers") {
    return <CareersPage />;
  }
  return <HomePage />;
}
