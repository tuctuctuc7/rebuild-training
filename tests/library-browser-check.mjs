// Rootless Linux runner (reuse extracted libraries; no sudo/system changes):
// LD_LIBRARY_PATH=/tmp/morning-webkit-libs/root/usr/lib/x86_64-linux-gnu:/tmp/morning-browser-libs/extracted/usr/lib/x86_64-linux-gnu \
// PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1 PLAYWRIGHT_MODULE=/home/tom/projects/morning-weight/node_modules/playwright \
// LIBRARY_BASE_URL=http://localhost:3137 node tests/library-browser-check.mjs
// Start a local Next production server first: npx next start --hostname 127.0.0.1 --port 3137
// Override paths/base URL as needed; real browser launch verifies the isolated libraries.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.LIBRARY_BASE_URL || 'http://127.0.0.1:3137';
const artifacts = process.env.QA_ARTIFACTS || '/tmp/rebuild-library-qa';
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const legacy = '{"checkIns":{"legacy":{"pain":2}},"progress":{"legacy":{"x":[true]}},"history":[{"id":"keep"}],"gymExercises":{},"unknown":"preserve verbatim"}';
try {
  for (const width of [320, 390, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, hasTouch: true });
    await context.addInitScript(value => {
      if (!localStorage.getItem('rebuild-training-v1')) localStorage.setItem('rebuild-training-v1', value);
      Object.defineProperty(navigator, 'standalone', { value: true });
    }, legacy);
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(base + '/get-fit/');
    await page.waitForFunction(() => document.documentElement.classList.contains('standalone-app'));
    const cards = page.locator('[data-exercise-id]');
    assert.equal(await cards.count(), 27);
    const ids = await cards.evaluateAll(nodes => nodes.map(n => n.dataset.exerciseId).sort());
    assert.equal(await page.getByRole('tab').count(), 2);
    assert.equal(await page.locator('.week-chip,.bottom-nav,[role="timer"],input[type="range"],.set-check,.checkin-card').count(), 0);
    const info = page.getByRole('button', { name: 'About session 01', exact: true });
    const target = await info.boundingBox();
    assert.ok(target.width >= 44 && target.height >= 44, 'info touch target');
    const icon = await info.locator('span').boundingBox();
    assert.ok(icon.width <= 24 && icon.height <= 24, 'compact visible info icon');
    assert.equal(await info.evaluate(n => getComputedStyle(n).backgroundColor), 'rgba(0, 0, 0, 0)', 'transparent hit area');
    assert.equal(await info.getAttribute('aria-expanded'), 'false');
    const detail = page.locator(`[id="${await info.getAttribute('aria-controls')}"]`);
    assert.equal(await detail.isVisible(), false);
    await info.focus(); await page.keyboard.press('Enter');
    assert.equal(await detail.isVisible(), true);
    await page.keyboard.press('Space');
    assert.equal(await detail.isVisible(), false);
    await info.tap();
    assert.equal(await detail.isVisible(), true);
    await info.tap();
    const first = cards.first().getByRole('button');
    await first.click();
    assert.equal(await cards.first().getByRole('link').count(), 1);
    await first.click();
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction(() => !document.querySelector('.status-bar-scrim').classList.contains('visible'));
    await page.screenshot({ path: `${artifacts}/session-${width}.png`, fullPage: true });
    async function noOverflow() {
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'document overflow');
      assert.deepEqual(await page.locator('.library-session,.library-exercise').evaluateAll(nodes => nodes.filter(n => n.scrollWidth > n.clientWidth + 1).map(n => n.className)), [], 'card overflow');
    }
    await noOverflow();
    await page.getByRole('tab', { name: 'By muscle area' }).tap();
    assert.equal(await page.getByRole('tab', { name: 'By muscle area' }).getAttribute('aria-selected'), 'true');
    await page.getByRole('tab', { name: 'By session', exact: true }).tap();
    await page.getByRole('tab', { name: 'By session', exact: true }).focus();
    await page.keyboard.press('ArrowRight');
    assert.equal(await page.getByRole('tab', { name: 'By muscle area' }).getAttribute('aria-selected'), 'true');
    assert.equal(await cards.count(), 0, 'areas start collapsed without exercise cards');
    assert.equal(await page.locator('.session-info-button').count(), 0, 'no info triggers in areas');
    const toggles = page.locator('.area-toggle');
    assert.equal(await toggles.count(), 6);
    for (const toggle of await toggles.all()) {
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(await page.locator(`[id="${await toggle.getAttribute('aria-controls')}"]`).isVisible(), false);
    }
    await noOverflow();
    await page.screenshot({ path: `${artifacts}/area-collapsed-${width}.png`, fullPage: true });
    await toggles.nth(0).focus(); await page.keyboard.press('Enter');
    assert.equal(await toggles.nth(0).getAttribute('aria-expanded'), 'true');
    await toggles.nth(1).tap();
    assert.equal(await toggles.nth(0).getAttribute('aria-expanded'), 'true', 'independent expansion');
    assert.equal(await toggles.nth(1).getAttribute('aria-expanded'), 'true');
    await toggles.nth(0).focus(); await page.keyboard.press('Space');
    assert.equal(await toggles.nth(0).getAttribute('aria-expanded'), 'false');
    assert.equal(await toggles.nth(1).getAttribute('aria-expanded'), 'true');
    for (const toggle of await toggles.all()) {
      if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.tap();
      const panel = page.locator(`[id="${await toggle.getAttribute('aria-controls')}"]`);
      assert.equal(await panel.isVisible(), true);
      const count = await panel.locator('[data-exercise-id]').count();
      assert.match(await toggle.innerText(), new RegExp(`${count} exercise`));
      assert.ok((await toggle.boundingBox()).height >= 44);
    }
    const areaIds = await cards.evaluateAll(nodes => nodes.map(n => n.dataset.exerciseId));
    assert.deepEqual([...new Set(areaIds)].sort(), ids);
    assert.ok(areaIds.length > 27);
    await noOverflow();
    // Every reference exposes its original links and dose, without tracking controls.
    for (const card of await cards.all()) await card.getByRole('button').click();
    await noOverflow();
    assert.equal(await page.locator('a[href="https://www.youtube.com/shorts/wKWAOJ4tAhM"]').count(), 1);
    assert.ok(await page.getByText('Dosage not supplied — confirm with Dr. Joe', { exact: true }).count());
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction(() => !document.querySelector('.status-bar-scrim').classList.contains('visible'));
    await page.screenshot({ path: `${artifacts}/area-${width}.png`, fullPage: true });
    await page.getByRole('tab', { name: 'By muscle area' }).press('Home');
    assert.equal(await cards.count(), 27);
    assert.equal(await page.evaluate(() => localStorage.getItem('rebuild-training-v1')), legacy);
    await page.evaluate(() => scrollTo(0, 300));
    await page.waitForFunction(() => document.querySelector('.status-bar-scrim').classList.contains('visible'));
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForFunction(() => scrollY === 0);
    const navigation = page.waitForEvent('framenavigated', { predicate: frame => frame === page.mainFrame() });
    await page.evaluate(() => {
      const touch = y => new Touch({ identifier: 1, target: document.body, clientX: 150, clientY: y });
      window.dispatchEvent(new TouchEvent('touchstart', { touches: [touch(100)] }));
      window.dispatchEvent(new TouchEvent('touchmove', { touches: [touch(280)], cancelable: true }));
      window.dispatchEvent(new TouchEvent('touchend', { touches: [] }));
    });
    await navigation; await page.waitForLoadState();
    assert.equal(await page.evaluate(() => localStorage.getItem('rebuild-training-v1')), legacy);
    assert.deepEqual(errors, []);
    console.log(JSON.stringify({ width, canonical: ids.length, areaReferences: areaIds.length, tabs: 'keyboard/touch passed', info: 'hidden/Enter/Space/touch passed', overflow: 'none', legacy: 'byte-identical', standalonePullRefresh: 'passed', errors }));
    await context.close();
  }
} finally { await browser.close(); }
