<template>
  <i-table
    ref="table"
    class="plot-sum-table"
    :show-header="false"
    :columns="formatColumns"
    :data="tableData"
    :span-method="spanMethod"
    :style="{ paddingRight: scrollBarWidth + 'px' }"
    v-bind="$attrs"
  >
    <template slot="action">
      <p>\</p>
    </template>
  </i-table>
</template>

<script>
import { getScrollBarSize, formatNumberAccuracy } from './helper'

export default {
  name: 'PlotSumTable',

  components: {},

  filters: {},

  props: {
    columns: {
      type: Array,
      default: () => []
    },
    plotList: {
      type: Array,
      default: () => []
    },
    classification: String,
    maxHeight: [String, Number]
  },

  data() {
    return {
      scrollBarWidth: getScrollBarSize()
    }
  },

  computed: {
    formatColumns() {
      const { columns, classification } = this
      const start_column = {
        key: 'allSum',
        title: '合计',
        fixed: 'left',
        align: 'center',
        width: 300
      }

      if (['plan', 'design', 'completion'].includes(classification)) {
        const { showVerticalScrollBar, scrollBarWidth } = this
        start_column.width = columns
          .filter(({ fixed }) => fixed === 'left')
          .reduce(({ width: preWidth }, { width: nextWidth }) => preWidth + nextWidth)
        const center_columns = columns.filter(({ fixed }) => fixed !== 'left' && fixed !== 'right')
        const end_columns = columns
          .filter(({ fixed }) => fixed === 'right')
          .map(item => {
            if ('action' === item.slot) {
              // verticalScrollBar width
              return showVerticalScrollBar
                ? Object.assign({}, item, { width: item.width + scrollBarWidth })
                : item
            } else {
              return item
            }
          })
        const _columns = [start_column].concat(center_columns).concat(end_columns)
        return _columns
      } else {
        return []
      }
    },

    tableData() {
      const { columns, plotList, classification } = this
      if (!plotList.length) return []

      const data = this.generateTableData(columns, plotList, classification)
      return data
    },

    showVerticalScrollBar() {
      if (!this.plotList.length || !this.maxHeight) {
        return false
      }
      const showVerticalScrollBar =
        Number(this.maxHeight) - 72 - this.scrollBarWidth < this.plotList.length * 40

      return showVerticalScrollBar
    }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    generateTableData(columns, plotList, classification) {
      if (classification === 'plan') {
        const sums = { allSum: '合计' }
        columns
          .filter(({ fixed }) => fixed !== 'left' && fixed !== 'right')
          .forEach(column => {
            const { key, children, slot } = column
            if (children) {
              children.forEach(column => {
                const { key } = column
                sums[key] = this.calculateColumnSum(plotList, key)
              })
              return
            }

            if (slot) return

            sums[key] = this.calculateColumnSum(plotList, key)
          })

        return [sums]
      } else if (['design', 'completion'].includes(classification)) {
        const evenPlotList = plotList.filter((_, index) => index % 2 === 0)
        const oddPlotList = plotList.filter((_, index) => index % 2 !== 0)
        const preSum = { allSum: '合计', landCategory: '复垦前', remark: '\\' }
        const nextSum = {
          allSum: '合计',
          landCategory: classification === 'design' ? '拟复垦' : '复垦后',
          remark: '\\'
        }
        columns
          .filter(
            ({ fixed, key }) => fixed !== 'left' && fixed !== 'right' && key !== 'landCategory'
          )
          .forEach(column => {
            const { key, children, slot, fixed } = column
            if (children) {
              children.forEach(column => {
                const { key } = column
                preSum[key] = this.calculateColumnSum(evenPlotList, key)
                nextSum[key] = this.calculateColumnSum(oddPlotList, key)
              })
              return
            }

            if (slot) return

            preSum[key] = this.calculateColumnSum(evenPlotList, key)
            nextSum[key] = this.calculateColumnSum(oddPlotList, key)
          })
        return [preSum, nextSum]
      }
      return []
    },

    calculateColumnSum(plotList, key) {
      const values = plotList.map(item => Number(item[key]))

      if (values.some(item => item === 9999999)) {
        return '\\'
      }

      const v = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          return prev + curr
        } else {
          return prev
        }
      }, 0)
      return formatNumberAccuracy(v)
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      const { classification } = this

      if (classification === 'design' || classification === 'completion') {
        if (rowIndex % 2 === 0 && ['left', 'right'].includes(column.fixed)) {
          return {
            rowspan: 2,
            colspan: 1
          }
        } else if (rowIndex % 2 !== 0 && ['left', 'right'].includes(column.fixed)) {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    }
  }
}
</script>

<style lang="less">
.plot-sum-table {
  .ivu-table-overflowX {
    overflow: hidden;
  }
}
</style>
