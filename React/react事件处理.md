# react事件处理

## 事件绑定

1.在构造函数中使用bind绑定this

```javascript
class Button extends React.Component {
constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

2.在调用的时候使用bind绑定this
```javascript

class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Click me
      </button>
    );
  }
}
```

3.在调用的时候使用箭头函数绑定this

```javascript
class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={()=>this.handleClick()}>
        Click me
      </button>
    );
  }
}
```

4.在定义的时候使用箭头函数绑定this

```javascript
class Button extends React.Component {
  handleClick=()=>{
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}
```

## 事件传参

只有使用方法2和方法3绑定事件的时候才能传递额外参数

1.在调用的时候使用bind绑定额外参数

```javascript
class Button extends React.Component {
  handleClick(extra, event){
    console.log('this is:', this, extra, event);
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this, 'extra')}>
        Click me
      </button>
    );
  }
}
```

2.在调用的时候使用箭头函数绑定额外参数

```javascript
class Button extends React.Component {
  handleClick(extra, event){
    console.log('this is:', this, extra, event);
  }
  render() {
    return (
      // 这种方式事件对象要显式传递
      <button onClick={(event)=>this.handleClick('extra', event)}>
        Click me
      </button>
    );
  }
}
```

## 各种绑定this的优缺点比较

* 方式1，只会生成一个方法实例，多个地方使用该方法时不用每个单独绑定，不能传额外参数
* 方式2，写法简单，不过每一次调用都会生成一个新的方法实例，对性能有影响，多为属性值传入低阶组件的时候会造成组件的重新渲染，可以额外传参
* 方式3，同方式2
* 方式4，写法最方便，定义的时候就直接绑定了this，但是还属于实验性语法，需要babel转译，可额外传参

## 为什么react要显示或者隐式的绑定this

官方的一段话其实已经说的非常清楚了

> 你必须谨慎对待 JSX 回调函数中的 this，在 JavaScript 中，class 的方法默认不会绑定 this。如果你忘记绑定 this.handleClick 并把它传入了 onClick，当你调用这个函数的时候 this 的值为 undefined。这并不是 React 特有的行为；这其实与 JavaScript 函数工作原理有关

举例

```javascript
// 使用 ES6 的 class 语法，模拟react的render中事件的绑定
class Cat {
 sayThis () {
 console.log(this); // undefined
  }

 exec (cb) {
 cb(); // 没有显示的调用，在class内不会默认绑定this，cb()函数内的this没有指向任何对象
  }

 render () {
 this.exec(this.sayThis); // 用点操作符只是把这个方法的引用值传递到了exec方法内部，sayThis这个方法内的this只有在真正调用执行的时候才会确定
  }
}

const tom = new Cat();
tom.render();
```

当使用了严格模式，那么没有显式的使用调用者 的情况下， this 永远不会自动绑定到全局对象上，如果你使用了 ES6 的 class 语法，所有在 class 中声明的方法都会自动地使用严格模式，所以class 的方法默认不会绑定 this
