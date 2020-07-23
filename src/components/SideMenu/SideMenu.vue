<template>
  <div class="side-menu">
    <!-- logo -->
    <slot></slot>
    <!-- unfolded  menu -->
    <i-menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
      @on-open-change="handleSelectChange"
    >
      <template v-for="(item, index) in menuList">
        <template v-if="item.children && item.children.length === 1">
          <i-menu-item :name="getRouteNameOrHref(item.children[0])" :key="index">
            <i-icon :size="rootIconSize" :type="item.children[0].icon || ''" />
            <span>{{ item.children[0].title }}</span>
          </i-menu-item>
        </template>
        <template v-else>
          <SideMenuItem
            v-if="showChildren(item)"
            :parent-item="item"
            :key="index"
            :icon-size="iconSize"
            :root-icon-size="rootIconSize"
          />
          <i-menu-item v-else :name="getRouteNameOrHref(item)" :key="index">
            <i-icon :size="rootIconSize" :type="item.icon || ''" />
            <span>{{ item.title }}</span>
          </i-menu-item>
        </template>
      </template>
    </i-menu>
    <!-- folded menu -->
    <div class="side-menu__menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="(item, index) in menuList">
        <CollapsedMenu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          hide-title
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          :key="index"
        />
        <i-tooltip
          transfer
          v-else
          :content="item.title || (item.children && item.children[0] && item.children[0].title)"
          placement="right"
          :key="index"
        >
          <a @click="handleSelect(getRouteNameOrHref(item))" class="side-menu__drop-menu-a">
            <i-icon
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </i-tooltip>
      </template>
    </div>
  </div>
</template>

<script>
import SideMenuItem from './SideMenuItem.vue'
import CollapsedMenu from './CollapsedMenu.vue'
import mixin from './mixin'

export default {
  name: 'SideMenu',

  mixins: [mixin],

  components: {
    SideMenuItem,
    CollapsedMenu
  },

  props: {
    menuList: {
      type: Array,
      default: () => []
    },

    collapsed: {
      type: Boolean,
      default: false
    },

    theme: {
      type: String,
      default: 'dark'
    },

    rootIconSize: {
      type: Number,
      default: 17
    },

    iconSize: {
      type: Number,
      default: 14
    },

    accordion: {
      type: Boolean,
      default: false
    },

    activeName: {
      type: String
    },

    openNames: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      openedNames: []
    }
  },

  computed: {
    textColor() {
      return this.theme === 'dark' ? '#fff' : '#495060'
    }
  },

  watch: {
    activeName(name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = this.getUnion(this.openedNames, this.getOpenedNamesByActiveName(name))
    },

    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },

  mounted() {
    this.openedNames = this.getOpenedNamesByActiveName(this.activeName)
  },

  methods: {
    handleSelect(name) {
      this.$emit('on-select', name)
    },

    handleSelectChange(name) {
      if (!this.accordion) this.openedNames = name
    },

    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },

    updateOpenName(name) {
      this.openedNames = this.getOpenedNamesByActiveName(name)
    },

    getUnion(arr1, arr2) {
      return Array.from(new Set([...arr1, ...arr2]))
    }
  }
}
</script>
<style lang="less">
.side-menu {
  user-select: none;

  &__menu-collapsed {
    padding-top: 10px;

    .ivu-dropdown {
      width: 100%;

      .ivu-dropdown-rel a {
        width: 100%;
      }
    }

    .ivu-tooltip {
      width: 100%;

      .ivu-tooltip-rel {
        width: 100%;
      }

      .ivu-tooltip-popper .ivu-tooltip-content {
        .ivu-tooltip-arrow {
          border-right-color: #fff;
        }

        .ivu-tooltip-inner {
          background: #fff;
          color: #495060;
        }
      }
    }
  }

  &__drop-menu-a {
    display: inline-block;
    padding: 14px 15px;
    width: 100%;
    text-align: center;
    color: #495060;
  }
}
</style>
