"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface MouseTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  scale?: number;
  perspective?: number;
  resetOnLeave?: boolean;
}

export function MouseTilt({
  children,
  className = "",
  maxTilt = 6,
  scale = 1.02,
  perspective = 1200,
  resetOnLeave = true,
}: MouseTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const current = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const px = (e.clientX - centerX) / (rect.width / 2);
      const py = (e.clientY - centerY) / (rect.height / 2);

      target.current = {
        x: -py * maxTilt,
        y: px * maxTilt,
      };
    };

    const onMouseLeave = () => {
      if (resetOnLeave) {
        target.current = { x: 0, y: 0 };
      }
    };

    const animate = () => {
      current.current.x += (target.current.x - current.current.x) * 0.08;
      current.current.y += (target.current.y - current.current.y) * 0.08;

      el.style.transform = `
        perspective(${perspective}px)
        rotateX(${current.current.x}deg)
        rotateY(${current.current.y}deg)
        scale3d(${1 + (scale - 1) * (1 - Math.abs(current.current.x / maxTilt - current.current.y / maxTilt) / 2)}, ${1 + (scale - 1) * (1 - Math.abs(current.current.x / maxTilt + current.current.y / maxTilt) / 2)}, 1)
      `;
      el.style.transition = "none";

      rafRef.current = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [maxTilt, scale, perspective, resetOnLeave]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  );
}

