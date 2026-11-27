import { track } from "@vercel/analytics";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config/appLinks.js";

/** Plain links to both stores, so every visitor (and crawler) sees them. */
export default function StoreLinks({ placement }) {
  return (
    <p className="store-links">
      Get Dubbadhu on the{" "}
      <a
        href={APP_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("app_store_click", { placement })}
      >
        App Store
      </a>{" "}
      and{" "}
      <a
        href={PLAY_STORE_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("play_store_click", { placement })}
      >
        Google Play
      </a>
    </p>
  );
}
