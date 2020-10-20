if ('serviceWorker' in navigator) {
    console.log('Service Worker Supported!');

    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('./service-worker.js')
            // Return a Promise
            .then(function (reg) {
                console.log('Service Worker Registered!');
            })
            .catch(function (err) {
                console.error(`Service Worker Registration Failed: ${err}`);
            })
    });
}