<template>
  <div class="global-header">
    <svg-icon icon-class="menu-fold" :class-name="rotateIcon" @click.native="toggleCollapse" />
    <div class="custom-content-con">
      <header-user />
      <fullscreen v-model="isFullscreen" />
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
      return this.isCollapsed ? 'menu-icon rotate-icon' : 'menu-icon'
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
  .menu-icon {
    transition: all 0.3s;
    margin-right: 30px;
    cursor: pointer;
    font-size: 20px;

    &:hover {
      color: #1890ff;
    }
  }

  .rotate-icon {
    transform: rotate(-180deg);
  }

  .custom-content-con {
    float: right;
    height: 100%;
    line-height: 64px;

    & > * {
      float: right;
      margin-right: 20px;
    }
  }
}
</style>
