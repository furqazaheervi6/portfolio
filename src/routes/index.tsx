import { createFileRoute } from "@tanstack/react-router";
import { NeuralBackground } from "../components/neural-background";
import { CursorEffects } from "../components/cursor-effects";
import { Nav } from "../components/nav";
import { Hero } from "../components/hero";
import { About } from "../components/about";
import { Projects } from "../components/projects";
import { Skills } from "../components/skills";
import { Contact } from "../components/contact";
import { Footer } from "../components/footer";
import { SignalDivider } from "../components/signal-divider";
import { ScrollProgress } from "../components/scroll-progress";
import { CircuitTrace } from "../components/circuit-trace";
import { DualityBridge } from "../components/duality-bridge";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <NeuralBackground />
      <CursorEffects />
      <ScrollProgress />
      <Nav mode="professional" />
      <main className="relative">
        <Hero />

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <About />

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <Projects />

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <Skills />

        <div className="relative">
          <CircuitTrace />
          <SignalDivider />
        </div>

        <DualityBridge from="professional" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}



