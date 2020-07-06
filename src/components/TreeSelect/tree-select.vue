<template>
  <Select
    ref="select"
    class="tree-select"
    v-bind="$attrs"
    @on-change="handleChange"
    :multiple="multiple"
  >
    <tree-select-tree-item
      :selectedArray="value"
      :data="treeData"
      @on-clear="handleClear"
      :load-data="loadData"
      @on-check="handleTreeCheck"
    ></tree-select-tree-item>
  </Select>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter'
import TreeSelectTreeItem from './tree-select-tree'

export default {
  name: 'TreeSelect',

  mixins: [Emitter],

  components: {
    TreeSelectTreeItem
  },

  props: {
    value: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    loadData: Function
  },

  data() {
    return {
      isChangedByTree: true,
      isInit: true
    }
  },

  computed: {
    treeData() {
      return JSON.parse(JSON.stringify(this.data))
    }
  },

  provide() {
    return {
      parent: this
    }
  },

  methods: {
    handleChange(selected) {
      if (!this.isChangedByTree) this.$emit('input', selected)
      this.isChangedByTree = false
    },
    handleTreeCheck(selectedArray) {
      this.isChangedByTree = true
      this.$emit(
        'input',
        selectedArray.map(item => item.id)
      )
    },
    handleClear() {
      this.$refs.select.reset()
    }
  }
}
</script>

<style lang="less">
.tree-select {
  .ivu-select-dropdown {
    padding: 0 6px;
  }
}
</style>
