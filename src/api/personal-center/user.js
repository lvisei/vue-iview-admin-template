import request from '@/helpers/request'
import sha1 from 'crypto-js/sha1'

/**
 * 获取验证码信息
 * @returns {Promise}
 */
export function getCaptchaidApi() {
  return request.get('/pub/login/captchaid')
}

/**
 * 响应图形验证码
 * @returns {Promise}
 */
export function getCaptchaUrl(id, reload) {
  return `${process.env.VUE_APP_BASE_API}/pub/login/captcha?id=${id}&reload=${reload}`
}

/**
 * 用户登陆
 * @param {String} userName
 * @param {String} password
 * @param {String} captchaCode
 * @param {String} captchaId
 * @returns {Promise}
 */
export function userLoginApi(userName, password, captchaCode, captchaId) {
  const params = { userName, password: sha1(password).toString(), captchaCode, captchaId }
  return request.post('/pub/login', params)
}

/**
 * 用户退出登陆
 * @returns {Promise}
 */
export function userLogOutApi() {
  return request.post('/pub/login/exit')
}

/**
 * 获取当前用户信息
 * @returns {Promise}
 */
export function getUserInfoApi() {
  return request.get('/pub/current/user')
}

/**
 * 查询当前用户菜单树
 * @returns {Promise}
 */
export function getUserMenutreeApi() {
  return request.get('/pub/current/menutree')
}

/**
 * 修改用户密码
 * @param {String} oldPassword
 * @param {String} newPassword
 * @returns
 */
export function editUserPasswordApi(oldPassword, newPassword) {
  const params = {
    newPassword: sha1(newPassword).toString(),
    oldPassword: sha1(oldPassword).toString()
  }
  return request.put('/pub/current/password', params)
}
