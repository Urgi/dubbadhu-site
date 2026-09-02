import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import StatsBand, { IntroSection } from "./components/StatsBand.jsx";
import OffersSection from "./components/OffersSection.jsx";
import LanguagesSection from "./components/LanguagesSection.jsx";
import CurriculumCatalog from "./components/CurriculumCatalog.jsx";
import SupportCardsSection from "./components/SupportCardsSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import WaitlistSection from "./components/WaitlistSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

export default function App() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <StatsBand />
        <OffersSection />
        <IntroSection />
        <LanguagesSection />
        <CurriculumCatalog />
        <SupportCardsSection />
        <FaqSection />
        <WaitlistSection />
      </main>
      <SiteFooter />
    </>
  );
}
