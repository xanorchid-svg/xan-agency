import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { startMotion } from './motion';
import { seoFor, applySeo } from '../seo';

const NAV = [
  { href: '/#services', label: 'Services' },
  { href: '/#process', label: 'Process' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(236,203,244,0.82)', backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '16px clamp(20px, 5vw, 56px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 14 }} aria-label="Xan Orchid — home">
          <span className="disp iri-d" style={{ fontSize: 30, lineHeight: 1, color: '#4B1957', letterSpacing: '-0.02em' }}>XO</span>
          <span style={{ width: 1, height: 26, background: 'rgba(75,25,87,0.35)' }} />
          <span className="sans" style={{ fontWeight: 700, fontSize: 15, color: '#4B1957' }}>Xan Orchid</span>
        </a>
        <nav aria-label="Main" className="hide-sm" style={{ display: 'flex', alignItems: 'center', gap: 'clamp(14px, 2.4vw, 34px)', flexWrap: 'wrap', fontSize: 15 }}>
          {NAV.map((n) => <a key={n.href} href={n.href}>{n.label}</a>)}
          <a href="/#book" className="btn sans" style={{ display: 'inline-flex', alignItems: 'center', minHeight: 44, padding: '0 22px', borderRadius: 999, background: '#4B1957', color: '#FFFFFF', fontWeight: 600, fontSize: 13, letterSpacing: '0.04em' }}>Book a free call</a>
        </nav>
        <button type="button" className="show-sm sans" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu" style={{ alignItems: 'center', gap: 10, minHeight: 44, padding: '0 18px', borderRadius: 999, border: '1.5px solid #4B1957', background: 'transparent', color: '#4B1957', fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', cursor: 'pointer' }}>
          <span aria-hidden="true" style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#4B1957' }} />
            <span style={{ display: 'block', width: 18, height: 1.5, background: '#4B1957' }} />
          </span>
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <div className="iri-line" aria-hidden="true" style={{ height: 2 }} />
      {open && (
        <nav aria-label="Mobile" className="mmenu" style={{ background: '#FBF6FC', padding: '8px clamp(20px, 5vw, 56px) 28px', borderBottom: '1px solid rgba(75,25,87,0.12)' }}>
          {NAV.map((n) => <a key={n.href} href={n.href} onClick={() => setOpen(false)}>{n.label}</a>)}
          <a href="/#book" onClick={() => setOpen(false)}>Book a free call</a>
        </nav>
      )}
    </header>
  );
}

export function CtaBand() {
  return (
    <section style={{ background: '#4B1957', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
      <span className="disp" aria-hidden="true" style={{ position: 'absolute', right: -30, bottom: -110, fontSize: 380, lineHeight: 1, color: '#FFFFFF', opacity: 0.06, pointerEvents: 'none' }}>XO</span>
      <div style={{ position: 'relative', maxWidth: 1280, margin: '0 auto', padding: 'clamp(88px, 11vw, 150px) clamp(20px, 5vw, 56px)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 32 }}>
        <h2 className="rv" style={{ margin: 0, fontSize: 'clamp(42px, 5.6vw, 84px)', lineHeight: 1.04, maxWidth: 760, color: '#FFFFFF' }}>Let's make your business look as good as <em className="iri-l" style={{ color: '#ECCBF4' }}>it is.</em></h2>
        <a href="/#book" className="btn sans rv" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minHeight: 56, padding: '0 32px', borderRadius: 999, background: '#ECCBF4', color: '#4B1957', fontWeight: 700, fontSize: 14, letterSpacing: '0.04em' }}>Book a free call <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer style={{ background: '#2E0E36', color: '#ECCBF4' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '48px clamp(20px, 5vw, 56px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span className="disp iri-l" style={{ fontSize: 28, color: '#FFFFFF' }}>XO</span><span className="sans" style={{ fontWeight: 700, fontSize: 14, color: '#FFFFFF' }}>Xan Orchid Studio</span></span>
        <span style={{ display: 'flex', gap: 24, flexWrap: 'wrap', fontSize: 14 }}>
          <a href="/" style={{ color: '#ECCBF4' }}>Home</a>
          <a href="/work" style={{ color: '#ECCBF4' }}>Work</a>
          <a href="/about" style={{ color: '#ECCBF4' }}>About</a>
          <a href="https://www.instagram.com/xanorchid" style={{ color: '#ECCBF4' }}>Instagram</a>
          <a href="https://www.linkedin.com/in/xan-orchid/" style={{ color: '#ECCBF4' }}>LinkedIn</a>
        </span>
        <span style={{ fontSize: 13 }}>Dallas, TX · © 2026</span>
      </div>
    </footer>
  );
}

export function Page({ children, cta = true }: { title?: string; children: ReactNode; cta?: boolean }) {
  const { pathname } = useLocation();
  useEffect(() => {
    applySeo(seoFor(pathname));
    startMotion();
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    const hash = window.location.hash;
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) setTimeout(() => el.scrollIntoView(), 50);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  return (
    <div style={{ background: '#FBF6FC', color: '#2B1230', fontFamily: "'Jost', system-ui, sans-serif", fontWeight: 300, minHeight: '100vh', overflowX: 'clip' }}>
      <Header />
      <main>{children}</main>
      {cta && <CtaBand />}
      <Footer />
    </div>
  );
}
