import '../css/index.css';

function sum(...args) {
  return args.reduce((p, n) => p + n, 0);
}

// eslint-disable-next-line
console.log(sum(1, 2, 3, 4, 5));
