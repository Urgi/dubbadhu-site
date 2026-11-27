import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { normalizePath } from "./lib/routes.js";
import "./index.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Prerendered pages mark which path they were built for. A page served through a
// rewrite (for example an unknown /apply role) holds another page's HTML, so it
// drops it and renders from scratch.
if (container.dataset.prerendered === normalizePath(window.location.pathname)) {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
