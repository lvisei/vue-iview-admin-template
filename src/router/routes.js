import Login from '@/pages/login'
import MainView from '@/layouts/MainView'
import RouteView from '@/layouts/RouteView'
import Dashboard from '@/pages/dashboard'

/**
 * configurable parameters under the routing '/'
 * hidden: true                        if `hidden:true` will not show in the sidebar, default is false
 * name:'router-name'                  must set and globally unique
 * meta : {
    auths: ['super_admin','admin']     set multiple roles, default is null
    title: 'title'                     the name show in submenu and breadcrumb, must set
    icon: 'icon-name'                  the icon show in the sidebar, must set
    href: 'url'                        redirect url
  }
**/

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { title: '登陆' }
  },
  {
    path: '/',
    name: 'MainView',
    component: MainView,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: '仪表盘', icon: 'ios-speedometer-outline', auths: ['super_admin', 'admin'] }
      },
      {
        path: 'user-page',
        name: 'UserPage',
        component: RouteView,
        meta: { title: '个人页', icon: 'md-person' },
        children: [
          {
            path: 'user-center',
            name: 'UserCenter',
            component: () =>
              import(/* webpackChunkName: "UserCenter" */ '@/pages/user-page/user-center'),
            meta: { title: '个人中心', icon: 'logo-octocat' }
          },
          {
            path: 'user-set',
            name: 'UserSet',
            component: () => import(/* webpackChunkName: "UserSet" */ '@/pages/user-page/user-set'),
            meta: { title: '个人设置', icon: 'ios-settings' }
          }
        ]
      }
    ]
  }
]

export default routes
