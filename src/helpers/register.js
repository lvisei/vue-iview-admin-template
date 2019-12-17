/* register CustomComponents */

const register = (Vue, Components) => {
  Object.keys(Components).forEach(key => {
    Vue.component(key, Components[key])
  })
}

export default register
