import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react';

/**
 * A dense cluster of small tech cards sits behind the headline (the
 * vanishing point). Cards peel out of that cluster at a constant speed,
 * growing and clearing as they travel toward the edges — like the
 * second reference: tiny/faint in the middle, larger at the perimeter.
 */

const PHOTOS = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=500&q=70',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=500&q=70',
];

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
const CYCLE = 11;
const COUNT = 32;

const IMAGES = Array.from({ length: COUNT }, (_, i) => {
  const portrait = i % 3 !== 1;
  return {
    src: PHOTOS[i % PHOTOS.length],
    angle: i * GOLDEN_ANGLE,
    w: portrait ? 88 : 118,
    h: portrait ? 114 : 78,
    rotate: ((i % 7) - 3) * 2.2,
    delay: -((i / COUNT) * CYCLE),
  };
});

interface FloatingImagesBackgroundProps {
  className?: string;
}

function useNormalizedPointer() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      x.set((e.clientX / window.innerWidth - 0.5) * 2);
      y.set((e.clientY / window.innerHeight - 0.5) * 2);
    }
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [x, y]);

  return { x, y };
}

function FlyingCard({
  spec,
  pointerX,
  pointerY,
  index,
}: {
  spec: (typeof IMAGES)[number];
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  index: number;
}) {
  const strength = 8 + (index % 5) * 3;
  const spring = { stiffness: 70, damping: 22, mass: 0.45 };
  const mx = useSpring(useTransform(pointerX, [-1, 1], [-strength, strength]), spring);
  const my = useSpring(useTransform(pointerY, [-1, 1], [-strength, strength]), spring);

  const dirX = Math.cos(spec.angle);
  const dirY = Math.sin(spec.angle);

  return (
    <motion.div className="absolute left-1/2 top-1/2" style={{ x: mx, y: my }}>
      <motion.div
        className="absolute overflow-hidden rounded-lg shadow-[0_12px_28px_-12px_rgba(0,0,0,0.28)]"
        style={{
          width: spec.w,
          height: spec.h,
          marginLeft: -spec.w / 2,
          marginTop: -spec.h / 2,
          transformStyle: 'preserve-3d',
        }}
        initial={false}
        animate={{
          x: [`${dirX * 10}vw`, `${dirX * 72}vw`],
          y: [`${dirY * 9}vh`, `${dirY * 66}vh`],
          z: [-520, 360],
          scale: [0.28, 1.12],
          opacity: [0, 0.55, 0.92, 0],
          rotate: [spec.rotate, spec.rotate],
          filter: ['blur(1.5px)', 'blur(0px)'],
        }}
        transition={{
          duration: CYCLE,
          delay: spec.delay,
          repeat: Infinity,
          ease: 'linear',
          opacity: {
            duration: CYCLE,
            delay: spec.delay,
            repeat: Infinity,
            ease: 'linear',
            times: [0, 0.18, 0.78, 1],
          },
          filter: {
            duration: CYCLE,
            delay: spec.delay,
            repeat: Infinity,
            ease: 'linear',
          },
        }}
      >
        <img
          src={spec.src}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
          loading="lazy"
        />
      </motion.div>
    </motion.div>
  );
}

export const FloatingImagesBackground: React.FC<FloatingImagesBackgroundProps> = ({
  className = '',
}) => {
  const { x: pointerX, y: pointerY } = useNormalizedPointer();

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ perspective: 1400, perspectiveOrigin: '50% 48%' }}
      aria-hidden="true"
    >
      {IMAGES.map((spec, i) => (
        <FlyingCard key={i} spec={spec} pointerX={pointerX} pointerY={pointerY} index={i} />
      ))}
    </div>
  );
};
