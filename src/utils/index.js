/**
 * Localstorage 存储数据
 * @param {String} key
 * @param {Object} value
 * @returns
 */
export const setLocalstorage = (key, value) => {
  const storage = window.localStorage
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
  const storage = window.localStorage
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
  const storage = window.localStorage
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
 * 数据类型判断
 * @param {String} type
 * @param {any} data
 * @returns
 */
export const isType = (type, data) => {
  const Type = Object.prototype.toString.call(data).slice(8, -1)
  return Type === type
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

/**
 * addFavorite 加URL加入到收藏夹
 * @param {String} sURL
 * @param {String} sTitle
 */
export const addFavorite = (sURL, sTitle) => {
  try {
    window.external.addFavorite(sURL, sTitle)
  } catch (e) {
    try {
      window.sidebar.addPanel(sTitle, sURL, '')
    } catch (e) {
      alert('加入收藏失败，请使用Ctrl+D进行添加')
    }
  }
}

/**
 * scrollToTop 滚动到顶部
 */
export const scrollToTop = () => {
  const c = document.documentElement.scrollTop || document.body.scrollTop

  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}

/**
 * getFormatDate 时间日期格式转换
 * @param {String} dateString  "1995-12-17T03:24:00"
 * @param {String} format  "yyyy-MM-dd hh:mm:ss"
 * @returns "2020-05-29 12:32:12"
 */
export const getFormatDate = (dateString = null, format = 'yyyy-MM-dd hh:mm:ss') => {
  const date = new Date(dateString)
  const o = {
    'M+': date.getMonth() + 1, //month
    'd+': date.getDate(), //day
    'h+': date.getHours(), //hour
    'm+': date.getMinutes(), //minute
    's+': date.getSeconds(), //second
    'q+': Math.floor((date.getMonth() + 3) / 3), //quarter
    S: date.getMilliseconds() //millisecond
  }
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  }
  return format
}

/**
 * getTimeFormat 时间个性化输出
 * @param {String} time
 * @returns “XX分钟前”
 */
export const getTimeFormat = time => {
  // 1、< 60s, 显示为“刚刚”
  // 2、>= 1min && < 60 min, 显示与当前时间差“XX分钟前”
  // 3、>= 60min && < 1day, 显示与当前时间差“今天 XX:XX”
  // 4、>= 1day && < 1year, 显示日期“XX月XX日 XX:XX”
  // 5、>= 1year, 显示具体日期“XXXX年XX月XX日 XX:XX”
  let date = new Date(time),
    curDate = new Date(),
    year = date.getFullYear(),
    month = date.getMonth() + 10,
    day = date.getDate(),
    hour = date.getHours(),
    minute = date.getMinutes(),
    curYear = curDate.getFullYear(),
    curHour = curDate.getHours(),
    timeStr

  if (year < curYear) {
    timeStr = year + '年' + month + '月' + day + '日 ' + hour + ':' + minute
  } else {
    const pastTime = curDate - date,
      pastH = pastTime / 3600000

    if (pastH > curHour) {
      timeStr = month + '月' + day + '日 ' + hour + ':' + minute
    } else if (pastH >= 1) {
      timeStr = '今天 ' + hour + ':' + minute + '分'
    } else {
      const pastM = curDate.getMinutes() - minute
      if (pastM > 1) {
        timeStr = pastM + '分钟前'
      } else {
        timeStr = '刚刚'
      }
    }
  }

  return timeStr
}

export default {
  onEvent,
  offEvent,
  debounce,
  throttle,
  getFormatDate
}
