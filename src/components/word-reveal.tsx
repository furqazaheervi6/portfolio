"use client";

import { useEffect, useRef, useState } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  wordDelay?: number;
  staggerMs?: number;
  threshold?: number;
}

export function WordReveal({
  text,
  className = "",
  wordDelay = 300,
  staggerMs = 60,
  threshold = 0.3,
}: WordRevealProps) {
  const [visibleWords, setVisibleWords] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.unobserve(el);

          setTimeout(() => {
            let i = 0;
            const interval = setInterval(() => {
              i++;
              setVisibleWords(i);
              if (i >= words.length) clearInterval(interval);
            }, staggerMs);
          }, wordDelay);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, wordDelay, staggerMs, threshold, started, words.length]);

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block"
          style={{
            opacity: i < visibleWords ? 1 : 0,
            transform: i < visibleWords ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease-out, transform 0.4s ease-out",
            transitionDelay: "0ms",
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </div>
  );
}

