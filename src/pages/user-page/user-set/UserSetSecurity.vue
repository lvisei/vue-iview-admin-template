<template>
  <div class="user-set-security">
    <div class="user-set-security__title">安全设置</div>
    <i-form
      class="user-set-security__form"
      ref="form"
      :model="formData"
      :rules="ruleFrom"
      @keydown.enter.native="onOk"
    >
      <i-form-item label="旧密码" prop="passwdOld">
        <i-input type="password" v-model="formData.passwdOld" placeholder="请输入旧密码"></i-input>
      </i-form-item>
      <i-form-item label="新密码" prop="passwd">
        <i-input type="password" v-model="formData.passwd" placeholder="请输入新密码"></i-input>
      </i-form-item>
      <i-form-item label="确认密码" prop="passwdCheck">
        <i-input
          type="password"
          v-model="formData.passwdCheck"
          placeholder="请再次输入新密码"
        ></i-input>
      </i-form-item>
    </i-form>
    <i-button type="primary" @click="onOk" :loading="loading">更改密码</i-button>
  </div>
</template>

<script>
import { editUserPasswordApi } from '@/api/personal-center/user'

export default {
  name: 'UserSetSecurity',

  components: {},

  filters: {},

  props: {},

  data() {
    return {
      loading: false,
      formData: {
        passwdOld: '',
        passwd: '',
        passwdCheck: ''
      },
      ruleFrom: {
        passwdOld: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            message: '密码不能小于六位多余十八未',
            min: 6,
            max: 18,
            trigger: 'blur'
          }
        ],
        passwd: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            message: '密码不能小于六位多余十八未',
            min: 6,
            max: 18,
            trigger: 'blur'
          },
          { validator: this.validatePass, trigger: 'blur' }
        ],
        passwdCheck: [
          { required: true, message: '确认密码不能为空', trigger: 'blur' },
          {
            type: 'string',
            message: '密码不能小于六位多余十八未',
            min: 6,
            max: 18,
            trigger: 'blur'
          },
          { validator: this.validatePassCheck, trigger: 'blur' }
        ]
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  updated() {},

  activated() {},

  deactivated() {},

  destroyed() {},

  methods: {
    validatePass(rule, value, callback) {
      if (this.formData.passwdCheck !== '') this.$refs.form.validateField('passwdCheck')
      callback()
    },

    validatePassCheck(rule, value, callback) {
      if (value !== this.formData.passwd) {
        callback(new Error('两次输入不一致！'))
      } else {
        callback()
      }
    },

    onOk() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const oldPassword = this.formData.passwdOld
          const newPassword = this.formData.passwdCheck
          this.editUserPassword(oldPassword, newPassword)
        }
      })
    },

    editUserPassword(oldPassword, newPassword) {
      this.loading = true
      editUserPasswordApi(oldPassword, newPassword)
        .then(() => {
          this.$Message.success({
            content: '修改密码成功，请重新登录！',
            onClose: () => {
              this.$store.dispatch('user/resetToken').then(() => {
                location.reload()
              })
            }
          })
        })
        .catch(error => {
          // this.$refs.form.resetFields()
          this.$Message.error(error.message || '修改密码失败')
        })
        .finally(() => (this.loading = false))
    }
  }
}
</script>

<style lang="less">
.user-set-security {
  &__title {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    line-height: 28px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  &__form {
    width: 350px;
    .ivu-form-item-label {
      color: rgba(0, 0, 0, 0.85);
      font-size: 14px;

      &::before {
        content: '';
      }
    }
  }
}
</style>
