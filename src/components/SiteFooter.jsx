import AppStoreLink from "./AppStoreLink.jsx";
import PlayStoreLink from "./PlayStoreLink.jsx";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, TIKTOK_HANDLE, TIKTOK_URL } from "../config/brand.js";

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
            Afaan Oromo language learning on iOS &amp; Android. For the Horn and US diaspora. Amharic &amp;
            Tigrinya coming next. SPEAK · LEARN · PRESERVE.
          </p>
        </div>
        <nav className="footer-nav" aria-label="Footer">
          <a href="/about/">About</a>
          <a href="/afaan-oromo/">Afaan Oromo</a>
          <a href="/languages/">Languages</a>
          <a href="/support/">Support</a>
          <a href="/delete-account/">Delete account</a>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            Instagram {INSTAGRAM_HANDLE}
          </a>
          <a href={TIKTOK_URL} target="_blank" rel="noopener noreferrer">
            TikTok {TIKTOK_HANDLE}
          </a>
          <a href="mailto:support@afaantech.com">support@afaantech.com</a>
          <AppStoreLink className="footer-app-link">App Store</AppStoreLink>
          <PlayStoreLink className="footer-app-link">Google Play</PlayStoreLink>
        </nav>
        <p className="footer-copy">© {year} Afaan LLC. All rights reserved.</p>
      </div>
    </footer>
  );
}
