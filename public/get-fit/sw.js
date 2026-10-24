const CACHE = "rebuild-shell-v15";
const CACHE_PREFIX = "rebuild-shell-";
const APP_ROOT = "/get-fit/";
const CORE = [APP_ROOT, `${APP_ROOT}manifest.webmanifest`, `${APP_ROOT}icon-192.png`, `${APP_ROOT}icon-512.png`, `${APP_ROOT}rebuild-header-v2.jpg`];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((key) => key.startsWith(CACHE_PREFIX) && key !== CACHE).map((key) => caches.delete(key)));
    await self.clients.claim();
    // Controlled navigation waits for activation: awaiting it here deadlocks.
    // Keep open pages (and unsaved drafts) intact; refresh on normal navigation.
  })());
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(fetch(event.request).then((response) => {
    if (response.ok) {
      const copy = response.clone();
      caches.open(CACHE).then((cache) => cache.put(event.request, copy));
    }
    return response;
  }).catch(() => caches.match(event.request).then((cached) => cached || (event.request.mode === "navigate" ? caches.match(APP_ROOT) : undefined))));
});
