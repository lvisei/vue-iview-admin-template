<template>
  <i-modal
    title="修改头像"
    :value="modalVisible"
    :mask-closable="false"
    :width="800"
    footer-hide
    @on-cancel="onCancel"
  >
    <i-row>
      <i-col :xs="24" :md="12" :style="{ height: '350px' }">
        <VueCropper
          v-if="modalVisible"
          ref="cropper"
          :img="options.img"
          :info="true"
          :output-size="0.5"
          :auto-crop="options.autoCrop"
          :auto-crop-width="options.autoCropWidth"
          :auto-crop-height="options.autoCropHeight"
          :fixed-box="options.fixedBox"
          @realTime="data => (previews = data)"
        />
      </i-col>
      <i-col :xs="24" :md="12" :style="{ height: '350px' }">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img" />
        </div>
      </i-col>
    </i-row>
    <br />
    <i-row>
      <i-col :lg="2" :md="2">
        <i-upload name="file" :before-upload="beforeUpload" :show-upload-list="false" action>
          <i-button icon="md-arrow-up">选择图片</i-button>
        </i-upload>
      </i-col>
      <i-col :lg="{ span: 1, offset: 2 }" :md="2">
        <i-button icon="md-add" @click="handChangeScale(1)" />
      </i-col>
      <i-col :lg="{ span: 1, offset: 1 }" :md="2">
        <i-button icon="md-remove" @click="handChangeScale(-1)" />
      </i-col>
      <i-col :lg="{ span: 1, offset: 1 }" :md="2">
        <i-button icon="md-undo" @click="handRotateLeft" />
      </i-col>
      <i-col :lg="{ span: 1, offset: 1 }" :md="2">
        <i-button icon="md-redo" @click="handRotateRight" />
      </i-col>
      <i-col :lg="{ span: 2, offset: 6 }" :md="2">
        <i-button v-show="previews.url" type="primary" @click="handSave()">保存</i-button>
      </i-col>
    </i-row>
  </i-modal>
</template>

<script>
import { VueCropper } from 'vue-cropper'

export default {
  name: 'AvatarModal',

  components: { VueCropper },

  props: {
    modalVisible: {
      type: Boolean,
      default: false
    },

    img: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      options: {
        img: this.img,
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    }
  },

  methods: {
    handChangeScale(num) {
      num = num || 1
      this.$refs.cropper.changeScale(num)
    },
    handRotateLeft() {
      this.$refs.cropper.rotateLeft()
    },
    handRotateRight() {
      this.$refs.cropper.rotateRight()
    },

    beforeUpload(file) {
      const reader = new FileReader()
      // 把Array Buffer转化为 blob
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.options.img = reader.result
      }
      // 转化为blob
      // reader.readAsArrayBuffer(file)

      return false
    },

    // 保存
    handSave(type) {
      if (type === 'blob') {
        this.$refs.cropper.getCropBlob(data => {
          const img = window.URL.createObjectURL(data)
          this.$emit('on-save', img)
          this.onCancel()
        })
      } else {
        // 获取截图的base64 数据
        this.$refs.cropper.getCropData(data => {
          this.$emit('on-save', data)
          this.onCancel()
        })
      }
    },

    onCancel() {
      this.$emit('update:modalVisible', false)
    }
  }
}
</script>

<style lang="less">
.avatar-upload-preview {
  position: absolute;
  top: 50%;
  transform: translate(50%, -50%);
  width: 180px;
  height: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
