import Login from '@/views/login/Login'
import MainView from '@/layouts/MainView'
import Dashboard from '@/views/dashboard/Dashboard'
import ParentView from '@/components/ParentView/ParentView'

/**
 * configurable parameters
 * hidden: true                        if `hidden:true` will not show in the sidebar(default is false)
 * name:'router-name'                  must set
 * meta : {
    auths: ['super_admin','admin']     set multiple roles, default is null
    title: 'title'                     the name show in submenu and breadcrumb
    icon: 'icon-name'                  the icon show in the sidebar,
    href: 'url'                        redirect url
  }
**/

const routes = [
  {
    path: '/login',
    name: 'login',
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
        name: 'dashboard',
        component: Dashboard,
        meta: { title: '仪表盘', icon: 'ios-speedometer-outline', auths: ['super_admin', 'admin'] }
      }
    ]
  }
]

export default routes
