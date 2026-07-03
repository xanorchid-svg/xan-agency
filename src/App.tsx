import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence, MotionValue } from 'framer-motion';
import { Layout, Megaphone, PenTool, Palette, TrendingUp, Target, type LucideIcon } from 'lucide-react';
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

// ─── FadeIn — blur + upward + scale, per the new motion spec ──────────────────
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

// ─── Marquee ──────────────────────────────────────────────────────────────────
const MARQUEE_IMAGES = [
  'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
  'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
  'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
  'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
  'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
  'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
  'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_1183020d0f444e2b87555f2431eed7fe~mv2.jpg',
];

function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(200);
  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const row1 = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const row2 = [...MARQUEE_IMAGES.slice(4), ...MARQUEE_IMAGES.slice(4), ...MARQUEE_IMAGES.slice(4)];
  return (
    <section ref={sectionRef} className="pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden" style={{ background: '#0c0c0c' }}>
      <div className="flex flex-col gap-3">
        <div className="flex gap-3" style={{ transform: `translateX(${offset - 200}px)`, willChange: 'transform' }}>
          {row1.map((src, i) => <img key={i} src={src} alt="" loading="lazy" className="rounded-2xl object-cover flex-shrink-0 grayscale hover:grayscale-0 transition-[filter] duration-700" style={{ width: '420px', height: '270px' }} />)}
        </div>
        <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}>
          {row2.map((src, i) => <img key={i} src={src} alt="" loading="lazy" className="rounded-2xl object-cover flex-shrink-0 grayscale hover:grayscale-0 transition-[filter] duration-700" style={{ width: '420px', height: '270px' }} />)}
        </div>
      </div>
    </section>
  );
}

// ─── IntroReveal — blank screen \u2192 images scale/fade in \u2192 name pinned, w/ mouse-light ──
function IntroReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  const imagesOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.35]);
  const imagesScale = useTransform(scrollYProgress, [0, 1], [0.8, 1.25]);
  const imagesBlurPx = useTransform(scrollYProgress, [0, 0.25], [6, 0]);
  const imagesFilter = useTransform(imagesBlurPx, (v) => `blur(${v}px)`);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [1, 0.55, 0.7]);
  const nameScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 0.82]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.12, 0.85, 1], [0, 1, 1, 0]);
  const promptOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 1, 0]);

  // Mouse-driven spotlight
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const spotlightBg = useTransform([smx, smy], (latest) => {
    const [px, py] = latest as number[];
    return `radial-gradient(600px circle at ${px}% ${py}%, rgba(182,0,168,0.10), transparent 70%)`;
  });
  const onMove = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((e.clientX - rect.left) / rect.width) * 100);
    my.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const introImages = MARQUEE_IMAGES.slice(0, 9);

  return (
    <div ref={ref} style={{ height: '260vh', position: 'relative', background: '#0c0c0c' }}>
      <div onMouseMove={onMove} style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
        <motion.div
          style={{ opacity: imagesOpacity, scale: imagesScale, filter: imagesFilter }}
          className="absolute inset-0 grid grid-cols-3 md:grid-cols-3 gap-2 sm:gap-3 p-2 sm:p-4">
          {introImages.map((src, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ gridColumn: i % 5 === 0 ? 'span 2' : undefined }}>
              <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" style={{ minHeight: '100%' }} />
            </div>
          ))}
        </motion.div>

        {/* mouse spotlight */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ background: spotlightBg }} />

        <motion.div
          style={{ opacity: overlayOpacity, background: 'radial-gradient(circle at 50% 50%, rgba(12,12,12,0.35) 0%, rgba(12,12,12,0.92) 75%)' }}
          className="absolute inset-0" />

        <motion.div style={{ scale: nameScale, opacity: nameOpacity }} className="absolute inset-0 flex items-center justify-center px-4">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none text-center" style={{ fontSize: 'clamp(3rem, 13vw, 18vw)' }}>
            Xan Orchid
          </h1>
        </motion.div>

        <motion.div style={{ opacity: promptOpacity }} className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.5 }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[1px] h-8" style={{ background: 'linear-gradient(to bottom, rgba(215,226,234,0.5), transparent)' }} />
        </motion.div>
      </div>
    </div>
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

// ─── Services ─────────────────────────────────────────────────────────────────
interface ServiceItem { num: string; name: string; desc: string; icon: LucideIcon; skills: string[]; }

const SERVICES: ServiceItem[] = [
  { num: '01', name: 'Web Design', desc: 'Clean, modern, conversion-focused websites. Every layout, color, and word chosen to serve the visitor and represent the brand.', icon: Layout, skills: ['React', 'Vite', 'Webflow', 'Figma'] },
  { num: '02', name: 'Brand Identity', desc: 'Logos, color systems, typography, and visual language built from scratch — a complete identity that communicates who you are at a glance.', icon: Palette, skills: ['Illustrator', 'Photoshop', 'Figma'] },
  { num: '03', name: 'Social Media Management', desc: 'Meta, LinkedIn, and TikTok strategy and management — building consistent brand presence, growing engaged communities, and turning followers into clients.', icon: Megaphone, skills: ['Meta Business Suite', 'LinkedIn', 'TikTok'] },
  { num: '04', name: 'Content Creation', desc: 'Reels, posts, and email campaigns crafted to stop the scroll. Visuals, copy, and concept aligned to your brand voice and your audience.', icon: PenTool, skills: ['Premiere Pro', 'Canva', 'CapCut'] },
  { num: '05', name: 'Social Media Advertising', desc: 'Google, Meta, and LinkedIn ad campaigns designed to reach the right people, drive real traffic, and convert at every stage of the funnel.', icon: Target, skills: ['Meta Ads Manager', 'Google Ads', 'A/B Testing'] },
  { num: '06', name: 'Business Development', desc: 'Business and marketing strategy, A/B testing, and implementation — turning good ideas into measurable, lasting results.', icon: TrendingUp, skills: ['Strategy', 'Analytics', 'Growth Planning'] },
];

function ServiceRow({ service, index }: { service: ServiceItem; index: number }) {
  const Icon = service.icon;
  const [hover, setHover] = useState(false);
  return (
    <FadeIn delay={index * 0.05} y={30}>
      <motion.div
        onHoverStart={() => setHover(true)}
        onHoverEnd={() => setHover(false)}
        data-cursor="hover"
        className="group py-8 sm:py-10 md:py-12 cursor-default"
        style={{ borderTop: index === 0 ? '1px solid rgba(12,12,12,0.12)' : undefined, borderBottom: '1px solid rgba(12,12,12,0.12)' }}>
        <div className="flex items-center gap-5 sm:gap-8 md:gap-10">
          <span className="font-black leading-none flex-shrink-0 transition-opacity duration-500" style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)', color: '#0c0c0c', opacity: hover ? 0.15 : 0.06 }}>{service.num}</span>
          <motion.div
            animate={{ rotate: hover ? -8 : 0, scale: hover ? 1.08 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)' }}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" strokeWidth={1.75} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <motion.h3
              animate={{ x: hover ? 8 : 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="font-medium uppercase mb-2" style={{ fontSize: 'clamp(1.1rem, 2.4vw, 2.2rem)', color: '#0c0c0c' }}>
              {service.name}
            </motion.h3>
            <AnimatePresence>
              {hover && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: EASE }} className="overflow-hidden">
                  <p className="font-light leading-relaxed max-w-2xl mb-3" style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)', color: '#0c0c0c', opacity: 0.6 }}>{service.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {service.skills.map((skill) => (
                      <span key={skill} className="text-xs uppercase tracking-wide px-3 py-1 rounded-full font-medium" style={{ color: '#0c0c0c', opacity: 0.5, border: '1px solid rgba(12,12,12,0.15)' }}>{skill}</span>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </FadeIn>
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

      {/* ═══ INTRO ═══ */}
      <IntroReveal />

      {/* ═══ HERO — tagline, CTA, portrait ═══ */}
      <section className="min-h-[70vh] flex flex-col justify-end overflow-x-clip relative" style={{ background: '#0c0c0c' }}>
        <div className="flex justify-between items-end flex-1 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.1} y={20}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
              a creative designer driven by crafting striking and unforgettable brands
            </p>
          </FadeIn>
          <FadeIn delay={0.2} y={20}><ContactButton /></FadeIn>
        </div>

        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px]">
          <FadeIn delay={0.15} y={30}>
            <Magnet padding={150} strength={3}>
              <img src="https://static.wixstatic.com/media/b80b05_4b81f695dc32416e98f8148f01b06014~mv2.jpg" alt="Xan Orchid" className="w-full object-cover object-top"
                style={{ borderRadius: '50% 50% 0 0', maskImage: 'linear-gradient(to top, transparent 0%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)', aspectRatio: '2/3' }} />
            </Magnet>
          </FadeIn>
        </div>
      </section>

      {/* ═══ MARQUEE ═══ */}
      <MarqueeSection />

      {/* ═══ ABOUT ═══ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-8 md:px-10 py-32" style={{ background: '#0c0c0c' }}>
        <div className="hidden md:block absolute top-[6%] left-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-50">
          <img src="https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute bottom-[6%] left-[2%] w-[100px] lg:w-[130px] pointer-events-none opacity-50">
          <img src="https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute top-[6%] right-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-50">
          <img src="https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute bottom-[6%] right-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-50">
          <img src="https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg" alt="" className="w-full rounded-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-[600px] w-full">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>About Me</h2>
          </FadeIn>
          <div className="flex flex-col items-center gap-16 sm:gap-20 md:gap-24 w-full">
            <AnimatedText
              text="With over five years of experience in design and business, I focus on branding, web design, social media, and strategy. A CU Boulder grad who won the New Venture Creation competition in Barcelona — I truly enjoy working with businesses that aim to stand out and present their best image. Let's build something incredible together."
              className="text-[#D7E2EA] font-medium text-center leading-relaxed text-base md:text-lg"
            />
            <ContactButton />
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <FadeIn delay={0} y={30}>
          <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0c0c0c' }}>Services</h2>
        </FadeIn>
        <div className="max-w-5xl mx-auto">
          {SERVICES.map((svc, i) => (
            <ServiceRow key={svc.num} service={svc} index={i} />
          ))}
        </div>
      </section>

      {/* ═══ PROJECTS — editorial alternating layout ═══ */}
      <section className="-mt-10 sm:-mt-12 md:-mt-14 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-32" style={{ background: '#0c0c0c' }}>
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
      <section className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
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
      <section id="contact" className="-mt-10 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#0c0c0c' }}>
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
      <footer className="px-5 sm:px-8 md:px-10 py-10 border-t" style={{ background: '#0c0c0c', borderColor: 'rgba(215,226,234,0.08)' }}>
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
