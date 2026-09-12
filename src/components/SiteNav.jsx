import { useEffect, useState } from "react";
import { prefersAndroidStore } from "../config/appLinks.js";
import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";

const LINKS = [
  { href: "#product", label: "App" },
  { href: "#mission", label: "Languages" },
  { href: "#reviews", label: "Reviews" },
  { href: "#classes", label: "Classes" },
  { href: "/about/", label: "About" },
];

function isHomePath() {
  const path = window.location.pathname.replace(/\/index\.html$/, "/") || "/";
  return path === "/";
}

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [androidFirst, setAndroidFirst] = useState(false);

  useEffect(() => {
    setAndroidFirst(prefersAndroidStore());
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  function goHome(e) {
    closeMenu();
    if (!isHomePath()) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  const storeLinks = androidFirst
    ? [
        { key: "play", Link: PlayStoreLink, label: "Play", extraClass: "" },
        { key: "ios", Link: AppStoreLink, label: "App Store", extraClass: " nav-cta--secondary" },
      ]
    : [
        { key: "ios", Link: AppStoreLink, label: "App Store", extraClass: "" },
        { key: "play", Link: PlayStoreLink, label: "Play", extraClass: " nav-cta--secondary" },
      ];

  return (
    <header id="top" className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href="/" className="nav-logo" aria-label="Dubbadhu home" onClick={goHome}>
          <img
            className="nav-logo-mark"
            src="/assets/talking.png"
            alt=""
            width={36}
            height={36}
          />
          <span className="nav-logo-text">Dubbadhu</span>
        </a>

        <button
          type="button"
          className="nav-menu-btn"
          aria-expanded={open}
          aria-controls="nav-panel"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span className="nav-menu-icon" aria-hidden="true" />
        </button>

        <div id="nav-panel" className={`nav-panel${open ? " nav-panel--open" : ""}`}>
          <ul className="nav-links">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={closeMenu}>
                  {l.label}
                </a>
              </li>
            ))}
            <li className="nav-links-cta">
              {storeLinks.map(({ key, Link, label, extraClass }) => (
                <Link key={key} className={`nav-cta${extraClass}`} onClick={closeMenu}>
                  {label}
                </Link>
              ))}
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
