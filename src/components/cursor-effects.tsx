"use client";

import { useEffect, useRef } from "react";

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
  label?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  label: string;
}

export function CursorEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -999, y: -999, vx: 0, vy: 0 });
  const ripples = useRef<Ripple[]>([]);
  const particles = useRef<Particle[]>([]);
  const lastClickData = useRef<string>("");
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -999, y: -999, px: -999, py: -999 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouseRef.current.vx = mouse.x - mouse.px;
      mouseRef.current.vy = mouse.y - mouse.py;
      mouseRef.current.x = mouse.x;
      mouseRef.current.y = mouse.y;
    };

    const clickLabels = [
      "SCAN", "SIGNAL", "NODE", "DECODE", "TRACE",
      "PATTERN", "STATE", "TX", "RX", "PROC",
      "READ", "MAP", "SYNC", "LINK", "PULSE",
    ];

    const onMouseDown = (e: MouseEvent) => {
      const r = Math.min(window.innerWidth, window.innerHeight) * 0.15;
      const label = clickLabels[Math.floor(Math.random() * clickLabels.length)];
      const subLabel = String(Math.floor(Math.random() * 999)).padStart(3, "0");

      ripples.current.push({
        x: e.clientX,
        y: e.clientY,
        radius: 0,
        maxRadius: r,
        opacity: 0.35,
        speed: 4,
        label: `${label} ${subLabel}`,
      });

      // Particle burst on click
      const burstCount = 12 + Math.floor(Math.random() * 8);
      for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount + (Math.random() - 0.5) * 0.3;
        const speed = 1.5 + Math.random() * 3;
        const dataLabels = [
          "0x" + Math.floor(Math.random() * 0xFFFF).toString(16).padStart(4, "0"),
          String(Math.floor(Math.random() * 999)),
          `${Math.floor(Math.random() * 100)}%`,
          `±${(Math.random() * 10).toFixed(1)}`,
          `#${Math.floor(Math.random() * 9999)}`,
          `${(Math.random() * 100).toFixed(1)}Hz`,
          `${Math.floor(Math.random() * 256)}mA`,
          `${Math.floor(Math.random() * 50) + 1}dB`,
        ];
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.8 + Math.random() * 0.6,
          size: 0.5 + Math.random() * 0.6,
          label: dataLabels[Math.floor(Math.random() * dataLabels.length)],
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);

    function draw() {
      if (!canvas || !ctx) return;
      timeRef.current += 0.016;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.x;
      const my = mouse.y;

      // === 1. Click ripple rings ===
      for (let i = ripples.current.length - 1; i >= 0; i--) {
        const r = ripples.current[i];
        r.radius += r.speed;
        r.opacity *= 0.97;

        // Ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${r.opacity})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second ring (inner)
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius * 0.7, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(220, 38, 38, ${r.opacity * 0.4})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Label on ring
        if (r.radius > 30 && r.label) {
          ctx.save();
          ctx.translate(r.x, r.y);
          ctx.rotate((-r.radius * 0.02) % (Math.PI * 2));
          ctx.font = "8px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(220, 38, 38, ${r.opacity * 0.6})`;
          ctx.textAlign = "center";
          ctx.fillText(r.label, 0, -r.radius - 8);
          ctx.restore();
        }

        if (r.radius > r.maxRadius || r.opacity < 0.01) {
          ripples.current.splice(i, 1);
        }
      }

      // === 2. Data particles ===
      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.life -= 0.016 / p.maxLife;

        if (p.life <= 0) {
          particles.current.splice(i, 1);
          continue;
        }

        ctx.font = `${8 + p.size * 2}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(220, 38, 38, ${p.life * 0.5})`;
        ctx.textAlign = "center";
        ctx.fillText(p.label, p.x, p.y);
      }

      // === 3. Cursor crosshair ===
      if (mx > 0 && my > 0) {
        const size = 12;
        const gap = 4;

        ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
        ctx.lineWidth = 0.8;

        // Crosshair lines
        ctx.beginPath();
        ctx.moveTo(mx - size - gap, my);
        ctx.lineTo(mx - gap, my);
        ctx.moveTo(mx + gap, my);
        ctx.lineTo(mx + size + gap, my);
        ctx.moveTo(mx, my - size - gap);
        ctx.lineTo(mx, my - gap);
        ctx.moveTo(mx, my + gap);
        ctx.lineTo(mx, my + size + gap);
        ctx.stroke();

        // Center dot
        ctx.beginPath();
        ctx.arc(mx, my, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 38, 38, 0.3)";
        ctx.fill();

        // Corner brackets around cursor
        const bs = 6;
        const bg = 8;
        ctx.strokeStyle = "rgba(220, 38, 38, 0.12)";
        ctx.lineWidth = 0.5;
        // top-left
        ctx.beginPath();
        ctx.moveTo(mx - bs - bg, my - bg);
        ctx.lineTo(mx - bg, my - bg);
        ctx.lineTo(mx - bg, my - bs - bg);
        ctx.stroke();
        // top-right
        ctx.beginPath();
        ctx.moveTo(mx + bs + bg, my - bg);
        ctx.lineTo(mx + bg, my - bg);
        ctx.lineTo(mx + bg, my - bs - bg);
        ctx.stroke();
        // bottom-left
        ctx.beginPath();
        ctx.moveTo(mx - bs - bg, my + bg);
        ctx.lineTo(mx - bg, my + bg);
        ctx.lineTo(mx - bg, my + bs + bg);
        ctx.stroke();
        // bottom-right
        ctx.beginPath();
        ctx.moveTo(mx + bs + bg, my + bg);
        ctx.lineTo(mx + bg, my + bg);
        ctx.lineTo(mx + bg, my + bs + bg);
        ctx.stroke();

        // === 4. Data readout near cursor ===
        const dataLines = [
          `X:${Math.round(mx).toString().padStart(4, " ")}`,
          `Y:${Math.round(my).toString().padStart(4, " ")}`,
          `ΔV:${(mouseRef.current.vx + mouseRef.current.vy).toFixed(1)}`,
        ];
        const lineH = 11;
        const dataX = mx + 18;
        const dataY = my - 10;

        // Background rect
        const bw = 64;
        const bh = dataLines.length * lineH + 6;
        ctx.fillStyle = "rgba(8, 8, 8, 0.6)";
        ctx.fillRect(dataX, dataY, bw, bh);
        ctx.strokeStyle = "rgba(220, 38, 38, 0.1)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(dataX, dataY, bw, bh);

        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.textAlign = "left";
        dataLines.forEach((line, i) => {
          ctx.fillStyle = "rgba(220, 38, 38, 0.3)";
          ctx.fillText(line, dataX + 4, dataY + 10 + i * lineH);
        });
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}

