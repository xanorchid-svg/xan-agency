import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function RevealImage({
  src, alt = '', className = '', aspectRatio, tilt = true, delay = 0,
}: {
  src: string; alt?: string; className?: string; aspectRatio?: string; tilt?: boolean; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rX = useSpring(useTransform(my, [0, 1], [5, -5]), { stiffness: 200, damping: 20 });
  const rY = useSpring(useTransform(mx, [0, 1], [-5, 5]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (!tilt || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      initial={{ clipPath: 'inset(6% 6% 6% 6% round 28px)', opacity: 0, scale: 0.96 }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{ duration: 1.2, delay, ease: EASE }}
      style={{ aspectRatio, perspective: 1000 }}
      className={`overflow-hidden rounded-3xl ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={tilt ? { rotateX: rX, rotateY: rY, scale: 1.06 } : { scale: 1.02 }}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}
