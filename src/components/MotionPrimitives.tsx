import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/* 1. Global Hairline Scroll Progress Bar */
export const ScrollProgressBar: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  if (shouldReduceMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-primary via-secondary to-emerald-500 z-[60] pointer-events-none"
    />
  );
};

/* 2. Editorial Masked Display Typography Reveal */
interface MaskTextRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const MaskTextReveal: React.FC<MaskTextRevealProps> = ({
  children,
  className = '',
  delay = 0,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '105%', opacity: 0.15 }}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          duration: 0.72,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* 3. Directional Architectural Entrance Reveal */
interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}

export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}) => {
  const shouldReduceMotion = useReducedMotion();

  const offsets = {
    up: { y: 22, x: 0 },
    down: { y: -22, x: 0 },
    left: { x: 28, y: 0 },
    right: { x: -28, y: 0 },
    none: { x: 0, y: 0 },
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.985, ...offsets[direction] }}
      whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.62, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* 4. Staggered Grid Choreography */
interface StaggerGridProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export const StaggerGrid: React.FC<StaggerGridProps> = ({
  children,
  className = '',
  staggerDelay = 0.065,
}) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({ children, className = '' }) => {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* 5. High-Precision Tabular Counter */
interface AnimatedCounterProps {
  target: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  durationMs?: number;
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  decimals = 0,
  prefix = '',
  suffix = '',
  durationMs = 1150,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.35 });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState<number>(target);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      setDisplayValue(target);
      return;
    }

    let start: number | null = null;
    let rafId = 0;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(target * eased);

      if (progress < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        setDisplayValue(target);
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isInView, target, durationMs, shouldReduceMotion]);

  const formatted =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.round(displayValue).toLocaleString();

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
};

/* 6. Scroll-Scrubbed Parallax & Scale Bloom Frame */
interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
  scaleRange?: [number, number];
}

export const ParallaxFrame: React.FC<ParallaxFrameProps> = ({
  children,
  className = '',
  offset = 24,
  scaleRange = [1.04, 1],
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleRange);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y, scale }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
};

/* 7. Interactive Pointer-Tracking Spotlight Surface */
interface SpotlightSurfaceProps {
  children: React.ReactNode;
  className?: string;
  asLink?: boolean;
}

export const SpotlightSurface: React.FC<SpotlightSurfaceProps> = ({
  children,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [coords, setCoords] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCoords((prev) => ({ ...prev, active: false }))}
      className={`relative overflow-hidden ${className}`}
    >
      {!shouldReduceMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: coords.active ? 1 : 0,
            background: `radial-gradient(380px circle at ${coords.x}px ${coords.y}px, rgba(37, 99, 235, 0.11), transparent 70%)`,
          }}
        />
      )}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
};

/* 8. Magnetic Spring CTA Wrapper */
interface MagneticWrapperProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export const MagneticWrapper: React.FC<MagneticWrapperProps> = ({
  children,
  className = '',
  strength = 0.22,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    setPos({ x: dx * strength, y: dy * strength });
  };

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 260, damping: 20, mass: 0.4 }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/* 9. Seamless Continuous Architectural Standards Marquee */
interface MarqueeItem {
  label: string;
  metric?: string;
}

interface InfiniteMarqueeProps {
  items: MarqueeItem[];
  className?: string;
}

export const InfiniteMarquee: React.FC<InfiniteMarqueeProps> = ({ items, className = '' }) => {
  return (
    <div
      className={`marquee-wrapper w-full overflow-hidden border-y border-outline/20 bg-surface-container-low/70 select-none ${className}`}
    >
      <div className="animate-marquee-track py-3.5 flex items-center">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center shrink-0">
            {items.map((item, idx) => (
              <div
                key={`${dup}-${idx}`}
                className="flex items-center gap-3 px-6 border-r border-outline/15 whitespace-nowrap"
              >
                <span className="font-mono text-[11px] uppercase tracking-widest text-on-surface-variant font-medium">
                  {item.label}
                </span>
                {item.metric && (
                  <span className="font-mono text-xs font-bold text-primary tabular-nums">
                    {item.metric}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
