import { mul, sub } from './test.js';
// import $ from 'jquery';
import common from './common.js';

import(/*webpackChunkName: 'test'*/'./test.js')
    .then(({ mul, sub }) => {
        console.log(mul(1, 2), sub(5, 1));
    })
    .catch(() => {
        console.log('err');
    });

// console.log(mul(1, 2), sub(5, 1));
console.log(common);

const add = (x, y) => {
    return x + y;
};

console.log(add(1, 2));
