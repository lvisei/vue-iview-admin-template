<template>
  <div class="pane">
    <div class="pane__header">
      <slot name="title">
        <span>{{ title }}</span>
      </slot>
    </div>
    <div class="pane__extra" v-if="showExtra">
      <slot name="extra">
        <svg
          class="icon-svg-close"
          viewBox="0 0 1024 1024"
          width="15"
          height="15"
          @click.stop="handClose"
        >
          <path
            d="M806.4 172.8l-633.6 633.6c-12.8 12.8-12.8 32 0 44.8 12.8 12.8 32 12.8 44.8 0l633.6-633.6c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0z"
            fill="#333333"
            p-id="2795"
          ></path>
          <path
            d="M172.8 172.8c-12.8 12.8-12.8 32 0 44.8l633.6 633.6c12.8 12.8 32 12.8 44.8 0 12.8-12.8 12.8-32 0-44.8L217.6 172.8c-12.8-12.8-32-12.8-44.8 0z"
            fill="#333333"
            p-id="2796"
          ></path>
        </svg>
      </slot>
    </div>
    <div class="pane__body" :style="bodyStyles">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pane',

  components: {},

  filters: {},

  props: {
    title: {
      type: String
    },
    showExtra: {
      type: Boolean,
      default: true
    },
    padding: {
      type: String,
      default: '16px'
    }
  },

  data() {
    return {}
  },

  computed: {
    bodyStyles() {
      return {
        padding: this.padding
      }
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
    handClose() {
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less">
.pane {
  border: 1px solid #e6e6e6;
  background: #fff;
  font-size: 14px;
  position: relative;
  transition: all 0.2s ease-in-out;

  &__header {
    background-color: #f8f8f8;
    border-bottom: 1px solid #e8eaec;
    padding: 10px 10px;
    line-height: 1;
    font-weight: 550;
  }

  &__extra {
    position: absolute;
    right: 12px;
    top: 4px;
    padding: 5px 5px 0;
    .icon-svg-close {
      cursor: pointer;
    }
  }

  &__body {
    background-color: #fff;
  }
}
</style>
