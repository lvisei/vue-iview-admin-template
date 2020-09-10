import MainView from '@/layouts/MainView'
// import RouteView from '@/layouts/RouteView'

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

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/pages/login'),
    meta: { title: '登陆' },
    hidden: true
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "error-page-404" */ '@/pages/error-page/404'),
    meta: { title: '404' },
    hidden: true
  },
  {
    path: '/401',
    component: () => import(/* webpackChunkName: "error-page-401" */ '@/pages/error-page/401'),
    meta: { title: '无权限' },
    hidden: true
  },
  {
    path: '/redirect',
    component: MainView,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import(/* webpackChunkName: "layouts-redirect" */ '@/layouts/Redirect')
      }
    ]
  }
]

const syncRoutes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: { title: '首页', icon: 'md-home' },
  //   component: MainView,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'dashboard',
  //       name: 'Dashboard',
  //       component: () => import(/* webpackChunkName: "dashboard" */ '@/pages/dashboard'),
  //       meta: { title: '仪表盘', icon: 'md-speedometer' }
  //     }
  //   ]
  // },
  // {
  //   path: '/system-management',
  //   name: 'SystemManagement',
  //   meta: { title: '系统管理', icon: 'md-settings' },
  //   component: MainView,
  //   redirect: '/dashboard',
  //   children: [
  //     {
  //       path: 'user-management',
  //       name: 'UserManagement',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "user-management" */ '@/pages/system-management/user-management'
  //         ),
  //       meta: { title: '用户管理', icon: 'md-person' }
  //     },
  //     {
  //       path: 'role-management',
  //       name: 'RoleManagement',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "role-management" */ '@/pages/system-management/role-management'
  //         ),
  //       meta: { title: '角色管理', icon: 'md-people' }
  //     },
  //     {
  //       path: 'menu-management',
  //       name: 'MenuManagement',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "menu-management" */ '@/pages/system-management/menu-management'
  //         ),
  //       meta: { title: '菜单管理', icon: 'md-menu' }
  //     },
  //     {
  //       path: 'resource-management',
  //       name: 'MenuManagement',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "resource-management" */ '@/pages/system-management/resource-management'
  //         ),
  //       meta: { title: '资源管理', icon: 'md-filing' }
  //     }
  //   ]
  // },
  {
    path: '/components-demo',
    name: 'ComponentsDemo',
    component: MainView,
    meta: { title: '组件实例', icon: 'ios-grid' },
    children: [
      {
        path: 'count-to',
        name: 'CountTo',
        component: () =>
          import(/* webpackChunkName: "count-to" */ '@/pages/components-demo/count-to'),
        meta: { title: 'count to' }
      },
      {
        path: 'back-to-top',
        name: 'BackToTop',
        component: () =>
          import(/* webpackChunkName: "back-to-top" */ '@/pages/components-demo/back-to-top'),
        meta: { title: 'back to top' }
      },
      {
        path: 'bpmn',
        name: 'Bpmn',
        component: () => import(/* webpackChunkName: "bpmn" */ '@/pages/components-demo/bpmn'),
        meta: { title: 'bpmn' }
      },
      {
        path: 'el-form-generator',
        name: 'ElFormGenerator',
        component: () =>
          import(
            /* webpackChunkName: "form-generator" */ '@/pages/components-demo/el-form-generator'
          ),
        meta: { title: 'el form generator' }
      },
      {
        path: 'table-form-generator',
        name: 'TableFormGenerator',
        component: () =>
          import(
            /* webpackChunkName: "table-form-generator" */ '@/pages/components-demo/table-form-generator'
          ),
        meta: { title: 'table form generator' }
      }
    ]
  },
  {
    path: '/maps-page',
    name: 'MapsPage',
    component: MainView,
    meta: { title: '地图', icon: 'md-map' },
    children: [
      {
        path: 'leaflet',
        name: 'Leaflet',
        component: () => import(/* webpackChunkName: "leaflet" */ '@/pages/maps/leaflet'),
        meta: { title: 'Leaflet', icon: 'md-map' }
      },
      {
        path: 'openlayers',
        name: 'Openlayers',
        component: () => import(/* webpackChunkName: "openlayers" */ '@/pages/maps/openlayers'),
        meta: { title: 'Openlayers', icon: 'md-map' }
      },
      {
        path: 'arcgis',
        name: 'ArcGIS',
        component: () => import(/* webpackChunkName: "arcgis" */ '@/pages/maps/arcgis'),
        meta: { title: 'ArcGIS', icon: 'md-map' }
      },
      {
        path: 'mapbox',
        name: 'Mapbox',
        component: () => import(/* webpackChunkName: "mapbox" */ '@/pages/maps/mapbox'),
        meta: { title: 'Mapbox', icon: 'md-map' }
      }
    ]
  },
  {
    path: '/list-page',
    name: 'ListPage',
    component: MainView,
    meta: { title: '列表页', icon: 'md-grid' },
    children: [
      {
        path: 'query-list',
        name: 'QueryList',
        component: () =>
          import(/* webpackChunkName: "query-list" */ '@/pages/list-page/query-list'),
        meta: { title: '查询表格', icon: 'md-list' }
      },
      {
        path: 'standard-list',
        name: 'StandardList',
        component: () =>
          import(/* webpackChunkName: "standard-list" */ '@/pages/list-page/standard-list'),
        meta: { title: '标准列表', icon: 'md-podium' }
      }
    ]
  },
  {
    path: '/user-page',
    name: 'UserPage',
    component: MainView,
    meta: { title: '个人页', icon: 'md-person' },
    children: [
      {
        path: 'user-center',
        name: 'UserCenter',
        component: () =>
          import(/* webpackChunkName: "user-center" */ '@/pages/user-page/user-center'),
        meta: { title: '个人中心', icon: 'logo-octocat' }
      },
      {
        path: 'user-set',
        name: 'UserSet',
        component: () => import(/* webpackChunkName: "user-set" */ '@/pages/user-page/user-set'),
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

export const asyncRoutes = [
  ...syncRoutes,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]
