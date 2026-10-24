/* ===================================================
   MACCELL PERÚ - SERVICE WORKER (PWA)
   Caché estático y soporte offline para Netlify / Web
   =================================================== */

const CACHE_NAME = 'maccell-cache-v34';
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

// Activación: limpia cachés antiguas automáticamente
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Purgando caché desactualizada:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch: Network-first para páginas HTML y catálogo de productos (para reflejar cambios de stock y modelos)
// y Cache-first para recursos estáticos pesados (imágenes, CSS)
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Ignorar peticiones a otros dominios o analytics
  if (url.origin !== self.location.origin) return;

  // HTML y archivos de productos: Network first para siempre recibir los nuevos celulares y precios
  const isHtml = req.headers.get('accept') && req.headers.get('accept').includes('text/html');
  const isDynamicCatalog = url.pathname.includes('products.js') || url.pathname.includes('products-render.js');

  if (isHtml || isDynamicCatalog) {
    event.respondWith(
      fetch(req)
        .then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(req, clone));
          }
          return response;
        })
        .catch(() => caches.match(req).then((cached) => cached || (isHtml ? caches.match('./index.html') : null)))
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
