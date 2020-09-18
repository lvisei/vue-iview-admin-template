<template>
  <PlotTable
    :columns="schema.columns"
    :plot-list="model[schema.field]"
    :field="schema.field"
    :preview="preview"
    :max-height="tableMaxHeight"
    :classification="classification"
    v-bind="Object.assign({}, schema.props, $attrs)"
    @on-click-plot="handClickLandPlot"
  />
</template>

<script>
import PlotTable from './GridFormPlot/PlotTable'

export default {
  name: 'GridPlotTable',

  components: {
    PlotTable
  },

  filters: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean
  },

  data() {
    return {}
  },

  computed: {
    classification() {
      const { classification } = this.schema
      // plan、design、completion、approval
      return classification
    },

    tableMaxHeight() {
      return this.preview ? '300' : this.schema.props['max-height']
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
    handClickLandPlot(data) {
      this.$emit('on-click-plot', data)
    }
  }
}
</script>

<style lang="less"></style>
