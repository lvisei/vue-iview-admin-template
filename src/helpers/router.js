/**
 * 是否有子路由
 * @param 	{Array} list 路由列表数组 routes
 * @returns {Boolean}
 */
const hasChild = list => {
  return list.children && list.children.length !== 0
}

/**
 * 通过路由列表得到菜单列表
 * @param 	{Array} list 路由列表数组 routes
 * @returns {Array}
 */
export const getMenuList = list => {
  let res = []
  list.forEach(item => {
    if (item.meta && !item.hidden) {
      let obj = {
        name: item.name,
        icon: item.meta.icon || '',
        title: item.meta.title
      }
      if (hasChild(item)) {
        obj.children = getMenuList(item.children)
      }
      if (item.meta && item.meta.href) obj.href = item.meta.href
      res.push(obj)
    }
  })
  return res
}

/**
 * 获取当前匹配路由
 * @param 	{Array} routeMetched 当前路由metched
 * @returns {Array}
 */
export const getBreadCrumbList = routeMetched => {
  let res = routeMetched.map(item => {
    return {
      icon: item.meta.icon || '',
      name: item.meta.title || '首页',
      router: { name: item.name }
    }
  })
  res.filter(item => {
    return !item.hidden
  })
  return res
}
