(function(depGragh){
    function require(filePath) {
      function absRequire(relPath) {
        return require(depGragh[filePath].deps[relPath]);
      }
      const exports = {};
      (function(require, code, exports) {
        eval(code);
      })(absRequire, depGragh[filePath].code, exports);

      return exports;
    }
    require('./src/index.js');
  })({"./src/index.js":{"deps":{"./add.js":"E:\\learn\\WEB\\webPackLearn\\realizeIt\\src\\add.js","./sub.js":"E:\\learn\\WEB\\webPackLearn\\realizeIt\\src\\sub.js"},"code":"\"use strict\";\n\nvar _add = _interopRequireDefault(require(\"./add.js\"));\n\nvar _sub = require(\"./sub.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar addRet = (0, _add.default)(1, 2);\nvar subRet = (0, _sub.sub)(3, 2);\nconsole.log(addRet, subRet);"},"E:\\learn\\WEB\\webPackLearn\\realizeIt\\src\\add.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = add;\n\nfunction add(a, b) {\n  return a + b;\n}"},"E:\\learn\\WEB\\webPackLearn\\realizeIt\\src\\sub.js":{"deps":{},"code":"\"use strict\";\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.sub = sub;\n\nfunction sub(a, b) {\n  return a - b;\n}"}})