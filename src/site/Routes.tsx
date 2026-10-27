import { Navigate, useParams } from 'react-router-dom';
import { Page } from './Layout';
import AboutBody from '../pages/AboutBody';
import { CASES } from '../cases';

export function About() {
  return <Page title="About — Xan Orchid Studio"><AboutBody /></Page>;
}

const OLD: Record<string, string> = { 'bronco-buckle-company': 'bronco-buckles', 'perfeqtion': 'perfeqtion-imaging', 'diamond-vitality': 'diamond-vitality-center', 'art-portfolio': 'artwork' };

export function CaseStudy() {
  const { slug = '' } = useParams();
  const c = CASES[slug] || CASES[OLD[slug]];
  if (!c) return <Navigate to="/work" replace />;
  const C = c.Component;
  return <Page title={`${c.title} — Xan Orchid Studio`}><C /></Page>;
}

export function OldProject() {
  const { slug = '' } = useParams();
  const to = CASES[slug] ? slug : OLD[slug];
  return <Navigate to={to ? `/work/${to}` : '/work'} replace />;
}
