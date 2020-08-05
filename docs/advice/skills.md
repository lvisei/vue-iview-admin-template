# 开发技巧

## Vue 开发小技巧

### 一、组件相关

1、**`@hook` **

有时在一些业务场景下，需要在父组件监听子组件挂载后`mounted`, 做一些逻辑处理，一般我们会在每个子组件中去`this.$emit`事件，我们也可以使用**`@hook` **来方便的做这个事情。

子组件

```javascript
export default {
    mounted() {
        this.$emit('listenMounted')
    }
}
```

父组件

```vue
<template>
    <div>
        <List @listenMounted="listenMounted" />
    </div>
</template>
```

其实还有一种简洁的方法，使用 `@hook` 即可监听组件生命周期，组件内无需做任何改变。同样的， `created` 、 `updated` 等也可以使用此方法。

```vue
<template>
    <Child @hook:mounted="childMounted" />
</template>
```

2、动态注册 `hook`

常见业务场景：

- 使用定时器，生命周期内清除定时器
- 事件监听移除
- 摧毁实例化的对象 

一般我们会这样做

```javascript
export default {
  created() {
    addEventListener("click", Function, false);
  },

  beforeDestroy() {
    removeEventListener("click", Function, false);
  },
};
```

避免可能遗忘，我们可以这样


```javascript
export default {
  mounted() {
    const picker = new Pickaday({
      // ...
    });

    this.$once("hook:beforeDestroy", () => {
      picker.destroy();
    })
  }
};
```



3、 避免进行数据劫持

`Vue` 中 `data` 的数据默认会 `Object.defineProperty` 对数据进行劫持, 以实现双向数据绑定，若是将大量的和渲染无关的数据直接放置在`data`中，将会浪费双向数据绑定时所消耗的性能，将这些和渲染无关的数据进行抽离并配合`Object.freeze`进行处理。

```javascript
export default {
  data() {
    return {
      tableList: [],
    };
  },

  created() {
    const tableList = [
      { name: "张四", gender: "male", age: "26" },
      { name: "李三", gender: "fmale", age: "24" },
    ];
    this.tableList = Object.freeze(tableList);
  },
};


```

4、批量数据更新

一次性更新多个数据时，可使用如下方法一起赋值。

```javascript
const {name, age, gender} = resData
this = Object.assign(this, {name, age, gender})
```

5、依赖注入

当父组件创建地图实例时，各子组件都要访问父级组件实例的时候，一般情况下我们可以通过 `$parent` property 可以用来从一个子组件访问父组件的实例，当子组件嵌套时，我们需要做这样的 hack：

```javascript
const map = this.$parent.map || this.$parent.$parent.map
```

当然你也可以将实例当成 property props 当子组件，但是不建议这么做，地图的实例不需要数据双向绑定，不需要数据劫持，避免不必要的性能浪费

在以下组件结构情况下，如果继续使用以上方法访问父组件实例会比较麻烦，我们可以使用 [provide / inject](https://cn.vuejs.org/v2/api/#provide-inject)

```vue
<template>
  <Map>
    <MapTool />
    <MapLegend />
  </Map>
</template>
```

父组件注入依赖地图实例方法

```javascript
export default {
  name: "Parent",

  provide: () => {
    return {
      getMap: this.getMap,
    };
  },
};
```

子组件接收指定方法

```javascript
export default {
  name: "Child",

  inject: ['getMap'],
  
  created () {
    console.log(this.getMap())
  }
}
```

在有些业务场景下，我们希望子组件访问父组件较多的方法与熟悉，父组件可以像这样注入组件实例。

```javascript
export default {
  name: "Parent",

  provide: [this]
};
```

不过需要注意的是 `provide` 和 `inject` 绑定并不是可响应的。

6、Vue.observable

我们可以利用这个 [Vue.observable( object )](https://cn.vuejs.org/v2/api/#Vue-observable) 来应对一些简单的跨组件数据状态共享的情况

```
// myStore
import Vue from "vue";
 
export const myStore = Vue.observable({ count: 0 });
 
export const actions = {
  setCount(count) {
    myStore.count = count;
  }
}

export const getters = {
  count: () => myStore.count
}
```

```vue
// Demo.vue
<template>
  <div>
    <p>count:{{count}}</p>
    <button @click="add"> +1 </button>
    <button @click="sub"> -1 </button>
  </div>
</template>
 
<script>
import { actions, getters } from "./store";
export default {
  name: "Demo",
  computed: {
    count() {
      return getters.count;
    }
  },
  methods: {
    add: actions.setCount(this.count+1),
    sub: actions.setCount(this.count-1)
  }
};
</script>
 
```

7、跨组件属性与事件传递

在写`Vue`组件时, 经常会遇到跨组件属性与事件传递，我们传递属性要么一层一层的组件传递`props`，我们还可以使用`$attrs`来做这个事情，同理事件传递我们可以使用 `$listeners`

```vue
<template>
  <Child v-bind="$attrs" v-on="$listeners" />
</template>
 
<script>
  import Child from "./Child";
  export default {
    props: {
      title: {
        required: true,
        type: String
      }
    }
    components: {
      Child
    }
  };
</script>
```

8、作用域插槽

```vue
<template>
  <Promised :promise="usersPromise">
    <template v-slot:pending>
      <p>Loading...</p>
    </template>

    <template v-slot="users">
      <ul>
        <li v-for="user in users">{{ user.name }}</li>
      </ul>
    </template>

    <template v-slot:rejected="error">
      <p>Error: {{ error.message }}</p>
    </template>
  </Promised>
</template>
```

9、`.sync` 修饰符

在有些情况下，我们可能需要对一个 `prop` 进行双向绑定，但实现一个双向绑定会带来维护上的问题，所以建议使用 `update:myPropName` 的模式触发事件取而代之。

子组件触发

```vue
this.$emit('update:modalVisible', false)
```

然后父组件可以监听那个事件并根据需要更新一个本地的数据 property

```vue
<ModalPane :modal-visible.sync="visible"></ModalPane>
```

10、动态组件与动态引入

```vue
<template>
  <card>
    <menu @on-select="onMenuSelect" />
    <component v-bind:is="currentComponent" />
  </card>
</template>

<script>
export default {
  name: 'Demo',

  data() {
    return {
      currentComponent: ''
    }
  },

  created() {
    const currentComponent = 'defaultComponent'
    this.onMenuSelect(currentComponent)
  },

  methods: {
    onMenuSelect(component) {
      import(`./${component}`).then(module => {
        this.currentComponent = module.default
      })
    }
  }
}
</script>
```

11、broadcast 与 dispatch

高阶组件可使用的事件广播和派发

```javascript
function broadcast(componentName, eventName, params) {
  this.$children.forEach(child => {
    var name = child.$options.componentName;

    if (name === componentName) {
      child.$emit.apply(child, [eventName].concat(params));
    } else {
      broadcast.apply(child, [componentName, eventName].concat(params));
    }
  });
}
export default {
  methods: {
    dispatch(componentName, eventName, params) {
      var parent = this.$parent;
      var name = parent.$options.componentName;
      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
    broadcast(componentName, eventName, params) {
      broadcast.call(this, componentName, eventName, params);
    }
  }
}
```

12、watch监听多个变量

watch本身无法监听多个变量。但我们可以将需要监听的多个变量通过计算属性返回对象，再监听这个对象来实现监听多个变量

```javascript
export default {
    data() {
        return {
            msg1: 'apple',
            msg2: 'banana'
        }
    },
    compouted: {
        msgObj() {
            const { msg1, msg2 } = this
            return {
                msg1,
                msg2
            }
        }
    },
    watch: {
        msgObj: {
            handler(newVal, oldVal) {
                if (newVal.msg1 != oldVal.msg1) {
                    console.log('msg1 is change')
                }
                if (newVal.msg2 != oldVal.msg2) {
                    console.log('msg2 is change')
                }
            },
            deep: true
        }
    }
}
```

### 二、路由相关

1、使路由组件传参

一般情况会会这么做

```javascript
export default {
    methods: {
        getParamsId() {
            return this.$route.params.id
        }
    }
}
```

使用 `props` 将组件和路由解耦之后

```javascript
const User = {
  props: ['id'],
  template: '<div>User {{ id }}</div>'
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User, props: true }
  ]
})
```

这样使用后路由组件可以解耦路由传参 `$route.params` 的任何参数。

2、按需 keep-alive 与强制刷新路由

```
<keep-alive>
		<router-view v-if="$route.meta.keepAlive" name="content" />
</keep-alive>
<router-view v-if="!$route.meta.keepAlive" name="content" :key="$route.fullPath" />
```

`<keep-alive>` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们，当组件在`<keep-alive>` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

有时候会复用相同的路由组件，但业务需要再次路由刷新，我们可以在路由组件上加`key`，在跳转的时候我们给路由加上随机的`query`参数

```
this.$router.push({ name: 'ToRouteName', query: { new: new Date().getTime() } })
```

## 链接

  - [Vue进阶为什么我的代码让别人看起来头皮发麻？](https://juejin.im/post/5bd83871f265da0afa3e3204)
  - [Vue.js 父子组件通信的十种方式](https://juejin.im/post/5bd18c72e51d455e3f6e4334)