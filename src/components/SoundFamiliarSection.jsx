import { blogPostPath } from "../lib/routes.js";
import { publicPosts } from "../lib/pageMeta.js";

/**
 * Homepage "Sound familiar?" block. Lists up to four published posts that set
 * `homepage: { worry, answer }` in their frontmatter, and renders nothing until one does.
 */
const WORRIES = publicPosts.filter((p) => p.homepage).slice(0, 4);

export default function SoundFamiliarSection() {
  if (!WORRIES.length) return null;

  return (
    <section className="worries" id="sound-familiar" aria-labelledby="worries-heading">
      <h2 id="worries-heading" className="section-title">
        Sound familiar?
      </h2>
      <ul className="worries-list">
        {WORRIES.map((post) => (
          <li key={post.slug}>
            <p className="worries-q">“{post.homepage.worry}”</p>
            <p className="worries-a">
              {post.homepage.answer} <a href={blogPostPath(post.slug)}>Read the guide</a>
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
