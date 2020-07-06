export const formatMenusTree = (menusTree, tileKey, expandAll = true) => {
  const _menusTree = []
  for (let index = 0; index < menusTree.length; index++) {
    const item = menusTree[index]

    if (item.children) {
      _menusTree.push(
        Object.assign({}, item, {
          expand: expandAll,
          title: item[tileKey],
          value: item.id,
          children: formatMenusTree(item.children, tileKey, expandAll)
        })
      )
    } else {
      _menusTree.push(
        Object.assign({}, item, { expand: expandAll, title: item[tileKey], value: item.id })
      )
    }
  }

  return _menusTree
}
