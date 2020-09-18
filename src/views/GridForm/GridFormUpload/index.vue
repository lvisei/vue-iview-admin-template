<template>
  <div>
    <AnnexList v-if="preview" :file="model[schema.field]" v-bind="schema.props" />
    <template else></template>
  </div>
</template>

<script>
import AnnexList from '../components/AnnexList'

export default {
  name: 'GridFormUpload',

  components: {},

  props: {
    model: Object,
    schema: Object,
    preview: Boolean
  },

  data() {
    return {
      selectLoading: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  beforeDestroy() {},

  methods: {}
}
</script>
