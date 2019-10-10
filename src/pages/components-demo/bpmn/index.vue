<template>
  <i-card class="bpmn" shadow>
    <BpmnModeler class="bpmn__bpmnviewer" @on-modeler-load="onModelerLoad" />
  </i-card>
</template>

<script>
import BpmnModeler from '@/components/Bpmn/BpmnModeler'

export default {
  name: 'Bpmn',

  components: { BpmnModeler },

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

  methods: {
    onModelerLoad(modeler) {
      const xml = `<?xml version="1.0" encoding="UTF-8"?>
        <bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_1ddqq8q" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="5.0.4">
          <bpmn:process id="Process_0j29tt9" isExecutable="false">
            <bpmn:startEvent id="StartEvent_1cuxqe2" name="start">
              <bpmn:outgoing>SequenceFlow_07p4j3w</bpmn:outgoing>
            </bpmn:startEvent>
            <bpmn:task id="Task_0i7lx3y" name="do something">
              <bpmn:incoming>SequenceFlow_07p4j3w</bpmn:incoming>
              <bpmn:outgoing>SequenceFlow_05yvt6h</bpmn:outgoing>
            </bpmn:task>
            <bpmn:sequenceFlow id="SequenceFlow_07p4j3w" sourceRef="StartEvent_1cuxqe2" targetRef="Task_0i7lx3y" />
            <bpmn:exclusiveGateway id="ExclusiveGateway_1gmv8bm" name="siwth ?">
              <bpmn:incoming>SequenceFlow_05yvt6h</bpmn:incoming>
            </bpmn:exclusiveGateway>
            <bpmn:sequenceFlow id="SequenceFlow_05yvt6h" sourceRef="Task_0i7lx3y" targetRef="ExclusiveGateway_1gmv8bm" />
          </bpmn:process>
          <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_0j29tt9">
              <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1cuxqe2">
                <dc:Bounds x="152" y="102" width="36" height="36" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="159" y="145" width="22" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNShape id="Task_0i7lx3y_di" bpmnElement="Task_0i7lx3y">
                <dc:Bounds x="300" y="80" width="100" height="80" />
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_07p4j3w_di" bpmnElement="SequenceFlow_07p4j3w">
                <di:waypoint x="188" y="120" />
                <di:waypoint x="300" y="120" />
              </bpmndi:BPMNEdge>
              <bpmndi:BPMNShape id="ExclusiveGateway_1gmv8bm_di" bpmnElement="ExclusiveGateway_1gmv8bm" isMarkerVisible="true">
                <dc:Bounds x="495" y="95" width="50" height="50" />
                <bpmndi:BPMNLabel>
                  <dc:Bounds x="503" y="152" width="35" height="14" />
                </bpmndi:BPMNLabel>
              </bpmndi:BPMNShape>
              <bpmndi:BPMNEdge id="SequenceFlow_05yvt6h_di" bpmnElement="SequenceFlow_05yvt6h">
                <di:waypoint x="400" y="120" />
                <di:waypoint x="495" y="120" />
              </bpmndi:BPMNEdge>
            </bpmndi:BPMNPlane>
          </bpmndi:BPMNDiagram>
        </bpmn:definitions>
        `
      modeler.importXML(xml, function(err) {
        if (err) {
          console.log('error rendering', err)
        } else {
          // console.log('rendered')
          modeler.get('canvas').zoom('fit-viewport')
        }
      })
    }
  }
}
</script>

<style lang="less">
.bpmn {
  &__bpmnviewer {
    height: 700px;
    width: 100%;
  }
}
</style>
