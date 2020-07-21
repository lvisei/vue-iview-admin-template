import store from '@/store'
import { LoadingBar, Message } from 'view-design'

const whiteList = ['Login'] // no redirect whitelist

// const hasPermission = (rights, rigth) => {
//   return rigth !== undefined ? rights.includes(rigth) : 1
// }
// const canVisitor = visitor => {
//   return visitor !== undefined ? visitor : 0
// }

const permission = router => {
  router.beforeEach(async (to, from, next) => {
    LoadingBar.start()
    next()

    const token = store.getters.token

    if (token) {
      if (to.name === 'Login') {
        // 已登录且要跳转的页面是登录页 跳转到home页
        next({ name: 'MainView' })
        LoadingBar.finish()
      } else {
        // const roles = store.getters.roles
        // const HasRoles = roles && roles.length > 0
        const hasUser = store.getters.user.userName
        if (hasUser) {
          // if (hasPermission(roles, to.meta.auths)) {
          //   next()
          // } else {
          //   next({ path: '/401', replace: true })
          // }
          next()
        } else {
          try {
            // 获取用户信息
            await store.dispatch('user/getUserInfo')
            // generate accessible routes map based
            const accessRoutes = await store.dispatch('routes/getUserMenutree')
            console.log('accessRoutes: ', accessRoutes)

            // dynamically add accessible routes
            router.addRoutes(accessRoutes)

            // hack method to ensure that addRoutes is complete
            // set the replace: true, so the navigation will not leave a history record
            next({ ...to, replace: true })
          } catch (error) {
            await store.dispatch('user/resetToken')
            Message.error(error || 'Has Error')
            next({ name: 'Login', query: { redirect: to.path } })
            LoadingBar.finish()
          }
        }
      }
    } else {
      if (whiteList.indexOf(to.name) !== -1) {
        // 未登陆且要跳转的页面是登录页
        next()
      } else {
        // 未登录且要跳转的页面不是登录页 跳转到登录页
        next({ name: 'Login', query: { redirect: to.path } })
        LoadingBar.finish()
      }
    }
  })

  router.afterEach((to, from) => {
    // const title = to.meta && to.meta.title
    // if (title) document.title = title
    // finish progress bar
    LoadingBar.finish()
  })
}

export default permission
