"use client";

import { useEffect, useRef } from "react";

const dualityUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/320ecb11-728f-41d9-b8f6-44f1eec2ce63.jpg";

interface DualityBridgeProps {
  from: "professional" | "personal";
}

export function DualityBridge({ from }: DualityBridgeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const otherMode = from === "professional" ? "personal" : "professional";
  const otherHref = from === "professional" ? "/personal" : "/";
  const otherLabel = from === "professional" ? "Personal" : "Professional";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative z-10 h-[80dvh] min-h-[500px] overflow-hidden border-t border-border-subtle">
      {/* The image — full-bleed, painterly */}
      <div className="absolute inset-0">
        <img
          src={dualityUrl}
          alt=""
          className="h-full w-full object-cover"
          style={{ filter: "contrast(1.1) saturate(0.9)" }}
        />
        {/* Dark overlays on each side to match the page theme */}
        <div
          className="absolute inset-y-0 left-0 w-1/3"
          style={{
            background: "linear-gradient(to right, #080808 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-1/3"
          style={{
            background: "linear-gradient(to left, #080808 0%, transparent 100%)",
          }}
        />
        {/* Bottom fade into next section */}
        <div
          className="absolute bottom-0 left-0 right-0 h-1/4"
          style={{
            background: "linear-gradient(to top, #080808 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Content overlay */}
      <div
        ref={ref}
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-1000"
        style={{ transform: "translateY(20px)" }}
      >
        <div className="relative flex w-full max-w-[1000px] items-center justify-between px-8 lg:px-12">
          {/* Professional side (left — daylight) */}
          <div className="flex flex-col items-start gap-3 text-left">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-amber-200/70">
              Engineering
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white/90 lg:text-4xl">
              Professional
            </span>
            {from === "personal" && (
              <a
                href={otherHref}
                className="mt-2 border border-white/30 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 transition-all hover:border-white/70 hover:text-white"
              >
                View Professional
              </a>
            )}
          </div>

          {/* Center pillar — the figure */}
          <div className="flex flex-col items-center gap-2">
            <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/30">
              {from === "professional" ? "Explore" : "Return to"}
            </span>
            <span className="font-display text-sm font-semibold tracking-tight text-white/60">
              DUALITY
            </span>
          </div>

          {/* Personal side (right — night/cosmos) */}
          <div className="flex flex-col items-end gap-3 text-right">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-blue-300/70">
              Inquiry
            </span>
            <span className="font-display text-2xl font-bold tracking-tight text-white/90 lg:text-4xl">
              Personal
            </span>
            {from === "professional" && (
              <a
                href={otherHref}
                className="mt-2 border border-white/30 px-5 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 transition-all hover:border-white/70 hover:text-white"
              >
                View Personal
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

