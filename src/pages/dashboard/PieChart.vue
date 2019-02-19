<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'PieChart',

  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '300px'
    }
  },

  data() {
    return {
      chart: null
    }
  },

  mounted() {
    this.initChart()
    this.__resizeHandler = this.$utils.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.$utils.onEvent(window, 'resize', this.__resizeHandler)
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.$utils.offEvent(window, 'resize', this.__resizeHandler)
    this.chart.dispose()
    this.chart = null
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'chartTheme')

      this.chart.setOption({
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
      })
    }
  }
}
</script>
