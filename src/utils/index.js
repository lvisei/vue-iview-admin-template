/**
 * Localstorage 存储数据
 * @param {String} key
 * @param {Object} value
 * @returns
 */
export const setLocalstorage = (key, value) => {
  var storage = window.localStorage
  if (!storage) {
    window.alert('浏览器不支持localstorage')
    return false
  }
  storage.setItem(key, JSON.stringify(value))
}

/**
 * Localstorage 提取存储
 * @param   {String} key
 * @returns {Boolean} Boolean or String
 */
export const getLocalstorage = key => {
  var storage = window.localStorage
  if (!storage) {
    window.alert('浏览器不支持localstorage')
    return false
  }
  let value = storage.getItem(key)
  return value ? JSON.parse(value) : false
}

/**
 * Localstorage 删除存储
 * @param {String} key
 * @returns
 */
export const removeLocalstorage = key => {
  var storage = window.localStorage
  if (!storage) {
    window.alert('浏览器不支持localstorage')
    return false
  }
  storage.removeItem(key)
}

/**
 * 绑定事件
 * @param {String} element 监听的dom
 * @param {String} event 监听事件类型的字符串
 * @param {Function} handler listener callback
 */
export const onEvent = (function() {
  if (document.addEventListener) {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.addEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event && handler) {
        element.attachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 解绑事件
 * @param {String} element 监听的dom
 * @param {String} event 监听事件类型的字符串
 * @param {Function} handler listener callback
 */
export const offEvent = (function() {
  if (document.removeEventListener) {
    return function(element, event, handler) {
      if (element && event) {
        element.removeEventListener(event, handler, false)
      }
    }
  } else {
    return function(element, event, handler) {
      if (element && event) {
        element.detachEvent('on' + event, handler)
      }
    }
  }
})()

/**
 * 从URL中解析参数
 * @param   {String} url
 * @returns {String}
 */
export const getParams = url => {
  const keyValueArr = url.split('?')[1].split('&')
  let paramObj = {}
  keyValueArr.forEach(item => {
    const keyValue = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}

/**
 * 防抖 首次不执行
 * @param {Function} fn
 * @param {Number} time
 * @returns
 */
export const debounce = (fn, time) => {
  let timeout

  return function(...args) {
    const context = this
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn.apply(context, args)
      timeout = null
    }, time)
  }
}

/**
 * 节流 首次不执行
 * @param {Function} fn
 * @param {Number} time
 * @returns
 */
export const throttle = (fn, time) => {
  let timeout

  return function(...args) {
    const context = this
    if (timeout) return
    timeout = setTimeout(() => {
      fn.apply(context, args)
      timeout = null
    }, time)
  }
}

/**
 * 列表数据转换为树数据
 * @param {Array} list
 * @param {Object} value
 * @returns
 */
export const generateOrganizationTree = (list, config) => {
  const id = config.id || 'id'
  const pid = config.pid || 'pid'
  const children = config.children || 'children'
  const lable = config.lable || 'lable'
  const pConfig = config.pConfig || {}
  const pConfigKey = Object.keys(pConfig)
  const idMap = {}
  const jsonTree = []
  list.forEach(v => (idMap[v[id]] = v))
  list.forEach(v => {
    const parent = idMap[v[pid]]
    if (parent) {
      !parent[children] && (parent[children] = [])
      v['title'] = v[lable]
      parent[children].push(v)
    } else {
      pConfigKey.forEach(key => {
        v[key] = pConfig[key]
      })
      v['title'] = v[lable]
      jsonTree.push(v)
    }
  })

  return jsonTree
}

export default {
  onEvent,
  offEvent,
  debounce,
  throttle
}
