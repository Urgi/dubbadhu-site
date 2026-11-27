import { posts } from "virtual:blog-posts";
import { BLOG_PATH, blogCategoryPath, blogPostPath } from "./routes.js";

export const SITE_URL = "https://dubbadhu.com";
const ORG_ID = `${SITE_URL}/#organization`;
const LOGO = `${SITE_URL}/apple-touch-icon.png`;

export const HOME_TITLE = "Dubbadhu: Learn Afaan Oromo App | Speak with Confidence";

export const publicPosts = posts.filter((p) => !p.draft);

export function postBySlug(slug) {
  return posts.find((p) => p.slug === slug) || null;
}

/** Category name for a category slug, taken from any post (drafts included). */
export function categoryName(categorySlug) {
  return posts.find((p) => p.categorySlug === categorySlug)?.category || null;
}

export function formatPostDate(date) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function breadcrumbs(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

const BLOG_TITLE = "Dubbadhu Blog: Learn Afaan Oromo, one question at a time";
const BLOG_DESCRIPTION =
  "Short, practical guides to speaking Afaan Oromo: greetings, pronunciation, family conversations and staying consistent. From the team behind the Dubbadhu app.";

/**
 * Head tags for a route. Returns null for the homepage, which keeps the tags in index.html.
 * @returns {null | { title: string, description: string, path: string, ogType?: string, noindex?: boolean, jsonLd?: object[] }}
 */
export function pageMeta(route) {
  switch (route.name) {
    case "blog": {
      return {
        title: BLOG_TITLE,
        description: BLOG_DESCRIPTION,
        path: BLOG_PATH,
        noindex: publicPosts.length === 0,
        jsonLd: [
          breadcrumbs([
            { name: "Dubbadhu", path: "/" },
            { name: "Blog", path: BLOG_PATH },
          ]),
        ],
      };
    }
    case "blog-category": {
      const name = categoryName(route.category);
      if (!name) return notFoundMeta();
      const path = blogCategoryPath(route.category);
      return {
        title: `${name} — Dubbadhu Blog`,
        description: `Dubbadhu guides about ${name.toLowerCase()} for people learning to speak Afaan Oromo.`,
        path,
        noindex: !publicPosts.some((p) => p.categorySlug === route.category),
        jsonLd: [
          breadcrumbs([
            { name: "Dubbadhu", path: "/" },
            { name: "Blog", path: BLOG_PATH },
            { name, path },
          ]),
        ],
      };
    }
    case "blog-post": {
      const post = postBySlug(route.slug);
      if (!post) return notFoundMeta();
      const path = blogPostPath(post.slug);
      const url = `${SITE_URL}${path}`;
      const jsonLd = [
        {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated,
          articleSection: post.category,
          inLanguage: "en",
          url,
          mainEntityOfPage: url,
          image: LOGO,
          author: { "@type": "Organization", name: "Dubbadhu", url: SITE_URL },
          publisher: {
            "@type": "Organization",
            "@id": ORG_ID,
            name: "Afaan LLC",
            logo: { "@type": "ImageObject", url: LOGO },
          },
        },
        breadcrumbs([
          { name: "Dubbadhu", path: "/" },
          { name: "Blog", path: BLOG_PATH },
          { name: post.category, path: blogCategoryPath(post.categorySlug) },
          { name: post.title, path },
        ]),
      ];
      if (post.faq.length) {
        jsonLd.push({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        });
      }
      return {
        title: `${post.title} | Dubbadhu`,
        description: post.description,
        path,
        ogType: "article",
        noindex: post.draft,
        jsonLd,
      };
    }
    case "careers":
      return {
        title: "Careers — Dubbadhu",
        description:
          "Part-time, remote roles at Dubbadhu: Amharic and Tigrinya language professionals, a learning researcher, a project manager and a social media manager.",
        path: "/careers",
      };
    case "apply-index":
      return {
        title: "Apply — Dubbadhu careers",
        description: "Apply for a part-time, remote role at Dubbadhu.",
        path: "/apply",
      };
    case "apply":
      return route.role
        ? {
            title: `Apply · ${route.role.title} — Dubbadhu`,
            description: `Apply to be Dubbadhu's ${route.role.title}. Part-time and remote.`,
            path: `/apply/${route.role.id}`,
          }
        : {
            title: "Apply — Dubbadhu careers",
            description: "Apply for a part-time, remote role at Dubbadhu.",
            path: "/apply",
            noindex: true,
          };
    case "download":
      return { title: "Download Dubbadhu", description: "Get Dubbadhu on the App Store or Google Play.", path: "/download" };
    default:
      return null;
  }
}

function notFoundMeta() {
  return {
    title: "Page not found — Dubbadhu",
    description: "This page does not exist.",
    path: "/",
    noindex: true,
  };
}
