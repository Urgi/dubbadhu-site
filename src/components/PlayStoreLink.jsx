import { track } from "@vercel/analytics";
import { PLAY_STORE_LABEL, PLAY_STORE_URL } from "../config/appLinks.js";

export default function PlayStoreLink({ className = "btn btn-primary", children, onClick, placement }) {
  function handleClick(event) {
    track("play_store_click", placement ? { placement } : {});
    onClick?.(event);
  }

  return (
    <a
      href={PLAY_STORE_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children ?? PLAY_STORE_LABEL}
    </a>
  );
}
