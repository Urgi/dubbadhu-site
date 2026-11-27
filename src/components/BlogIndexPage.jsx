import SiteFooter from "./SiteFooter.jsx";
import SiteNav from "./SiteNav.jsx";
import { BLOG_PATH, blogCategoryPath, blogPostPath } from "../lib/routes.js";
import { categoryName, formatPostDate, publicPosts } from "../lib/pageMeta.js";

/** /blog, or /blog/category/<slug> when `category` is set. */
export default function BlogIndexPage({ category = null }) {
  const name = category ? categoryName(category) : null;
  const list = category ? publicPosts.filter((p) => p.categorySlug === category) : publicPosts;

  return (
    <>
      <SiteNav />
      <main id="main" className="blog-page">
        <nav className="blog-crumbs" aria-label="Breadcrumb">
          <a href="/">dubbadhu.com</a>
          <span aria-hidden="true">›</span>
          {category ? <a href={BLOG_PATH}>blog</a> : <span aria-current="page">blog</span>}
          {category ? (
            <>
              <span aria-hidden="true">›</span>
              <span aria-current="page">{name || category}</span>
            </>
          ) : null}
        </nav>

        <header className="blog-head">
          <h1 className="section-title">{category ? name || "Category not found" : "Dubbadhu Blog"}</h1>
          <p className="section-lede">
            Short guides to speaking Afaan Oromo with confidence, from the team behind the Dubbadhu app.
          </p>
        </header>

        {list.length ? (
          <ul className="blog-list">
            {list.map((post) => (
              <li key={post.slug} className="blog-card">
                <p className="blog-meta">
                  <a href={blogCategoryPath(post.categorySlug)}>{post.category}</a>
                  <span aria-hidden="true"> · </span>
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span aria-hidden="true"> · </span>
                  {post.readMinutes} min read
                </p>
                <h2 className="blog-card-title">
                  <a href={blogPostPath(post.slug)}>{post.title}</a>
                </h2>
                <p className="blog-card-summary">{post.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="blog-empty">The first guides are on their way. Check back soon.</p>
        )}
      </main>
      <SiteFooter />
    </>
  );
}
