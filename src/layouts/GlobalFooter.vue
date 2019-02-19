<template>
  <div class="global-footer__copyright">{{ copyright }}</div>
</template>

<script>
import { copyright } from '@/config'

export default {
  name: 'GlobalFooter',

  components: {},

  props: [],

  data() {
    return {
      copyright: copyright
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}
</script>

<style lang="less">
.global-footer {
  text-align: center;

  &__copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 13px;
  }
}
</style>
