"use client";

import { useEffect, useRef } from "react";

export function SignalDivider() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;
    let isVisible = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 },
    );
    observer.observe(container);

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      if (!canvas || !ctx) return;
      time += 0.025;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      if (!isVisible) {
        // Faint static line when not visible
        ctx.strokeStyle = "rgba(220, 38, 38, 0.04)";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(0, midY);
        ctx.lineTo(w, midY);
        ctx.stroke();
        animationId = requestAnimationFrame(draw);
        return;
      }

      // Draw the animated oscilloscope sweep
      const sweepWidth = Math.min(w * 0.6, 600);
      const sweepX = w / 2 - sweepWidth / 2;

      // Glow beneath the trace
      const grad = ctx.createLinearGradient(0, midY - 12, 0, midY + 12);
      grad.addColorStop(0, "transparent");
      grad.addColorStop(0.5, "rgba(220, 38, 38, 0.06)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(sweepX, midY - 12, sweepWidth, 24);

      // The signal trace
      ctx.strokeStyle = "rgba(220, 38, 38, 0.25)";
      ctx.lineWidth = 1.2;
      ctx.beginPath();

      for (let x = 0; x <= sweepWidth; x += 1) {
        const t = x * 0.04 + time * 1.6;
        const y =
          midY +
          Math.sin(t) * 5 +
          Math.sin(t * 2.3) * 3 +
          Math.sin(t * 5.1) * 1.5 +
          Math.cos(t * 0.7) * 2;

        const px = sweepX + x;
        if (x === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();

      // Second trace — slightly offset, dimmer
      ctx.strokeStyle = "rgba(220, 38, 38, 0.08)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let x = 0; x <= sweepWidth; x += 2) {
        const t = x * 0.04 + time * 1.6 + 1.2;
        const y =
          midY +
          Math.sin(t) * 7 +
          Math.sin(t * 1.8) * 4 +
          Math.sin(t * 4.3) * 2;
        const px = sweepX + x;
        if (x === 0) ctx.moveTo(px, y);
        else ctx.lineTo(px, y);
      }
      ctx.stroke();

      // Pulsing dot at the end of the trace
      const endT = sweepWidth * 0.04 + time * 1.6;
      const endY = midY + Math.sin(endT) * 5 + Math.sin(endT * 2.3) * 3;
      const endX = sweepX + sweepWidth;

      ctx.beginPath();
      ctx.arc(endX, endY, 2, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(220, 38, 38, 0.35)";
      ctx.fill();

      // Dots on the baseline
      for (let x = 0; x <= sweepWidth; x += 40) {
        const t = x * 0.04 + time * 1.6;
        const y = midY + Math.sin(t) * 5 + Math.sin(t * 2.3) * 3;
        ctx.beginPath();
        ctx.arc(sweepX + x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(220, 38, 38, 0.12)";
        ctx.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative z-10 h-16 w-full" style={{ minHeight: "64px" }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

