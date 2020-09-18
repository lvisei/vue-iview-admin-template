<template>
  <div class="plot-table">
    <i-alert
      v-show="showVerifyMessage"
      class="plot-table__alert"
      banner
      type="warning"
      show-icon
      closable
    >
      {{ verifyMessage }}
    </i-alert>
    <BodyTable
      ref="plotTable"
      :columns="columns"
      :plot-list="plotList"
      :preview="preview"
      :max-height="maxHeight"
      :highlight-rows="highlightRows"
      :span-method="spanMethod"
      v-bind="$attrs"
      @on-verify-message="onVerifyMessage"
      @on-click-plot="handClickLandPlot"
      @on-delete-plot="handDeleteLandPlot"
      @on-body-scroll="handlePlotTableBodyScroll"
    />
    <SumTable
      v-if="['plan', 'design', 'completion'].includes(classification) && plotList.length"
      :class="['plot-table__sum-table', preview ? '' : 'plot-table__sum-table_medium']"
      ref="sumTable"
      :columns="columns"
      :plot-list="plotList"
      :classification="classification"
      :max-height="maxHeight"
      :size="$attrs.size"
      :border="$attrs.border"
    />
  </div>
</template>

<script>
import BodyTable from './BodyTable'
import SumTable from './SumTable'

export default {
  name: 'PlotTable',

  components: { BodyTable, SumTable },

  props: {
    columns: {
      type: Array,
      default: () => []
    },
    plotList: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: false
    },
    highlightRows: {
      type: Array,
      default: () => []
    },
    maxHeight: {
      type: String,
      default: ''
    },
    classification: String
  },

  data() {
    return {
      verifyMessage: false,
      showVerifyMessage: ''
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    spanMethod({ row, column, rowIndex, columnIndex }) {
      const { classification, plotList } = this
      const length = plotList.length

      if (length && (classification === 'design' || classification === 'completion')) {
        // "fixed": "left" or "right",
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
    },

    handlePlotTableBodyScroll(event) {
      const { scrollLeft } = event.target
      if (this.plotList.length && this.$refs.sumTable) {
        this.$refs.sumTable.$refs.table.$refs.body.scrollLeft = scrollLeft
      }
    },

    onVerifyMessage(verifyMessage) {
      if (this.showVerifyMessage) return
      this.verifyMessage = verifyMessage
      this.showVerifyMessage = true
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
      }
      this.timer = setTimeout(() => {
        this.showVerifyMessage = false
        this.timer = null
      }, 3000)
    },

    handClickLandPlot(data) {
      this.$emit('on-click-plot', data)
    },

    handDeleteLandPlot(data) {
      this.$emit('on-delete-plot', data)
    }
  }
}
</script>

<style lang="less">
.plot-table {
  &__sum-table_medium {
    .ivu-table-small {
      font-size: 14px;
    }
  }

  &__alert {
    margin-bottom: 0;
  }
}
</style>
