<script>
import { formatDate } from '../utils'
import FormItemWrap from './FormItemWrap'
import GridFormSelect from './FormSelect'
import GridDynamicTable from '../GridDynamicTable'
import GridFormTable from '../GridFormTable'
// import GridFormPlot from './GridFormPlot'

const GridFormInput = {
  name: 'GridFormInput',
  props: ['preview', 'model', 'schema'],
  render(createElement) {
    return createElement(
      FormItemWrap,
      { props: { preview: this.preview, schema: this.schema } },
      this.preview
        ? this.model[this.schema.field]
        : [
            createElement('Input', {
              props: Object.assign({ value: this.model[this.schema.field] }, this.schema.props),
              on: { input: data => (this.model[this.schema.field] = data) }
            })
          ]
    )
  }
}

const GridFormInputNumber = {
  name: 'GridFormInputNumber',
  props: ['preview', 'model', 'schema'],
  render(createElement) {
    return createElement(
      FormItemWrap,
      { props: { preview: this.preview, schema: this.schema } },
      this.preview
        ? this.model[this.schema.field]
        : [
            createElement('InputNumber', {
              style: { width: '100%' },
              props: Object.assign({ value: this.model[this.schema.field] }, this.schema.props),
              on: { 'on-change': date => (this.model[this.schema.field] = date) }
            })
          ]
    )
  }
}

const GridFormDatePicker = {
  name: 'GridFormDatePicker',
  props: ['preview', 'model', 'schema'],
  render(createElement) {
    return createElement(
      FormItemWrap,
      { props: { preview: this.preview, schema: this.schema } },
      this.preview
        ? this.model[this.schema.field]
        : [
            createElement('DatePicker', {
              style: { width: '100%' },
              props: Object.assign({ value: this.model[this.schema.field] }, this.schema.props),
              on: {
                'on-change': date => (this.model[this.schema.field] = date),
                'hook:mounted': () => {
                  if (this.schema.props.initDate) {
                    const { format } = this.schema.props
                    this.model[this.schema.field] = format
                      ? formatDate(format)
                      : formatDate('yyyy-MM-dd')
                  }
                }
              }
            })
          ]
    )
  }
}

const GridFormRadioGroup = {
  name: 'GridFormRadioGroup',
  props: ['preview', 'model', 'schema'],
  render(createElement) {
    return createElement(
      FormItemWrap,
      { props: { preview: this.preview, schema: this.schema } },
      this.preview
        ? this.model[this.schema.field]
        : [
            createElement(
              'RadioGroup',
              {
                style: { width: '100%' },
                props: Object.assign({ value: this.model[this.schema.field] }, this.schema.props),
                on: { 'on-change': date => (this.model[this.schema.field] = date) }
              },
              this.schema.options.map((option, index) => {
                return createElement(
                  'Radio',
                  { props: { key: index, label: option.label, disabled: option.disabled } },
                  option.description || option.label
                )
              })
            )
          ]
    )
  }
}

const GridFormCheckboxGroup = {
  name: 'GridFormCheckboxGroup',
  props: ['preview', 'model', 'schema'],
  render(createElement) {
    return createElement(
      FormItemWrap,
      { props: { preview: this.preview, schema: this.schema } },
      this.preview
        ? this.model[this.schema.field]
        : [
            createElement(
              'CheckboxGroup',
              {
                style: { width: '100%' },
                props: Object.assign({ value: this.model[this.schema.field] }, this.schema.props),
                on: { 'on-change': date => (this.model[this.schema.field] = date) }
              },
              this.schema.options.map((option, index) => {
                return createElement('Checkbox', {
                  props: { key: index, label: option.label, disabled: option.disabled }
                })
              })
            )
          ]
    )
  }
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
      formComponent = GridFormInput
    } else if (type === 'number') {
      formComponent = GridFormInputNumber
    } else if (type === 'select') {
      formComponent = GridFormSelect
    } else if (type === 'date') {
      formComponent = GridFormDatePicker
    } else if (type === 'radio') {
      formComponent = GridFormRadioGroup
    } else if (type === 'checkbox') {
      formComponent = GridFormCheckboxGroup
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
