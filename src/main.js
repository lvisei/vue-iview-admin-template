import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from './utils'
import ViewUI from 'view-design'
import request from './helpers/request'
import SvgIcon from '@/components/SvgIcon'
import Clipboard from 'v-clipboard'
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

/* Use plugins */

Vue.prototype.$utils = utils
Vue.prototype.$http = request

/* permission control */

import '@/permission'

/* Config */

Vue.config.productionTip = false

/* Initial */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
