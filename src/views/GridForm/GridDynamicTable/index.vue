<template>
  <div class="grid-dynamic-table">
    <i-table
      :class="['grid-dynamic-table__table']"
      :columns="columns"
      :data="model[schema.field]"
      v-bind="schema.props"
    >
      <template v-if="!preview" slot-scope="{ index }" slot="action">
        <i-button
          :disabled="index === 0"
          size="small"
          type="dashed"
          @click="model[schema.field].splice(index, 1)"
        >
          删除
        </i-button>
      </template>
    </i-table>
    <div v-if="!preview" class="grid-dynamic-table__tools">
      <i-button
        class="grid-dynamic-table__tools-add"
        type="dashed"
        size="small"
        icon="md-add"
        long
        @click="model[schema.field].push(JSON.parse(JSON.stringify(schema.defaultData)))"
      >
        {{ schema.props.addName ? schema.props.addName : '新增' }}
      </i-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GridDynamicTable',

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

      const __columns = this.preview
        ? _columns
        : _columns.concat({
            title: '操作',
            align: 'center',
            slot: 'action',
            width: 100
          })

      return Object.freeze(__columns)
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
      const { type, props, validate } = customize
      const _model = model[field]
      const render = (h, { row, index }) => {
        let _row = _model[index]
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
          [
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
              : h('p')
          ]
        )
      }

      return render
    },

    handDelete(index) {
      this.model[this.schema.field].splice(index, 1)
    }
  }
}
</script>

<style lang="less">
.grid-dynamic-table {
  &__table {
    .ivu-table th:not(:last-child),
    .ivu-table td:not(:last-child) {
      border-right: 1px solid #e8eaec;
    }

    .ivu-table:before {
      height: 0;
    }
  }

  &__tools {
    padding: 0 10px;
  }

  &__tools-add {
    margin: 10px 0;
  }

  .ivu-form-item {
    margin-bottom: 0;
  }
}
</style>
