// Service Worker for Svenska Kat PWA
// Version 1.10.3 - Uitspraak Gating + Bug Fixes

const CACHE_VERSION = '1.10.3';
const CACHE_NAME = `svenska-kat-v${CACHE_VERSION}`;
const CDN_CACHE = `svenska-kat-cdn-v${CACHE_VERSION}`;

// Files to cache for offline support
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // External CDN resources are handled by browser cache
];

// Install event - cache app shell
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing version', CACHE_VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        // Force the waiting service worker to become the active service worker
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating version', CACHE_VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Keep current app and CDN caches, delete everything else
          if (cacheName !== CACHE_NAME && cacheName !== CDN_CACHE) {
            console.log('[ServiceWorker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      // Claim all clients immediately
      return self.clients.claim();
    })
  );
});

// Fetch event - cache-first for CDN, network-first for app
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first strategy for CDN resources (Performance Quick Win #3)
  if (url.hostname.includes('cdn.') ||
      url.hostname.includes('cdnjs.') ||
      url.hostname.includes('jsdelivr.') ||
      url.hostname.includes('googleapis.') ||
      url.hostname.includes('gstatic.')) {

    event.respondWith(
      caches.open(CDN_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          // Return cached version immediately if available
          if (cached) {
            // Update cache in background (stale-while-revalidate)
            fetch(event.request).then(response => {
              if (response && response.status === 200) {
                cache.put(event.request, response.clone());
              }
            }).catch(() => {});
            return cached;
          }

          // No cache, fetch and cache
          return fetch(event.request).then(response => {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          });
        })
      )
    );
    return;
  }

  // Network-first strategy for app resources
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Don't cache non-ok responses
        if (!response || response.status !== 200 || response.type === 'error') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Update cache with fresh content
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            // No cache hit, return offline page or error
            return new Response('Offline - content not available', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Message event - handle commands from app
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
