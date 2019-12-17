import Mock from 'mockjs'
import { getParams } from '@/utils'

const { Random } = Mock

const T_USER = {
  super_admin: {
    name: 'super_admin',
    user_id: '1',
    auths: ['super_admin', 'admin'],
    token: 'super_admin',
    avatar: Random.dataImage('200x200', 'super_admin')
  },
  admin: {
    name: 'admin',
    user_id: '2',
    auths: ['admin'],
    token: 'admin',
    avatar: Random.dataImage('200x200', 'admin')
  }
}

const status = { success: true, data: null, code: 20000, message: '请求成功' }

const login = req => {
  req = JSON.parse(req.body)
  if (T_USER[req.username]) {
    return { ...status, data: { token: T_USER[req.username].token } }
  } else {
    return { ...status, success: false, message: '账户或密码错误' }
  }
}

const getUserInfo = req => {
  const params = getParams(req.url)
  if (T_USER[params.token]) {
    return { ...status, data: T_USER[params.token] }
  } else {
    return { ...status, code: 50014, success: false, message: 'Token expired' }
  }
}

const logout = req => {
  return { ...status, message: '退出登陆成功' }
}

export default {
  login,
  getUserInfo,
  logout
}
