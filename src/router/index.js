import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import store from '@/store'
import { LoadingBar } from 'view-design'

Vue.use(Router)

const isDevelopment = process.env.NODE_ENV === 'development'

const router = new Router({
  routes: routes,
  mode: isDevelopment ? 'hash' : 'history'
})

const hasPermission = (rights, rigth) => {
  return rigth !== undefined ? rights.includes(rigth) : 1
}

const canVisitor = visitor => {
  return visitor !== undefined ? visitor : 0
}

router.beforeEach(async (to, from, next) => {
  LoadingBar.start()
  const token = store.getters.token
  const whiteList = ['Login'] // no redirect whitelist

  if (token) {
    if (to.name === 'Login') {
      // 已登录且要跳转的页面是登录页 跳转到home页
      next({ name: 'MainView' })
      LoadingBar.finish()
    } else {
      const roles = store.getters.roles
      const HasRoles = roles && roles.length > 1
      if (HasRoles) {
        if (hasPermission(roles, to.meta.auths)) {
          next()
        } else {
          next({ path: '/401', replace: true })
        }
      } else {
        try {
          await store.dispatch('user/getUserInfo')
          next()
        } catch (error) {
          await store.dispatch('user/resetToken')
          next({ name: 'Login' })
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.name) !== -1) {
      // 未登陆且要跳转的页面是登录页
      next()
    } else {
      // 未登录且要跳转的页面不是登录页 跳转到登录页
      next({ name: 'Login' })
      LoadingBar.finish()
    }
  }
})

router.afterEach((to, from) => {
  // const title = to.meta && to.meta.title
  // if (title) document.title = title

  LoadingBar.finish()
})

export default router
