import request from '@/helpers/request'

/**
 * 分页查询资源列表
 * @param {Object} params
 * @returns {Promise}
 */
export const getResources = params => {
  return request.get('/resources', { params })
}

/**
 * 查询全部资源
 * @param {String} queryValue 关键字
 * @returns {Promise}
 */
export const getAllResources = queryValue => {
  const params = { queryValue }
  return request.get('/resources.select', { params })
}

/**
 * 创建资源
 * @param {Object} params
 * @returns {Promise}
 */
export const addResources = params => {
  return request.post(`/resources`, params)
}

/**
 * 查询资源
 * @param {String} id 资源ID
 * @returns {Promise}
 */
export const getMenu = id => {
  return request.get(`/resources/${id}`)
}

/**
 * 更新资源
 * @param {String} id 资源ID
 * @param {Object} params
 * @returns {Promise}
 */
export const editResources = (id, params) => {
  return request.put(`/resources/${id}`, params)
}

/**
 * 删除资源
 * @param {String} id 资源ID
 * @returns {Promise}
 */
export const deleteMenu = id => {
  return request.delete(`/resources/${id}`)
}
