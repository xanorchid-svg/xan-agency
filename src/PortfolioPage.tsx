import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PROJECTS, ALL_TAGS } from './projects';
import type { FilterTag, Category } from './projects';
import { ContactButton } from './App';
import PortfolioCarousel from './components/PortfolioCarousel';

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState<FilterTag>('All');
  const filtered =
    activeTag === 'All'
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.includes(activeTag as Category));

  return (
    <div className="main-wrapper min-h-screen" style={{ background: '#0c0c0c' }}>
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-4">
        <Link to="/" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Xan Orchid</Link>
        <div className="flex gap-6 md:gap-10">
          <Link to="/about" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">About</Link>
          <Link to="/" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Home</Link>
        </div>
      </nav>

      <div className="overflow-hidden px-6 md:px-10 pt-8 pb-6">
        <motion.h1 initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(4rem, 14vw, 160px)' }}>
          Portfolio
        </motion.h1>
      </div>

      <div className="sticky top-0 z-20 px-6 md:px-10 py-4 flex gap-2 flex-wrap"
        style={{ background: '#0c0c0c', borderBottom: '1px solid rgba(215,226,234,0.08)' }}>
        {ALL_TAGS.map((tag) => (
          <button key={tag} onClick={() => setActiveTag(tag)}
            className="px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all duration-200"
            style={{ background: activeTag === tag ? '#D7E2EA' : 'transparent', color: activeTag === tag ? '#0c0c0c' : '#D7E2EA', border: '1px solid rgba(215,226,234,0.25)' }}>
            {tag}
          </button>
        ))}
      </div>

      <div className="py-10">
        <PortfolioCarousel projects={filtered} />
      </div>

      <div className="text-center py-16"><ContactButton /></div>

      <footer className="px-5 sm:px-8 md:px-10 py-10 border-t" style={{ borderColor: 'rgba(215,226,234,0.08)' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#D7E2EA] text-sm font-light" style={{ opacity: 0.35 }}>© 2026 Xan Orchid</p>
          <div className="flex gap-5">
            <a href="https://www.instagram.com/xanorchid" target="_blank" rel="noopener noreferrer" className="text-[#D7E2EA] text-sm hover:opacity-70 transition-opacity" style={{ opacity: 0.5 }}>Instagram</a>
            <a href="https://www.linkedin.com/in/xan-orchid/" target="_blank" rel="noopener noreferrer" className="text-[#D7E2EA] text-sm hover:opacity-70 transition-opacity" style={{ opacity: 0.5 }}>LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
