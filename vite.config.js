import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { loadPosts } from "./scripts/blog-posts.mjs";

const root = fileURLToPath(new URL(".", import.meta.url));
const BLOG_DIR = resolve(root, "content/blog");
const BLOG_MODULE = "virtual:blog-posts";
const BLOG_MODULE_ID = "\0" + BLOG_MODULE;

/** Exposes content/blog/*.md to the app as `import { posts } from "virtual:blog-posts"`. */
function blogPosts() {
  // Drafts show on the dev server and Vercel preview deploys, never in production.
  let includeDrafts = false;
  return {
    name: "blog-posts",
    configResolved(config) {
      includeDrafts =
        config.command === "serve" ||
        process.env.VERCEL_ENV === "preview" ||
        process.env.BLOG_DRAFTS === "1";
    },
    resolveId(id) {
      return id === BLOG_MODULE ? BLOG_MODULE_ID : null;
    },
    load(id) {
      if (id !== BLOG_MODULE_ID) return null;
      this.addWatchFile(BLOG_DIR);
      return `export const posts = ${JSON.stringify(loadPosts(BLOG_DIR, { includeDrafts }))};`;
    },
    configureServer(server) {
      server.watcher.add(BLOG_DIR);
      const reload = (file) => {
        if (!file.startsWith(BLOG_DIR)) return;
        const mod = server.moduleGraph.getModuleById(BLOG_MODULE_ID);
        if (mod) server.moduleGraph.invalidateModule(mod);
        server.ws.send({ type: "full-reload" });
      };
      server.watcher.on("add", reload);
      server.watcher.on("change", reload);
      server.watcher.on("unlink", reload);
    },
  };
}

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
        if (
          path === "/apply" ||
          path.startsWith("/apply/") ||
          path === "/careers" ||
          path === "/careers/" ||
          path === "/blog" ||
          path.startsWith("/blog/")
        ) {
          req.url = "/index.html";
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), blogPosts(), servePublicHtmlDirs()],
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
