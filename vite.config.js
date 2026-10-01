import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = fileURLToPath(new URL(".", import.meta.url));

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

function rewriteDownload(req) {
  const path = (req.url || "").split("?")[0];
  if (path !== "/download" && path !== "/download/") return;
  const search = (req.url || "").includes("?") ? req.url.slice(req.url.indexOf("?")) : "";
  req.url = `/download/index.html${search}`;
}

function servePublicHtmlDirs() {
  return {
    name: "serve-public-html-dirs",
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        rewriteDownload(req);
        next();
      });
    },
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const path = (req.url || "").split("?")[0];
        const match = STATIC_DIRS.find((dir) => path === dir || path === `${dir}/`);
        if (match) {
          req.url = `${match}/index.html`;
          next();
          return;
        }
        if (path === "/download" || path === "/download/") {
          rewriteDownload(req);
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
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        download: resolve(root, "download/index.html"),
      },
    },
  },
});
