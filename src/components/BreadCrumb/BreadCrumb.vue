<template>
  <div class="bread-crumb">
    <i-breadcrumb :style="{ fontSize: `${fontSize}px` }">
      <i-breadcrumb-item v-for="(item, index) in breadCrumbList" :to="item.router" :key="index">
        <i-icon class="icon" v-if="showIcon" :type="item.icon || ''" />
        {{ item.name }}
      </i-breadcrumb-item>
    </i-breadcrumb>
  </div>
</template>

<script>
export default {
  name: 'BreadCrumb',

  props: {
    breadCrumbList: {
      type: Array,
      default: () => []
    },

    fontSize: {
      type: Number,
      default: 14
    },

    showIcon: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="less">
.bread-crumb {
  display: inline-block;
  vertical-align: top;

  .icon {
    margin-right: 4px;
  }
}
</style>
