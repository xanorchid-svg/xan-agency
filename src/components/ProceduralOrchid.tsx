import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { type MotionValue } from 'framer-motion';
import * as THREE from 'three';

/**
 * Procedural orchid background. Nothing here is an image or video -- every
 * shape is generated at runtime from the Gielis superformula (the standard
 * parametric equation used for procedurally generating flower/leaf silhouettes),
 * layered into many thin glowing line loops, lit by real bloom postprocessing.
 *
 * `dissolve` is an optional Framer Motion value (0-1, driven by scroll from
 * the parent component) read once per frame inside useFrame -- this avoids
 * triggering a React re-render on every scroll pixel while still staying
 * perfectly in sync with scroll position.
 *
 * Two places use this:
 *  - variant="hero": full symmetrical bloom, pulsing, dissolves into sacred-
 *    geometry rings as `dissolve` increases while scrolling away from hero.
 *  - variant="about": calmer, fuller-bloom resting state, no dissolve.
 */

type Dissolve = MotionValue<number> | undefined;
function readDissolve(d: Dissolve) {
  return d ? d.get() : 0;
}

const PALETTE = ['#3b6bff', '#4f3bff', '#8b3bff', '#c93bff', '#ff6ec7'];

function paletteColor(t: number) {
  const clamped = Math.max(0, Math.min(1, t));
  const scaled = clamped * (PALETTE.length - 1);
  const i = Math.floor(scaled);
  const frac = scaled - i;
  const a = new THREE.Color(PALETTE[i]);
  const b = new THREE.Color(PALETTE[Math.min(i + 1, PALETTE.length - 1)]);
  return a.clone().lerp(b, frac);
}

function superformula(theta: number, m: number, n1: number, n2: number, n3: number, a: number, b: number) {
  const t1 = Math.abs(Math.cos((m * theta) / 4) / a) ** n2;
  const t2 = Math.abs(Math.sin((m * theta) / 4) / b) ** n3;
  return Math.pow(t1 + t2, -1 / n1);
}

const SEGMENTS = 180;
const LAYERS = 34;

function OrchidPetals({ dissolve }: { dissolve: Dissolve }) {
  const group = useRef<THREE.Group>(null);
  const lines = useMemo(() => {
    return Array.from({ length: LAYERS }, (_, i) => {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array((SEGMENTS + 1) * 3);
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const color = paletteColor(i / (LAYERS - 1));
      const material = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending });
      return { geometry, material, i };
    });
  }, []);

  useFrame(({ clock }) => {
    const d = readDissolve(dissolve);
    const t = clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 0.15) * 0.05;
    const morph = Math.sin(t * 0.07) * 0.6;

    lines.forEach(({ geometry, material, i }) => {
      const layerT = i / (LAYERS - 1);
      const radius = (0.4 + layerT * 2.6) * breathe;
      const n1 = 0.3 + Math.sin(t * 0.05 + i) * 0.05;
      const params = { m: 5, n1: 0.25 + n1, n2: 1.7 + morph * 0.15, n3: 1.7 - morph * 0.1, a: 1, b: 1 };
      const pos = geometry.attributes.position.array as Float32Array;
      for (let s = 0; s <= SEGMENTS; s++) {
        const theta = (s / SEGMENTS) * Math.PI * 2;
        const r = superformula(theta + t * 0.02, params.m, params.n1, params.n2, params.n3, params.a, params.b) * radius;
        pos[s * 3] = r * Math.cos(theta);
        pos[s * 3 + 1] = r * Math.sin(theta) * 0.86; // slight vertical compression, more orchid-like
        pos[s * 3 + 2] = Math.sin(theta * 3 + t * 0.1 + i) * 0.05;
      }
      geometry.attributes.position.needsUpdate = true;
      material.opacity = 0.55 * (1 - d);
    });

    if (group.current) {
      group.current.rotation.z = Math.sin(t * 0.03) * 0.08 + d * t * 0.15;
      group.current.scale.setScalar(1 + d * 1.4);
    }
  });

  return (
    <group ref={group}>
      {lines.map(({ geometry, material, i }) => (
        <primitive key={i} object={new THREE.LineLoop(geometry, material)} />
      ))}
    </group>
  );
}

function OrchidParticles({ count = 900, dissolve }: { count?: number; dissolve: Dissolve }) {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 3.2;
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = Math.sin(angle) * r * 0.86;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.6;
      seeds[i] = Math.random() * 100;
    }
    return { positions, seeds };
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3));
    return g;
  }, [positions]);

  const material = useMemo(
    () => new THREE.PointsMaterial({ size: 0.02, color: '#ffe3f7', transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, sizeAttenuation: true }),
    []
  );

  const particleFadeAmount = (d: number) => Math.max(0, d - 0.7) / 0.3; // particles fade only in the last part of the dissolve

  useFrame(({ clock }) => {
    const d = readDissolve(dissolve);
    const t = clock.getElapsedTime();
    const pos = geometry.attributes.position.array as Float32Array;
    let lastOutward = 0;
    for (let i = 0; i < count; i++) {
      const seed = seeds[i];
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const drift = 1 + d * 1.8;
      const outward = ((t * 0.03 + seed) % 4) / 4; // 0..1 looping emission cycle
      lastOutward = outward;
      const scaleOut = 1 + outward * drift;
      pos[i * 3] = baseX * scaleOut;
      pos[i * 3 + 1] = baseY * scaleOut + Math.sin(t * 0.4 + seed) * 0.03;
      pos[i * 3 + 2] = positions[i * 3 + 2] + Math.cos(t * 0.3 + seed) * 0.05;
    }
    geometry.attributes.position.needsUpdate = true;
    material.opacity = 0.7 * (1 - particleFadeAmount(d)) * (0.5 + lastOutward * 0.5);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function SacredGeometry({ dissolve }: { dissolve: Dissolve }) {
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const geometry = new THREE.BufferGeometry();
        const segs = 128;
        const positions = new Float32Array((segs + 1) * 3);
        const radius = 0.6 + i * 0.55;
        for (let s = 0; s <= segs; s++) {
          const theta = (s / segs) * Math.PI * 2;
          positions[s * 3] = Math.cos(theta) * radius;
          positions[s * 3 + 1] = Math.sin(theta) * radius;
          positions[s * 3 + 2] = 0;
        }
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        const material = new THREE.LineBasicMaterial({ color: paletteColor(i / 4), transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
        return { geometry, material, i };
      }),
    []
  );
  const spokes = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = 16;
    const positions = new Float32Array(count * 2 * 3);
    for (let i = 0; i < count; i++) {
      const theta = (i / count) * Math.PI * 2;
      positions[i * 6] = 0;
      positions[i * 6 + 1] = 0;
      positions[i * 6 + 2] = 0;
      positions[i * 6 + 3] = Math.cos(theta) * 3.2;
      positions[i * 6 + 4] = Math.sin(theta) * 3.2;
      positions[i * 6 + 5] = 0;
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.LineBasicMaterial({ color: '#a86bff', transparent: true, opacity: 0, blending: THREE.AdditiveBlending });
    return { geometry, material };
  }, []);

  useFrame(({ clock }) => {
    const d = readDissolve(dissolve);
    const t = clock.getElapsedTime();
    if (group.current) group.current.rotation.z = t * 0.02;
    rings.forEach(({ material }) => { material.opacity = d * 0.35; });
    spokes.material.opacity = d * 0.18;
  });

  return (
    <group ref={group}>
      {rings.map(({ geometry, material, i }) => <primitive key={i} object={new THREE.LineLoop(geometry, material)} />)}
      <primitive object={new THREE.LineSegments(spokes.geometry, spokes.material)} />
    </group>
  );
}

function MouseParallax({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += (pointer.x * 0.25 - group.current.rotation.y) * 0.03;
    group.current.rotation.x += (-pointer.y * 0.15 - group.current.rotation.x) * 0.03;
  });
  return <group ref={group}>{children}</group>;
}

function CameraDrift() {
  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.05) * 0.3;
    camera.position.y = Math.cos(t * 0.04) * 0.2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Scene({ dissolve, particleCount }: { dissolve: Dissolve; particleCount: number }) {
  return (
    <>
      <CameraDrift />
      <MouseParallax>
        <OrchidPetals dissolve={dissolve} />
        <OrchidParticles count={particleCount} dissolve={dissolve} />
        <SacredGeometry dissolve={dissolve} />
      </MouseParallax>
    </>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

export function ProceduralOrchid({
  dissolve,
  variant = 'hero',
}: {
  dissolve?: MotionValue<number>; // 0 = full flower, 1 = fully dissolved into sacred geometry
  variant?: 'hero' | 'about';
}) {
  const reduced = usePrefersReducedMotion();
  if (reduced) {
    // Respect prefers-reduced-motion: no animated canvas at all, just leave
    // the pure black background the spec calls for.
    return null;
  }
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, variant === 'hero' ? 6 : 5.2], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}>
        <Scene dissolve={dissolve} particleCount={variant === 'hero' ? 900 : 600} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.9} intensity={variant === 'hero' ? 1.4 : 1.1} mipmapBlur />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
