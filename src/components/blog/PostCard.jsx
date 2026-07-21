import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    <Link className="post" to={`/blog/${post.slug}`}>
      <div
        className={`post-cover ${post.cover}`}
        style={{ backgroundImage: `url('/assets/img/blog/${post.slug}.svg')` }}
      >
        <span className="cat">{post.cat}</span>
      </div>
      <div className="post-body">
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="post-more">Read the full post →</div>
        <div className="post-meta">
          <span>{post.readtime}</span>
          <span>{post.date}</span>
        </div>
      </div>
    </Link>
  );
}
