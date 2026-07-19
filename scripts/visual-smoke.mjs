import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const modules = process.env.BROWSER_AUTOMATION_NODE_MODULES;
if (!modules) throw new Error('Set BROWSER_AUTOMATION_NODE_MODULES to a node_modules directory containing Playwright.');
const requireFromBundle = createRequire(join(modules, 'package.json'));
const { chromium } = requireFromBundle('playwright');
const outputDir = resolve(process.env.QA_OUTPUT_DIR || join(tmpdir(), 'read2earn-qa'));
await mkdir(outputDir, { recursive: true });

const server = spawn(process.execPath, ['server.mjs'], { env: { ...process.env, PORT: '4192' }, stdio: 'ignore' });
let browser;

async function waitForServer() {
  for (let attempt = 0; attempt < 30; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:4192/');
      if (response.ok) return;
    } catch { /* Server is still starting. */ }
    await new Promise((resolveWait) => setTimeout(resolveWait, 150));
  }
  throw new Error('Local prototype server did not start.');
}

try {
  await waitForServer();
  browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe' });
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  const page = await desktop.newPage();
  await page.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: join(outputDir, 'read2earn-welcome-desktop.png'), fullPage: true });
  await page.getByRole('button', { name: /grown-up preview/i }).click();
  if (await page.locator('#reportStories').textContent() !== '0' || await page.locator('#evidencePill').textContent() !== 'Awaiting evidence') throw new Error('Preview report claims learning evidence before mission completion.');
  await page.getByRole('button', { name: /restart demo/i }).click();

  await page.getByRole('button', { name: /begin my adventure/i }).click();
  await page.locator('input[name="avatar"][value="🦉"]').check();
  await page.getByLabel(/what should we call you/i).fill('Mina');
  await page.getByLabel('Name your companion').fill('Nova');
  await page.getByRole('button', { name: /meet my companion/i }).click();
  if (!await page.locator('[data-screen="confirm"]').isVisible() || await page.locator('[data-screen="map"]').isVisible()) throw new Error('Learning world opened before grown-up confirmation.');
  if (!await page.locator('#confirmProfile').isDisabled()) throw new Error('Grown-up confirmation action should begin disabled.');
  await page.screenshot({ path: join(outputDir, 'read2earn-grown-up-gate-desktop.png'), fullPage: true });
  await page.getByLabel(/Growing Reader/).check();
  await page.locator('#onboardingSpeechRate').fill('1');
  await page.getByLabel(/I’m a grown-up/i).check();
  await page.getByRole('button', { name: /confirm & enter learning world/i }).click();
  const profile = await page.evaluate(() => JSON.parse(localStorage.getItem('read2earn-demo-profile')));
  if (profile?.readingLevel !== 'growing' || profile?.grownUpConfirmed !== true) throw new Error('Reading level or grown-up confirmation was not saved.');
  await page.getByRole('button', { name: /story forest/i }).click();
  await page.getByRole('button', { name: /read with my companion/i }).click();
  await page.evaluate(() => Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: undefined }));
  await page.getByRole('button', { name: /read this part/i }).click();
  await page.waitForTimeout(700);
  await page.getByRole('button', { name: /open comfort settings/i }).click();
  await page.locator('#quietMode').check();
  await page.getByRole('button', { name: /save settings/i }).click();
  await page.getByRole('button', { name: /read this part/i }).click();
  await page.waitForTimeout(1800);
  if (await page.locator('#toast').textContent() !== 'Quiet mode is on.' || !await page.locator('#toast').evaluate((node) => node.classList.contains('show'))) {
    throw new Error('An earlier toast timeout cleared the newer live-region message.');
  }
  await page.getByRole('button', { name: /next part/i }).click();
  await page.getByRole('button', { name: /next part/i }).click();
  await page.getByRole('button', { name: 'patiently' }).click();
  await page.getByText(/in a calm way while giving something enough time/i).waitFor();
  await page.getByRole('button', { name: /next part/i }).click();
  await page.getByRole('button', { name: /tell what happened/i }).click();
  await page.getByPlaceholder(/i think nia helped/i).fill('The light was safe');
  await page.getByRole('button', { name: /share with my companion/i }).click();
  await page.getByRole('button', { name: /improve my answer/i }).waitFor();
  if (await page.locator('#gemCount').textContent() !== '0' || await page.locator('[data-screen="reward"]').isVisible()) throw new Error('Knowledge Gem was exposed without comprehension evidence.');
  await page.getByRole('button', { name: /improve my answer/i }).click();
  await page.getByPlaceholder(/i think nia helped/i).fill('Nia helped the firefly patiently, and its light made the forest path safe.');
  await page.getByRole('button', { name: /share with my companion/i }).click();
  await page.getByRole('button', { name: /continue mission/i }).waitFor();
  await page.getByRole('button', { name: /continue mission/i }).click();
  await page.locator('input[name="rating"][value="10"]').check();
  await page.getByRole('button', { name: /save mission/i }).click();
  await page.getByRole('heading', { name: /learning report with real evidence/i }).waitFor();
  if (await page.locator('#reportStories').textContent() !== '1') throw new Error('Completed-story evidence missing from report.');
  if (await page.locator('#reportGems').textContent() !== '1') throw new Error('Knowledge Gem evidence missing from report.');
  if (await page.locator('#reportName').textContent() !== 'Mina') throw new Error('Custom child nickname missing from report.');
  if (await page.locator('#reportLevel').textContent() !== 'Growing Reader') throw new Error('Saved reading level missing from report.');
  await page.waitForTimeout(2500);
  await page.screenshot({ path: join(outputDir, 'read2earn-report-desktop.png'), fullPage: true });
  await desktop.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
  const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (overflow) throw new Error('Mobile layout has horizontal overflow.');
  await mobilePage.screenshot({ path: join(outputDir, 'read2earn-welcome-mobile.png'), fullPage: true });
  await mobile.close();

  console.log(`Visual journey passed: grown-up gate, reading level, speech fallback, custom naming, story navigation, vocabulary, strict comprehension, Knowledge Gem, parent report, and mobile overflow. Screenshots: ${outputDir}`);
} finally {
  await browser?.close();
  server.kill();
}
