<template>
  <div class="user-set-basic">
    <div class="user-set-basic__title">基本设置</div>
    <i-form
      class="user-set-basic__form"
      ref="form"
      :model="formData"
      :rules="ruleValidate"
      @keydown.enter.native="onOk"
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
          <i-form-item label="头像" prop="avatar" style="float: none;">
            <div class="user-set-basic__user-seter-avatar">
              <i-avatar shape="square" :src="formData.avatar" />
              <i-upload action="" :before-upload="handleAvatarUpload">
                <i-button icon="md-arrow-up">更改头像</i-button>
              </i-upload>
            </div>
          </i-form-item>
        </i-col>
      </i-row>
    </i-form>

    <i-button type="primary" @click="onOk" :loading="loading">更新基本信息</i-button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { editUserInfoApi } from '@/api/personal-center/user'

export default {
  name: 'UserSetBasic',

  components: {},

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
      }
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  watch: {},

  created() {
    const { userName, realName, phone, email } = this.user
    this.formData = {
      userName: userName,
      realName: realName,
      department: '研发部',
      age: 23,
      email: email,
      phone: phone,
      areaValue: ['hangzhou', 'ali'],
      sex: 1,
      avatar: 'https://dummyimage.com/200x200/admin'
    }
  },

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    handleAvatarUpload() {
      return false
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

    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const params = {
            userName: this.formData.userName,
            realName: this.formData.realName,
            phone: this.formData.phone,
            email: this.formData.email
          }
          this.editUserInfo(params)
        }
      })
    },

    editUserInfo(params) {
      this.loading = true
      editUserInfoApi(params)
        .then(_ => {
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
        .finally(_ => (this.loading = false))
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

  &__user-seter-avatar {
    width: 100%;
    display: inline-block;

    .ivu-avatar {
      width: 100px;
      height: 100px;
      margin-bottom: 20px;
    }
  }
}
</style>
