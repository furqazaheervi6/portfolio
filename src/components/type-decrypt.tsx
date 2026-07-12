"use client";

import { useEffect, useState, useRef } from "react";

interface TypeDecryptProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
  chars?: string;
}

const DEFAULT_CHARS = "!<>-_\\/[]{}—=+*^?#________";

const COLORS = [
  "#DC2626", // red
  "#3B82F6", // blue
  "#9333EA", // purple
  "#A855F7", // bright purple
];

interface CharState {
  char: string;
  revealed: boolean;
  colorIndex: number;
}

export function TypeDecrypt({
  text,
  className = "",
  speed = 30,
  delay = 0,
  chars = DEFAULT_CHARS,
}: TypeDecryptProps) {
  const [charStates, setCharStates] = useState<CharState[]>(
    text.split("").map(() => ({
      char: "",
      revealed: false,
      colorIndex: 0,
    })),
  );
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.unobserve(el);

          setTimeout(() => {
            let iteration = 0;
            const totalIterations = text.length * 3;

            const tick = () => {
              setCharStates((prev) =>
                prev.map((cs, i) => {
                  const revealed = i < Math.floor(iteration / 2);
                  return {
                    char: revealed
                      ? text[i]
                      : chars[Math.floor(Math.random() * chars.length)],
                    revealed,
                    colorIndex: revealed ? 0 : Math.floor((iteration % (COLORS.length * 4)) / 4) % COLORS.length,
                  };
                }),
              );

              iteration += 1;
              if (iteration < totalIterations) {
                setTimeout(tick, speed);
              } else {
                setCharStates(
                  text.split("").map((c) => ({
                    char: c,
                    revealed: true,
                    colorIndex: 0,
                  })),
                );
              }
            };

            tick();
          }, delay);
        }
      },
      { threshold: 0.3 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, delay, chars, hasStarted]);

  return (
    <div ref={ref} className={className}>
      {charStates.map((cs, i) => (
        <span
          key={i}
          style={{
            color: cs.revealed ? "#EAEAEA" : COLORS[cs.colorIndex],
            transition: "color 0.08s ease",
          }}
        >
          {cs.char || text[i]}
        </span>
      ))}
    </div>
  );
}


