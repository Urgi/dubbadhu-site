import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";
import { INSTAGRAM_URL, TIKTOK_URL } from "../config/brand.js";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">Dubbadhu</div>
          <p className="footer-tagline">
            African language learning on iOS &amp; Android. For the Horn and diaspora. Amharic &amp;
            Tigrinya in development.
          </p>
        </div>

        <nav className="footer-nav" aria-label="Footer">
          <div className="footer-col">
            <p className="footer-col-label">Explore</p>
            <a href="/about/">About</a>
            <a href="/afaan-oromo/">Afaan Oromo</a>
            <a href="/languages/">Languages</a>
            <a href="/#classes">Online classes</a>
            <a href="/support/">Support</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-label">Legal</p>
            <a href="/privacy/">Privacy</a>
            <a href="/terms/">Terms</a>
            <a href="/delete-account/">Delete account</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-label">Connect</p>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
            <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
              TikTok
            </a>
            <a href="mailto:support@afaantech.com">Email</a>
          </div>
          <div className="footer-col">
            <p className="footer-col-label">Get the app</p>
            <AppStoreLink className="footer-app-link">App Store</AppStoreLink>
            <PlayStoreLink className="footer-app-link">Google Play</PlayStoreLink>
          </div>
        </nav>

        <p className="footer-copy">© {year} Afaan LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
