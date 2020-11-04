'use strict';

importScripts('sw-toolbox.js');

toolbox.precache(["index.html","css.css"]);

toolbox.router.get('/*', toolbox.networkFirst, {
  networkTimeoutSeconds: 5
});
