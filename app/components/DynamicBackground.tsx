'use client';

import { useEffect, useRef } from 'react';

/* ============================================================
   DynamicBackground
   A single-canvas procedural engine. Every theme runs at once;
   a slow 30s clock swells each one forward in turn so the scene
   keeps moving like film footage rather than a slideshow.

   Themes:
     · Architecture  — Islamic 8-point star tessellation + Roman
                       arcade + brutalist monoliths (parallax line-art)
     · Quantum       — wave-interference rings, |ψ|² ripples, atoms
     · Neural        — drifting node graph with signals firing on edges
     · Bio           — rotating DNA double helices
   Palette: vermillion + dark purple + black.
   ============================================================ */

const VERMILLION = '227, 66, 52';
const PURPLE = '128, 56, 168';
const DEEP = '70, 22, 110';

const rgba = (c: string, a: number) => `rgba(${c},${a})`;

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let W = 0;
    let H = 0;
    let DPR = 1;

    // ---- size-dependent geometry ----
    type Node = { bx: number; by: number; p: number; ds: number; amp: number; r: number };
    type Edge = { a: number; b: number; speed: number; off: number; show: boolean };
    let nodes: Node[] = [];
    let edges: Edge[] = [];
    let waveSources: [number, number][] = [];
    let atoms: { x: number; y: number; rx: number; ry: number; tilt: number; e: { sp: number; ph: number; t: number }[] }[] = [];
    let helices: { cx: number; amp: number; freq: number; speed: number; drift: number }[] = [];

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const build = () => {
      // Neural graph — density scales with screen area
      const count = Math.max(24, Math.min(58, Math.round((W * H) / 42000)));
      nodes = Array.from({ length: count }).map(() => ({
        bx: Math.random() * W,
        by: Math.random() * H,
        p: Math.random() * Math.PI * 2,
        ds: rand(0.08, 0.26),
        amp: rand(8, 22),
        r: rand(1, 1.8),
      }));
      const thr = Math.min(W, H) * 0.24;
      edges = [];
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = nodes[i].bx - nodes[j].bx;
          const dy = nodes[i].by - nodes[j].by;
          if (Math.hypot(dx, dy) < thr && Math.random() < 0.55) {
            edges.push({ a: i, b: j, speed: rand(0.12, 0.32), off: Math.random(), show: Math.random() < 0.6 });
          }
        }
      }

      // Quantum
      waveSources = [
        [W * 0.72, H * 0.42],
        [W * 0.52, H * 0.74],
        [W * 0.88, H * 0.62],
      ];
      atoms = [
        { x: W * 0.8, y: H * 0.34, rx: 64, ry: 24, tilt: -0.5, e: [ { sp: 1.4, ph: 0, t: -0.5 }, { sp: -1.0, ph: 2, t: 0.8 }, { sp: 1.8, ph: 4, t: 1.7 } ] },
        { x: W * 0.42, y: H * 0.5, rx: 46, ry: 18, tilt: 0.7, e: [ { sp: -1.6, ph: 1, t: 0.4 }, { sp: 1.2, ph: 3.5, t: -1.2 } ] },
      ];

      // Bio
      helices = [
        { cx: W * 0.86, amp: 42, freq: 0.026, speed: 1.0, drift: 34 },
        { cx: W * 0.16, amp: 30, freq: 0.034, speed: -0.8, drift: 22 },
      ];
    };

    const resize = () => {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth || window.innerWidth;
      H = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      build();
    };

    // ---------------- layer painters ----------------

    // smooth phased weight: 0.35 baseline .. 1.0 peak over a 30s cycle
    const period = 30;
    const weight = (t: number, offset: number) =>
      0.35 + 0.65 * (0.5 + 0.5 * Math.cos((2 * Math.PI * (t / period - offset))));

    // Ambient drifting colour fog — gives the whole scene presence
    const blobs = [
      { x: 0.7, y: 0.34, c: VERMILLION, base: 0.3, r: 0.42, sx: 0.05, sy: 0.04, ph: 0 },
      { x: 0.55, y: 0.72, c: PURPLE, base: 0.28, r: 0.5, sx: 0.04, sy: 0.05, ph: 2 },
      { x: 0.9, y: 0.6, c: DEEP, base: 0.26, r: 0.46, sx: 0.06, sy: 0.03, ph: 4 },
      { x: 0.42, y: 0.46, c: VERMILLION, base: 0.16, r: 0.34, sx: 0.05, sy: 0.06, ph: 1 },
    ];
    const drawNebula = (t: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      blobs.forEach((b) => {
        const cx = W * b.x + Math.sin(t * b.sx + b.ph) * W * 0.06;
        const cy = H * b.y + Math.cos(t * b.sy + b.ph) * H * 0.06;
        const rad = Math.max(W, H) * b.r;
        const a = b.base * (0.7 + 0.3 * Math.sin(t * 0.3 + b.ph));
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        g.addColorStop(0, rgba(b.c, a));
        g.addColorStop(1, rgba(b.c, 0));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });
      ctx.restore();
    };

    const star8 = (cx: number, cy: number, outer: number, rot: number) => {
      const inner = outer * 0.45;
      ctx.beginPath();
      for (let i = 0; i <= 16; i++) {
        const r = i % 2 === 0 ? outer : inner;
        const a = rot + (i * Math.PI) / 8;
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();
    };

    const drawArchitecture = (t: number, w: number) => {
      ctx.save();

      // Brutalist monoliths anchoring the base
      const mono = [0.06, 0.34, 0.66, 0.9];
      mono.forEach((mx, i) => {
        const bw = W * (0.07 + (i % 2) * 0.03);
        const bh = H * (0.22 + (i % 3) * 0.06);
        const x = W * mx - bw / 2 + Math.sin(t * 0.05 + i) * 6;
        const y = H - bh;
        const g = ctx.createLinearGradient(0, y, 0, H);
        g.addColorStop(0, rgba(DEEP, 0));
        g.addColorStop(1, rgba(DEEP, 0.3 * w));
        ctx.fillStyle = g;
        ctx.fillRect(x, y, bw, bh);
        ctx.strokeStyle = rgba(PURPLE, 0.18 * w);
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, bw, bh);
      });

      // Roman arcade — parallax line-art band along the base
      const archW = Math.max(120, W / 8);
      const baseY = H * 0.96;
      const colH = H * 0.2;
      const shift = (t * 7) % archW;
      ctx.strokeStyle = rgba(VERMILLION, 0.24 * w);
      ctx.lineWidth = 1.4;
      for (let x = -archW + shift; x < W + archW; x += archW) {
        const r = archW * 0.42;
        const cx = x + archW / 2;
        ctx.beginPath();
        ctx.moveTo(x + archW * 0.08, baseY);
        ctx.lineTo(x + archW * 0.08, baseY - colH);
        ctx.moveTo(x + archW * 0.92, baseY);
        ctx.lineTo(x + archW * 0.92, baseY - colH);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cx, baseY - colH, r, Math.PI, 0);
        ctx.stroke();
      }

      // Islamic 8-point star tessellation, slowly rotating, upper field
      const cell = Math.max(150, W / 7);
      const px = (t * 4) % cell;
      ctx.strokeStyle = rgba(PURPLE, 0.2 * w);
      ctx.lineWidth = 1.2;
      for (let gx = -cell; gx < W + cell; gx += cell) {
        for (let gy = -cell; gy < H * 0.7; gy += cell) {
          const sx = gx + cell / 2 - px;
          const sy = gy + cell / 2;
          star8(sx, sy, cell * 0.3, t * 0.05 + (gx + gy) * 0.001);
        }
      }

      ctx.restore();
    };

    const drawQuantum = (t: number, w: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      // Expanding interference rings from each source
      const maxR = Math.min(W, H) * 0.55;
      waveSources.forEach((s, si) => {
        for (let k = 0; k < 5; k++) {
          const ph = (t * 0.1 + k / 5 + si * 0.13) % 1;
          const radius = ph * maxR;
          const alpha = (1 - ph) * 0.2 * w;
          ctx.strokeStyle = rgba(si % 2 ? VERMILLION : PURPLE, alpha);
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.arc(s[0], s[1], radius, 0, Math.PI * 2);
          ctx.stroke();
        }
      });

      // |ψ|² style probability ripples with edge envelope
      for (let k = 0; k < 2; k++) {
        const baseY = H * (0.46 + k * 0.1);
        ctx.strokeStyle = rgba(VERMILLION, 0.32 * w);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        for (let x = 0; x <= W; x += 8) {
          const env = Math.sin((x / W) * Math.PI);
          const y = baseY + Math.sin(x * 0.012 + t * 1.3 + k * 1.6) * 20 * env;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Orbiting atoms
      atoms.forEach((atom) => {
        atom.e.forEach((el) => {
          // orbit path
          ctx.strokeStyle = rgba(PURPLE, 0.18 * w);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(atom.x, atom.y, atom.rx, atom.ry, atom.tilt + el.t, 0, Math.PI * 2);
          ctx.stroke();
          // electron
          const a = t * el.sp + el.ph;
          const lx = atom.rx * Math.cos(a);
          const ly = atom.ry * Math.sin(a);
          const ang = atom.tilt + el.t;
          const ex = atom.x + lx * Math.cos(ang) - ly * Math.sin(ang);
          const ey = atom.y + lx * Math.sin(ang) + ly * Math.cos(ang);
          ctx.fillStyle = rgba(VERMILLION, 0.95 * w);
          ctx.beginPath();
          ctx.arc(ex, ey, 2.4, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = rgba(VERMILLION, 0.32 * w);
          ctx.beginPath();
          ctx.arc(ex, ey, 7, 0, Math.PI * 2);
          ctx.fill();
        });
        // nucleus
        ctx.fillStyle = rgba(VERMILLION, 0.75 * w);
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, 3.4 + Math.sin(t * 3) * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(PURPLE, 0.3 * w);
        ctx.beginPath();
        ctx.arc(atom.x, atom.y, 12, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const drawNeural = (t: number, w: number) => {
      ctx.save();
      const pos = nodes.map((n) => [
        n.bx + Math.sin(t * n.ds + n.p) * n.amp,
        n.by + Math.cos(t * n.ds * 0.8 + n.p) * n.amp * 0.6,
      ]);

      // edges
      ctx.lineWidth = 1;
      edges.forEach((e) => {
        const [ax, ay] = pos[e.a];
        const [bx, by] = pos[e.b];
        ctx.strokeStyle = rgba(PURPLE, 0.16 * w);
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      });

      // firing signals + nodes (additive)
      ctx.globalCompositeOperation = 'lighter';
      edges.forEach((e) => {
        if (!e.show) return;
        const [ax, ay] = pos[e.a];
        const [bx, by] = pos[e.b];
        const p = (t * e.speed + e.off) % 1;
        const px = ax + (bx - ax) * p;
        const py = ay + (by - ay) * p;
        ctx.fillStyle = rgba(VERMILLION, 0.95 * w);
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(VERMILLION, 0.35 * w);
        ctx.beginPath();
        ctx.arc(px, py, 7, 0, Math.PI * 2);
        ctx.fill();
      });
      pos.forEach(([x, y], i) => {
        const pulse = 0.6 + 0.4 * Math.sin(t * 2 + i);
        ctx.fillStyle = rgba(VERMILLION, 0.85 * w * pulse);
        ctx.beginPath();
        ctx.arc(x, y, nodes[i].r * 1.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = rgba(PURPLE, 0.26 * w);
        ctx.beginPath();
        ctx.arc(x, y, nodes[i].r * 5, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
    };

    const drawBio = (t: number, w: number) => {
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      helices.forEach((h) => {
        const cx = h.cx + Math.sin(t * 0.12) * h.drift;
        const step = 7;
        const s1: [number, number, number][] = [];
        const s2: [number, number, number][] = [];
        for (let y = -20; y < H + 20; y += step) {
          const phase = y * h.freq + t * h.speed;
          const x1 = cx + Math.sin(phase) * h.amp;
          const x2 = cx + Math.sin(phase + Math.PI) * h.amp;
          const d1 = (Math.cos(phase) + 1) / 2; // depth 0..1
          s1.push([x1, y, d1]);
          s2.push([x2, y, 1 - d1]);
          // rungs
          if (Math.round(y / step) % 3 === 0) {
            ctx.strokeStyle = rgba(PURPLE, 0.34 * w * (0.4 + d1 * 0.6));
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(x1, y);
            ctx.lineTo(x2, y);
            ctx.stroke();
          }
        }
        const strand = (pts: [number, number, number][], color: string) => {
          ctx.beginPath();
          pts.forEach(([x, y], i) => (i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)));
          ctx.strokeStyle = rgba(color, 0.6 * w);
          ctx.lineWidth = 1.8;
          ctx.stroke();
          // depth dots
          pts.forEach(([x, y, d]) => {
            ctx.fillStyle = rgba(color, (0.45 + d * 0.55) * w);
            ctx.beginPath();
            ctx.arc(x, y, 1.2 + d * 1.6, 0, Math.PI * 2);
            ctx.fill();
          });
        };
        strand(s1, VERMILLION);
        strand(s2, PURPLE);
      });
      ctx.restore();
    };

    // ---------------- main loop ----------------
    let raf = 0;
    const startTs = performance.now();

    const renderFrame = (t: number) => {
      // background wash
      const g = ctx.createRadialGradient(W * 0.62, H * 0.4, 0, W * 0.62, H * 0.4, Math.max(W, H));
      g.addColorStop(0, '#1d0817');
      g.addColorStop(0.5, '#0f040c');
      g.addColorStop(1, '#000000');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      drawNebula(t);
      drawArchitecture(t, weight(t, 0));
      drawQuantum(t, weight(t, 0.25));
      drawNeural(t, weight(t, 0.5));
      drawBio(t, weight(t, 0.75));
    };

    const frame = (now: number) => {
      const t = (now - startTs) / 1000;
      renderFrame(t);
      raf = requestAnimationFrame(frame);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    renderFrame(6); // immediate first paint — avoids a blank flash before rAF starts
    if (!reduceMotion) {
      raf = requestAnimationFrame(frame);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduceMotion) {
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      {/* legibility washes — keep left-aligned hero text readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75 pointer-events-none" />
      <div className="vignette" />
      <div className="scan-line" />
    </div>
  );
}
