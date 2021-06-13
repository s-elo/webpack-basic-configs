/**
 * 1. index.js: entry of the webpack
 *    build: save the outputs of the webpack(bundled file: main.js)
 * 
 * 2. development mode: 
 *      webpack ./src/index.js -o ./build/bundler.js --mode=development
 *    production mode (compression):
 *      webpack ./src/index.js -o ./build/bundler.js --mode=production
 *
 * 3. webpack can not handle the css/img ect resources webpack ./src/index.js -o ./build/bundler.js --mode==development
 *    but it can handle js/json resources
 */

import data from './testData.json';
console.log(data);

function add(x, y) {
    return (x + y);
}

console.log(add(1, 2));
