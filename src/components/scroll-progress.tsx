"use client";

import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const p = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(Math.min(p, 100));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionNames = ["Hero", "About", "Projects", "Skills", "Contact"];
  const sectionThresholds = sectionNames.map((_, i) => (i / (sectionNames.length - 1)) * 100);

  const activeSection = sectionThresholds.reduce((prev, curr, i) => {
    return progress >= curr ? i : prev;
  }, 0);

  return (
    <div className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
      {/* Progress rail */}
      <div className="relative h-40 w-[1px] bg-border-subtle">
        <div
          className="absolute bottom-0 w-full bg-vermilion transition-all duration-150"
          style={{ height: `${progress}%` }}
        />
      </div>

      {/* Section dots */}
      <div className="flex flex-col items-center gap-2">
        {sectionNames.map((name, i) => (
          <a
            key={name}
            href={`#${name.toLowerCase() === "hero" ? "" : name.toLowerCase()}`}
            className={`group relative flex items-center justify-center transition-all duration-300 ${
              i === activeSection ? "scale-100" : "scale-75"
            }`}
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === activeSection
                  ? "h-2 w-2 bg-vermilion shadow-[0_0_6px_rgba(220,38,38,0.4)]"
                  : "h-1.5 w-1.5 bg-border-subtle hover:bg-text-muted"
              }`}
            />
            <span className="absolute right-4 whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.15em] text-text-muted opacity-0 transition-all duration-200 group-hover:opacity-100">
              {name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
