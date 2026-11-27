import { track } from "@vercel/analytics";
import SiteFooter from "./SiteFooter.jsx";
import SiteNav from "./SiteNav.jsx";
import { APP_STORE_URL, PLAY_STORE_URL } from "../config/appLinks.js";
import { BLOG_PATH, blogCategoryPath, blogPostPath } from "../lib/routes.js";
import { formatPostDate, postBySlug } from "../lib/pageMeta.js";

export default function BlogPostPage({ slug }) {
  const post = postBySlug(slug);

  if (!post) {
    return (
      <>
        <SiteNav />
        <main id="main" className="blog-page">
          <h1 className="section-title">Page not found</h1>
          <p className="section-lede">
            This guide does not exist. <a href={BLOG_PATH}>See all guides</a>.
          </p>
        </main>
        <SiteFooter />
      </>
    );
  }

  const related = post.related.map(postBySlug).filter(Boolean);

  return (
    <>
      <SiteNav />
      <main id="main" className="blog-page">
        <nav className="blog-crumbs" aria-label="Breadcrumb">
          <a href="/">dubbadhu.com</a>
          <span aria-hidden="true">›</span>
          <a href={BLOG_PATH}>blog</a>
          <span aria-hidden="true">›</span>
          <a href={blogCategoryPath(post.categorySlug)}>{post.category}</a>
        </nav>

        <article className="post">
          <header className="post-head">
            <h1>{post.title}</h1>
            <p className="blog-meta">
              <time dateTime={post.date}>{formatPostDate(post.date)}</time>
              <span aria-hidden="true"> · </span>
              {post.readMinutes} min read
            </p>
          </header>

          <div className="post-body" dangerouslySetInnerHTML={{ __html: post.html }} />

          {post.faq.length ? (
            <section className="post-section" aria-labelledby="quick-answers">
              <h2 id="quick-answers">Quick answers</h2>
              <dl className="post-faq">
                {post.faq.map((f) => (
                  <div key={f.q}>
                    <dt>{f.q}</dt>
                    <dd>{f.a}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {post.today ? (
            <section className="post-section post-today" aria-labelledby="one-thing-today">
              <h2 id="one-thing-today">One thing to do today</h2>
              <p>{post.today}</p>
            </section>
          ) : null}

          <section className="post-cta" aria-labelledby="get-dubbadhu">
            <h2 id="get-dubbadhu">Get Dubbadhu</h2>
            <p>Practice Afaan Oromo conversations with native speakers, a few minutes a day.</p>
            <div className="post-cta-actions">
              <a
                className="btn btn-primary"
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("app_store_click", { placement: "blog" })}
              >
                App Store
              </a>
              <a
                className="btn btn-secondary"
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("play_store_click", { placement: "blog" })}
              >
                Google Play
              </a>
            </div>
          </section>

          {related.length ? (
            <section className="post-section" aria-labelledby="related-guides">
              <h2 id="related-guides">Related guides</h2>
              <ul className="post-related">
                {related.map((r) => (
                  <li key={r.slug}>
                    <a href={blogPostPath(r.slug)}>{r.title}</a>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
