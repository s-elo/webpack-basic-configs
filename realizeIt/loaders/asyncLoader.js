const { getOptions } = require("loader-utils");

module.exports = function (source) {
  const asyncCallback = this.async();

  const res = source.replace("world", getOptions(this).name);

  setTimeout(() => {
    asyncCallback(null, res);
  }, 1000);
};
