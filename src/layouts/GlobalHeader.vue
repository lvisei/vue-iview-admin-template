<template>
  <div class="global-header">
    <i-icon
      @click.native="toggleCollapse"
      :class="rotateIcon"
      custom="iconfont icon-menu-fold"
      size="24"
    />
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
      return ['menu-icon', this.isCollapsed ? 'rotate-icon' : '']
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
