<template>
  <div id="BpmnModeler" class="bpmn-modeler">
    <EditingTools class="bpmn-modeler__editing-tools" />
    <ZoomControls
      class="bpmn-modeler__zoom-control"
      @on-zoom-in="onZoomIn"
      @on-zoom-out="onZoomOut"
    />
  </div>
</template>

<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import customTranslateModule from '../ilbs/customTranslateModule'
import EditingTools from './EditingTools'
import ZoomControls from './ZoomControls'

const events = [
  // 'element.hover',
  // 'element.out',
  ['element.click', 'element-click']
  // selection.changed
  // 'element..changed'
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
  name: 'BpmnModeler',

  components: {
    EditingTools,
    ZoomControls
  },

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.modeler = new BpmnModeler({
      container: '#BpmnModeler',
      keyboard: {
        bindTo: document
      },
      additionalModules: [customTranslateModule]
    })
    this.$emit('on-modeler-load', this.modeler)
    this.bindEvent(this.modeler)
  },

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {
    this.unBindEvent(this.modeler)
    this.modeler.destroy()
  },

  methods: {
    bindElementClickEvent(eventBus, modeler) {
      eventBus.on('element.click', event => {
        const { element } = event
        const { id, type, businessObject } = element
        const business = { id: id, type: type, name: businessObject.name }
        // console.log('element.click: ', element)

        if (bpmnElementClickType[type]) {
          this.$emit(bpmnElementClickType[type], business)
        }
      })
    },

    bindSelectionChanged(eventBus, modeler) {
      eventBus.on('selection.changed', event => {
        // console.log('selection.changed: ', event)
      })
    },

    bindEvent(modeler) {
      const eventBus = modeler.get('eventBus')
      this.bindElementClickEvent(eventBus, modeler)
      this.bindSelectionChanged(eventBus, modeler)
    },

    unBindEvent(modeler) {
      const eventBus = modeler.get('eventBus')
      eventBus.off('element.click')
      eventBus.off('selection.changed')
    },

    onZoomIn() {
      if (this.modeler) {
        this.modeler.get('editorActions').trigger('stepZoom', { value: 1 })
      }
    },

    onZoomOut() {
      if (this.modeler) {
        this.modeler.get('editorActions').trigger('stepZoom', { value: -1 })
      }
    }
  }
}
</script>

<style scoped lang="less">
@import '~bpmn-js/dist/assets/diagram-js.css';
@import '~bpmn-js/dist/assets/bpmn-font/css/bpmn.css';
.bpmn-modeler {
  position: relative;

  &__editing-tools {
    position: absolute;
    top: 15px;
    right: 15px;
  }

  &__zoom-control {
    position: absolute;
    bottom: 85px;
    right: 15px;
  }
}
</style>
