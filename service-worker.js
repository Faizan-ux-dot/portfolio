/* eslint-disable no-restricted-globals */
const CACHE_VERSION = 'v1';
const CACHE_NAME = `faizan-portfolio-${CACHE_VERSION}`;

const CORE_ASSETS = [
  './',
  'index.html',
  'manifest.json',
  'robots.txt',
  'assets/css/variables.css',
  'assets/css/animations.css',
  'assets/css/utilities.css',
  'assets/css/components.css',
  'assets/css/cursor.css',
  'assets/css/loader.css',
  'assets/css/responsive.css',
  'assets/css/style.css',
  'assets/css/background-animated.css',
  'assets/js/main.js'
];

self.addEventListener('install', (event)=>{
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache)=>{
      return cache.addAll(CORE_ASSETS);
    }).then(()=> self.skipWaiting())
  );
});

self.addEventListener('activate', (event)=>{
  event.waitUntil(
    caches.keys().then((keys)=>{
      return Promise.all(keys.map((k)=>{
        if(k !== CACHE_NAME) return caches.delete(k);
      }));
    }).then(()=> self.clients.claim())
  );
});

self.addEventListener('fetch', (event)=>{
  const req = event.request;
  if(req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached)=>{
      if(cached) return cached;

      return fetch(req).then((res)=>{
        const copy = res.clone();
        // Cache only same-origin navigations/assets
        if(new URL(req.url).origin === location.origin){
          caches.open(CACHE_NAME).then((cache)=>cache.put(req, copy));
        }
        return res;
      }).catch(()=>{
        // fallback
        return caches.match('index.html');
      });
    })
  );
});

