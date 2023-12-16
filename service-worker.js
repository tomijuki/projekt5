const CACHE_NAME = 'pwa-app-cache-v1';

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/public/site.css',
                '/public/img/microphone.png',
                '/favicon.ico'
            ]);
        })
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // Return the cached version if available, or fetch from the network and cache
        return response || fetch(event.request).then((fetchResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, fetchResponse.clone());
            return fetchResponse;
          });
        });
      })
    );
  });

  