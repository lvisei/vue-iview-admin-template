<template>
  <i-submenu :name="`${parentName}`">
    <template slot="title">
      <i-icon :type="parentItem.icon || ''" :size="rootIconSize" />
      <span>{{ parentTitle }}</span>
    </template>
    <template v-for="(item, index) in children">
      <template v-if="item.children && item.children.length === 1">
        <i-menu-item :name="getRouteNameOrHref(item.children[0])" :key="index">
          <i-icon :type="item.children[0].icon || ''" :size="iconSize" />
          <span>{{ item.children[0].title }}</span>
        </i-menu-item>
      </template>
      <template v-else>
        <SideMenuItem v-if="showChildren(item)" :key="index" :parent-item="item" />
        <i-menu-item v-else :name="getRouteNameOrHref(item)" :key="index">
          <i-icon :type="item.icon || ''" :size="iconSize" />
          <span>{{ item.title }}</span>
        </i-menu-item>
      </template>
    </template>
  </i-submenu>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'SideMenuItem',

  mixins: [mixin],

  components: {},

  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },

    theme: String,

    iconSize: Number,

    rootIconSize: Number
  },

  computed: {
    parentName() {
      return this.parentItem.name
    },

    parentTitle() {
      return this.parentItem.title
    },

    children() {
      return this.parentItem.children
    },

    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  }
}
</script>
