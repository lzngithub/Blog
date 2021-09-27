# fs

nodejs提供的文件操作API,熟悉基本的增删改查就可以了

## events

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

你可以通过require("events");来访问该模块。

用法：

```js
const events = require('events')

const eventEmitter = new events.EventEmitter()

eventEmitter.on('say', value => {
  console.log(value)
})

eventEmitter.emit('say', 'hello')
```
