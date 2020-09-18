<template>
  <div class="upload-annex">
    <div class="upload-annex__file-item" v-for="(file, index) in fileList" :key="index">
      <img
        v-if="isImgFile && checkingImgFile(file)"
        class="upload-annex__img"
        :src="createObjectURL(file)"
        :alt="file.name"
      />

      <span v-else class="upload-annex__file">
        <span>{{ file.name }}</span>
      </span>

      <i-icon
        color="red"
        type="md-close"
        size="16"
        style="cursor: pointer;"
        @click="handleDelete(file)"
      />
    </div>
    <i-upload
      :action="action"
      v-show="multiple ? true : fileList.length === 0"
      :multiple="multiple"
      :show-upload-list="false"
      :format="format"
      :on-progress="() => (uploadTableLoading = true)"
      :on-error="() => (uploadTableLoading = false)"
      :on-format-error="handleUploadFormatError"
      :on-success="onUploadTableSuccess"
    >
      <i-button icon="ios-cloud-upload-outline" size="small" :loading="uploadTableLoading">
        {{ placeholder }}
      </i-button>
      <p class="upload-annex__file-format">
        <span v-if="format.length">支持{{ format.join('、') }}格式</span>
      </p>
    </i-upload>
  </div>
</template>

<script>
const isFile = value => Object.prototype.toString.call(value) === '[object File]'
const isObject = value => Object.prototype.toString.call(value) === '[object Object]'

export default {
  name: 'UploadAnnex',

  components: {},

  props: {
    placeholder: {
      type: String,
      default: '上传文件'
    },
    action: String,
    multiple: {
      type: Boolean,
      default: false
    },
    fileList: {
      type: Array,
      default: () => []
    },
    format: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      default: 'file',
      validator: value => ['file', 'img'].indexOf(value) !== -1
    }
  },

  data() {
    return {
      uploadTableLoading: false
    }
  },

  computed: {
    isImgFile() {
      return this.type === 'img'
    }
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    checkingImgFile(file) {
      return ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
    },

    createObjectURL(file) {
      return Object.prototype.hasOwnProperty.call(file, 'url')
        ? file.url
        : window.URL.createObjectURL(file)
    },

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

    handleDelete(file) {
      this.$emit('on-delete', file)
    }
  }
}
</script>

<style lang="less" scoped>
.upload-annex {
  &__file-item + &__file-item {
    margin-left: 5px;
  }

  &__file {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__img {
    width: 80px;
    width: 80px;
  }

  &__file-format {
    display: inline-block;
    font-size: 12px;
    color: #9e9e9e;
    padding: 10px;
    text-align: left;
    width: 130px;
    vertical-align: middle;
  }
}
</style>
