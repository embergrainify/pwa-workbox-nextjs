// import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// precacheAndRoute([{"revision":"c29f069c693915664634c8f3495a195b","url":"test1.css"},{"revision":"4b4f1876502eb6721764637fe5c41702","url":"vercel.svg"}]);


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