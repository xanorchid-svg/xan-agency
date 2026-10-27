import { StrictMode, lazy, type ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './App';
import PROJECTS from './projects.json';
import { setCases, type CaseEntry } from './site/caseRegistry';

// Case studies are split into their own chunks and loaded on demand.
const loaders = import.meta.glob<{ default: ComponentType }>('./cases/[A-Z]*.tsx');
const fileFor = (slug: string) => `./cases/${slug.split('-').map((w) => w[0].toUpperCase() + w.slice(1)).join('')}.tsx`;

async function start() {
  const reg: Record<string, CaseEntry> = {};
  for (const p of PROJECTS) {
    const load = loaders[fileFor(p.slug)];
    if (load) reg[p.slug] = { title: p.title, Component: lazy(load) };
  }
  // Load the current case before hydrating so the prerendered page is reused as-is.
  const m = /^\/work\/([a-z0-9-]+)\/?$/.exec(window.location.pathname);
  if (m && reg[m[1]]) reg[m[1]].Component = (await loaders[fileFor(m[1])]()).default;
  setCases(reg);

  const root = document.getElementById('root')!;
  const app = (
    <StrictMode>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StrictMode>
  );
  if (root.hasChildNodes()) hydrateRoot(root, app);
  else createRoot(root).render(app);
}
start();
