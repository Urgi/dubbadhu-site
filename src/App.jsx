import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
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
        <CurriculumCatalog />
        <LanguagesSection />
        <WaitlistSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
