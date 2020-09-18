<template>
  <i-table
    ref="table"
    class="plot-body-table"
    :columns="formatColumns"
    :data="formatTableList"
    no-data-text="无地块数据"
    v-bind="$attrs"
  >
    <template slot-scope="{ index }" slot="action">
      <i-form-item
        v-if="!preview"
        v-show="false"
        :prop="`${$attrs.field}.${index}.landRangeGeojson`"
        :rules="getLandRangeValidateRules()"
      />
      <i-button size="small" @click="handLandPlot(index)">
        {{ actionName || preview ? '定位' : '预览' }}
      </i-button>
      <i-button
        v-if="!preview && $attrs.dynamic"
        size="small"
        style="margin-top: 2px"
        @click="handDeleteLandPlot(index)"
      >
        删除
      </i-button>
    </template>
    <!-- <template v-if="preview && plotList.length" slot="footer">
      <div style="padding: 0 10px; ">
        <i-button type="primary" size="small" ghost long @click="handViewAllLand">
          预览全部地块
        </i-button>
      </div>
    </template> -->
  </i-table>
</template>

<script>
import { generateColumns, calculateFeaturesArea } from './helper'

export default {
  name: 'PlotBodyTable',

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
    preview: {
      type: Boolean,
      default: false
    },
    highlightRows: {
      type: Array,
      default: () => []
    },
    actionName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  computed: {
    formatColumns() {
      const columns = JSON.parse(JSON.stringify(this.columns))
      const model = this.plotList
      const preview = this.preview
      const field = this.$attrs.field

      const _columns = generateColumns(columns, field, model, preview)

      return Object.freeze(_columns)
    },

    formatTableList() {
      if (!this.highlightRows.length) return this.plotList
      const plotList = this.plotList.map((item, index) =>
        Object.assign({}, item, { _highlight: this.highlightRows.includes(index) })
      )
      return plotList
    }
  },

  watch: {},

  created() {},

  mounted() {
    const table = this.$refs.table
    const tableBody = table.$refs.body
    tableBody.addEventListener('scroll', this.handleBodyScroll)
    this.$once('hook:beforeDestroy', () =>
      tableBody.removeEventListener('scroll', this.handleBodyScroll)
    )
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    getLandRangeValidateRules() {
      const that = this
      return {
        validator(rule, value, callback) {
          if (value === '') {
            const verifyMessage = '请上传地块范围'
            callback(verifyMessage)
            that.$emit('on-verify-message', verifyMessage)
            // if (that.showMessage) return
            // that.showMessage = true
            // that.$Message.error({
            //   top: 200,
            //   duration: 5,
            //   content: `请上传地块范围 ！`,
            //   onClose() {
            //     that.showMessage = false
            //   }
            // })
          } else {
            callback()
          }
        }
      }
    },

    handLandPlot(index) {
      this.$emit('on-click-plot', { plot: this.plotList[index], index })
    },

    handDeleteLandPlot(index) {
      this.$emit('on-delete-plot', { plot: this.plotList[index], index })
    },

    handleBodyScroll(event) {
      this.$emit('on-body-scroll', event)
    }
  }
}
</script>

<style lang="less">
.plot-body-table {
  .ivu-form-item {
    margin-bottom: 0;

    .ivu-input {
      border: none;
      text-align: center;
    }

    .ivu-input-number {
      border: none;
    }

    .ivu-input-number-input {
      text-align: left;
    }
  }
}
</style>
