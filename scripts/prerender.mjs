// Writes a fully rendered HTML file for every route so pages load instantly
// and search engines / social previews see real content and meta tags.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const dist = path.resolve('dist');
let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
// Preload the headline font so the first paint uses it.
const font = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^playfair-display-latin-400-normal.*\.woff2$/.test(f));
if (font) template = template.replace('<!--head-->', `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin />\n    <!--head-->`);
const { render, ROUTES } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

// Plain shell for client-only routes (redirects, unknown URLs).
fs.writeFileSync(path.join(dist, 'spa.html'), template.replace('<!--head-->', ''));

for (const route of ROUTES) {
  const { html, head } = render(route);
  const page = template
    .replace(/<title>.*?<\/title>/s, '')
    .replace('<!--head-->', head)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  const file = route === '/' ? path.join(dist, 'index.html') : path.join(dist, `${route.slice(1)}.html`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
}

const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map((r) => `  <url><loc>https://agency.dreamxanadu.com${r === '/' ? '' : r}</loc><lastmod>${today}</lastmod><priority>${r === '/' ? '1.0' : r.split('/').length > 2 ? '0.7' : '0.9'}</priority></url>`).join('\n')}
</urlset>
`);
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log(`prerendered ${ROUTES.length} routes`);
