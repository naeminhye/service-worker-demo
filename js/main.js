/** This code registers the service-worker.js file as a service worker.
 *  It first checks whether the browser supports service workers. */

if ('serviceWorker' in navigator) {
    console.log('[MAIN] Service Worker is Supported!');

    window.addEventListener('load', function () {
        /** Register a service worker hosted
         * at the root of the site using the default scope. */
        navigator.serviceWorker.register('./service-worker.js')
            // Return a Promise
            .then(function (registration ) {
                console.log('[MAIN] Service Worker registration succeeded:', registration);
            })
            .catch(function (err) {
                console.error('[MAIN] Service Worker registration failed:', err);
            })
    });
}
else {
    console.log('[MAIN] Service workers are not supported.');
}