import axios from 'axios'
import store from '@/store'
import { Message } from 'view-design'

const REPEATREQUEST = 'REPEATREQUEST'
const { CancelToken } = axios
const cancelRequest = new Map()

/**
 * Serialization parameter
 * @param  {Object}    params
 * @return {encode}    encodeURI
 */
const paramsSerializer = params => {
  const result = Object.keys(params).map(key => {
    const value = params[key]
    const isString = typeof value === 'string'
    return `${key}=${isString ? value : JSON.stringify(value)}`
  })
  return encodeURI(result.join('&'))
}

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000 // request timeout
  // withCredentials: true, // send cookies when cross-domain requests
  // paramsSerializer: paramsSerializer
})

/**
 * prompt function
 * @param {String} msg
 * @param {string} [type='info']
 */
const tip = (msg, type = 'info') => {
  Message[type]({
    content: msg,
    duration: 10
  })
}

/**
 * Exception interception processing
 * @param {*} response
 * @returns {Promise}
 */
const errorHandler = response => {
  const { data } = response
  if (data && data.error) {
    const { error } = data
    const { code, message } = error
    // Token expired;
    if (code === 9999) {
      Message.info({
        content: 'Login Timeout',
        duration: 2,
        onClose() {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }
      })
    } else {
      const errCodeMap = {
        401: '无数据权限',
        404: '资源不存在',
        405: '方法不被允许',
        429: '请求过于频繁',
        500: '服务器发生错误'
      }
      errCodeMap[code] && tip(message)
    }
    return Promise.reject(error)
  } else {
    const { statusText, status } = response
    // The request has been issued, but not in the range of 2 xx
    tip(`Status:${status},Message: ${statusText}`)
    return Promise.reject(new Error(response || 'Error'))
  }
}

/**
 * request interceptor
 * @param  {Object} config
 * @return {Object}
 */
request.interceptors.request.use(
  config => {
    // do something before request is sent
    // const url = `${config.url}:${config.method}::${JSON.stringify(config.params)}`
    // if (cancelRequest.has(url)) {
    //   cancelRequest.get(url)(REPEATREQUEST)
    //   cancelRequest.delete(url)
    // }
    // config.cancelToken = new CancelToken(cancel => {
    //   cancelRequest.set(url, cancel)
    // })

    // Switch page to cancel request
    // https://github.com/dingFY/vue-iview3-admin/blob/master/src/api/axios.js#L72
    // https://github.com/chunpu/blog/issues/98

    // token
    const token = store.state.user.token
    token && (config.headers['Authorization'] = token)

    return config
  },
  error => {
    // Do something with request error
    // eslint-disable-next-line
    console.log(error)
    Promise.reject(error)
  }
)

/**
 * response interceptor
 * @param  {Object} response
 * @return {Object}
 */
request.interceptors.response.use(
  response => {
    const data = response.data
    const { error } = data
    if (error) {
      const { message } = error
      tip(message)
      return Promise.reject(data)
    }
    return data
  },
  error => {
    const { response, message } = error

    if (response) {
      return errorHandler(response)
    } else {
      if (message === REPEATREQUEST) {
        tip('数据请求中，请稍后')
      } else {
        // To deal with broken network
        tip(`Broken Network, ${error}`, 'error')
        // eslint-disable-next-line
        console.log(`err:${error}`)
      }
      return Promise.reject(error)
    }
  }
)

export default request
