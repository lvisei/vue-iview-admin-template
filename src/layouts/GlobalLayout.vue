<template>
  <i-layout class="global-layout">
    <i-sider
      collapsible
      class="global-layout__sider"
      hide-trigger
      :width="256"
      :collapsed-width="64"
      v-model="isCollapsed"
    >
      <SideMenu
        theme="dark"
        :accordion="true"
        :active-name="$route.name"
        :collapsed="isCollapsed"
        @on-select="turnToPage"
        :menu-list="menuList"
      >
        <div class="global-layout__logo layout-logo">
          <router-link to="/">
            <img class="layout-logo__img" src="~@/assets/images/logo.png" />
            <h1 v-show="!isCollapsed" class="layout-logo__title">{{ shortSiteName }}</h1>
          </router-link>
        </div>
      </SideMenu>
    </i-sider>
    <i-layout
      :class="[
        'global-layout__containers',
        this.isCollapsed ? 'global-layout__containers_expand-width' : ''
      ]"
    >
      <i-header
        :class="[
          'global-layout__header',
          this.isCollapsed ? 'global-layout__header_expand-width' : ''
        ]"
      >
        <GlobalHeader :is-collapsed="isCollapsed" @toggleCollapse="toggleCollapse" />
      </i-header>
      <i-content class="global-layout__content">
        <slot></slot>
      </i-content>
      <i-footer class="global-layout__footer">
        <GlobalFooter :copyright="copyright" />
      </i-footer>
    </i-layout>
  </i-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import { shortSiteName, copyright } from '@/config'
import SideMenu from '@/components/SideMenu'
import GlobalHeader from './GlobalHeader'
import GlobalFooter from './GlobalFooter'
import { getMenuList } from '@/helpers/router'

export default {
  name: 'GlobalLayout',

  components: {
    SideMenu,
    GlobalHeader,
    GlobalFooter
  },

  filters: {},

  props: {},

  data() {
    return {
      isCollapsed: false,
      shortSiteName: shortSiteName,
      copyright: copyright
    }
  },

  computed: {
    ...mapGetters(['routes']),

    menuList() {
      const routes = this.routes
      const menuList = getMenuList(routes)
      return menuList
    }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed
    },

    turnToPage(routeName) {
      let isLink = routeName.indexOf('isTurnByHref_') !== -1
      if (isLink) {
        window.open(routeName.split('_')[1])
        return
      }
      this.$router.push({ name: routeName })
    }
  }
}
</script>

<style lang="less">
.global-layout {
  &__sider {
    &.ivu-layout-sider {
      position: fixed;
      min-height: 100vh;
      box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
      z-index: 9;
    }
  }

  &__logo {
    height: 64px;
    line-height: 64px;
    text-align: center;
  }

  &__containers {
    min-height: 100vh;
    padding-left: 256px;

    &_expand-width {
      padding-left: 64px;
    }
  }

  &__header {
    width: 100%;
    position: fixed;
    top: 0;
    right: 0;
    width: calc(100% - 256px);
    z-index: 1024;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    transition: width 0.2s ease-in-out;

    &_expand-width {
      width: calc(100% - 64px);
    }
  }

  &__content {
    margin: 88px 24px 0px;
    display: flex;
    flex-direction: column;
  }

  &__footer {
    text-align: center;
  }
}

.layout-logo {
  &__title {
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 19px;
    font-weight: 600;
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: middle;
    text-transform: uppercase;
    color: #1890ff;
  }

  &__img {
    height: 34px;
    vertical-align: middle;
  }
}
</style>
