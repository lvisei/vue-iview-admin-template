import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './utils'
import ViewUI from 'view-design'
import SvgIcon from '@/components/SvgIcon'
import Clipboard from 'v-clipboard'
import permission from '@/directive/permission'
import permissionHelper from './helpers/permission'
import request from './helpers/request'
import './registerServiceWorker'
// import Mock from './mock'

/* Import styles */

import '@/themes/common.less'
import '@/themes/iview-theme.less'
import '@/assets/icons'

/* Register component */

Vue.use(ViewUI)
Vue.component('svg-icon', SvgIcon)

/* Register directive */

Vue.use(Clipboard)
Vue.use(permission)

/* Use plugins */

Vue.prototype.$utils = utils
Vue.prototype.$http = request
Vue.prototype.$permission = permissionHelper

/* permission control */

import '@/permission'

/* Config */

Vue.config.productionTip = false
Vue.config.performance = process.env.NODE_ENV === 'development'

/* Initial */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
