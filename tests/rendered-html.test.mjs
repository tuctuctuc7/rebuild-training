import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://rebuild.example/get-fit/", { headers: { accept: "text/html" } }),
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
  assert.match(html, /Library/);
  assert.match(html, /History/);
  assert.match(html, /rel="manifest" href="https:\/\/build\.tomnguyen\.co\/get-fit\/manifest\.webmanifest"/);
  assert.match(html, /rel="icon" href="https:\/\/build\.tomnguyen\.co\/get-fit\/icon-192\.png"/);
  assert.match(html, /property="og:image" content="https:\/\/build\.tomnguyen\.co\/get-fit\/og\.png"/);
  assert.doesNotMatch(html, /codex-preview|taking shape|SkeletonPreview|react-loading-skeleton/i);
});

test("contains the complete local-first training and offline flows", async () => {
  const [app, data, styles, manifestText, serviceWorker] = await Promise.all([
    readFile(new URL("../app/training-app.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/training-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
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
  for (const gymDemo of [
    "k0cTJCfxa0Y", "lRo9zZ7EwpM", "axgv7H_VQOo", "CAwf7n6Luuc", "0JUrOH--Kdk",
  ]) assert.match(data, new RegExp(gymDemo));

  assert.match(app, /localStorage\.setItem/);
  assert.match(app, /navigator\.serviceWorker\.register/);
  assert.match(app, /matchMedia\("\(display-mode: standalone\)"\)/);
  assert.match(app, /classList\.toggle\("standalone-app", standalone\)/);
  assert.match(app, /window\.addEventListener\("touchmove"/);
  assert.match(app, /window\.location\.reload\(\)/);
  assert.match(app, /Release to refresh/);
  assert.match(app, /navigator\.vibrate\(10\)/);
  assert.match(app, /switch: ""/);
  assert.match(app, /className="refresh-spinner"/);
  assert.match(app, /showStatusScrim/);
  assert.match(app, /window\.addEventListener\("scroll", onScroll/);
  assert.match(app, /setTimer\(\{ exercise: exercise\.name/);
  assert.match(app, /type="checkbox"/);
  assert.match(app, /type="range"/);
  assert.match(app, /Recovery only/);
  assert.match(app, /Reduce by 30–50%/);
  assert.match(app, /Save to history/);
  assert.match(app, /Watch video demo/);
  assert.match(app, /activeTab === "library"/);
  assert.match(app, /Your routines, in order\./);
  assert.match(data, /id: "session-01"/);
  assert.match(data, /id: "session-02"/);
  assert.match(data, /Tibial Internal Rotation Mobilisation/);
  assert.match(data, /Goblet Squat with Left Weight Bias/);
  assert.match(data, /gUltNrPPE28/);
  assert.match(data, /wKWAOJ4tAhM/);
  assert.match(app, /Watch alternate demo/);
  assert.match(app, /dateForWeekday\(item\.weekday, weekOffset\)\.getDate\(\)/);
  assert.match(app, /aria-label="Previous week"/);
  assert.match(app, /aria-label="Next week"/);
  assert.match(app, /relativeWeekLabel\(weekOffset\)/);
  assert.match(app, /setSelectedWeekOffset\(offset\)/);
  assert.match(styles, /rebuild-header-v2\.jpg/);
  assert.match(styles, /@media \(display-mode: standalone\)/);
  assert.match(styles, /padding-top: env\(safe-area-inset-top\)/);
  assert.match(styles, /\.pull-refresh\.refreshing/);
  assert.match(styles, /@keyframes refreshSpin/);
  assert.match(styles, /\.status-bar-scrim\.visible/);
  assert.match(styles, /backdrop-filter: blur\(18px\)/);
  assert.match(styles, /html\.standalone-app \.pull-refresh/);
  assert.match(data, /id: "dr-joe-a"/);
  assert.match(data, /id: "gym-a"/);
  assert.match(data, /id: "dr-joe-b"/);
  assert.match(data, /id: "gym-b"/);
  assert.match(data, /id: "tennis-moderate-b",\s+weekday: 4/);

  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/get-fit/");
  assert.equal(manifest.scope, "/get-fit/");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
  assert.match(serviceWorker, /caches\.open/);
  assert.match(serviceWorker, /event\.request\.mode === "navigate"/);
  assert.match(serviceWorker, /rebuild-header-v2\.jpg/);
  assert.match(serviceWorker, /rebuild-shell-v7/);
  assert.match(serviceWorker, /client\.navigate\(client\.url\)/);
});
