import request from '@/helpers/request'

export const getUserListApi = params => {
  return request.get('user/select/search', { params: params })
}

export const addUserApi = params => {
  return request.post('user/insert', params)
}

export const updateUserApi = params => {
  return request.post('user/update', params)
}

export const disbleUserApi = param => {
  return request.post('user/disable', param)
}

export const deleteUserApi = param => {
  return request.post('user/delete', param)
}
