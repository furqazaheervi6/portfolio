"use client";

import { useState, useEffect, useRef } from "react";

type ProjectTab = "neurotech" | "software" | "explorations";

const tabs: { key: ProjectTab; label: string }[] = [
  { key: "neurotech", label: "Neurotech" },
  { key: "software", label: "Software" },
  { key: "explorations", label: "Explorations" },
];

const circuitUrl =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/2b36a9a7-79fb-4b23-8b40-8a10e3ed0eff.jpg";
const eyeUrl =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/a714eed5-3994-49c4-83e0-0b742c3c4d72.jpg";
const torsoUrl =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/5b88f9da-9452-4e06-bb8b-9007ab3988cb.jpg";
const ubcCoverageUrl =
  "https://engineering.ok.ubc.ca/2026/05/21/ubc-engineering-teams-sweep-podium-at-simon-cox-student-design-competition/";
const teamCreditUrl = "https://www.linkedin.com/feed/update/urn:li:ugcPost:7454802572634365952/";

export function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("neurotech");
  const tabContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tabContentRef.current) return;
    tabContentRef.current.style.opacity = "0";
    tabContentRef.current.style.transform = "translateY(8px)";
    const frame = requestAnimationFrame(() => {
      if (!tabContentRef.current) return;
      tabContentRef.current.style.opacity = "1";
      tabContentRef.current.style.transform = "translateY(0)";
    });
    return () => cancelAnimationFrame(frame);
  }, [activeTab]);

  return (
    <section
      id="projects"
      className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-1/2 bg-contain bg-right bg-no-repeat"
          style={{
            backgroundImage: `url(${torsoUrl})`,
            opacity: "0.1",
            mixBlendMode: "screen",
            filter: "grayscale(100%) brightness(1.5) contrast(1.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to left, transparent 30%, #080808 80%)" }}
        />
      </div>
      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
          / Projects
        </div>
        <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
          Selected work &amp; design explorations
        </h2>
        <p className="mt-4 max-w-2xl font-body text-sm leading-relaxed text-text-secondary">
          Team participation, design studies and future ideas, with their stages distinguished
          below.
        </p>
        <div
          className="mt-10 flex flex-wrap gap-1 border-b border-border-subtle"
          role="group"
          aria-label="Project categories"
        >
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              aria-pressed={activeTab === tab.key}
              aria-controls="project-category-content"
              className={`relative px-4 pb-3 pt-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion ${activeTab === tab.key ? "text-text-primary" : "text-text-muted hover:text-text-secondary"}`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-vermilion" />
              )}
            </button>
          ))}
        </div>
        <div
          id="project-category-content"
          ref={tabContentRef}
          className="mt-10 transition-all duration-400 ease-out"
        >
          {activeTab === "neurotech" && <NeurotechProjects />}
          {activeTab === "software" && <SoftwareProjects />}
          {activeTab === "explorations" && <ExplorationProjects />}
        </div>
      </div>
    </section>
  );
}

function ProjectTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:border-vermilion/30 hover:text-vermilion"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function SoftwareProjects() {
  const proposedStages = [
    { title: "Scenario inputs", desc: "Proposed source of evaluation cases" },
    { title: "Perception & planning", desc: "Systems to compare in a future implementation" },
    { title: "Evaluation report", desc: "Planned comparison of changes across scenarios" },
  ];

  return (
    <div className="group grid gap-10 lg:grid-cols-[1.3fr_1fr]">
      <figure className="relative overflow-hidden border border-border-card bg-black-elevated transition-all duration-500 group-hover:border-vermilion/20 group-hover:shadow-[0_0_40px_rgba(220,38,38,0.04)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `url(${circuitUrl})`,
            backgroundSize: "280px 280px",
            opacity: "0.1",
            mixBlendMode: "screen",
            filter: "grayscale(100%) brightness(2) contrast(1.5)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(135deg, transparent 30%, #080808 70%)" }}
        />
        <figcaption className="relative border-b border-border-subtle px-5 py-4 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary">
          ZON3 / Conceptual architecture / Not implemented
        </figcaption>
        <ol className="relative space-y-3 p-5">
          {proposedStages.map((stage, index) => (
            <li key={stage.title}>
              {index > 0 && (
                <div aria-hidden="true" className="mb-3 text-center text-vermilion/70">
                  ↓
                </div>
              )}
              <div className="border border-border-subtle bg-black-elevated/70 p-4">
                <h4 className="font-mono text-xs uppercase tracking-[0.1em] text-text-primary">
                  {stage.title}
                </h4>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                  {stage.desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="relative border-t border-border-subtle px-5 py-4 font-body text-xs leading-relaxed text-text-secondary">
          A static design illustration, not a running system or measured result.
        </p>
      </figure>
      <div className="flex flex-col justify-center">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
          Design only / Unimplemented
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary lg:text-3xl">
          ZON3
        </h3>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
          Autonomy evaluation design study
        </div>
        <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
          A proposed architecture for scenario-based evaluation of perception and planning systems.
          Implementation and benchmarks have not been completed.
        </p>
        <ProjectTags tags={["Design Study", "Autonomy", "Scenario Evaluation"]} />
      </div>
    </div>
  );
}

function NeurotechProjects() {
  const panels = [
    {
      title: "Purpose",
      desc: "An EEG-based assistive interface using machine learning for hands-free smartphone control.",
    },
    {
      title: "Participation",
      desc: "Credited as a member of UBC MINT's MindTap team in UBC BEST's competition announcement.",
    },
    {
      title: "Recognition",
      desc: "The team received the Innovation Award in honour of Ari Kinarthy at the 2026 Simon Cox Student Design Competition.",
    },
  ];
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="group grid gap-10 lg:grid-cols-[1.2fr_1.3fr]">
      <figure className="relative flex flex-col justify-center overflow-hidden border border-border-card bg-black-elevated p-6 transition-all duration-500 group-hover:border-vermilion/20 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${eyeUrl})`,
            opacity: "0.1",
            mixBlendMode: "screen",
            filter: "grayscale(100%) brightness(2) contrast(1.4)",
          }}
        />
        <figcaption className="relative mb-8 font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
          MindTap / Conceptual flow
        </figcaption>
        <ol className="relative space-y-3">
          {["Non-invasive EEG", "Machine learning", "Smartphone commands"].map((stage, index) => (
            <li key={stage}>
              {index > 0 && (
                <div aria-hidden="true" className="mb-3 text-center text-vermilion/70">
                  ↓
                </div>
              )}
              <div className="border border-vermilion/25 bg-black-elevated/80 px-4 py-5 text-center font-mono text-xs uppercase tracking-[0.12em] text-text-primary">
                {stage}
              </div>
            </li>
          ))}
        </ol>
        <p className="relative mt-8 font-body text-xs leading-relaxed text-text-secondary">
          Conceptual illustration of the project purpose, not a hardware configuration or
          measurement.
        </p>
      </figure>
      <div className="flex flex-col justify-center">
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
          Team project / Credited member
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text-primary lg:text-3xl">
          MindTap
        </h3>
        <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
          UBC MINT team member
        </div>
        <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
          I was a member of UBC MINT&apos;s MindTap team. The project uses non-invasive EEG and
          machine learning for hands-free smartphone control.
        </p>
        <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
          The team received the Innovation Award in honour of Ari Kinarthy at the 2026 Simon Cox
          Student Design Competition.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 font-mono text-[11px] text-text-primary">
          <a
            href={ubcCoverageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-vermilion/70 underline-offset-4 transition-colors hover:text-vermilion focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion"
          >
            UBC coverage ↗
          </a>
          <a
            href={teamCreditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-vermilion/70 underline-offset-4 transition-colors hover:text-vermilion focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion"
          >
            Team credit ↗
          </a>
        </div>
        <div className="mt-7 flex gap-2" role="group" aria-label="MindTap project details">
          {panels.map((panel, index) => (
            <button
              key={panel.title}
              type="button"
              aria-label={`Show MindTap ${panel.title.toLowerCase()}`}
              aria-pressed={index === activeStep}
              aria-controls="mindtap-detail"
              onClick={() => setActiveStep(index)}
              className={`min-h-10 flex-1 border-b-2 py-2 font-mono text-[10px] uppercase tracking-[0.08em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-vermilion ${index === activeStep ? "border-vermilion text-text-primary" : "border-border-subtle text-text-secondary hover:border-vermilion/40"}`}
            >
              {panel.title}
            </button>
          ))}
        </div>
        <div
          id="mindtap-detail"
          className="mt-5 min-h-[130px]"
          aria-live="polite"
          aria-atomic="true"
        >
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="font-mono text-[11px] text-vermilion">
              {String(activeStep + 1).padStart(2, "0")}
            </span>
            <h4 className="font-mono text-xs uppercase tracking-[0.15em] text-text-primary">
              {panels[activeStep].title}
            </h4>
          </div>
          <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
            {panels[activeStep].desc}
          </p>
        </div>
        <ProjectTags tags={["EEG", "Machine Learning", "Assistive Technology", "Team Project"]} />
      </div>
    </div>
  );
}

function ExplorationProjects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = [
    {
      title: "AEGIR",
      stage: "Concept",
      desc: "An exploration of adaptive AI inference across device, edge and cloud, considering latency, battery and privacy constraints.",
      tags: ["Edge AI", "Rust", "Kubernetes"],
    },
    {
      title: "ANTHEON",
      stage: "Concept / Needs refinement",
      desc: "An embedded blink-and-wink input concept. The operator workflow and evaluation plan still need definition.",
      tags: ["Biosignals", "Embedded", "Neurotech"],
    },
    {
      title: "ARCHON",
      stage: "Concept / Lower priority",
      desc: "An enterprise agent evaluation idea exploring tracing, benchmarking and deployment review.",
      tags: ["AI Agents", "Evaluation", "MLOps"],
    },
    {
      title: "AREOLES",
      stage: "Concept",
      desc: "An edge neurotechnology concept exploring wearable sensing and local model inference.",
      tags: ["Wearables", "On-device AI", "Neurotech"],
    },
    {
      title: "AXION",
      stage: "Concept",
      desc: "An idea for natural-language business automation with connectors and human-reviewed execution.",
      tags: ["Automation", "Connectors", "Workflow"],
    },
    {
      title: "DOMINION",
      stage: "Concept",
      desc: "An exploration of context-aware noise control and hearing-mode selection.",
      tags: ["Audio ML", "Consumer AI", "UX"],
    },
    {
      title: "DORY",
      stage: "Concept / Planned first build",
      desc: "A proposed AI infrastructure project around dataset preparation, fine-tuning, evaluation and deployment recipes. Not yet built.",
      tags: ["Fine-tuning", "AI Infrastructure", "Evaluation"],
    },
    {
      title: "MERCURION",
      stage: "Deferred / No scheduled restart",
      desc: "A longer-term clinical BCI exploration, deferred until further biological foundations are in place. No implementation or clinical outcome is claimed.",
      tags: ["BCI", "EEG", "Assistive Technology"],
    },
    {
      title: "NOUMA",
      stage: "Rework / Game infrastructure concept",
      desc: "A proposed shift toward the infrastructure behind games, exploring low-latency backend systems and accelerated computing rather than a mobile game director.",
      tags: ["Game Infrastructure", "Low Latency", "GPU Systems"],
    },
    {
      title: "THEOS",
      stage: "Concept / Future exploration",
      desc: "An enterprise AI infrastructure idea whose scope and technical direction remain open.",
      tags: ["Enterprise AI", "Infrastructure", "Governance"],
    },
    {
      title: "TYCHAN",
      stage: "Retargeting / Exploratory concept",
      desc: "An exploration of real-time optimization under uncertainty for vehicle operations. The use case and intended customer are not yet defined.",
      tags: ["Optimization", "Vehicle Operations", "Uncertainty"],
    },
    {
      title: "VIGIL",
      stage: "Rework / Firmware and PINN concept",
      desc: "An RF and hardware exploration moving toward firmware and physics-informed neural networks (PINNs), rather than a document-ingestion workflow.",
      tags: ["RF", "Firmware", "Physics-informed ML"],
    },
  ];

  return (
    <div>
      <p className="mb-6 max-w-3xl font-body text-sm leading-relaxed text-text-secondary">
        These are ideas, not completed systems or a launch schedule. Their tags describe possible
        areas of exploration, not implemented stacks.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="group/card relative overflow-hidden border border-border-card bg-black-elevated p-6 transition-all duration-500 hover:border-vermilion/25"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <span
              aria-hidden="true"
              className={`absolute right-0 top-0 h-0 w-0 border-t-[24px] border-r-[24px] border-t-transparent border-r-vermilion/20 transition-all duration-500 ${hoveredIndex === index ? "opacity-100" : "opacity-0"}`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-0 top-0 h-[1px] bg-vermilion/30 transition-all duration-700 ${hoveredIndex === index ? "w-full" : "w-0"}`}
            />
            <div className="mb-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-vermilion">
              {project.stage}
            </div>
            <h4 className="font-display text-lg font-semibold tracking-[-0.01em] text-text-primary transition-colors duration-300 group-hover/card:text-vermilion/90">
              {project.title}
            </h4>
            <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
              {project.desc}
            </p>
            <ProjectTags tags={project.tags} />
          </article>
        ))}
      </div>
    </div>
  );
}
