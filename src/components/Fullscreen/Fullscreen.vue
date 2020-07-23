<template>
  <div v-if="showFullScreenBtn" class="full-screen">
    <i-tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <i-icon
        class="full-screen__icon"
        :type="value ? 'ios-contract' : 'ios-expand'"
        :size="23"
        @click.native="handleChange"
      />
    </i-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Fullscreen',

  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf('MSIE') < 0
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  mounted() {
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen
    isFullscreen = !!isFullscreen
    document.addEventListener('fullscreenchange', this.handFullscreenchange, false)
    document.addEventListener('mozfullscreenchange', this.handFullscreenchange, false)
    document.addEventListener('webkitfullscreenchange', this.handFullscreenchange, false)
    document.addEventListener('msfullscreenchange', this.handFullscreenchange, false)
    this.$emit('input', isFullscreen)
  },

  destroyed() {
    document.removeEventListener('fullscreenchange', this.handFullscreenchange, false)
    document.removeEventListener('mozfullscreenchange', this.handFullscreenchange, false)
    document.removeEventListener('webkitfullscreenchange', this.handFullscreenchange, false)
    document.removeEventListener('msfullscreenchange', this.handFullscreenchange, false)
  },

  methods: {
    handleFullscreen() {
      let main = document.body
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen()
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen()
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen()
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen()
        }
      }
    },

    handleChange() {
      this.handleFullscreen()
    },

    handFullscreenchange() {
      this.$emit('input', !this.value)
      this.$emit('on-change', !this.value)
    }
  }
}
</script>

<style lang="less">
.full-screen {
  &__icon.ivu-icon {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
