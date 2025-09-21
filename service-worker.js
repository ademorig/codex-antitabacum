/*
 * Service Worker del Codex Antitabacum
 * ¡El guardián de la conexión offline! 🌐🛡️
 */

const CACHE_NAME = 'codex-cache-v1';
const urlsToCache = [
  './',
  'index.html',
  'style.css',
  'app.js',
  'manifest.json'
];

self.addEventListener('install', event => {
  console.log('Service Worker: Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Archivos en caché');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          console.log('Service Worker: Sirviendo desde caché', event.request.url);
          return response;
        }
        return fetch(event.request);
      })
  );
});
