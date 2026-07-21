import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export default function NotFound() {
  return (
    <>
      <Helmet><title>Page not found · Nevic Labs</title></Helmet>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow" style={{ fontSize: '20px' }}>404</span>
          <h1>This page could not be found.</h1>
          <p>The link may be broken, or the page may have moved.</p>
          <div className="hero-cta" style={{ marginTop: '18px' }}>
            <Link to="/" className="btn btn-accent">Back to home</Link>
          </div>
        </div>
      </section>
    </>
  );
}
