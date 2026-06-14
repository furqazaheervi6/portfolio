'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

const CYCLE_DURATION = 12000;

// Sparse neural-network node graph, percentage coordinates on a 100x100 viewBox
const NEURAL_NODES: [number, number][] = [
  [10, 20], [25, 12], [40, 28], [15, 50], [32, 60],
  [55, 18], [70, 35], [85, 15], [60, 55], [78, 65],
  [45, 80], [20, 85], [90, 85], [65, 80], [35, 40],
];

const NEURAL_EDGES: [number, number, number, number][] = [
  [10, 20, 25, 12], [25, 12, 40, 28], [40, 28, 32, 60], [15, 50, 32, 60],
  [32, 60, 35, 40], [40, 28, 35, 40], [55, 18, 70, 35], [70, 35, 85, 15],
  [70, 35, 60, 55], [60, 55, 78, 65], [60, 55, 45, 80], [45, 80, 20, 85],
  [78, 65, 90, 85], [78, 65, 65, 80], [35, 40, 55, 18], [15, 50, 10, 20],
];

const VERSIONS = [
  {
    id: 'IMPERIUM',
    statue: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=800',
    bg: 'https://images.unsplash.com/photo-1543429776-2782fc8e1acd?w=1920',
    neural: false,
  },
  {
    id: 'BHARAT',
    statue: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800',
    bg: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1920',
    neural: false,
  },
  {
    id: 'SENATUS',
    statue: 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=800',
    bg: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=1920',
    neural: false,
  },
  {
    id: 'NEURON',
    statue: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800',
    bg: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920',
    neural: true,
  },
];

export default function AtlarionBackground() {
  const [currentVersion, setCurrentVersion] = useState(0);
  const [particles, setParticles] = useState<
    { left: string; width: string; height: string; background: string; animationDuration: string; animationDelay: string }[]
  >([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVersion((prev) => (prev + 1) % VERSIONS.length);
    }, CYCLE_DURATION);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setParticles(
      Array.from({ length: 30 }).map(() => ({
        left: `${Math.random() * 100}%`,
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        background: `rgba(${190 + Math.random() * 60}, ${30 + Math.random() * 50}, ${60 + Math.random() * 90}, ${0.3 + Math.random() * 0.4})`,
        animationDuration: `${15 + Math.random() * 15}s`,
        animationDelay: `${Math.random() * 10}s`,
      }))
    );
  }, []);

  const current = VERSIONS[currentVersion];

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      {/* Background temple */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${current.id}`}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, scale: [1, 1.05, 1] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, scale: { duration: 20, repeat: Infinity, ease: 'easeInOut' } }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={current.bg}
            alt="Temple ruins"
            className="w-full h-full object-cover opacity-30 grayscale"
            style={{ filter: 'brightness(0.3) contrast(1.4)' }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

      {/* Mist */}
      <div className="mist-layer" style={{ animationDelay: '0s' }} />
      <div className="mist-layer-2" style={{ animationDelay: '3s' }} />

      {/* Particles */}
      {particles.map((p, i) => (
        <div key={i} className="particle" style={p} />
      ))}

      {/* Red glow - Brand of Sacrifice */}
      <div className="red-glow" style={{ top: '20%', right: '15%', width: '300px', height: '300px' }} />
      <div className="red-glow-intense" style={{ bottom: '25%', left: '10%', width: '400px', height: '400px', animationDelay: '2s' }} />

      {/* Statue */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`statue-${current.id}`}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-full statue-container"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 2, ease: 'easeOut' }}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.statue}
              alt="Statue"
              className="h-[85%] w-auto object-contain opacity-40"
              style={{ filter: 'grayscale(1) contrast(1.3)', mixBlendMode: 'lighten' }}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Light rays */}
      {[20, 35, 50, 65, 80].map((left, i) => (
        <div
          key={i}
          className="light-ray"
          style={{ left: `${left}%`, animationName: 'lightRay', animationDelay: `${i * 1.5}s`, animationDuration: '10s', animationIterationCount: 'infinite', opacity: 0.08 }}
        />
      ))}

      {/* Scan line */}
      <div className="scan-line" />

      {/* Column overlays */}
      {[10, 25, 75, 90].map((left, i) => (
        <div key={i} className="column-overlay" style={{ left: `${left}%`, animationDelay: `${i * 2}s` }} />
      ))}

      {/* Vignette */}
      <div className="vignette" />

      {/* Neurotech overlay */}
      <AnimatePresence>
        {current.neural && (
          <motion.svg
            key="neural-overlay"
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid slice"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2 }}
          >
            {NEURAL_EDGES.map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                className="neural-line"
                style={{ animationDelay: `${(i % 6) * 0.4}s` }}
              />
            ))}
            {NEURAL_NODES.map(([cx, cy], i) => (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={0.6}
                className="neural-node"
                style={{ animationDelay: `${(i % 5) * 0.6}s` }}
              />
            ))}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* Brand mark */}
      <div className="absolute bottom-6 right-6 text-zinc-600 text-xs font-cinzel tracking-widest brand-mark pointer-events-none">
        SPQR × BHARATA
      </div>
    </div>
  );
}
