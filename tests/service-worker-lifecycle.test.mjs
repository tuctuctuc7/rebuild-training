import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

for (const app of ['get-fit', 'recovery-library']) {
  test(`${app}: activation removes only this app's obsolete caches`, async () => {
    const source = await readFile(new URL(`../public/${app}/sw.js`, import.meta.url), 'utf8');
    const current = source.match(/const CACHE = "([^"]+)"/)[1];
    const prefix = app === 'get-fit' ? 'rebuild-shell-' : 'rebuild-recovery-library-shell-';
    const old = `${prefix}v0`;
    const other = app === 'get-fit' ? 'rebuild-recovery-library-shell-v3' : 'rebuild-shell-v11';
    const deleted = [];
    const handlers = {};
    vm.runInNewContext(source, {
      self: { addEventListener: (type, callback) => { handlers[type] = callback; },
        clients: { claim: async () => {}, matchAll: async () => [] } },
      caches: { keys: async () => [old, current, other, 'unrelated-app'],
        delete: async (key) => { deleted.push(key); return true; } },
    });
    let activation;
    handlers.activate({ waitUntil: (promise) => { activation = promise; } });
    await activation;
    assert.deepEqual(deleted, [old]);
  });
  test(`${app}: activation finishes without navigating open drafts`, async () => {
    const source = await readFile(new URL(`../public/${app}/sw.js`, import.meta.url), 'utf8');
    const handlers = {};
    let navigations = 0;
    let claimed = false;
    vm.runInNewContext(source, {
      self: {
        addEventListener: (type, callback) => { handlers[type] = callback; },
        clients: {
          claim: async () => { claimed = true; },
          matchAll: async () => [{ url: `https://example.test/${app}/`, navigate: () => {
            navigations++;
            // A controlled navigation cannot finish until activation finishes.
            return new Promise(() => {});
          } }],
        },
      },
      caches: { keys: async () => [], delete: async () => true },
    });
    let activation;
    handlers.activate({ waitUntil: (promise) => { activation = promise; } });
    let timer;
    try {
      await Promise.race([activation, new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error('activation blocked on client navigation')), 100);
      })]);
      assert.equal(claimed, true);
      assert.equal(navigations, 0, 'activation must not reload an open draft');
    } finally { clearTimeout(timer); }
  });
}
