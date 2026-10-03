import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// Content guardrails for the evidence-backed portfolio correction.
// These detect regressions in copy, not the truth of future project results.
const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const projects = read("src/components/projects.tsx");
const about = read("src/components/about.tsx");
const root = read("src/routes/__root.tsx");

for (const unsupported of [
  "RunLedger",
  "Pattern OS",
  "82%",
  "14-channel",
  "256 Hz",
  "sub-100ms",
  "imagined speech",
  "0.4%",
  "1.2%",
  "97%",
  "Systems I have built",
  "CNN-LSTM",
]) {
  assert.ok(!projects.includes(unsupported), `Unsupported project copy: ${unsupported}`);
}

for (const unsupported of [
  "AnimatedCounter",
  "Projects Built",
  "Active Systems",
  "pursuing Biophysics",
  "robotic",
  "telepathic",
]) {
  assert.ok(!about.includes(unsupported), `Unsupported About copy: ${unsupported}`);
}

assert.match(about, /Biology Co-op student at UBC/);
assert.ok(!root.includes("Biophysics undergraduate"));
assert.match(projects, /design/i);
assert.match(projects, /team member/i);
assert.match(projects, /Ari Kinarthy/);
assert.match(projects, /https:\/\/engineering\.ok\.ubc\.ca\/2026\/05\/21\//);
assert.match(
  projects,
  /https:\/\/www\.linkedin\.com\/feed\/update\/urn:li:ugcPost:7454802572634365952\//,
);
assert.match(projects, /aria-label/);

console.log("Portfolio claim guardrails passed.");
