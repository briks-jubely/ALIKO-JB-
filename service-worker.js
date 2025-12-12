const CACHE_NAME = 'aliko-jb-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/Workshop.html',
  '/academy.html',
  '/icon-192.png',
  '/manifest.json'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(ALIKO_JB).then((cache) => {
      console.log('Caching files for offline use');
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== ALIKO_JB) {
            console.log('Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
