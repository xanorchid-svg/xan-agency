import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  MotionValue,
} from 'framer-motion';

// ─── ContactButton ─────────────────────────────────────────────────────────────
export function ContactButton() {
  return (
    <a
      href="#contact"
      onClick={(e) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }}
      className="inline-block rounded-full px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4
                 text-xs sm:text-sm md:text-base font-medium uppercase tracking-widest text-white
                 transition-opacity hover:opacity-90"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px',
      }}
    >
      Contact Me
    </a>
  );
}

// ─── FadeIn ────────────────────────────────────────────────────────────────────
function FadeIn({
  children, delay = 0, duration = 0.7, y = 30, x = 0, className = '', once = true,
}: {
  children: React.ReactNode;
  delay?: number; duration?: number; y?: number; x?: number; className?: string; once?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin: '50px', amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Magnet ────────────────────────────────────────────────────────────────────
function Magnet({ children, padding = 150, strength = 3 }: {
  children: React.ReactNode; padding?: number; strength?: number;
}) {
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
function CharSpan({ char, index, total, scrollYProgress }: {
  char: string; index: number; total: number; scrollYProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollYProgress, [index / total, Math.min((index + 15) / total, 1)], [0.2, 1]);
  return (
    <span className="relative inline-block">
      <span style={{ opacity: 0 }}>{char === ' ' ? '\u00A0' : char}</span>
      <motion.span style={{ opacity, position: 'absolute', left: 0, top: 0 }}>{char === ' ' ? '\u00A0' : char}</motion.span>
    </span>
  );
}

// ─── MarqueeSection ────────────────────────────────────────────────────────────
const MARQUEE_IMAGES = [
  'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
  'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
  'https://static.wixstatic.com/media/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_834d8e3048924049a1e673671f1b279e~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_500,h_500,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png',
  'https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_700,h_700,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png',
  'https://static.wixstatic.com/media/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg/v1/fill/w_960,h_960,fp_0.48_0.28,q_90,enc_avif,quality_auto/b80b05_4a4d6bfee6474a4fbf5405bda2781163~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
  'https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png',
  'https://static.wixstatic.com/media/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_d7e67e7f4c3141d3a3d1f23ebd9a15ff~mv2.png',
  'https://static.wixstatic.com/media/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_0432fd65720948f1845054d751a9d154~mv2.jpg',
  'https://static.wixstatic.com/media/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg/v1/fill/w_960,h_960,fp_0.75_0.33,q_90,enc_avif,quality_auto/b80b05_f2398da15529481ebc11b11336a02c37~mv2.jpg',
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
          {row1.map((src, i) => <img key={i} src={src} alt="" loading="lazy" className="rounded-2xl object-cover flex-shrink-0" style={{ width: '420px', height: '270px' }} />)}
        </div>
        <div className="flex gap-3" style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: 'transform' }}>
          {row2.map((src, i) => <img key={i} src={src} alt="" loading="lazy" className="rounded-2xl object-cover flex-shrink-0" style={{ width: '420px', height: '270px' }} />)}
        </div>
      </div>
    </section>
  );
}

// ─── Services ──────────────────────────────────────────────────────────────────
const SERVICES = [
  { num: '01', name: 'Social Media Management', desc: 'Meta, LinkedIn, and TikTok strategy and management — building consistent brand presence, growing engaged communities, and turning followers into clients.' },
  { num: '02', name: 'Content Creation', desc: 'Reels, posts, and email campaigns crafted to stop the scroll. Visuals, copy, and concept aligned to your brand voice and your audience.' },
  { num: '03', name: 'Brand Identity', desc: 'Logos, color systems, typography, and visual language built from scratch — a complete identity that communicates who you are at a glance.' },
  { num: '04', name: 'Web Design', desc: 'Clean, modern, conversion-focused websites. Every layout, color, and word chosen to serve the visitor and represent the brand.' },
  { num: '05', name: 'Business Development', desc: 'Business and marketing strategy, A/B testing, and implementation — turning good ideas into measurable, lasting results.' },
  { num: '06', name: 'Social Media Advertising', desc: 'Google, Meta, and LinkedIn ad campaigns designed to reach the right people, drive real traffic, and convert at every stage of the funnel.' },
];

// ─── Testimonials ──────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { quote: "I can't say enough about Alexandra Orchid's work. I hired her to build a website for my podcast and coaching business. I had a vague idea of what I wanted, and she took the ball and ran with it. Her work is beautiful, creative and pragmatic. Who could ask for more? I would hire Ms. Orchid again in a minute.", name: 'Marissa K.', company: 'Age Thoughtfully' },
  { quote: "I can't say enough about Xan. She has helped us in many different roles — Social Media marketing, newsletters, blogs, infographics, and even building and maintaining our website. She is great at taking feedback and implements changes quickly and accurately. I highly recommend Xan.", name: 'David Diamond', company: 'Diamond Vitality Center' },
  { quote: "I've worked with Alexandra on several projects including pitch decks, paid media ads, social media posts, and promotional materials. She has a strong design eye, delivers efficiently and on time, and absorbs feedback quickly. Alexandra's a joy to work with — highly recommend.", name: 'Leo R.', company: 'Creative Strategic Business Consultant' },
  { quote: "Our company worked with Xan to rebrand our fragrance website. She was so helpful and knowledgeable throughout. She gave us options and helped us choose the best one. She made sure we were completely satisfied. We would highly recommend her to anyone looking to rebrand.", name: 'Leen B.', company: 'Design Hub 95' },
];

// ─── Featured Projects (homepage) ──────────────────────────────────────────────
// Wild Child Nosara, Power Bagels, Diamond Vitality Center — one image + description each
const FEATURED_PROJECTS = [
  {
    num: '01',
    title: 'Wild Child Nosara',
    category: 'Web Design',
    description: 'A vibrant website for a nature-based school community in Costa Rica. Designed to capture the free-spirited energy of wildschooling while giving parents a clear, trust-building experience.',
    image: 'https://static.wixstatic.com/media/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png/v1/fill/w_960,h_960,fp_0.87_0.36,q_90,enc_avif,quality_auto/b80b05_9df5fbb67954467daddbbddbdaf70345~mv2.png',
    url: 'https://elianebeeson.wixsite.com/wildchild',
    slug: 'dandelion-wild-school',
  },
  {
    num: '02',
    title: 'Power Bagels',
    category: 'Brand Identity',
    description: 'Bold brand identity for a high-energy bagel concept. From logo to color system, every element was built to stand out on social and in-store — confident, fun, and immediately recognizable.',
    image: 'https://static.wixstatic.com/media/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png/v1/fit/w_725,h_725,q_90,enc_avif,quality_auto/b80b05_b93b871b516a4171bdcdcdc71fcac166~mv2.png',
    url: null,
    slug: 'flyers',
  },
  {
    num: '03',
    title: 'Diamond Vitality Center',
    category: 'Social Media',
    description: 'Full social media management, content creation, and website upkeep for a wellness center. Grew engagement by 35%, followers by 80%, and drove meaningful traffic to their services.',
    image: 'https://static.wixstatic.com/media/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png/v1/fit/w_960,h_960,q_90,enc_avif,quality_auto/b80b05_4197938df6674fbfb082c1c0ebc8e7b5~mv2.png',
    url: 'http://www.diamondvitalitycenter.com',
    slug: 'diamond-vitality-center',
  },
];

// ─── Contact Form ──────────────────────────────────────────────────────────────
function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', message: '' });
  if (sent) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
        <p className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xl">Message received!</p>
        <p className="text-[#D7E2EA] font-light mt-3" style={{ opacity: 0.5 }}>Xan will be in touch soon.</p>
      </motion.div>
    );
  }
  return (
    <div className="flex flex-col gap-4 max-w-xl mx-auto">
      <div className="flex gap-4">
        <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          className="flex-1 bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
        <input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          className="flex-1 bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
      </div>
      <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors" />
      <textarea placeholder="Message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
        className="bg-transparent border border-[#D7E2EA]/20 rounded-xl px-4 py-3 text-[#D7E2EA] font-light placeholder-[#D7E2EA]/30 focus:outline-none focus:border-[#D7E2EA]/50 transition-colors resize-none" />
      <div className="flex justify-center mt-2">
        <button onClick={() => setSent(true)}><ContactButton /></button>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial((p) => (p + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="main-wrapper">

      {/* ═══════ 1. HERO ═══════ */}
      <section className="h-screen flex flex-col overflow-x-clip relative" style={{ background: '#0c0c0c' }}>

        {/* Navbar */}
        <FadeIn delay={0} y={-20} once={false}>
          <nav className="flex justify-between items-center px-6 md:px-10 pt-6 md:pt-8">
            <Link to="/" className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
              Xan Orchid
            </Link>
            <div className="flex gap-6 md:gap-10">
              {[{ label: 'About', to: '/about' }, { label: 'Portfolio', to: '/portfolio' }].map(({ label, to }) => (
                <Link key={label} to={to} className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">{label}</Link>
              ))}
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
                className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200">
                Contact
              </a>
            </div>
          </nav>
        </FadeIn>

        {/* Hero Heading — fluid font so "Xan Orchid" never clips */}
        <div className="overflow-hidden mt-6 sm:mt-4 md:-mt-2 px-4 md:px-8">
          <FadeIn delay={0.15} y={40} once={false}>
            <h1
              className="hero-heading font-black uppercase tracking-tight leading-none w-full"
              style={{ fontSize: 'clamp(3rem, 12.5vw, 17.5vw)' }}
            >
              Xan Orchid
            </h1>
          </FadeIn>
        </div>

        {/* Bottom bar */}
        <div className="flex justify-between items-end flex-1 px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
          <FadeIn delay={0.35} y={20} once={false}>
            <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
              a creative designer driven by crafting striking and unforgettable brands
            </p>
          </FadeIn>
          <FadeIn delay={0.5} y={20} once={false}>
            <ContactButton />
          </FadeIn>
        </div>

        {/* Portrait — centered absolute */}
        <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 w-[240px] sm:w-[320px] md:w-[400px] lg:w-[460px]">
          <FadeIn delay={0.6} y={30} once={false}>
            <Magnet padding={150} strength={3}>
              <img
                src="https://static.wixstatic.com/media/b80b05_4b81f695dc32416e98f8148f01b06014~mv2.jpg/v1/fill/w_800,h_1200,al_c,q_90,enc_avif,quality_auto/IMG_2061_JPG.jpg"
                alt="Xan Orchid"
                className="w-full object-cover object-top"
                style={{ borderRadius: '50% 50% 0 0', maskImage: 'linear-gradient(to top, transparent 0%, black 20%)', WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 20%)', aspectRatio: '2/3' }}
              />
            </Magnet>
          </FadeIn>
        </div>
      </section>

      {/* ═══════ 2. MARQUEE ═══════ */}
      <MarqueeSection />

      {/* ═══════ 3. ABOUT ═══════ */}
      {/* FIX: corner images are hidden on small screens, smaller on large — so they never cover text */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-5 sm:px-8 md:px-10 py-32" style={{ background: '#0c0c0c' }}>

        {/* Corner decorative images — hidden on mobile, small + far on desktop */}
        <div className="hidden md:block absolute top-[6%] left-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-60">
          <img src="https://static.wixstatic.com/media/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png/v1/fit/w_400,h_400,q_90,enc_avif,quality_auto/b80b05_3cc09fce62da4a83b087e02c2df13e0b~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute bottom-[6%] left-[2%] w-[100px] lg:w-[140px] pointer-events-none opacity-60">
          <img src="https://static.wixstatic.com/media/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png/v1/fit/w_400,h_400,q_90,enc_avif,quality_auto/b80b05_2305bdcff38f45baa939ff183c6ae499~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute top-[6%] right-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-60">
          <img src="https://static.wixstatic.com/media/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png/v1/fit/w_400,h_400,q_90,enc_avif,quality_auto/b80b05_d701bdcad664423c8ca381b760b91c56~mv2.png" alt="" className="w-full rounded-2xl" />
        </div>
        <div className="hidden md:block absolute bottom-[6%] right-[2%] w-[120px] lg:w-[160px] pointer-events-none opacity-60">
          <img src="https://static.wixstatic.com/media/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg/v1/fit/w_400,h_400,q_90,enc_avif,quality_auto/b80b05_9d859e430f874acdb67af939ed2e5a36~mv2.jpg" alt="" className="w-full rounded-2xl" />
        </div>

        {/* Center content — z-10 so it always sits above the corner images */}
        <div className="relative z-10 flex flex-col items-center gap-10 sm:gap-14 md:gap-16 max-w-[600px] w-full">
          <FadeIn delay={0} y={40}>
            <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
              About Me
            </h2>
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

      {/* ═══════ 4. SERVICES ═══════ */}
      <section className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <FadeIn delay={0} y={30}>
          <h2 className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)', color: '#0c0c0c' }}>
            Services
          </h2>
        </FadeIn>
        <div className="max-w-5xl mx-auto">
          {SERVICES.map((svc, i) => (
            <FadeIn key={svc.num} delay={i * 0.1} y={20}>
              <div className="flex items-start gap-4 sm:gap-6 md:gap-8 py-8 sm:py-10 md:py-12"
                style={{ borderTop: i === 0 ? '1px solid rgba(12,12,12,0.15)' : undefined, borderBottom: '1px solid rgba(12,12,12,0.15)' }}>
                <span className="font-black leading-none flex-shrink-0" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', color: '#0c0c0c' }}>{svc.num}</span>
                <div className="pt-2">
                  <h3 className="font-medium uppercase mb-3" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)', color: '#0c0c0c' }}>{svc.name}</h3>
                  <p className="font-light leading-relaxed max-w-2xl" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)', color: '#0c0c0c', opacity: 0.6 }}>{svc.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════ 5. PROJECTS — single image + description cards ═══════ */}
      <section className="-mt-10 sm:-mt-12 md:-mt-14 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 pt-20 pb-32" style={{ background: '#0c0c0c' }}>
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-4" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            Projects
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <div className="text-center mb-16">
            <Link to="/portfolio" className="text-[#D7E2EA] uppercase tracking-widest text-sm font-medium hover:opacity-70 transition-opacity">
              Full Portfolio →
            </Link>
          </div>
        </FadeIn>

        <div className="max-w-5xl mx-auto flex flex-col gap-6">
          {FEATURED_PROJECTS.map((project, i) => (
            <FadeIn key={project.num} delay={i * 0.15} y={30}>
              <div className="rounded-[40px] sm:rounded-[50px] border-2 border-[#D7E2EA]/30 overflow-hidden"
                style={{ background: '#111' }}>
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="md:w-1/2 flex-shrink-0">
                    <img src={project.image} alt={project.title} className="w-full h-[280px] md:h-full object-cover" style={{ minHeight: '320px' }} />
                  </div>
                  {/* Content */}
                  <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-between gap-6">
                    <div>
                      <div className="flex items-start justify-between gap-4 mb-6">
                        <span className="hero-heading font-black leading-none" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}>
                          {project.num}
                        </span>
                        <span className="text-[#D7E2EA] text-xs uppercase tracking-widest mt-2" style={{ opacity: 0.5 }}>
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-[#D7E2EA] font-black uppercase mb-4 leading-tight" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)' }}>
                        {project.title}
                      </h3>
                      <p className="text-[#D7E2EA] font-light leading-relaxed" style={{ opacity: 0.65, fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)' }}>
                        {project.description}
                      </p>
                    </div>
                    <div>
                      {project.url ? (
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                          className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
                          Live Project
                        </a>
                      ) : (
                        <Link to={`/portfolio/${project.slug}`}
                          className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest hover:bg-[#D7E2EA]/10 transition-colors">
                          View Project
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ═══════ TESTIMONIALS ═══════ */}
      <section className="bg-white px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32">
        <FadeIn delay={0} y={30}>
          <h2 className="font-black uppercase text-center mb-16 sm:mb-20" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)', color: '#0c0c0c' }}>
            What Clients Say
          </h2>
        </FadeIn>
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div key={activeTestimonial} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.45 }} className="text-center">
              <p className="font-light leading-relaxed mb-8" style={{ fontSize: 'clamp(1rem, 2vw, 1.4rem)', color: '#0c0c0c', opacity: 0.8 }}>
                &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
              </p>
              <p className="font-medium uppercase tracking-wide" style={{ color: '#0c0c0c', fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)' }}>{TESTIMONIALS[activeTestimonial].name}</p>
              <p style={{ color: '#0c0c0c', opacity: 0.45, fontSize: '0.85rem' }}>{TESTIMONIALS[activeTestimonial].company}</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center gap-3 mt-10">
            {TESTIMONIALS.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} className="rounded-full transition-all duration-300"
                style={{ width: i === activeTestimonial ? '28px' : '8px', height: '8px', background: i === activeTestimonial ? '#0c0c0c' : 'rgba(12,12,12,0.25)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="-mt-10 z-10 relative rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32" style={{ background: '#0c0c0c' }}>
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-4" style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}>
            Let&apos;s Make Waves
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} y={0}>
          <p className="text-[#D7E2EA] text-center font-light uppercase tracking-wide mb-12" style={{ opacity: 0.45, fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}>
            Ready to collaborate? Let&apos;s create something epic together.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20}><ContactForm /></FadeIn>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer className="px-5 sm:px-8 md:px-10 py-10 border-t" style={{ background: '#0c0c0c', borderColor: 'rgba(215,226,234,0.08)' }}>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-5">
          <p className="text-[#D7E2EA] font-light text-sm" style={{ opacity: 0.35 }}>© 2026 Xan Orchid. All rights reserved.</p>
          <div className="flex gap-8">
            <Link to="/portfolio" className="text-[#D7E2EA] text-sm uppercase tracking-wider font-medium hover:opacity-70 transition-opacity">Portfolio</Link>
            <Link to="/about" className="text-[#D7E2EA] text-sm uppercase tracking-wider font-medium hover:opacity-70 transition-opacity">About</Link>
          </div>
          <div className="flex gap-5">
            {[{ label: 'Instagram', href: 'https://www.instagram.com/graphix.xan' }, { label: 'LinkedIn', href: 'https://www.linkedin.com/in/xan-orchid/' }, { label: 'Upwork', href: 'https://www.upwork.com/freelancers/~01b1742c39720ba911' }].map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="text-[#D7E2EA] text-sm hover:opacity-70 transition-opacity" style={{ opacity: 0.5 }}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
