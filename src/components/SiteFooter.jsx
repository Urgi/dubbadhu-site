export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/assets/talking.png" alt="" width={28} height={28} />
            <span>
              Dubbadhu<span className="nav-logo-dot">.</span>
            </span>
          </div>
          <p className="footer-tagline">
            Speak · Learn · Preserve — Afaan Oromo for the diaspora, from Afaan LLC.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="mailto:admin@afaantech.com">admin@afaantech.com</a>
          <a href="#waitlist">Waitlist</a>
        </nav>
        <p className="footer-copy">© {year} Afaan LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
