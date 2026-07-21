import { Link } from 'react-router-dom';

// Canonical footer — sourced from index.html (the source site had inconsistent
// footers across pages; this is the single reusable version used everywhere).
export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h5>Product</h5>
            <p><Link to="/products/connect">Nevic Connect</Link></p>
            <p><Link to="/products/pulse">Nevic Pulse</Link></p>
            <p><Link to="/products/reach">Nevic Reach</Link></p>
          </div>
          <div>
            <h5>Company</h5>
            <p><Link to="/about">About Us</Link></p>
            <p><Link to="/careers">Careers</Link></p>
          </div>
          <div>
            <h5>Legal</h5>
            <p><Link to="/privacy">Privacy Policy</Link></p>
            <p><Link to="/terms">Terms of Service</Link></p>
          </div>
          <div>
            <h5>Contact</h5>
            <p><a href="mailto:contact@neviclabs.com">contact@neviclabs.com</a></p>
            <p><Link to="/contact">Book a demo</Link></p>
          </div>
        </div>
        <div className="fbot">
          <span>© 2026 NEVIC LABS, INDIA</span>
          <div className="fsocial-bot">
            <a href="https://www.linkedin.com/company/nevic-labs" target="_blank" rel="noopener" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V20.4h3.38V8.5zM5.25 3.6a1.96 1.96 0 1 0 0 3.92 1.96 1.96 0 0 0 0-3.92zM20.44 20.4h-3.37v-6.24c0-1.49-.03-3.4-2.07-3.4-2.08 0-2.4 1.62-2.4 3.3v6.34H9.24V8.5h3.24v1.63h.05c.45-.85 1.55-1.75 3.19-1.75 3.41 0 4.04 2.25 4.04 5.17v6.85z" /></svg>
            </a>
            <a href="https://www.instagram.com/neviclabs/" target="_blank" rel="noopener" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r="1" /></svg>
            </a>
          </div>
          <span>Healthcare, simplified.</span>
        </div>
      </div>
    </footer>
  );
}
