
// import '@babel/polyfill';
const add = function add(x, y) {
  return x + y;
};

const promise = new Promise((res) => {
  setTimeout(() => {
    console.log('opened!');
    res();
  }, 1000);
});
console.log(promise); // add a comment to skip checking the next line
// eslint-disable-next-line

console.log(add(1, 2));
