import { readFile, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';

const required = ['AGENTS.md','README.md','.env.example','server.mjs','render.yaml','.github/workflows/ci.yml','docs/product-experience.md','docs/prototype-scope.md','docs/architecture.md','docs/safety-and-privacy.md','public/index.html','public/styles.css','public/app.js','public/data/story.json'];
for (const path of required) await access(path);

const [html, client, env, agents, story, workflow, deployment, serverSource] = await Promise.all([
  readFile('public/index.html','utf8'), readFile('public/app.js','utf8'), readFile('.env.example','utf8'), readFile('AGENTS.md','utf8'), readFile('public/data/story.json','utf8'),
  readFile('.github/workflows/ci.yml','utf8'), readFile('render.yaml','utf8'), readFile('server.mjs','utf8')
]);

const screens = ['welcome','setup','confirm','map','mission','reader','comprehension','reward','report'];
for (const screen of screens) {
  if (!html.includes(`data-screen="${screen}"`)) throw new Error(`Missing screen: ${screen}`);
}
for (const term of ['custom name','Knowledge Gem','reduced-motion','No open child profiles']) {
  if (!agents.toLowerCase().includes(term.toLowerCase())) throw new Error(`AGENTS.md missing invariant: ${term}`);
}
if (/OPENAI_API_KEY|sk-[a-z0-9]/i.test(client)) throw new Error('Client contains a secret or API-key reference');
if (/\bonclick\s*=/i.test(html)) throw new Error('Inline onclick JavaScript is not allowed');
if (/(^|[^.])\bspeechSynthesis\?\./m.test(client)) throw new Error('Speech synthesis must use safe window-based feature detection');
for (const label of ['Emerging Reader','Growing Reader','Confident Reader','PROTOTYPE GROWN-UP GATE']) {
  if (!html.includes(label)) throw new Error(`Missing privacy or grown-up gate element: ${label}`);
}
for (const mapRequirement of ['interactive-world-map','mapGuidance','data-locked','MISSION READY']) {
  if (!html.includes(mapRequirement)) throw new Error(`Missing interactive Learning World requirement: ${mapRequirement}`);
}
for (const missionRequirement of ['story-mission-screen','mission-objectives','missionCompanion','immersive-reader-screen','readerScene','chapterDots','sceneMoment']) {
  if (!html.includes(missionRequirement)) throw new Error(`Missing immersive Story Forest requirement: ${missionRequirement}`);
}
for (const clientRequirement of ['chapterTitles','sceneMoments',"dataset.moment = String(state.page + 1)"]) {
  if (!client.includes(clientRequirement)) throw new Error(`Missing interactive story progression behavior: ${clientRequirement}`);
}
if (/type=["']date/i.test(html) || /id=["'][^"']*(birth|dob)/i.test(html)) throw new Error('Prototype must not collect a birth date');
if (/OPENAI_API_KEY=\S+/.test(env)) throw new Error('.env.example contains a real-looking secret');
for (const requirement of ['node-version: 20', 'run: npm test', 'run: git diff --check']) {
  if (!workflow.includes(requirement)) throw new Error(`CI workflow missing: ${requirement}`);
}
if (!serverSource.includes("process.env.HOST || '0.0.0.0'") || !serverSource.includes("process.env.PORT || 4173") || !serverSource.includes("request.url?.split('?')[0] === '/health'")) throw new Error('Server is not cloud-host ready');
if (/OPENAI_API_KEY\s*:\s*\S+/.test(deployment) || /sk-[a-z0-9]/i.test(deployment)) throw new Error('Deployment configuration contains a credential');
const parsedStory = JSON.parse(story);
if (parsedStory.paragraphs.length !== 4 || Object.keys(parsedStory.words).length < 3) throw new Error('Story fixture is incomplete');

const port = 4187;
const child = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: String(port) }, stdio: 'ignore' });
try {
  await new Promise((resolve) => setTimeout(resolve, 450));
  const root = await fetch(`http://127.0.0.1:${port}/`);
  const health = await fetch(`http://127.0.0.1:${port}/health`);
  const data = await fetch(`http://127.0.0.1:${port}/data/story.json`);
  const feedback = await fetch(`http://127.0.0.1:${port}/api/comprehension`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ answer:'Nia helped the firefly patiently, and its light made the path safe.' }) });
  const retryFeedback = await fetch(`http://127.0.0.1:${port}/api/comprehension`, { method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({ answer:'The light was safe' }) });
  if (!root.ok || !health.ok || !data.ok || !feedback.ok) throw new Error('Server smoke test failed');
  if ((await health.json()).status !== 'ok') throw new Error('Health endpoint returned an invalid response');
  const result = await feedback.json();
  const retryResult = await retryFeedback.json();
  if (!result.understood || result.evidence.length !== 3) throw new Error('Comprehension fallback did not require all three semantic categories');
  if (retryResult.understood) throw new Error('Comprehension fallback rewarded an unsupported answer');
  if (feedback.headers.get('x-feedback-source') !== 'local') throw new Error('Missing local feedback source boundary');
} finally {
  child.kill();
}

console.log(`Foundation check passed: ${required.length} files, ${screens.length} screens, safety boundary, sample story, static server, and comprehension fallback.`);
