import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const modules = process.env.BROWSER_AUTOMATION_NODE_MODULES;
const requireBrowser = modules ? createRequire(join(modules, 'package.json')) : createRequire(import.meta.url);
let chromium;
try {
  ({ chromium } = requireBrowser('playwright-core'));
} catch {
  ({ chromium } = requireBrowser('playwright'));
}
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

  const lab = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const labPage = await lab.newPage();
  await labPage.goto('http://127.0.0.1:4192/design-system-demo.html', { waitUntil: 'networkidle' });
  if (await labPage.locator('.r2e-button').count() < 8) throw new Error('Design laboratory did not render the reusable buttons and dialog triggers.');
  if (await labPage.locator('.r2e-card').count() < 9) throw new Error('Design laboratory did not render card and companion patterns.');
  const primary = labPage.getByRole('button', { name: 'Begin mission' });
  await primary.focus();
  if (!await primary.evaluate((node) => node.matches(':focus-visible'))) throw new Error('Primary button lacks keyboard-visible focus.');
  const confirmationTrigger = labPage.getByRole('button', { name: 'Open confirmation' });
  await confirmationTrigger.focus();
  await confirmationTrigger.press('Enter');
  const openDialog = labPage.getByRole('dialog', { name: 'Prototype grown-up confirmation' });
  await openDialog.waitFor();
  const closeDialog = openDialog.getByRole('button', { name: 'Close' });
  const continueDialog = openDialog.getByRole('button', { name: 'Continue' });
  if (!await closeDialog.evaluate((node) => node === document.activeElement)) throw new Error('Dialog did not move focus to its first safe action.');
  await closeDialog.press('Shift+Tab');
  if (!await continueDialog.evaluate((node) => node === document.activeElement)) throw new Error('Dialog did not wrap backward focus.');
  await continueDialog.press('Tab');
  if (!await closeDialog.evaluate((node) => node === document.activeElement)) throw new Error('Dialog did not trap forward focus.');
  await labPage.keyboard.press('Escape');
  if (await openDialog.isVisible()) throw new Error('Escape did not close the dialog.');
  if (!await confirmationTrigger.evaluate((node) => node === document.activeElement)) throw new Error('Dialog did not return focus to its trigger.');
  const celebrationDuration = await labPage.locator('.r2e-companion--celebrating').evaluate((node) => getComputedStyle(node).animationDuration);
  if (!['0s','0.001s'].includes(celebrationDuration)) throw new Error(`Reduced motion did not minimise celebration: ${celebrationDuration}`);
  await labPage.screenshot({ path: join(outputDir, 'design-system-laboratory-desktop.png'), fullPage: true });
  await lab.close();

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
  const mobilePage = await mobile.newPage();
  await mobilePage.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
  const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (overflow) throw new Error('Mobile layout has horizontal overflow.');
  await mobilePage.screenshot({ path: join(outputDir, 'read2earn-welcome-mobile.png'), fullPage: true });
  await mobilePage.goto('http://127.0.0.1:4192/design-system-demo.html', { waitUntil: 'networkidle' });
  const labOverflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (labOverflow) throw new Error('Design-system laboratory has horizontal overflow on mobile.');
  await mobilePage.screenshot({ path: join(outputDir, 'design-system-laboratory-mobile.png'), fullPage: true });
  await mobile.close();

  for (const viewport of [
    { name: 'compact-320', width: 320, height: 740 },
    { name: 'mobile-375', width: 375, height: 812 },
    { name: 'tablet-768', width: 768, height: 1024 }
  ]) {
    const context = await browser.newContext({ viewport, reducedMotion: 'reduce' });
    const onboarding = await context.newPage();
    await onboarding.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
    await onboarding.screenshot({ path: join(outputDir, `onboarding-welcome-${viewport.name}.png`), fullPage: true });
    await onboarding.getByRole('button', { name: /begin my adventure/i }).click();
    await onboarding.screenshot({ path: join(outputDir, `onboarding-companion-${viewport.name}.png`), fullPage: true });
    const horizontalOverflow = await onboarding.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (horizontalOverflow) throw new Error(`Onboarding overflow at ${viewport.width}px.`);
    await context.close();
  }

  const keyboard = await browser.newContext({ viewport: { width: 768, height: 1024 }, reducedMotion: 'reduce' });
  const keyboardPage = await keyboard.newPage();
  await keyboardPage.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
  const begin = keyboardPage.getByRole('button', { name: /begin my adventure/i });
  await begin.focus();
  await begin.press('Enter');
  await keyboardPage.getByLabel(/what should we call you/i).focus();
  await keyboardPage.keyboard.type('Timi');
  await keyboardPage.getByLabel('Name your companion').focus();
  await keyboardPage.keyboard.press('Control+A');
  await keyboardPage.keyboard.type('Lumi');
  await keyboardPage.getByRole('button', { name: /meet my companion/i }).focus();
  await keyboardPage.keyboard.press('Enter');
  if (!await keyboardPage.locator('[data-screen="confirm"]').isVisible()) throw new Error('Keyboard-only onboarding did not reach the grown-up gate.');
  await keyboard.close();

  const zoomed = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  const zoomedPage = await zoomed.newPage();
  await zoomedPage.goto('http://127.0.0.1:4192/', { waitUntil: 'networkidle' });
  await zoomedPage.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  const zoomOverflow = await zoomedPage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  if (zoomOverflow) throw new Error('Welcome screen has horizontal overflow at 200% text size.');
  await zoomedPage.screenshot({ path: join(outputDir, 'onboarding-welcome-200-percent-text.png'), fullPage: true });
  await zoomed.close();

  console.log(`Visual journey passed: live prototype regression, onboarding at 320/375/768/desktop, keyboard journey, 200% text, design-system rendering, modal focus, reduced motion, and overflow checks. Screenshots: ${outputDir}`);
} finally {
  await browser?.close();
  server.kill();
}
