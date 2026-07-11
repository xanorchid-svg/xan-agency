import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const AUTO_SPEED = 9; // degrees / second, autoplay
const RESUME_DELAY = 1100; // ms of inactivity before autoplay resumes after a drag/wheel/arrow nudge
const DRAG_THRESHOLD = 8; // px of movement before a press is treated as a drag rather than a click
const NUDGE_EASE = 0.16;
const PACKING = 0.62; // lower = more gap between neighboring slides
const HEADROOM = 1.3; // leaves room so the enlarged front card doesn't collide with its neighbors
const FRONT_SCALE = 1.7; // how much bigger the centered card renders vs. the base size
const TILT_DEG = 22; // tips the ring's path into a visible arc instead of a flat line
const TILT_RAD = (TILT_DEG * Math.PI) / 180;
function cardBounds(viewportWidth: number) {
  if (viewportWidth < 640) return { min: 110, max: 480 };
  if (viewportWidth < 1024) return { min: 160, max: 700 };
  return { min: 200, max: 950 };
}
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
  const navigate = useNavigate();
  const N = projects.length;
  // Spacing and size both adapt to however many projects are actually in
  // view, so N tiles are always spread evenly around the *whole* loop --
  // equal gap between every neighboring pair, including the last one back
  // to the first. A fixed slot count (tried previously) left most of the
  // ring empty for sparse tag filters, which read as tiles "disappearing".
  const spacingCount = N;

  const stageRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);

  const rotationRef = useRef(0);
  const draggingRef = useRef(false);
  const pausedRef = useRef(false);
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

  const [geometry, setGeometry] = useState({ radius: 0, cardSize: 132, perspective: 1600 });
  const [frontIndex, setFrontIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);

  const anglePerCard = spacingCount > 0 ? 360 / spacingCount : 0;
  const loopKey = projects.map((p) => p.slug).join('|');

  const markInteracting = useCallback(() => {
    interactingUntilRef.current = performance.now() + RESUME_DELAY;
  }, []);

  const togglePaused = useCallback(() => {
    pausedRef.current = !pausedRef.current;
    setPaused(pausedRef.current);
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
      // Two independent constraints: the ring's X-spread must fit the width,
      // and its tilted vertical arc (2 * radius * sin(TILT)) must fit the
      // height. Whichever is tighter wins.
      const radiusByWidth = 0.5 * w;
      const radiusByHeight = (0.72 * h) / (2 * Math.sin(TILT_RAD));
      const fitRadius = Math.min(radiusByWidth, radiusByHeight);
      // Sized off spacingCount (the full, unfiltered total when provided) so
      // every tag filter renders cards at the same scale as "All" -- a
      // sparse filter just leaves most of the ring's slots empty rather than
      // stretching its few cards bigger to fill the circle.
      const rawCard = (2 * fitRadius * Math.sin(Math.PI / Math.max(spacingCount, 3)) * PACKING) / HEADROOM;
      const { min, max } = cardBounds(window.innerWidth);
      const cardSize = Math.max(min, Math.min(max, rawCard));
      const perspective = Math.max(1300, fitRadius * 3.2);
      setGeometry({ radius: fitRadius, cardSize, perspective });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (stageRef.current) ro.observe(stageRef.current);
    return () => ro.disconnect();
  }, [spacingCount, loopKey]);

  // Reset to a clean, centered state whenever the filtered project set changes.
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, N);
    rotationRef.current = 0;
    frontIndexRef.current = 0;
    setFrontIndex(0);
    setPreviewIndex(null);
  }, [loopKey, N]);

  const applyFrame = useCallback(() => {
    // Rotation is baked into each card's own X/Z position below (via `eff`),
    // so the ring wrapper itself stays untransformed -- it only exists to
    // hold the shared 3D (preserve-3d) context.
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
      // Cards stay billboarded (always facing the camera) and travel along a
      // circle that's tilted in 3D (position only, never rotated) -- reads
      // as parallel slides riding a curved, visibly arcing rail rather than
      // fan blades or a flat line, and never needs backface culling.
      const t = Math.min(1, abs / 100);
      const rad = (eff * Math.PI) / 180;
      const x = geometry.radius * Math.sin(rad);
      const y = -geometry.radius * Math.sin(TILT_RAD) * (Math.cos(rad) - 1);
      const z = geometry.radius * Math.cos(TILT_RAD) * (Math.cos(rad) - 1);
      const scale = FRONT_SCALE - t * (FRONT_SCALE - 0.55);
      const opacity = abs > 100 ? 0 : 1 - t * 0.8;
      const blur = t * 5;
      const brightness = 1 - t * 0.5;
      el.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(${z}px) scale(${scale})`;
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

  // The single animation loop: autoplay drift, manual pause, drag override,
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
        !pausedRef.current &&
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

  // Native (non-passive) wheel listener -- React's synthetic onWheel is
  // attached passively by default, which silently blocks preventDefault().
  // We only intercept when the gesture is clearly horizontal (trackpad swipe
  // or shift+wheel); a normal vertical scroll passes straight through so the
  // page keeps scrolling instead of getting stuck under the carousel.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      nudgeActiveRef.current = false;
      rotationRef.current -= e.deltaX * WHEEL_SENSITIVITY;
      markInteracting();
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [markInteracting]);

  // Drag vs. click is decided lazily: a press only becomes a "drag" once the
  // pointer has actually moved past DRAG_THRESHOLD. Until then it's treated
  // as a pending click, so ordinary hand jitter during a tap never rotates
  // the ring or swallows the navigation click.
  //
  // Pointer capture is deferred too, and that part matters even more: most
  // browsers redirect the eventual "click" event's target to the capturing
  // element once setPointerCapture has been called on a pointer, regardless
  // of where the cursor actually is at release. Capturing immediately on
  // pointerdown (the previous behavior) meant *every* click's target got
  // rewritten to the stage div itself -- the click never actually reached
  // the project link's DOM node, so navigation silently never fired. Only
  // capturing once we've confirmed a real drag avoids that entirely for
  // ordinary clicks.
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    pointerIdRef.current = e.pointerId;
    dragStartXRef.current = e.clientX;
    dragStartRotationRef.current = rotationRef.current;
    dragDistanceRef.current = 0;
    draggingRef.current = false;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const dx = e.clientX - dragStartXRef.current;
    dragDistanceRef.current = Math.max(dragDistanceRef.current, Math.abs(dx));
    if (!draggingRef.current && dragDistanceRef.current > DRAG_THRESHOLD) {
      draggingRef.current = true;
      suppressClickRef.current = true;
      nudgeActiveRef.current = false;
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
      if (stageRef.current) stageRef.current.style.cursor = 'grabbing';
    }
    if (draggingRef.current) {
      rotationRef.current = dragStartRotationRef.current + dx * DRAG_SENSITIVITY;
    }
  };

  const endDrag = (e: React.PointerEvent) => {
    if (pointerIdRef.current !== e.pointerId) return;
    const wasDragging = draggingRef.current;
    draggingRef.current = false;
    pointerIdRef.current = null;
    if (wasDragging) {
      markInteracting();
      if (stageRef.current) stageRef.current.style.cursor = 'grab';
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // already released / never captured -- fine to ignore
      }
    }
    if (suppressClickRef.current) {
      setTimeout(() => {
        suppressClickRef.current = false;
      }, 0);
    }
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

  // Belt-and-suspenders navigation: normally the click bubbles through to
  // the card's own <a>/<Link> and that handles it. But this stage is a deep
  // stack of absolutely-positioned, individually 3D-transformed siblings
  // (perspective + preserve-3d + per-card translateX/Y/Z + scale), and in
  // that setup a click's hit-tested target can resolve somewhere other than
  // the anchor even when the cursor is visibly over a card. previewIndex is
  // updated by simple pointerenter/leave on each card wrapper -- a much more
  // reliable signal here -- so if the native click missed the link, we still
  // know exactly which project was under the cursor and can navigate to it
  // directly instead of the click silently doing nothing.
  const onStageClick = (e: React.MouseEvent) => {
    if (suppressClickRef.current) return; // a real drag just ended, not a click
    if ((e.target as HTMLElement).closest('a')) return; // native link click already handled it
    if (previewIndex == null) return; // click missed every card
    const project = projects[previewIndex];
    if (!project) return;
    const directHref = project.externalUrl || project.socials?.instagram;
    if (project.directLink && directHref) {
      window.open(directHref, '_blank', 'noopener,noreferrer');
    } else {
      navigate(`/portfolio/${project.slug}`);
    }
  };

  if (N === 0) return null;

  const activeProject = projects[previewIndex ?? frontIndex];
  const activeGlobalIndex = previewIndex ?? frontIndex;

  return (
    <div
      className="relative flex flex-col w-full h-[74vh] min-h-[560px] sm:h-[82vh] sm:min-h-[640px] md:h-[88vh] md:min-h-[720px] max-h-[1150px] max-w-[2100px] mx-auto"
    >
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
            width: '75%',
            height: '75%',
            borderRadius: '9999px',
            filter: 'blur(110px)',
            background: `conic-gradient(from 0deg, ${PALETTE.join(', ')}, ${PALETTE[0]})`,
            opacity: 0.35,
            animation: reducedMotion ? undefined : 'portfolio-glow-spin 40s linear infinite',
          }}
        />
      </div>

      {/* Ring area takes whatever height is left after the label below --
          both live inside one fixed-height box so nothing ever falls out
          of view and the title never overlaps the cards. */}
      <div
        ref={stageRef}
        role="region"
        aria-label="Portfolio, arranged as a rotating carousel"
        tabIndex={0}
        className="relative flex-1 min-h-0 w-full outline-none"
        style={{ perspective: geometry.perspective, cursor: 'grab', touchAction: 'pan-y' }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        onClickCapture={onClickCapture}
        onClick={onStageClick}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
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

      {/* Synced title, index counter, and nav arrows -- fixed natural height,
          always inside the same viewport-bounded box as the ring above. */}
      <div className="shrink-0 pt-4 sm:pt-6 pb-2 flex flex-col items-center gap-4">
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-center px-4"
            >
              <p className="text-[#D7E2EA] text-xs sm:text-sm uppercase tracking-widest mb-1" style={{ opacity: 0.45 }}>
                {String(activeGlobalIndex + 1).padStart(2, '0')} / {String(N).padStart(2, '0')} — {activeProject.category}
              </p>
              <ActiveTitleLink project={activeProject} />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-4">
          <NavButton direction="left" onClick={goPrev} />
          <PlayPauseButton paused={paused} onClick={togglePaused} />
          <NavButton direction="right" onClick={goNext} />
        </div>
      </div>
    </div>
  );
}

function PlayPauseButton({ paused, onClick }: { paused: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={paused ? 'Resume rotation' : 'Pause rotation'}
      onClick={onClick}
      className="flex items-center justify-center w-11 h-11 rounded-full transition-all duration-200 hover:scale-110"
      style={{ background: 'rgba(215,226,234,0.06)', border: '1px solid rgba(215,226,234,0.25)' }}
    >
      {paused ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#D7E2EA"><path d="M8 5v14l11-7z" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#D7E2EA"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
      )}
    </button>
  );
}

function ActiveTitleLink({ project }: { project: Project }) {
  const directHref = project.externalUrl || project.socials?.instagram;
  const titleEl = (
    <h3 className="hero-heading font-black uppercase tracking-tight text-2xl sm:text-3xl md:text-4xl leading-none">
      {project.title}
    </h3>
  );
  const className = 'inline-block transition-opacity duration-200 hover:opacity-70';
  if (project.directLink && directHref) {
    return (
      <a href={directHref} target="_blank" rel="noopener noreferrer" className={className}>
        {titleEl}
      </a>
    );
  }
  return (
    <Link to={`/portfolio/${project.slug}`} className={className}>
      {titleEl}
    </Link>
  );
}

function NavButton({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous project' : 'Next project'}
      onClick={onClick}
      className="flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 hover:scale-110"
      style={{ background: 'rgba(215,226,234,0.06)', border: '1px solid rgba(215,226,234,0.25)' }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" style={{ transform: direction === 'left' ? 'rotate(180deg)' : undefined }}>
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
