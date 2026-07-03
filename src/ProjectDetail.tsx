import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PROJECTS } from './projects';
import { ContactButton } from './App';
import xanaduHero from './assets/xanadu-hero.png';
import wildchildVideo from './assets/wildchild.mp4';
import powerbagelsVideo from './assets/powerbagels.mp4';
import perfeqtionCover from './assets/perfeqtion-cover.png';

// Same video files used on the homepage featured cards \u2014 imported properly
// so Vite bundles them correctly for production (a raw string path in the
// data file only works in local dev, not on the live build).
const VIDEO_MAP: Record<string, string> = {
  'dandelion-wild-school': wildchildVideo,
  'power-bagels': powerbagelsVideo,
};

// Local image overrides \u2014 same reasoning as VIDEO_MAP above. Used when a
// project's cover needs to be a locally uploaded asset instead of a remote URL.
const IMAGE_MAP: Record<string, string> = {
  'perfeqtion-imaging': perfeqtionCover,
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[idx];

  if (!project) return (
    <div className="main-wrapper min-h-screen flex items-center justify-center" style={{ background: '#0c0c0c' }}>
      <div className="text-center">
        <p className="text-[#D7E2EA] font-medium mb-4">Project not found.</p>
        <Link to="/portfolio" className="text-[#D7E2EA] underline hover:opacity-70">Back to Portfolio</Link>
      </div>
    </div>
  );

  const prev = PROJECTS[idx - 1];
  const next = PROJECTS[idx + 1];
  const coverSrc = project.slug === 'xanadu' ? xanaduHero : (IMAGE_MAP[project.slug] || project.coverImg);
  const videoSrc = VIDEO_MAP[project.slug];
  const hasCover = Boolean(videoSrc || coverSrc);

  return (
    <div className="main-wrapper min-h-screen" style={{ background: '#0c0c0c' }}>
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-4">
        <Link to="/" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-base hover:opacity-70 transition-opacity">Xan Orchid</Link>
        <Link to="/portfolio" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm hover:opacity-70 transition-opacity">← Portfolio</Link>
      </nav>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="px-6 md:px-10 pt-10 pb-16">
        <p className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-3" style={{ opacity: 0.45 }}>{project.category}</p>
        <h1 className="hero-heading font-black uppercase leading-none tracking-tight mb-6" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>{project.title}</h1>
        <p className="text-[#D7E2EA] font-light max-w-xl" style={{ opacity: 0.65, fontSize: 'clamp(1rem, 2vw, 1.3rem)' }}>{project.subtitle}</p>
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => <span key={tag} className="text-xs uppercase tracking-wider px-3 py-1 rounded-full" style={{ color: '#D7E2EA', border: '1px solid rgba(215,226,234,0.25)' }}>{tag}</span>)}
        </div>
        <div className="flex flex-wrap gap-3 mt-6">
          {project.externalUrl && (
            <a href={project.externalUrl} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-7 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
              {project.externalUrlLabel || 'Live Site'} ↗
            </a>
          )}
          {project.externalUrlSecondary && (
            <a href={project.externalUrlSecondary} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-7 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
              {project.externalUrlSecondaryLabel || 'Visit'} ↗
            </a>
          )}
          {project.socials?.instagram && (
            <a href={project.socials.instagram} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-7 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
              Instagram ↗
            </a>
          )}
          {project.socials?.facebook && (
            <a href={project.socials.facebook} target="_blank" rel="noopener noreferrer"
              className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-7 py-2.5 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
              Facebook ↗
            </a>
          )}
        </div>
      </motion.div>

      {/* HERO — object-contain so nothing is ever cropped. Blurred backdrop
          copy of the same media fills the frame behind it so there's no
          awkward empty bar, and since every project's colors differ, this
          naturally gives each subpage its own distinct hero look. */}
      {hasCover && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="px-5 sm:px-8 md:px-10 mb-16">
          <div className="relative w-full rounded-3xl overflow-hidden" style={{ height: '70vh', background: '#000' }}>
            {videoSrc ? (
              <>
                <video src={videoSrc} autoPlay muted loop playsInline
                  className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40" />
                <video src={videoSrc} autoPlay muted loop playsInline
                  className="relative w-full h-full object-contain" />
              </>
            ) : (
              <>
                <img src={coverSrc} alt="" aria-hidden="true"
                  className="absolute inset-0 w-full h-full object-cover blur-3xl scale-110 opacity-40" />
                <img src={coverSrc} alt={project.title}
                  className="relative w-full h-full object-contain" />
              </>
            )}
          </div>
        </motion.div>
      )}

      <div className="px-5 sm:px-8 md:px-10 py-16 grid md:grid-cols-2 gap-10 md:gap-16 max-w-5xl mx-auto">
        {[{ label: 'The Challenge', body: project.problem }, { label: 'The Solution', body: project.solution }]
          .filter(({ body }) => body)
          .map(({ label, body }, i) => (
            <motion.div key={label} initial={{ opacity: 0, x: i === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
              <p className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-4" style={{ opacity: 0.4 }}>{label}</p>
              <p className="text-[#D7E2EA] font-light leading-relaxed" style={{ opacity: 0.75 }}>{body}</p>
            </motion.div>
          ))}
      </div>

      {project.stats.length > 0 && (
        <div className="mx-5 sm:mx-8 md:mx-10 mb-16 rounded-3xl bg-white px-8 py-12">
          <div className="grid gap-8 max-w-2xl mx-auto text-center" style={{ gridTemplateColumns: `repeat(${project.stats.length}, minmax(0, 1fr))` }}>
            {project.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-black" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#0c0c0c' }}>{stat.value}</p>
                <p className="font-light text-sm mt-2 uppercase tracking-wide" style={{ color: '#0c0c0c', opacity: 0.55 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* GALLERY — object-contain on a dark tile so every image shows in
          full, never cropped, regardless of its original aspect ratio. */}
      {project.galleryImgs.length > 0 && (
        <div className="px-5 sm:px-8 md:px-10 pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.galleryImgs.map((img, i) => (
            <motion.div key={i} className="w-full rounded-2xl overflow-hidden" style={{ aspectRatio: '4/3', background: 'rgba(255,255,255,0.03)' }}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 6) * 0.08 }}>
              <img src={img} alt={`${project.title} ${i + 1}`} className="w-full h-full object-contain" loading="lazy" />
            </motion.div>
          ))}
        </div>
      )}

      <div className="flex justify-between items-center px-5 sm:px-8 md:px-10 py-12 border-t" style={{ borderColor: 'rgba(215,226,234,0.08)' }}>
        {prev ? (
          <button onClick={() => navigate(`/portfolio/${prev.slug}`)} className="flex items-center gap-3 text-[#D7E2EA] hover:opacity-70 transition-opacity group">
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <div className="text-left">
              <p className="text-xs uppercase tracking-widest" style={{ opacity: 0.4 }}>Previous</p>
              <p className="font-medium uppercase text-sm">{prev.title}</p>
            </div>
          </button>
        ) : <div />}
        {next ? (
          <button onClick={() => navigate(`/portfolio/${next.slug}`)} className="flex items-center gap-3 text-[#D7E2EA] hover:opacity-70 transition-opacity group">
            <div className="text-right">
              <p className="text-xs uppercase tracking-widest" style={{ opacity: 0.4 }}>Next</p>
              <p className="font-medium uppercase text-sm">{next.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
        ) : <div />}
      </div>

      <div className="text-center pb-20"><ContactButton /></div>
      <footer className="px-5 sm:px-8 md:px-10 py-10 border-t" style={{ borderColor: 'rgba(215,226,234,0.08)' }}>
        <p className="text-[#D7E2EA] text-sm font-light text-center" style={{ opacity: 0.35 }}>© 2026 Xan Orchid</p>
      </footer>
    </div>
  );
}
