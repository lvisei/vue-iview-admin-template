import request from '@/helpers/request'

/**
 * 分页查询菜单列表
 * @param {Object} params
 * @returns {Promise}
 */
export const getMenus = params => {
  return request.get('/menus', { params })
}

/**
 * 查询菜单树
 * @param {Number} parentID 父级ID
 * @param {String} status 状态(1:启用 2:禁用)
 * @returns {Promise}
 */
export const getMenusTree = (parentID, status) => {
  const params = { parentID, status }
  return request.get('/menus.tree', { params })
}

/**
 * 创建菜单
 * @param {Object} params
 * @returns {Promise}
 */
export const addMenus = params => {
  return request.post(`/menus`, params)
}

/**
 * 查询菜单
 * @param {String} id 菜单ID
 * @returns {Promise}
 */
export const getMenu = id => {
  return request.get(`/menus/${id}`)
}

/**
 * 更新菜单
 * @param {String} id 菜单ID
 * @param {Object} params
 * @returns {Promise}
 */
export const editMenus = (id, params) => {
  return request.put(`/menus/${id}`, params)
}

/**
 * 更新菜单状态
 * @param {String} id 菜单ID
 * @param {String} status 状态(1:启用 2:禁用)
 * @returns {Promise}
 */
export const editMenusStatus = (id, status) => {
  return request.patch(`/menus/${id}/${status === 1 ? 'enable' : 'disable'}`)
}

/**
 * 删除菜单
 * @param {String} id 菜单ID
 * @returns {Promise}
 */
export const deleteMenu = id => {
  return request.delete(`/menus/${id}`)
}
