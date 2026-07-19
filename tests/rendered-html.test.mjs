import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(path = "/get-fit/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://rebuild.example${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the original finished training app at /get-fit and metadata", async () => {
  const response = await render("/get-fit/");
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
  assert.match(html, /class="today-warmup-sessions"/);
  assert.match(html, /class="library-session today-warmup-session"/);
  assert.match(html, /Restore the lower-leg chain/);
  assert.match(html, /Re-centre the squat/);
  assert.match(html, /rel="manifest" href="https:\/\/build\.tomnguyen\.co\/get-fit\/manifest\.webmanifest"/);
  assert.match(html, /rel="icon" href="https:\/\/build\.tomnguyen\.co\/get-fit\/icon-192\.png"/);
  assert.match(html, /property="og:image" content="https:\/\/build\.tomnguyen\.co\/get-fit\/og\.png"/);
  assert.doesNotMatch(html, /Dr\. Joe Exercise Library|THƯ VIỆN REBUILD|recovery-library/i);
  assert.doesNotMatch(html, /codex-preview|taking shape|SkeletonPreview|react-loading-skeleton/i);
});

test("server-renders the lightweight public recovery library at /recovery-library", async () => {
  const response = await render("/recovery-library/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /TOM’S REBUILD LIBRARY/);
  assert.match(html, /Dr\. Joe Exercise Library/);
  assert.match(html, /Mobility and strength drills grouped by target area/);
  assert.match(html, /Ankle &amp; Foot|Ankle & Foot/);
  assert.match(html, /Hip &amp; Glute|Hip & Glute/);
  assert.match(html, /Lower-Body Strength/);
  assert.match(html, /Tibial Internal Rotation Mobilisation/);
  assert.match(html, /Rebuild return athletic cover image/);
  assert.doesNotMatch(html, /PUBLIC MOVEMENT LIBRARY|Find the right drill fast/);
  assert.match(html, /class="session-number group-icon"/);
  assert.match(html, /class="body-part-icon"/);
  assert.doesNotMatch(html, />↧<|>◒<|>▲</);
  assert.doesNotMatch(html, /<small>GROUP<\/small><strong>0[347]<\/strong>/);
  assert.match(html, /href="\/recovery-library\/vn\/"/);
  assert.match(html, /href="\/recovery-library\/"/);
  assert.doesNotMatch(html, /How are you arriving\?|Save to history|Session RPE/i);
});

test("server-renders the Vietnamese native recovery library route", async () => {
  const response = await render("/recovery-library/vn/");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /REBUILD LIBRARY CỦA TOM/);
  assert.match(html, /Thư viện bài tập Dr\. Joe/);
  assert.match(html, /Các bài di động và sức mạnh được nhóm theo vùng tác động/);
  assert.match(html, /Cổ chân &amp; Bàn chân|Cổ chân & Bàn chân/);
  assert.match(html, /Hông &amp; Mông|Hông & Mông/);
  assert.match(html, /Sức mạnh thân dưới/);
  assert.match(html, /Xoay trong xương chày/);
  assert.match(html, /href="\/recovery-library\/"/);
  assert.doesNotMatch(html, /How are you arriving\?|Save to history|Session RPE/i);
});

test("contains the complete local-first training and offline flows", async () => {
  const [app, data, styles, manifestText, serviceWorker] = await Promise.all([
    readFile(new URL("../app/training-app.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/training-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../public/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/get-fit/sw.js", import.meta.url), "utf8"),
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
    "k0cTJCfxa0Y", "lRo9zZ7EwpM", "CAwf7n6Luuc", "0JUrOH--Kdk",
  ]) assert.match(data, new RegExp(gymDemo));

  assert.match(app, /localStorage\.setItem/);
  assert.match(app, /gymExercises: normalizeSavedGymExercises/);
  assert.match(app, /applyGymCustomization/);
  assert.match(app, /trimWorkoutExerciseProgress/);
  assert.match(app, /15 minutes · fixed duration/);
  assert.match(app, /Customize exercise/);
  assert.match(app, /Save exercise/);
  assert.match(app, /Reset suggestion/);
  assert.match(app, /Exercise name/);
  assert.match(app, />Sets</);
  assert.match(app, /Reps or time/);
  assert.match(styles, /\.gym-slot-label/);
  assert.match(styles, /\.exercise-edit-form/);
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
  assert.doesNotMatch(data, /id: "s02-hip-ir"/);
  assert.doesNotMatch(data, /id: "warmup-s02-hip-ir"/);
  assert.match(data, /gUltNrPPE28/);
  assert.match(data, /wKWAOJ4tAhM/);
  assert.match(app, /Watch alternate demo/);
  assert.match(app, /dateForWeekday\(item\.weekday, weekOffset\)\.getDate\(\)/);
  assert.match(app, /aria-label="Previous week"/);
  assert.match(app, /aria-label="Next week"/);
  assert.match(app, /relativeWeekLabel\(weekOffset\)/);
  assert.match(app, /setSelectedWeekOffset\(offset\)/);
  assert.match(styles, /@media \(display-mode: standalone\)/);
  assert.match(styles, /padding-top: env\(safe-area-inset-top\)/);
  assert.match(styles, /\.pull-refresh\.refreshing/);
  assert.match(styles, /@keyframes refreshSpin/);
  assert.match(styles, /\.status-bar-scrim\.visible/);
  assert.match(styles, /backdrop-filter: blur\(18px\)/);
  assert.match(styles, /html\.standalone-app \.pull-refresh/);
  assert.match(styles, /\.progress-ring[^}]*flex: 0 0 47px/);
  assert.match(styles, /\.progress-ring[^}]*aspect-ratio: 1/);
  assert.doesNotMatch(data, /id: "dr-joe-a"/);
  assert.match(data, /id: "gym-a"/);
  assert.doesNotMatch(data, /id: "dr-joe-b"/);
  assert.match(data, /id: "gym-b"/);
  assert.match(data, /id: "tennis-moderate-b",\s+weekday: 4/);

  assert.match(data, /dailyDrJoeWarmup/);
  assert.match(data, /warmup: dailyDrJoeWarmup/g);
  assert.equal((data.match(/warmup: dailyDrJoeWarmup/g) ?? []).length, 7);
  assert.match(app, /DAILY DR\. JOE WARM-UP/);
  assert.match(app, /Done before tennis, gym, recovery, or rest/);
  assert.match(app, /warmup-s\$\{session\.number\}-/);
  assert.match(app, /WarmupExerciseCard/);
  assert.match(data, /Hanging leg raises/);
  assert.match(data, /prescription: "15 reps · bodyweight"/);
  assert.match(data, /Incline treadmill walk/);
  assert.match(data, /15 min · easy nasal-breathing pace/);
  for (const slot of ["push", "pull", "arms", "abs", "cardio"]) {
    assert.equal((data.match(new RegExp(`slot: "${slot}"`, "g")) ?? []).length, 2, `expected one ${slot} slot on each gym day`);
  }
  assert.match(data, /Cable biceps curl/);
  assert.match(data, /Rope triceps pressdown/);

  assert.equal(manifest.display, "standalone");
  assert.equal(manifest.start_url, "/get-fit/");
  assert.equal(manifest.scope, "/get-fit/");
  assert.deepEqual(manifest.icons.map((icon) => icon.sizes), ["192x192", "512x512"]);
  assert.match(serviceWorker, /caches\.open/);
  assert.match(serviceWorker, /event\.request\.mode === "navigate"/);
  assert.match(serviceWorker, /rebuild-header-v2\.jpg/);
  assert.match(serviceWorker, /rebuild-shell-v8/);
  assert.match(serviceWorker, /client\.navigate\(client\.url\)/);
});

test("keeps the recovery library separate from the original /get-fit app files", async () => {
  const [libraryApp, libraryData, libraryManifest, libraryServiceWorker] = await Promise.all([
    readFile(new URL("../app/recovery-library/library-app.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/recovery-library/library-data.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/recovery-library/manifest.webmanifest", import.meta.url), "utf8"),
    readFile(new URL("../public/recovery-library/sw.js", import.meta.url), "utf8"),
  ]);
  const manifest = JSON.parse(libraryManifest);

  assert.match(libraryApp, /language-switcher/);
  assert.match(libraryApp, /Thư viện bài tập Dr\. Joe/);
  assert.match(libraryApp, /navigator\.serviceWorker\.register\(`\$\{APP_ROOT\}\/sw\.js`/);
  assert.match(libraryData, /group: "ankle-foot"/);
  assert.match(libraryData, /group: "hip-glute"/);
  assert.match(libraryData, /group: "lower-body-strength"/);
  assert.equal(manifest.start_url, "/recovery-library/");
  assert.equal(manifest.scope, "/recovery-library/");
  assert.match(libraryServiceWorker, /rebuild-recovery-library-shell-v1/);
  assert.match(libraryServiceWorker, /\/recovery-library\//);
});
