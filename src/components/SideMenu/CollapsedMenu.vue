<template>
  <i-dropdown
    ref="dropdown"
    @on-click="handleClick"
    :class="['collapsed-menu', hideTitle ? '' : 'collased-menu-dropdown']"
    :transfer="hideTitle"
    :placement="placement"
  >
    <a
      class="side-menu__drop-menu-a"
      type="text"
      @mouseover="handleMousemove($event, children)"
      :style="{ textAlign: !hideTitle ? 'left' : '' }"
    >
      <i-icon :size="rootIconSize" :color="textColor" :type="parentItem.icon" />
      <span class="collapsed-menu__menu-title" v-if="!hideTitle">{{ parentItem.title }}</span>
      <i-icon style="float: right;" v-if="!hideTitle" type="ios-arrow-forward" :size="16" />
    </a>
    <i-dropdown-menu ref="dropdown" slot="list">
      <template v-for="(child, index) in children">
        <CollapsedMenu
          v-if="showChildren(child)"
          :icon-size="iconSize"
          :parent-item="child"
          :key="index"
        ></CollapsedMenu>
        <i-dropdown-item v-else :key="index" :name="child.name">
          <i-icon :size="iconSize" :type="child.icon" />
          <span class="collapsed-menu__menu-title">{{ child.title }}</span>
        </i-dropdown-item>
      </template>
    </i-dropdown-menu>
  </i-dropdown>
</template>

<script>
import mixin from './mixin'

export default {
  name: 'CollapsedMenu',

  mixins: [mixin],

  components: {},

  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },

    theme: String,

    iconSize: Number,

    hideTitle: {
      type: Boolean,
      default: false
    },

    rootIconSize: Number
  },

  data() {
    return {
      placement: 'right-end'
    }
  },

  computed: {
    parentName() {
      return this.parentItem.name
    },

    children() {
      return this.parentItem.children
    },

    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },

  mounted() {
    let dropdown = this.findNodeUpperByClasses(this.$refs.dropdown.$el, [
      'ivu-select-dropdown',
      'ivu-dropdown-transfer'
    ])
    if (dropdown) dropdown.style.overflow = 'visible'
  },

  methods: {
    handleClick(name) {
      this.$emit('on-click', name)
    },

    handleMousemove(event, children) {
      const { pageY } = event
      const height = children.length * 38
      const isOverflow = pageY + height < window.innerHeight
      this.placement = isOverflow ? 'right-start' : 'right-end'
    },

    findNodeUpperByClasses(ele, classes) {
      let parentNode = ele.parentNode
      if (parentNode) {
        let classList = parentNode.classList
        if (classList && classes.every(className => classList.contains(className))) {
          return parentNode
        } else {
          return this.findNodeUpperByClasses(parentNode, classes)
        }
      }
    }
  }
}
</script>

<style lang="less">
.collapsed-menu {
  &__menu-title {
    padding-left: 6px;
  }
}
</style>
