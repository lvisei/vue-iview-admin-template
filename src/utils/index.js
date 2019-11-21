/**
 * 是否有子路由
 * @param 	{Array} list 路由列表数组 routes
 * @returns {Boolean}
 */
const hasChild = list => {
  return list.children && list.children.length !== 0
}

/**
 * 通过路由列表得到菜单列表
 * @param 	{Array} list 路由列表数组 routes
 * @returns {Array}
 */
const getMenuList = list => {
  let res = []
  list.forEach(item => {
    if (item.meta && !item.hidden) {
      let obj = {
        name: item.name,
        icon: item.meta.icon || '',
        title: item.meta.title
      }
      if (hasChild(item)) {
        obj.children = getMenuList(item.children)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      res.push(obj)
    }
  })
  return res
}

/**
 * 获取当前匹配路由
 * @param 	{Array} routeMetched 当前路由metched
 * @returns {Array}
 */
const getBreadCrumbList = routeMetched => {
  let res = routeMetched.map(item => {
    return {
      icon: item.meta.icon || '',
      name: item.meta.title || '首页',
      router: { name: item.name }
    }
  })
  res.filter(item => {
    return !item.hidden
  })
  return res
}

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

export default {
  getMenuList,
  getBreadCrumbList,
  onEvent,
  offEvent,
  debounce
}
