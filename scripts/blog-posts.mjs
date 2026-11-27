/**
 * Blog posts: one Markdown file per post in content/blog/. Read at build time
 * (and by the dev server), so no Markdown or YAML parser ships to the browser.
 *
 * Frontmatter (YAML between --- lines):
 *   title        required  The exact question people search. Used as the H1.
 *   description  required  One-line summary, ~150 characters. Meta description and blog index.
 *   slug         optional  URL path: /blog/<slug>. Defaults to the file name.
 *   category     required  e.g. "Speaking practice". Breadcrumb and /blog/category/<category-slug>.
 *   date         required  Publish date, YYYY-MM-DD.
 *   updated      optional  Last edit date, YYYY-MM-DD. Used for sitemap lastmod.
 *   faq          optional  List of { q, a }. Rendered as "Quick answers" and FAQPage JSON-LD.
 *   today        optional  One sentence for the "One thing to do today" section.
 *   related      optional  List of 2–3 other post slugs for "Related guides".
 *   homepage     optional  { worry, answer } to list the post in the homepage "Sound familiar?" block.
 *   draft        optional  true builds the post only on the dev server and preview deploys (noindex there), never in production.
 *
 * Body: Markdown, with GitHub tables. A short audio clip goes on its own line:
 *   {{audio https://example.com/clip.m4a "Akkam jirta? — How are you?"}}
 */
import { readdirSync, readFileSync } from "node:fs";
import { basename, join } from "node:path";
import yaml from "js-yaml";
import { marked } from "marked";

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const AUDIO = /^\{\{audio\s+(https:\/\/\S+|\/\S+)(?:\s+"([^"]*)")?\s*\}\}$/gm;

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function countWords(text) {
  return (String(text).replace(/<[^>]+>/g, " ").match(/[\p{L}\p{N}'’]+/gu) || []).length;
}

function parseFile(file) {
  const raw = readFileSync(file, "utf8").replace(/^﻿/, "");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) throw new Error(`${file}: missing --- frontmatter --- block`);

  // CORE_SCHEMA keeps dates as plain strings.
  const fm = yaml.load(match[1], { schema: yaml.CORE_SCHEMA }) || {};
  const fail = (msg) => {
    throw new Error(`${basename(file)}: ${msg}`);
  };

  for (const key of ["title", "description", "category", "date"]) {
    if (typeof fm[key] !== "string" || !fm[key].trim()) fail(`"${key}" is required`);
  }
  const slug = fm.slug ? String(fm.slug) : basename(file, ".md");
  if (!SLUG.test(slug)) fail(`slug "${slug}" must be lowercase words joined by hyphens`);
  if (!DATE.test(fm.date)) fail(`date must be YYYY-MM-DD`);
  if (fm.updated != null && !DATE.test(fm.updated)) fail(`updated must be YYYY-MM-DD`);

  const faq = fm.faq ?? [];
  if (!Array.isArray(faq) || faq.some((f) => !f || typeof f.q !== "string" || typeof f.a !== "string")) {
    fail(`faq must be a list of { q, a }`);
  }
  const related = fm.related ?? [];
  if (!Array.isArray(related) || related.some((s) => typeof s !== "string")) {
    fail(`related must be a list of post slugs`);
  }
  const homepage = fm.homepage ?? null;
  if (homepage && (typeof homepage.worry !== "string" || typeof homepage.answer !== "string")) {
    fail(`homepage must be { worry, answer }`);
  }

  const body = match[2].replace(AUDIO, (_m, src, label) => {
    const caption = label ? `<figcaption>${escapeHtml(label)}</figcaption>` : "";
    return `<figure class="post-audio"><audio controls preload="none" src="${escapeHtml(src)}"></audio>${caption}</figure>`;
  });
  const html = marked.parse(body, { gfm: true });
  const words =
    countWords(html) +
    countWords(fm.title) +
    countWords(fm.today || "") +
    faq.reduce((n, f) => n + countWords(f.q) + countWords(f.a), 0);

  return {
    slug,
    title: fm.title.trim(),
    description: fm.description.trim(),
    category: fm.category.trim(),
    categorySlug: slugify(fm.category),
    date: fm.date,
    updated: fm.updated || fm.date,
    faq,
    today: typeof fm.today === "string" ? fm.today.trim() : "",
    related,
    homepage,
    draft: fm.draft === true,
    readMinutes: Math.max(1, Math.round(words / 230)),
    html,
  };
}

/** All posts, newest first. Every file is checked; drafts are returned only when includeDrafts is set. */
export function loadPosts(dir, { includeDrafts = true } = {}) {
  let files = [];
  try {
    files = readdirSync(dir).filter((f) => f.endsWith(".md"));
  } catch {
    return [];
  }
  const posts = files.map((f) => parseFile(join(dir, f)));

  const bySlug = new Map();
  for (const post of posts) {
    if (bySlug.has(post.slug)) throw new Error(`Two blog posts use the slug "${post.slug}"`);
    bySlug.set(post.slug, post);
  }
  for (const post of posts) {
    for (const slug of post.related) {
      const target = bySlug.get(slug);
      if (!target) throw new Error(`${post.slug}: related post "${slug}" does not exist`);
      if (!post.draft && target.draft) {
        throw new Error(`${post.slug}: related post "${slug}" is still a draft`);
      }
    }
  }

  return posts
    .filter((p) => includeDrafts || !p.draft)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
