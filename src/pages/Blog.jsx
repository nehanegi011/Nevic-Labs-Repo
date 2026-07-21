import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo.jsx';
import PostCard from '../components/blog/PostCard.jsx';
import posts from '../data/posts.json';

export default function Blog() {
  return (
    <>
      <Seo route="/blog" />
      <section className="page-hero">
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> / Blog</div>
          <span className="eyebrow">Blog · Field notes</span>
          <h1>Ideas from the frontline of <span>Indian healthcare</span>.</h1>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <div className="blog-grid">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
