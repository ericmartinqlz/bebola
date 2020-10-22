importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute(
    [
        { url: '/index.html', revision: '1' },
        { url: '/third.js', revision: '1' },
        { url: '/index.js', revision: '1' },
        { url: '/manifest.json', revision: '1' },
        { url: '/logo.png', revision: '1' },
        { url: '/logo-512.png', revision: '1' },
        { url: '/logo-256.png', revision: '1' },
        { url: '/logo-192.png', revision: '1' },
        { url: '/assets/appShell/sidenav.html', revision: '1' },
        { url: '/assets/appShell/topnav.html', revision: '1' },
        { url: '/assets/images/tentang-bola.jpg', revision: '1' },
        { url: '/assets/images/profil.jpg', revision: '1' },
        { url: '/assets/webfonts/fa-brands-400.eot', revision: '1' },
        { url: '/assets/webfonts/fa-brands-400.woff2', revision: '1' },
        { url: '/assets/webfonts/fa-brands-400.woff', revision: '1' },
        { url: '/assets/webfonts/fa-brands-400.ttf', revision: '1' },
        { url: '/assets/webfonts/fa-regular-400.eot', revision: '1' },
        { url: '/assets/webfonts/fa-regular-400.woff2', revision: '1' },
        { url: '/assets/webfonts/fa-regular-400.woff', revision: '1' },
        { url: '/assets/webfonts/fa-regular-400.ttf', revision: '1' },
        { url: '/assets/webfonts/fa-solid-900.eot', revision: '1' },
        { url: '/assets/webfonts/fa-solid-900.woff2', revision: '1' },
        { url: '/assets/webfonts/fa-solid-900.ttf', revision: '1' },
        { url: '/assets/webfonts/fa-solid-900.woff', revision: '1' },
        { url: '/assets/webfonts/fa-brands-400.svg', revision: '1' },
        { url: '/assets/webfonts/fa-regular-400.svg', revision: '1' },
        { url: '/assets/webfonts/fa-solid-900.svg', revision: '1' },
        { url: '/assets/webfonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
        { url: '/assets/webfonts/Quicksand.ttf', revision: '1' },
    ]);

workbox.routing.registerRoute(
    new RegExp('/assets/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
	new RegExp('https://api.football-data.org/v2/'),
	workbox.strategies.networkFirst({
		cacheName: 'fetch',
	})
);

self.addEventListener('push', event =>{
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: 'logo-192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});