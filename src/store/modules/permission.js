import { asyncRoutes, constantRoutes } from '@/router/routes'
import { getUserMenutreeApi } from '@/api/personal-center/user'
import MainView from '@/layouts/MainView'
import RouteView from '@/layouts/RouteView'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Use names to determine if the current user has permission
 * @param names
 * @param route
 */
function hasPathPermission(paths, route) {
  if (route.path) {
    return paths.some(path => route.path === path.path)
  } else {
    return true
  }
}

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * @param routes
 */
export function generaMenu(routes, data) {
  data.forEach(item => {
    const menu = {
      name: item.routeName,
      path: item.routePath,
      component: loadComponent(item.component),
      hidden: item.showStatus === 0,
      children: [],
      meta: { title: item.name, icon: item.icon }
    }
    if (item.children) {
      generaMenu(menu.children, item.children)
    }
    routes.push(menu)
  })
}

/**
 * 路由懒加载
 * @param {String} view
 * @returns {Promise}
 */
const loadComponent = component => {
  const componentPath = component.startsWith('/layouts/') ? `@${component}` : `@/pages${component}`
  return () => import(componentPath)
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param components
 */
export function filterAsyncPathRoutes(routes, paths) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPathPermission(paths, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncPathRoutes(tmp.children, paths)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  getUserMenutree: async ({ commit }) => {
    try {
      const data = await getUserMenutreeApi()
      const { list } = data

      generaMenu(asyncRoutes[0].children, list)
      // asyncRoutes.children.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', asyncRoutes)

      return asyncRoutes
    } catch (err) {
      console.log(err) // eslint-disable-line
      return Promise.reject(err)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
