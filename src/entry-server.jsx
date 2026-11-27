import { renderToString } from "react-dom/server";
import App from "./App.jsx";
import { parseAppRoute, setServerPath } from "./lib/routes.js";
import { pageMeta } from "./lib/pageMeta.js";
import { CAREERS_ROLES, ROLE_ALIASES } from "./config/careers.js";
import { posts } from "virtual:blog-posts";

export { posts };

/** Every path the build writes as static HTML. Drafts are only present on dev and preview builds. */
export function prerenderPaths() {
  const categories = [...new Set(posts.map((p) => p.categorySlug))];
  return [
    "/",
    "/blog",
    ...categories.map((c) => `/blog/category/${c}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    "/careers",
    "/apply",
    ...CAREERS_ROLES.map((r) => `/apply/${r.id}`),
    // Old role links still resolve; their canonical points at the current role.
    ...Object.keys(ROLE_ALIASES).map((id) => `/apply/${id}`),
  ];
}

/** Build-time render of one page, so crawlers get its text without JavaScript. */
export function render(path) {
  setServerPath(path);
  return { html: renderToString(<App />), meta: pageMeta(parseAppRoute(path)) };
}
