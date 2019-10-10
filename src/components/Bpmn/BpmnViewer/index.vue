<template>
  <div id="BpmnViewer"></div>
</template>

<script>
// import BpmnViewer from 'bpmn-js'
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer'

const events = [
  // 'element.hover',
  // 'element.out',
  ['element.click', 'element-click']
  // 'element.dblclick'
  // 'element.mousedown',
  // 'element.mouseup'
]

const bpmnElementClickType = {
  'bpmn:Process': 'on-click-process',
  'bpmn:StartEvent': 'on-click-process',
  'bpmn:Task': 'on-click-task',
  'bpmn:EndEvent': 'on-click-process'
}

export default {
  name: 'BpmnViewer',

  components: {},

  filters: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.viewer = new BpmnViewer({
      container: '#BpmnViewer'
    })
    this.$emit('on-viewer-load', this.viewer)
    // console.log('this.viewer: ', this.viewer)
    this.bindElementClickEvent(this.viewer)
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {
    this.unBindEvent(this.viewer)
    this.viewer.destroy()
  },

  methods: {
    bindElementClickEvent(viewer) {
      const eventBus = viewer.get('eventBus')
      eventBus.on('element.click', event => {
        const { element } = event
        const { id, type, businessObject } = element
        const business = { id: id, type: type, name: businessObject.name }
        // console.log('element: ', element)

        if (bpmnElementClickType[type]) {
          this.$emit(bpmnElementClickType[type], business)
        }
      })
    },

    unBindEvent(viewer) {
      const eventBus = viewer.get('eventBus')
      eventBus.off('element.click')
    }
  }
}
</script>

<style lang="less">
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
</style>
