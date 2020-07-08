<template>
  <Tree
    :data="data"
    :show-checkbox="showCheckbox"
    :load-data="loadDataCallback"
    :children-key="parent.replaceFields.children"
    v-on="parent.$listeners"
    v-bind="parent.$attrs"
    @on-select-change="handleSelect"
    @on-check-change="handleCheckSelect"
  ></Tree>
</template>

<script>
import Emitter from 'view-design/src/mixins/emitter.js'

const arrayEqual = (arr1, arr2) => {
  // 判断数组的长度
  if (arr1.length !== arr2.length) {
    return false
  } else {
    // 循环遍历数组的值进行比较
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false
      }
    }
    return true
  }
}

export default {
  name: 'TreeSelectTree',

  mixins: [Emitter],

  props: {
    data: {
      type: Array,
      default: () => []
    },
    selectedArray: {
      type: Array,
      default: () => []
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    loadData: Function
  },

  data() {
    return {
      flatDic: {},
      checkedArray: []
    }
  },

  inject: ['parent'],

  computed: {
    expandAll() {
      return this.parent.$attrs['expand-all']
    }
  },

  watch: {
    data(newData, oldVal) {
      this.updateFlagDic(newData)
      let selectArray = []
      this.selectedArray.forEach(id => {
        if (id in this.flatDic) selectArray.push(id)
      })
      this.$emit(
        'on-check',
        selectArray.map(id => this.flatDic[id])
      )
      if (this.expandAll) this.checkData(newData, false, true)
    },

    selectedArray(newVal, oldVal) {
      if (arrayEqual(newVal, oldVal)) return
      const filtedNewVal = newVal.filter(id => id in this.flatDic)
      this.$emit(
        'on-check',
        filtedNewVal.map(id => this.flatDic[id])
      )
      this.$emit('on-clear')
      this.$nextTick(() => {
        this.checkData(this.data, true)
      })
    }
  },

  methods: {
    checkEmit(value, label) {
      this.dispatch('iSelect', 'on-select-selected', {
        value,
        label
      })
      this.$emit('on-select-selected', {
        value,
        label
      })
    },

    updateFlagDic(newData) {
      let newFlagDic = {}
      const key = this.parent.replaceFields.key
      this.setFlagDic(newData, item => {
        newFlagDic[item[key]] = item
      })
      this.flatDic = newFlagDic
    },

    setFlagDic(data, callback) {
      const { children } = this.parent.replaceFields
      data.forEach(item => {
        if (item[children] && item[children].length) {
          this.setFlagDic(item[children], callback)
        }
        callback(item)
      })
    },

    handleSelect(selectArray, selectItem) {
      this.$emit('on-check', selectArray)
      this.parent.$emit('on-change', { selectArray, selectItem })
    },

    handleCheckSelect(selectArray, selectItem) {
      this.$emit('on-check', selectArray)
      this.parent.$emit('on-change', { selectArray, selectItem })
    },

    checkData(data, emit, expandAll) {
      const { key, children } = this.parent.replaceFields
      data.forEach(item => {
        if (this.selectedArray.includes(item[key])) {
          this.$set(item, this.showCheckbox ? 'checked' : 'selected', true)
          this.checkedArray.push(item)
          if (emit) this.checkEmit(item[key], item.title)
        } else this.$set(item, this.showCheckbox ? 'checked' : 'selected', false)
        if (item[children] && item[children].length) {
          if (this.expandAll && expandAll) this.$set(item, 'expand', true)
          this.checkData(item[children], emit, expandAll)
        }
      })
    },

    loadDataCallback(item, callback) {
      this.loadData(item, data => {
        return (() => {
          callback(data)
          this.updateFlagDic(this.data)
        })(data)
      })
    }
  },

  mounted() {
    this.checkData(this.data, false, true)
    this.$nextTick(() => {
      this.$emit('on-check', this.checkedArray)
    })
  }
}
</script>

<style>
.ivu-tree-title {
  width: 95%;
}
</style>
