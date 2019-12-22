import request from '@/helpers/request'
import sha1 from 'crypto-js/sha1'

/**
 * 用户登陆
 * @param {String} userName
 * @param {String} password
 * @returns {Promise}
 */
export function userLoginApi(userName, password) {
  const params = { userName, password }
  // const params = { userName, password: sha1(password).toString() }
  return request.post('/user/login', params)
}

/**
 * 用户退出登陆
 * @param {*}
 * @returns {Promise}
 */
export function userLogOutApi() {
  return request.get('/user/login/out')
}

/**
 * 获取用户信息
 * @param {*}
 * @returns {Promise}
 */
export function getUserInfoApi() {
  return request.get('/user')
}
