"use client";

import { ScrollReveal } from "./scroll-reveal";

const torsoUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/5b88f9da-9452-4e06-bb8b-9007ab3988cb.jpg";

export function Skills() {
  const skillCategories = [
    { label: "Programming & Software", items: ["Python", "TypeScript / JavaScript", "C / C++", "MATLAB", "React", "Node.js"], note: "Systems and signal processing" },
    { label: "Machine Learning & AI", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Signal Classification", "Time-Series Analysis", "Deep Learning"], note: "Neural decoding and pattern detection" },
    { label: "Neural Engineering", items: ["EEG Signal Processing", "BCI System Design", "Electrode Montage Strategy", "Real-Time Biosignal Analysis", "Neurophysiology"], note: "Brain-computer interfaces" },
    { label: "Mathematics & Theory", items: ["Linear Algebra", "Differential Equations", "Probability & Statistics", "Computational Theory", "Game Theory", "Biophysical Modeling"], note: "Formal foundations" },
    { label: "Systems & Infrastructure", items: ["Linux / Unix", "Git / CI-CD", "Cloud Deployment", "API Design", "Database Architecture"], note: "Engineering at scale" },
    { label: "Hardware & Lab", items: ["Oscilloscope", "Microcontroller Programming", "Circuit Design", "Lab Equipment", "Data Acquisition"], note: "Bridging digital and physical" },
  ];

  return (
    <section id="skills" className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36">
      {/* Torso wireframe — embedded screen blend on the left */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-0 top-0 h-full w-1/2 bg-contain bg-left bg-no-repeat"
          style={{
            backgroundImage: `url(${torsoUrl})`,
            opacity: "0.08",
            mixBlendMode: "screen" as const,
            filter: "grayscale(100%) brightness(1.5) contrast(1.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, transparent 20%, #080808 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            / Skills
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
            Technical toolchain
          </h2>
        </ScrollReveal>

        <div className="mt-12 grid gap-px border border-border-subtle bg-border-subtle sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, i) => (
            <ScrollReveal key={cat.label} className="h-full" delay={100 + i * 80}>
              <div className="group/card h-full bg-black-card/90 p-6 backdrop-blur-sm transition-all duration-400 hover:bg-black-elevated/90 lg:p-8">
                <div className="relative flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-vermilion/40 transition-all duration-300 group-hover/card:bg-vermilion group-hover/card:shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
                  <div className="flex-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">{cat.note}</div>
                </div>
                <h3 className="mt-3 font-display text-base font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover/card:text-vermilion/90">{cat.label}</h3>
                <ul className="mt-4 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="group/item flex items-center gap-2 font-body text-sm text-text-secondary transition-all duration-300 hover:text-text-primary">
                      <span className="relative flex h-2 w-2 items-center justify-center">
                        <span className="absolute h-[3px] w-[3px] bg-vermilion/50 transition-all duration-300 group-hover/item:h-[5px] group-hover/item:w-[5px] group-hover/item:bg-vermilion" />
                      </span>
                      <span className="transition-all duration-300 group-hover/item:translate-x-1">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-vermilion/30 to-transparent transition-all duration-500 group-hover/card:w-full" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

