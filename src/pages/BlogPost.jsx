import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import PostBody from '../components/blog/PostBody.jsx';
import PostCard from '../components/blog/PostCard.jsx';
import NotFound from './NotFound.jsx';
import posts from '../data/posts.json';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFound />;

  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{`${post.title} · Nevic Labs`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <article className="article">
        <div className="crumbs" style={{ marginBottom: '14px', color: 'var(--ink-2)' }}>
          <Link to="/" style={{ color: 'var(--ink-2)' }}>Home</Link> /{' '}
          <Link to="/blog" style={{ color: 'var(--ink-2)' }}>Blog</Link> / {post.cat}
        </div>
        <div
          className={`cover ${post.cover}`}
          style={{ backgroundImage: `url('/assets/img/blog/${post.slug}.svg')` }}
        ></div>
        <div className="amet">
          <span className="cat">{post.cat}</span>
          <span>{post.readtime}</span>
          <span>{post.date}</span>
        </div>
        <h1>{post.title}</h1>
        <PostBody paragraphs={post.paragraphs} />
      </article>

      <section className="section">
        <div className="wrap">
          <div className="head" style={{ marginBottom: '32px' }}>
            <span className="eyebrow">Keep reading</span>
            <h2 style={{ fontSize: '32px' }}>More field notes</h2>
          </div>
          <div className="blog-grid">
            {more.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
