import { Suspense } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Page } from './Layout';
import AboutBody from '../pages/AboutBody';
import { getCase } from './caseRegistry';

export function About() {
  return <Page><AboutBody /></Page>;
}

const OLD: Record<string, string> = { 'bronco-buckle-company': 'bronco-buckles', 'perfeqtion': 'perfeqtion-imaging', 'diamond-vitality': 'diamond-vitality-center', 'art-portfolio': 'artwork' };

export function CaseStudy() {
  const { slug = '' } = useParams();
  const c = getCase(slug);
  if (!c) return <Navigate to={OLD[slug] ? `/work/${OLD[slug]}` : '/work'} replace />;
  const C = c.Component;
  return (
    <Page>
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <C />
      </Suspense>
    </Page>
  );
}

export function OldProject() {
  const { slug = '' } = useParams();
  const to = getCase(slug) ? slug : OLD[slug];
  return <Navigate to={to ? `/work/${to}` : '/work'} replace />;
}
