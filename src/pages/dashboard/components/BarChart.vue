<template>
  <div :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

const animationDuration = 6000

export default {
  name: 'BarChart',

  props: {
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
    return {}
  },

  mounted() {
    this.$nextTick(() => this.initChart())
    this.__resizeHandler = this.$utils.debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100)
    this.$utils.onEvent(window, 'resize', this.__resizeHandler)
    this.$once('hook:beforeDestroy', () => {
      if (!this.chart) return
      this.$utils.offEvent(window, 'resize', this.__resizeHandler)
      this.chart.dispose()
      this.chart = null
    })
  },

  beforeDestroy() {
    // if (!this.chart) return
    // this.$utils.offEvent(window, 'resize', this.__resizeHandler)
    // this.chart.dispose()
    // this.chart = null
  },

  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'chartTheme')

      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: 10,
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            name: 'pageA',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [79, 52, 200, 334, 390, 330, 220],
            animationDuration
          },
          {
            name: 'pageB',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [80, 52, 200, 334, 390, 330, 220],
            animationDuration
          },
          {
            name: 'pageC',
            type: 'bar',
            stack: 'vistors',
            barWidth: '60%',
            data: [30, 52, 200, 334, 390, 330, 220],
            animationDuration
          }
        ]
      })
    }
  }
}
</script>
