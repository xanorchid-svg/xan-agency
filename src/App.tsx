import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import wildchildVideo from './assets/wildchild.mp4';
import powerbagelsVideo from './assets/powerbagels.mp4';
import xanaduHero from './assets/xanadu-hero.png';
import reel1 from './assets/reel1.mp4';
import reel2 from './assets/reel2.mp4';
import reel3 from './assets/reel3.mp4';
import { ProceduralOrchid } from './components/ProceduralOrchid';
import { GrainOverlay } from './components/GrainOverlay';
import { RevealImage } from './components/RevealImage';
import { Magnetic } from './components/Magnetic';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";
const RED = '#B3231C';

// ─── ContactButton ─────────────────────────────────────────────────────────────
export function ContactButton() {
  return (
    <Magnetic strength={0.4}>
      <a href="#contact"
        onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
        data-cursor="hover"
        className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
                   text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white
                   transition-opacity hover:opacity-90"
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
          boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
          outline: '2px solid white',
          outlineOffset: '-3px',
        }}>
        Contact Me
      </a>
    </Magnetic>
  );
}

// ─── FadeIn ────────────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, duration = 1, y = 40, x = 0, className = '', once = true, blur = true }:
  { children: React.ReactNode; delay?: number; duration?: number; y?: number; x?: number; className?: string; once?: boolean; blur?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x, scale: 0.96, filter: blur ? 'blur(10px)' : 'none' }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once, margin: '80px', amount: 0 }}
      transition={{ duration, delay, ease: EASE }}
      className={className}>
      {children}
    </motion.div>
  );
}

// ─── Magnet (portrait, mouse-follow within radius) ─────────────────────────────
function Magnet({ children, padding = 150, strength = 3 }: { children: React.ReactNode; padding?: number; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;
      if (dist < threshold) {
        setActive(true);
        el.style.transform = `translate3d(${dx / strength}px, ${dy / strength}px, 0)`;
      } else {
        setActive(false);
        el.style.transform = 'translate3d(0,0,0)';
      }
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [padding, strength]);
  return (
    <div ref={ref} style={{ willChange: 'transform', transition: active ? 'transform 0.3s ease-out' : 'transform 0.6s ease-in-out' }}>
      {children}
    </div>
  );
}

// ─── AnimatedText ──────────────────────────────────────────────────────────────
function AnimatedText({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  return (
    <p ref={ref} className={`relative ${className}`} aria-label={text}>
      {text.split('').map((char, i) => (
        <CharSpan key={i} char={char} index={i} total={text.length} scrollYProgress={scrollYProgress} />
      ))}
    </p>
  );
}
function CharSpan({ char, index, total, scrollYProgress }: { char: string; index: number; total: number; scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [index / total, Math.min((index + 15) / total, 1)], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span style={{ opacity: 0 }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>{char === ' ' ? '\u00A0' : char}</motion.span>
    </span>
  );
}

// ─── Shrinking nav ──────────────────────────────────────────────────────────────
function FixedNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50"
      animate={{
        paddingTop: scrolled ? 12 : 28,
        paddingBottom: scrolled ? 12 : 0,
        backgroundColor: scrolled ? 'rgba(12,12,12,0.7)' : 'rgba(12,12,12,0)',
      }}
      transition={{ duration: 0.5, ease: EASE }}
      style={{ backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)' }}>
      <nav className="flex justify-between items-center px-6 md:px-10">
        <Link to="/" data-cursor="hover" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity">Xan Orchid</Link>
        <div className="flex gap-6 md:gap-10">
          {[{ label: 'About', to: '/about' }, { label: 'Portfolio', to: '/portfolio' }].map(({ label, to }) => (
            <Link key={label} to={to} data-cursor="hover" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity">{label}</Link>
          ))}
          <a href="#contact" data-cursor="hover" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity">Contact</a>
        </div>
      </nav>
    </motion.div>
  );
}

// ─── PANEL 1 — restrained hero, procedural orchid behind content, dissolves
// into sacred geometry as the user scrolls the hero out of view ──────────────
function HeroSimple() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative overflow-hidden px-6" style={{ fontFamily: FONT, zIndex: 1, height: '100dvh' }}>
      <FadeIn once={false}>
        <span className="relative text-xs uppercase tracking-[0.3em] mb-6 block text-center" style={{ color: RED, fontFamily: FONT }}>Xan Orchid</span>
      </FadeIn>
      <FadeIn delay={0.1} once={false}>
        <h1
          className="relative font-bold uppercase text-center whitespace-normal sm:whitespace-nowrap"
          style={{ fontFamily: FONT, color: '#D7E2EA', fontSize: 'clamp(1.4rem, 4vw, 2.75rem)', letterSpacing: '-0.01em', lineHeight: 1.1 }}>
          Making dreams a reality.
        </h1>
      </FadeIn>
      <FadeIn delay={0.2} once={false} className="relative mt-10">
        <ContactButton />
      </FadeIn>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="animate-bounce" aria-hidden="true">
          <path d="M4 8l8 7 8-7M4 13l8 7 8-7" stroke={RED} strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
        </svg>
      </div>
    </section>
  );
}

// Simplified deliberately: trusting the native autoPlay/muted/loop/playsInline
// attributes alone (no custom JS .play() call). A manual play() call racing
// against the browser's own native autoplay handling is a real, documented
// source of desktop-only playback failures \u2014 removing it is the fix here.
function IntroVideo({ src }: { src: string }) {
  return (
    // iPhone screen proportions (~19.5:9), rounded like a phone bezel. Height
    // is explicit and capped (not derived from width via grid stretch +
    // aspect-ratio, which resolves inconsistently across browsers when the
    // grid cell tries to stretch the item to 100% width) \u2014 width then
    // follows automatically from the aspect-ratio, which is reliable.
    <div className="rounded-[28px] overflow-hidden mx-auto" style={{ height: 'min(60vh, 50vw)', aspectRatio: '9/19.5', background: '#111' }}>
      <video autoPlay muted loop playsInline preload="auto" className="w-full h-full object-cover">
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}

const INTRO_VIDEOS = [reel1, reel2, reel3];
const PANEL2_VH = 220;
const PANEL3_VH = 150;
const PANEL2_FRACTION = PANEL2_VH / (PANEL2_VH + PANEL3_VH);

// ─── PANELS 2+3 combined — one continuous orchid background stretches behind
// both the reel/name reveal AND the About teaser. The orchid zooms and slowly
// dissolves toward sacred geometry across the FULL combined scroll span; each
// panel's own content uses a locally-remapped 0\u20131 progress derived from that
// same shared scroll value, so everything stays perfectly in sync. ───────────
function IntroAndAboutCombined() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Panel 2's local progress: 0\u20131 across just its portion of the combined scroll.
  const panel2Local = useTransform(scrollYProgress, [0, PANEL2_FRACTION], [0, 1], { clamp: true });
  const nameY = useTransform(panel2Local, [0.3, 0.98], ['70%', '-140%']);
  const nameOpacity = useTransform(panel2Local, [0.3, 0.4], [0, 1]);

  return (
    <div ref={ref} style={{ height: `${PANEL2_VH + PANEL3_VH}vh`, position: 'relative', zIndex: 2 }}>
      {/* Panel 2 content \u2014 reels + name, transparent background so the global
          orchid behind it shows through. Sticky within just the first portion. */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: `${PANEL2_VH}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', maxHeight: '100dvh', overflow: 'hidden' }} className="flex items-center justify-center">
          <div className="w-full max-w-4xl px-6 grid grid-cols-3 items-center gap-3 sm:gap-5">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
              <IntroVideo src={INTRO_VIDEOS[0]} />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 1.15 }} animate={{ opacity: 1, scale: 1.15 }} transition={{ duration: 0.8, delay: 0.15 }}>
              <IntroVideo src={INTRO_VIDEOS[1]} />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>
              <IntroVideo src={INTRO_VIDEOS[2]} />
            </motion.div>
          </div>
          <motion.div style={{ y: nameY, opacity: nameOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none px-2">
            <h2 className="font-bold uppercase leading-none text-center w-full" style={{ fontFamily: FONT, color: '#D7E2EA', fontSize: 'clamp(3.5rem, 17vw, 15rem)', letterSpacing: '-0.03em' }}>Xan Orchid</h2>
          </motion.div>
        </div>
      </div>

      {/* Panel 3 content \u2014 About teaser, transparent background, sticky within
          the remaining portion, positioned right after panel 2's span ends. */}
      <div style={{ position: 'absolute', top: `${PANEL2_VH}vh`, left: 0, right: 0, height: `${PANEL3_VH}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', maxHeight: '100dvh' }} className="flex items-center justify-center px-6">
          <div className="relative z-10 max-w-2xl text-center" style={{ fontFamily: FONT }}>
            <FadeIn><span className="text-xs uppercase tracking-[0.3em]" style={{ color: RED }}>About</span></FadeIn>
            <FadeIn delay={0.1}>
              <h2 className="font-bold uppercase mt-4 mb-6 leading-tight" style={{ color: '#D7E2EA', fontSize: 'clamp(1.5rem, 3.6vw, 2.4rem)', letterSpacing: '-0.01em' }}>
                Seeking Creative, Innovative Design and Business Solutions?
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="font-light leading-relaxed mb-8" style={{ color: '#D7E2EA', opacity: 0.75, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
                Xan is a creative entrepreneur, web designer, social media manager, and graphic designer, focused on collaborating with her clients to make beautiful designs, help build brand awareness, and grow your company.
              </p>
            </FadeIn>
            <FadeIn delay={0.3}>
              <Magnetic strength={0.3}>
                <Link to="/about" data-cursor="hover" className="inline-block rounded-full px-8 py-3 text-sm font-medium uppercase tracking-widest"
                  style={{ background: RED, color: 'white' }}>
                  Read More
                </Link>
              </Magnetic>
            </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PANEL 4 — Services, icons dance on scroll, pushes About out of frame ──────
interface ServiceIconItem { img: string; name: string; desc: string; }
const SERVICE_ICONS: ServiceIconItem[] = [
  { img: 'https://static.wixstatic.com/media/c837a6_a00a8b54a94b45f5986a698fd0e2e687~mv2.png', name: 'Social Media Management', desc: 'Meta, LinkedIn, and TikTok' },
  { img: 'https://static.wixstatic.com/media/c837a6_14b621448ee5407283a5596d19b0a050~mv2.png', name: 'Content Creation', desc: 'Reels, Posts, and Email Campaigns' },
  { img: 'https://static.wixstatic.com/media/c837a6_4d43a6ee0f934212904c9ddf6e315b10~mv2.png', name: 'Business Development', desc: 'Business and Marketing Strategy, A/B Testing, and Implementation' },
  { img: 'https://static.wixstatic.com/media/c837a6_944b11dc96cd405882b72bb708bd9bf4~mv2.png', name: 'Social Media Advertising', desc: 'Google, Meta, and LinkedIn Ads' },
  { img: 'https://static.wixstatic.com/media/c837a6_86cfe0201e3d4240acc8fb7a00e001cf~mv2.png', name: 'Range of Skills', desc: 'Figma, Canva, Adobe Illustrator, Photoshop, and InDesign.' },
  { img: 'https://static.wixstatic.com/media/c837a6_b5147a4462684c8b87ee35acf9401655~mv2.png', name: 'Community Management', desc: 'CRM and Client Acquisition' },
];

function DancingIcon({ item, index, scrollYProgress }: { item: ServiceIconItem; index: number; scrollYProgress: MotionValue<number> }) {
  const [hover, setHover] = useState(false);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        style={{ rotate: hover ? undefined : scrollRotate }}
        animate={hover ? { rotate: 360, scale: 1.15 } : { y: [0, -8, 0], scale: 1 }}
        transition={hover ? { duration: 0.6, ease: 'easeInOut' } : { duration: 2.4 + index * 0.25, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
        className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center cursor-default">
        <img src={item.img} alt={item.name} className="w-full h-full object-contain drop-shadow-lg" />
      </motion.div>
      <h3 className="font-bold uppercase text-sm sm:text-base" style={{ fontFamily: FONT, color: 'white' }}>{item.name}</h3>
      <p className="font-light text-xs sm:text-sm max-w-[220px]" style={{ fontFamily: FONT, color: 'white', opacity: 0.6 }}>{item.desc}</p>
    </div>
  );
}

function ServicesDance() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <div ref={ref} style={{ height: '150vh', position: 'relative', zIndex: 4 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', maxHeight: '100dvh' }} className="flex flex-col items-center justify-center px-6">
        <FadeIn><span className="text-xs uppercase tracking-[0.3em]" style={{ fontFamily: FONT, color: RED }}>Services</span></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="font-bold uppercase text-center mt-4 mb-16 sm:mb-20 leading-tight" style={{ fontFamily: FONT, color: '#D7E2EA', fontSize: 'clamp(1.6rem, 4.4vw, 2.75rem)', letterSpacing: '-0.01em' }}>
            Not Just Social Butterflies
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 sm:gap-x-14 gap-y-12 sm:gap-y-16 max-w-4xl">
          {SERVICE_ICONS.map((item, i) => (
            <DancingIcon key={item.name} item={item} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "I can't say enough about Alexandra Orchid's work. I hired her to build a website for my podcast and coaching business. I had a vague idea of what I wanted, and she took the ball and ran with it. Her work is beautiful, creative and pragmatic. Who could ask for more?", name: 'Marissa K.', company: 'Age Thoughtfully' },
  { quote: "I can't say enough about Xan. She has helped us in many different roles — Social Media marketing, newsletters, blogs, infographics, and even building and maintaining our website. She is great at taking feedback and implements changes quickly and accurately.", name: 'David Diamond', company: 'Diamond Vitality Center' },
  { quote: "I've worked with Alexandra on several projects including pitch decks, paid media ads, social media posts, and promotional materials. She has a strong design eye, delivers efficiently and on time, and absorbs feedback quickly.", name: 'Leo R.', company: 'Creative Strategic Business Consultant' },
  { quote: "Our company worked with Xan to rebrand our fragrance website. She was so helpful and knowledgeable throughout. She gave us options and helped us choose the best one. We would highly recommend her to anyone looking to rebrand.", name: 'Leen B.', company: 'Design Hub 95' },
];

// ─── Featured project — editorial layout with clip-path reveal media ──────────
function FeaturedCard({
  num, title, category, description, video, image, url, externalLink, index,
}: {
  num: string; title: string; category: string; description: string;
  video?: string; image: string; url: string; externalLink?: boolean; index: number;
}) {
  const reversed = index % 2 === 1;
  return (
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-6 md:gap-14 items-center py-8 sm:py-12 md:py-24`}
      style={{ borderTop: index === 0 ? 'none' : '1px solid rgba(215,226,234,0.08)' }}>
      <div className="w-full md:w-1/2">
        {video ? (
          <motion.div
            initial={{ clipPath: 'inset(6% 6% 6% 6% round 28px)', opacity: 0, scale: 0.96 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 1.2, ease: EASE }}
            className="overflow-hidden rounded-3xl" style={{ aspectRatio: '4/3' }}>
            <video src={video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
          </motion.div>
        ) : (
          <RevealImage src={image} alt={title} aspectRatio="4/3" />
        )}
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-6">
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-4 mb-2">
            <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>{num}</span>
            <span className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>{category}</span>
          </div>
          <h3 className="text-[#D7E2EA] font-black uppercase mb-4 leading-[0.95]" style={{ fontSize: 'clamp(1.6rem, 4vw, 3.2rem)' }}>{title}</h3>
          <p className="text-[#D7E2EA] font-light leading-relaxed mb-6" style={{ opacity: 0.65, fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)' }}>{description}</p>
          {externalLink ? (
            <Magnetic strength={0.3}>
              <a href={url} target="_blank" rel="noopener noreferrer" data-cursor="hover"
                className="inline-flex items-center gap-3 text-[#D7E2EA] text-sm font-medium uppercase tracking-widest group">
                <span className="border-b border-[#D7E2EA]/40 pb-1 group-hover:border-[#D7E2EA] transition-colors">Live Site</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>↗</motion.span>
              </a>
            </Magnetic>
          ) : (
            <Magnetic strength={0.3}>
              <Link to={url} data-cursor="hover" className="inline-flex items-center gap-3 text-[#D7E2EA] text-sm font-medium uppercase tracking-widest group">
                <span className="border-b border-[#D7E2EA]/40 pb-1 group-hover:border-[#D7E2EA] transition-colors">View Project</span>
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>→</motion.span>
              </Link>
            </Magnetic>
          )}
        </FadeIn>
      </div>
    </div>
  );
}

// ─── Contact Form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  if (sent) return (
    <motion.div initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ ease: EASE, duration: 0.8 }} className="text-center py-16">
      <p className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl">Message received!</p>
      <p className="text-[#D7E2EA] font-light mt-3" style={{ opacity: 0.5 }}>Xan will be in touch soon.</p>
    </motion.div>
  );
  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex gap-4">
        <input data-cursor="hover" placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="flex-1 bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
        <input data-cursor="hover" placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="flex-1 bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
      </div>
      <input data-cursor="hover" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
      <textarea data-cursor="hover" placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors resize-none" />
      <div className="flex justify-center mt-2">
        <button onClick={() => setSent(true)} data-cursor="hover"><ContactButton /></button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  // One continuous orchid for the whole page: starts at zero (reads as pure
  // black on the hero), grows/zooms as you scroll, later dissolves into
  // sacred geometry. Fixed + low z-index so every section with a transparent
  // background shows it, while white sections (Testimonials) naturally cover
  // it with their own opaque background \u2014 no per-section logic needed.
  const { scrollYProgress: pageScroll } = useScroll();

  return (
    <div className="main-wrapper" style={{ fontFamily: FONT, background: '#0c0c0c' }}>
      <div className="fixed inset-0" style={{ zIndex: 0 }} aria-hidden="true">
        <ProceduralOrchid variant="hero" dissolve={pageScroll} />
      </div>
      <GrainOverlay />
      <FixedNav />

      {/* ═══ PANEL 1: HERO ═══ */}
      <HeroSimple />

      {/* ═══ PANELS 2+3: IMAGES → NAME, then ABOUT TEASER \u2014 shared global orchid shows through ═══ */}
      <IntroAndAboutCombined />

      {/* ═══ PANEL 4: SERVICES, dancing icons (pushes panel 3 out) ═══ */}
      <ServicesDance />

      {/* ═══ PROJECTS — editorial alternating layout ═══ */}
      <section className="relative z-[5] px-5 sm:px-8 md:px-10 pt-24 sm:pt-28 md:pt-20 pb-16 sm:pb-24 md:pb-32">
        <FadeIn delay={0} y={40}>
          <h2 className="font-bold uppercase text-center mb-4" style={{ fontFamily: FONT, color: '#D7E2EA', fontSize: 'clamp(2rem, 6vw, 4.5rem)', letterSpacing: '-0.01em' }}>Projects</h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <div className="text-center mb-4 sm:mb-6 md:mb-8">
            <Magnetic strength={0.3}>
              <Link to="/portfolio" data-cursor="hover" className="text-[#D7E2EA] uppercase tracking-widest text-sm font-medium hover:opacity-70 transition-opacity">Full Portfolio →</Link>
            </Magnetic>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto">
          <FeaturedCard
            index={0}
            num="01"
            title="Wild Child Nosara"
            category="Web Design"
            description="A vibrant website for a nature-based school community in Costa Rica. Designed to capture the free-spirited energy of wildschooling while giving parents a clear, trust-building experience."
            video={wildchildVideo}
            image="https://static.wixstatic.com/media/b80b05_1183020d0f444e2b87555f2431eed7fe~mv2.jpg"
            url="/portfolio/dandelion-wild-school"
          />
          <FeaturedCard
            index={1}
            num="02"
            title="Power Bagels"
            category="Brand Identity"
            description="Bold brand identity and video content for a high-energy bagel concept. From logo to social content, every element was built to stand out — confident, fun, and immediately recognizable."
            video={powerbagelsVideo}
            image="https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png"
            url="/portfolio/power-bagels"
          />
          <FeaturedCard
            index={2}
            num="03"
            title="Dream Xanadu"
            category="Web Design"
            description="Full brand identity and website design for a network for awakening places. A rich, immersive digital experience built to embody trust, beauty, and mystery."
            image={xanaduHero}
            url="https://dreamxanadu.com"
            externalLink
          />
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="relative z-[5] bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <FadeIn delay={0} y={30}>
          <h2 className="font-bold uppercase text-center mb-16 sm:mb-20" style={{ fontFamily: FONT, fontSize: 'clamp(1.8rem, 4.5vw, 3rem)', color: '#0c0c0c', letterSpacing: '-0.01em' }}>What Clients Say</h2>
        </FadeIn>
        <div className="max-w-3xl mx-auto" style={{ fontFamily: FONT }}>
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }} transition={{ duration: 0.6, ease: EASE }} className="text-center">
              <p className="font-light leading-relaxed mb-8" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 1.7rem)', color: '#0c0c0c', opacity: 0.8 }}>
                &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
              </p>
              <p className="font-medium uppercase tracking-wide" style={{ color: '#0c0c0c', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>{TESTIMONIALS[activeTestimonial].name}</p>
              <p style={{ color: '#0c0c0c', opacity: 0.45, fontSize: '0.85rem' }}>{TESTIMONIALS[activeTestimonial].company}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} data-cursor="hover" onClick={() => setActiveTestimonial(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === activeTestimonial ? '28px' : '8px', height: '8px', background: i === activeTestimonial ? RED : 'rgba(12,12,12,0.25)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative z-[5] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <FadeIn delay={0} y={40}>
          <h2 className="font-bold uppercase text-center mb-4" style={{ fontFamily: FONT, color: '#D7E2EA', fontSize: 'clamp(1.8rem, 5vw, 3rem)', letterSpacing: '-0.01em' }}>Let&apos;s Make Waves</h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <p className="text-[#D7E2EA] text-center font-light uppercase tracking-wide mb-12" style={{ opacity: 0.45, fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
            Ready to collaborate? Let&apos;s create something epic together.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20}><ContactForm /></FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-[5] px-5 sm:px-8 md:px-10 py-10 border-t" style={{ borderColor: 'rgba(215,226,234,0.08)' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-[#D7E2EA] font-light text-sm" style={{ opacity: 0.35 }}>© 2026 Xan Orchid. All rights reserved.</p>
          <div className="flex gap-8">
            <Magnetic strength={0.3}><Link to="/portfolio" data-cursor="hover" className="text-[#D7E2EA] text-sm uppercase tracking-wider font-medium hover:opacity-70 transition-opacity">Portfolio</Link></Magnetic>
            <Magnetic strength={0.3}><Link to="/about" data-cursor="hover" className="text-[#D7E2EA] text-sm uppercase tracking-wider font-medium hover:opacity-70 transition-opacity">About</Link></Magnetic>
          </div>
          <div className="flex gap-5">
            {[{ label: 'Instagram', href: 'https://www.instagram.com/graphix.xan' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xan-orchid/' }, { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01b1742c39720ba911' }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" data-cursor="hover" className="text-[#D7E2EA] text-sm hover:opacity-70 transition-opacity" style={{ opacity: 0.5 }}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
