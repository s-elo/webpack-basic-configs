const fs = require("fs");
const path = require("path");

const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const babelCore = require("@babel/core");

function getModuleInfo(filePath) {
  const fileData = fs.readFileSync(filePath, "utf-8");

  // get AST
  const ast = babelParser.parse(fileData, {
    sourceType: "module",
  });

  // console.log(ast.program.body);
  const deps = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const dirname = path.dirname(filePath);
      const importPath = node.source.value;
      const pathToThisFile = path.resolve(dirname, importPath);

      deps[importPath] = pathToThisFile;
    },
  });

  const { code } = babelCore.transformFromAst(ast, null, {
    presets: ["@babel/preset-env"],
  });

  return { filePath, deps, code };
}

// get all the deps
function parseModules(filePath) {
  const entry = getModuleInfo(filePath);

  const moduleInfos = [entry];
  for (const info of moduleInfos) {
    if (info.deps) {
      for (const key in info.deps) {
        if (info.deps.hasOwnProperty(key)) {
          // dep.deps[key] is the dep path
          moduleInfos.push(getModuleInfo(info.deps[key]));
        }
      }
    }
  }

  const depGragh = {};

  // console.log(moduleInfos);
  for (const info of moduleInfos) {
    depGragh[info.filePath] = {
      deps: info.deps,
      code: info.code,
    };
  }

  return depGragh;
}

// console.log(parseModules("./src/index.js"));
// console.log(getModuleInfo("./src/index.js"));
function bundle(filePath) {
  const depGragh = JSON.stringify(parseModules(filePath));
  // eval 里面执行时遇到的require和exports分别是此作用于下的
  // 即require执行absRequire，然后内部是进行递归调用
  // 但是传进去的是绝对路径；
  // 同理，exports则是外部我们定义的exports
  // 这样我们就可以通过eval收集exports里面的东西(即本来要导入的东西)
  return `(function(depGragh){
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
    require('${filePath}');
  })(${depGragh})`;
}

const content = bundle("./src/index.js");

fs.mkdirSync("./dist");
fs.writeFileSync("./dist/bundle.js", content);
