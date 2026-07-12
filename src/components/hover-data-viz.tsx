"use client";

import { useEffect, useRef } from "react";

export function HoverDataViz() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<{ el: Element; rect: DOMRect }[]>([]);
  const activeIndexRef = useRef(-1);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const updateElements = () => {
      const interactives = container.querySelectorAll(
        "button, a, .group\\/card, .group\\/tag, .group\\/detail, .group\\/row, .group\\/item, [data-hover-viz]",
      );
      elementsRef.current = Array.from(interactives).map((el) => ({
        el,
        rect: el.getBoundingClientRect(),
      }));
    };

    const ro = new ResizeObserver(() => {
      resize();
      updateElements();
    });
    ro.observe(container);

    requestAnimationFrame(() => {
      resize();
      updateElements();
    });

    let debounceTimer: ReturnType<typeof setTimeout>;
    const refresh = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateElements, 100);
    };
    window.addEventListener("scroll", refresh, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      let found = -1;
      for (let i = 0; i < elementsRef.current.length; i++) {
        const er = elementsRef.current[i];
        er.rect = er.el.getBoundingClientRect();
        const r = er.rect;
        const rx = r.left - rect.left;
        const ry = r.top - rect.top;
        if (cx >= rx && cx <= rx + r.width && cy >= ry && cy <= ry + r.height) {
          found = i;
          break;
        }
      }
      activeIndexRef.current = found;
    };

    container.addEventListener("mousemove", onMouseMove);

    function draw() {
      if (!canvas || !ctx) return;
      const c = ctx;
      const cont = containerRef.current;
      if (!cont) return;
      timeRef.current += 0.016;
      const w = canvas.width;
      const h = canvas.height;

      c.clearRect(0, 0, w, h);

      if (activeIndexRef.current >= 0) {
        const el = elementsRef.current[activeIndexRef.current];
        const r = el.rect;
        const containerRect = cont.getBoundingClientRect();
        const cx = r.left - containerRect.left + r.width / 2;
        const cy = r.top - containerRect.top + r.height / 2;
        const maxDim = Math.max(r.width, r.height);
        const radius = maxDim * 1.8;

        const grad = c.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, "rgba(220, 38, 38, 0.04)");
        grad.addColorStop(0.4, "rgba(220, 38, 38, 0.02)");
        grad.addColorStop(1, "transparent");
        c.fillStyle = grad;
        c.beginPath();
        c.arc(cx, cy, radius, 0, Math.PI * 2);
        c.fill();

        const t = timeRef.current;
        const nodeCount = 6;
        for (let i = 0; i < nodeCount; i++) {
          const angle = (Math.PI * 2 * i) / nodeCount + t * 0.3;
          const dist = radius * 0.5 + Math.sin(t * 0.5 + i) * radius * 0.15;
          const nx = cx + Math.cos(angle) * dist;
          const ny = cy + Math.sin(angle) * dist;

          c.beginPath();
          c.arc(nx, ny, 1.5 + Math.sin(t + i) * 0.5, 0, Math.PI * 2);
          c.fillStyle = `rgba(220, 38, 38, ${0.15 + Math.sin(t + i) * 0.1})`;
          c.fill();

          c.beginPath();
          c.moveTo(cx, cy);
          c.lineTo(nx, ny);
          c.strokeStyle = `rgba(220, 38, 38, ${0.04 + Math.sin(t * 0.5 + i) * 0.03})`;
          c.lineWidth = 0.5;
          c.stroke();
        }

        const metrics = [
          `${Math.round((t * 10) % 1000).toString().padStart(3, "0")}`,
          `${(Math.sin(t * 0.7) * 50 + 50).toFixed(1)}%`,
          `${Math.floor(Math.sin(t * 1.1) * 180 + 180)}Hz`,
        ];

        metrics.forEach((m, i) => {
          const mx = cx + radius * 1.2;
          const my = cy - 12 + i * 12;
          c.font = "7px 'JetBrains Mono', monospace";
          c.textAlign = "left";
          c.fillStyle = `rgba(220, 38, 38, 0.12)`;
          c.fillText(m, mx, my);
        });
      }

      animId = requestAnimationFrame(draw);
    }

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("scroll", refresh);
      container.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}



