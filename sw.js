/* ===================================================
   MACCELL PERÚ - SERVICE WORKER (PWA)
   Caché estático y soporte offline para Netlify / Web
   =================================================== */

const CACHE_NAME = 'maccell-cache-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './Inicio.html',
  './css/styles.css',
  './css/components.css',
  './js/main.js',
  './js/products-render.js',
  './data/products.js',
  './assets/img/ui/Logo.jpeg',
  './assets/img/pwa/icon-192.png',
  './assets/img/pwa/icon-512.png',
  './manifest.json'
];

// Instalación: precachea recursos esenciales
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch((err) => {
        console.warn('[SW] Precache parcial:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activación: limpia cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first para páginas HTML (para siempre ver cambios de Netlify)
// y Cache-first para recursos estáticos pesados (imágenes, CSS, JS)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignorar peticiones a otros dominios o analytics
  if (url.origin !== self.location.origin) return;

  // HTML: Network first
  if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match('./index.html')))
    );
    return;
  }

  // Estáticos: Cache first, fallback network
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((response) => {
        if (response && response.status === 200 && req.url.startsWith('http')) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
        }
        return response;
      });
    })
  );
});
