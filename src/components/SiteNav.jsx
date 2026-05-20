import { useEffect, useState } from "react";

const LINKS = [
  { href: "#curriculum", label: "Curriculum" },
  { href: "#languages", label: "Languages" },
  { href: "#contact", label: "Contact" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header className={`site-header${scrolled ? " site-header--scrolled" : ""}`}>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Primary">
        <a href="./" className="nav-logo" onClick={closeMenu}>
          <img
            className="nav-logo-mark"
            src="/assets/talking.png"
            alt=""
            width={36}
            height={36}
          />
          <span className="nav-logo-text">
            Dubbadhu<span className="nav-logo-dot">.</span>
          </span>
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
            <a href="#waitlist" className="nav-cta" onClick={closeMenu}>
              Get the app
            </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
