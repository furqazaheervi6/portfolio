"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseVx: number;
  baseVy: number;
}

interface Node {
  x: number;
  y: number;
  size: number;
  pulsePhase: number;
  pulseSpeed: number;
  opacity: number;
}

interface Signal {
  y: number;
  speed: number;
  amplitude: number;
  frequency: number;
  phase: number;
  opacity: number;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const onMouseLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    // Signal lines
    const signalCount = 4;
    const signals: Signal[] = Array.from({ length: signalCount }, (_, i) => ({
      y: 0.15 + (i / (signalCount - 1)) * 0.55,
      speed: 0.4 + Math.random() * 0.3,
      amplitude: 8 + Math.random() * 12,
      frequency: 0.008 + Math.random() * 0.012,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.08 + Math.random() * 0.06,
    }));

    // Nodes — pulsing dots
    const nodeCount = 18;
    const nodes: Node[] = Array.from({ length: nodeCount }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: 1 + Math.random() * 2,
      pulsePhase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.3 + Math.random() * 0.4,
      opacity: 0.04 + Math.random() * 0.08,
    }));

    // Particles — mouse-responsive
    const particleCount = 50;
    const particles: Particle[] = Array.from({ length: particleCount }, () => ({
      x: Math.random() * (canvas?.width ?? 1920),
      y: Math.random() * (canvas?.height ?? 1080),
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      size: 0.5 + Math.random() * 1.0,
      opacity: 0.02 + Math.random() * 0.035,
      baseVx: (Math.random() - 0.5) * 0.2,
      baseVy: (Math.random() - 0.5) * 0.2,
    }));

    // Mouse interaction trails
    const trailPoints: { x: number; y: number; life: number }[] = [];

    function draw() {
      if (!canvas || !ctx) return;
      time += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;

      // 1. Subtle grid
      ctx.strokeStyle = "rgba(255, 255, 255, 0.012)";
      ctx.lineWidth = 0.5;
      const gridSize = 80;
      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // 1b. Animated grid sweep
      const gridPhase = ((time * 20) % 160);
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.01 + Math.sin(time * 0.3) * 0.005})`;
      ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += gridSize) {
        const sweepY = (x + gridPhase) % h;
        ctx.beginPath();
        ctx.moveTo(x, sweepY - 2);
        ctx.lineTo(x, sweepY + 2);
        ctx.stroke();
      }

      // 2. Signal traces
      for (const sig of signals) {
        ctx.strokeStyle = `rgba(220, 38, 38, ${sig.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 2) {
          const t = x * sig.frequency + time * sig.speed + sig.phase;
          const y =
            h * sig.y +
            Math.sin(t) * sig.amplitude +
            Math.sin(t * 2.3) * sig.amplitude * 0.4 +
            Math.sin(t * 5.1) * sig.amplitude * 0.15;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // 3. Signal envelope glow
      for (const sig of signals) {
        const gradient = ctx.createLinearGradient(0, h * sig.y - 20, 0, h * sig.y + 20);
        gradient.addColorStop(0, "transparent");
        gradient.addColorStop(0.5, `rgba(220, 38, 38, ${sig.opacity * 0.3})`);
        gradient.addColorStop(1, "transparent");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, h * sig.y - 20, w, 40);
      }

      // 4. Pulsing nodes
      for (const node of nodes) {
        const pulse = Math.sin(time * node.pulseSpeed + node.pulsePhase) * 0.5 + 0.5;
        const x = node.x * w;
        const y = node.y * h;
        const r = node.size + pulse * 1.5;

        // Connection line to mouse when close
        if (mouse.active) {
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 250) {
            const alpha = (1 - dist / 250) * 0.12;
            ctx.strokeStyle = `rgba(220, 38, 38, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(x, y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${node.opacity + pulse * 0.04})`;
        ctx.fill();

        // Halo
        ctx.beginPath();
        ctx.arc(x, y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${(node.opacity + pulse * 0.04) * 0.15})`;
        ctx.fill();
      }

      // 5. Particles — mouse-responsive
      for (const p of particles) {
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (1 - dist / 200) * 0.3;
            p.vx -= dx * force * 0.002;
            p.vy -= dy * force * 0.002;
          }
          // Return to base velocity
          p.vx += (p.baseVx - p.vx) * 0.01;
          p.vy += (p.baseVy - p.vy) * 0.01;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) { p.x = w; }
        if (p.x > w) { p.x = 0; }
        if (p.y < 0) { p.y = h; }
        if (p.y > h) { p.y = 0; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.fill();
      }

      // 6. Mouse ghost trail
      if (mouse.active) {
        trailPoints.push({ x: mouse.x, y: mouse.y, life: 1 });
      }
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        const pt = trailPoints[i];
        pt.life -= 0.02;
        pt.y -= 0.1;

        if (pt.life <= 0) {
          trailPoints.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.5 * pt.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${pt.life * 0.15})`;
        ctx.fill();
      }
      if (trailPoints.length > 60) trailPoints.splice(0, trailPoints.length - 60);

      // 7. Mouse glow
      if (mouse.active) {
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        grad.addColorStop(0, "rgba(220, 38, 38, 0.02)");
        grad.addColorStop(0.5, "rgba(220, 38, 38, 0.008)");
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
      style={{ opacity: 0.7 }}
    />
  );
}

