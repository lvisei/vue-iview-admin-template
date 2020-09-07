<template>
  <i-modal
    class="resource-edit"
    :value="modalVisible"
    width="800"
    :title="`${isEditResource ? `编辑资源` : '新增资源'}`"
    @on-cancel="onCancel"
  >
    <i-form
      ref="form"
      :model="formData"
      :rules="formRule"
      :label-width="100"
      @keydown.enter.native="onSubmit"
    >
      <i-form-item label="资源组" prop="group">
        <i-input v-model.trim="formData.group" placeholder="请输入资源组"></i-input>
      </i-form-item>
      <i-form-item label="请求方式" prop="method">
        <i-select
          v-model="formData.method"
          filterable
          allow-create
          placeholder="请选择请求方式"
          @on-create="data => methodList.push(data)"
        >
          <i-option v-for="item in methodList" :value="item" :key="item">{{ item }}</i-option>
        </i-select>
      </i-form-item>
      <i-form-item label="请求路径" prop="path">
        <i-input v-model.trim="formData.path" placeholder="请输入请求路径"></i-input>
      </i-form-item>
      <i-form-item label="资源描述" prop="description">
        <i-input
          v-model.trim="formData.description"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 3 }"
          placeholder="请输入资源描述"
        ></i-input>
      </i-form-item>
    </i-form>
    <div slot="footer">
      <i-button type="text" @click="onCancel">取消</i-button>
      <i-button type="primary" @click="onSubmit" :loading="loading">提交</i-button>
    </div>
  </i-modal>
</template>

<script>
import { getResource } from '@/api/system-management/resource-management'

export default {
  name: 'ResourceEdit',

  components: {},

  filters: {},

  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    editType: {
      type: String,
      required: true,
      validator: value => ['edit', 'add'].indexOf(value) !== -1
    },
    resource: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      formRule: {
        group: [{ required: true, message: '请输入资源组', trigger: 'blur' }],
        method: [{ required: true, message: '请选择请求方式', trigger: 'blur' }],
        path: [{ required: true, message: '请输入请求路径', trigger: 'blur' }]
      },
      formData: {
        group: '',
        method: '',
        path: '',
        description: ''
      },
      methodList: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE']
    }
  },

  computed: {
    isEditResource() {
      return this.editType === 'edit'
    }
  },

  watch: {
    modalVisible(value) {
      if (value) {
        const { id, group } = this.resource
        this.isEditResource ? this.getResourceData(id) : (this.formData.group = group)
      } else {
        this.$refs.form.resetFields()
      }
    }
  },

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    getResourceData(id) {
      getResource(id)
        .then(data => {
          const formData = {
            group: data.group,
            method: data.method,
            path: data.path,
            description: data.description
          }
          this.formData = formData
        })
        .catch(() => {
          this.$Message.error('获取资源数据失败')
        })
    },

    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const formData = this.formData
          const data = {
            group: formData.group,
            method: formData.method,
            path: formData.path,
            description: formData.description
          }
          this.$emit('on-edit-submit', data)
        }
      })
    },

    onCancel() {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>

<style lang="less" scoped>
.resource-edit {
  &__actions {
    /deep/ .ivu-form-item-label {
      float: none;
      display: inline-block;
    }

    /deep/ .ivu-form-item-content {
      margin-left: 30px !important;
    }
  }
}
</style>
