const {getOptions} = require('loader-utils');

module.exports = function (source) {
    // source 就是入口文件里的内容
    console.log(source);
    
    // options 里的信息
    console.log(this.query.message);
    // 或者这样获取
    console.log(getOptions(this).message);

    const res = source.replace('hello', getOptions(this).message);

    // 第一个为报错参数，第二个为处理后结果
    this.callback(null, res);
}