import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const STATIC_DIRS = [
  "/about",
  "/afaan-oromo",
  "/languages",
  "/support",
  "/privacy",
  "/terms",
  "/delete-account",
  "/community-guidelines",
];

function servePublicHtmlDirs() {
  return {
    name: "serve-public-html-dirs",
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = (req.url || "").split("?")[0];
        const match = STATIC_DIRS.find((dir) => path === dir || path === `${dir}/`);
        if (match) {
          req.url = `${match}/index.html`;
          next();
          return;
        }
        if (path === "/apply" || path.startsWith("/apply/") || path === "/careers" || path === "/careers/") {
          req.url = "/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), servePublicHtmlDirs()],
  publicDir: "public",
});
