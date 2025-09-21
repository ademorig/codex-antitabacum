/*
 * Service Worker del Codex Antitabacum
 * ¡El guardián de la conexión offline! 🌐🛡️
 */

const CACHE_NAME = 'codex-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/app.js',
  '/manifest.json'
];

self.addEventListener('install', event => {
  // El Service Worker se instala. ¡Es el momento de cachear los archivos esenciales!
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
  // El Service Worker intercepta las peticiones de red.
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Si el archivo está en caché, ¡lo servimos instantáneamente! 🚀
        if (response) {
          console.log('Service Worker: Sirviendo desde caché', event.request.url);
          return response;
        }
        // Si no está, lo buscamos en la red (¡y podríamos cachearlo para la próxima vez!)
        return fetch(event.request);
      })
  );
});
