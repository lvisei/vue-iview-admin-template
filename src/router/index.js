import Vue from 'vue'
import Router from 'vue-router'
import { constantRoutes } from './routes'
import permission from './permission'

Vue.use(Router)

const isDevelopment = process.env.NODE_ENV === 'development'

const createRouter = () =>
  new Router({
    mode: isDevelopment ? 'hash' : 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

permission(router)

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
