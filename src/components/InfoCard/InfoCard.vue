<template>
  <i-card class="info-card" :padding="0">
    <div class="info-card__content-con">
      <div class="left-area" :style="{ background: color, width: leftWidth }">
        <i-icon class="icon" :type="icon" :size="iconSize" color="#fff" />
      </div>
      <div class="right-area" :style="{ width: rightWidth }">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </i-card>
</template>

<script>
export default {
  name: 'InforCard',

  props: {
    left: {
      type: Number,
      default: 35
    },
    color: {
      type: String,
      default: '#2d8cf0'
    },
    icon: {
      type: String,
      default: ''
    },
    iconSize: {
      type: Number,
      default: 20
    }
  },

  computed: {
    leftWidth() {
      return `${this.left}%`
    },

    rightWidth() {
      return `${100 - this.left}%`
    }
  }
}
</script>

<style lang="less">
.info-card {
  .common {
    float: left;
    height: 100%;
    display: table;
    text-align: center;
  }

  .size {
    width: 100%;
    height: 100%;
  }

  .middle-center {
    display: table-cell;
    vertical-align: middle;
  }

  .size;
  overflow: hidden;

  .ivu-card-body {
    .size;
  }

  &__content-con {
    .size;
    position: relative;

    .left-area {
      .common;
      & > .icon {
        .middle-center;
      }
    }

    .right-area {
      .common;

      & > div {
        .middle-center;
      }
    }
  }
}
</style>
