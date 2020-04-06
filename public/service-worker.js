const CACHE_NAME = 'cache-v042';
const urlsToCache = [
	'/',
	'/index.html',
    '/js/app.js',
    '/js/chunk-vendors.js'
];

self.addEventListener('install', function(event) {
    console.log('[Service Worker] Install Event', event)
    event.waitUntil(self.skipWaiting());
    event.waitUntil(
        caches.open('first-static-v1')
        .then(function(cache) {
            console.log('Opened cache', CACHE_NAME);
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener('activate', (event) => {
	console.log('[Service Worker] Activate Event ', event)
    let cacheWhitelist = [CACHE_NAME];
    event.waitUntil(self.clients.claim());
    event.waitUntil(
        caches.keys()
        .then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    // ホワイトリストにないキャッシュ(古いキャッシュ)は削除する
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    console.log('[Service Worker] Fetch: ', event);
    event.respondWith(
        caches.match(event.request)
        .then((response) => {
            if (response) {
                return response;
            }
            // 重要：リクエストを clone する。リクエストは Stream なので
            // 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
            // 必要なので、リクエストは clone しないといけない
            let fetchRequest = event.request.clone();
            console.log('[Service Worker] Fetch: event.request.clone():', fetchRequest);
            return fetch(fetchRequest)
            .then((response) => {
                if (!response || response.status !== 200 || response.type !== 'basic') {
                console.log('[Service Worker] Fetch: response(error):', response);
                return response;
                }
                // 重要：レスポンスを clone する。レスポンスは Stream で
                // ブラウザ用とキャッシュ用の2回必要。なので clone して
                // 2つの Stream があるようにする
                let responseToCache = response.clone();
                console.log('[Service Worker] Fetch: response.clone():', responseToCache);
                caches.open(CACHE_NAME)
                .then((cache) => {
                    cache.put(event.request, responseToCache);
                    console.log('[Service Worker] Fetch: cache.put():', event.request);
                });
                console.log('[Service Worker] Fetch: response(normal):', response);
                return response;
            });
        })
    );
});

