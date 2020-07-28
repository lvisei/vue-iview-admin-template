<template>
  <VCharts
    :options="chartOptions"
    ref="chart"
    :style="{ height: height, width: width }"
    :autoresize="autoResize"
    theme="chartTheme"
  />
</template>

<script>
import VCharts from 'vue-echarts'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'PieChart',

  components: {
    VCharts
  },

  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: false
    }
  },

  data() {
    return {}
  },

  computed: {
    chartOptions() {
      const chartData = this.chartData
      return this.getOptions(chartData)
    }
  },

  mounted() {},

  beforeDestroy() {},

  methods: {
    getOptions({ seriesData } = {}) {
      const chartOptions = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
        },
        calculable: true,
        series: [
          {
            name: 'WEEKLY WRITE ARTICLES',
            type: 'pie',
            roseType: 'radius',
            radius: [15, 95],
            center: ['50%', '38%'],
            data: [
              { value: 320, name: 'Industries' },
              { value: 240, name: 'Technology' },
              { value: 149, name: 'Forex' },
              { value: 100, name: 'Gold' },
              { value: 59, name: 'Forecasts' }
            ],
            animationEasing: 'cubicInOut',
            animationDuration: 2600
          }
        ]
      }
      return chartOptions
    }
  }
}
</script>
