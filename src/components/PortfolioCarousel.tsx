import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '../projects';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';
import xanaduHero from '../assets/xanadu-hero.png';
import wildchildVideo from '../assets/wildchild.mp4';
import powerbagelsVideo from '../assets/powerbagels.mp4';
import perfeqtionCover from '../assets/perfeqtion-cover.png';

const VIDEO_MAP: Record<string, string> = {
  'dandelion-wild-school': wildchildVideo,
  'power-bagels': powerbagelsVideo,
};

const IMAGE_MAP: Record<string, string> = {
  'perfeqtion-imaging': perfeqtionCover,
};

// Orchid palette, matching the homepage's procedural flower background.
const PALETTE = ['#3b6bff', '#4f3bff', '#8b3bff', '#c93bff', '#ff6ec7'];

const TILT_DEG = 24;
const AUTO_SPEED = 9; // degrees / second, autoplay
const RESUME_DELAY = 1100; // ms of inactivity before autoplay resumes
const CLICK_SUPPRESS_THRESHOLD = 6; // px of drag movement before we swallow the click
const NUDGE_EASE = 0.16;
const MIN_CARD = 74;
const MAX_CARD = 220;
const DRAG_SENSITIVITY = 0.32; // degrees of rotation per px of drag
const WHEEL_SENSITIVITY = 0.18;

function normalizeAngle(a: number) {
  let x = a % 360;
  if (x > 180) x -= 360;
  if (x < -180) x += 360;
  return x;
}

export default function PortfolioCarousel({ projects }: { projects: Project[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const N = projects.length;

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const hoverPausedRef = useRef(false);
  const pointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartRotationRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const interactingUntilRef = useRef(0);
  const nudgeActiveRef = useRef(false);
  const nudgeTargetRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const frontIndexRef = useRef(0);

  const [geometry, setGeometry] = useState({ radius: 0, cardSize: MIN_CARD });
  const [frontIndex, setFrontIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  const anglePerCard = N > 0 ? 360 / N : 0;
  const loopKey = projects.map((p) => p.slug).join('|');

  const markInteracting = useCallback(() => {
    interactingUntilRef.current = performance.now() + RESUME_DELAY;
  }, []);

  // Fit the ring's radius to whatever space the stage actually has, then size
  // cards so N of them can sit evenly around that circle without the whole
  // thing spilling out of view -- more projects = a fuller, denser bloom.
  useEffect(() => {
    if (N === 0) return;
    const measure = () => {
      const el = stageRef.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const fitRadius = 0.42 * Math.min(w, h / Math.cos((TILT_DEG * Math.PI) / 180));
      const rawCard = 2 * fitRadius * Math.sin(Math.PI / Math.max(N, 3)) * 0.72;
      const cardSize = Math.max(MIN_CARD, Math.min(MAX_CARD, rawCard));
      setGeometry({ radius: fitRadius, cardSize });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [N, loopKey]);

  // Reset to a clean, centered state whenever the filtered project set changes.
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, N);
    rotationRef.current = 0;
    frontIndexRef.current = 0;
    setFrontIndex(0);
    setPreviewIndex(null);
  }, [loopKey, N]);

  const applyFrame = useCallback(() => {
    if (ringRef.current) {
      ringRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
    }
    let bestIdx = 0;
    let bestAbs = 999;
    for (let i = 0; i < N; i++) {
      const el = cardRefs.current[i];
      const eff = normalizeAngle(i * anglePerCard + rotationRef.current);
      const abs = Math.abs(eff);
      if (abs < bestAbs) {
        bestAbs = abs;
        bestIdx = i;
      }
      if (!el) continue;
      const t = Math.min(1, abs / 100);
      const scale = 1.16 - t * 0.4;
      const opacity = abs > 100 ? 0 : 1 - t * 0.8;
      const blur = t * 5;
      const brightness = 1 - t * 0.55;
      el.style.transform = `rotateY(${i * anglePerCard}deg) translateZ(${geometry.radius}px) scale(${scale})`;
      el.style.opacity = String(opacity);
      el.style.filter = `blur(${blur}px) brightness(${brightness})`;
      el.style.zIndex = String(Math.round(1000 - abs));
      el.style.pointerEvents = abs > 100 ? 'none' : 'auto';
    }
    if (bestIdx !== frontIndexRef.current) {
      frontIndexRef.current = bestIdx;
      setFrontIndex(bestIdx);
    }
  }, [N, anglePerCard, geometry.radius]);

  // The single animation loop: autoplay drift, hover-pause, drag override,
  // and eased arrow-key/button nudges all resolve into one rotation value.
  useEffect(() => {
    if (N === 0) return;
    const step = (t: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      if (draggingRef.current) {
        // position driven directly by pointermove
      } else if (nudgeActiveRef.current) {
        const diff = nudgeTargetRef.current - rotationRef.current;
        if (Math.abs(diff) < 0.15) {
          rotationRef.current = nudgeTargetRef.current;
          nudgeActiveRef.current = false;
        } else {
          rotationRef.current += diff * NUDGE_EASE;
        }
      } else if (
        !reducedMotion &&
        !hoverPausedRef.current &&
        performance.now() > interactingUntilRef.current
      ) {
        rotationRef.current += AUTO_SPEED * dt;
      }
      applyFrame();
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [reducedMotion, N, applyFrame]);

  const onPointerEnter = () => {
    hoverPausedRef.current = true;
  };
  const onPointerLeave = () => {
    hoverPausedRef.current = false;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    draggingRef.current = true;
    nudgeActiveRef.current = false;
    pointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartRotationRef.current = rotationRef.current;
    dragDistanceRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (stageRef.current) stageRef.current.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(dx));
    if (dragDistanceRef.current > CLICK_SUPPRESS_THRESHOLD) suppressClickRef.current = true;
    rotationRef.current = dragStartRotationRef.current + dx * DRAG_SENSITIVITY;
  };

  const endDrag = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    draggingRef.current = false;
    pointerIdRef.current = null;
    markInteracting();
    if (stageRef.current) stageRef.current.style.cursor = 'grab';
    if (suppressClickRef.current) {
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (!delta) return;
    e.preventDefault();
    nudgeActiveRef.current = false;
    rotationRef.current -= delta * WHEEL_SENSITIVITY;
    markInteracting();
  };

  const goNext = () => {
    nudgeTargetRef.current = rotationRef.current - anglePerCard;
    nudgeActiveRef.current = true;
    markInteracting();
  };
  const goPrev = () => {
    nudgeTargetRef.current = rotationRef.current + anglePerCard;
    nudgeActiveRef.current = true;
    markInteracting();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goPrev();
    }
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (N === 0) return null;

  const activeProject = projects[previewIndex ?? frontIndex];
  const activeGlobalIndex = previewIndex ?? frontIndex;

  return (
    <div className="relative">
      {!reducedMotion && (
        <style>{`
          @keyframes portfolio-glow-spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      )}
      {/* Ambient bloom, echoing the homepage orchid's palette */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center" style={{ opacity: 0.5 }}>
        <div
          style={{
            width: '70%',
            height: '70%',
            borderRadius: '9999px',
            filter: 'blur(70px)',
            background: `conic-gradient(from 0deg, ${PALETTE.join(', ')}, ${PALETTE[0]})`,
            opacity: 0.35,
            animation: reducedMotion ? undefined : 'portfolio-glow-spin 40s linear infinite',
          }}
        />
      </div>

      <div
        ref={stageRef}
        role="region"
        aria-label="Portfolio, arranged as a rotating carousel"
        tabIndex={0}
        className="relative h-[360px] sm:h-[440px] md:h-[520px] lg:h-[580px] max-w-4xl mx-auto outline-none"
        style={{ perspective: 1400, cursor: 'grab', touchAction: 'pan-y' }}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onWheel={onWheel}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d', transform: `rotateX(${TILT_DEG}deg)` }}
        >
          <div
            ref={ringRef}
            className="relative"
            style={{ transformStyle: 'preserve-3d', width: 0, height: 0 }}
          >
            {projects.map((project, i) => (
              <CarouselCard
                key={project.slug}
                project={project}
                cardSize={geometry.cardSize}
                setRef={(el) => {
                  cardRefs.current[i] = el;
                }}
                onHover={(hovering) => setPreviewIndex(hovering ? i : null)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Synced title, index counter, and nav arrows */}
      <div className="mt-8 sm:mt-10 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4"
            >
              <p className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.45 }}>
                {String(activeGlobalIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} — {activeProject.category}
              </p>
              <h3 className="hero-heading font-black uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl">
                {activeProject.title}
              </h3>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <NavButton direction="left" onClick={goPrev} />
          <NavButton direction="right" onClick={goNext} />
        </div>
      </div>
    </div>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
      onClick={onClick}
      className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110"
      style={{ background: 'rgba(215,226,234,0.06)', border: '1px solid rgba(215,226,234,0.25)' }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}>
        <path d="M9 6l6 6-6 6" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}

function CarouselCard({
  project,
  cardSize,
  setRef,
  onHover,
}: {
  project: Project;
  cardSize: number;
  setRef: (el: HTMLDivElement | null) => void;
  onHover: (hovering: boolean) => void;
}) {
  const imgSrc = project.slug === 'xanadu' ? xanaduHero : (IMAGE_MAP[project.slug] || project.coverImg);
  const videoSrc = VIDEO_MAP[project.slug];
  const directHref = project.externalUrl || project.socials?.instagram;

  const media = (
    <div
      className="w-full h-full overflow-hidden rounded-2xl relative"
      style={{ background: 'rgba(255,255,255,0.03)', boxShadow: '0 12px 40px rgba(0,0,0,0.5)' }}
    >
      {videoSrc ? (
        <video src={videoSrc} autoPlay muted loop playsInline draggable={false} className="w-full h-full object-cover pointer-events-none" />
      ) : imgSrc ? (
        <img src={imgSrc} alt={project.title} draggable={false} className="w-full h-full object-cover pointer-events-none" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.3 }}>{project.title}</p>
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={setRef}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      className="absolute top-1/2 left-1/2"
      style={{
        width: cardSize,
        height: cardSize,
        marginLeft: -cardSize / 2,
        marginTop: -cardSize / 2,
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        willChange: 'transform, opacity, filter',
      }}
    >
      {project.directLink && directHref ? (
        <a href={directHref} target="_blank" rel="noopener noreferrer" draggable={false} className="block w-full h-full">
          {media}
        </a>
      ) : (
        <Link to={`/portfolio/${project.slug}`} draggable={false} className="block w-full h-full">
          {media}
        </Link>
      )}
    </div>
  );
}
