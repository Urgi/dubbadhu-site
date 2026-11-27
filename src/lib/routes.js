import { DOWNLOAD_PATH } from "../config/appLinks.js";
import { CAREERS_ROLES, careerRoleById } from "../config/careers.js";

/** Path for a role application page, e.g. `/apply/amharic-language-professional`. */
export function applyPathForRole(roleId) {
  return `/apply/${encodeURIComponent(roleId)}`;
}

export const CAREERS_PATH = "/careers";
export const BLOG_PATH = "/blog";

export function blogPostPath(slug) {
  return `${BLOG_PATH}/${slug}`;
}

export function blogCategoryPath(categorySlug) {
  return `${BLOG_PATH}/category/${categorySlug}`;
}

export function normalizePath(pathname) {
  return (pathname || "/").replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
}

let serverPath = "/";

/** Build-time rendering has no window; the prerender sets the path it is rendering. */
export function setServerPath(path) {
  serverPath = path;
}

export function currentPath() {
  return typeof window !== "undefined" ? window.location.pathname : serverPath;
}

export function parseAppRoute(pathname = currentPath()) {
  const path = normalizePath(pathname);
  if (path === BLOG_PATH) {
    return { name: "blog" };
  }
  const categoryMatch = path.match(/^\/blog\/category\/([^/]+)$/);
  if (categoryMatch) {
    return { name: "blog-category", category: decodeURIComponent(categoryMatch[1]) };
  }
  const postMatch = path.match(/^\/blog\/([^/]+)$/);
  if (postMatch) {
    return { name: "blog-post", slug: decodeURIComponent(postMatch[1]) };
  }
  const applyMatch = path.match(/^\/apply\/([^/]+)$/);
  if (applyMatch) {
    const roleId = decodeURIComponent(applyMatch[1]);
    return { name: "apply", roleId, role: careerRoleById(roleId) };
  }
  if (path === "/apply") {
    return { name: "apply-index" };
  }
  if (path === "/careers") {
    return { name: "careers" };
  }
  if (path === DOWNLOAD_PATH) {
    return { name: "download" };
  }
  return { name: "home" };
}

/** Old homepage hashes → dedicated careers / apply pages. */
export function redirectLegacyApplyHash() {
  const hash = (window.location.hash || "").replace(/^#/, "");
  if (hash === "careers" || hash === "careers-roles") {
    const nextHash = hash === "careers-roles" ? "#careers-roles" : "";
    window.location.replace(`${CAREERS_PATH}${nextHash}`);
    return true;
  }
  if (!hash.startsWith("apply-")) return false;
  const roleId = hash.slice("apply-".length);
  if (!careerRoleById(roleId)) return false;
  window.location.replace(applyPathForRole(roleId));
  return true;
}

export function allApplyPaths() {
  return CAREERS_ROLES.map((role) => applyPathForRole(role.id));
}
