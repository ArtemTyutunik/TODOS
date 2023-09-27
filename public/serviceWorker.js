

const assets = [
  '/index.html',
  '/loader.css',
  '/normalize.css',
  '/google.svg',
  'not-found.jpg',
  '/tagsFetchFailed.jpg',
  '/todos.svg',
  '/todosFailed.jpg',
  '/loginPageImage.jpg',
  'https://d3ptyyxy2at9ui.cloudfront.net/assets/images/418012032c5aaee447289642c812e569.jpg',
  'https://todoist.b-cdn.net/assets/images/5912cb674b44ab3d789ea98c95d1cfe3.jpg',
]


self.addEventListener('install', async (event) => {
  event.waitUntil(
      caches.open('v1').then((cache) => cache.addAll(assets)).then(() => self.skipWaiting()),
  )
});

self.addEventListener('activate', (event) => {
  console.log(event)
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        }

        return fetch(event.request);
      }),
  )
})
