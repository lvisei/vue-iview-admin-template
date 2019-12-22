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
        meta: { title: '仪表盘', icon: 'ios-speedometer-outline' }
      },
      {
        path: 'list-page',
        name: 'ListPage',
        component: RouteView,
        meta: { title: '列表页', icon: 'md-grid' },
        children: [
          {
            path: 'query-list',
            name: 'QueryList',
            component: () =>
              import(/* webpackChunkName: "QueryList" */ '@/pages/list-page/query-list'),
            meta: { title: '查询表格', icon: 'md-list' }
          },
          {
            path: 'standard-list',
            name: 'StandardList',
            component: () =>
              import(/* webpackChunkName: "StandardList" */ '@/pages/list-page/standard-list'),
            meta: { title: '标准列表', icon: 'md-podium' }
          }
        ]
      },
      {
        path: 'components-demo',
        name: 'ComponentsDemo',
        component: RouteView,
        meta: { title: '组件实例', icon: 'ios-grid' },
        children: [
          {
            path: 'back-to-top',
            name: 'BackToTop',
            component: () =>
              import(/* webpackChunkName: "back-to-top" */ '@/pages/components-demo/back-to-top'),
            meta: { title: '返回顶部' }
          },
          {
            path: 'count-to',
            name: 'CountTo',
            component: () =>
              import(/* webpackChunkName: "CountTo" */ '@/pages/components-demo/count-to'),
            meta: { title: 'CountTo' }
          },
          {
            path: 'bpmn',
            name: 'Bpmn',
            component: () => import(/* webpackChunkName: "Bpmn" */ '@/pages/components-demo/bpmn'),
            meta: { title: 'Bpmn' }
          }
        ]
      },
      {
        path: 'maps-page',
        name: 'MapsPage',
        component: RouteView,
        meta: { title: '地图', icon: 'md-map' },
        children: [
          {
            path: 'leaflet-maps',
            name: 'LeafletMaps',
            component: () =>
              import(/* webpackChunkName: "LeafletMaps" */ '@/pages/maps/leaflet-maps'),
            meta: { title: 'leaflet-maps', icon: 'md-map' }
          }
        ]
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
      },
      {
        name: 'Documentation',
        path: '/external-link',
        meta: {
          title: '文档',
          icon: 'md-open',
          href: 'https://liuvigongzuoshi.github.io/vue-iview-admin-template/'
        }
      }
    ]
  }
]

export default routes
