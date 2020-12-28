import { directive as clickaway } from 'vue-clickaway'

const install = function(Vue) {
  Vue.directive('click-outside', clickaway)
}

if (window.Vue) {
  window['click-outside'] = clickaway
  Vue.use(install) // eslint-disable-line
}

clickaway.install = install
export default clickaway
