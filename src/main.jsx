import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App.jsx";
import { parseAppRoute } from "./lib/routes.js";
import "./index.css";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// The built index.html holds the prerendered homepage. Other routes share that
// file through rewrites, so they drop it and render from scratch.
if (container.hasChildNodes() && parseAppRoute().name === "home") {
  hydrateRoot(container, app);
} else {
  container.textContent = "";
  createRoot(container).render(app);
}
