import { Helmet } from 'react-helmet-async';
import { pageMeta } from '../../data/pageMeta.js';

// Per-route <title> + <meta description>, preserved from the source pages.
export default function Seo({ route, title, description }) {
  const m = (route && pageMeta[route]) || {};
  const t = title || m.title || 'Nevic Labs';
  const d = description || m.description || '';
  return (
    <Helmet>
      <title>{t}</title>
      {d ? <meta name="description" content={d} /> : null}
    </Helmet>
  );
}
