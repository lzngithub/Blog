# cancas转换成图片下载

方法

```js
const uploadQRCode = (id, filename) => {
  const canvasElement = document.getElementById(id)

  const MIME_TYPE = "image/png"

  const imgURL = canvasElement.toDataURL(MIME_TYPE)

  let dlLink = document.createElement('a')
  dlLink.download = filename
  dlLink.href = imgURL
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

  document.body.appendChild(dlLink)
  dlLink.click()
  document.body.removeChild(dlLink)
}
```

## dataset

dataset并不是典型意义上的JavaScript对象,而是个DOMStringMap对象,DOMStringMap是HTML5一种新的含有多个名-值对的交互变量

赋值

```html
<div id="day-meal-expense" data-drink="tea" data-food="noodle" data-meal="lunch">$18.3</div>
```

```js
const expenseday=document.getElementById('day-meal-expense');
expenseday.dataset.say = 'hello';
```

取值

```js
const expenseday=document.getElementById('day-meal-expense');
console.log(expenseday.dataset.food);//noodle
```

删除

```js
const expenseday=document.getElementById('day-meal-expense');
delete expenseday.dataset.food
console.log(expenseday.dataset.food);//undefined
```

兼容处理

```js
if(expenseday.dataset){
  expenseday.dataset.dessert='icecream';
}else{
  expenseday.setAttribute('data-dessert','icecream');
}
```

## a标签下载

给a标签的href设置图片的地址，download属性设置文件名, 触发a标签的点击事件

```js
let dlLink = document.createElement('a')
dlLink.download = filename
dlLink.href = imgURL
dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':')

document.body.appendChild(dlLink)
dlLink.click()
document.body.removeChild(dlLink)
```
