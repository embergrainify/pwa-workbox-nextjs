// import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
// import { registerRoute, Route } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';

// precacheAndRoute(self.__WB_MANIFEST);


//https://developer.chrome.com/docs/workbox/modules/workbox-sw/

// copy workbox by
// https://developer.chrome.com/docs/workbox/modules/workbox-sw/#using-local-workbox-files-instead-of-cdn
// run npx workbox-cli copyLibraries third_party/workbox/
importScripts('workbox-v6.5.4/workbox-sw.js');
workbox.setConfig({
    modulePathPrefix: 'workbox-v6.5.4/',
    debug: true
});

const { registerRoute, Route } = workbox.routing;
const { CacheFirst, StaleWhileRevalidate } = workbox.strategies;
const { CacheableResponse } = workbox.cacheableResponse;
const { ExpirationPlugin } = workbox.expiration;

const cacheName = 'pwa_workbox_nextjs_v1';
console.log('yo')
self.addEventListener('install', (event) => {
    console.log('install');
    event.waitUntil(caches.open(cacheName));
});

self.addEventListener('activate', (event) => {
    console.log('activate');
});

self.addEventListener('message', (event) => {
    console.log('message', event);
    // if (event.data && event.data.type === 'SKIP_WAITING') {
    //     self.skipWaiting();
    // }
});

const imageRoute = new Route(({ request }) => {
    console.log('inside imageRoute');
    return request.destination === 'image';
}, new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30,
        })
    ]
}));

const stylesRoute = new Route(({ request }) => {
    console.log('inside stylesRoute');
    return request.destination === 'style';
}, new CacheFirst({
    cacheName: 'styles',
    plugins: [
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30,
        })
    ]
}));

registerRoute(imageRoute);
registerRoute(stylesRoute);
