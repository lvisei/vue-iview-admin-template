<template>
  <i-card class="back-to-top" shadow>
    BackToTop
    <pre>
      <code v-text='`<BackToTop
        :custom-style="myBackToTopStyle"
        :visibility-height="300"
        :back-position="0"
        transition-name="fade"
      />`'>
      </code>
    </pre>
    <pre>
      <code>
      myBackToTopStyle: {
        right: '50px',
        bottom: '100px',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        lineHeight: '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
      }
      </code>
    </pre>
    <BackToTop
      :custom-style="myBackToTopStyle"
      :visibility-height="300"
      :back-position="0"
      transition-name="fade"
    />
  </i-card>
</template>

<script>
import BackToTop from '@/components/BackToTop'

export default {
  name: 'BackToTopDemo',

  components: {
    BackToTop
  },

  filters: {},

  props: {},

  data() {
    return {
      myBackToTopStyle: {
        right: '50px',
        bottom: '100px',
        width: '40px',
        height: '40px',
        borderRadius: '4px',
        lineHeight: '45px', // 请保持与高度一致以垂直居中
        background: '#e7eaf1' // 按钮的背景颜色
      }
    }
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

<style>
.back-to-top {
  height: 1200px;
}
</style>
