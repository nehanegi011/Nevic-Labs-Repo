// Build-time extraction: pulls the exact inner content (between </header> and <footer>)
// from each source HTML page, rewrites internal links to clean routes and asset paths
// to /assets/..., strips inline <script> and HTML comments, and emits:
//   - src/pages/_content/<Name>.html   (raw fragment, imported with ?raw)
//   - src/data/pageMeta.js             (per-route title + description)
import fs from 'node:fs';
import path from 'node:path';

const SRC = '/home/claude/site/Nevic-Labs-website/Nevic-Labs-main/src';
const OUT = '/home/claude/nevic-labs-react/src/pages/_content';
fs.mkdirSync(OUT, { recursive: true });

// file -> { route, comp }
const PAGES = [
  ['index.html', '/', 'Home'],
  ['solutions.html', '/solutions', 'Solutions'],
  ['solutions-opd-management.html', '/solutions/opd-management', 'SolutionsOpdManagement'],
  ['solutions-patient-engagement.html', '/solutions/patient-engagement', 'SolutionsPatientEngagement'],
  ['solutions-digital-marketing.html', '/solutions/digital-marketing', 'SolutionsDigitalMarketing'],
  ['solutions-health-records.html', '/solutions/health-records', 'SolutionsHealthRecords'],
  ['products.html', '/products', 'Products'],
  ['products-pulse.html', '/products/pulse', 'ProductPulse'],
  ['products-connect.html', '/products/connect', 'ProductConnect'],
  ['products-reach.html', '/products/reach', 'ProductReach'],
  ['about.html', '/about', 'About'],
  ['careers.html', '/careers', 'Careers'],
  ['contact.html', '/contact', 'Contact'],
  ['faq.html', '/faq', 'Faq'],
  ['privacy.html', '/privacy', 'Privacy'],
  ['terms.html', '/terms', 'Terms'],
];

// internal .html link -> clean route
const LINKMAP = {
  'index.html': '/',
  'solutions.html': '/solutions',
  'solutions-opd-management.html': '/solutions/opd-management',
  'solutions-patient-engagement.html': '/solutions/patient-engagement',
  'solutions-digital-marketing.html': '/solutions/digital-marketing',
  'solutions-health-records.html': '/solutions/health-records',
  'products.html': '/products',
  'products-pulse.html': '/products/pulse',
  'products-connect.html': '/products/connect',
  'products-reach.html': '/products/reach',
  'about.html': '/about',
  'careers.html': '/careers',
  'contact.html': '/contact',
  'faq.html': '/faq',
  'privacy.html': '/privacy',
  'terms.html': '/terms',
};

function rewriteHref(href) {
  // external / anchors / protocols: leave untouched
  if (/^(https?:|mailto:|tel:|#)/i.test(href)) return href;
  // blog index
  let h = href.replace(/^\.?\//, '').replace(/^\.\.\//, '');
  if (/blog\/index\.html$/.test(h) || h === 'blog/' || h === 'blog') return '/blog';
  // blog post
  const post = h.match(/(?:blog\/)?posts\/([^"'#?]+)\.html$/);
  if (post) return '/blog/' + post[1];
  // top-level page
  const base = h.split('/').pop();
  if (LINKMAP[base]) return LINKMAP[base];
  return href;
}

function transform(html) {
  let s = html;
  // strip HTML comments
  s = s.replace(/<!--[\s\S]*?-->/g, '');
  // strip inline scripts (JotForm handler is re-added in Contact.jsx)
  s = s.replace(/<script[\s\S]*?<\/script>/gi, '');
  // rewrite asset paths in src / href / url(...) / background-image
  s = s.replace(/(src|href)=("|')([^"']*?)(\2)/g, (m, attr, q, val) => {
    if (attr === 'href') {
      // only rewrite internal links; asset hrefs (favicons etc.) handled below
      if (/\.(png|jpg|jpeg|gif|svg|webp|ico|css)$/i.test(val)) {
        const a = val.replace(/^(\.\.\/)+/, '/').replace(/^\.\//, '/').replace(/^assets/, '/assets').replace(/^\/+/, '/');
        return `${attr}=${q}${a.replace(/^\/*/, '/').replace(/\/assets/, '/assets').replace(/^\/(\.\.\/)*/, '/')}${q}`;
      }
      return `${attr}=${q}${rewriteHref(val)}${q}`;
    }
    // src
    let a = val
      .replace(/^(\.\.\/)+assets/, '/assets')
      .replace(/^\.\/assets/, '/assets')
      .replace(/^assets/, '/assets');
    return `${attr}=${q}${a}${q}`;
  });
  // rewrite url('...') inside inline styles (background-image)
  s = s.replace(/url\((['"]?)([^)'"]+)\1\)/g, (m, q, val) => {
    let a = val
      .replace(/^(\.\.\/)+assets/, '/assets')
      .replace(/^\.\/assets/, '/assets')
      .replace(/^assets/, '/assets');
    return `url(${q}${a}${q})`;
  });
  return s.trim();
}

function extractBody(html) {
  const hEnd = html.indexOf('</header>');
  const fStart = html.indexOf('<footer');
  const start = hEnd !== -1 ? hEnd + '</header>'.length : html.indexOf('<body>') + 6;
  const end = fStart !== -1 ? fStart : html.indexOf('</body>');
  return html.slice(start, end);
}

function meta(html) {
  const t = (html.match(/<title>([\s\S]*?)<\/title>/) || [, ''])[1].trim();
  const d = (html.match(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']/i) || [, ''])[1].trim();
  return { title: t, description: d };
}

const metaOut = {};
for (const [file, route, comp] of PAGES) {
  const raw = fs.readFileSync(path.join(SRC, file), 'utf8');
  const frag = transform(extractBody(raw));
  fs.writeFileSync(path.join(OUT, comp + '.html'), frag, 'utf8');
  metaOut[route] = { ...meta(raw), comp };
  console.log('extracted', comp, '(', frag.length, 'chars )');
}

// blog index + post meta
const blogIdx = fs.readFileSync(path.join(SRC, 'blog/index.html'), 'utf8');
metaOut['/blog'] = { ...meta(blogIdx), comp: 'Blog' };

const metaJs =
  '// AUTO-GENERATED by scripts/extract.mjs — per-route SEO metadata\n' +
  'export const pageMeta = ' + JSON.stringify(metaOut, null, 2) + ';\n';
fs.writeFileSync('/home/claude/nevic-labs-react/src/data/pageMeta.js', metaJs, 'utf8');
console.log('wrote pageMeta.js with', Object.keys(metaOut).length, 'routes');
