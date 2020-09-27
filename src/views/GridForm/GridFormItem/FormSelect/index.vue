<template>
  <FormItemWrap :preview="preview" :schema="schema">
    <template v-if="preview">
      {{
        schema.options.length
          ? schema.options.find(({ value }) => value === model[schema.field]).label
          : model[schema.field]
      }}
    </template>
    <i-select
      v-else
      v-model="model[schema.field]"
      v-bind="schema.props"
      :loading="selectLoading"
      @on-create="onCreate"
      @on-open-change="onSelectOpenChange"
      @hook:mounted="schema.props.dictionary && onSelectMounted()"
    >
      <i-option
        v-for="(option, index) in schema.options"
        :value="option.value"
        :key="index"
        :disabled="option.disabled"
      >
        {{ option.label }}
      </i-option>
    </i-select>
  </FormItemWrap>
</template>

<script>
import FormItemWrap from '../FormItemWrap'
const getDictionaryListApi = url => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('GET', url)
    xhr.onload = () => resolve(xhr.response)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send()
  })
}

export default {
  name: 'GridFormSelect',

  components: { FormItemWrap },

  props: {
    model: Object,
    schema: Object,
    preview: Boolean
  },

  data() {
    return {
      selectLoading: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  beforeDestroy() {},

  methods: {
    onSelectMounted() {
      const { dynamic } = this.schema
      const { url } = dynamic
      this.selectLoading = true
      getDictionaryListApi(url)
        .then(({ data }) => {
          this.schema.options = data ? data.map(({ label, value }) => ({ label, value })) : []
        })
        .catch(err => console.log(err))
        .finally(() => (this.selectLoading = false))
    },

    onSelectOpenChange(status) {
      if (!this.schema.dynamic || !status || this.schema.options.length) return
      this.onSelectMounted()
    },

    onCreate(val) {
      this.schema.options.push({
        value: val,
        label: val
      })
    }
  }
}
</script>
