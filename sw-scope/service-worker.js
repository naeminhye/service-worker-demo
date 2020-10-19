// const cacheName = 'v1';

const cacheAssets = [
    'index.html',
    'about.html',
    'main.js',
    '/css/style.css'
];

// Call Install Event
self.addEventListener('install', function (event) {
    console.log('Service Worker Installed!');

    event.waitUntil(
        caches
            .open("v1")
            .then(function (cache) {
                console.log('Service Worker Caching Files!');
                cache.addAll(cacheAssets);
            })
            .then(function () {
                return self.skipWaiting();
            })
    )
});

// Call Activate Event
self.addEventListener('activate', function (event) {
    console.log('Service Worker Activated!');
}); 