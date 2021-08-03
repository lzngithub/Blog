# react 比较细碎的知识点

## Component、PureComponent比较

PureComponent 会在shouldComponentUpdate()生命周期对跟新前后的props和state进行一次浅比较，如果没有变化，则不会调用render()方法进行更新，所以在一些特定的情况下可以用作优化手段

tips:

* 在Component组件中，只有调用了setState()方法就会导致更新，不管state前后的值有没有变化
* 在函数组件中，如果改变state的值前后没有变化的话，则不会触发更新,似乎也会进行浅比较

## 关于Memoization

Memoization是一种优化技巧，Memoization会存储前一个值，然后每次更新时都将新传入的值和存储的值作比较，然后根据比较结果是否相同来返回存储的值还是新的值。React中使用该技术主要是为了避免不必要的重复渲染，在hooks中用的比较多，如果需要class组件中需要用要安装相应的依赖

class组件中用Memoization,需要安装对应的库，推荐memoize-one

安装

```shell
yarn add memoize-one
```

使用

```js
// 导入
import memoize from 'memoize-one'

// 使用
_memoize = memoize((a, b)=> { // a b 的值不变，_memoize会继续使用上一次的值
  // 代码
})
```

## Fragments

正常情况，react规定，一个组件只能返回一个根元素，当你需要返回多个元素时，可以考虑用Fragments

正常使用

```js
// 导入
import { Fragment } from 'react'
// 使用
render() {
  return <Fragment key={'1'}> // 可以设置唯一属性key
    <div>666</div>
    <div>777</div>
  </Fragment>
}

```

短语法（不支持设置属性）

```js
<>
  <div>666</div>
  <div>777</div>
</>
```

## Portals(正门，门户)

Portal 提供了一种将子节点渲染到存在于父组件以外的 DOM 节点的优秀的方案，数据流和事件冒泡还是依照react树流转，而不是按照真实的dom结构流转

```js
ReactDOM.createPortal(child, container)
```

child： 任何的可渲染的react元素  
container： 一个真实DOM元素，不是react元素

使用：

```js
// 导入
import { createPortal } from 'react-dom';
// 使用
class Child extends Component {
  constructor(props) {
    super(props);
    this.el = document.createElement('div');
    this.child2Ref = createRef()
  }
  componentDidMount() {
    this.child2Ref.current.appendChild(this.el);
  }
  render() {
    return <div>
      <Child1 onClick={() => (
        console.log('child1')
      )}>
        {createPortal(<Child3 />, this.el)}
        {/* <Child3 /> */}
      </Child1>
      <Child2 ref={this.child2Ref} onClick={() => console.log('child2')}>
      </Child2>
    </div>
  }
}

const Child1 = styled.div`
  position: absolute;
  z-index: 1;
  width: 100px;
  height: 100px;
  background-color: #000;
`
const Child2 = styled.div`
  position: absolute;
  z-index: 2;
  width: 100px;
  height: 100px;
  background-color: blue;
`
const Child3 = styled.div`
  position: absolute;
  z-index: 3;
  width: 200px;
  height: 200px;
  background-color: #f40;
`
```

Portals,主要是为了当父元素设置了一些比如overflow：hidden或者z-index这些css属性导致子元素在视觉呈现上面有局限性而出现的功能，它并不会改变react数据流向和事件冒泡的顺序，上面例子中，如果不采用Portals方法，由于Child2比Child1层级高，所以Child3层级就会被遮挡，当采用Portals方法，Child3是挂载Child2上的，所以Child3就能显示出来了，在当点击Child3的时候，控制台打印的也是child1，因为时间事件冒泡还是按照react树的结构。