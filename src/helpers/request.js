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
    if (data.code !== 20000) {
      // 20004: illegal token; 20003: Token expired;
      if (data.code === 20004 || data.code === 20003) {
        Message.info({
          content: 'Login Timeout',
          duration: 10,
          onClose() {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        })
      } else {
        tip(data.message)
      }
      return Promise.reject(new Error(data.message || 'Error'))
    } else {
      return data
    }
  },
  error => {
    const { response, message } = error
    if (response) {
      // The request has been issued, but not in the range of 2 xx
      tip(`Status:${response.status},Message: ${message}`)
      return Promise.reject(response)
    } else if (message === repeatMsg) {
      tip('repeat request')
    } else {
      // To deal with broken network
      tip(`Broken Network, ${message}`)
    }
    // eslint-disable-next-line
    console.log(`err:${error}`)
  }
)

export default request
