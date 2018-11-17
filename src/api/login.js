import request from '@/utils/request'

export const loginApi = (username, password) => {
  return request.post('/login/login', { username, password })
}

export const logoutApi = () => {
  return request.post('/login/logout')
}

export const getUserInfoApi = token => {
  return request.get('/login/info', { params: { token } })
}
