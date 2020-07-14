export const formatMenusTree = (menusTree, titleKey, property = { expand: true }) => {
  const _menusTree = []
  for (let index = 0; index < menusTree.length; index++) {
    const item = menusTree[index]

    if (item.children) {
      _menusTree.push(
        Object.assign({}, item, {
          ...property,
          title: item[titleKey],
          children: formatMenusTree(item.children, titleKey, property)
        })
      )
    } else {
      _menusTree.push(Object.assign({}, item, { ...property, title: item[titleKey] }))
    }
  }

  return _menusTree
}
