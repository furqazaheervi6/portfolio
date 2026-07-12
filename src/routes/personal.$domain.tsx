import { Link, createFileRoute } from "@tanstack/react-router";
import { NeuralBackground } from "../components/neural-background";
import { CursorEffects } from "../components/cursor-effects";
import { Nav } from "../components/nav";
import { Footer } from "../components/footer";
import { ScrollReveal } from "../components/scroll-reveal";
import {
  isPersonalDomainKey,
  personalDomainContent,
  personalDomainImages,
  personalDomainOrder,
  type PersonalDomainKey,
} from "../lib/personal-domains";

export const Route = createFileRoute("/personal/$domain")({
  component: PersonalDomainDetailPage,
});

const domainPageDepth: Record<
  PersonalDomainKey,
  {
    thesis: string;
    questions: string[];
    practices: string[];
  }
> = {
  architecture: {
    thesis:
      "I read buildings like arguments. Every arch, wall, courtyard, column, material choice, and ornament tells me what a culture believed about order, beauty, power, and the human body moving through space.",
    questions: [
      "How does space teach people where to move, gather, pause, or feel small?",
      "When does ornament become structure, and when does structure become philosophy?",
      "What would engineering look like if it treated beauty as a constraint, not a decoration?",
    ],
    practices: [
      "Studying civic scale, thresholds, arches, courtyards, and monumental space.",
      "Comparing Victorian richness, Islamic geometry, and brutalist material honesty.",
      "Looking for design principles that transfer into hardware, interfaces, and systems.",
    ],
  },
  manga: {
    thesis:
      "I care about manga and visual storytelling because panels compress emotion, motion, philosophy, and violence into deliberate composition. A great page can feel like a machine for producing awe.",
    questions: [
      "How does a single image imply time, trauma, momentum, or transcendence?",
      "Why do certain stories make struggle feel mythic instead of merely dramatic?",
      "What can engineering learn from pacing, contrast, negative space, and visual hierarchy?",
    ],
    practices: [
      "Studying composition, panel rhythm, line weight, hatching, and silhouette.",
      "Thinking through Berserk, Vagabond, Vinland Saga, Naruto, and Samurai Jack as systems of meaning.",
      "Using visual storytelling as a way to understand interfaces, diagrams, and imagined machinery.",
    ],
  },
  gaming: {
    thesis:
      "Games interest me because they are systems you can inhabit. A good game teaches through feedback, failure, timing, incentives, and pattern recognition until abstract rules become embodied intuition.",
    questions: [
      "How do mechanics shape behavior without needing explanation?",
      "What makes a challenge feel fair, legible, and worth mastering?",
      "How can interfaces reveal complexity gradually instead of overwhelming the player?",
    ],
    practices: [
      "Breaking down strategy loops, progression systems, resource control, and boss design.",
      "Studying how games communicate state, risk, reward, and tempo instantly.",
      "Borrowing game-feel principles for tools, dashboards, and personal systems.",
    ],
  },
  worldbuilding: {
    thesis:
      "Worldbuilding is imagination with load-bearing structure. The worlds I love feel alive because geography, technology, myth, economy, belief, and conflict all push against each other.",
    questions: [
      "What hidden rules make a fictional civilization feel inevitable?",
      "How does a map imply history, resource flow, trade, war, and myth?",
      "What breaks first when an imagined society is stressed?",
    ],
    practices: [
      "Designing fictional systems with geography, institutions, energy, and constraints in mind.",
      "Reading maps, artifacts, ruins, weapons, and symbols as compressed history.",
      "Using worldbuilding as a sandbox for systems thinking and speculative engineering.",
    ],
  },
  history: {
    thesis:
      "History feels like systems engineering at civilizational scale. Empires, schools of thought, armies, trade routes, and institutions are all attempts to preserve order across time.",
    questions: [
      "Why do some institutions scale while others collapse under their own complexity?",
      "How do roads, archives, law, religion, and military discipline turn into state capacity?",
      "What patterns repeat across civilizations that never directly touched each other?",
    ],
    practices: [
      "Comparing Roman administration, Greek philosophy, Islamic scholarship, and pre-modern states.",
      "Looking at information infrastructure: roads, couriers, census systems, archives, and memory.",
      "Treating historical systems as case studies in coordination, abstraction, and failure.",
    ],
  },
  mathematics: {
    thesis:
      "Mathematics is the language I use when reality becomes too complex for intuition alone. It turns invisible structure into something precise enough to reason about, simulate, and build from.",
    questions: [
      "What structures stay the same when everything else changes?",
      "How do high-dimensional systems become legible through projection, symmetry, and transformation?",
      "Where do biological systems, computation, and physical theory share the same formal skeleton?",
    ],
    practices: [
      "Studying linear algebra, algebraic theory, computation, quantum systems, and game theory.",
      "Thinking about neural populations through vectors, manifolds, dynamics, and transformations.",
      "Using mathematical structure as a bridge between biology, software, hardware, and intelligence.",
    ],
  },
};

function PersonalDomainDetailPage() {
  const { domain } = Route.useParams();

  if (!isPersonalDomainKey(domain)) {
    return (
      <>
        <NeuralBackground />
        <CursorEffects />
        <Nav mode="personal" />
        <main className="relative flex min-h-dvh items-center justify-center px-6">
          <div className="max-w-md text-center">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-vermilion">
              Unknown domain
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] text-text-primary">
              This page does not exist.
            </h1>
            <a
              href="/personal"
              className="mt-8 inline-flex border border-vermilion/60 px-6 py-3 font-mono text-xs uppercase tracking-[0.15em] text-vermilion transition-all hover:bg-vermilion hover:text-black-deep"
            >
              Back to personal
            </a>
          </div>
        </main>
      </>
    );
  }

  const data = personalDomainContent[domain];
  const depth = domainPageDepth[domain];
  const imageUrl = personalDomainImages[domain];
  const index = personalDomainOrder.indexOf(domain);
  const previousDomain = personalDomainOrder[(index - 1 + personalDomainOrder.length) % personalDomainOrder.length];
  const nextDomain = personalDomainOrder[(index + 1) % personalDomainOrder.length];
  const previousData = personalDomainContent[previousDomain];
  const nextData = personalDomainContent[nextDomain];

  return (
    <>
      <NeuralBackground />
      <CursorEffects />
      <Nav mode="personal" />
      <main className="relative">
        <section className="isolate relative min-h-dvh overflow-hidden border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36">
          <div
            className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${imageUrl})`,
              filter: "saturate(0.9) contrast(1.08) brightness(0.5)",
            }}
          />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.9)_0%,rgba(8,8,8,0.58)_52%,rgba(8,8,8,0.86)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.82)_0%,rgba(8,8,8,0.34)_44%,rgba(8,8,8,0.94)_100%)]" />
          <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_32%,rgba(220,38,38,0.13),transparent_36%)]" />

          <div className="relative z-10 mx-auto max-w-[1100px]">
            <ScrollReveal>
              <Link
                to="/personal"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-vermilion"
              >
                Back to personal
              </Link>
            </ScrollReveal>

            <div className="mt-16 grid gap-12 lg:grid-cols-[0.9fr_1.25fr]">
              <ScrollReveal delay={100}>
                <div>
                  <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-vermilion">
                    {data.subtitle}
                  </div>
                  <h1 className="font-display text-[clamp(2.3rem,7vw,5.5rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-text-primary">
                    {data.title}
                  </h1>
                  <p className="mt-6 font-body text-sm leading-relaxed text-text-secondary">
                    {data.description}
                  </p>
                  <div className="mt-7 flex flex-wrap gap-2">
                    {data.themes.map((theme) => (
                      <span
                        key={theme}
                        className="border border-border-subtle bg-black-deep/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] text-text-muted"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="relative min-h-[440px] overflow-hidden border border-border-card bg-black-elevated">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      filter: "saturate(0.9) contrast(1.12) brightness(0.68)",
                    }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,8,8,0.62),rgba(8,8,8,0.18),rgba(8,8,8,0.78))]" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.16),transparent_58%)]" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">
                      Primary lens
                    </div>
                    <p className="mt-3 max-w-[620px] font-body text-sm leading-relaxed text-text-primary">
                      {depth.thesis}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              <ScrollReveal delay={100}>
                <div className="h-full border border-border-card bg-black-deep/55 p-6 backdrop-blur-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">
                    Questions
                  </div>
                  <div className="mt-5 space-y-4">
                    {depth.questions.map((question, i) => (
                      <div key={question} className="border-l border-vermilion/30 pl-4">
                        <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                          Q{String(i + 1).padStart(2, "0")}
                        </div>
                        <p className="font-body text-sm leading-relaxed text-text-secondary">
                          {question}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200}>
                <div className="h-full border border-border-card bg-black-deep/55 p-6 backdrop-blur-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">
                    How it shows up
                  </div>
                  <div className="mt-5 space-y-4">
                    {depth.practices.map((practice, i) => (
                      <div key={practice} className="border-l border-border-subtle pl-4 transition-colors hover:border-vermilion/60">
                        <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-text-muted">
                          Mode {String(i + 1).padStart(2, "0")}
                        </div>
                        <p className="font-body text-sm leading-relaxed text-text-secondary">
                          {practice}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <div className="h-full border border-border-card bg-black-deep/55 p-6 backdrop-blur-md">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">
                    Vocabulary
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
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
            </div>

            <ScrollReveal delay={150}>
              <div className="mt-16 border border-border-card bg-black-deep/58 p-6 backdrop-blur-md lg:p-8">
                <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-vermilion">
                  Field notes
                </div>
                <div className="grid gap-5 lg:grid-cols-2">
                  {data.details.map((detail, i) => (
                    <div
                      key={detail}
                      className="group/detail border-l border-vermilion/30 pl-4 transition-all duration-300 hover:border-vermilion/70"
                    >
                      <div className="mb-2 font-mono text-[9px] uppercase tracking-[0.18em] text-vermilion/70">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <p className="font-body text-sm leading-relaxed text-text-secondary transition-colors duration-300 group-hover/detail:text-text-primary">
                        {detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="mt-10 grid gap-3 font-mono text-[10px] uppercase tracking-[0.16em] sm:grid-cols-3">
                <Link
                  to="/personal/$domain"
                  params={{ domain: previousDomain }}
                  className="border border-border-card bg-black-deep/45 px-4 py-3 text-text-muted transition-colors hover:border-vermilion/40 hover:text-vermilion"
                >
                  Previous · {previousData.title}
                </Link>
                <Link
                  to="/personal"
                  className="border border-vermilion/50 bg-black-deep/45 px-4 py-3 text-center text-vermilion transition-colors hover:bg-vermilion hover:text-black-deep"
                >
                  All domains
                </Link>
                <Link
                  to="/personal/$domain"
                  params={{ domain: nextDomain }}
                  className="border border-border-card bg-black-deep/45 px-4 py-3 text-right text-text-muted transition-colors hover:border-vermilion/40 hover:text-vermilion"
                >
                  Next · {nextData.title}
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
