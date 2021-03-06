# 跨域

## jsonp(前后端配合)

jsonp不属于ajax，它利用了在不用域下面传递js不会同源策略影响的特性传递数据

```js
// 前端
<script>
  let _data = ''
  function getData(data){
    _data = data
    console.log(_data)
  }
</script>
<script src='http://localhost:8080/api/data?cb=getData'></script>

// 后端
const http = require('http')
const url = require('url')

const app = http.createServer((req, res) => {
  let urlstr = req.url
  let urlObj = url.parse(urlstr, true)
  switch(urlObj.pathname){
    case '/api/data':
      res.write(`${urlObj.query.cb}("hello")`)
      break
    default:
      res.write('404')
  }
  res.end()
})

app.listen(8080, () => {
  console.log('locallhost:8080')
})
```

## CORS(后端实现)

```js
// 前端
window.fetch('http://localhost:8080/api/data').then(res => {
  return res.json()
}).then(result => {
  console.log(result)
})

//后端
const http = require('http')
const url = require('url')

const app = http.createServer((req, res) => {
  let urlstr = req.url
  let urlObj = url.parse(urlstr, true)
  switch(urlObj.pathname){
    case '/api/data':
      res.writeHead(200, {
        "content-type": "application/json;charset=utf-8",
        "Access-Control-Allow-Origin": "*"
      })
      res.write(`{"ret": true, "data": "hello"}`)
      break
    default:
      res.write('404')
  }
  res.end()
})

app.listen(8080, () => {
  console.log('locallhost:8080')
})
```

## middleware(http-proxy-widdware)

```js
const { createProxyMiddleware }  = require('http-proxy-middleware')
const proxy = createProxyMiddleware('/p', {
  target: 'https://mar.vip.com',
  changeOrigin: true,
  pathRewrite: {
    '^/p': ''
  }
})
proxy(req, res)
```
