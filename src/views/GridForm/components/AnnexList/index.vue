<template>
  <div class="annex-list">
    <template v-if="list.length">
      <div class="annex-list__item" v-for="(item, index) in list" :key="index" :title="item.name">
        <img
          v-if="isImgFile && checkingImgFile(item)"
          class="annex-list__item_img"
          :src="item.url"
          :alt="item.name"
          @click="handleDownload(item)"
        />

        <p
          v-else
          :class="['annex-list__item_name', isImgFile ? 'annex-list__item_img-name' : '']"
          @click="handleDownload(item)"
        >
          <span>{{ item.name }}</span>
        </p>
      </div>
    </template>
    <p v-else class="annex-list__remark">无相关资料</p>
  </div>
</template>

<script>
export default {
  name: 'AnnexList',

  components: {},

  filters: {},

  props: {
    type: {
      type: String,
      default: 'file',
      validator: value => ['file', 'img'].indexOf(value) !== -1
    },
    fileList: {
      type: [Array, Object],
      default: () => []
    },
    file: Object
  },

  data() {
    return {}
  },

  computed: {
    list() {
      return this.file && Object.prototype.hasOwnProperty.call(this.file, 'url')
        ? [this.file]
        : this.fileList
    },

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

    handleDownload({ url }) {
      const eleLink = document.createElement('a')
      eleLink.style.display = 'none'
      eleLink.href = url
      eleLink.target = '_blank'
      document.body.appendChild(eleLink)
      eleLink.click()
      document.body.removeChild(eleLink)
    }
  }
}
</script>

<style lang="less" scoped>
.annex-list {
  display: flex;

  &__item {
    cursor: pointer;
    flex: 1;
    // width: 120px;
    // height: 25px;
    padding: 5px;
    text-align: center;
    // border: 1px solid #dcdee2;
    // border-radius: 4px;
    // background-color: #d0b483;
    position: relative;
    margin-right: 6px;
    color: #07f;
    // margin-bottom: 20px;

    // &:nth-child(2n) {
    //   background-color: #6980a5;
    // }

    &_img {
      width: 80px;
      height: 60px;
      padding: 0;
      vertical-align: middle;
    }

    &_name {
      vertical-align: middle;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &_img-name {
      white-space: pre-wrap;
      padding: 0 2px;
    }
  }

  &__remark {
    text-align: center;
    flex: 1;
    font-size: 13px;
  }
}
</style>
