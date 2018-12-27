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
 * 去抖
 * @param {Function} func
 * @param {String} wait
 * @param {Boolean} immediate
 * @returns
 */
const debounce = (func, wait, immediate) => {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export default {
  getMenuList,
  getBreadCrumbList,
  onEvent,
  offEvent,
  debounce
}
