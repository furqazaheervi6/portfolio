"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface StaggerGridProps {
  children: ReactNode[];
  className?: string;
  baseDelay?: number;
  staggerMs?: number;
}

export function StaggerGrid({ children, className = "", baseDelay = 0, staggerMs = 80 }: StaggerGridProps) {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          itemRefs.current.forEach((el, i) => {
            if (!el) return;
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.transform = "translateY(0)";
            }, baseDelay + i * staggerMs);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 },
    );

    // Observe the first item's parent
    if (itemRefs.current[0]) {
      observer.observe(itemRefs.current[0].parentElement || itemRefs.current[0]);
    }

    return () => observer.disconnect();
  }, [baseDelay, staggerMs]);

  return (
    <div className={className}>
      {children.map((child, i) => (
        <div
          key={i}
          ref={(el) => { itemRefs.current[i] = el; }}
          style={{
            opacity: 0,
            transform: "translateY(16px)",
            transition: `opacity 0.6s ease-out ${i * staggerMs}ms, transform 0.6s ease-out ${i * staggerMs}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

