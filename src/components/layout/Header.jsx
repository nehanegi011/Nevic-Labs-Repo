import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// Dropdowns are pure-CSS (hover / :focus-within) as in the source main.css.
// Only the mobile burger toggle + body scroll-lock + scroll-based background
// need JS.
export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.classList.toggle('menu-open', open);
    return () => document.body.classList.remove('menu-open');
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // set correct state immediately (e.g. after navigating with scroll restored)
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  const isBlogPage = location.pathname.startsWith('/blog/');
  const isAdminPage = location.pathname.startsWith('/admin/submissions');

  const headerClass = [
    'nav',
    isBlogPage ? 'nav-blog' : '',
    isAdminPage ? 'nav-blog' : '',
    scrolled ? 'nav-scrolled' : '',
  ].filter(Boolean).join(' ');

  return (
    <header className={headerClass}>
      <div className="wrap nav-in">
        <Link to="/" className="brand" aria-label="Nevic Labs home" onClick={close}>
          <span className="brand-logo-full">
            <img src="/assets/img/Neviclabs-logo.png" alt="Nevic Labs" />
          </span>
        </Link>

        <nav className={`nav-links${open ? ' open' : ''}`} id="links">
          {/* Mobile-only row: logo at top-left of the open panel, directly
              opposite the close (X) burger button which stays fixed top-right. */}
          <div className="nav-links-head">
            <Link to="/" className="brand" aria-label="Nevic Labs home" onClick={close}>
              <span className="brand-logo-full">
                <img src="/assets/img/Neviclabs-logo.png" alt="Nevic Labs" />
              </span>
            </Link>
          </div>

          <div className="nav-drop">
            <NavLink to="/solutions" onClick={close}>Solutions</NavLink>
            <div className="nav-drop-menu">
              <NavLink to="/solutions/opd-management" onClick={close}>OPD Management</NavLink>
              <NavLink to="/solutions/patient-engagement" onClick={close}>Patient Engagement</NavLink>
              <NavLink to="/solutions/digital-marketing" onClick={close}>Digital Marketing</NavLink>
            </div>
          </div>

          <div className="nav-drop">
            <NavLink to="/products" onClick={close}>Products</NavLink>
            <div className="nav-drop-menu">
              <NavLink to="/products/pulse" onClick={close}>Nevic Pulse</NavLink>
              <NavLink to="/products/connect" onClick={close}>Nevic Connect</NavLink>
              <NavLink to="/products/reach" onClick={close}>Nevic Reach</NavLink>
            </div>
          </div>

          <NavLink to="/blog" onClick={close}>Blog</NavLink>
          <NavLink to="/about" onClick={close}>About Us</NavLink>
        </nav>

        <button
          className={`burger${open ? ' burger-open' : ''}`}
          id="burger"
          aria-label={open ? 'Close menu' : 'Menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
