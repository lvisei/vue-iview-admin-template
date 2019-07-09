import axios from 'axios'
import config from '@/config'
import store from '@/store'
import { Message } from 'iview'
import { getToken, removeToken } from '@/utils/auth'

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
  timeout: 10000,
  paramsSerializer: paramsSerializer
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

    // token
    const token = store.state.user.token
    token && (config.headers['Authorization'] = getToken())

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
    const res = response.data
    if (res.code !== 20000) {
      // 50008: illegal token; 50012: other client logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        tip('Login Timeout')
        removeToken()
        location.reload()
      } else {
        tip(res.message)
      }
      return Promise.reject('error')
    } else {
      return res
    }
  },
  error => {
    const { res, message } = error
    if (res) {
      // The request has been issued, but not in the range of 2 xx
      tip(`Status:${res.status},Message: ${res.data.message}`)
      return Promise.reject(res)
    } else if (message === repeatMsg) {
      tip('repeat message')
    } else {
      // To deal with broken network
      tip('Broken Network')
    }
    // eslint-disable-next-line
    console.log(`err:${error}`)
  }
)

export default request
