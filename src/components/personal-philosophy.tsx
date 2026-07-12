import { ScrollReveal } from "./scroll-reveal";

const philosophyBackgroundUrl = "/images/personal-philosophy-bg.jpeg";

export function PersonalPhilosophy() {
  return (
    <section
      id="philosophy"
      className="isolate relative z-10 overflow-hidden border-t border-border-subtle px-6 py-28 lg:px-12 lg:py-36"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${philosophyBackgroundUrl})`,
          filter: "saturate(0.9) contrast(1.08) brightness(0.64)",
        }}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.48)_52%,rgba(8,8,8,0.74)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(to_bottom,rgba(8,8,8,0.78)_0%,rgba(8,8,8,0.26)_44%,rgba(8,8,8,0.84)_100%)]" />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_70%_32%,rgba(220,38,38,0.12),transparent_36%)]" />

      <div className="relative z-10 mx-auto max-w-[1200px]">
        <ScrollReveal>
          <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.22em] text-text-muted">
            / Philosophy
          </div>
        </ScrollReveal>

        <div className="grid gap-16 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal delay={100}>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-semibold leading-[1.1] tracking-[-0.03em] text-text-primary">
              I yearn to understand the most complex structures of reality.
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="space-y-5 font-body text-sm leading-relaxed text-text-secondary">
              <p>
                My intellectual life outside the lab is driven by a single
                question: how do systems encode knowledge? Architecture encodes
                it in stone and space. Manga encodes it in ink and panel
                rhythm. History encodes it in institutions and memory.
                Mathematics encodes it in the pure language of structure and
                transformation.
              </p>
              <p>
                Each domain informs the others. The brutalist understanding of
                material truth translates to an engineering philosophy of
                honest abstraction. The narrative architecture of Berserk
                informs how I think about systems under extreme stress. Roman
                institutional design mirrors scalable software architecture.
                Linear algebra is the language neural populations use to
                compute.
              </p>
              <p>
                I do not treat these as separate interests. They are different
                formal systems for the same underlying drive: to decode how
                things are built, why they hold together, and what happens when
                they break.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
