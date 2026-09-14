import { CAREERS_ROLES, careerRoleById } from "../config/careers.js";

/** Path for a role application page, e.g. `/apply/amharic-language-professional`. */
export function applyPathForRole(roleId) {
  return `/apply/${encodeURIComponent(roleId)}`;
}

export const CAREERS_PATH = "/careers";

export function parseAppRoute(pathname = window.location.pathname) {
  const path = (pathname || "/").replace(/\/index\.html$/, "").replace(/\/$/, "") || "/";
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
