import store from '@/store'
import { isType } from '@/utils'

/**
 * @param {Array} value
 * @returns {Boolean}
 */
export default function checkPermission(value) {
  if (value && isType('Array', value) && value.length > 0) {
    const permissions = store.getters && store.getters.permissions
    const hasPermission = permissions.some(permission => {
      return value.includes(permission)
    })

    return hasPermission
  } else if (value && isType('String', value)) {
    const permissions = store.getters && store.getters.permissions
    const hasPermission = permissions.some(permission => permission === value)

    return hasPermission
  } else {
    console.error(`need permissions!  value like 'module.add' or ['module.add','module.edit']`)
    return false
  }
}
