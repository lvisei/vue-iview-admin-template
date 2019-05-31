<template>
  <div class="layer-tree">
    <div class="layer-tree__header">
      <div class="layer-tree__header-title">
        <!-- TODO: -->
        <!-- <span class="layer-tree__switcher layer-tree__switcher-level-root layer-tree__switcher-open"></span> -->
        <span>
          <slot name="header-title" :title="data.title">{{ data.title }}</slot>
        </span>
      </div>
      <div class="layer-tree__header-tool">
        <!-- slot header-tool -->
        <slot name="header-tool"></slot>
      </div>
    </div>
    <ul class="layer-tree__body">
      <li class="layer-tree__item" v-for="(layer, index) in data.children" :key="index">
        <div class="layer-tree__item-caption">
          <!-- TODO: -->
          <!-- <span
            class="layer-tree__switcher layer-tree__switcher-level-second-close layer-tree__switcher-open"
          ></span>-->
          <span class="layer-tree__caption-box">
            <!-- slot item-prefix -->
            <slot name="item-prefix" :index="index"></slot>
          </span>
          <!-- TODO: long name -->
          <span class="layer-tree__caption-title">{{ layer.name }}</span>
        </div>
        <div class="layer-tree__item-tool">
          <!-- slot item-tool -->
          <slot name="item-tool" :index="index"></slot>
        </div>
      </li>
      <slot />
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LayerTree',

  components: {},

  filters: {},

  props: {
    data: {
      type: Object,
      required: true
    },
    defaultExpand: {
      type: Boolean,
      defalut: true
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {}
}
</script>

<style lang="less">
.layer-tree {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 0;
    &-title {
      font-size: 13px;
      font-weight: 400;
      cursor: pointer;
    }
  }

  &__body {
    font-size: 12px;
    padding-left: 20px;
  }

  &__item {
    display: flex;
    word-break: break-all;
    justify-content: space-between;
    align-items: center;
    padding: 3px 0;
  }

  &__item-caption {
    display: flex;
    align-items: center;
  }

  &__item-tool {
    display: flex;
    align-items: center;
  }
}
</style>
