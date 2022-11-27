// import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
// import { registerRoute, Route } from 'workbox-routing';
// import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
// import { ExpirationPlugin } from 'workbox-expiration';

// precacheAndRoute([{"revision":"c29f069c693915664634c8f3495a195b","url":"test1.css"},{"revision":"4b4f1876502eb6721764637fe5c41702","url":"vercel.svg"},{"revision":"936faa6487ffc1650a9150f9988e4215","url":"workbox-v6.5.4/workbox-background-sync.dev.js"},{"revision":"53473f3d96e712b9a002d70a62d15fba","url":"workbox-v6.5.4/workbox-background-sync.prod.js"},{"revision":"6041074b871fe4c262f5f31f1b269aa4","url":"workbox-v6.5.4/workbox-broadcast-update.dev.js"},{"revision":"404608a5bdaa085c8cb4b6543f19985d","url":"workbox-v6.5.4/workbox-broadcast-update.prod.js"},{"revision":"77deabe6c722c38a92fb5d39a84793dc","url":"workbox-v6.5.4/workbox-cacheable-response.dev.js"},{"revision":"d1a28efd8683882980a5bc3e2d514e49","url":"workbox-v6.5.4/workbox-cacheable-response.prod.js"},{"revision":"69554f9465f0f5603d01b7614f228e1a","url":"workbox-v6.5.4/workbox-core.dev.js"},{"revision":"26a82243c21f9b819b3888a784f390c9","url":"workbox-v6.5.4/workbox-core.prod.js"},{"revision":"9a05753529d8c36e962ee1c11bfa04dd","url":"workbox-v6.5.4/workbox-expiration.dev.js"},{"revision":"c656020670208660b10b68795bb0d5b6","url":"workbox-v6.5.4/workbox-expiration.prod.js"},{"revision":"2ba1f62ee20f1fb8294941546539f35d","url":"workbox-v6.5.4/workbox-navigation-preload.dev.js"},{"revision":"2fd701b3662ce2b289925485a358c218","url":"workbox-v6.5.4/workbox-navigation-preload.prod.js"},{"revision":"94ebc9652e6adbe96fa8e1a709e1ba20","url":"workbox-v6.5.4/workbox-offline-ga.dev.js"},{"revision":"e794d9377c41c486d9b795dbe0c56a78","url":"workbox-v6.5.4/workbox-offline-ga.prod.js"},{"revision":"d715c9759d526ac5356ad62ea87a0dd2","url":"workbox-v6.5.4/workbox-precaching.dev.js"},{"revision":"e05249397035853935551ae71d9d6d1c","url":"workbox-v6.5.4/workbox-precaching.prod.js"},{"revision":"273ec7f82d0ceb75d98c3e2c351bf038","url":"workbox-v6.5.4/workbox-range-requests.dev.js"},{"revision":"21bfe07ef929cd0f6951721204ead3c0","url":"workbox-v6.5.4/workbox-range-requests.prod.js"},{"revision":"d578fd8724dd553c554c952693f74ed2","url":"workbox-v6.5.4/workbox-recipes.dev.js"},{"revision":"6f38b6b9fa48426ec0750ca7143dba8f","url":"workbox-v6.5.4/workbox-recipes.prod.js"},{"revision":"f99c8e47f12bea7a254401e1e7f0cd1a","url":"workbox-v6.5.4/workbox-routing.dev.js"},{"revision":"969a4a29f98e81c7e50faaf39b3e4d3a","url":"workbox-v6.5.4/workbox-routing.prod.js"},{"revision":"e3383c60eb5187dfcfeaedee8d1674ee","url":"workbox-v6.5.4/workbox-strategies.dev.js"},{"revision":"9ec33bdeb1efa35de8e64f4b14d565ca","url":"workbox-v6.5.4/workbox-strategies.prod.js"},{"revision":"c0c92bd3695e961fc6b1bebbe6b681f9","url":"workbox-v6.5.4/workbox-streams.dev.js"},{"revision":"ff927c6a24fe142b968b6353bf62eb00","url":"workbox-v6.5.4/workbox-streams.prod.js"},{"revision":"d6e9eb44a24f1e781164287002302b0c","url":"workbox-v6.5.4/workbox-sw.js"},{"revision":"3b22c2679fd5e640dda2f5ec247955a9","url":"workbox-v6.5.4/workbox-window.dev.umd.js"},{"revision":"f11ac68db84b173d796c6e3eeb74ec49","url":"workbox-v6.5.4/workbox-window.prod.umd.js"}]);


//https://developer.chrome.com/docs/workbox/modules/workbox-sw/

// copy workbox by
// https://developer.chrome.com/docs/workbox/modules/workbox-sw/#using-local-workbox-files-instead-of-cdn
// run npx workbox-cli copyLibraries third_party/workbox/
importScripts('workbox-v6.5.4/workbox-sw.js');
workbox.setConfig({
    modulePathPrefix: 'workbox-v6.5.4/',
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

const imageRoute = new Route(({ request }) => {
    return request.destination === 'image'
}, new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [
        new ExpirationPlugin({
            maxAgeSeconds: 60 * 60 * 24 * 30,
        })
    ]
}));

const stylesRoute = new Route(({ request }) => {
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
