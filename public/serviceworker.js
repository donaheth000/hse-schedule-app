const CACHE_NAME = "HSEScheduleApp";

const FILES_TO_CACHE = [
  "/public/"
];

if("serviceWorker" in navigator){
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/public/serviceworker.js")
      .then((reg) => {
        registration = reg;
      }).catch(function(err){

      });
  });
} else {

}

self.addEventListener("install", (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key != CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (evt) => {
  if (evt.request.mode != "navigate") {
    return;
  }
  evt.respondWith(
      fetch(evt.request)
          .catch(() => {
            return caches.open(CACHE_NAME)
                .then((cache) => {
                  return cache.match(evt.request);
                });
          })
  );
});
