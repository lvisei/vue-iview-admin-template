<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'

export default {
  name: 'LineChart',

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
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      chart: null,
      sidebarElm: null
    }
  },

  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val)
      }
    }
  },

  mounted() {
    this.initChart()
    if (this.autoResize) {
      this.__resizeHandler = this.$utils.debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      this.$utils.onEvent(window, 'resize', this.__resizeHandler)
    }

    // 监听侧边栏的变化
    this.sidebarElm = document.getElementsByClassName('global-layout__sider')[0]
    this.sidebarElm &&
      this.$utils.onEvent(this.sidebarElm, 'transitionend', this.sidebarResizeHandler)
  },

  beforeDestroy() {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      this.$utils.offEvent(window, 'resize', this.__resizeHandler)
    }

    this.sidebarElm &&
      this.$utils.offEvent(this.sidebarElm, 'transitionend', this.sidebarResizeHandler)

    this.chart.dispose()
    this.chart = null
  },

  methods: {
    sidebarResizeHandler(e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },

    setOptions({ expectedData, actualData } = {}) {
      this.chart.setOption({
        xAxis: {
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expected', 'actual']
        },
        series: [
          {
            name: 'expected',
            itemStyle: {
              normal: {
                color: '#2fc25b',
                lineStyle: {
                  color: '#2fc25b',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: expectedData,
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: 'actual',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#1890ff',
                lineStyle: {
                  color: '#1890ff',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: actualData,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    },

    initChart() {
      this.chart = echarts.init(this.$el, 'chartTheme')
      this.setOptions(this.chartData)
    }
  }
}
</script>
