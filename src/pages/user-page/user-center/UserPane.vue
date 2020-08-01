<template>
  <i-card class="user-pane" shadow>
    <div class="user-pane__avatar">
      <i-avatar :src="avatar" />
      <p class="user-pane__avatar_name">{{ realName }}</p>
    </div>
    <div class="user-pane__description">
      <p class="user-pane__description_item">
        <span class="user-pane__description_item-title">
          <i-icon type="ios-briefcase-outline" />
        </span>
        <span class="user-pane__description_item-detail">工程研发专家</span>
      </p>
      <p class="user-pane__description_item">
        <span class="user-pane__description_item-title">
          <i-icon type="ios-git-merge" />
        </span>
        <span class="user-pane__description_item-detail">XXX平台-工程研发部门-XXX小组</span>
      </p>
      <p class="user-pane__description_item">
        <span class="user-pane__description_item-title">
          <i-icon type="ios-pin-outline" />
        </span>
        <span class="user-pane__description_item-detail">四川省成都市</span>
      </p>
      <p
        class="user-pane__description_item"
        v-clipboard="'liuvigongzuoshi@foxmail.com'"
        v-clipboard:success="() => $Message.success('复制成功')"
      >
        <span class="user-pane__description_item-title">
          <i-icon type="ios-mail-outline" />
        </span>
        <span class="user-pane__description_item-detail">liuvigongzuoshi@foxmail.com</span>
      </p>
    </div>
    <i-divider dashed />
    <div class="user-pane__tags">
      <div class="user-pane__tags_title">标签</div>
      <div class="user-pane__tags_list">
        <i-tag v-for="item in tagList" :key="item" :name="item">标签{{ item + 1 }}</i-tag>
        <i-button icon="ios-add" type="dashed" size="small" @click="handleAddTag">
          添加标签
        </i-button>
      </div>
    </div>
    <i-divider dashed />
    <div class="user-pane__teams">
      <div class="user-pane__teams_title">团队</div>
      <div class="user-pane__teams_list">
        <i-tag v-for="item in teamList" :key="item" :name="item">团队{{ item + 1 }}</i-tag>
      </div>
    </div>
  </i-card>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'UserPane',

  components: {},

  filters: {},

  props: {},

  data() {
    return { tagList: [0, 1, 2, 3], teamList: [0, 1, 2, 3] }
  },

  computed: {
    ...mapGetters(['userName', 'realName', 'avatar', 'user'])
  },

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  beforeDestroy() {},

  methods: {
    handleAddTag() {
      if (this.tagList.length) {
        this.tagList.push(this.tagList[this.tagList.length - 1] + 1)
      } else {
        this.tagList.push(0)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user-pane {
  &__avatar {
    text-align: center;

    .ivu-avatar {
      width: 90px;
      height: 90px;
      line-height: 70px;
      border-radius: 50%;
    }

    &_name {
      font-size: 20px;
      font-weight: bolder;
      line-height: 1.5;
      color: #515a6e;
      margin: 10px;
    }
  }

  &__description {
    margin-top: 16px;

    &_item {
      line-height: 20px;
      margin-bottom: 15px;
    }

    &_item-title {
      margin-right: 10px;
    }
  }

  &__tags,
  &__teams {
    &_title {
      margin-bottom: 16px;
      color: #17233d;
      font-weight: 500;
      font-size: 14px;
    }
  }
}
</style>
