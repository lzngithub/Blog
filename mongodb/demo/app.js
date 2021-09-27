const http = require("http")
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://admin:123456@localhost:27017';

let resData

const client = new MongoClient(url, { useNewUrlParser: true });
client.connect(err => {
  if (err) {
    return console.log(err)
  }
  console.log("mongodb数据库连接成功")
  const collection = client.db("demo").collection("user");

  // 查询数据
  collection.find({}).toArray((err, data) => {
    if (err) return console.log(err)
    console.log("查询成功")
    console.log(data)
    resData = data
    client.close();
  })

  // //增加数据
  // collection.insertOne({"name": "li", "age": 18}, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log("增加成功")
  //   console.log(result)
  //   client.close()
  // })

  // //修改数据
  // collection.updateOne({"name": "li"},{$set: {"age": 20}}, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log("修改成功")
  //   console.log(result)
  //   client.close()
  // })

  //删除数据
  // collection.deleteOne({"name": "li"}, (err, result) => {
  //   if (err) return console.log(err)
  //   console.log("删除成功")
  //   console.log(result)
  //   client.close()
  // })
});

const server = http.createServer((request, response) => {
  response.writeHead(200, {
    'content-type': 'application/json;charset=utf-8'
  })
  response.write(JSON.stringify(resData))
  response.end()
}) //createServe 高阶函数

server.listen(8080, () => {
  console.log('localhost:8080')
})