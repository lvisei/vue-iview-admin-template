## SideMenu 侧边主菜单栏

### 使用指南
``` javascript
import SideMenu from '@/components/SideMenu'
```

### 代码演示

#### 基础用法

```html
<SideMenu
  theme="dark"
  :accordion="true"
  :active-name="$route.name"
  :collapsed="isCollapsed"
  @on-select="turnToPage"
  :menu-list="menuList"
>
<div class="logo">
  <router-link to="/">
    <img src="logo.png">
    <h1 v-show="!isCollapsed" class="logo__title">Vue IView Admin</h1>
  </router-link>
</div>
</SideMenu>
```

```javascript
export default {
  data() {
    return {
      menuList: [],
      isCollapsed: false,
    }
  },

  methods: {
   turnToPage(route) {
      let isLink = name.indexOf('href_') !== -1
      if (isLink) {
        window.open(name.split('_')[1])
        return
      }
      this.$router.push({ name: route })
    }
  }
}
```

### API

| 参数         | 说明                                             | 类型      | 默认值  |
| ------------ | ------------------------------------------------ | --------- | ------- |
| menuList     | 菜单列表                                         | `Array`   | `[]`    |
| collapsed    | 是否折叠侧边栏                                   | `Boolean` | `false` |
| theme        | 主题颜色                                         | `string`  | `dark`  |
| rootIconSize | 一级 Icon 大小                                   | `Number`  | `17`    |
| iconSize     | 二级 Icon 大小                                   | `Number`  | `14`    |
| accordion    | 是否开启手风琴模式，开启后每次至多展开一个子菜单 | `Boolean` | `false` |
| activeName   | 激活菜单的 name 值                               | `String`  | `-`     |
| openNames    | 展开的 Submenu 的 name 集合                      | `Array`   | `[]`    |

### Event

| 事件名    | 说明                       | 返回值 |
| --------- | -------------------------- | ------ |
| on-select | 选择菜单（MenuItem）时触发 | name   |

### Slot

| 名称 | 说明          |
| ---- | ------------- |
| -    | logo 插入内容 |

### 使用备注

该组件必须放在 Menu 组件内
