import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://rebuild.example/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the finished training app and metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Rebuild · Return Athletic<\/title>/i);
  assert.match(html, /Return athletic\./);
  assert.match(html, /How are you arriving\?/);
  assert.match(html, /Energy/);
  assert.match(html, /Pain/);
  assert.match(html, /aria-label="Primary"/);
  assert.match(html, /Today/);
  assert.match(html, /Week/);
  assert.match(html, /History/);
  assert.match(html, /rel="manifest" href="https:\/\/rebuild-athletic-tom\.tuc7\.chatgpt\.site\/manifest\.webmanifest"/);
  assert.match(html, /rel="icon" href="https:\/\/rebuild-athletic-tom\.tuc7\.chatgpt\.site\/icon-192\.png"/);
  assert.match(html, /property="og:image" content="https:\/\/rebuild-athletic-tom\.tuc7\.chatgpt\.site\/og\.png"/);
  assert.doesNotMatch(html, /codex-preview|taking shape|SkeletonPreview|react-loading-skeleton/i);
});

test("contains the complete local-first training and offline flows", async () => {
  const [app, data, manifestText, serviceWorker] = await Promise.all([
    readFile(new URL("../app/training-app.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/training-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/sw.js", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(manifestText);

  for (const day of ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]) {
    assert.match(data, new RegExp(`day: "${day}"`));
  }
  for (const link of [
    "_-6RLEBq84E", "3HucseP0VA0", "rvkyQc60-HA", "jAA1Sh2IGL4",
    "qB_bC7-CQjI", "XCJl_ju19qw", "ynGQy_GOfrQ", "ycPCpTH0QGo",
    "D9qjQWqVIlI", "39vuP5xozsI", "2971402579877027",
  ]) assert.match(data, new RegExp(link));

  assert.match(app, /localStorage\.setItem/);
  assert.match(app, /navigator\.serviceWorker\.register/);
  assert.match(app, /setTimer\(\{ exercise: exercise\.name/);
  assert.match(app, /type="checkbox"/);
  assert.match(app, /type="range"/);
  assert.match(app, /Recovery only/);
  assert.match(app, /Reduce by 30–50%/);
  assert.match(app, /Save to history/);

  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
  assert.match(serviceWorker, /caches\.open/);
  assert.match(serviceWorker, /event\.request\.mode === "navigate"/);
});
