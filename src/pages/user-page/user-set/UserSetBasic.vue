<template>
  <div class="user-set-basic">
    <div class="user-set-basic__title">基本设置</div>
    <i-form
      class="user-set-basic__form"
      ref="form"
      :model="formData"
      :rules="ruleValidate"
      @keydown.enter.native="onSave"
    >
      <i-row>
        <i-col :xs="24" :sm="24" :md="24" :lg="12" style="padding-right: 24px;">
          <i-form-item label="登录名称" prop="userName">
            <i-input v-model="formData.userName" placeholder="请输入登录名称"></i-input>
          </i-form-item>
          <i-form-item label="真实姓名" prop="realName">
            <i-input v-model="formData.realName" placeholder="请输入真实姓名"></i-input>
          </i-form-item>

          <i-form-item label="部门" prop="department">
            <i-input v-model="formData.department"></i-input>
          </i-form-item>

          <i-form-item label="省市" prop="areaValue">
            <i-cascader
              :data="areaData"
              v-model="formData.areaValue"
              :load-data="loadData"
            ></i-cascader>
          </i-form-item>

          <i-form-item label="电话" prop="phone">
            <i-input v-model="formData.phone" placeholder="请输入电话号码"></i-input>
          </i-form-item>

          <i-form-item label="邮箱" prop="email">
            <i-input v-model="formData.email" placeholder="请输入邮箱"></i-input>
          </i-form-item>

          <i-form-item label="年龄" prop="age">
            <i-input-number v-model="formData.age"></i-input-number>
          </i-form-item>

          <i-form-item label="性别" prop="sex">
            <i-radio-group v-model="formData.sex">
              <i-radio label="1">男</i-radio>
              <i-radio label="2">女</i-radio>
            </i-radio-group>
          </i-form-item>
        </i-col>
        <i-col :xs="24" :sm="24" :md="24" :lg="12" style="padding-left: 24px; padding-right: 24px;">
          <i-form-item label="" prop="avatar">
            <div class="user-set-basic__user-avatar" @click="handChangeAvatar">
              <i-icon type="ios-cloud-upload-outline" class="user-set-basic__avatar-upload" />
              <div class="user-set-basic__avatar-mask">
                <i-icon type="ios-add" />
              </div>
              <img class="user-set-basic__avatar-img" :src="formData.avatar" />
            </div>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <i-button type="primary" @click="onSave" :loading="loading">更新基本信息</i-button>

    <AvatarModal
      :modalVisible.sync="avatarModalVisible"
      :img="formData.avatar"
      @on-save="data => (formData.avatar = data)"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AvatarModal from './AvatarModal'
import { editUserInfoApi } from '@/api/personal-center/user'

export default {
  name: 'UserSetBasic',

  components: { AvatarModal },

  filters: {},

  props: {},

  data() {
    return {
      loading: false,
      areaData: [
        {
          value: 'beijing',
          label: '北京',
          children: [],
          loading: false
        },
        {
          value: 'hangzhou',
          label: '杭州',
          children: [],
          loading: false
        }
      ],
      ruleValidate: {
        userName: [{ required: true, message: '请输登录姓名', trigger: 'blur' }],
        realName: [{ required: true, message: '请输入真实姓名', trigger: 'blur' }],
        email: [{ type: 'email', message: '邮箱格式不正确', trigger: 'blur' }],
        department: [{ required: true, message: '请输入部门', trigger: 'change' }],
        areaValue: [{ required: true, type: 'array', message: '请输入省市' }]
      },
      formData: {
        userName: '',
        realName: '',
        department: '研发部',
        age: 23,
        email: '',
        phone: '',
        areaValue: ['hangzhou', 'ali'],
        sex: 1,
        avatar: 'https://dummyimage.com/200x200/admin'
      },
      avatarModalVisible: false
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  watch: {},

  created() {
    const { userName, realName, phone, email, avatar } = this.user
    this.formData = {
      userName: userName,
      realName: realName,
      department: '研发部',
      age: 23,
      email: email,
      phone: phone,
      areaValue: ['hangzhou', 'ali'],
      sex: 1,
      avatar: avatar
    }
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    handChangeAvatar() {
      this.avatarModalVisible = true
    },

    loadData(item, callback) {
      item.loading = true
      setTimeout(() => {
        if (item.value === 'beijing') {
          item.children = [
            {
              value: 'talkingdata',
              label: 'TalkingData'
            },
            {
              value: 'baidu',
              label: '百度'
            },
            {
              value: 'sina',
              label: '新浪'
            }
          ]
        } else if (item.value === 'hangzhou') {
          item.children = [
            {
              value: 'ali',
              label: '阿里巴巴'
            },
            {
              value: '163',
              label: '网易'
            }
          ]
        }
        item.loading = false
        callback()
      }, 500)
    },

    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            userName: this.formData.userName,
            realName: this.formData.realName,
            phone: this.formData.phone,
            email: this.formData.email,
            avatar: this.formData.avatar
          }
          this.editUserInfo(params)
        }
      })
    },

    editUserInfo(params) {
      this.loading = true
      editUserInfoApi(params)
        .then(() => {
          this.$Message.success({
            content: '信息更新成功',
            onClose: () => {
              this.$store.dispatch('user/getUserInfo')
            }
          })
        })
        .catch(error => {
          this.$Message.error(error.message || '信息更新失败')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="less">
.user-set-basic {
  &__title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__form {
    width: 100%;

    .ivu-form-item-label {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;

      &::before {
        content: '';
      }
    }
  }

  &__user-avatar {
    position: relative;
    margin: 0 auto;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0px -1px 1px #ccc;
    background-color: #ccc;
  }

  &__avatar-img,
  &__avatar-mask {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }

  &__avatar-upload {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }

  &__avatar-mask {
    opacity: 0;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    .ivu-icon {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }
}
</style>
