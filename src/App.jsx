import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import AboutSection from "./components/AboutSection.jsx";
import MissionSection from "./components/MissionSection.jsx";
import CurriculumCatalog from "./components/CurriculumCatalog.jsx";
import LanguagesSection from "./components/LanguagesSection.jsx";
import WaitlistSection from "./components/WaitlistSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

export default function App() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <AboutSection />
        <MissionSection />
        <CurriculumCatalog />
        <LanguagesSection />
        <WaitlistSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
