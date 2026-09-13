import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import ProductSection from "./components/ProductSection.jsx";
import LanguagesSection from "./components/LanguagesSection.jsx";
import OnlineClassesSection from "./components/OnlineClassesSection.jsx";
import CareersSection from "./components/CareersSection.jsx";
import DownloadSection from "./components/DownloadSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

export default function App() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <ProductSection />
        <Hero />
        <LanguagesSection />
        <OnlineClassesSection />
        <CareersSection />
        <DownloadSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
