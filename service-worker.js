const CACHE_NAME = 'anita-bonita-v3'; // 🔥 CAMBIO DE VERSIÓN
const urlsToCache = [
  '/anita/',
  '/anita/index.html',
  '/anita/foto1.jpg',
  '/anita/foto2.jpg',
  '/anita/icon-192.png',
  '/anita/icon-512.png'
];

// ✅ INSTALAR Y FORZAR ACTIVACIÓN
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// ✅ ACTIVAR Y BORRAR CACHÉS VIEJOS
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// ✅ FETCH: cache primero, red después (actualizable)
self.addEventListener('fetch', event => {
  if (!event.request.url.includes('/anita/')) return;

  event.respondWith(
    caches.match(event.request).then(response => {
      return (
        response ||
        fetch(event.request).then(fetchResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        })
      );
    })
  );
});
