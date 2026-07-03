import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from 'framer-motion';
import { ThumbsUp, Heart, MessageSquare, Send, Home, User, type LucideIcon } from 'lucide-react';
import wildchildVideo from './assets/wildchild.mp4';
import powerbagelsVideo from './assets/powerbagels.mp4';
import xanaduHero from './assets/xanadu-hero.png';
import { CustomCursor } from './components/CustomCursor';
import { GrainOverlay } from './components/GrainOverlay';
import { RevealImage } from './components/RevealImage';
import { Magnetic } from './components/Magnetic';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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
        backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
      }}
      transition={{ duration: 0.5, ease: EASE }}>
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

// ─── PANEL 1 — restrained hero, no heavy motion ────────────────────────────────
function HeroSimple() {
  return (
    <section className="h-screen flex flex-col justify-center items-center relative px-6" style={{ background: '#0c0c0c' }}>
      <FadeIn once={false}>
        <span className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-6 block text-center" style={{ opacity: 0.6 }}>Xan Orchid</span>
      </FadeIn>
      <FadeIn delay={0.1} once={false}>
        <h1 className="hero-heading font-black uppercase leading-[0.95] text-center max-w-4xl" style={{ fontSize: 'clamp(2.2rem, 6.5vw, 5rem)' }}>
          a creative designer driven by crafting striking and unforgettable brands
        </h1>
      </FadeIn>
      <FadeIn delay={0.2} once={false} className="mt-10">
        <ContactButton />
      </FadeIn>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="animate-bounce" aria-hidden="true">
          <path d="M4 8l8 7 8-7M4 13l8 7 8-7" stroke="#D7E2EA" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
        </svg>
      </div>
    </section>
  );
}

// ─── PANEL 2 — images appear one by one, then name slides up over them ────────
const INTRO_MEDIA = [
  'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
  'https://static.wixstatic.com/media/b80b05_1183020d0f444e2b87555f2431eed7fe~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
];

function ImagesNamePanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const img1 = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const img2 = useTransform(scrollYProgress, [0.08, 0.24], [0, 1]);
  const img3 = useTransform(scrollYProgress, [0.16, 0.32], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.35, 0.85], ['60%', '0%']);
  const nameOpacity = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);

  return (
    <div ref={ref} style={{ height: '220vh', position: 'relative', zIndex: 2 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: '#0c0c0c' }} className="flex items-center justify-center">
        <div className="relative w-full max-w-5xl px-6 flex items-center justify-center gap-3 sm:gap-5">
          <motion.div style={{ opacity: img1, scale: img1 }} className="w-1/4 rounded-2xl overflow-hidden">
            <img src={INTRO_MEDIA[0]} alt="" className="w-full object-cover rounded-2xl" style={{ aspectRatio: '3/5' }} />
          </motion.div>
          <motion.div style={{ opacity: img2, scale: img2 }} className="w-1/3 rounded-2xl overflow-hidden">
            <img src={INTRO_MEDIA[1]} alt="" className="w-full object-cover rounded-2xl" style={{ aspectRatio: '3/5' }} />
          </motion.div>
          <motion.div style={{ opacity: img3, scale: img3 }} className="w-1/4 rounded-2xl overflow-hidden">
            <img src={INTRO_MEDIA[2]} alt="" className="w-full object-cover rounded-2xl" style={{ aspectRatio: '3/5' }} />
          </motion.div>
        </div>
        <motion.div style={{ y: nameY, opacity: nameOpacity }} className="absolute inset-0 flex items-center justify-center pointer-events-none px-4">
          <h2 className="hero-heading font-black uppercase leading-none text-center" style={{ fontSize: 'clamp(3.5rem, 15vw, 15rem)' }}>Xan Orchid</h2>
        </motion.div>
      </div>
    </div>
  );
}

// ─── PANEL 3 — About teaser, pushes panel 2 out of frame ───────────────────────
function AboutTeaser() {
  return (
    <div style={{ height: '150vh', position: 'relative', zIndex: 3 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh' }} className="flex items-center justify-center px-6 relative overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(120deg, #1a1a2e 0%, #2d1b3d 40%, #16213e 70%, #0c0c0c 100%)', backgroundSize: '250% 250%' }}
          animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(12,12,12,0.35)' }} />
        <div className="relative z-10 max-w-2xl text-center">
          <FadeIn><span className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.6 }}>About</span></FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="hero-heading font-black uppercase mt-4 mb-6 leading-[0.95]" style={{ fontSize: 'clamp(1.8rem, 5vw, 3.4rem)' }}>
              Seeking Creative, Innovative Design and Business Solutions?
            </h2>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[#D7E2EA] font-light leading-relaxed mb-8" style={{ opacity: 0.75, fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)' }}>
              Xan is a creative entrepreneur, web designer, social media manager, and graphic designer, focused on collaborating with her clients to make beautiful designs, help build brand awareness, and grow your company.
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Magnetic strength={0.3}>
              <Link to="/about" data-cursor="hover" className="inline-block rounded-full bg-white text-[#0c0c0c] px-8 py-3 text-sm font-medium uppercase tracking-widest">
                Read More
              </Link>
            </Magnetic>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

// ─── PANEL 4 — Services, icons dance on scroll, pushes About out of frame ──────
interface ServiceIconItem { icon: LucideIcon; name: string; desc: string; }
const SERVICE_ICONS: ServiceIconItem[] = [
  { icon: ThumbsUp, name: 'Social Media Management', desc: 'Meta, LinkedIn, and TikTok' },
  { icon: Heart, name: 'Content Creation', desc: 'Reels, Posts, and Email Campaigns' },
  { icon: MessageSquare, name: 'Business Development', desc: 'Business and Marketing Strategy, A/B Testing, and Implementation' },
  { icon: Send, name: 'Social Media Advertising', desc: 'Google, Meta, and LinkedIn Ads' },
  { icon: Home, name: 'Range of Skills', desc: 'Figma, Canva, Adobe Illustrator, Photoshop, and InDesign.' },
  { icon: User, name: 'Community Management', desc: 'CRM and Client Acquisition' },
];

function DancingIcon({ item, index, scrollYProgress }: { item: ServiceIconItem; index: number; scrollYProgress: MotionValue<number> }) {
  const Icon = item.icon;
  const dir = index % 2 === 0 ? 1 : -1;
  const scrollY = useTransform(scrollYProgress, [0, 1], [0, dir * -18]);
  const scrollRotate = useTransform(scrollYProgress, [0, 1], [0, dir * 8]);
  return (
    <div className="flex flex-col items-center text-center gap-4">
      <motion.div style={{ y: scrollY, rotate: scrollRotate }}>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.4 + index * 0.25, repeat: Infinity, ease: 'easeInOut', delay: index * 0.15 }}
          className="w-16 h-16 rounded-2xl flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #d7d7d7, #8a8a8a)' }}>
          <Icon className="w-7 h-7" style={{ color: '#1a1a1a' }} strokeWidth={1.75} />
        </motion.div>
      </motion.div>
      <h3 className="text-white font-bold uppercase text-sm sm:text-base">{item.name}</h3>
      <p className="text-white font-light text-xs sm:text-sm max-w-[220px]" style={{ opacity: 0.6 }}>{item.desc}</p>
    </div>
  );
}

function ServicesDance() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  return (
    <div ref={ref} style={{ height: '150vh', position: 'relative', zIndex: 4 }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', background: '#0c0c0c' }} className="flex flex-col items-center justify-center px-6">
        <FadeIn><span className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.6 }}>Services</span></FadeIn>
        <FadeIn delay={0.1}>
          <h2 className="hero-heading font-black uppercase text-center mt-4 mb-16 sm:mb-20 leading-none" style={{ fontSize: 'clamp(1.8rem, 5.5vw, 3.6rem)' }}>
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
    <div className={`flex flex-col ${reversed ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 md:gap-14 items-center py-16 md:py-24`}
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

  return (
    <div className="main-wrapper">
      <CustomCursor />
      <GrainOverlay />
      <FixedNav />

      {/* ═══ PANEL 1: HERO ═══ */}
      <HeroSimple />

      {/* ═══ PANEL 2: IMAGES → NAME ═══ */}
      <ImagesNamePanel />

      {/* ═══ PANEL 3: ABOUT TEASER (pushes panel 2 out) ═══ */}
      <AboutTeaser />

      {/* ═══ PANEL 4: SERVICES, dancing icons (pushes panel 3 out) ═══ */}
      <ServicesDance />

      {/* ═══ PROJECTS — editorial alternating layout ═══ */}
      <section className="relative z-[5] px-5 sm:px-8 md:px-10 pt-20 pb-32" style={{ background: '#0c0c0c' }}>
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-4" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>Projects</h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <div className="text-center mb-8">
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
          <h2 className="font-black uppercase text-center mb-16 sm:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)', color: '#0c0c0c' }}>What Clients Say</h2>
        </FadeIn>
        <div className="max-w-3xl mx-auto">
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
                style={{ width: i === activeTestimonial ? '28px' : '8px', height: '8px', background: i === activeTestimonial ? '#0c0c0c' : 'rgba(12,12,12,0.25)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" className="relative z-[5] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#0c0c0c' }}>
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>Let&apos;s Make Waves</h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <p className="text-[#D7E2EA] text-center font-light uppercase tracking-wide mb-12" style={{ opacity: 0.45, fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
            Ready to collaborate? Let&apos;s create something epic together.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20}><ContactForm /></FadeIn>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="relative z-[5] px-5 sm:px-8 md:px-10 py-10 border-t" style={{ background: '#0c0c0c', borderColor: 'rgba(215,226,234,0.08)' }}>
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
