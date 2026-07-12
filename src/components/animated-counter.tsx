"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  suffix = "",
  duration = 1500,
  delay = 0,
  className = "",
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState("0" + suffix);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          observer.unobserve(el);

          setTimeout(() => {
            const startTime = performance.now();

            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = Math.floor(eased * end);

              setDisplay(current + suffix);

              if (progress < 1) {
                requestAnimationFrame(tick);
              } else {
                setDisplay(end + suffix);
              }
            };

            requestAnimationFrame(tick);
          }, delay);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [end, suffix, duration, delay]);

  return (
    <div ref={ref} className={className}>
      {display}
    </div>
  );
}

