import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import utils from './utils'
import ViewUI from 'view-design'
import SvgIcon from '@/components/SvgIcon'
// import Mock from './mock'
import request from './utils/request'
import './registerServiceWorker'

/* Import styles */

import '@/themes/common.less'
import '@/themes/iview-theme.less'
import '@/assets/icons'

/* Register component */

Vue.use(ViewUI)
Vue.component('svg-icon', SvgIcon)

/* Use plugins */

Vue.prototype.$utils = utils
Vue.prototype.$http = request

/* Config */

Vue.config.productionTip = false

/* Initial */

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
