"use client";

import { useEffect, useRef } from "react";

export function CircuitTrace() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // Trigger CSS animation on mount
    requestAnimationFrame(() => {
      svg.style.opacity = "1";
    });
  }, []);

  return (
    <svg
      ref={svgRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      viewBox="0 0 1440 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Horizontal bus lines */}
      <g>
        {[20, 50, 80].map((y, i) => (
          <g key={i}>
            <line
              x1="0"
              y1={y}
              x2="1440"
              y2={y}
              stroke="rgba(220,38,38,0.03)"
              strokeWidth="0.5"
              strokeDasharray="8 12"
              className="animate-draw-line"
              style={{ animationDelay: `${i * 0.3}s`, strokeDasharray: 2000 }}
            />
            {/* Vertical taps */}
            {[200, 500, 800, 1100, 1400].map((x) => (
              <line
                key={x}
                x1={x}
                y1={y}
                x2={x}
                y2={y + 30}
                stroke="rgba(220,38,38,0.02)"
                strokeWidth="0.5"
                className="animate-draw-line"
                style={{ animationDelay: `${0.5 + i * 0.3 + x * 0.0005}s`, strokeDasharray: 50 }}
              />
            ))}
          </g>
        ))}
      </g>

      {/* Via dots */}
      {[200, 500, 800, 1100, 1400].map((x) => (
        <g key={x}>
          {[20, 50, 80].map((y) => (
            <circle
              key={y}
              cx={x}
              cy={y}
              r="1.5"
              fill="rgba(220,38,38,0.06)"
              className="animate-pulse-node"
              style={{ animationDelay: `${x * 0.001 + y * 0.01}s` }}
            />
          ))}
        </g>
      ))}

      {/* Diagonal routing lines */}
      <path
        d="M100 80 L200 20 L300 80 L400 20 L500 80"
        stroke="rgba(220,38,38,0.02)"
        strokeWidth="0.5"
        fill="none"
        className="animate-draw-line"
        style={{ animationDelay: "1s", strokeDasharray: 1000 }}
      />
      <path
        d="M700 20 L800 80 L900 20 L1000 80 L1100 20"
        stroke="rgba(220,38,38,0.02)"
        strokeWidth="0.5"
        fill="none"
        className="animate-draw-line"
        style={{ animationDelay: "1.3s", strokeDasharray: 1000 }}
      />

      {/* Signal pulse dots traveling on the bus */}
      {[200, 500, 800, 1100].map((x, i) => (
        <circle
          key={x}
          cx={x}
          cy={50}
          r="1"
          fill="rgba(220,38,38,0.15)"
          className="animate-pulse-node"
          style={{ animationDelay: `${i * 0.5}s` }}
        />
      ))}
    </svg>
  );
}

