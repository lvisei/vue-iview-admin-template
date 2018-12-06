<template>
  <div class="analysis-wrapper">
    <i-row :gutter="40">
      <i-col
        class="infor-item"
        :xs="12"
        :md="8"
        :lg="4"
        v-for="(item, index) in inforCardData"
        :key="index"
      >
        <info-card shadow :color="item.color" :icon="item.icon" :icon-size="36">
          <count-to :end="item.count"/>
          <p>{{ item.title }}</p>
        </info-card>
      </i-col>
    </i-row>
  </div>
</template>

<script>
import CountTo from '@/components/CountTo/CountTo'
import InfoCard from '@/components/InfoCard/InfoCard'
import { getSysLogCountApi } from '@/api/dashboard'

export default {
  name: 'Analysis',

  components: {
    CountTo,
    InfoCard
  },

  filters: {},

  props: {},

  data() {
    return {
      inforCardData: [
        { title: '今日访问量', icon: 'md-stats', count: 0, color: '#2d8cf0' },
        { title: '本月访问量', icon: 'md-stats', count: 0, color: '#ff9900' },
        { title: '今年访问量', icon: 'md-stats', count: 0, color: '#ed3f14' },
        { title: '在线人数', icon: 'md-people', count: 0, color: '#facc14' },
        { title: '日均访问人次', icon: 'md-globe', count: 0, color: '#9A66E4' },
        { title: '月均访问人次', icon: 'md-globe', count: 0, color: '#19bef0' }
      ]
    }
  },

  computed: {},

  watch: {},

  created() {
    getSysLogCountApi().then(res => {
      let { todayCount, monthCount, yearCount, online, dayrate, monthrate } = res.data
      let inforCount = [todayCount, monthCount, yearCount, online, dayrate, monthrate]
      this.inforCardData = this.inforCardData.map((item, index) => {
        return { ...item, count: inforCount[index] }
      })
    })
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  destroyed() {},

  methods: {}
}
</script>

<style lang="less">
.analysis-wrapper {
  .infor-item {
    height: 120px;
    padding-bottom: 10px;
  }

  .analysis-sys-chart-wrapper {
    margin-top: 10px;
  }

  .analysis-region-wrapper {
    margin-top: 20px;
  }
}
</style>
