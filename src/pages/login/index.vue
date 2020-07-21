<template>
  <i-layout class="login-wrapper" ref="bg">
    <div class="login-content">
      <div class="login-header">
        <img src="~@/assets/images/logo.png" alt="logo" class="logo" />
        <span class="title">{{ siteName }}</span>
      </div>
      <i-card class="login-main" title="账户密码登录" shadow>
        <LoginForm :loading="loading" @on-success-valid="handleSubmit" />
        <p class="mark">
          <span>用户名：super-admin</span>
          <span>密码：super-admin</span>
        </p>
      </i-card>
    </div>
    <i-footer class="global-layout__footer">
      <global-footer />
    </i-footer>
  </i-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { siteName } from '@/config'
import GlobalFooter from '@/layouts/GlobalFooter'
import LoginForm from './LoginForm'
import CanvasNest from 'canvas-nest.js'

export default {
  name: 'Login',

  components: {
    LoginForm,
    GlobalFooter
  },

  data() {
    return {
      loading: false,
      siteName: siteName,
      canvasNest: null,
      canvasNestConfig: {
        color: '44, 140, 240',
        pointColor: '246, 228, 188',
        count: 220,
        zIndex: 0,
        opacity: 0.8
      }
    }
  },

  mounted() {
    this.canvasNest = new CanvasNest(this.$refs.bg.$el, this.canvasNestConfig)
  },

  beforeDestroy() {
    this.canvasNest.destroy()
  },

  methods: {
    ...mapActions('user', ['userLogin']),

    handleSubmit(data) {
      this.loading = true
      this.userLogin(data)
        .then(({ message }) => {
          this.loading = false
          this.$Message.success({
            content: '登陆成功~',
            onClose: () => {
              this.$router.push({ path: '/' })
            }
          })
        })
        .catch(error => {
          this.loading = false
          this.$Message.error(error.message)
        })
    }
  }
}
</script>

<style lang="less">
.login {
  &-wrapper {
    height: 100vh;
    &.ivu-layout {
      background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
      background-repeat: no-repeat;
      background-position: center 110px;
      background-size: 100%;
    }
  }

  &-content {
    z-index: 1;
    flex: 1;
    padding-top: 150px;
  }

  &-header {
    padding: 15px 0;
    font-size: 30px;
    font-weight: 500;
    text-align: center;

    .logo {
      height: 45px;
      margin: 0 15px;
      vertical-align: top;
    }

    .title {
      font-size: 28px;
      font-weight: 600;
    }
  }

  &-main {
    width: 368px;
    margin: 50px auto;
    .ivu-card-head {
      font-size: 16px;
      text-align: center;
      padding: 20px 0;

      p {
        color: #666;
      }
    }

    .ivu-card-body {
      padding: 30px;
    }

    .mark {
      color: #ccc;
      text-align: center;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
