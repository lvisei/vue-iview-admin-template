<script>
import { formatDate } from '../utils'
import FormItemWrap from './FormItemWrap'
import GridFormSelect from '../GridFormSelect'
import GridDynamicTable from '../GridDynamicTable'
import GridFormTable from '../GridFormTable'
// import GridFormPlot from './GridFormPlot'

const GridFormInput = (createElement, preview, model, schema) => {
  return createElement(
    FormItemWrap,
    { props: { preview, schema } },
    preview
      ? model[schema.field]
      : createElement('Input', {
          props: Object.assign({ value: model[schema.field] }, schema.props),
          on: { 'on-change': date => (model[schema.field] = date) }
        })
  )
}

const GridFormInputNumber = (createElement, preview, model, schema) => {
  return createElement(
    FormItemWrap,
    { props: { preview, schema } },
    preview
      ? model[schema.field]
      : createElement('InputNumber', {
          style: { width: '100%' },
          props: Object.assign({ value: model[schema.field] }, schema.props),
          on: { 'on-change': date => (model[schema.field] = date) }
        })
  )
}

const GridFormDatePicker = (createElement, preview, model, schema) => {
  return createElement(
    FormItemWrap,
    { props: { preview, schema } },
    preview
      ? model[schema.field]
      : createElement('DatePicker', {
          style: { width: '100%' },
          props: Object.assign({ value: model[schema.field] }, schema.props),
          on: {
            'on-change': date => (model[schema.field] = date),
            'hook:mounted': () => {
              if (schema.props.initDate) {
                const { format } = schema.props
                model[schema.field] = format ? formatDate(format) : formatDate('yyyy-MM-dd')
              }
            }
          }
        })
  )
}

const GridFormRadioGroup = (createElement, preview, model, schema) => {
  return createElement(
    FormItemWrap,
    { props: { preview, schema } },
    preview
      ? model[schema.field]
      : createElement(
          'RadioGroup',
          {
            style: { width: '100%' },
            props: Object.assign({ value: model[schema.field] }, schema.props),
            on: { 'on-change': date => (model[schema.field] = date) }
          },
          schema.options.map((option, index) => {
            createElement(
              'radio',
              { props: { key: index, label: option.label, disabled: option.disabled } },
              option.description || option.label
            )
          })
        )
  )
}

const GridFormCheckboxGroup = (createElement, preview, model, schema) => {
  return createElement(
    FormItemWrap,
    { props: { preview, schema } },
    preview
      ? model[schema.field]
      : createElement(
          'CheckboxGroup',
          {
            style: { width: '100%' },
            props: Object.assign({ value: model[schema.field] }, schema.props),
            on: { 'on-change': date => (model[schema.field] = date) }
          },
          schema.options.map((option, index) => {
            createElement('Checkbox', {
              props: { key: index, label: option.label, disabled: option.disabled }
            })
          })
        )
  )
}

export default {
  name: 'GridFormItem',

  components: {},

  props: {
    schema: Object,
    model: Object,
    preview: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  render: function(h) {
    const { model, schema, preview } = this
    const { type, className } = schema
    let formComponent
    if (type === 'text') {
      formComponent = GridFormInput(h, preview, model, schema)
    } else if (type === 'number') {
      formComponent = GridFormInputNumber(h, preview, model, schema)
    } else if (type === 'select') {
      formComponent = h(
        FormItemWrap,
        { props: { preview, schema } },
        h(GridFormSelect, { props: { preview, schema, model } })
      )
    } else if (type === 'date') {
      formComponent = GridFormDatePicker(h, preview, model, schema)
    } else if (type === 'radio') {
      formComponent = GridFormRadioGroup(h, preview, model, schema)
    } else if (type === 'checkbox') {
      formComponent = GridFormCheckboxGroup(h, preview, model, schema)
    } else if (type === 'annex') {
      // formComponent = FormItemWrap
    } else if (type === 'geoRange') {
      // formComponent = FormItemWrap
    } else if (type === 'formTable') {
      formComponent = GridFormTable
    } else if (type === 'dynamicTable') {
      formComponent = GridDynamicTable
    } else if (type === 'plotTable') {
      // formComponent = GridFormPlot
    }
    return h(formComponent, {
      class: className ? className : '',
      props: {
        model: model,
        schema: schema,
        preview: preview
        // preview: preview || schema.inherit
      },
      on: this.$listeners
    })
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {}
}
</script>
