# vuex

参考：<https://vuex.vuejs.org/zh/>

## 安装

```js
npm run vuex --save
```

生产依赖

## 简单使用

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
        getters: {
            getterCount(state) {
                return state.count + 1
            }
        },
        mutations: {
            changeCount(state, payload) {
                state.count = payload.count
            }
        },
        actions: {
            changeCount({ commit }) {
                commit('changeCount')
            }
        }
    })
    ```

3. 使用,通过store.state来获取对象，通过store.commit来触发状态变变更

    ```js
    store.commit('changeCount') // 触发mutations
    store.dispatch('changeCount') // 分发actions
    console.log(store.state.count) // -> 1
    console.log(stroe.getters.getterCount) // -> 2
    ```

上面步骤已经可以使用vuex了，但是在组件中使用不方便，每在一个组件中使用都要进行导入，所以，Vuex 提供了一个从根组件向所有子组件，以 store 选项的方式“注入”该 store 的机制：

```js
new Vue({
  el: '#app',
  store: store,
})
```

这个时候就可以直接在组件中通过this.$store使用vuex了

```js
this.$store.commit('changeCount')
console.log(this.$store.state.count)
```

## 配合组件进行使用

上面说在根元素组件间注入store后，就可以在组件中通过一些辅助方法便捷的使用store了

### State

直接通过this.$store访问

```js
computed: {
    count() {
        return this.$store.state.count
    }
}
```

通过辅助函数mapState, mapState返回值是一个对象

```js
import { mapState } from 'vuex'

//对象语法
computed: mapState({
    // 箭头函数
    count: state => state.count,
    // 字符串
    count: 'count',
    // 想要使用this的时候，只能使用常规函数
    countAndThis(state) {
        return state.count + this.localCount
    }
})

// 数组语法
computed: mapState([
    'count'
])

// 最终写法，用展开运算符，可以跟原生computed一起存在了

computed: {
    localCount() {
        return 1
    },
    ...mapState({
        countAndThis(state) {
            return state.count + this.localCount
        }
    })
}

```

一般都是放在computed属性中，不能放在data中，因为不会触发更新，也可以直接使用，会更新，但是不知道会有什么其他问题不，所以不用考虑那么多，直接放在computed属性里最好。

### Getter

定义

```js
getters: {
    // 返回一个值
    getterCount(state) {
        return state.count + 1
    }
    // 返回一个方法，可以从外部传值进来参与计算
    countMoreOut: state => count => state.count + count
}
```

用法跟state一样，不过辅助方法换成mapGetters

### Mutation

定义

```js
mutations: {
    changeCount(state, payload) {
        state.count = payload.count
    },
    // 增加新对象的时候，要这样增加，要不然可以没用
    addKeys(state, payload) {
        state.obj = { ...state.obj, newProp: payload.newProp }
    }

}

```

提交风格，单值时用方式二好，多值时用方式一，但为了保证统一，统一用方式一好一些

```js
// 方式一
store.commit('changeCount', {
  count: 10
})
// 方式二，对象风格的提交方式
store.commit({
    type: 'changeCount',
    count: 10
})
```

辅助函数，mapMutations

```js
import { mapMutations } from 'vuex'

methods: {
    // 对象传参
    ...mapMutions({
        changeCount：'changeCount'
    }),
    // 数组传参
    ...mapMutations([
        'changeCount'
    ])
}
```

### Action

action里可以进行异步操作

定义：

```js
actions: {
    changeCount({ commit }) {
        commmit('changeCount')
    }
}
```

使用方法跟mutation一样，不过，触发方法变成了dispatch，辅助方法变成了mapActions

### Module

当项目比较大的时候，可以考虑将store分割成模块，每个模块都拥有自己的state，mutation，action，getter，同时可以嵌套。

定义：

```js
// rootGetters要开启命名空间才有用
const login = {
    state: {
        count
    },
    getters: {
        getterCount(state, getters, rootState, rootGetters) {
            return state.count + 1
        }
    },
    mutations: {
        changeCount(state, payload) {
            state.count = payload.count
        }
    },
    actions: {
        changeCount({ state, getters, commit, dispatch, rootState, rootGetters }, payload) {
            commit('changeCount')
        }
    }
}

const store = new Vuex.Store({
    modules: {
        login
    }
})
```

#### 命名空间

命名空间间默认是不开启的，模块内部的 action、mutation 和 getter 是注册在全局命名空间的，state是局部的，当开启命名空间后，当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。

开启

```js
const login = {
    namespaced: true, // 开启命名空间
    state: {
        count
    },
    getters: {
        getterCount(state) {
            return state.count + 1
        }
    },
    mutations: {
        changeCount(state, payload) {
            state.count = payload.count
        }
    },
    actions: {
        changeCount({ commit }) {
            commit('changeCount')
        }
    }
}

const store = new Vuex.Store({
    modules: {
        login
    }
})
```

辅助方法取值的变动

方法一,在原来的基础上把路径扩展，这种情况就不能用数组语法简写了

```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

computed: {
    ...mapState({
        count: state.login.count
    }),
    ...mapGetters({
        getterCount: 'login/getterCount'
    })
}

methods: {
    ...mapMutations({
        changeCount: 'login/changeCount'
    }),
    ...mapActions({
        changeCount: 'login/changeCount'
    }),
}

```

方法二是在方法一的基础上把多余路径当成一个参数传给辅助方法

```js
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

computed: {
    ...mapState('login', {
        count: state.count
    }),
    ...mapGetters('login', {
        getterCount: 'getterCount'
    })
}

methods: {
    ...mapMutations('login', {
        changeCount: 'changeCount'
    }),
    ...mapActions('login', {
        changeCount: 'changeCount'
    }),
}
```

方法三是使用 createNamespacedHelpers 创建基于某个命名空间辅助函数

```js

import { createNamespacedHelpers } from 'vuex'
const { mapState, mapGetters, mapMutations, mapActions } = createNamespacedHelpers('login')

computed: {
    ...mapState({
        count: state.count
    }),
    ...mapGetters({
        getterCount: 'getterCount'
    })
}

methods: {
    ...mapMutations({
        changeCount: 'changeCount'
    }),
    ...mapActions({
        changeCount: 'changeCount'
    }),
}
```

## vuex进阶

### 插件

这个功能感觉不太可能用的到，反正至今为止还没需要用到过，这个选项会把每次mutation的钩子暴露出来，你可以生成state快照，比较mutation前后state的区别，或者针对某个mutation做特殊处理

### 严格模式

开启

```js
const store = new Vuex.Store({
    strict: true,
    // ...
})
```

在严格模式下，发生state状态变更不是由mutation函数引起的，都会报错，严格模式会深度监测状态树，在生产环境下要关闭

```js
const store = new Vuex.Store({
    strict: process.env.NODE_DEV !== 'production',
    // ...
})
```

### 表单处理

在严格模式下，如果input绑定了vuex.state的值，当input输入的时候，会直接去修改state的值，由于不是由mutation去修改，会报错。所以的药做一些特殊处理

```js
<input v-model="message">
```

```js
// ...
computed: {
  message: {
    get () {
      return this.$store.state.obj.message
    },
    set (value) {
      this.$store.commit('updateMessage', value)
    }
  }
}
```
