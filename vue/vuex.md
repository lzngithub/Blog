# vuex

参考：<https://vuex.vuejs.org/zh/>

## 第一步，安装

```js
npm run vuex --save
```

生产依赖

## 第二步 使用

三部分

1. 显示的使用Vue.use()来使用vuex

    ```js
    import Vue from 'vue'
    import Vuex from 'vuex'

    Vue.use(Vuex)
    ```

2. 生成store实例

    ```js
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            increment (state) {
            state.count++
            }
        }
    })
    ```

3. 使用,通过store.state来获取对象，通过store。commit来触发状态变变更

    ```js
    store.commit('increment')
    console.log(store.state.count) // -> 1
    ```

完成上面两步已经可以使用vuex了，但是在组件中使用不方便，所以，Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：

```js
new Vue({
  el: '#app',
  store: store,
})
```

这个时候就可以直接在组件中通过this.$store使用vuex了

```js
this.$store.commit('increment')
console.log(this.$store.state.count)
```

## 第三步，便捷使用vuex



