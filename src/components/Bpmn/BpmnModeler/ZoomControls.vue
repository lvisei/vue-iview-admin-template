<template>
  <div class="zoom-control">
    <ul class="zoom-control__control">
      <li class="zoom-control__control_item" @click="$emit('on-zoom-in')">
        <svg
          t="1565677475166"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2015"
          width="20"
          height="20"
        >
          <path d="M899 474H550V125h-76v349H125v76h349v349h76V550h349v-76z" p-id="2016"></path>
        </svg>
      </li>
      <li class="zoom-control__control_item"><hr class="hr" /></li>
      <li class="zoom-control__control_item" @click="$emit('on-zoom-out')">
        <svg
          t="1565677499508"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2148"
          width="20"
          height="20"
        >
          <path d="M125 474h774v76H125z" p-id="2149"></path>
        </svg>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ZoomControls',

  components: {},

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

  beforeDestroy() {},

  methods: {}
}
</script>

<style scoped lang="less">
.zoom-control {
  z-index: 1;

  &__control {
    list-style: none;
    background: #fff;
    border-radius: 2px;
    border: solid 1px #e0e0e0;

    &_item {
      padding: 5px;

      .hr {
        border-top: solid 1px #eee;
      }

      .icon {
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}
</style>
