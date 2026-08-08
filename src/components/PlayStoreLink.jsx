import { PLAY_STORE_LABEL, PLAY_STORE_URL } from "../config/appLinks.js";

export default function PlayStoreLink({ className = "btn btn-primary", children, onClick }) {
  return (
    <a
      href={PLAY_STORE_URL}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      {children ?? PLAY_STORE_LABEL}
    </a>
  );
}
