"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface TextHoverVizProps {
  children: ReactNode;
  className?: string;
}

export function TextHoverViz({ children, className = "" }: TextHoverVizProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const timeRef = useRef(0);
  const animRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    function draw() {
      if (!canvas || !ctx) return;
      timeRef.current += 0.02;
      const t = timeRef.current;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      if (!hovered) {
        // Faint static brackets when not hovered
        const pad = 8;
        ctx.strokeStyle = "rgba(220, 38, 38, 0.04)";
        ctx.lineWidth = 0.5;

        // Corner brackets
        ctx.beginPath(); ctx.moveTo(pad, pad + 8); ctx.lineTo(pad, pad); ctx.lineTo(pad + 8, pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w - pad - 8, pad); ctx.lineTo(w - pad, pad); ctx.lineTo(w - pad, pad + 8); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(pad, h - pad - 8); ctx.lineTo(pad, h - pad); ctx.lineTo(pad + 8, h - pad); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(w - pad - 8, h - pad); ctx.lineTo(w - pad, h - pad); ctx.lineTo(w - pad, h - pad - 8); ctx.stroke();

        animId = requestAnimationFrame(draw);
        return;
      }

      // === Animated state ===
      const pad = 8;
      const pulse = Math.sin(t * 2) * 0.3 + 0.7;

      // Corner brackets — pulsing
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.3 * pulse})`;
      ctx.lineWidth = 1.2;

      // Top-left
      ctx.beginPath(); ctx.moveTo(pad, pad + 16); ctx.lineTo(pad, pad); ctx.lineTo(pad + 16, pad); ctx.stroke();
      // Top-right
      ctx.beginPath(); ctx.moveTo(w - pad - 16, pad); ctx.lineTo(w - pad, pad); ctx.lineTo(w - pad, pad + 16); ctx.stroke();
      // Bottom-left
      ctx.beginPath(); ctx.moveTo(pad, h - pad - 16); ctx.lineTo(pad, h - pad); ctx.lineTo(pad + 16, h - pad); ctx.stroke();
      // Bottom-right
      ctx.beginPath(); ctx.moveTo(w - pad - 16, h - pad); ctx.lineTo(w - pad, h - pad); ctx.lineTo(w - pad, h - pad - 16); ctx.stroke();

      // Scanning lines — top and bottom
      const scanX = ((t * 60) % (w - pad * 2)) + pad;
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.15 * pulse})`;
      ctx.lineWidth = 0.8;
      ctx.beginPath(); ctx.moveTo(scanX - 20, pad); ctx.lineTo(scanX + 20, pad); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(scanX - 20, h - pad); ctx.lineTo(scanX + 20, h - pad); ctx.stroke();

      // Side scan lines
      const scanY = ((t * 50) % (h - pad * 2)) + pad;
      ctx.beginPath(); ctx.moveTo(pad, scanY - 15); ctx.lineTo(pad, scanY + 15); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(w - pad, scanY - 15); ctx.lineTo(w - pad, scanY + 15); ctx.stroke();

      // Glow dots at corners
      const dotPhase = Math.sin(t * 1.5);
      [[pad, pad], [w - pad, pad], [pad, h - pad], [w - pad, h - pad]].forEach(([dx, dy], i) => {
        ctx.beginPath();
        ctx.arc(dx, dy, 2 + Math.sin(t * 2 + i) * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220, 38, 38, ${0.2 + Math.sin(t * 2 + i) * 0.1})`;
        ctx.fill();
      });

      // Subtle bracket extension lines — grow and retract
      const extend = Math.sin(t * 0.5) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(220, 38, 38, ${0.08 * extend})`;
      ctx.lineWidth = 0.5;
      // Top-left extends right
      ctx.beginPath(); ctx.moveTo(pad + 16, pad); ctx.lineTo(pad + 16 + extend * 30, pad); ctx.stroke();
      // Top-right extends left
      ctx.beginPath(); ctx.moveTo(w - pad - 16, pad); ctx.lineTo(w - pad - 16 - extend * 30, pad); ctx.stroke();
      // Bottom-left extends right
      ctx.beginPath(); ctx.moveTo(pad + 16, h - pad); ctx.lineTo(pad + 16 + extend * 30, h - pad); ctx.stroke();
      // Bottom-right extends left
      ctx.beginPath(); ctx.moveTo(w - pad - 16, h - pad); ctx.lineTo(w - pad - 16 - extend * 30, h - pad); ctx.stroke();

      // Data ticks along the left and right edges
      for (let i = 0; i < 5; i++) {
        const y = pad + 24 + ((h - pad * 2 - 48) / 4) * i;
        const tickLen = 4 + Math.sin(t * 1.2 + i * 0.8) * 2;
        ctx.beginPath();
        ctx.moveTo(pad, y);
        ctx.lineTo(pad + tickLen, y);
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.06 + Math.sin(t * 1.2 + i * 0.8) * 0.04})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(w - pad, y);
        ctx.lineTo(w - pad - tickLen, y);
        ctx.strokeStyle = `rgba(220, 38, 38, ${0.06 + Math.sin(t * 1.3 + i * 0.7) * 0.04})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, [hovered]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />
      {children}
    </div>
  );
}

