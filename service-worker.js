const CACHE_NAME = 'v1';

// const CACHE_ASSETS = [
//     "/index.html",
//     "/about.html",
//     "/js/main.js",
//     "/css/style.css",
// ];

self.addEventListener("install", onInstall);
self.addEventListener("activate", onActivate);
// self.addEventListener("message", onMessage);
self.addEventListener("fetch", onFetch);

/**
 * Install Event
 * @param {*} event 
 */
function onInstall(event) {
    console.log('Service Worker Installed!');

    // event.waitUntil(
    //     caches
    //         .open(CACHE_NAME)
    //         .then(function (cache) {
    //             console.log('Service Worker Caching Files!');
    //             cache.addAll(CACHE_ASSETS);
    //         })
    //         .then(function () {
    //             return self.skipWaiting();
    //         })
    // )
}

/**
 * Activate Event
 * @param {*} event 
 */
function onActivate(event) {
    console.log('Service Worker Activated!');
    // Remove unwanted caches
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cache) {
                    if (cache !== CACHE_NAME) {
                        console.log('Service Worker Clearing Old Cache!');
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
}

function onMessage({ data }) {
    // 
}

function onFetch(event) {
    console.log('Service Worker: Fetching');
    event.respondWith(
        fetch(event.request)
            .then(function (response) {
                // Make a copy of response
                const resClone = response.clone();

                // Open cache
                caches
                    .open(CACHE_NAME)
                    .then(function (cache) {
                        // Add response to cache
                        cache.put(event.request, resClone);
                    });

                return response;
            })    
            .catch(function () {
                return caches.match(event.request);
            })
            .then(function (response) {
                return response;
            })
    );
}