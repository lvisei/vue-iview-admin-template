import axios from 'axios'
import store from '@/store'
import { Message } from 'view-design'

const repeatMsg = 'REPEATREQUEST'
const { CancelToken } = axios
let cancelRequest = new Map()

/**
 * prompt function
 * @param {String} msg
 */
const tip = msg => {
  Message.error({
    content: msg,
    duration: 10
  })
}

/**
 * Serialization parameter
 * @param  {Object}    params
 * @return {encode}    encodeURI
 */

function paramsSerializer(params) {
  let result = []
  for (let i in params) {
    let isObject = Object.prototype.hasOwnProperty.call(params, i) && typeof params[i] !== 'string'
    isObject ? result.push(`${i}=${JSON.stringify(params[i])}`) : result.push(`${i}=${params[i]}`)
  }
  return encodeURI(result.join('&'))
}

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
  // paramsSerializer: paramsSerializer
})

/**
 * request interceptor
 * @param  {Object} config
 * @return {Object}
 */
request.interceptors.request.use(
  config => {
    // do something before request is sent
    let urlParams = config.url + JSON.stringify(config.params)
    if (cancelRequest.has(urlParams)) {
      cancelRequest.get(urlParams)(repeatMsg)
    }
    config.cancelToken = new CancelToken(cancel => {
      cancelRequest.set(urlParams, cancel)
    })

    // Switch page to cancel request
    // https://github.com/dingFY/vue-iview3-admin/blob/master/src/api/axios.js#L72

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
      const { code, message } = error
      tip(message)
      return Promise.reject(data)
    }
    return data
  },
  error => {
    const { response } = error
    const { data } = response
    const { error: err } = data
    if (data && err) {
      const { code, message } = err
      // Token expired;
      if (code === 9999) {
        Message.info({
          content: 'Login Timeout',
          duration: 5,
          onClose() {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      } else {
        const errCodeMap = {
          401: '无访问权限',
          404: '资源不存在',
          405: '方法不被允许',
          429: '请求过于频繁',
          500: '服务器发生错误'
        }
        // TODO:
        // tip(message)
        return Promise.reject(data)
      }
    } else {
      const { statusText, status, message } = response
      if (response) {
        // The request has been issued, but not in the range of 2 xx
        tip(`Status:${status},Message: ${statusText}`)
        return Promise.reject(new Error(response || 'Error'))
      } else if (message === repeatMsg) {
        tip('repeat request')
      } else {
        // To deal with broken network
        tip(`Broken Network, ${message}`)
      }
      // eslint-disable-next-line
      console.log(`err:${error}`)
    }
  }
)

export default request
