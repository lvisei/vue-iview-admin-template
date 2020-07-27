<template>
  <div class="global-header">
    <svg-icon icon-class="menu-fold" :class-name="rotateIcon" @click.native="toggleCollapse" />
    <div class="global-header__custom-content">
      <Fullscreen v-model="isFullscreen" />
      <HeaderUser />
    </div>
  </div>
</template>

<script>
import HeaderUser from './HeaderUser'
import Fullscreen from '@/components/Fullscreen'

export default {
  name: 'GlobalHeader',

  components: {
    HeaderUser,
    Fullscreen
  },

  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      isFullscreen: false
    }
  },

  computed: {
    rotateIcon() {
      return this.isCollapsed
        ? 'global-header__menu-icon global-header__menu-icon_rotate'
        : 'global-header__menu-icon'
    }
  },

  watch: {},

  created() {},

  mounted() {},

  methods: {
    toggleCollapse() {
      this.$emit('toggleCollapse')
    }
  }
}
</script>

<style lang="less">
.global-header {
  display: flex;
  align-items: center;

  &__menu-icon {
    transition: all 0.3s;
    margin-right: 30px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #1890ff;
    }

    &_rotate {
      transform: rotate(-180deg);
    }
  }

  &__custom-content {
    display: flex;
    margin-left: auto;
    height: 100%;

    & > * {
      margin-right: 20px;
    }
  }
}
</style>
