'use client';
import { useState } from 'react';

const skills = [
  { category: 'Embedded Systems', items: ['STM32', 'ADS1299', 'SPI/I2C/UART', 'ADC integration', 'Right-leg drive circuits'] },
  { category: 'PCB Design', items: ['4-layer PCB design', 'KiCad', 'Signal integrity', 'Sub-1μV noise floor', 'Biopotential AFE'] },
  { category: 'Machine Learning', items: ['LDA classifiers', 'Signal feature extraction', 'Cross-validation', 'Python/NumPy/SciPy'] },
  { category: 'Programming', items: ['Python', 'C/C++', 'R', 'MATLAB', 'Git/GitHub'] },
  { category: 'Physics & Math', items: ['Propulsion physics', 'Fluid mechanics', 'Statistics & data analysis', 'Differential equations'] },
  { category: 'Lab Skills', items: ['Sensor integration', 'Hardware iteration', 'Oscilloscope/logic analyzer', 'Thrust measurement', 'Failure diagnosis'] },
];

const projects = [
  {
    title: 'MINT — Modular EEG Interface',
    subtitle: 'Neurotechnology Research Platform',
    description: 'Custom 8-channel neural acquisition device built around the ADS1299 biopotential AFE and a custom 4-layer PCB. Achieved a sub-1μV noise floor and successfully captured alpha-wave signals and P300 event-related potentials at under $150 total cost vs. $5,000+ commercial alternatives.',
    tags: ['ADS1299', 'STM32', '4-layer PCB', 'KiCad', 'Python', 'Biopotential AFE'],
    metrics: ['Sub-1μV noise floor', 'P300 ERP detection', '<$150 total cost', '8-channel acquisition'],
  },
  {
    title: 'Muscle to Movement',
    subtitle: 'EMG-Driven Prosthetic Control System',
    description: 'EMG-driven prosthetic classification system achieving 92% gesture accuracy across 6 hand movements with a <80ms latency pipeline. Used surface electrodes, a dual-stage INA amplifier circuit, 8-channel ADC, and LDA classifier trained with cross-validation.',
    tags: ['EMG', 'LDA', 'INA amplifier', 'Python', 'SciPy', 'Hardware iteration'],
    metrics: ['92% gesture accuracy', '<80ms latency', '6 hand movements', '3 hardware revisions'],
  },
  {
    title: 'Propulsion-Coupled Avionics',
    subtitle: 'Future Project — UBC Rocket',
    description: 'Planned integration of sensor fusion pipelines with liquid propulsion instrumentation. Target: real-time thrust measurement, chamber pressure logging, and sensor dropout detection for flight-ready avionics.',
    tags: ['Sensor fusion', 'Thrust measurement', 'Real-time systems', 'Flight avionics'],
    metrics: ['In development', 'Propulsion subteam', 'Sensor fusion', 'Real-time'],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-gray-100">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0a0a]/90 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="font-mono text-sm text-[#e85d04] tracking-wider">FZ</span>
          <div className="flex gap-8 text-sm text-gray-400">
            {['About', 'Projects', 'Skills', 'Contact'].map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="hover:text-white transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex flex-col justify-center px-6 pt-20 max-w-6xl mx-auto">
        <div className="mb-4">
          <span className="font-mono text-[#e85d04] text-sm tracking-widest uppercase">Engineering Portfolio</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          Furqan<br />
          <span className="text-gray-500">Zaheer</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mb-8 leading-relaxed">
          Physics-driven undergrad exploring propulsion systems, machine learning, and experimental hardware design — seeking to build real things that work.
        </p>
        <div className="flex flex-wrap gap-3 mb-12 font-mono text-sm">
          {['BSc Biology & Physics, UBC (2028)', 'Vancouver, BC', 'Applying: Propulsion Subteam'].map((tag) => (
            <span key={tag} className="px-3 py-1.5 border border-white/10 text-gray-400 rounded">{tag}</span>
          ))}
        </div>
        <div className="flex gap-4">
          <a href="#projects" className="px-6 py-3 bg-[#e85d04] text-white text-sm font-medium hover:bg-[#d44d00] transition-colors rounded">
            View Projects
          </a>
          <a href="mailto:furqazaheerxi6@gmail.com" className="px-6 py-3 border border-white/20 text-gray-300 text-sm font-medium hover:border-white/40 transition-colors rounded">
            Get in Touch
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="font-mono text-[#e85d04] text-sm tracking-widest uppercase">About</span>
            <h2 className="text-4xl font-bold mt-3 mb-6">Engineering Philosophy</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              My father built plasma guns, designed nitrogen-powered derby cars, and built annular air jets in our living room. I grew up understanding that physics is not abstract — it is something you build, break, and rebuild.
            </p>
            <p className="text-gray-400 leading-relaxed mb-4">
              I study Biology and Physics at UBC because living systems are the most complex engineering problems that exist. Understanding how ion channels fire, how muscles actuate, and how nerves encode signals gives me a different lens for approaching hardware design.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My iteration loop: Build → Test → Analyze → Improve. I do not stop when something works. I stop when I understand why it works.
            </p>
          </div>
          <div className="space-y-4">
            <div className="border border-white/10 p-6 rounded">
              <div className="font-mono text-[#e85d04] text-xs mb-2 uppercase tracking-wider">Engineering Interests</div>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>→ Propulsion physics and liquid jet systems</li>
                <li>→ Embedded sensor integration and signal acquisition</li>
                <li>→ Hardware-software co-design for real-time systems</li>
                <li>→ Machine learning applied to biosignals</li>
              </ul>
            </div>
            <div className="border border-white/10 p-6 rounded">
              <div className="font-mono text-[#e85d04] text-xs mb-2 uppercase tracking-wider">Education</div>
              <p className="text-gray-300 text-sm font-medium">BSc Biology and Physics</p>
              <p className="text-gray-500 text-sm">University of British Columbia — Expected 2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <span className="font-mono text-[#e85d04] text-sm tracking-widest uppercase">Projects</span>
          <h2 className="text-4xl font-bold mt-3 mb-16">Key Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="border border-white/10 p-8 rounded hover:border-[#e85d04]/40 transition-colors group">
                <div className="font-mono text-[#e85d04] text-xs mb-1 uppercase tracking-wider">{p.subtitle}</div>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-32 px-6 max-w-6xl mx-auto">
        <span className="font-mono text-[#e85d04] text-sm tracking-widest uppercase">Skills</span>
        <h2 className="text-4xl font-bold mt-3 mb-16">Technical Stack</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((s, i) => (
            <div key={i} className="border border-white/10 p-6 rounded">
              <div className="font-mono text-[#e85d04] text-xs mb-4 uppercase tracking-wider">{s.category}</div>
              <ul className="space-y-2">
                {s.items.map((item, j) => (
                  <li key={j} className="text-gray-400 text-sm flex items-center gap-2">
                    <span className="w-1 h-1 bg-[#e85d04] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-32 px-6 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto text-center">
          <span className="font-mono text-[#e85d04] text-sm tracking-widest uppercase">Contact</span>
          <h2 className="text-4xl font-bold mt-3 mb-6">Let\'s Build Something</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-10">
            Interested in propulsion systems, avionics, and sensor integration. Open to research roles, team projects, and engineering conversations.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="mailto:furqazaheerxi6@gmail.com" className="px-8 py-4 bg-[#e85d04] text-white font-medium hover:bg-[#d44d00] transition-colors rounded">
              furqazaheerxi6@gmail.com
            </a>
            <a href="tel:7782311590" className="px-8 py-4 border border-white/20 text-gray-300 hover:border-white/40 transition-colors rounded">
              778-231-1590
            </a>
          </div>
          <p className="mt-8 text-gray-600 text-sm font-mono">Vancouver, BC — March 2026</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <span className="font-mono text-gray-600 text-sm">Furqan Zaheer — 2026</span>
          <span className="font-mono text-gray-700 text-xs">Physics × Hardware × ML</span>
        </div>
      </footer>
    </main>
  );
}
