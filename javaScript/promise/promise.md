# promise

## 什么是Promise

promise 是目前 JS 异步编程的主流解决方案，遵循 Promises/A+ 方案。  
链接：[https://promisesaplus.com/]  
翻译链接：[https://juejin.cn/post/6844903767654023182]  

## Promise基本概念

所谓Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。

Promise对象的状态不受外界影响。Promise对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）

一旦状态改变，就不会再变，任何时候都可以得到这个结果

无法取消Promise，一旦新建它就会立即执行，无法中途取消。其次，如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。第三，当处于pending状态时，无法得知目前进展到哪一个阶段。

定义一个Promise，就表明里面应该要有一个异步操作，语义化明显，同时，我们可以根据异步操作的结果选择性的让Promise是变为成功状态还是失败状态。

## 基本使用

```js
// 通过new Promise()去创建一个Promise实例
new Promise((resolve, reject) => {
  const bol = true // 控制是成功状态还是失败状态的开关
  if (bol) {
    resolve('失败') // 调用resolve()函数将Promise状态变为fulfilled
  }else {
    reject('成功')// 调用reject()函数将Promise状态变为rejected
  }else {
  }
}).then(res => {
  console.log(res) // then为成功后的回调， 可以接收参数
}).catch(err => {
  console.log(err) // catch为失败后的回调，可以接收参数
})

```
