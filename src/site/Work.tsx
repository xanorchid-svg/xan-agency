import { useState } from 'react';
import { Page } from './Layout';
import PROJECTS from '../projects.json';

const CATS = ['All', 'Brand', 'Web', 'App', 'Social', 'Ads', 'Art', 'AI'];

export default function Work() {
  const [cat, setCat] = useState('All');
  const items = cat === 'All' ? PROJECTS : PROJECTS.filter((p) => p.cats.includes(cat));
  return (
    <Page title="Work — Xan Orchid Studio">
      <section style={{ background: '#ECCBF4' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(88px, 11vw, 140px) clamp(20px, 5vw, 56px) clamp(48px, 5vw, 72px)' }}>
          <p className="eyebrow fu" style={{ margin: 0, fontSize: 12, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#4B1957' }}>Selected work · {PROJECTS.length} projects</p>
          <h1 className="disp fu" style={{ margin: '24px 0 0', fontSize: 'clamp(56px, 9vw, 132px)', lineHeight: 1, color: '#2B1230', fontWeight: 400, animationDelay: '.08s' }}>The <em className="iri-d" style={{ color: '#4B1957' }}>work.</em></h1>
          <p className="fu" style={{ margin: '28px 0 0', maxWidth: 600, fontSize: 19, lineHeight: 1.7, color: '#4A2A52', animationDelay: '.16s' }}>Brands, websites, apps and content for local businesses, founders and my own ventures. Open any project for the full story.</p>
        </div>
      </section>
      <section style={{ background: '#FBF6FC' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: 'clamp(64px, 8vw, 110px) clamp(20px, 5vw, 56px) clamp(88px, 11vw, 150px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            <h2 className="disp rv" style={{ margin: 0, fontSize: 'clamp(38px, 4.8vw, 64px)', lineHeight: 1.05, fontWeight: 400 }}>All <em className="iri-d" style={{ color: '#4B1957' }}>projects.</em></h2>
            <div role="group" aria-label="Filter projects" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {CATS.map((c) => {
                const on = c === cat;
                const count = c === 'All' ? PROJECTS.length : PROJECTS.filter((p) => p.cats.includes(c)).length;
                return <button key={c} type="button" className="btn" onClick={() => setCat(c)} aria-pressed={on} style={{ minHeight: 44, padding: '0 18px', borderRadius: 999, border: '1.5px solid #4B1957', background: on ? '#4B1957' : 'transparent', color: on ? '#FFFFFF' : '#4B1957', font: "400 15px 'Jost', sans-serif", cursor: 'pointer' }}>{c} <span className="sans" style={{ fontSize: 11, opacity: 0.65 }}>{count}</span></button>;
              })}
            </div>
          </div>
          <div className="wgrid">
            {items.map((p) => (
              <a key={p.slug} href={`/work/${p.slug}`} className="wt rv">
                <span className="frame"><img src={p.thumb} alt={p.title} loading="lazy" style={{ objectPosition: 'center' }} /><span className="iri-veil" aria-hidden="true" /><span className="glint" aria-hidden="true" /><span className="iri-edge" aria-hidden="true" /></span>
                <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, marginTop: 18 }}><span className="disp" style={{ fontSize: 'clamp(22px, 2vw, 28px)', lineHeight: 1.15, color: '#2B1230' }}>{p.title}</span><span className="arr" aria-hidden="true" style={{ color: '#4B1957', fontSize: 18 }}>→</span></span>
                <span style={{ display: 'block', marginTop: 6, fontSize: 15, lineHeight: 1.5, color: '#6E4A78' }}>{p.sub}</span>
                <span className="sans" style={{ display: 'block', marginTop: 10, fontSize: 11, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#4B1957' }}>{p.cats.join(' · ')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}
