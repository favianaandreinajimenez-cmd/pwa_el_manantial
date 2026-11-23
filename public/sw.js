// Se incrementa la versión para forzar la actualización del caché en el navegador
const CACHE_NAME = 'pwa_el_manantial-v4';

// 1. Archivos locales y recursos CDN indispensables para la interfaz visual
const urlsToCache = [
  './',
  './login.html',
  './index.html',
  './ordeno.html',
  './inventario.html',
  './salud.html',
  './reportes.html',
  './historial.html',
  './unidad.html',
  './usuarios.html',
  './Css/custom.css',
  './Css/input.css',
  './imagenes/icono_logo.svg',
  './manifest.json',
  './local-db-fallback.js',
  './Js/sync.js',
  './Js/db-sqlite.js',
  './Js/app.js',
  // CDNs visuales esenciales (Tailwind, Vue, Fuentes e Íconos):
  'https://cdn.tailwindcss.com?plugins=forms,container-queries',
  'https://unpkg.com/vue@3/dist/vue.global.js',
  'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/sql-wasm.js',
  'https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=Work+Sans:wght@600;700&display=swap',
  'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap'
];

// Instalación: precachea archivos locales y CDNs
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: Cacheando recursos estáticos y visuales...');
      return Promise.all(
        urlsToCache.map(url => {
          return cache.add(url).catch(err => {
            console.warn(`No se pudo precachear: ${url}`, err);
          });
        })
      );
    })
  );
  self.skipWaiting();
});

// Activación: elimina cachés de versiones viejas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('Eliminando caché obsoleta:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Interceptación de peticiones: Cache First con almacenamiento dinámico
self.addEventListener('fetch', event => {
  // Ignora peticiones que no sean GET o que vayan al backend (/api/)
  if (event.request.method !== 'GET' || event.request.url.includes('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse;
      }

      // Si el recurso no estaba en caché previa, lo descarga de internet y guarda una copia
      return fetch(event.request)
        .then(networkResponse => {
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });

          return networkResponse;
        })
        .catch(() => {
          // Si no hay internet y se intentó cambiar de página HTML, muestra login
          const acceptHeader = event.request.headers.get('accept');
          if (acceptHeader && acceptHeader.includes('text/html')) {
            return caches.match('./login.html');
          }
        });
    })
  );
});
