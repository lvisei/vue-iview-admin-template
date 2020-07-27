import request from '@/helpers/request'

/**
 * 分页查询角色列表
 * @param {Object} params
 * @returns {Promise}
 */
export const getRoles = params => {
  return request.get('/roles', { params })
}

/**
 * 查询全部角色
 * @param {String} queryValue 关键字
 * @param {String} status 状态(1:启用 2:禁用)
 * @returns {Promise}
 */
export const getAllRoles = (queryValue, status) => {
  const params = { queryValue, status }
  return request.get('/roles.select', { params })
}

/**
 * 创建角色
 * @param {Object} params
 * @returns {Promise}
 */
export const addRoles = params => {
  return request.post(`/roles`, params)
}

/**
 * 查询角色
 * @param {String} id 角色ID
 * @returns {Promise}
 */
export const getRole = id => {
  return request.get(`/roles/${id}`)
}

/**
 * 更新角色
 * @param {String} id 角色ID
 * @param {Object} params
 * @returns {Promise}
 */
export const editRoles = (id, params) => {
  return request.put(`/roles/${id}`, params)
}

/**
 * 更新角色状态
 * @param {String} id 角色ID
 * @param {String} status 状态(1:启用 2:禁用)
 * @returns {Promise}
 */
export const editRolesStatus = (id, status) => {
  return request.patch(`/roles/${id}/${status === 1 ? 'enable' : 'disable'}`)
}

/**
 * 删除角色
 * @param {String} id 角色ID
 * @returns {Promise}
 */
export const deleteRole = id => {
  return request.delete(`/roles/${id}`)
}
