import request from '@/helpers/request'

export const getUserListApi = params => {
  return request.get('/mock/users', { params: params })
}

export const addUserApi = params => {
  return new Promise((resolve, reject) => resolve())
}

export const updateUserApi = params => {
  return new Promise((resolve, reject) => resolve())
}

export const disbleUserApi = param => {
  return new Promise((resolve, reject) => resolve())
}

export const deleteUserApi = param => {
  return new Promise((resolve, reject) => resolve())
}
