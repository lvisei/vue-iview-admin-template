export const getChildrenRoleMenus = childrenMenus => {
  const roleMenus = []
  for (let index = 0; index < childrenMenus.length; index++) {
    const item = childrenMenus[index]
    const _roleMenus = item.actions
      ? item.actions.map(({ id: actionId, menuId }) => ({ actionId, menuId }))
      : [{ menuId: item.id }]
    const _roleMenusChildren = item.children ? getChildrenRoleMenus(item.children) : []
    roleMenus.push(..._roleMenus, ..._roleMenusChildren)
  }
  return roleMenus
}
