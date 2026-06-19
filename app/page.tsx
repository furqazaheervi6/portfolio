'use client';
import { useState } from 'react';
import AtlarionBackground from './components/AtlarionBackground';

const skills = [
  { category: 'Embedded Systems', items: ['STM32', 'ADS1299', 'SPI/I2C/UART', 'ADC integration'] },
  { category: 'PCB Design', items: ['KiCad', 'Signal integrity', 'Sub-1μV noise floor', 'Biopotential AFE'] },
  { category: 'Machine Learning', items: ['CNN / KNN / Random Forest', 'Signal feature extraction', 'Cross-validation', 'ROC/PR curve analysis'] },
  { category: 'Programming', items: ['Python', 'R', 'MATLAB', 'Git/GitHub'] },
  { category: 'Biophysics & Math', items: ['EEG signal processing', 'Biopotential acquisition', 'Statistics & data analysis', 'Differential equations'] },
  { category: 'Lab Skills', items: ['Electrode impedance testing', 'Hardware iteration', 'Oscilloscope/logic analyzer', 'Failure diagnosis'] },
];

const interests = [
  {
    title: 'Architecture',
    slug: 'architecture',
    description: 'Classical proportion, monumental space, and how built environments encode power, memory, and ritual.',
    signal: 'Form / Space / Order',
  },
  {
    title: 'Manga / Art',
    slug: 'manga-art',
    description: 'Visual storytelling, composition, character design, and the way panels can compress motion, mood, and philosophy.',
    signal: 'Line / Gesture / Myth',
  },
  {
    title: 'History',
    slug: 'history',
    description: 'Civilizations, empires, technological transitions, and the repeating patterns behind cultural change.',
    signal: 'Power / Memory / Time',
  },
  {
    title: 'Mathematics',
    slug: 'mathematics',
    description: 'The language beneath physics, computation, optimization, signal processing, and elegant problem solving.',
    signal: 'Structure / Proof / Pattern',
  },
];

const projects = [
  {
    title: 'MINT — MindTap EEG/BCI System',
    subtitle: 'Neurotechnology Research Platform',
    award: 'Innovation Award — Simon Cox Design Competition 2026',
    link: 'https://www.linkedin.com/posts/ubcbest_ubc-best-is-proud-to-announce-that-our-activity-7454802573972123649-3VPL',
    description: 'ML Engineer on UBC MINT’s MindTap project: a BCI pipeline converting EEG into binary selection actions for iPhone Switch Control. Worked across headset design, electrode placement, Python acquisition, preprocessing, feature extraction, and model evaluation. The team shifted from noisy VEP targets toward motor-cortex intent signals and evaluated CNN, KNN, Random Forest, SVM, and Logistic Regression approaches for live Click / No Click control.',
    tags: ['OpenBCI Cyton', 'Python', 'Scikit-learn', 'EEG', 'CNN', 'Signal Processing'],
    metrics: ['Simon Cox Innovation Award', '8-channel EEG headset', 'KNN 0.88 raw accuracy', 'Live binary control target'],
    carousel: [
      {
        title: 'Assistive BCI Goal',
        kicker: 'MindTap',
        body: 'Convert non-invasive EEG into reliable Click / No Click selections for iPhone Switch Control.',
        points: ['Hands-free smartphone access', 'Real-time binary command target', 'Built around accessibility and independence'],
      },
      {
        title: 'Headset System',
        kicker: 'Hardware',
        body: 'An 8-channel headset concept balances electrode contact force, stability, and comfort for practical use.',
        points: ['Spring-loaded electrode contact', 'Clamp-style stability during movement', 'Designed around external Cyton and battery components'],
      },
      {
        title: 'Electrode Strategy',
        kicker: 'Neurosignal',
        body: 'The protocol shifted from noisy visual-response targets toward motor-cortex intent signals for stronger real-time control.',
        points: ['C3 / C4 sensorimotor focus', 'Standard reference nodes considered', 'Motor-intention signal separability prioritized'],
      },
      {
        title: 'Signal Pipeline',
        kicker: 'Software',
        body: 'Raw EEG moves through acquisition, preprocessing, cleaning, feature extraction, model evaluation, and switch output.',
        points: ['Python acquisition layer', 'Artifact and dead-signal filtering', 'Feature extraction before classification'],
      },
      {
        title: 'Model Evaluation',
        kicker: 'ML',
        body: 'CNN, KNN, Random Forest, SVM, and Logistic Regression were compared while tracking class imbalance and artifact risk.',
        points: ['KNN showed strongest balanced performance', 'CNN recall was promising but data-limited', 'Next step: balanced motor-imagery acquisition'],
      },
    ],
  },
];

const neurotechProjects = projects;

const patternProject = {
  title: 'Pattern OS',
  subtitle: 'Personal Intelligence Operating System',
  description: 'A full-stack personal intelligence dashboard for tracking physical, mental, financial, and spiritual systems. Pattern OS combines daily check-ins, AI-generated planning, Notion and Google Calendar sync, goals, activity impact, weekly digests, and pattern detection into one command surface for self-optimization.',
  tags: ['React', 'Vite', 'Node.js', 'Express', 'Postgres', 'Claude AI', 'Notion API', 'Google Calendar'],
  metrics: ['4-pillar scoring engine', 'AI day planning', 'Notion + Calendar sync', 'Pattern detection dashboard'],
  demoStats: [
    { label: 'Overall', value: '87', detail: '+14 this week' },
    { label: 'Focus', value: '6.8h', detail: 'deep work logged' },
    { label: 'Streak', value: '12d', detail: 'daily check-ins' },
    { label: 'Signal', value: '4', detail: 'patterns detected' },
  ],
  image: '/pattern-os-interface.png',
};

const patternSignalNodes = [
  { label: 'Check-in', top: '16%', left: '66%', delay: '0s' },
  { label: 'Notion', top: '36%', left: '81%', delay: '0.7s' },
  { label: 'Goals', top: '63%', left: '70%', delay: '1.4s' },
  { label: 'Calendar', top: '74%', left: '87%', delay: '2.1s' },
];

const patternActivity = [42, 68, 54, 82, 72, 96, 76, 88];

export default function Home() {
  const [mindTapSlide, setMindTapSlide] = useState(0);
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Nav */}
      <nav className="fixed top-4 inset-x-0 z-50 px-4">
        <div className="max-w-3xl mx-auto grid grid-cols-[1fr_auto_1fr] items-center gap-6 rounded-full border border-white/10 bg-black/50 backdrop-blur-md px-6 py-3">
          <span className="font-mono text-sm text-[#E34234] tracking-wider">FZ</span>
          <div className="flex gap-8 text-sm text-gray-400 justify-self-center">
            {['About', 'Projects', 'Interests', 'Skills', 'Contact'].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</a>
            ))}
          </div>
          <span aria-hidden />
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20 overflow-hidden">
        <AtlarionBackground />
        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <div className="mb-4">
            <span className="font-mono text-[#E34234] text-sm tracking-widest uppercase">Engineering Portfolio</span>
          </div>
          <h1 className="font-grotesk text-7xl md:text-9xl font-bold tracking-tighter uppercase leading-[0.9] mb-6 drop-shadow-2xl">
            Furqan<br />
            <span className="text-gray-400">Zaheer</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mb-8 leading-relaxed drop-shadow-lg">
            Biophysics undergrad building at the intersection of neural engineering, machine learning, and biological systems — turning signal into understanding.
          </p>
          <div className="flex flex-wrap gap-3 mb-12 font-mono text-sm">
            {['BSc Biology & Physics, UBC (2028)', 'Vancouver, BC'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 border border-white/10 bg-black/30 text-gray-300 rounded backdrop-blur-sm">{tag}</span>
            ))}
          </div>
          <div className="flex gap-4">
            <a href="#projects" className="inline-flex items-center gap-2 px-6 py-3 bg-[#E34234] text-white text-sm font-medium hover:bg-[#C2362A] transition-colors rounded-full">
              View Projects <span aria-hidden>→</span>
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 bg-black/30 text-gray-300 text-sm font-medium hover:border-white/40 transition-colors rounded-full backdrop-blur-sm">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> About
            </span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-6">Engineering Philosophy</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              I study Biology and Physics at UBC because living systems are the most complex engineering problems that exist. Understanding how ion channels fire, how muscles actuate, and how nerves encode signals gives me a different lens for approaching hardware design and machine learning.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              I move between domains deliberately. My thinking is shaped by the overlap between biophysics, computational methods, and experimental design — not by any single discipline. I am drawn to problems that require holding multiple frameworks simultaneously.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My iteration loop: Build → Test → Analyze → Improve. I do not stop when something works. I stop when I understand why it works.
            </p>
          </div>
          <div className="space-y-4">
            <div className="border border-white/10 p-6 rounded-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs mb-3 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Research Interests
              </div>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>→ Neural signal acquisition and EEG systems</li>
                <li>→ Machine learning for biosignal interpretation</li>
                <li>→ Biopotential hardware and sensor integration</li>
                <li>→ Computational biophysics and data-driven modeling</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 rounded-2xl">
              <div className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs mb-3 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Education
              </div>
              <p className="text-gray-300 text-sm font-medium">BSc Biology and Physics</p>
              <p className="text-gray-500 text-sm">University of British Columbia — Expected 2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <span className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Projects
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-16">Key Work</h2>
          <div className="mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-[#E34234] text-xs uppercase tracking-[0.28em]">Software</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">Systems, dashboards, and AI infrastructure</h3>
            </div>
            <span className="hidden md:inline font-mono text-xs text-gray-600">01</span>
          </div>
          <article className="relative mb-8 overflow-hidden rounded-2xl border border-[#E34234]/25 bg-[#120909] min-h-[460px] group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={patternProject.image}
              alt="Dimmed Pattern OS dashboard interface"
              className="absolute inset-0 h-full w-full object-cover opacity-70 grayscale-[15%] brightness-125 contrast-110 transition duration-700 group-hover:opacity-80 group-hover:grayscale-0"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/5" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/5" />
            <div className="pattern-hero-grid" aria-hidden />
            <div className="pattern-hero-sweep" aria-hidden />
            <div className="pattern-orbit pattern-orbit-outer" aria-hidden />
            <div className="pattern-orbit pattern-orbit-inner" aria-hidden />
            <div className="pattern-core" aria-hidden>
              <span />
            </div>
            {patternSignalNodes.map((node) => (
              <div
                key={node.label}
                className="pattern-signal-node"
                style={{ top: node.top, left: node.left, animationDelay: node.delay }}
                aria-hidden
              >
                <span>{node.label}</span>
              </div>
            ))}
            <div className="relative z-10 grid min-h-[460px] items-center md:grid-cols-[0.95fr_1.05fr]">
              <div className="p-8 md:p-12">
                <div className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs mb-3 uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> {patternProject.subtitle}
                </div>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tight mb-5">{patternProject.title}</h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 max-w-2xl">
                  {patternProject.description}
                </p>
                <div className="grid sm:grid-cols-2 gap-2 mb-8 max-w-2xl">
                  {patternProject.metrics.map((m) => (
                    <div key={m} className="bg-white/[0.08] border border-white/10 px-3 py-2 rounded text-xs text-gray-200 font-mono backdrop-blur-sm">{m}</div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 max-w-2xl">
                  {patternProject.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2.5 py-1 border border-white/10 bg-black/30 text-gray-400 rounded backdrop-blur-sm">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="hidden md:flex md:justify-end md:p-10">
                <div className="w-full max-w-sm rounded-2xl border border-white/15 bg-black/45 p-5 backdrop-blur-md shadow-2xl">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-gray-400">Live Demo Signals</span>
                    <span className="h-2 w-2 rounded-full bg-[#E34234] shadow-[0_0_18px_rgba(227,66,52,0.85)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {patternProject.demoStats.map((stat) => (
                      <div key={stat.label} className="rounded-lg border border-white/10 bg-white/[0.07] p-4">
                        <p className="font-mono text-[10px] uppercase tracking-widest text-gray-500">{stat.label}</p>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-white">{stat.value}</p>
                        <p className="mt-1 text-[11px] text-gray-400">{stat.detail}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex h-16 items-end gap-1.5">
                    {patternActivity.map((height, index) => (
                      <span
                        key={index}
                        className="pattern-activity-bar"
                        style={{ height: `${height}%`, animationDelay: `${index * 0.16}s` }}
                      />
                    ))}
                  </div>
                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full w-[87%] rounded-full bg-[#E34234]" />
                  </div>
                  <div className="mt-4 grid grid-cols-[auto_1fr] gap-x-3 gap-y-2 font-mono text-[10px] uppercase tracking-widest text-gray-500">
                    <span className="text-[#E34234]">01</span><span>Notion memory indexed</span>
                    <span className="text-[#E34234]">02</span><span>Calendar plan generated</span>
                    <span className="text-[#E34234]">03</span><span>Action loop armed</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
          <div className="mt-20 mb-8 flex items-end justify-between gap-6 border-b border-white/10 pb-4">
            <div>
              <div className="font-mono text-[#E34234] text-xs uppercase tracking-[0.28em]">Neurotech</div>
              <h3 className="mt-2 text-2xl md:text-3xl font-bold tracking-tight">Biosignals, prosthetics, and neural interfaces</h3>
            </div>
            <span className="hidden md:inline font-mono text-xs text-gray-600">02</span>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {neurotechProjects.map((p, i) => (
              <div key={i} className={`border border-white/10 p-8 rounded-2xl hover:border-[#E34234]/40 transition-colors group ${'carousel' in p ? 'md:col-span-2' : ''}`}>
                {'carousel' in p && p.carousel ? (
                  <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
                    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
                      <div className="mindtap-static-shell">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src="/models/mindtap-headset-fallback.png"
                          alt="Static render of the MindTap EEG headset STL"
                          className="h-full w-full object-cover"
                        />
                        <div className="mindtap-model-label top-[15%] left-[12%]">8-channel EEG</div>
                        <div className="mindtap-model-label top-[24%] right-[10%]">Motor cortex intent</div>
                        <div className="mindtap-model-label bottom-[16%] left-[18%]">Binary switch output</div>
                      </div>
                      <div className="border-t border-white/10 p-5">
                        <div className="mb-4 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#E34234]">{p.carousel[mindTapSlide].kicker}</div>
                            <h4 className="mt-1 text-lg font-bold tracking-tight text-white">{p.carousel[mindTapSlide].title}</h4>
                          </div>
                          <div className="font-mono text-xs text-gray-600">
                            {String(mindTapSlide + 1).padStart(2, '0')} / {String(p.carousel.length).padStart(2, '0')}
                          </div>
                        </div>
                        <p className="mb-4 text-sm leading-relaxed text-gray-400">{p.carousel[mindTapSlide].body}</p>
                        <div className="grid gap-2">
                          {p.carousel[mindTapSlide].points.map((point) => (
                            <div key={point} className="flex items-start gap-2 rounded border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300">
                              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#E34234] shadow-[0_0_12px_rgba(227,66,52,0.8)]" />
                              {point}
                            </div>
                          ))}
                        </div>
                        <div className="mt-5 flex items-center justify-between gap-3">
                          <button
                            type="button"
                            onClick={() => setMindTapSlide((current) => (current - 1 + p.carousel.length) % p.carousel.length)}
                            className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-gray-400 transition-colors hover:border-[#E34234]/40 hover:text-white"
                          >
                            Previous
                          </button>
                          <div className="flex gap-1.5">
                            {p.carousel.map((item, index) => (
                              <button
                                key={item.title}
                                type="button"
                                onClick={() => setMindTapSlide(index)}
                                className={`h-1.5 rounded-full transition-all ${index === mindTapSlide ? 'w-8 bg-[#E34234]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                                aria-label={`Show ${item.title}`}
                              />
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => setMindTapSlide((current) => (current + 1) % p.carousel.length)}
                            className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-xs text-gray-400 transition-colors hover:border-[#E34234]/40 hover:text-white"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs mb-2 uppercase tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> {p.subtitle}
                      </div>
                      {'award' in p && p.award && (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                          className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E34234]/30 bg-[#E34234]/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[#E34234] transition-colors hover:border-[#E34234]/60 hover:bg-[#E34234]/15"
                        >
                          {p.award} <span aria-hidden>↗</span>
                        </a>
                      )}
                      <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{p.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {p.metrics.map((m, j) => (
                          <div key={j} className="bg-white/5 px-2 py-1.5 rounded text-xs text-gray-300 font-mono">{m}</div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {p.tags.map((tag, j) => (
                          <span key={j} className="text-xs px-2 py-1 border border-white/10 text-gray-500 rounded">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs mb-2 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> {p.subtitle}
                    </div>
                    <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">{p.description}</p>
                    <div className="grid grid-cols-2 gap-2 mb-6">
                      {p.metrics.map((m, j) => (
                        <div key={j} className="bg-white/5 px-2 py-1.5 rounded text-xs text-gray-300 font-mono">{m}</div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-1 border border-white/10 text-gray-500 rounded">{tag}</span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section id="interests" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <span className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Interests
        </span>
        <div className="mt-4 mb-16 grid gap-6 md:grid-cols-[0.85fr_1.15fr] md:items-end">
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Outside the Lab</h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl">
            The things I return to for taste, intuition, and long-range thinking. They shape how I read systems, design interfaces, and think about engineering as culture.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          {interests.map((interest, index) => (
            <a
              key={interest.title}
              href={`/interests/${interest.slug}`}
              className="group flex min-h-[280px] flex-col border border-white/10 bg-white/[0.025] p-6 transition-colors hover:border-[#E34234]/40 focus:outline-none focus:ring-2 focus:ring-[#E34234]/50"
            >
              <div className="mb-12 flex items-center justify-between">
                <span className="font-mono text-xs text-[#E34234]">{String(index + 1).padStart(2, '0')}</span>
                <span className="h-2 w-2 rounded-full bg-[#E34234] opacity-50 transition-opacity group-hover:opacity-100" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight mb-4">{interest.title}</h3>
              <p className="text-sm leading-relaxed text-gray-400 mb-8">{interest.description}</p>
              <div className="mt-auto flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.22em] text-gray-600">
                <span>{interest.signal}</span>
                <span className="text-[#E34234] opacity-0 transition-opacity group-hover:opacity-100">Open</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6 max-w-6xl mx-auto border-t border-white/5">
        <span className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Skills
        </span>
        <h2 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-16">Technical Stack</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <div key={i} className="border border-white/10 p-6 rounded-2xl">
              <div className="font-mono text-[#E34234] text-xs mb-4 uppercase tracking-wider">{s.category}</div>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#E34234] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-white/[0.02] border-t border-white/5">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 font-mono text-[#E34234] text-xs tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E34234]" /> Contact
          </span>
          <h2 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 mb-6">Let&#39;s Build Something</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Open to research roles, neurotechnology teams, and engineering conversations at the intersection of biology and computation.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:furqazaheerxi6@gmail.com?subject=Portfolio%20Inquiry" className="inline-flex items-center gap-2 px-8 py-4 bg-[#E34234] text-white font-medium hover:bg-[#C2362A] transition-colors rounded-full">
              furqazaheerxi6@gmail.com <span aria-hidden>→</span>
            </a>
          </div>
          <p className="mt-8 text-gray-600 text-sm font-mono">Vancouver, BC — June 2026</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono text-gray-600 text-sm">Furqan Zaheer — 2026</span>
          <span className="font-mono text-gray-700 text-xs">Biophysics × ML × Hardware</span>
        </div>
      </footer>
    </main>
  );
}
