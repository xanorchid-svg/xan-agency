import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import AppRoutes from './App';
import { CASES } from './cases';
import { setCases } from './site/caseRegistry';
import { seoFor, headHtml, ROUTES } from './seo';

setCases(CASES);

export function render(url: string) {
  return {
    html: renderToString(<StaticRouter location={url}><AppRoutes /></StaticRouter>),
    head: headHtml(seoFor(url)),
  };
}
export { ROUTES };
