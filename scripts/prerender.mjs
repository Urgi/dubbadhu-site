/**
 * Runs after `vite build` and the SSR build. Writes static HTML for the homepage,
 * the blog, careers and apply pages, each with its own head tags, so search
 * crawlers get the page text and links without running JavaScript. Then adds
 * published blog pages to dist/sitemap.xml.
 */
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist`;
const SITE_URL = "https://dubbadhu.com";

const { render, prerenderPaths, posts } = await import(
  pathToFileURL(`${root}dist-ssr/entry-server.js`).href
);
const template = await readFile(`${dist}/index.html`, "utf8");

function attr(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function replaceOnce(html, pattern, value, label) {
  if (!pattern.test(html)) throw new Error(`prerender: could not find ${label} in index.html`);
  return html.replace(pattern, () => value);
}

function applyHead(html, meta) {
  const url = `${SITE_URL}${meta.path === "/" ? "/" : meta.path}`;
  const title = attr(meta.title);
  const description = attr(meta.description);
  const swaps = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, "title"],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`, "description"],
    [/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, "canonical"],
    [/<meta property="og:type" content="[^"]*" \/>/, `<meta property="og:type" content="${meta.ogType || "website"}" />`, "og:type"],
    [/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${url}" />`, "og:url"],
    [/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${title}" />`, "og:title"],
    [/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${description}" />`, "og:description"],
    [/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${title}" />`, "twitter:title"],
    [/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${description}" />`, "twitter:description"],
  ];
  for (const [pattern, value, label] of swaps) html = replaceOnce(html, pattern, value, label);

  const ld = (meta.jsonLd || [])
    .map((obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, "\\u003c")}</script>`)
    .join("\n    ");
  html = replaceOnce(html, /<script type="application\/ld\+json">[\s\S]*?<\/script>/, ld, "JSON-LD");

  if (meta.noindex) {
    html = html.replace("</title>", '</title>\n    <meta name="robots" content="noindex" />');
  }
  return html;
}

const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error("prerender: #root marker not found in dist/index.html");

for (const path of prerenderPaths()) {
  const { html: body, meta } = render(path);
  let html = template.replace(marker, `<div id="root" data-prerendered="${attr(path)}">${body}</div>`);
  if (meta) html = applyHead(html, meta);
  const file = path === "/" ? `${dist}/index.html` : `${dist}${path}/index.html`;
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, html);
  console.log(`prerender: ${path}${meta?.noindex ? " (noindex)" : ""}`);
}

// Published blog pages go into the sitemap. Drafts never do.
const live = posts.filter((p) => !p.draft);
if (live.length) {
  const newest = live.reduce((d, p) => (p.updated > d ? p.updated : d), live[0].updated);
  const entry = (path, lastmod, priority) =>
    `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>\n`;
  const categories = new Map();
  for (const p of live) {
    const prev = categories.get(p.categorySlug);
    if (!prev || p.updated > prev) categories.set(p.categorySlug, p.updated);
  }
  const entries = [
    entry("/blog", newest, "0.8"),
    ...[...categories].map(([slug, lastmod]) => entry(`/blog/category/${slug}`, lastmod, "0.5")),
    ...live.map((p) => entry(`/blog/${p.slug}`, p.updated, "0.7")),
  ].join("");
  const sitemapPath = `${dist}/sitemap.xml`;
  const sitemap = await readFile(sitemapPath, "utf8");
  await writeFile(sitemapPath, replaceOnce(sitemap, /<\/urlset>/, `${entries}</urlset>`, "</urlset>"));
}
console.log(`prerender: sitemap has ${live.length} published blog post(s)`);

await rm(`${root}dist-ssr`, { recursive: true, force: true });
