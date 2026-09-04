// =========================================================
// RATAN FARM (રતન ફાર્મ) - PWA SERVICE WORKER
// =========================================================

const CACHE_NAME = 'ratan-farm-v1';

const ASSETS_TO_CACHE = [
  './',
  'index.html',
  'about.html',
  'facilities.html',
  'gallery.html',
  'contact.html',
  'style.css',
  'script.js',
  'manifest.json',
  'images/logo.png',
  'images/icon-192.png',
  'images/icon-512.png',
  'images/icon-maskable-512.png',
  'images/apple-touch-icon.png',
  'images/favicon.png',
  'images/hero.jpg',
  'images/dome-hall-1.jpg',
  'images/dome-hall-2.jpg',
  'images/dome-hall-3.jpg',
  'images/dome-poster-monsoon.jpg',
  'images/stage.jpg',
  'images/stage-decor-1.jpg',
  'images/stage-decor-2.jpg'
];

// Install Event: Pre-cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Pre-caching offline assets');
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: Clear old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('[ServiceWorker] Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: Network-First for HTML, Cache-First for static assets
self.addEventListener('fetch', (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Handle HTML navigation (Network first, fall back to cache)
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          return networkResponse;
        })
        .catch(() => caches.match(request).then((cachedResponse) => cachedResponse || caches.match('index.html')))
    );
    return;
  }

  // Handle Static Assets (Cache first, fall back to network)
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(request).then((networkResponse) => {
        // Cache valid responses
        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
        }
        return networkResponse;
      });
    })
  );
});
