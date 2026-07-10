import { useCallback, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
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

const AUTO_SPEED = 36; // px / second
const RESUME_DELAY = 1100; // ms of inactivity before autoplay resumes after a manual scroll/drag
const CLICK_SUPPRESS_THRESHOLD = 6; // px of movement before a drag suppresses the underlying link click
const NUDGE_EASE = 0.16;

export default function PortfolioCarousel({ projects }: { projects: Project[] }) {
  const reducedMotion = usePrefersReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const offsetRef = useRef(0);
  const setWidthRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const hoverPausedRef = useRef(false);
  const draggingRef = useRef(false);
  const dragPointerIdRef = useRef<number | null>(null);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const suppressClickRef = useRef(false);
  const interactingUntilRef = useRef(0);

  const nudgeActiveRef = useRef(false);
  const nudgeTargetRef = useRef(0);

  // Fewer items need more duplication so the loop still reads as continuous.
  const loopCount = projects.length > 0 && projects.length < 6 ? 3 : 2;
  const loopKey = projects.map((p) => p.slug).join('|');

  const items = Array.from({ length: loopCount }).flatMap((_, setIndex) =>
    projects.map((project, i) => ({ project, key: `${project.slug}-${setIndex}-${i}` }))
  );

  const applyTransform = useCallback(() => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${offsetRef.current}px,0,0)`;
    }
  }, []);

  const wrapOffset = useCallback(() => {
    const w = setWidthRef.current;
    if (!w) return;
    while (offsetRef.current <= -w) offsetRef.current += w;
    while (offsetRef.current > 0) offsetRef.current -= w;
  }, []);

  const markInteracting = useCallback(() => {
    interactingUntilRef.current = performance.now() + RESUME_DELAY;
  }, []);

  // Measure one full set's width whenever the item list changes or the window resizes.
  useEffect(() => {
    const measure = () => {
      if (trackRef.current && projects.length > 0) {
        setWidthRef.current = trackRef.current.scrollWidth / loopCount;
      }
    };
    measure();
    offsetRef.current = 0;
    applyTransform();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loopKey, loopCount, applyTransform]);

  // Main animation loop: autoplay, hover-pause, and arrow-nudge easing all live here.
  useEffect(() => {
    if (projects.length === 0) return;
    const step = (t: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const dt = (t - lastTimeRef.current) / 1000;
      lastTimeRef.current = t;

      if (draggingRef.current) {
        // position is driven directly by the pointermove handler
      } else if (nudgeActiveRef.current) {
        const diff = nudgeTargetRef.current - offsetRef.current;
        if (Math.abs(diff) < 0.5) {
          offsetRef.current = nudgeTargetRef.current;
          nudgeActiveRef.current = false;
        } else {
          offsetRef.current += diff * NUDGE_EASE;
        }
        wrapOffset();
        applyTransform();
      } else if (
        !reducedMotion &&
        !hoverPausedRef.current &&
        performance.now() > interactingUntilRef.current
      ) {
        offsetRef.current -= AUTO_SPEED * dt;
        wrapOffset();
        applyTransform();
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = null;
    };
  }, [reducedMotion, projects.length, applyTransform, wrapOffset]);

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
    dragPointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    dragDistanceRef.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current || dragPointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(dx));
    if (dragDistanceRef.current > CLICK_SUPPRESS_THRESHOLD) suppressClickRef.current = true;
    offsetRef.current = dragStartOffsetRef.current + dx;
    wrapOffset();
    applyTransform();
  };

  const endDrag = (e: React.PointerEvent) => {
    if (dragPointerIdRef.current !== e.pointerId) return;
    draggingRef.current = false;
    dragPointerIdRef.current = null;
    markInteracting();
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
    // Let the click-suppression flag survive just long enough to catch the
    // synthetic click that fires right after pointerup on the same element.
    if (suppressClickRef.current) {
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
  };

  const onWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
    if (delta === 0) return;
    e.preventDefault();
    nudgeActiveRef.current = false;
    offsetRef.current -= delta;
    wrapOffset();
    applyTransform();
    markInteracting();
  };

  const nudge = (direction: 1 | -1) => {
    const amount = (containerRef.current?.clientWidth ?? 600) * 0.7;
    nudgeTargetRef.current = offsetRef.current - direction * amount;
    nudgeActiveRef.current = true;
    markInteracting();
  };

  const onClickCapture = (e: React.MouseEvent) => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (projects.length === 0) return null;

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="Portfolio carousel"
      className="group relative overflow-hidden"
      style={{ cursor: 'grab', touchAction: 'pan-y' }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onWheel={onWheel}
      onClickCapture={onClickCapture}
    >
      <div
        ref={trackRef}
        className="flex gap-4 sm:gap-5 select-none will-change-transform"
        style={{ width: 'max-content' }}
      >
        {items.map(({ project, key }) => (
          <CarouselCard key={key} project={project} />
        ))}
      </div>

      {/* edge fades so cards don't feel like they're cut off mid-scroll */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-16 z-10"
        style={{ background: 'linear-gradient(90deg, #0c0c0c, transparent)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-16 z-10"
        style={{ background: 'linear-gradient(270deg, #0c0c0c, transparent)' }}
      />

      <button
        type="button"
        aria-label="Scroll portfolio left"
        onClick={() => nudge(-1)}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(12,12,12,0.6)', border: '1px solid rgba(215,226,234,0.25)', backdropFilter: 'blur(4px)' }}
      >
        <ArrowIcon direction="left" />
      </button>
      <button
        type="button"
        aria-label="Scroll portfolio right"
        onClick={() => nudge(1)}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-10 h-10 rounded-full opacity-60 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'rgba(12,12,12,0.6)', border: '1px solid rgba(215,226,234,0.25)', backdropFilter: 'blur(4px)' }}
      >
        <ArrowIcon direction="right" />
      </button>
    </div>
  );
}

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}>
      <path d="M9 6l6 6-6 6" stroke="#D7E2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarouselCard({ project }: { project: Project }) {
  const imgSrc = project.slug === 'xanadu' ? xanaduHero : (IMAGE_MAP[project.slug] || project.coverImg);
  const videoSrc = VIDEO_MAP[project.slug];
  const directHref = project.externalUrl || project.socials?.instagram;

  const media = (
    <div
      className="overflow-hidden rounded-2xl relative w-[220px] sm:w-[260px] md:w-[300px]"
      style={{ aspectRatio: '1', background: 'rgba(255,255,255,0.03)' }}
    >
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
        />
      ) : imgSrc ? (
        <img
          src={imgSrc}
          alt={project.title}
          draggable={false}
          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105 pointer-events-none"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-[#D7E2EA] text-xs uppercase tracking-widest" style={{ opacity: 0.3 }}>{project.title}</p>
        </div>
      )}
      <div className="absolute inset-0 flex items-end p-5 transition-all duration-300 bg-black/0 group-hover/card:bg-black/50">
        <div className="translate-y-3 opacity-0 transition-all duration-300 group-hover/card:translate-y-0 group-hover/card:opacity-100">
          <p className="text-white text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.7 }}>{project.category}</p>
          <h3 className="text-white font-black uppercase text-sm sm:text-base leading-tight">{project.title}</h3>
        </div>
      </div>
    </div>
  );

  const caption = (
    <div className="mt-3 px-1 w-[220px] sm:w-[260px] md:w-[300px]">
      <p className="text-[#D7E2EA] text-xs uppercase tracking-widest mb-1" style={{ opacity: 0.4 }}>{project.category}</p>
      <h3 className="text-[#D7E2EA] font-medium uppercase text-sm">{project.title}</h3>
    </div>
  );

  const content = (
    <>
      {media}
      {caption}
    </>
  );

  if (project.directLink && directHref) {
    return (
      <a
        href={directHref}
        target="_blank"
        rel="noopener noreferrer"
        draggable={false}
        className="block group/card shrink-0"
      >
        {content}
      </a>
    );
  }
  return (
    <Link to={`/portfolio/${project.slug}`} draggable={false} className="block group/card shrink-0">
      {content}
    </Link>
  );
}
