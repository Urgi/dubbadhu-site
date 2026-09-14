import { track } from "@vercel/analytics";
import { APP_STORE_LABEL, APP_STORE_URL } from "../config/appLinks.js";

export default function AppStoreLink({ className = "btn btn-primary", children, onClick, placement }) {
  function handleClick(event) {
    track("app_store_click", placement ? { placement } : {});
    onClick?.(event);
  }

  return (
    <a
      href={APP_STORE_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
    >
      {children ?? APP_STORE_LABEL}
    </a>
  );
}
