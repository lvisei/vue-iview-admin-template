import store from '@/store'
import { isType } from '@/utils'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permissions = store.getters && store.getters.permissions

    if (value && isType('Array', value) && value.length > 0) {
      const permissionRights = value
      const hasPermission = permissions.some(permission => {
        return permissionRights.includes(permission)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else if (value && isType('String', value)) {
      const hasPermission = permissions.some(permission => permission === value)

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(
        `need rights! Like v-permission="'module.add'" or v-permission="['module.add','module.edit']"`
      )
    }
  }
}
