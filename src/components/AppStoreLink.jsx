import { APP_STORE_LABEL, APP_STORE_URL } from "../config/appLinks.js";

export default function AppStoreLink({ className = "btn btn-primary", children, onClick }) {
  return (
    <a
      href={APP_STORE_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children ?? APP_STORE_LABEL}
    </a>
  );
}
