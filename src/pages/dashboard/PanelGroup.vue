<template>
  <i-row :gutter="40">
    <i-col
      class="infor-item"
      :xs="12"
      :md="12"
      :lg="6"
      v-for="(item, index) in panelData"
      :key="index"
      style="height: 120px;padding-bottom: 10px;"
    >
      <info-card shadow :color="item.color" :icon="item.icon" :icon-size="36">
        <count-to :end="item.count" />
        <p>{{ item.title }}</p>
      </info-card>
    </i-col>
  </i-row>
</template>

<script>
import CountTo from '@/components/CountTo'
import InfoCard from '@/components/InfoCard'

export default {
  name: 'PanelGroup',

  components: {
    CountTo,
    InfoCard
  },

  filters: {},

  props: {
    panelData: {
      type: Array,
      required: true
    }
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {}
}
</script>
