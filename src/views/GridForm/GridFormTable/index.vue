<template>
  <div class="grid-form-table">
    <i-table
      :class="['grid-form-table__table']"
      :columns="columns"
      :data="model[schema.field]"
      v-bind="schema.props"
      :span-method="schema.spans && spanMethod"
      :summary-method="schema.props.showSummary && summaryMethod"
    ></i-table>
  </div>
</template>

<script>
export default {
  name: 'GridFormTable',

  components: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean
  },

  data() {
    return {}
  },

  computed: {
    columns() {
      const { columns, field, props } = this.schema
      const model = this.model
      const { size } = props
      const _columns = this.generateColumns(columns, field, model, size)

      return Object.freeze(_columns)
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
    generateColumns(columns, field, model, size) {
      const _columns = columns.map(column => {
        const isCustomize = column.customize
        const isCustomizeHeader = column.customizeHeader
        const hasChild = column.children

        if (hasChild) {
          column.children = this.generateColumns(column.children, field, model, size)
        }

        if (isCustomize) {
          column.render = this.preview ? null : this.getColumnRender(model, field, column, size)
        }

        if (isCustomizeHeader) {
          column.renderHeader = this.getColumnHeaderRender(column)
        }

        // delete column.customize
        return column
      })

      return _columns
    },

    getColumnHeaderRender(column) {
      const { title, customizeHeader, customize } = column
      const isRequired =
        customize &&
        customize.validate &&
        customize.validate.find(({ required }) => required === true)
      const { align } = customizeHeader
      const render = (h, { column, index }) => {
        return isRequired
          ? h('span', {}, [
              h('span', { style: { color: 'red', fontSize: '14px' } }, ' * '),
              h('span', {}, title)
            ])
          : h('span', {}, title)
      }

      return render
    },

    getColumnRender(model, field, column, size = 'default') {
      const { key, customize } = column
      const { type, props, validate, keys } = customize
      const _model = model[field]
      const render = (h, { row, column, index }) => {
        const { _type: dataType, _range: dataRange, _keys: dataKeys } = row
        let _row = _model[index]
        let temp = 0
        return h(
          'FormItem',
          {
            props: {
              label: '',
              prop: `${field}.${index}.${key}`,
              rules: validate,
              labelwidth: 0
            }
          },
          dataType === 'sub-sum'
            ? [
                h('p', [
                  (_row[key] = this.formatNumberAccuracy(
                    dataRange.map(index => _model[index][key]).reduce((a, b) => a + b)
                  ))
                ])
              ]
            : [
                type === 'number'
                  ? h('InputNumber', {
                      props: { ...props, value: row[key], size },
                      style: { width: '100%' },
                      on: { input: val => (_row[key] = val) }
                    })
                  : type === 'text'
                  ? h('Input', {
                      props: { ...props, value: row[key], size },
                      on: { input: val => (_row[key] = val.trim()) }
                    })
                  : type === 'sum-number'
                  ? h('p', [
                      (_row[key] = this.formatNumberAccuracy(
                        keys.map(key => _row[key]).reduce((a, b) => a + b)
                      ))
                    ])
                  : type === 'subtract-number'
                  ? h('p', [
                      (_row[key] = this.formatNumberAccuracy(
                        keys.map(key => _row[key]).reduce((a, b) => a - b)
                      ))
                    ])
                  : h('p')
              ]
        )
      }

      return render
    },

    spanMethod({ row, column, rowIndex, columnIndex }) {
      const { spans } = this.schema
      if (spans.length) {
        for (let index = 0; index < spans.length; index++) {
          const { rowIndex: _rowIndex, columnIndex: _columnIndex, rowspan, colspan } = spans[index]
          if (rowIndex === _rowIndex && columnIndex === _columnIndex) {
            return [rowspan, colspan]
          }
        }
      }
    },

    summaryMethod({ columns, data }) {
      // const { suffix } = this.schema
      const sums = {}
      columns.forEach((column, index) => {
        const key = column.key
        if (index === 0) {
          sums[key] = {
            key,
            value: '合计'
          }
          return
        }
        const values = data.filter(item => item._type !== 'sub-sum').map(item => Number(item[key]))
        if (!values.every(value => isNaN(value))) {
          const v = values.reduce((prev, curr) => {
            const value = Number(curr)
            if (!isNaN(value)) {
              return prev + curr
            } else {
              return prev
            }
          }, 0)
          sums[key] = {
            key,
            value: this.formatNumberAccuracy(v)
            // value: v + ' ' + suffix
          }
        } else {
          sums[key] = {
            key,
            value: ''
          }
        }
      })

      return sums
    },

    formatNumberAccuracy(number, length = 4) {
      return Number.isInteger(number) ? number : Number(number.toFixed(4))
    }
  }
}
</script>

<style lang="less">
.grid-form-table {
  position: relative;

  &__table {
    .ivu-table th:not(:last-child),
    .ivu-table td:not(:last-child) {
      border-right: 1px solid #e8eaec;
    }

    .ivu-table:before {
      height: 0;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }

    .ivu-table-header .header-border-right-none {
      border-right: none !important;

      &.ivu-table-column-center {
        text-align: right;
      }

      .ivu-table-cell {
        padding-right: 0px;
        // margin-right: -10px;
      }
    }

    .ivu-table-summary .header-border-right-none {
      border-right: none !important;

      &.ivu-table-column-center {
        text-align: right;
      }

      .ivu-table-cell {
        padding-right: 0px;
        margin-right: -10px;
      }
    }
  }

  &__suffix {
    position: absolute;
    top: -25px;
    right: 0;
  }
}
</style>
