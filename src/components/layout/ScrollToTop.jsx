import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Static pages scrolled to top on navigation; replicate that for the SPA.
export default function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
