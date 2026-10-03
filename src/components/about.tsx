import { ScrollReveal } from "./scroll-reveal";
import { TextHoverViz } from "./text-hover-viz";

const circuitUrl =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/2b36a9a7-79fb-4b23-8b40-8a10e3ed0eff.jpg";
const handGearsUrl =
  "https://d2ol7oe51mr4n9.cloudfront.net/user_2xwIPr50KlEwsiMAVmRtkFMSPij/1d03e0de-f890-424c-9a39-c78aeb2ab9b3.jpg";
const aboutBackgroundUrl = "/images/about-iroh.jpeg";

export function About() {
  return (
    <section
      id="about"
      className="relative z-10 border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      {/* Circuit schematic — tiled, screen-blended */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover"
          style={{
            backgroundImage: `url(${aboutBackgroundUrl})`,
            backgroundPosition: "58% 72%",
            opacity: "0.46",
            filter: "saturate(0.85) contrast(1.05) brightness(0.72)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(8,8,8,0.9) 0%, rgba(8,8,8,0.62) 42%, rgba(8,8,8,0.78) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 72% 42%, rgba(238,64,54,0.14), transparent 34%), linear-gradient(to bottom, #080808 0%, transparent 22%, transparent 70%, #080808 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${circuitUrl})`,
            backgroundSize: "400px 400px",
            backgroundRepeat: "repeat",
            opacity: "0.07",
            mixBlendMode: "screen" as const,
            filter: "grayscale(100%) brightness(2) contrast(1.5)",
          }}
        />
        {/* Diagonal wipe fade */}
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(135deg, #080808 20%, transparent 50%, #080808 80%)",
          }}
        />
        {/* Hand/gears wireframe — screen-blended from the right */}
        <div
          className="absolute bottom-0 right-0 h-[65%] w-[45%] bg-contain bg-right-bottom bg-no-repeat"
          style={{
            backgroundImage: `url(${handGearsUrl})`,
            opacity: "0.06",
            mixBlendMode: "screen" as const,
            filter: "grayscale(100%) brightness(1.5) contrast(1.3)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to left, transparent 40%, #080808 100%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            / About
          </div>
        </ScrollReveal>

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal delay={100}>
            <figure>
              <blockquote className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-semibold italic leading-[1.1] tracking-[-0.03em] text-text-primary">
                “Who are you? And who do you want to become?”
              </blockquote>
              <figcaption className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
                Uncle Iroh · Avatar: The Last Airbender, 2005
              </figcaption>
            </figure>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-6 font-body text-sm leading-relaxed text-text-secondary">
              <TextHoverViz className="rounded-sm">
                <p className="font-body relative z-10">
                  Hey! I'm Furqan, a Biology Co-op student at UBC drawn to biophysics,
                  neurotechnology and engineering. I love complex systems, living and engineered,
                  and the possibilities of biomorphic design.
                </p>
              </TextHoverViz>
              <p>
                I was part of UBC MINT's MindTap team, whose EEG-based smartphone-control project
                received the 2026 Innovation Award in honour of Ari Kinarthy at the Simon Cox
                Student Design Competition.{" "}
                <a
                  href="https://engineering.ok.ubc.ca/2026/05/21/ubc-engineering-teams-sweep-podium-at-simon-cox-student-design-competition/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vermilion underline underline-offset-4"
                >
                  UBC coverage
                </a>
                {" · "}
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:ugcPost:7454802572634365952/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-vermilion underline underline-offset-4"
                >
                  Team credit
                </a>
              </p>
              <p>
                My broader interests span nanotechnology, battery engineering, quantum science,
                computer architecture, deep learning, foundation models and ML infrastructure,
                alongside a love of community, entrepreneurship, deep-tech and neurotech.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
