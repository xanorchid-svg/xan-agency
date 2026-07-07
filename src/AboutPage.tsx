import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ContactButton } from './App';

const VALUES = [
  { name: 'Passion', desc: 'Obsessed with creating exceptional creative experiences that leave a mark.' },
  { name: 'Innovation', desc: 'Embracing new trends and technologies to stay ahead of the curve.' },
  { name: 'Collaboration', desc: 'Believing in the power of true teamwork and genuine partnership.' },
  { name: 'Results', desc: 'Client success is the ultimate measure of success.' },
  { name: 'Authenticity', desc: 'Valuing genuine connections and honest communication above everything.' },
  { name: 'Empathy', desc: 'Understanding your world, your audience, and your goals.' },
];

export default function AboutPage() {
  return (
    <div className="main-wrapper min-h-screen" style={{ background: '#0c0c0c' }}>
      <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8 pb-4">
        <Link to="/" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-base hover:opacity-70 transition-opacity">Xan Orchid</Link>
        <Link to="/portfolio" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg hover:opacity-70 transition-opacity">Portfolio</Link>
      </nav>

      <div className="overflow-hidden px-6 md:px-10 pt-8 pb-6">
        <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-heading font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(4rem, 14vw, 160px)' }}>
          About
        </motion.h1>
      </div>

      <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <img src="https://static.wixstatic.com/media/b80b05_9ce31db91e124350895756cffa3ad5f3~mv2.jpg" alt="Xan Orchid" className="w-full object-cover object-top rounded-3xl" style={{ aspectRatio: '3/4' }} />
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="flex flex-col gap-6">
            <h2 className="font-black uppercase leading-none" style={{ fontSize: 'clamp(2rem, 5vw, 60px)', color: '#0c0c0c' }}>Xan Orchid</h2>
            <p className="font-light uppercase tracking-widest text-sm" style={{ color: '#0c0c0c', opacity: 0.45 }}>Creative Entrepreneur &amp; Graphic Designer</p>
            {[
              "Xan is a Hockaday School alum and recent graduate of the University of Colorado Boulder's Leeds School of Business, where she earned a Bachelor of Science in Business Administration in May 2025. She focused her studies on Entrepreneurship and Management, with a minor in Creative Technology and Media Design.",
              "While at CU Boulder, Xan was accepted into the Women's Empowerment Initiative — a selective program for 40 women in the business school — where she learned from successful female leaders who have founded companies or achieved C-Suite positions.",
              "During her study abroad in Barcelona, Xan delved into Design Thinking and Startup Creation, leading her to win the New Venture Creation competition with her startup Abrago — an all-in-one platform for organizing the study abroad experience.",
              "In her freelance work, Xan helps clients with branding, website creation, social media marketing, logo design, and template design. She has also built her own startups: GoGal and Astro Trips.",
            ].map((para, i) => (
              <p key={i} className="font-light leading-relaxed" style={{ color: '#0c0c0c', opacity: 0.68, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>{para}</p>
            ))}
            <div className="mt-2">
              <Link to="/portfolio" className="inline-block rounded-full px-8 py-3 font-medium uppercase tracking-widest text-sm text-white transition-opacity hover:opacity-90"
                style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)', boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1', outline: '2px solid white', outlineOffset: '-3px' }}>
                View Portfolio
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="-mt-10 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#0c0c0c' }}>
        <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="hero-heading font-black uppercase text-center mb-16 sm:mb-20" style={{ fontSize: 'clamp(3rem, 10vw, 120px)' }}>
          My Values
        </motion.h2>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
          {VALUES.map((val, i) => (
            <motion.div key={val.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-2xl p-6 sm:p-8 h-full" style={{ border: '1px solid rgba(215,226,234,0.12)' }}>
              <h3 className="text-[#D7E2EA] font-black uppercase text-lg mb-3">{val.name}</h3>
              <p className="text-[#D7E2EA] font-light text-sm leading-relaxed" style={{ opacity: 0.55 }}>{val.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-20"><ContactButton /></div>
      </section>

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
