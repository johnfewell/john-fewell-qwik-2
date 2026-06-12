// Kill-switch for the service worker the old Qwik site registered.
// Returning visitors still have it installed; this update unregisters it,
// clears its caches, and reloads open pages so they fetch fresh content.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      await self.clients.claim();
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
      });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
