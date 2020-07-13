export const formatMenusTree = (menusTree, titleKey, expandAll = true) => {
  const _menusTree = []
  for (let index = 0; index < menusTree.length; index++) {
    const item = menusTree[index]

    if (item.children) {
      _menusTree.push(
        Object.assign({}, item, {
          expand: expandAll,
          title: item[titleKey],
          children: formatMenusTree(item.children, titleKey, expandAll)
        })
      )
    } else {
      _menusTree.push(Object.assign({}, item, { expand: expandAll, title: item[titleKey] }))
    }
  }

  return _menusTree
}
