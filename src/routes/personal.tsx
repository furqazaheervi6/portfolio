import { Outlet, createFileRoute, useLocation } from "@tanstack/react-router";
import { NeuralBackground } from "../components/neural-background";
import { CursorEffects } from "../components/cursor-effects";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { SignalDivider } from "../components/signal-divider";
import { CircuitTrace } from "../components/circuit-trace";
import { ScrollReveal } from "../components/scroll-reveal";
import { PersonalHero } from "../components/personal-hero";
import { PersonalPhilosophy } from "../components/personal-philosophy";
import { InterestVisual } from "../components/interest-visual";
import { DualityBridge } from "../components/duality-bridge";
import {
  personalDomainContent,
  personalDomainImages,
  type PersonalDomainKey,
} from "../lib/personal-domains";

export const Route = createFileRoute("/personal")({
  component: PersonalPage,
});

function PersonalDomainSection({
  id,
  domain,
  index,
  bgImageUrl,
}: {
  id: string;
  domain: PersonalDomainKey;
  index: number;
  bgImageUrl?: string;
}) {
  const data = personalDomainContent[domain];
  const sectionBackground =
    domain === "architecture"
      ? "/images/personal-architecture-section-bg.jpeg"
      : domain === "gaming"
        ? "/images/personal-gaming-section-bg.jpeg"
      : domain === "mathematics"
        ? "/images/personal-mathematics-section-bg.jpeg"
      : domain === "worldbuilding"
        ? personalDomainImages[domain]
        : bgImageUrl;
  const gatewayImage =
    domain === "worldbuilding"
      ? "/images/personal-worldbuilding-bg.jpeg"
      : personalDomainImages[domain];

  return (
    <section
      id={id}
      className="isolate relative z-10 overflow-hidden border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      {sectionBackground && (
        <div className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${sectionBackground})`,
              opacity: domain === "worldbuilding" || domain === "architecture" || domain === "gaming" || domain === "mathematics" ? "0.72" : "0.28",
              mixBlendMode: domain === "worldbuilding" || domain === "architecture" || domain === "gaming" || domain === "mathematics" ? "normal" as const : "screen" as const,
              filter:
                domain === "worldbuilding" || domain === "architecture" || domain === "gaming" || domain === "mathematics"
                  ? "saturate(0.98) contrast(1.06) brightness(0.7)"
                  : "grayscale(100%) contrast(1.3) brightness(1.2)",
            }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.76)_0%,rgba(8,8,8,0.34)_52%,rgba(8,8,8,0.76)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.16)_48%,rgba(8,8,8,0.82)_100%)]" />
        </div>
      )}

      <div className="relative z-10 mx-auto max-w-[1200px]">
        {/* Background visual */}
        <div className="relative overflow-hidden">
          <InterestVisual
            mode={domain === "worldbuilding" ? "history" : domain}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-30"
          />
          {bgImageUrl && domain !== "worldbuilding" && (
            <div className="pointer-events-none absolute inset-0 z-0">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${bgImageUrl})`,
                  opacity: "0.28",
                  mixBlendMode: "screen" as const,
                  filter: "grayscale(100%) contrast(1.3) brightness(1.2)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, #080808 0%, transparent 30%, transparent 70%, #080808 100%)",
                }}
              />
            </div>
          )}

          <div className="relative z-10">
            <ScrollReveal>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
                / {String(index + 1).padStart(2, "0")}
              </div>
            </ScrollReveal>

            <div className="grid gap-12 lg:grid-cols-[1.1fr_1.2fr]">
              <ScrollReveal delay={100}>
                <div>
                  <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
                    {data.subtitle}
                  </div>
                  <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
                    {data.title}
                  </h2>
                  <p className="mt-4 font-body text-sm leading-relaxed text-text-secondary">
                    {data.description}
                  </p>
                  {domain === "gaming" && (
                    <a
                      href="https://portfolio-inky-two-28.vercel.app/"
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex border border-vermilion/60 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-vermilion transition-all hover:bg-vermilion hover:text-black-deep"
                    >
                      View on Vercel
                    </a>
                  )}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {data.themes.map((theme) => (
                      <span
                        key={theme}
                        className="border border-border-subtle px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-vermilion/30 hover:text-vermilion"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <a
                  href={`/personal/${domain}`}
                  onClick={(event) => {
                    event.preventDefault();
                    window.location.assign(`/personal/${domain}`);
                  }}
                  className="group/gateway relative flex min-h-[360px] items-center justify-center overflow-hidden border border-border-card bg-black-elevated"
                >
                  <span
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/gateway:scale-105"
                    style={{
                      backgroundImage: `url(${gatewayImage})`,
                      filter: "saturate(0.9) contrast(1.12) brightness(0.72)",
                    }}
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,8,0.7),rgba(8,8,8,0.22),rgba(8,8,8,0.78))]" />
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_58%)] opacity-70 transition-opacity duration-500 group-hover/gateway:opacity-100" />
                  <span className="relative z-10 border border-vermilion/70 bg-black-deep/70 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-vermilion backdrop-blur-sm transition-all duration-300 group-hover/gateway:bg-vermilion group-hover/gateway:text-black-deep">
                    Enter
                  </span>
                </a>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PersonalPage() {
  const location = useLocation();
  const currentPath = location.pathname.replace(/\/$/, "") || "/";

  if (currentPath !== "/personal") {
    return <Outlet />;
  }

  const sections: { id: string; domain: PersonalDomainKey; bgImageUrl?: string }[] = [
    { id: "architecture", domain: "architecture" },
    { id: "manga-art", domain: "manga", bgImageUrl: "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/58baeca7-d2e4-4e43-a365-26b769babebf.jpg" },
    { id: "gaming", domain: "gaming" },
    { id: "worldbuilding", domain: "worldbuilding" },
    { id: "history", domain: "history", bgImageUrl: "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/0394f25c-044b-4f23-bfee-0bc71ac563c2.jpg" },
    { id: "mathematics", domain: "mathematics" },
  ];

  return (
    <>
      <NeuralBackground />
      <CursorEffects />
      <Nav mode="personal" />
      <main className="relative">
        <PersonalHero />

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <PersonalPhilosophy />

        {sections.map((s, i) => (
          <div key={s.domain}>
            <div className="relative">
              <CircuitTrace />
              <SignalDivider />
            </div>
            <PersonalDomainSection id={s.id} domain={s.domain} index={i} bgImageUrl={s.bgImageUrl} />
          </div>
        ))}

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <DualityBridge from="personal" />

        <section id="contact" className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36">
          <div className="mx-auto max-w-[1200px] text-center">
            <ScrollReveal>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
                / Contact
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
                Reach out
              </h2>
              <p className="mx-auto mt-4 max-w-[500px] font-body text-sm leading-relaxed text-text-secondary">
                For discussions on any of these domains, research collaboration, or
                to share something you are building.
              </p>
              <a
                href="mailto:fzahee01@student.ubc.ca"
                className="mt-8 inline-block border border-vermilion/60 px-7 py-3 font-mono text-xs uppercase tracking-[0.15em] text-vermilion transition-all hover:bg-vermilion hover:text-black-deep"
              >
                fzahee01@student.ubc.ca
              </a>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default PersonalPage;
