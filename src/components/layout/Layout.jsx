import { Outlet, useNavigate } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

// Links inside ported page content are plain <a href="/route"> (from the
// HTML-fragment pages). Intercept clicks on internal links so they navigate
// via react-router instead of doing a full page reload.
export default function Layout() {
  const navigate = useNavigate();

  const onClick = (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href') || '';
    const target = a.getAttribute('target');
    if (
      target === '_blank' ||
      e.metaKey || e.ctrlKey || e.shiftKey || e.altKey ||
      /^(https?:|mailto:|tel:|#)/i.test(href) ||
      !href.startsWith('/')
    ) {
      return; // let the browser handle external / new-tab / modified clicks
    }
    e.preventDefault();
    navigate(href);
  };

  return (
    <>
      <Header />
      <main onClick={onClick}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
