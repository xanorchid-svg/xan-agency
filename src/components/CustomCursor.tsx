import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

// Add data-cursor="hover" to any link/button you want the cursor to expand over.
export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const [isHover, setIsHover] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }
    const move = (e: MouseEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setIsHover(!!target.closest('[data-cursor="hover"]'));
    };
    const leave = () => setVisible(false);
    window.addEventListener('mousemove', move);
    document.documentElement.addEventListener('mouseleave', leave);
    document.documentElement.style.cursor = 'none';
    return () => {
      window.removeEventListener('mousemove', move);
      document.documentElement.removeEventListener('mouseleave', leave);
      document.documentElement.style.cursor = '';
    };
  }, [x, y]);

  if (isTouch || reduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 rounded-full pointer-events-none"
      style={{
        x: springX,
        y: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: isHover ? 56 : 10,
        height: isHover ? 56 : 10,
        background: isHover ? 'transparent' : '#D7E2EA',
        border: isHover ? '1.5px solid #D7E2EA' : 'none',
        mixBlendMode: 'difference',
        opacity: visible ? 1 : 0,
        zIndex: 9999,
        transition: 'width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.25s, opacity 0.2s',
      }}
    />
  );
}
