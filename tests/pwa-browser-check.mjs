// Run against a production server: PWA_BASE_URL=http://127.0.0.1:3127
// PLAYWRIGHT_MODULE=/path/to/playwright node tests/pwa-browser-check.mjs
// A local proxy changes SW bytes for real update tests, without editing app files.
import assert from 'node:assert/strict';
import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const upstream = new URL(process.env.PWA_BASE_URL || 'http://127.0.0.1:3127');
let revision = 0;
const server = http.createServer(async (req, res) => {
  if (/^\/(get-fit|recovery-library)\/sw\.js$/.test(req.url)) {
    let source = await readFile(new URL(`../public${req.url}`, import.meta.url), 'utf8');
    if (revision) source = source.replace(/(const CACHE = ")([^"]+)/, `$1$2-browser-update-${revision}`);
    res.writeHead(200, { 'Content-Type': 'application/javascript', 'Cache-Control': 'no-store' });
    res.end(source);
    return;
  }
  const proxy = http.request(new URL(req.url, upstream), { method: req.method, headers: { ...req.headers, host: upstream.host } }, response => {
    res.writeHead(response.statusCode, response.headers);
    response.pipe(res);
  });
  proxy.on('error', error => { res.writeHead(502); res.end(error.message); });
  req.pipe(proxy);
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  for (const route of ['/get-fit/', '/recovery-library/', '/recovery-library/vn/']) {
    revision = 0;
    const context = await browser.newContext({ serviceWorkers: 'allow' });
    try {
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      page.setDefaultNavigationTimeout(15000);
      let navigations = 0;
      const errors = [];
      page.on('pageerror', error => errors.push(error.message));
      page.on('framenavigated', frame => { if (frame === page.mainFrame()) navigations++; });
      await page.goto(base + route);
      await page.waitForFunction(async () => {
        const registration = await navigator.serviceWorker.getRegistration();
        return registration?.active?.state === 'activated' && navigator.serviceWorker.controller;
      });
      const title = await page.title();
      assert.ok(title.includes('Rebuild'));
      const initialNavigations = navigations;
      await page.waitForTimeout(300);
      assert.equal(navigations, initialNavigations, 'first activation must not reload the page');
      await page.reload();
      await page.waitForFunction(() => navigator.serviceWorker.controller?.state === 'activated');
      await page.evaluate(async () => {
        localStorage.setItem('pwa-regression-draft', 'saved draft');
        const draft = document.createElement('textarea');
        draft.id = 'pwa-unsaved-draft';
        draft.value = 'unsaved draft';
        document.body.append(draft);
        window.pwaOriginalController = navigator.serviceWorker.controller;
        await caches.open('unrelated-pwa-test');
      });
      const beforeUpdate = navigations;
      revision++;
      await page.evaluate(async () => { await (await navigator.serviceWorker.getRegistration()).update(); });
      await page.waitForFunction(() => navigator.serviceWorker.controller !== window.pwaOriginalController && navigator.serviceWorker.controller?.state === 'activated');
      await page.waitForTimeout(300);
      assert.equal(navigations, beforeUpdate, 'update activation must not reload');
      assert.equal(await page.locator('#pwa-unsaved-draft').inputValue(), 'unsaved draft');
      assert.equal(await page.evaluate(() => localStorage.getItem('pwa-regression-draft')), 'saved draft');
      assert.ok((await page.evaluate(() => caches.keys())).includes('unrelated-pwa-test'));
      // Populate the new worker's runtime cache, including the VN route/chunks.
      await page.reload();
      await page.waitForFunction(async () => {
        const names = await caches.keys();
        const name = names.find(name => name.includes('browser-update'));
        return name && await (await caches.open(name)).match(location.href);
      });
      await context.setOffline(true);
      await page.reload();
      assert.equal(await page.title(), title);
      assert.equal(await page.evaluate(() => localStorage.getItem('pwa-regression-draft')), 'saved draft');
      assert.ok((await page.locator('body').innerText()).length > 100);
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ route, firstActivation: 'activated', subsequentNavigation: 'passed', update: 'activated without reload', drafts: 'preserved', offlineReload: 'passed', pageErrors: errors }));
    } finally { await context.close(); }
  }
  // Both applications must retain their own offline caches on the same origin.
  revision = 0;
  const context = await browser.newContext({ serviceWorkers: 'allow' });
  try {
    const page = await context.newPage();
    for (const route of ['/get-fit/', '/recovery-library/', '/recovery-library/vn/']) {
      await page.goto(base + route);
      await page.waitForFunction(async () => (await navigator.serviceWorker.getRegistration())?.active?.state === 'activated');
      await page.reload();
    }
    const names = await page.evaluate(() => caches.keys());
    assert.ok(names.some(name => name.startsWith('rebuild-shell-')));
    assert.ok(names.some(name => name.startsWith('rebuild-recovery-library-shell-')));
    await context.setOffline(true);
    for (const route of ['/get-fit/', '/recovery-library/', '/recovery-library/vn/']) {
      await page.goto(base + route);
      assert.ok((await page.title()).includes('Rebuild'));
    }
    console.log(JSON.stringify({ coexistence: 'passed', offlineRoutes: 3, caches: names }));
  } finally { await context.close(); }
} finally {
  await browser?.close();
  server.closeAllConnections();
  await new Promise(resolve => server.close(resolve));
}
