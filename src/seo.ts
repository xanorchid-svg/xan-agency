import PROJECTS from './projects.json';

export const SITE = 'https://agency.dreamxanadu.com';
const BRAND = 'Xan Orchid Studio';
const DEFAULT_DESC = 'Xan Orchid Studio is a Dallas brand, web and content studio for local businesses that are better than they look online — branding, websites, social content, reels, ads and AI systems.';

export type Seo = { title: string; description: string; path: string; image: string; type: 'website' | 'article'; jsonLd: object[] };

const org = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE}/#studio`,
  name: BRAND,
  url: SITE,
  image: `${SITE}/og/home.jpg`,
  logo: `${SITE}/favicon.svg`,
  description: DEFAULT_DESC,
  founder: { '@type': 'Person', name: 'Xan Orchid', jobTitle: 'Founder & Creative Director' },
  email: 'orchid.alexandra.jane@gmail.com',
  telephone: '+1-469-360-3197',
  address: { '@type': 'PostalAddress', addressLocality: 'Dallas', addressRegion: 'TX', addressCountry: 'US' },
  areaServed: 'United States',
  sameAs: ['https://www.instagram.com/xanorchid', 'https://www.linkedin.com/in/xan-orchid/'],
  knowsAbout: ['Branding', 'Web design', 'Social media content', 'Reels', 'Meta ads', 'Email marketing', 'AI workflows'],
};

export function seoFor(pathname: string): Seo {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/work') {
    return { title: `Work — Brand, Web & Social Projects | ${BRAND}`, description: `${PROJECTS.length} projects by Xan Orchid Studio: brands, websites, apps, social content, reels and ads for local businesses and founders.`, path, image: `${SITE}/og/home.jpg`, type: 'website', jsonLd: [org] };
  }
  if (path === '/about') {
    return { title: `About Xan Orchid — Founder & Creative Director | ${BRAND}`, description: 'Meet Xan Orchid, the Dallas designer and founder behind Xan Orchid Studio — brand, web, content and AI systems for small businesses.', path, image: `${SITE}/og/home.jpg`, type: 'website',
      jsonLd: [org, { '@context': 'https://schema.org', '@type': 'Person', name: 'Xan Orchid', jobTitle: 'Founder & Creative Director', worksFor: { '@id': `${SITE}/#studio` }, url: `${SITE}/about` }] };
  }
  const m = /^\/work\/([a-z0-9-]+)$/.exec(path);
  const p = m && PROJECTS.find((x) => x.slug === m[1]);
  if (p) {
    return { title: `${p.title} — Case Study | ${BRAND}`, description: `${p.title}: ${p.sub}. ${p.cats.join(', ')} work by Xan Orchid Studio, Dallas.`.slice(0, 300), path, image: `${SITE}/og/${p.slug}.jpg`, type: 'article',
      jsonLd: [{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, description: p.sub, url: `${SITE}${path}`, image: `${SITE}/og/${p.slug}.jpg`, creator: { '@id': `${SITE}/#studio` }, keywords: p.cats.join(', ') },
        { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Work', item: `${SITE}/work` }, { '@type': 'ListItem', position: 2, name: p.title, item: `${SITE}${path}` }] }] };
  }
  return { title: `${BRAND} — Branding, Websites & Social Content in Dallas`, description: DEFAULT_DESC, path: '/', image: `${SITE}/og/home.jpg`, type: 'website', jsonLd: [org] };
}

const escAttr = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

/** Head tags as an HTML string (used when prerendering). */
export function headHtml(s: Seo): string {
  const url = `${SITE}${s.path === '/' ? '' : s.path}`;
  return [
    `<title>${escAttr(s.title)}</title>`,
    `<meta name="description" content="${escAttr(s.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:type" content="${s.type}" />`,
    `<meta property="og:title" content="${escAttr(s.title)}" />`,
    `<meta property="og:description" content="${escAttr(s.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${s.image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escAttr(s.title)}" />`,
    `<meta name="twitter:description" content="${escAttr(s.description)}" />`,
    `<meta name="twitter:image" content="${s.image}" />`,
    ...s.jsonLd.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`),
  ].join('\n    ');
}

/** Keep head tags in sync during client-side navigation. */
export function applySeo(s: Seo) {
  if (typeof document === 'undefined') return;
  document.title = s.title;
  const url = `${SITE}${s.path === '/' ? '' : s.path}`;
  const set = (sel: string, attr: string, val: string) => { const el = document.head.querySelector(sel); if (el) el.setAttribute(attr, val); };
  set('meta[name="description"]', 'content', s.description);
  set('link[rel="canonical"]', 'href', url);
  set('meta[property="og:title"]', 'content', s.title);
  set('meta[property="og:description"]', 'content', s.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[property="og:image"]', 'content', s.image);
  set('meta[name="twitter:title"]', 'content', s.title);
  set('meta[name="twitter:description"]', 'content', s.description);
  set('meta[name="twitter:image"]', 'content', s.image);
}

export const ROUTES = ['/', '/work', '/about', ...PROJECTS.map((p) => `/work/${p.slug}`)];
