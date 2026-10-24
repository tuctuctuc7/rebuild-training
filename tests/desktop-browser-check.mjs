// Run against a Next server; see library-browser-check.mjs for rootless setup.
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.LIBRARY_BASE_URL || 'http://127.0.0.1:3138';
const artifacts = process.env.QA_ARTIFACTS || '/tmp/rebuild-desktop-qa';
await mkdir(artifacts, { recursive: true });
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const results = [];
try {
  for (const width of [320, 390, 768, 1024, 1280, 1440, 1920]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.goto(`${base}/get-fit/`);
    await page.evaluate(() => Promise.all(document.getAnimations().map(a => a.finished.catch(() => {}))));
    const expected = width >= 1200 ? 3 : width >= 760 ? 2 : 1;
    async function geometry() {
      const boxes = await page.locator('.library-exercise-list').first().locator('[data-exercise-id]').evaluateAll(nodes => nodes.map(n => {
        const r = n.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width };
      }));
      assert.equal(new Set(boxes.map(b => Math.round(b.x))).size, expected, `${width}: actual card columns`);
      assert.equal(boxes.filter(b => Math.abs(b.y - boxes[0].y) < 1).length, Math.min(expected, boxes.length));
      assert.ok(boxes.every(b => b.width >= (width < 760 ? 200 : 280)), 'readable cards');
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow');
      return boxes;
    }
    const boxes = await geometry();
    if (width >= 760) {
      const hero = await page.locator('.hero-art').boundingBox();
      assert.ok(hero.height <= 200, 'bounded desktop hero');
      const heading = await page.locator('.page-heading').boundingBox();
      const tabs = await page.locator('.library-tabs').boundingBox();
      if (width >= 1024) assert.ok(Math.abs(heading.y - tabs.y) < heading.height, 'navigation alongside heading');
    }
    if ([390, 1440].includes(width)) await page.screenshot({ path: `${artifacts}/desktop-session-${width}.png`, fullPage: true });
    await page.getByRole('tab', { name: 'By muscle area' }).click();
    assert.equal(await page.locator('[data-exercise-id]').count(), 0);
    for (const toggle of await page.locator('.area-toggle').all()) await toggle.click();
    await geometry();
    const ids = await page.locator('[data-exercise-id]').evaluateAll(nodes => nodes.map(n => n.dataset.exerciseId));
    assert.equal(ids.length, 31); assert.equal(new Set(ids).size, 27);
    assert.deepEqual(errors, []);
    results.push({ width, columns: expected, firstCardWidth: boxes[0].width, references: ids.length, unique: new Set(ids).size, errors });
    if ([390, 1440].includes(width)) await page.screenshot({ path: `${artifacts}/desktop-area-${width}.png`, fullPage: true });
    await page.close();
  }
  for (const route of ['/recovery-library/', '/recovery-library/vn/', '/tom/']) {
    const page = await browser.newPage();
    const response = await page.goto(base + route);
    assert.equal(response.status(), 200);
    assert.equal(await page.locator('.library-only-shell').count(), 0);
    assert.ok(await page.locator('h1').innerText());
    results.push({ route, status: response.status(), heading: await page.locator('h1').innerText() });
    await page.close();
  }
  await writeFile(`${artifacts}/desktop-checks.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
