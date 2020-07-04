<template>
  <i-form
    class="login-form"
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <i-form-item prop="username">
      <i-input v-model="form.username" placeholder="请输入用户名">
        <span slot="prefix">
          <i-icon :size="16" type="ios-person" />
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="password">
      <i-input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prefix">
          <i-icon :size="14" type="md-lock" />
        </span>
      </i-input>
    </i-form-item>
    <i-form-item prop="captchaCode">
      <i-row :gutter="16">
        <i-col span="16">
          <i-input v-model="form.captchaCode" placeholder="请输入验证码">
            <span slot="prefix">
              <i-icon :size="16" type="ios-image" />
            </span>
          </i-input>
        </i-col>
        <i-col span="8">
          <img
            class="login-form__captcha"
            :src="captchaUrl"
            alt="验证码"
            @click="handClickCaptcha"
          />
        </i-col>
      </i-row>
    </i-form-item>
    <i-form-item>
      <i-button @click="handleSubmit" type="primary" long :loading="loading">登录</i-button>
    </i-form-item>
  </i-form>
</template>

<script>
import { getCaptchaidApi, getCaptchaUrl } from '@/api/personal-center/user'

export default {
  name: 'LoginForm',

  props: {
    loading: {
      type: Boolean,
      default: false
    },
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '账号不能为空', trigger: 'blur' }]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: '密码不能为空', trigger: 'blur' }]
      }
    }
  },

  data() {
    return {
      captchaId: '',
      reloadCaptcha: '',
      form: {
        username: 'super-admin',
        password: 'super-admin',
        captchaCode: ''
      }
    }
  },

  computed: {
    captchaUrl() {
      const { captchaId, reloadCaptcha } = this
      return captchaId ? getCaptchaUrl(captchaId, reloadCaptcha) : ''
    },

    rules() {
      return {
        username: this.userNameRules,
        password: this.passwordRules
      }
    }
  },

  created() {
    getCaptchaidApi().then(({ captchaId }) => (this.captchaId = captchaId))
  },

  methods: {
    handClickCaptcha() {
      this.reloadCaptcha += 'reload'
    },

    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password,
            captchaCode: this.form.captchaCode,
            captchaId: this.captchaId
          })
        }
      })
    }
  }
}
</script>

<style lang="less">
.login-form {
  &-item {
    margin-bottom: 40px;

    &:last-child {
      margin-bottom: 10px;
    }
  }

  &__captcha {
    height: 33px;
  }
}
</style>
