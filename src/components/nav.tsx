"use client";

import { useEffect, useState } from "react";

interface NavProps {
  mode: "professional" | "personal";
}

const profItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const personalItems = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Architecture", href: "#architecture" },
  { label: "Manga & Art", href: "#manga-art" },
  { label: "Gaming", href: "#gaming" },
  { label: "History", href: "#history" },
  { label: "Mathematics", href: "#mathematics" },
  { label: "Contact", href: "#contact" },
];

export function Nav({ mode }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = mode === "professional" ? profItems : personalItems;
  const otherMode = mode === "professional" ? "personal" : "professional";
  const otherHref = mode === "professional" ? "/personal" : "/";

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border-subtle bg-black-deep/90 backdrop-blur-lg"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 lg:px-12">
        <a
          href={mode === "professional" ? "/" : "/personal"}
          className="font-display text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-vermilion"
        >
          FZ<span className="text-vermilion">.</span>
        </a>

        <div className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-text-secondary transition-colors hover:text-text-primary"
            >
              {item.label}
            </a>
          ))}

          {/* Mode toggle */}
          <div className="ml-4 flex items-center gap-1 border-l border-border-subtle pl-4">
            <a
              href={otherHref}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
                mode === "professional"
                  ? "text-vermilion"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Professional
            </a>
            <span className="text-[10px] text-text-muted">/</span>
            <a
              href={otherHref}
              className={`px-3 py-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-all ${
                mode === "personal"
                  ? "text-vermilion"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              Personal
            </a>
          </div>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-[3px] md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-[1.5px] w-5 bg-text-secondary transition-all ${
              mobileOpen ? "translate-y-[4.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-text-secondary transition-all ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-[1.5px] w-5 bg-text-secondary transition-all ${
              mobileOpen ? "-translate-y-[4.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-border-subtle bg-black-deep/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col px-6 py-4">
            {/* Mode toggle in mobile */}
            <div className="mb-3 flex gap-3 border-b border-border-subtle pb-3">
              <a
                href="/"
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                  mode === "professional" ? "text-vermilion" : "text-text-muted"
                }`}
              >
                Professional
              </a>
              <span className="text-text-muted">/</span>
              <a
                href="/personal"
                onClick={() => setMobileOpen(false)}
                className={`font-mono text-[11px] uppercase tracking-[0.18em] ${
                  mode === "personal" ? "text-vermilion" : "text-text-muted"
                }`}
              >
                Personal
              </a>
            </div>
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="border-b border-border-subtle py-3 font-mono text-xs uppercase tracking-[0.18em] text-text-secondary last:border-0 hover:text-text-primary"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
