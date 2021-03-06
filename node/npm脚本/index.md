# npm脚本

主要指package.json文件里scripts字段的内容

* 自定义的脚本要加run，特殊的命令可加可不加(start, test)
* &: 命令异步执行
* &&： 命令同步执行
* npm脚本(用npm脚本去运行的命令)可以访问npm的内部变量，在js文件中通过process.env.npm_package_<字段>，在windows系统npm命令行中用%npm_package_<字段>%,在mac系统中用$npm_package_<字段>，只能拿一些特定的字段
* .exit 退出node控制台

例子：

```json
"scripts": {
  "hello": "echo hello",
  "start": "echo start",
}
```

运行

```shell
npm run hello
npm start
```

## 通过git安装项目依赖

```shell
npm i git+<git依赖地址> // https的方式
npm i git+ssh://<git依赖地址> // ssh方式
```

## cross-env

运行跨平台设置和使用环境变量脚本

windows不支持NODE_ENV=production的设置方式，解决方法，安装cross-env

安装

```shell
npm i cross-env -S
```

scripts脚本命令

```shell
"dev": "cross-env NODE_ENV=development gulp -f ./gulp.config.js",
"prod": "cross-env NODE_ENV=production gulp -f ./gulp.config.js"
```

gulp.config.js

```js
const { src, dest, series } = require('gulp')

const node_env = process.env.NODE_ENV
console.log(node_env) //development || production

function script() {
  return src('./app.js', {sourcemaps: true}).pipe(dest('./dist/'))
}

var build = series(script)

exports.default = build
```
