self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("alikojb-cache").then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json"
      ]);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("aliko-cache").then(cache => {
      return cache.addAll(["/", "/index.html", "/style.css", "/logo.png"]);
    })
  );
});
