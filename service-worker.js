const CACHE_NAME = 'v1';

// const CACHE_ASSETS = [
//     "/index.html",
//     "/about.html",
//     "/js/main.js",
//     "/css/style.css",
// ];

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
// self.addEventListener("message", onMessage);
self.addEventListener('fetch', onFetch);

/**
 * Install Event
 * @param {*} event
 */
function onInstall(event) {
  console.log('WORKER: install event in progress.');

  // event.waitUntil(
  //     /* The caches built-in is a promise-based API that helps you cache responses,
  //         as well as finding and deleting them.
  //     */
  //     caches
  //         /* You can open a cache by name, and this method returns a promise. We use
  //             a versioned cache name here so that we can remove old cache entries in
  //             one fell swoop later, when phasing out an older service work9er.
  //         */
  //         .open(CACHE_NAME)
  //         .then(function (cache) {
  //             /* After the cache is opened, we can fill it with the offline fundamentals.
  //                The method below will add all resources we've indicated to the cache,
  //                after making HTTP requests for each of them.
  //             */
  //             console.log('Service Worker Caching Files!');
  //             return cache.addAll(CACHE_ASSETS);
  //         })
  //         .then(function () {
  //             console.log('WORKER: install completed');
  //             return self.skipWaiting();
  //         })
  // );
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
      );
    })
  );
}

function onMessage({ data }) {
  //
}

function onFetch(event) {
  console.log('[SERVICE WORKER] fetch event in progress.');

  if (event.request.mode === 'navigate') {
    return event.respondWith(
      fetch(event.request)
        .then(function (response) {
          // Make a copy of response
          const resClone = response.clone();

          // Open cache
          caches.open(CACHE_NAME).then(function (cache) {
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
  } else {
    console.log('Offline');
  }
}
