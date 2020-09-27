<template>
  <i-form class="grid-form" ref="form" :model="model">
    <p v-if="title" class="grid-form__title">{{ title }}</p>
    <div v-if="formExtra" class="grid-form__tools">
      <i-button
        v-if="formExtra.exportTable"
        class="grid-form__tools-btn"
        size="default"
        icon="md-download"
        :to="formExtra.exportTable.url"
        target="_blank"
      >
        导出表格
      </i-button>
      <template v-if="formExtra.downloadTemplate">
        <i-button
          v-for="(item, index) in formExtra.downloadTemplate"
          :key="index"
          class="grid-form__tools-btn"
          size="default"
          icon="md-download"
          :to="item.url"
          target="_blank"
        >
          {{ item.name }}
        </i-button>
      </template>
      <i-upload
        v-if="formExtra.uploadTable"
        class="grid-form__upload-table"
        :action="formExtra.uploadTable.url"
        :data="formExtra.uploadTable.data"
        :show-upload-list="false"
        :format="['docx']"
        :on-progress="_ => (uploadTableLoading = true)"
        :on-error="_ => (uploadTableLoading = false)"
        :on-format-error="handleUploadFormatError"
        :on-success="onUploadTableSuccess"
      >
        <i-button
          class="grid-form__tools-btn"
          size="default"
          :loading="uploadTableLoading"
          icon="md-cloud-upload"
        >
          导入数据
        </i-button>
      </i-upload>
    </div>
    <slot />
  </i-form>
</template>

<script>
export default {
  name: 'GridForm',

  provide() {
    return { validateField: this.validateField }
  },

  components: {},

  props: {
    title: String,
    model: Object,
    preview: {
      type: Boolean,
      default: false
    },
    formExtra: {
      type: Object,
      default: () => ({})
    }
  },

  data() {
    return {
      uploadTableLoading: false
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
    handleUploadFormatError(file) {
      this.$Message.error(`上传文件${file.name}格式不正确`)
    },

    onUploadTableSuccess(response, file, fileList) {
      const { code, data, message } = response
      if (code !== 200000) {
        this.$Message.error({ duration: 3, content: message })
        this.uploadTableLoading = false
        return
      }
      this.$emit('on-upload-success', data)
      this.uploadTableLoading = false
    },

    resetFields() {
      this.$refs['form'].resetFields()
    },

    validateField(field, callback) {
      return this.$refs['form'].validateField(field, callback)
    },

    validateForm() {
      if (Object.keys(this.model).length === 0) {
        return new Promise((resolve, reject) => {
          resolve(true)
        })
      }
      return this.$refs['form'].validate(valid => {
        // console.log('valid: ', valid)
        return valid
      })
    }
  }
}
</script>

<style lang="less">
.grid-form {
  &__title {
    font-size: 18px;
    font-weight: 500;
    color: #3e6eff;
    padding-top: 10px;
    padding-bottom: 10px;
    text-align: center;
  }

  &__tools {
    text-align: right;
    padding-bottom: 5px;
  }

  &__upload-table {
    display: inline-block;
  }

  &__tools-btn {
    margin-left: 10px;
  }
}
</style>
