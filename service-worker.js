const CACHE = 'anita-bonita-v1';
const urls = [
  '/anita/',
  '/anita/index.html',
  '/anita/foto1.jpg',
  '/anita/foto2.jpg',
  '/anita/icon-192.png',
  '/anita/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(cache => cache.addAll(urls)));
});

self.addEventListener('fetch', e => {
  if (!e.request.url.includes('/anita/')) return;
  e.respondWith(
    caches.match(e.request)
      .then(r => r || fetch(e.request))
      .catch(() => caches.match('/anita/'))
  );
});