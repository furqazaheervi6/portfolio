"use client";

import { useState, useEffect, useRef, type CSSProperties, type MouseEvent } from "react";

type ProjectTab = "software" | "neurotech" | "coming-soon";

const tabs: { key: ProjectTab; label: string }[] = [
  { key: "software", label: "Software" },
  { key: "neurotech", label: "Neurotech" },
  { key: "coming-soon", label: "Coming Soon" },
];

const circuitUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/2b36a9a7-79fb-4b23-8b40-8a10e3ed0eff.jpg";
const eyeUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/a714eed5-3994-49c4-83e0-0b742c3c4d72.jpg";
const torsoUrl = "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/5b88f9da-9452-4e06-bb8b-9007ab3988cb.jpg";

function CursorRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const revealStyle = {
    WebkitMaskImage:
      "radial-gradient(circle 76px at var(--reveal-x, 50%) var(--reveal-y, 50%), black 0%, black 48%, transparent 100%)",
    maskImage:
      "radial-gradient(circle 76px at var(--reveal-x, 50%) var(--reveal-y, 50%), black 0%, black 48%, transparent 100%)",
  } as CSSProperties;

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--reveal-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--reveal-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      className={`group/reveal relative select-none ${className}`}
      onMouseMove={handleMove}
    >
      <p className="font-body text-sm leading-relaxed text-text-secondary opacity-60 blur-[3px]">
        {text}
      </p>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 font-body text-sm leading-relaxed text-text-primary opacity-0 transition-opacity duration-150 group-hover/reveal:opacity-100"
        style={revealStyle}
      >
        {text}
      </p>
    </div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("software");
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabContentRef.current) return;
    tabContentRef.current.style.opacity = "0";
    tabContentRef.current.style.transform = "translateY(8px)";
    requestAnimationFrame(() => {
      if (!tabContentRef.current) return;
      tabContentRef.current.style.opacity = "1";
      tabContentRef.current.style.transform = "translateY(0)";
    });
  }, [activeTab]);

  return (
    <section
      id="projects"
      className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      {/* Torso wireframe — embedded with screen blend */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-1/2 bg-contain bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${torsoUrl})`,
            opacity: "0.1",
            mixBlendMode: "screen" as const,
            filter: "grayscale(100%) brightness(1.5) contrast(1.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to left, transparent 30%, #080808 80%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
          / Projects
        </div>

        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Systems I have built
        </h2>

        {/* Tab bar */}
        <div className="mt-10 flex gap-1 border-b border-border-subtle">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 pb-3 pt-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all ${
                activeTab === tab.key
                  ? "text-text-primary"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-vermilion" />
              )}
            </button>
          ))}
        </div>

        <div
          ref={tabContentRef}
          className="mt-10 transition-all duration-400 ease-out"
        >
          {activeTab === "software" && <SoftwareProjects />}
          {activeTab === "neurotech" && <NeurotechProjects />}
          {activeTab === "coming-soon" && <ComingSoonProjects />}
        </div>
      </div>
    </section>
  );
}

function AnimatedSignalBars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    let time = 0;

    function draw() {
      if (!canvas || !ctx) return;
      time += 0.03;
      const w = canvas.width;
      const h = canvas.height;
      const barCount = 36;
      const barW = (w - (barCount - 1) * 2) / barCount;
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < barCount; i++) {
        const phase = i * 0.4 + time;
        const v = Math.min(Math.sin(phase) * 0.5 + 0.5 + Math.sin(phase * 2.1 + 1.3) * 0.3 + Math.cos(phase * 0.7) * 0.2, 1);
        const barH = Math.max(2, v * h);
        const isActive = v > 0.55;
        ctx.fillStyle = isActive
          ? `rgba(220, 38, 38, ${0.4 + v * 0.4})`
          : `rgba(255, 255, 255, ${0.04 + v * 0.08})`;
        ctx.fillRect(i * (barW + 2), h - barH, barW, barH);
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return <canvas ref={canvasRef} className="h-8 w-full" />;
}

function SoftwareProjects() {
  return (
    <div className="space-y-16">
      <div className="group grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {/* ZON3 world-model dashboard with circuit background */}
        <div className="relative overflow-hidden border border-border-card bg-black-elevated transition-all duration-500 group-hover:border-vermilion/20 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.04)]">
          {/* Circuit schematic — screen-blended inside the dashboard card */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `url(${circuitUrl})`,
              backgroundSize: "280px 280px",
              opacity: "0.1",
              mixBlendMode: "screen" as const,
              filter: "grayscale(100%) brightness(2) contrast(1.5)",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: "linear-gradient(135deg, transparent 30%, #080808 70%)",
            }}
          />

          <div className="relative border-b border-border-subtle px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-vermilion/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                ZON3 — World Model
              </span>
            </div>
          </div>
          <div className="relative p-5 font-mono text-[11px] text-text-secondary">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-20 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Perception Bus
                </span>
                <div className="flex-1">
                  <AnimatedSignalBars />
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
                <span className="w-20 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Planner
                </span>
                <div className="flex flex-1 gap-2">
                  {["Perception", "Prediction", "Trajectory"].map((l) => (
                    <span key={l} className="border border-border-subtle px-2 py-1 text-[10px] uppercase tracking-[0.1em] text-text-secondary transition-colors hover:border-vermilion/30">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-border-subtle pt-4">
                <span className="w-20 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Pipeline
                </span>
                <div className="flex flex-1 gap-3 text-[10px] uppercase tracking-[0.1em] text-text-muted">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    Recorded Runs
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" style={{ animationDelay: "0.5s" }} />
                    Replay Harness
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-vermilion/60 animate-pulse" style={{ animationDelay: "1s" }} />
                    Regression Check
                  </span>
                </div>
              </div>
              <div className="border-t border-border-subtle pt-4">
                <div className="mb-3 text-[10px] uppercase tracking-[0.12em] text-text-muted">
                  Replay Checks
                </div>
                <div className="space-y-1.5">
                  {[
                    { label: "World-model drift", range: "vs. recorded run", conf: "0.4%", barW: "4%" },
                    { label: "Trajectory error", range: "closed-loop replay", conf: "1.2%", barW: "12%" },
                    { label: "Regression coverage", range: "recorded scenarios", conf: "97%", barW: "97%" },
                  ].map((p) => (
                    <div key={p.label} className="group/row overflow-hidden border border-border-subtle px-3 py-2 transition-all duration-300 hover:border-vermilion/20 hover:bg-black-surface/50">
                      <div className="relative flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="h-1.5 w-1.5 rounded-full bg-vermilion/50 transition-all group-hover/row:bg-vermilion group-hover/row:shadow-[0_0_6px_rgba(220,38,38,0.4)]" />
                          <span className="text-[11px] text-text-secondary transition-colors group-hover/row:text-text-primary">{p.label}</span>
                        </div>
                        <span className="text-[10px] text-text-muted">{p.range}</span>
                        <span className="font-mono text-[10px] text-vermilion/70">{p.conf}</span>
                      </div>
                      <div className="mt-1.5 h-[2px] w-full bg-border-subtle">
                        <div className="h-full bg-vermilion/30 transition-all duration-700 group-hover/row:bg-vermilion/50" style={{ width: p.barW }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
            Featured Project
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary lg:text-3xl">
            ZON3
          </h3>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
            World-Model Architecture &amp; Closed-Loop Simulation
          </div>
          <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
            A vision-first perception and planning architecture: per-sensor
            input into a unified world model, multi-agent state prediction,
            and trajectory planning across multiple independently acting
            agents. Validated through a closed-loop replay harness that
            scores every change against the same recorded dataset, so a
            regression surfaces in simulation before it ever reaches
            hardware.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["World Models", "Simulation", "Trajectory Planning", "Closed-Loop Replay"].map((tag) => (
              <span key={tag} className="border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-vermilion/30 hover:text-vermilion">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function NeurotechProjects() {
  const pipelineSteps = [
    { title: "Assistive Goal", desc: "Restore communication for individuals with locked-in syndrome through real-time neural decoding of imagined speech from EEG signals." },
    { title: "Headset System", desc: "Custom electrode placement targeting motor cortex (C3, Cz, C4) with active shielding and 256 Hz sampling for high-fidelity signal capture." },
    { title: "Electrode Strategy", desc: "14-channel dry-electrode montage optimized for signal-to-noise ratio in non-laboratory environments, with ICA-based artifact rejection." },
    { title: "Signal Processing", desc: "Bandpass filtering (0.5-50 Hz), common average referencing, and wavelet denoising pipeline running at sub-100ms latency." },
    { title: "Model Evaluation", desc: "CNN-LSTM hybrid architecture achieving 82% accuracy across 4-class imagined speech classification with subject-independent transfer learning." },
  ];

  const [activeStep, setActiveStep] = useState(0);
  const pipelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pipelineRef.current) return;
    pipelineRef.current.style.opacity = "0";
    pipelineRef.current.style.transform = "translateY(6px)";
    requestAnimationFrame(() => {
      if (!pipelineRef.current) return;
      pipelineRef.current.style.opacity = "1";
      pipelineRef.current.style.transform = "translateY(0)";
    });
  }, [activeStep]);

  return (
    <div className="space-y-12">
      <div className="group grid gap-10 lg:grid-cols-[1.2fr_1.3fr]">
        {/* EEG headset with eye schematic background */}
        <div className="relative flex items-center justify-center overflow-hidden border border-border-card bg-black-elevated p-10 transition-all duration-500 group-hover:border-vermilion/20">
          {/* Eye schematic — screen-blended behind the EEG visual */}
          <div
            className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${eyeUrl})`,
              opacity: "0.15",
              mixBlendMode: "screen" as const,
              filter: "grayscale(100%) brightness(2) contrast(1.4)",
            }}
          />
          <div className="relative">
            <svg viewBox="0 0 200 200" className="h-[200px] w-[200px] lg:h-[260px] lg:w-[260px]" fill="none">
              <g className="animate-rotate-slow origin-[100px_105px]">
                <ellipse cx="100" cy="105" rx="82" ry="88" stroke="rgba(220,38,38,0.06)" strokeWidth="0.5" strokeDasharray="3 6" fill="none" />
              </g>
              <ellipse cx="100" cy="105" rx="72" ry="78" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" fill="none" />
              {[
                { x: 100, y: 30, label: "Fz" }, { x: 65, y: 50, label: "F3" }, { x: 135, y: 50, label: "F4" },
                { x: 100, y: 75, label: "Cz" }, { x: 55, y: 85, label: "C3" }, { x: 145, y: 85, label: "C4" },
                { x: 100, y: 110, label: "Pz" }, { x: 60, y: 120, label: "P3" }, { x: 140, y: 120, label: "P4" },
                { x: 100, y: 150, label: "Oz" },
              ].map((el, i) => (
                <g key={i}>
                  <circle cx={el.x} cy={el.y} r={8} fill={`rgba(220,38,38,${0.02 + Math.sin(Date.now() * 0.001 + i) * 0.01})`} className="animate-pulse-node" style={{ animationDelay: `${i * 0.15}s` }} />
                  <circle cx={el.x} cy={el.y} r={5} fill={i < 5 ? "#DC2626" : "rgba(255,255,255,0.15)"} opacity={i < 5 ? 0.7 : 1} className={i < 5 ? "animate-pulse-node" : ""} style={{ animationDelay: `${i * 0.2}s` }} />
                  <text x={el.x} y={el.y - 10} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="JetBrains Mono, monospace">{el.label}</text>
                </g>
              ))}
              {[0, 1, 2].map((row) => (
                <g key={row} className="animate-draw-line" style={{ animationDelay: `${0.5 + row * 0.3}s` }}>
                  <path d={`M 55 ${85 + row * 25} Q ${70 + Math.sin(Date.now() * 0.001 + row) * 3} ${80 + row * 25}, 85 ${85 + row * 25} T 115 ${85 + row * 25} T 145 ${85 + row * 25}`} stroke="rgba(220,38,38,0.08)" strokeWidth="0.5" fill="none" />
                </g>
              ))}
              <line x1={100} y1={40} x2={100} y2={160} stroke="rgba(220,38,38,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
              <line x1={40} y1={100} x2={160} y2={100} stroke="rgba(220,38,38,0.12)" strokeWidth="0.5" strokeDasharray="4 4" />
            </svg>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
            Case Study
          </div>
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary lg:text-3xl">
            MINT / MindTap
          </h3>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
            EEG-based BCI for Assistive Communication
          </div>
          <div className="mt-6 flex gap-2">
            {pipelineSteps.map((_, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`h-1 flex-1 transition-all duration-500 ${i === activeStep ? "bg-vermilion" : "bg-border-subtle hover:bg-text-muted/30"}`} />
            ))}
          </div>
          <div ref={pipelineRef} className="mt-6 min-h-[180px] transition-all duration-400">
            <div className="flex items-center gap-3">
              <span className="font-mono text-[11px] text-vermilion">{String(activeStep + 1).padStart(2, "0")}</span>
              <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-text-primary">{pipelineSteps[activeStep].title}</h4>
            </div>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">{pipelineSteps[activeStep].desc}</p>
          </div>
          <div className="mt-4 flex gap-2">
            {pipelineSteps.map((_, i) => (
              <button key={i} onClick={() => setActiveStep(i)} className={`h-2 w-2 rounded-full transition-all duration-300 ${i === activeStep ? "bg-vermilion shadow-[0_0_8px_rgba(220,38,38,0.3)]" : "bg-border-subtle hover:bg-text-muted/40"}`} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            {["BCI", "EEG", "Signal Processing", "Deep Learning"].map((tag) => (
              <span key={tag} className="border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-vermilion/30 hover:text-vermilion">{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ComingSoonProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = [
    {
      title: "AEGIR",
      desc: "An adaptive edge AI inference runtime that routes workloads across device, edge, and cloud based on latency, battery, privacy, and model constraints.",
      tags: ["Edge AI", "Rust", "Kubernetes"],
    },
    {
      title: "ANTHEON",
      desc: "A noninvasive neural input layer for high-stakes operators, decoding blink and wink intent into low-latency embedded commands.",
      tags: ["BCI", "Embedded", "Neurotech"],
    },
    {
      title: "ARCHON",
      desc: "An enterprise AI agent evaluation and optimization platform for tracing, benchmarking, tuning, and safely rolling out production agents.",
      tags: ["AI Agents", "Evaluation", "MLOps"],
    },
    {
      title: "AREOLES",
      desc: "An offline edge neuro and health copilot that pairs wearable sensor inference with local mobile LLM reasoning and adaptive cloud fallback.",
      tags: ["Wearables", "On-device AI", "Health"],
    },
    {
      title: "AXION",
      desc: "A natural-language automation builder for business workflows, designed around durable skills, connectors, and human-in-the-loop execution.",
      tags: ["Automation", "MCP", "Workflow"],
    },
    {
      title: "DOMINION",
      desc: "A smart ANC orchestrator that predicts hearing mode and intensity from context, reducing manual noise-control switching for daily operators.",
      tags: ["Audio ML", "Consumer AI", "UX"],
    },
    {
      title: "DORY",
      desc: "A Nemotron fine-tuning SOP and infrastructure stack with dataset preparation, LoRA training, adapter merging, benchmarks, and deployment recipes.",
      tags: ["Fine-tuning", "NVIDIA", "CLI"],
    },
    {
      title: "MERCURION",
      desc: "A clinical-first neurocommunication system for silent, structured intent transfer using noninvasive neural signals and secure output channels.",
      tags: ["Neurocommunication", "EEG", "Assistive Tech"],
    },
    {
      title: "NOUMA",
      desc: "An adaptive game director SDK for AI-native mobile games, tuning difficulty, rewards, and mission pressure from live player telemetry.",
      tags: ["Game AI", "Unity", "Live Ops"],
    },
    {
      title: "THEOS",
      desc: "An AI-ready SharePoint governance control plane that scores, remediates, and certifies enterprise content for Copilot grounding.",
      tags: ["Microsoft 365", "Governance", "Copilot"],
    },
    {
      title: "TYCHAN",
      desc: "A real-time irregular operations command layer for airlines, fusing weather, airspace, crew, aircraft, and passenger constraints.",
      tags: ["Aviation", "Optimization", "Operations"],
    },
    {
      title: "VIGIL",
      desc: "A physics-grounded RF debugging copilot that ingests datasheets, S-parameters, and lab notes to produce ranked diagnostic plans.",
      tags: ["RF", "Hardware AI", "Diagnostics"],
    },
    {
      title: "RunLedger",
      desc: "A data and telemetry tool built around immutable run history and failure capture. Status-machine checks gate every state transition so a run's recorded history cannot drift from what actually executed.",
      tags: ["Python", "FastAPI", "PostgreSQL", "CI"],
    },
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {projects.map((p, i) => (
        <div
          key={p.title}
          className="group/card relative overflow-hidden border border-border-card bg-black-elevated p-6 transition-all duration-500 hover:border-vermilion/25"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span className={`absolute right-0 top-0 h-0 w-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-vermilion/20 transition-all duration-500 ${hoveredIndex === i ? "opacity-100" : "opacity-0"}`} />
          <span className={`absolute left-0 top-0 h-[1px] bg-vermilion/30 transition-all duration-700 ${hoveredIndex === i ? "w-full" : "w-0"}`} />
          <h4 className="font-display text-lg font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover/card:text-vermilion/90">{p.title}</h4>
          <CursorRevealText className="mt-2" text={p.desc} />
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="border border-border-subtle px-2 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted transition-colors group-hover/card:border-vermilion/20 group-hover/card:text-vermilion/60">{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
