import axios from 'axios'
import config from '@/config'
import store from '@/store'
import { Message } from 'iview'
import { getToken, removeToken } from '@/utils/auth'

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

// create an axios instance
const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 10000
})

/**
 * request interceptor
 * @param  {Object} config
 * @return {Object}
 */
request.interceptors.request.use(
  config => {
    // do something before request is sent
    let urlParams = config.url
    if (cancelRequest.has(urlParams)) {
      cancelRequest.get(urlParams)('Repeat Request')
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
    const { res } = error
    if (res) {
      // The request has been issued, but not in the range of 2 xx
      tip(`Status:${res.status},Message: ${res.data.message}`)
      return Promise.reject(res)
    } else {
      // To deal with broken network
      tip('Broken Network')
    }
    console.log(`err:${error}`)
  }
)

export default request
