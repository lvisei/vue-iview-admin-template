<template>
  <Select
    ref="select"
    class="tree-select"
    v-bind="$attrs"
    @on-change="handleChange"
    :multiple="multiple"
  >
    <tree-select-tree-item
      :selectedArray="selectedArray"
      :data="treeData"
      :show-checkbox="multiple"
      :load-data="loadData"
      @on-clear="handleClear"
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
      type: [Array, String],
      default: ''
    },
    data: {
      type: Array,
      default: () => []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    loadData: Function,
    replaceFields: {
      type: Object,
      default: () => ({ children: 'children', key: 'id', value: 'id' })
    }
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
    },

    selectedArray() {
      return this.multiple ? this.value : this.value ? [this.value] : []
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
      const valueKey = this.replaceFields.value
      const value = this.multiple
        ? selectedArray.map(item => item[valueKey])
        : selectedArray.length
        ? selectedArray[0][valueKey]
        : ''
      this.$emit('input', value)
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
