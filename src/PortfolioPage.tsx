import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, ALL_TAGS } from './projects';
import type { FilterTag, Category, Project } from './projects';
import { ContactButton } from './App';
import PortfolioCarousel from './components/PortfolioCarousel';
import xanaduHero from './assets/xanadu-hero.png';
import wildchildVideo from './assets/wildchild.mp4';
import powerbagelsVideo from './assets/powerbagels.mp4';
import perfeqtionCover from './assets/perfeqtion-cover.png';

const VIDEO_MAP: Record<string, string> = {
  'dandelion-wild-school': wildchildVideo,
  'power-bagels': powerbagelsVideo,
};

const IMAGE_MAP: Record<string, string> = {
  'perfeqtion-imaging': perfeqtionCover,
};

export default function PortfolioPage() {
  const [activeTag, setActiveTag] = useState<FilterTag>('All');
  // The 3D carousel is only really at its best with the full set -- for any
  // subcategory filter (a handful of projects) the plain grid reads better
  // and sidesteps the whole "few tiles on a big ring" problem entirely.
  const viewMode = activeTag === 'All' ? 'carousel' : 'list';
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

      {viewMode === 'carousel' ? (
        <div className="py-10">
          <PortfolioCarousel projects={filtered} />
        </div>
      ) : (
        <div className="px-5 sm:px-8 md:px-10 py-10">
          <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            <AnimatePresence>
              {filtered.map((project, i) => {
                const directHref = project.externalUrl || project.socials?.instagram;
                return (
                  <motion.div key={project.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, delay: i * 0.04 }}>
                    {project.directLink && directHref ? (
                      <a href={directHref} target="_blank" rel="noopener noreferrer" className="block group">
                        <GridCard project={project} />
                      </a>
                    ) : (
                      <Link to={`/portfolio/${project.slug}`} className="block group">
                        <GridCard project={project} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      )}

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

function GridCard({ project }: { project: Project }) {
  const imgSrc = project.slug === 'xanadu' ? xanaduHero : (IMAGE_MAP[project.slug] || project.coverImg);
  const videoSrc = VIDEO_MAP[project.slug];
  return (
    <>
      <div className="overflow-hidden rounded-2xl relative" style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.03)' }}>
        {videoSrc ? (
          <video src={videoSrc} autoPlay muted loop playsInline className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : imgSrc ? (
          <img src={imgSrc} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.3 }}>{project.title}</p>
          </div>
        )}
        <div className="absolute inset-0 flex items-end p-5 transition-all duration-300 bg-black/0 group-hover:bg-black/50">
          <div className="translate-y-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-white text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.7 }}>{project.category}</p>
            <h3 className="text-white font-black uppercase text-sm sm:text-base leading-tight">{project.title}</h3>
          </div>
        </div>
      </div>
      <div className="mt-3 px-1">
        <p className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.4 }}>{project.category}</p>
        <h3 className="text-[#D7E2EA] font-medium uppercase text-sm">{project.title}</h3>
      </div>
    </>
  );
}
