import '../css/index.css';

const a = 5;
console.log(a);

/**
 * problem1:
 *  eslint cannot tell the global vars like window, navigator
 * solve:
 *  add a config at package.json in "eslintConfig":{}
 *  "env": {
 *      "browser": true // let them tell the global vars
 *  }
 *
 * problem2: (actaully it is not a problem...)
 *  serviceWorker must be run at a server
 *  1. use node.js
 *  2. npm i serve -g
 *     serve -s build(make it public)
 */

// register the serviceWorker
// compatibility
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // service-worker.js is generated by the workbox-webpack-plugin
    navigator.serviceWorker.register('./service-worker.js')
      .then(() => {
        console.log('register successfully!');
      })
      .catch(() => {
        console.log('failed to register!');
      });
  });
}
