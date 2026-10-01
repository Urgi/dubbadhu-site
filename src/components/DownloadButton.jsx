import { useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { downloadOffer } from "../config/appLinks.js";
import { detectDownloadPlatform } from "../lib/detectDevice.js";

export function trackDownloadClick(offer, placement) {
  const name =
    offer.platform === "ios"
      ? "app_store_click"
      : offer.platform === "android"
        ? "play_store_click"
        : "download_click";
  track(name, placement ? { placement } : {});
}

/**
 * Device-aware store link.
 * The first render always uses the desktop offer so server and client markup
 * match. The real platform is applied after mount, and only in the browser.
 */
export function useDownloadOffer() {
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    setPlatform(detectDownloadPlatform());
  }, []);

  return downloadOffer(platform);
}

export default function DownloadButton({ className = "btn btn-primary", onClick, placement }) {
  const offer = useDownloadOffer();

  function handleClick(event) {
    trackDownloadClick(offer, placement);
    onClick?.(event);
  }

  return (
    <a
      href={offer.href}
      className={className}
      onClick={handleClick}
      {...(offer.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {offer.label}
    </a>
  );
}
