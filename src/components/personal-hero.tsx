"use client";

import { useEffect, useRef } from "react";
import { TypeDecrypt } from "./type-decrypt";

const personalHeroBackgroundUrl = "/images/personal-samurai-jack.jpeg";

export function PersonalHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, []);

  return (
    <section
      id="personal-hero"
      className="isolate relative z-10 flex min-h-[80dvh] items-center justify-center overflow-hidden px-6 pt-24 lg:px-12"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${personalHeroBackgroundUrl})`,
          filter: "saturate(0.85) contrast(1.08) brightness(0.48)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.82)_0%,rgba(8,8,8,0.42)_50%,rgba(8,8,8,0.76)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.68)_0%,rgba(8,8,8,0.2)_45%,rgba(8,8,8,0.78)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.02)_0%,transparent_60%)]" />

      <div
        ref={ref}
        className="relative z-20 mx-auto max-w-[1000px] text-center opacity-0 drop-shadow-[0_12px_38px_rgba(0,0,0,0.78)] transition-all duration-1000"
        style={{ transform: "translateY(24px)" }}
      >
        {/* Scanning line */}
        <div className="relative mx-auto mb-6 h-[1px] w-24 overflow-hidden">
          <div className="absolute inset-0 animate-scan-line bg-vermilion/20" />
        </div>

        <div className="mb-4 flex animate-fade-in-up items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
          <span>Personal</span>
          <span className="h-[1px] w-3 bg-text-muted/40" />
          <span>Inquiry</span>
        </div>

        <h1 className="animate-letter-fade font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.9] tracking-[-0.04em] text-text-primary" style={{ animationDelay: "0.3s" }}>
          Domains of
          <br />
          <span className="text-vermilion">intellectual pursuit</span>
        </h1>

        <div className="mx-auto mt-6 max-w-[600px] animate-fade-in-up" style={{ animationDelay: "0.6s", animationFillMode: "both" }}>
          <TypeDecrypt
            text="Architecture, visual storytelling, worldbuilding, history, and mathematics — each a lens through which I understand structure, narrative, power, and the formal language of reality."
            className="font-body text-[clamp(0.9rem,1.4vw,1.1rem)] font-light leading-relaxed text-text-secondary"
            speed={16}
            delay={1000}
          />
        </div>

        <div className="mt-10 flex animate-fade-in-up flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted" style={{ animationDelay: "0.8s", animationFillMode: "both" }}>
          <a href="#philosophy" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Philosophy
          </a>
          <a href="#architecture" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Architecture
          </a>
          <a href="#manga-art" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Manga & Art
          </a>
          <a href="#gaming" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Gaming
          </a>
          <a href="#worldbuilding" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Worldbuilding
          </a>
          <a href="#history" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            History
          </a>
          <a href="#mathematics" className="border border-border-subtle px-4 py-2 transition-colors hover:border-vermilion/30 hover:text-vermilion">
            Mathematics
          </a>
        </div>
      </div>
    </section>
  );
}
