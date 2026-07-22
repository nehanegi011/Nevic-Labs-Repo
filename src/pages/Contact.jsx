import ContactForm from './ContactForm';

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap">
          <span className="eyebrow" style={{ fontSize: 20 }}>Contact</span>
          <h1>Ready to Modernize Your <br /><span>Healthcare Operations</span>?</h1>
          <p>Tell us a little about you and we'll walk you through our products on a live setup - plus what a rollout would look like for you.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="contact">
            <div className="reveal">
              <span className="eyebrow" style={{ fontSize: 20 }}>How can we help you?</span>
              <br /><br />
              <div className="contact-lines">
                <div className="cline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
                  <span><b style={{ color: 'var(--ink)' }}>Email</b><br />contact@neviclabs.com<br /></span>
                </div>
                <div className="cline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7 12.8 12.8 0 0 0 .7 2.8 2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2z" /></svg>
                  <span><span style={{ color: 'var(--ink)' }}><b>Phone / WhatsApp<br /></b></span>+918767365096</span>
                </div>
                <div className="cline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  <span><b style={{ color: 'var(--ink)' }}>Office</b><br />Pune, Maharashtra, India</span>
                </div>
                <div className="cline">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
                  <span><b style={{ color: 'var(--ink)' }}>Working hours</b><br />Mon–Sat · 10:00 – 19:00 IST</span>
                </div>
              </div>
            </div>

            <div className="reveal">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
