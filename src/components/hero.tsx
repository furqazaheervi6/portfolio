"use client";

import { useEffect, useRef } from "react";
import { HeroRing } from "./hero-ring";
import { MouseTilt } from "./mouse-tilt";
import { WordReveal } from "./word-reveal";

const mechanicalOrganismUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/bc44fc3a-63bf-49c2-918d-a1d83c2ae748.jpg";
const mahoragaUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/c2701bef-3191-492e-a965-921228b08dbe.jpg";
const mahoragaGifUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/b4274feb-67d2-4eac-b1cd-36d6cd114cd5.gif";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }, []);

  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-[100dvh] items-center justify-center overflow-hidden px-6 pt-24 lg:px-12"
    >
      {/* Biomechanical background — embedded with screen blend */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${mechanicalOrganismUrl})`,
            opacity: "0.18",
            mixBlendMode: "screen" as const,
            filter: "grayscale(100%) contrast(1.6) brightness(1.2)",
          }}
        />
        {/* Edge fade — radial mask so the image disappears into the edges */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 30%, #080808 100%)",
          }}
        />
        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black-deep via-transparent to-black-deep/40" />
      </div>

      {/* Mahoraga wheel — animated GIF, large overarching figure */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-96 w-96 -translate-x-1/2 -translate-y-1/2 lg:h-[1000px] lg:w-[1000px]" style={{ mixBlendMode: "screen" as const, opacity: "0.18" }}>
        <img
          src={mahoragaGifUrl}
          alt=""
          className="h-full w-full object-contain"
          style={{ filter: "grayscale(100%) brightness(2) contrast(1.3)" }}
        />
      </div>

      {/* Second wheel — lower left, smaller, static */}
      <div className="pointer-events-none absolute bottom-[18%] left-[5%] z-0 h-16 w-16 lg:h-24 lg:w-24" style={{ mixBlendMode: "screen" as const, opacity: "0.05" }}>
        <img
          src={mahoragaUrl}
          alt=""
          className="h-full w-full object-contain"
          style={{ filter: "grayscale(100%) brightness(2) contrast(1.3)" }}

        />
      </div>
      {/* Animated geometric ring backdrop */}
      <HeroRing />

      {/* Radial vermillion vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,38,38,0.02)_0%,transparent_60%)]" />

      <div
        ref={ref}
        className="relative mx-auto max-w-[1200px] text-center opacity-0 transition-all duration-1000"
        style={{ transform: "translateY(24px)" }}
      >
        {/* Scanning line */}
        <div className="relative mx-auto mb-8 h-[1px] w-32 overflow-hidden">
          <div className="absolute inset-0 animate-scan-line bg-vermilion/30" />
        </div>

        {/* Eyebrow */}
        <div
          className="mb-8 flex animate-fade-in-up items-center justify-center gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-text-muted"
          style={{ animationDelay: "0.2s", animationFillMode: "both" }}
        >
          <span>Biophysics</span>
          <span className="h-[1px] w-4 bg-text-muted/40" />
          <span>Neural Engineering</span>
          <span className="h-[1px] w-4 bg-text-muted/40" />
          <span>ML</span>
        </div>

        {/* Name — with 3D mouse tilt */}
        <MouseTilt maxTilt={4} scale={1.01} className="inline-block cursor-default">
          <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-bold leading-[0.9] tracking-[-0.04em] text-text-primary">
            {Array.from("Furqan").map((char, i) => (
              <span
                key={`f-${i}`}
                className="hero-letter inline-block animate-letter-fade"
                style={{ animationDelay: `${i * 0.06}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
            <br />
            {Array.from("Zaheer").map((char, i) => (
              <span
                key={`z-${i}`}
                className="hero-letter inline-block animate-letter-fade"
                style={{ animationDelay: `${0.5 + i * 0.06}s` }}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h1>
        </MouseTilt>

        {/* Vermillion accent underline */}
        <div
          className="mx-auto mt-2 h-[2px] w-0 animate-line-grow bg-vermilion/40"
          style={{ animationDelay: "1.4s", animationFillMode: "both" }}
        />

        {/* Positioning line — word-by-word reveal */}
        <div
          className="relative mx-auto mt-6 flex w-fit animate-fade-in-up items-center justify-center text-center"
          style={{ animationDelay: "0.8s", animationFillMode: "both" }}
        >
          <WordReveal
            text="Welcome to my infinity"
            className="relative z-10 font-body text-[clamp(1.15rem,2vw,1.55rem)] font-semibold leading-relaxed text-text-primary"
            wordDelay={200}
            staggerMs={50}
          />
          <svg
            aria-hidden="true"
            viewBox="0 0 96 48"
            className="animate-infinity-pulse pointer-events-none absolute left-1/2 top-1/2 z-0 h-20 w-40 overflow-visible text-vermilion"
          >
            <path
              d="M48 24C36 8 20 8 11 17c-8 8-8 22 0 30 9 9 25 8 37-23Zm0 0c12 16 28 16 37 7 8-8 8-22 0-30-9-9-25-8-37 23Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="9"
              opacity="0.12"
              transform="translate(3 4)"
            />
            <path
              d="M48 24C36 8 20 8 11 17c-8 8-8 22 0 30 9 9 25 8 37-23Zm0 0c12 16 28 16 37 7 8-8 8-22 0-30-9-9-25-8-37 23Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="5"
              opacity="0.34"
              filter="drop-shadow(0 0 14px rgba(220, 38, 38, 0.7))"
            />
            <path
              d="M48 24C36 8 20 8 11 17c-8 8-8 22 0 30 9 9 25 8 37-23Zm0 0c12 16 28 16 37 7 8-8 8-22 0-30-9-9-25-8-37 23Z"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              opacity="0.3"
            />
          </svg>
        </div>

        {/* Academic tags */}
        <div
          className="mt-8 flex animate-fade-in-up flex-wrap items-center justify-center gap-3 font-mono text-[11px] uppercase tracking-[0.15em] text-text-muted"
          style={{ animationDelay: "1s", animationFillMode: "both" }}
        >
          {["Biophysics", "Neural Engineering", "Machine Learning", "Biological Systems"].map((tag) => (
            <span
              key={tag}
              className="group/tag relative overflow-hidden border border-border-subtle px-3 py-1.5 transition-all hover:border-vermilion/30"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-vermilion/5 to-transparent transition-transform duration-700 group-hover/tag:translate-x-full" />
              <span className="relative">{tag}</span>
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div
          className="mt-10 flex animate-fade-in-up items-center justify-center gap-4"
          style={{ animationDelay: "1.2s", animationFillMode: "both" }}
        >
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-vermilion/60 px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-vermilion transition-all"
          >
            <span className="absolute inset-0 -translate-x-full skew-x-12 bg-gradient-to-r from-transparent via-vermilion/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full border border-vermilion/60 transition-all group-hover:bg-vermilion" />
              View projects
            </span>
          </a>
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 border border-border-subtle px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary transition-all hover:border-text-secondary hover:text-text-primary"
          >
            <span className="relative z-10">Contact</span>
          </a>
        </div>

        {/* Status bar */}
        <div
          className="glow-vermilion-sm relative mx-auto mt-16 flex max-w-[560px] animate-fade-in-up items-center justify-center gap-4 overflow-hidden border border-vermilion/25 bg-vermilion/[0.035] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-vermilion/80"
          style={{ animationDelay: "1.4s", animationFillMode: "both" }}
        >
          <span className="pointer-events-none absolute inset-0 animate-pulse-subtle bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.14),transparent_65%)]" />
          <span className="relative z-10 flex animate-pulse-subtle items-center gap-2">
            <span className="relative">
              <span className="block h-1.5 w-1.5 rounded-full bg-vermilion" />
              <span className="absolute -inset-1 animate-ping rounded-full bg-vermilion/30" />
            </span>
            Open to research
          </span>
          <span className="relative z-10 animate-pulse-subtle text-text-primary">+ Winter/Spring 2027 internships</span>
        </div>
      </div>
    </section>
  );
}




