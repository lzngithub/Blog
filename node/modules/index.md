# 模块和CommonJS

CommonJS是第三方规范，浏览器不支持

## 导入导出

```js
// app.js 导出

// 方式一
module.exports = {
  age: 666,
  naem: 9999,
  default: '999'
}
// 方式二
exports.sex = '男'
exports.color = 'red'
exports.default = '666'

// index.js 导入
const app = require('./app.js')
```

## url(内部模块)

```js
const url = require('url')
const urlString = 'https://www.baddu.com:443/path/index.html?id=2#tag=3'
```

```js
const urlParams = new URLSearchParams(url.parse(urlString).search)
console.log(urlParams.get('id')) // 2
```

