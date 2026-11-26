import { useEffect, useState } from "react";
import DownloadButton from "./DownloadButton.jsx";

/**
 * Phone-only download bar. Shows once the hero button has scrolled away,
 * and hides again while the Get the app section is on screen.
 */
export default function MobileDownloadBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [downloadInView, setDownloadInView] = useState(false);

  useEffect(() => {
    const hero = document.querySelector(".hero .hero-actions");
    const download = document.getElementById("download");
    if (!hero || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.target === hero) {
          setHeroGone(!entry.isIntersecting && entry.boundingClientRect.top < 0);
        } else {
          setDownloadInView(entry.isIntersecting);
        }
      });
    });
    observer.observe(hero);
    if (download) observer.observe(download);
    return () => observer.disconnect();
  }, []);

  const shown = heroGone && !downloadInView;

  return (
    <div className={"mobile-cta" + (shown ? " is-shown" : "")}>
      <img className="mobile-cta-icon" src="/assets/app-icon.png" alt="" width="40" height="40" />
      <DownloadButton className="btn btn-primary mobile-cta-btn" placement="sticky" />
    </div>
  );
}
