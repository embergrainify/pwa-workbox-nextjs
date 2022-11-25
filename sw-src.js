// import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { registerRoute, Route } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// precacheAndRoute(self.__WB_MANIFEST);


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