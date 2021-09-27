const express = require('express')

const app = express()

app.get("/", (req,res) => {
  res.send('nihao')
})
app.get("/login", (req,res) => {
  let id = req.query.id
  res.send('传的值：'+id)
})

// 动态路由（注意顺序）模糊匹配，要放在后面
app.get("/article/:id", (req, res) => {
  let id = req.params.id
  res.send(id)
})

// get传值

app.listen(3000, () => {
  console.log('服务已经启动')
})