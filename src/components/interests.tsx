"use client";

import { useState, useEffect, useRef } from "react";
import { ScrollReveal } from "./scroll-reveal";
import { InterestVisual } from "./interest-visual";

type InterestKey = "architecture" | "manga" | "history" | "mathematics";

const interestData: Record<
  InterestKey,
  {
    title: string;
    subtitle: string;
    description: string;
    themes: string[];
    details: string[];
  }
> = {
  architecture: {
    title: "Architecture",
    subtitle: "Space, structure, ornament, and civic scale",
    description:
      "Architecture as the physical encoding of civilization. Victorian ornament, pure brutalism, and Islamic-inspired geometry all represent different answers to the same question: how does space shape human behavior?",
    themes: [
      "Victorian Architecture",
      "Pure Brutalism",
      "Islamic-Inspired",
      "Monumental Space",
      "Geometry & Ornament",
      "Concrete & Arches",
      "Courtyards",
      "Civic Scale",
    ],
    details: [
      "The tension between Victorian ornamental richness and brutalist structural honesty reveals the full spectrum of architectural expression.",
      "Islamic architecture's use of geometric patterns, muqarnas vaulting, and courtyard hierarchies offers a mathematical approach to sacred space.",
      "Brutalism's raw concrete and monumental scale speaks to an architecture of truth — material, structure, and program expressed without disguise.",
      "Courtyard typologies across cultures demonstrate how enclosed space mediates between private and public, human and civic.",
    ],
  },
  manga: {
    title: "Manga & Art",
    subtitle: "Dark fantasy, visual storytelling, and cosmic scale",
    description:
      "Manga and sequential art as a medium for exploring existential themes, human violence, transcendence, and the sublime. The densest storytelling per panel of any visual medium.",
    themes: [
      "Berserk — Dark Fantasy",
      "Naruto — Systemic Conflict",
      "Vinland Saga",
      "The Climber",
      "Samurai Jack",
      "Vagabond",
      "Marvel/DC Cosmic Lore",
    ],
    details: [
      "Berserk stands as the singular achievement in dark fantasy — Miura's linework, the Eclipse, and Guts' arc form a meditation on trauma, will, and the cost of vengeance.",
      "Vinland Saga's transformation from viking revenge epic to philosophical exploration of true peace is one of manga's most ambitious narrative arcs.",
      "The Climber's portrayal of solitary obsession and the silent dialogue between climber and mountain captures something uniquely human about the drive to transcend limits.",
      "Samurai Jack's geometric minimalism proves that formal restraint produces the most powerful visual storytelling — every frame is compositionally intentional.",
    ],
  },
  history: {
    title: "History",
    subtitle: "Empire, statecraft, scholarship, and the architecture of civilization",
    description:
      "History as the study of systems — how institutions rise, maintain coherence, and dissolve. Roman law, Islamic scholarship, Greek philosophy, and pre-modern statecraft as case studies in system design at civilizational scale.",
    themes: [
      "Roman Empire",
      "Greek Philosophy",
      "Islamic Golden Age",
      "Pre-Modern Statecraft",
      "Warfare & Technology",
      "Scholarship",
      "Historical Consciousness",
    ],
    details: [
      "Roman engineering, law, and institutional design created a system that sustained governance across three continents for centuries — a case study in scalable administration.",
      "The Islamic Golden Age's synthesis of Greek, Persian, and Indian knowledge created the foundation for modern science, mathematics, and medicine.",
      "Pre-modern empires understood information as infrastructure: roads, postal systems, census, and record-keeping as the backbone of state capacity.",
      "The 19th century's technological acceleration fundamentally rewired human cognition and social organization — the telegraph, railway, and factory as neural networks of their era.",
    ],
  },
  mathematics: {
    title: "Mathematics",
    subtitle: "Algebra, computation, biophysics, and the structure of reality",
    description:
      "Mathematics as the language in which the universe is written. Linear algebra as the grammar of neural computation, algebraic theory as the architecture of thought, and higher-dimensional mathematics as the terrain yet to be mapped.",
    themes: [
      "Linear Algebra",
      "Algebraic Theory",
      "Higher-Dimensional Math",
      "Biophysical Math",
      "Quantum Systems",
      "Game Theory",
    ],
    details: [
      "Linear algebra is the hidden language of neural computation — from the dot products in artificial neurons to the eigenmodes of biological neural populations.",
      "Algebraic theory and category theory provide the most general framework for understanding structure and transformation across mathematical domains.",
      "Biophysical mathematics demands bridging discrete (molecular) and continuous (field) descriptions — the same mathematical challenge as neural decoding.",
      "Game theory reveals the formal structure of strategic interaction, from evolutionary biology to economic systems to multi-agent AI alignment.",
    ],
  },
};

export function Interests() {
  const [active, setActive] = useState<InterestKey>("architecture");
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    contentRef.current.style.opacity = "0";
    contentRef.current.style.transform = "translateY(6px)";
    requestAnimationFrame(() => {
      if (!contentRef.current) return;
      contentRef.current.style.opacity = "1";
      contentRef.current.style.transform = "translateY(0)";
    });
  }, [active]);

  return (
    <section
      id="interests"
      className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            / Interests
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
            Domains of inquiry
          </h2>
        </ScrollReveal>

        {/* Interest tabs with animated indicator */}
        <div className="mt-10 flex flex-wrap gap-1 border-b border-border-subtle">
          {(Object.keys(interestData) as InterestKey[]).map((key) => (
            <button
              key={key}
              onClick={() => setActive(key)}
              className={`relative px-5 pb-3 pt-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all ${
                active === key
                  ? "text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {interestData[key].title}
              {active === key && (
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-vermilion" />
              )}
            </button>
          ))}
        </div>

        {/* Content with transition */}
        <div ref={contentRef} className="mt-8 transition-all duration-400">
          <InterestPanel data={interestData[active]} />
        </div>
      </div>
    </section>
  );
}

function InterestPanel({
  data,
}: {
  data: {
    title: string;
    subtitle: string;
    description: string;
    themes: string[];
    details: string[];
  };
}) {
  return (
    <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1.2fr]">
      <InterestVisual mode={data.title.toLowerCase().includes("manga") ? "manga" : data.title.toLowerCase().includes("architecture") ? "architecture" : data.title.toLowerCase().includes("history") ? "history" : "mathematics"} className="absolute inset-0 h-full w-full opacity-40" />
      <div>
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
          {data.subtitle}
        </div>
        <p className="font-body text-sm leading-relaxed text-text-secondary">
          {data.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {data.themes.map((theme) => (
            <span
              key={theme}
              className="group/tag border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted transition-all duration-300 hover:border-vermilion/30 hover:text-vermilion"
            >
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Right — details with animated vermillion border */}
      <div className="space-y-5">
        {data.details.map((detail, i) => (
          <div
            key={i}
            className="group/detail border-l border-vermilion/30 pl-4 transition-all duration-300 hover:border-vermilion/70"
          >
            <p className="font-body text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover/detail:text-text-primary">
              {detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



