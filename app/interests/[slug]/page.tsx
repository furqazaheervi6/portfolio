import { notFound } from 'next/navigation';

const interestPages = {
  architecture: {
    title: 'Architecture',
    signal: 'Form / Space / Order',
    summary:
      'Architecture is where geometry becomes lived experience. I am drawn to buildings as systems of proportion, ritual, power, memory, and movement.',
    thesis:
      'The best architecture teaches engineering restraint: every axis, threshold, load path, and shadow has a job. I am especially drawn to Victorian detail, pure brutalist mass, and Islamic-inspired geometry because each one turns structure into atmosphere.',
    lenses: ['Victorian ornament and verticality', 'Pure brutalist concrete mass', 'Islamic pattern, courtyards, and arches', 'Urban systems and human behavior'],
    threads: ['How buildings guide attention', 'How ornament communicates hierarchy', 'How public space encodes culture'],
    media: [
      {
        title: 'Victorian',
        label: 'Ornament / Craft',
        description: 'Layered facades, gothic rhythm, ironwork, towers, and dense historical texture.',
        image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/victorian%20architecture/',
      },
      {
        title: 'Pure Brutalist',
        label: 'Concrete / Force',
        description: 'Heavy silhouettes, exposed structure, civic scale, and a raw sense of material honesty.',
        image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/brutalist%20architecture/',
      },
      {
        title: 'Islamic-inspired',
        label: 'Geometry / Light',
        description: 'Arches, courtyards, domes, symmetry, and repeating pattern as a spatial language.',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/mosque/',
      },
    ],
  },
  'manga-art': {
    title: 'Manga / Art',
    signal: 'Line / Gesture / Myth',
    summary:
      'Manga, animation, comics, and mythic lore give me a language for motion, atmosphere, character, and emotional compression. A single panel can carry time, force, silence, and intent.',
    thesis:
      'My taste is shaped by the dark medieval weight of Berserk, the kinetic clarity of Naruto and Samurai Jack, the historical patience of Vinland Saga and Vagabond, the ascent psychology of The Climber, and the cosmic scale of Marvel/DC lore like the Beyonder.',
    lenses: ['Dark fantasy atmosphere and moral weight', 'Panel rhythm, impact frames, and pacing', 'Gesture, silhouette, and character design', 'Cosmic lore, myth, and symbolic power'],
    threads: ['How images compress complex ideas', 'How sequence changes meaning', 'How style becomes a thinking tool'],
    media: [
      {
        title: 'Dark fantasy manga gravity',
        label: 'Berserk emphasis',
        description: 'Huge silhouettes, ruined stone, harsh contrast, tragic scale, and mythic violence without using copyrighted panels.',
        image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/dark%20fantasy/',
      },
      {
        title: 'Ink, line, and panel craft',
        label: 'Manga / Comics',
        description: 'Brushwork, black-white contrast, speed lines, page rhythm, and the discipline of visual sequencing.',
        image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/hand%20drawing/',
      },
      {
        title: 'Warrior journeys and ascent',
        label: 'Vagabond / Vinland / Climber',
        description: 'Solitary discipline, mountain tension, sword-era restraint, and the long arc of self-overcoming.',
        image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/mountain%20climbing/',
      },
      {
        title: 'Cosmic comics and lore',
        label: 'Marvel / DC scale',
        description: 'Multiversal stakes, impossible entities, bright symbolic power, and reality-bending myth systems.',
        image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/cosmos/',
      },
    ],
  },
  history: {
    title: 'History',
    signal: 'Power / Memory / Time',
    summary:
      'I love history of every kind, but I am especially drawn to the Roman, Greek, Islamic, and pre-modern worlds because they show civilization as a living system of power, belief, engineering, and memory.',
    thesis:
      'History helps me think across scale. Roman institutions, Greek philosophy, Islamic scholarship, and pre-modern imperial systems all reveal how ideas, infrastructure, war, faith, trade, and technology bind societies together or pull them apart.',
    lenses: ['Roman statecraft, law, and military systems', 'Greek philosophy, city-states, and mythic imagination', 'Islamic golden-age scholarship, architecture, and empire', 'Pre-modern 1800+ transitions in power and technology'],
    threads: ['How empires organize complexity', 'How ideas survive across languages and eras', 'How technology changes political possibility'],
    media: [
      {
        title: 'Roman world',
        label: 'Empire / Law',
        description: 'Roads, legions, aqueducts, republican memory, imperial administration, and the architecture of durable power.',
        image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/roman%20architecture/',
      },
      {
        title: 'Greek world',
        label: 'Philosophy / Polis',
        description: 'City-states, temples, myth, theatre, sculpture, mathematics, and the birth of many Western intellectual traditions.',
        image: 'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/ancient%20greece/',
      },
      {
        title: 'Islamic civilization',
        label: 'Scholarship / Pattern',
        description: 'Caliphates, scientific translation, geometry, astronomy, medicine, trade networks, and sacred urban space.',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/islamic%20architecture/',
      },
      {
        title: 'Pre-modern to 1800+',
        label: 'Transition / Industry',
        description: 'Gunpowder states, exploration, early modern science, empire, revolutions, industrialization, and new global systems.',
        image: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pexels.com/search/videos/history%20museum/',
      },
    ],
  },
  mathematics: {
    title: 'Mathematics',
    signal: 'Structure / Proof / Pattern',
    summary:
      'I am drawn to mathematics as the language of structure: linear algebra, algebraic and computational theory, higher-dimensional spaces, biophysical models, quantum systems, and strategic interaction.',
    thesis:
      'Math gives me a way to move between abstraction and living systems. A matrix can describe a rotation, a neural signal, a quantum state, or a strategic payoff landscape. That flexibility is what makes mathematics feel alive.',
    lenses: ['Linear algebra and transformations', 'Algebraic and computational theory', 'Higher-dimensional mathematics and geometry', 'Biophysical math, quantum systems, and game theory'],
    threads: ['How structure emerges from constraints', 'How abstract systems become physical models', 'How strategic behavior can be formalized'],
    media: [
      {
        title: 'Linear algebra',
        label: 'Vectors / Operators',
        description: 'Vector spaces, eigenstructure, transformations, basis changes, and the machinery behind signals, physics, and ML.',
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pinterest.com/search/pins/?q=linear%20algebra%20aesthetic',
      },
      {
        title: 'Higher dimensions',
        label: 'Geometry / Topology',
        description: 'Abstract spaces, manifolds, projections, symmetry, and the strange visual intuition behind dimensions beyond three.',
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pinterest.com/search/pins/?q=higher%20dimensional%20geometry%20math',
      },
      {
        title: 'Quantum and biophysical systems',
        label: 'States / Dynamics',
        description: 'Wavefunctions, stochastic behavior, membrane potentials, dynamical systems, and the equations underneath living matter.',
        image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pinterest.com/search/pins/?q=quantum%20physics%20equations%20aesthetic',
      },
      {
        title: 'Computation and game theory',
        label: 'Algorithms / Strategy',
        description: 'Formal languages, complexity, optimization, equilibria, incentives, and how rational agents move through systems.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80',
        video: 'https://www.pinterest.com/search/pins/?q=game%20theory%20mathematics',
      },
    ],
  },
} as const;

type InterestSlug = keyof typeof interestPages;

export function generateStaticParams() {
  return Object.keys(interestPages).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const page = interestPages[params.slug as InterestSlug];

  if (!page) {
    return {
      title: 'Interest | Furqan Zaheer',
    };
  }

  return {
    title: `${page.title} | Furqan Zaheer`,
    description: page.summary,
  };
}

export default function InterestPage({ params }: { params: { slug: string } }) {
  const page = interestPages[params.slug as InterestSlug];

  if (!page) {
    notFound();
  }

  const media = 'media' in page ? page.media : [];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      <nav className="fixed top-4 inset-x-0 z-50 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-6 py-3">
          <a href="/#interests" className="font-mono text-sm text-[#E34234] tracking-wider">
            FZ
          </a>
          <div className="flex gap-8 text-sm text-gray-400 justify-self-center">
            <a href="/#about" className="hover:text-white transition-colors">About</a>
            <a href="/#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="/#interests" className="hover:text-white transition-colors">Interests</a>
          </div>
          <span aria-hidden />
        </div>
      </nav>

      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(227,66,52,0.18),transparent_34%),radial-gradient(circle_at_70%_35%,rgba(80,15,90,0.24),transparent_32%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:48px_48px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl">
          <a href="/#interests" className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.24em] text-[#E34234] hover:text-white transition-colors">
            Back to interests
          </a>
          <div className="mt-10 grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-end">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.28em] text-gray-500">{page.signal}</span>
              <h1 className="mt-4 text-6xl font-bold tracking-tight md:text-8xl">{page.title}</h1>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-gray-300">{page.summary}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        {media.length > 0 ? (
          <div className="mb-20 border-t border-white/10 pt-12">
            <div className="mb-8 flex items-end justify-between gap-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#E34234]">Visual references</span>
                <h2 className="mt-3 text-3xl font-bold tracking-tight">Stock image and video moodboard</h2>
              </div>
              <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-gray-600 md:block">Copyright-safe references</span>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {media.map((item) => (
                <article key={item.title} className="group overflow-hidden border border-white/10 bg-white/[0.025]">
                  <div className="relative aspect-[4/3] overflow-hidden bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={`${item.title} stock visual reference`}
                      className="h-full w-full object-cover opacity-75 grayscale-[25%] transition duration-500 group-hover:scale-105 group-hover:opacity-90 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#E34234]">{item.label}</span>
                      <h3 className="mt-2 text-2xl font-bold tracking-tight">{item.title}</h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="min-h-20 text-sm leading-relaxed text-gray-400">{item.description}</p>
                    <a
                      href={item.video}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 inline-flex font-mono text-[10px] uppercase tracking-[0.22em] text-gray-500 transition-colors hover:text-[#E34234]"
                    >
                      {item.video.includes('pinterest.com') ? 'Open Pinterest references' : 'Open stock video references'}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ) : null}

        <div className="grid gap-10 border-t border-white/10 pt-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#E34234]">Why it matters</span>
            <p className="mt-5 text-2xl leading-snug text-gray-200">{page.thesis}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {page.lenses.map((lens, index) => (
              <article key={lens} className="min-h-36 border border-white/10 bg-white/[0.025] p-5">
                <span className="font-mono text-xs text-[#E34234]">{String(index + 1).padStart(2, '0')}</span>
                <h2 className="mt-8 text-lg font-semibold tracking-tight">{lens}</h2>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          <span className="font-mono text-xs uppercase tracking-[0.28em] text-[#E34234]">Current threads</span>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {page.threads.map((thread) => (
              <div key={thread} className="border border-white/10 bg-black/30 p-5 text-sm leading-relaxed text-gray-400">
                {thread}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
