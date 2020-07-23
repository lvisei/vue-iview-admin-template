/**
 * 是否有子路由
 * @param 	{Array} route 路由 route
 * @returns {Boolean}
 */
const hasChild = route => {
  return route.children && route.children.length !== 0
}

/**
 * 通过路由列表得到菜单列表
 * @param 	{Array} routes 路由列表数组 routes
 * @returns {Array}
 */
export const getMenuList = routes => {
  let menuList = []
  routes.forEach(item => {
    if (!item.hidden) {
      const { name, meta, children } = item
      const route = {
        name: name,
        icon: (meta && meta.icon) || '',
        title: (meta && meta.title) || '',
        children: []
      }
      if (hasChild(item)) {
        route.children = getMenuList(children)
      }
      if (item.meta && item.meta.href) route.href = item.meta.href
      menuList.push(route)
    }
  })
  return menuList
}

/**
 * 获取当前匹配路由
 * @param 	{Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = routeMetched => {
  const list = routeMetched
    .map(item => {
      return {
        icon: item.meta.icon || '',
        name: item.meta.title || '首页',
        router: { name: item.name }
      }
    })
    .filter(item => !item.hidden)
  return list
}
