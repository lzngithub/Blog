# flex

## flex基本语法

参考MDN： [https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex]

## 需要注意的点

flex-basis是对于主轴来说，主轴可以是x轴，也可以是y轴，为了方便行文，默认主轴为x轴

* flex-basis的优先级比width高

* item的宽度等于basic设置或者width设置的值加上剩余空间被平分后自己占据那部分的值

比如

```text
容器宽度等于700px

item1 flex-grow=2 flex-basic或者宽度=100px

item2 flex-grow=1 flex-basic或者宽度=200px

item3 flex-basic或者宽度=100px（flex-grow默认等于0）

item1最终宽度 =（700 - 100 - 200 - 100）/ ( 1 + 2) * 2 + 100 = 300

item1最终宽度 =（700 - 100 - 200 - 100）/ ( 1 + 2) * 1 + 200 = 300

item1最终宽度 = 100  
```

* 设置flex属性，不管是用单值语法还是双值语法，会改变flex-grow flex-shrink flex-basis 的默认属性

比如

```text
flex: 1;

这个是单值语法：1代表的是flex-grow的值，其他两个值会被省略，被省略的时候，会有默认值

flex-grow: 省略时默认值为 1。 (原本默认值为 0)
flex-shrink: 省略时默认值为 1。 (原本默认值为 1)
flex-grow: 省略时默认值为 0。 (原本默认值为 auto)

所以flex: 1 等于 flex: 1 1 0，而不是felx: 1 1 auto
```

## flex布局可以实现的几个效果

前置准备工作

```html
<div class="content">
    <div class="item1">item1</div>
    <div class="item2">item2</div>
    <div class="item3">item3</div>
</div>
```

等分布局

```css
.content {
    display: flex;
    width: 800px;
    height: 100px;
}
.item1 {
    background-color: #eee;
    flex: 1;
}
.item2 {
    background-color: #ccc;
    flex: 1;
}
.item3 {
    background-color: #bbb;
    flex: 1;
}
```

item1比item2 item3宽度多200px

```css
.content {
    display: flex;
    width: 800px;
    height: 100px;
}
.item1 {
    background-color: #eee;
    flex: 1 200px;
}
.item2 {
    background-color: #ccc;
    flex: 1;
}
.item3 {
    background-color: #bbb;
    flex: 1;
}
```

item1的宽度是item2 item3的两倍

```css
.content {
    display: flex;
    width: 800px;
    height: 100px;
}
.item1 {
    background-color: #eee;
    flex: 2;
}
.item2 {
    background-color: #ccc;
    flex: 1;
}
.item3 {
    background-color: #bbb;
    flex: 1;
}
```

按倍数去分配容器的宽度

```css
.content {
    display: flex;
    width: 600px;
    height: 100px;
}
.item1 {
    background-color: #eee;
    flex: 1;
}
.item2 {
    background-color: #ccc;
    flex: 2;
}
.item3 {
    background-color: #bbb;
    flex: 3;
}
```
