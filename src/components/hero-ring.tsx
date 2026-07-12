"use client";

import { useEffect, useRef } from "react";

export function HeroRing() {
  const ringRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ringRef.current;
    if (!svg) return;

    svg.style.opacity = "1";
  }, []);

  return (
    <svg
      ref={ringRef}
      className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-1000"
      viewBox="0 0 800 800"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="ring-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(220,38,38,0.03)" />
          <stop offset="70%" stopColor="rgba(220,38,38,0.01)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>

      {/* Outer glow circle */}
      <circle cx="400" cy="400" r="320" fill="url(#ring-glow)" className="animate-pulse-subtle" />

      {/* Rotating orbital ring */}
      <g className="animate-rotate-slow origin-center">
        <ellipse
          cx="400"
          cy="400"
          rx="340"
          ry="120"
          stroke="rgba(220,38,38,0.08)"
          strokeWidth="0.5"
          fill="none"
          transform="rotate(-15 400 400)"
          strokeDasharray="4 8"
        />
      </g>

      {/* Counter-rotating ring */}
      <g className="animate-rotate-reverse origin-center">
        <ellipse
          cx="400"
          cy="400"
          rx="300"
          ry="100"
          stroke="rgba(220,38,38,0.05)"
          strokeWidth="0.5"
          fill="none"
          transform="rotate(25 400 400)"
          strokeDasharray="2 12"
        />
      </g>

      {/* Corner brackets — top-left */}
      <g className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <path d="M160 200 V160 H200" stroke="rgba(220,38,38,0.3)" strokeWidth="1" fill="none" />
        <path d="M168 200 V168 H200" stroke="rgba(220,38,38,0.15)" strokeWidth="0.5" fill="none" />
      </g>

      {/* Corner brackets — top-right */}
      <g className="animate-fade-in-up" style={{ animationDelay: "0.5s" }}>
        <path d="M640 200 V160 H600" stroke="rgba(220,38,38,0.3)" strokeWidth="1" fill="none" />
        <path d="M632 200 V168 H600" stroke="rgba(220,38,38,0.15)" strokeWidth="0.5" fill="none" />
      </g>

      {/* Corner brackets — bottom-left */}
      <g className="animate-fade-in-down" style={{ animationDelay: "0.7s" }}>
        <path d="M160 600 V640 H200" stroke="rgba(220,38,38,0.3)" strokeWidth="1" fill="none" />
        <path d="M168 600 V632 H200" stroke="rgba(220,38,38,0.15)" strokeWidth="0.5" fill="none" />
      </g>

      {/* Corner brackets — bottom-right */}
      <g className="animate-fade-in-down" style={{ animationDelay: "0.9s" }}>
        <path d="M640 600 V640 H600" stroke="rgba(220,38,38,0.3)" strokeWidth="1" fill="none" />
        <path d="M632 600 V632 H600" stroke="rgba(220,38,38,0.15)" strokeWidth="0.5" fill="none" />
      </g>

      {/* Small pulsing node markers on the ring */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const rx = 340;
        const ry = 120;
        const cx = 400 + rx * Math.cos(rad) * Math.cos(-15 * Math.PI / 180) - ry * Math.sin(rad) * Math.sin(-15 * Math.PI / 180);
        const cy = 400 + rx * Math.cos(rad) * Math.sin(-15 * Math.PI / 180) + ry * Math.sin(rad) * Math.cos(-15 * Math.PI / 180);
        return (
          <g key={angle} className="animate-pulse-node" style={{ animationDelay: `${i * 0.4}s` }}>
            <circle cx={cx} cy={cy} r={2} fill="rgba(220,38,38,0.4)" />
            <circle cx={cx} cy={cy} r={6} fill="rgba(220,38,38,0.08)" />
          </g>
        );
      })}

      {/* Crosshair center */}
      <line x1="380" y1="400" x2="420" y2="400" stroke="rgba(220,38,38,0.06)" strokeWidth="0.5" />
      <line x1="400" y1="380" x2="400" y2="420" stroke="rgba(220,38,38,0.06)" strokeWidth="0.5" />
      <circle cx="400" cy="400" r="2" fill="rgba(220,38,38,0.12)" />

      {/* Data connection lines from center outward */}
      <g className="animate-draw-line" style={{ animationDelay: "1.2s" }}>
        <line x1="400" y1="400" x2="200" y2="200" stroke="rgba(220,38,38,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
        <line x1="400" y1="400" x2="600" y2="200" stroke="rgba(220,38,38,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
        <line x1="400" y1="400" x2="200" y2="600" stroke="rgba(220,38,38,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
        <line x1="400" y1="400" x2="600" y2="600" stroke="rgba(220,38,38,0.04)" strokeWidth="0.5" strokeDasharray="3 6" />
      </g>
    </svg>
  );
}

