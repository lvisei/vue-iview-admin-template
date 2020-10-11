<template>
  <i-card class="table-form-generator" shadow>
    <div class="table-form-generator__preview">
      <GridForm ref="gridForm" :title="gridForm.formTitle" :model="gridForm.formModel">
        <GridFormGroup
          v-for="(schema, index) in gridForm.formSchema"
          :key="index + new Date().getTime()"
          :schema="schema"
          :model="gridForm.formModel"
          :preview="formPattern === 'preview'"
        />
      </GridForm>
    </div>
    <div class="table-form-generator__config">
      <i-radio-group v-model="formPattern">
        <i-radio label="fill">填报模式</i-radio>
        <i-radio label="preview">预览模式</i-radio>
      </i-radio-group>
      <i-button type="primary" shape="circle" @click="handClickCongfig">
        表单配置
      </i-button>
    </div>
    <i-modal
      class-name="table-form-generator__edit-form-pane"
      :fullscreen="false"
      :value="modalVisible"
      width="1400"
      title="表单配置"
      @on-cancel="onCancel"
    >
      <MonacoEditor
        v-if="modalVisible"
        class="table-form-generator__editor"
        v-model="gridFormJson"
        language="json"
        theme="vs-dark"
      />
      <div class="edit-form-pane__modal-footer" slot="footer">
        <i-button class="edit-form-pane__modal-footer_back" @click="onCancel">返回</i-button>
        <i-button class="edit-form-pane__modal-footer_ok" type="primary" @click="onOk">
          保存
        </i-button>
      </div>
    </i-modal>
  </i-card>
</template>

<script>
import MonacoEditor from '@/components/MonacoEditor'
import { GridForm, GridFormGroup } from '@/views/GridForm'
import defaultForm from './data/default.json'

export default {
  name: 'TableFormGenerator',

  components: { MonacoEditor, GridForm, GridFormGroup },

  filters: {},

  data() {
    return {
      // gridForm: { formTitle: '', formAlias: '', formExtra: {}, formModel: {}, formSchema: [] },
      gridForm: defaultForm,
      formPattern: 'fill',
      modalVisible: false,
      gridFormJson: '{}'
    }
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
    handClickCongfig() {
      this.gridFormJson = JSON.stringify(this.gridForm, null, 2)
      this.modalVisible = true
    },

    onOk() {
      const { formTitle, formAlias, formExtra, formModel, formSchema } = JSON.parse(
        this.gridFormJson
      )
      this.gridForm.formTitle = formTitle
      this.gridForm.formAlias = formAlias
      this.gridForm.formExtra = formExtra
      this.gridForm.formModel = formModel
      this.gridForm.formSchema = formSchema
      this.modalVisible = false
    },

    onCancel() {
      this.modalVisible = false
    }
  }
}
</script>

<style lang="less">
.table-form-generator {
  &__editor {
    height: 700px;
  }

  &__config {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  &__edit-form-pane {
    .ivu-modal-body {
      padding: 0;
    }
  }
}
</style>
