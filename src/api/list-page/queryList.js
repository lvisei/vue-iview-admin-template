import request from '@/helpers/request'

export const getUserListApi = params => {
  return request.get('mock/user/search', { params: params })
}

export const addUserApi = params => {
  return request.post('mock/user/insert', params)
}

export const updateUserApi = params => {
  return request.post('mock/user/update', params)
}

export const disbleUserApi = param => {
  return request.post('mock/user/disable', param)
}

export const deleteUserApi = param => {
  return request.post('mock/user/delete', param)
}
