'use client';
import { useState } from 'react';

const experience = [
  { role: 'ML Engineer', org: 'UBC MINT', period: 'Jul 2025 - Present', desc: 'Developed ML models for EEG signal interpretation in neuroengineering applications. Supporting development of rehabilitation device for neural motor development.' },
  { role: 'BD & ML Specialist', org: 'Muscle to Movement', period: 'Nov 2025 - Present', desc: 'Designed AI/ML pipelines for prosthetic ambidextrous hand. Constructed algorithms using Numpy, Pandas, PyTorch, TensorFlow for biotech applications.' },
  { role: 'B2B Sales Optimization Intern', org: 'Upgraded', period: 'Jan 2026 - Present', desc: 'Optimized sales workflows by analyzing lead pipelines and CRM metrics. Generated insights on customer acquisition trends and operational efficiency.' },
  { role: 'Operations Intern', org: 'NeuraVia, Inc.', period: 'Sep 2025 - Jan 2026', desc: 'Coordinated cross-functional teams. Designed scalable systems for hiring, onboarding, compliance to keep company investor-ready.' },
];

const skills = [
  { cat: 'Machine Learning', items: ['PyTorch', 'TensorFlow', 'Numpy/Pandas', 'Signal Processing', 'Feature Engineering'] },
  { cat: 'Technical Engineering', items: ['EEG Systems', 'Biopotential Sensors', 'Hardware-Software Integration', 'Data Pipelines'] },
  { cat: 'Programming', items: ['Python', 'R', 'MATLAB', 'Git/GitHub', 'Statistical Analysis'] },
  { cat: 'Operations & Sales', items: ['B2B Sales', 'CRM Analytics', 'Workflow Optimization', 'Cross-functional Coordination'] },
];

export default function Home() {
  const [section, setSection] = useState('intro');

  return (
    <main className="min-h-screen font-body etching-bg">
      {/* Ornamental Header */}
      <header className="fixed top-0 w-full z-50 bg-parchment/95 backdrop-blur-sm border-b-2 border-parchment-deeper">
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border-2 border-sepia rounded-full flex items-center justify-center">
              <span className="font-display text-sepia text-lg font-bold">Σ</span>
            </div>
            <div>
              <h1 className="font-display text-xl font-bold text-ink tracking-wide">FURQAN ZAHEER</h1>
              <p className="text-xs text-ink-mid italic">Biophysics & Machine Learning</p>
            </div>
          </div>
          <nav className="flex gap-6">
            {['About', 'Experience', 'Skills', 'Contact'].map(s => (
              <button key={s} onClick={() => setSection(s.toLowerCase())} className="text-sm font-body text-ink-light hover:text-sepia transition-colors uppercase tracking-wider">{s}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center px-8 pt-28 pb-20 relative">
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-64 h-64 opacity-10">
          <svg viewBox="0 0 200 200" className="w-full h-full text-sepia-light">
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="100" y="110" textAnchor="middle" className="font-display text-3xl" fill="currentColor">ΣΠΩ</text>
          </svg>
        </div>
        <div className="max-w-4xl text-center z-10 space-y-6 animate-fade-in">
          <div className="ornament mb-8">
            <span className="font-display text-sm tracking-widest uppercase text-sepia">Engineering Portfolio</span>
          </div>
          <h1 className="font-display text-7xl md:text-8xl font-black text-ink tracking-tight leading-none mb-4">
            FURQAN<br/><span className="text-ink-mid">ZAHEER</span>
          </h1>
          <p className="text-2xl text-ink-mid max-w-2xl mx-auto leading-relaxed italic">
            Interdisciplinary biophysics undergraduate applying machine learning and computational methods to neurotechnology, biomedical systems, and data-driven engineering.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-10 font-mono text-xs">
            {['BSc Biology & Physics', 'UBC 2028', 'Vancouver, BC', 'furqazaheerxi6@gmail.com'].map(tag => (
              <span key={tag} className="px-4 py-2 parchment-card text-ink-mid tracking-wide">{tag}</span>
            ))}
          </div>
          <div className="flex gap-4 justify-center mt-12">
            <a href="#experience" className="px-8 py-4 bg-sepia text-parchment font-display font-bold uppercase text-sm tracking-wider hover:bg-sepia-light transition-all glow-sepia">View Work</a>
            <a href="mailto:furqazaheerxi6@gmail.com" className="px-8 py-4 border-2 border-ink-mid text-ink font-display font-semibold uppercase text-sm tracking-wider hover:bg-ink hover:text-parchment transition-all">Contact</a>
          </div>
        </div>
        <div className="absolute bottom-10 scroll-hint">
          <svg className="w-6 h-6 text-sepia" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-8 bg-gradient-to-b from-parchment to-parchment-dark relative">
        <div className="max-w-5xl mx-auto">
          <div className="ornament mb-12">
            <h2 className="font-display text-5xl font-bold text-ink">Philosophy</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6 text-lg text-ink-light leading-relaxed">
              <p className="first-letter:text-6xl first-letter:font-display first-letter:font-bold first-letter:text-sepia first-letter:mr-2 first-letter:float-left">
                Bridging living systems and engineered systems. I study Biology and Physics at UBC because understanding how ion channels fire, how muscles actuate, and how neural signals encode information shapes how I approach hardware design and machine learning.
              </p>
              <p>
                My work spans EEG-based neurotechnology, prosthetic control systems, and biopotential signal processing — applying computational rigor to biological complexity.
              </p>
            </div>
            <div className="parchment-card p-8 space-y-6">
              <div>
                <h3 className="font-display text-sepia text-sm uppercase tracking-widest mb-3">Education</h3>
                <p className="text-ink font-semibold text-lg">Bachelor of Science</p>
                <p className="text-ink-mid">Biology & Physics, UBC — Expected 2028</p>
              </div>
              <div>
                <h3 className="font-display text-sepia text-sm uppercase tracking-widest mb-3">Core Interests</h3>
                <ul className="space-y-2 text-ink-light">
                  <li className="flex items-start gap-2"><span className="text-sepia mt-1">→</span> Neural signal processing & EEG systems</li>
                  <li className="flex items-start gap-2"><span className="text-sepia mt-1">→</span> Machine learning for biosignal interpretation</li>
                  <li className="flex items-start gap-2"><span className="text-sepia mt-1">→</span> Hardware-software integration</li>
                  <li className="flex items-start gap-2"><span className="text-sepia mt-1">→</span> Data-driven optimization</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="ornament mb-16">
            <h2 className="font-display text-5xl font-bold text-ink">Experience</h2>
          </div>
          <div className="space-y-6">
            {experience.map((exp, i) => (
              <div key={i} className="greek-border p-8 card-hover">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h3 className="font-display text-2xl font-bold text-ink">{exp.role}</h3>
                    <p className="text-sepia font-semibold text-lg">{exp.org}</p>
                  </div>
                  <span className="font-mono text-sm text-ink-mid px-4 py-2 bg-parchment-dark rounded">{exp.period}</span>
                </div>
                <p className="text-ink-light leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-8 bg-gradient-to-b from-parchment-dark to-parchment">
        <div className="max-w-6xl mx-auto">
          <div className="ornament mb-16">
            <h2 className="font-display text-5xl font-bold text-ink">Technical Stack</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((sk, i) => (
              <div key={i} className="parchment-card p-8">
                <h3 className="font-display text-sepia text-sm uppercase tracking-widest mb-6 pb-3 border-b-2 border-sepia/20">{sk.cat}</h3>
                <div className="flex flex-wrap gap-2">
                  {sk.items.map((item, j) => (
                    <span key={j} className="px-3 py-1.5 bg-parchment-deeper/50 text-ink-mid text-sm rounded border border-parchment-deeper">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="ornament mb-12">
            <h2 className="font-display text-5xl font-bold text-ink">Connect</h2>
          </div>
          <p className="text-xl text-ink-mid mb-10 leading-relaxed">
            Open to research collaborations, technical roles, and conversations about neurotechnology, machine learning, and biophysics engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="mailto:furqazaheerxi6@gmail.com" className="px-10 py-5 bg-sepia text-parchment font-display font-bold text-lg hover:bg-sepia-light transition-all glow-sepia">furqazaheerxi6@gmail.com</a>
            <a href="tel:7782311590" className="px-10 py-5 border-2 border-ink text-ink font-display font-bold text-lg hover:bg-ink hover:text-parchment transition-all">778-231-1590</a>
          </div>
          <p className="mt-12 font-mono text-sm text-stone">Vancouver, BC · March 2026</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-8 border-t-2 border-parchment-deeper">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-display text-sm text-ink-mid tracking-wider">FURQAN ZAHEER — MMXXVI</p>
          <p className="font-mono text-xs text-stone">Biology × Physics × Machine Learning</p>
        </div>
      </footer>
    </main>
  );
}
