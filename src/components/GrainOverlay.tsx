// Animated film grain overlay. Self-contained (scoped <style>), no global CSS needed.
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 60, opacity: 0.045, mixBlendMode: 'overlay' }}>
      <style>{`
        @keyframes grainShift {
          0%, 100% { transform: translate(0,0); }
          10% { transform: translate(-2%,-4%); }
          20% { transform: translate(-6%,2%); }
          30% { transform: translate(2%,-6%); }
          40% { transform: translate(-2%,4%); }
          50% { transform: translate(-4%,2%); }
          60% { transform: translate(4%,0); }
          70% { transform: translate(0,4%); }
          80% { transform: translate(-4%,0); }
          90% { transform: translate(4%,4%); }
        }
        .grain-layer { animation: grainShift 1.1s steps(6) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .grain-layer { animation: none; }
        }
      `}</style>
      <svg className="grain-layer" style={{ width: '200%', height: '200%' }} xmlns="http://www.w3.org/2000/svg">
        <filter id="grainFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grainFilter)" />
      </svg>
    </div>
  );
}
