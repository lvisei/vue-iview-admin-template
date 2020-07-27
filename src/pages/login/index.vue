<template>
  <i-layout class="login-wrapper" ref="bg">
    <div class="login">
      <div class="login__header">
        <img src="~@/assets/images/logo.png" alt="logo" class="login__logo" />
        <span class="login__title">{{ siteName }}</span>
      </div>
      <i-card class="login__form-pane" title="账户密码登录" shadow>
        <LoginForm :loading="loading" :reload-captcha="reloadCaptcha" @on-submit="handleSubmit" />
        <p class="login__mark">
          <span>用户名：super-admin</span>
          <span>密码：super-admin</span>
        </p>
      </i-card>
    </div>
    <i-footer class="global-layout__footer">
      <GlobalFooter />
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
      },
      reloadCaptcha: '',
      redirectPath: undefined,
      otherQuery: {}
    }
  },

  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirectPath = query.redirectPath
          this.otherQuery = Object.keys(query).reduce((acc, cur) => {
            if (cur !== 'redirectPath') {
              acc[cur] = query[cur]
            }
            return acc
          }, {})
        }
      },
      immediate: true
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
              this.$router
                .push({ path: this.redirectPath || '/', query: this.otherQuery })
                .catch(err => console.log(err))
            }
          })
        })
        .catch(error => {
          this.reloadCaptcha = new Date().getTime().toString()
          this.loading = false
          this.$Message.error(error.message)
        })
    }
  }
}
</script>

<style lang="less">
.login-wrapper {
  height: 100vh;
  &.ivu-layout {
    background-image: url(https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg);
    background-repeat: no-repeat;
    background-position: center 110px;
    background-size: 100%;
  }
}

.login {
  z-index: 1;
  flex: 1;
  padding-top: 150px;

  &__header {
    padding: 15px 0;
    font-size: 30px;
    font-weight: 500;
    text-align: center;
  }

  &__logo {
    height: 45px;
    margin: 0 15px;
    vertical-align: top;
  }

  &__title {
    font-size: 28px;
    font-weight: 600;
  }

  &__form-pane {
    width: 368px;
    margin: 50px auto;

    .ivu-card-head {
      font-size: 16px;
      text-align: center;
      padding: 20px 0;
    }

    .ivu-card-body {
      padding: 30px;
    }
  }

  &__mark {
    color: #ccc;
    text-align: center;
    display: flex;
    justify-content: space-between;
  }
}
</style>
