/** This code registers the service-worker.js file as a service worker.
 *  It first checks whether the browser supports service workers. */

if ('serviceWorker' in navigator) {
  console.log('[MAIN] Service Worker is Supported!');

  window.addEventListener('load', function () {
    /** Register a service worker hosted
     * at the root of the site using the default scope. */
    navigator.serviceWorker
      .register('./service-worker.js')
      // Return a Promise
      .then(function (registration) {
        console.log(
          '[MAIN] Service Worker registration succeeded:',
          registration
        );
      })
      .catch(function (err) {
        console.error('[MAIN] Service Worker registration failed:', err);
      });
  });
} else {
  console.log('[MAIN] Service workers are not supported.');
}

function isOnline() {
  document.getElementById('online-status').innerHTML = '';
}

function isOffline() {
  document.getElementById('online-status').innerHTML = "You're Offline!";
}

(function () {
  if (window.addEventListener) {
    /*
        Works well in Firefox and Opera with the 
        Work Offline option in the File menu.
        Pulling the ethernet cable doesn't seem to trigger it.
        Later Google Chrome and Safari seem to trigger it well
    */
    window.addEventListener('online', isOnline, false);
    window.addEventListener('offline', isOffline, false);
  } else {
    /*
        Works in IE with the Work Offline option in the 
        File menu and pulling the ethernet cable
    */
    document.body.ononline = isOnline;
    document.body.onoffline = isOffline;
  }
})();
