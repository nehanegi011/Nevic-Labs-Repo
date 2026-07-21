import { useEffect } from 'react';
import Seo from '../components/layout/Seo.jsx';
import PageContent from '../components/ui/PageContent.jsx';
import html from './_content/Contact.html?raw';

export default function Contact() {
  // Re-add JotForm's iframe auto-resize handler (the inline <script> was
  // stripped from the ported fragment because innerHTML doesn't execute scripts).
  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jotfor.ms/s/umd/latest/for-form-embed-handler.js';
    s.async = true;
    s.onload = () => {
      if (window.jotformEmbedHandler) {
        window.jotformEmbedHandler(
          "iframe[id='JotFormIFrame-261972672555468']",
          'https://form.jotform.com/'
        );
      }
    };
    document.body.appendChild(s);
    return () => { document.body.removeChild(s); };
  }, []);

  return (
    <>
      <Seo route="/contact" />
      <PageContent html={html} />
    </>
  );
}
