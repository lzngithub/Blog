# http

node的浏览器端调试

```shell
node --inspect --inspect-brk <文件名>
```

node进程管理工具

* supervisor
* nodemon
* forever
* pm2

## 方法

```js
response.writeHea() // 设置请求头
response.write() // 返回数据
response.end() // 结束返回的标志
```

request.on(请求监听)

```js
const http = require('http')
const logger = require('../logger')
const querystring = require('querystring')

const server = http.createServer((request, response) => {
  let data = ''
  request.on('data', (chunk) => {
    data = data + chunk
  })
  request.on('end', () => {
    response.writeHead(200, {
      'content-type': 'application/json;charset=utf-8'
    })
    logger.debug(data)
    response.write(JSON.stringify(querystring.parse(data)))
    response.end()
  })
}) //createServe 高阶函数

server.listen(8080, () => {
  console.log('localhost:8080')
})
```

http.createServer() 起一个监听服务

http.request(发起请求)

```js
const http = require('http')
http.request(options,callback) // 创建了一个请求
```
