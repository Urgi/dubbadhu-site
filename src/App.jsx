import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import ProductSection from "./components/ProductSection.jsx";
import LanguagesSection from "./components/LanguagesSection.jsx";
import DownloadSection from "./components/DownloadSection.jsx";
import FaqSection from "./components/FaqSection.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import MobileDownloadBar from "./components/MobileDownloadBar.jsx";
import SoundFamiliarSection from "./components/SoundFamiliarSection.jsx";
import BlogIndexPage from "./components/BlogIndexPage.jsx";
import BlogPostPage from "./components/BlogPostPage.jsx";
import { HOME_TITLE, pageMeta } from "./lib/pageMeta.js";
import ApplyPage from "./components/ApplyPage.jsx";
import CareersPage from "./components/CareersPage.jsx";
import DownloadPage from "./components/DownloadPage.jsx";
import { parseAppRoute, redirectLegacyApplyHash } from "./lib/routes.js";

function HomePage() {
  return (
    <>
      <SiteNav />
      <main id="main">
        <Hero />
        <ProductSection />
        <LanguagesSection />
        <SoundFamiliarSection />
        <DownloadSection />
        <FaqSection />
      </main>
      <SiteFooter />
      <MobileDownloadBar />
    </>
  );
}

function ApplyIndexPage() {
  return <ApplyPage role={null} isIndex />;
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
    document.title = pageMeta(route)?.title || HOME_TITLE;
  }, [route]);

  let page;
  if (route.name === "apply") {
    page = <ApplyPage role={route.role} />;
  } else if (route.name === "apply-index") {
    page = <ApplyIndexPage />;
  } else if (route.name === "careers") {
    page = <CareersPage />;
  } else if (route.name === "download") {
    page = <DownloadPage />;
  } else if (route.name === "blog") {
    page = <BlogIndexPage />;
  } else if (route.name === "blog-category") {
    page = <BlogIndexPage category={route.category} />;
  } else if (route.name === "blog-post") {
    page = <BlogPostPage slug={route.slug} />;
  } else {
    page = <HomePage />;
  }

  return (
    <>
      {page}
      <Analytics />
    </>
  );
}
