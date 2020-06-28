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
 * @param {String} username
 * @param {String} password
 * @param {String} captchaCode
 * @param {String} captchaId
 * @returns {Promise}
 */
export function userLoginApi(username, password, captchaCode, captchaId) {
  const params = {
    user_name: username,
    password: sha1(password).toString(),
    captcha_code: captchaCode,
    captcha_id: captchaId
  }
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
 * 获取用户信息
 * @returns {Promise}
 */
export function getUserInfoApi() {
  return request.get('/pub/current/user')
}

/**
 * 修改用户密码
 * @param {String} old_password
 * @param {String} new_password
 * @returns
 */
export function editUserPasswordApi(old_password, new_password) {
  const params = {
    new_password: sha1(new_password).toString(),
    old_password: sha1(old_password).toString()
  }
  return request.put('/pub/current/password', params)
}
