<template>
  <i-card class="count-to-demo" shadow>
    CountTo
    <CountTo :end="100" />
  </i-card>
</template>

<script>
import CountTo from '@/components/CountTo'

export default {
  name: 'CounToDemo',

  components: { CountTo },

  filters: {},

  props: {},

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

<style></style>
