/* eslint-disable @typescript-eslint/no-unused-vars */
const CACHE_NAME = 'welcome-book-v1';
const API_CACHE_NAME = 'api-cache-v1';
const ASSETS = [
  '/',
  '/_next/static/css/',
  '/_next/static/media/',
  '/_next/static/chunks/',
  '/_next/static/',
  '/manifest.json',
];

// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "/~offline";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

// Push Notification
self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/icon.png',
      badge: '/badge.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
      },
    }
    event.waitUntil(self.registration.showNotification(data.title, options))
  }
})
 
self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  event.waitUntil(clients.openWindow('https://cloneth.vercel.app'))
})

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => 
      Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME && key !== API_CACHE_NAME) {
          return caches.delete(key);
        }
      }))
    )
  );
});

// Fetch Event (Özel WiFi API Cache Stratejisi)
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // API İsteklerini Özel Yönet
  if (url.pathname === '/api/wifi') {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(event.request);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (err) {
          const cachedResponse = await cache.match(event.request);
          return cachedResponse || Response.json({ error: 'Offline' });
        }
      })
    );
  }

  // Diğer İstekler
  else {
    event.respondWith(
      caches.match(event.request).then((response) => 
        response || fetch(event.request)
      )
    );
  }
});


  // Message Event Handler
self.addEventListener('message', (event) => {
    if (event.data.type === 'UPDATE_WIFI') {
      caches.open(API_CACHE_NAME).then((cache) => {
        const response = new Response(JSON.stringify(event.data.payload), {
          headers: { 'Content-Type': 'application/json' },
        });
        cache.put(new Request('/api/wifi'), response);
        
        // Tüm istemcilere bildirim gönder
        self.clients.matchAll().then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'WIFI_UPDATED',
              payload: event.data.payload,
            });
            });
          });
        });
    }
});
