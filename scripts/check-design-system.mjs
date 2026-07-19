import { readFile, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const required = [
  'public/design/tokens.js',
  'public/design/components.js',
  'public/design/design-system.css',
  'public/design-system-demo.html',
  'docs/accessibility-ui-guidelines.md',
  'docs/responsive-design-guidelines.md'
];
for (const path of required) await access(path);

const [tokens, components, css, demo, accessibility] = await Promise.all([
  readFile(required[0], 'utf8'), readFile(required[1], 'utf8'), readFile(required[2], 'utf8'), readFile(required[3], 'utf8'), readFile(required[4], 'utf8')
]);

for (const token of ['primary', 'secondary', 'background', 'text', 'success', 'reward', 'warning', 'error', 'contrast', 'display', 'reading', 'button', 'parentDashboard', 'small', 'medium', 'large', 'extraLarge', 'reduced']) {
  if (!tokens.includes(token)) throw new Error(`Design token coverage missing: ${token}`);
}
for (const name of ['PrimaryButton','SecondaryButton','RewardButton','NavigationButton','BookCard','MissionCard','AchievementCard','LearningReportCard','ConfirmationDialog','HelpDialog','RewardDialog','CompanionAvatar','CompanionSpeechBubble','CompanionEmotionState']) {
  if (!components.includes(`export const ${name}`) && !components.includes(`export function ${name}`)) throw new Error(`Missing component export: ${name}`);
}
for (const state of ['happy','thinking','encouraging','celebrating','resting']) if (!components.includes(`'${state}'`)) throw new Error(`Missing companion state: ${state}`);
if (!components.includes("event.key === 'Escape'") || !components.includes("event.key !== 'Tab'") || !components.includes('opener?.focus()')) throw new Error('Dialog focus management contract is incomplete');
if (!css.includes('min-height: 3rem') || !css.includes(':focus-visible')) throw new Error('Button touch target or focus styling is missing');
if (!css.includes('@media (prefers-reduced-motion: reduce)') || !css.includes('animation-duration: 1ms')) throw new Error('Reduced-motion override is missing');
if (/onclick\s*=|onkeydown\s*=/i.test(demo)) throw new Error('Demo contains unsafe inline event handlers');
for (const forbidden of ['direct message','public child profile','payment form','location tracking','follower']) {
  if (components.toLowerCase().includes(forbidden)) throw new Error(`Component foundation exposes unsafe interaction: ${forbidden}`);
}
for (const requirement of ['keyboard', 'screen reader', 'reduced motion', 'quiet mode', 'narration', 'contrast', 'touch']) {
  if (!accessibility.toLowerCase().includes(requirement)) throw new Error(`Accessibility guidance missing: ${requirement}`);
}

const port = 4188;
const server = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
try {
  await new Promise((resolve) => setTimeout(resolve, 450));
  for (const path of ['/design-system-demo.html','/design/tokens.js','/design/components.js','/design/design-system.css']) {
    const response = await fetch(`http://127.0.0.1:${port}${path}`);
    if (!response.ok || !(await response.text()).trim()) throw new Error(`Design-system asset did not render: ${path}`);
  }
} finally {
  server.kill();
}

console.log('Design-system check passed: tokens, components, keyboard/dialog contract, reduced motion, safe boundaries, docs, and served demo assets.');
