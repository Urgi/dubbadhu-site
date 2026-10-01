import { useEffect } from "react";
import { track } from "@vercel/analytics";
import {
  APP_STORE_LABEL,
  APP_STORE_URL,
  PLAY_STORE_LABEL,
  PLAY_STORE_URL,
} from "../config/appLinks.js";
import { redirectMobileStore } from "../lib/detectDevice.js";

/**
 * Used when the app shell is served at /download. Hosting serves
 * download/index.html directly, which has the same store links without JavaScript.
 */
export default function DownloadPage() {
  useEffect(() => {
    redirectMobileStore();
  }, []);

  return (
    <>
      <header className="site-header site-header--scrolled">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="/" className="nav-logo" aria-label="Dubbadhu home">
            <img className="nav-logo-mark" src="/assets/app-icon.png" alt="" width={36} height={36} />
            <span className="nav-logo-text">Dubbadhu</span>
          </a>
        </nav>
      </header>
      <main id="main" className="download-landing">
        <div className="download-landing-inner">
          <img className="download-landing-icon" src="/assets/app-icon.png" alt="" width={72} height={72} />
          <p className="section-label">Get the app</p>
          <h1 className="section-title">Download Dubbadhu</h1>
          <p className="section-lede">
            Speak with Confidence. Afaan Oromo is available now on iPhone, iPad, and Android. Amharic
            and Tigrinya are in development.
          </p>
          <div className="download-actions">
            <a
              className="btn btn-primary"
              href={APP_STORE_URL}
              onClick={() => track("app_store_click", { placement: "download-page" })}
            >
              {APP_STORE_LABEL}
            </a>
            <a
              className="btn btn-secondary"
              href={PLAY_STORE_URL}
              onClick={() => track("play_store_click", { placement: "download-page" })}
            >
              {PLAY_STORE_LABEL}
            </a>
          </div>
          <p className="download-hint">
            iPhone and iPad open the App Store. Android opens Google Play. If that does not happen,
            choose a store above.
          </p>
        </div>
      </main>
    </>
  );
}
