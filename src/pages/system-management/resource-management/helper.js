export const formatResourcesTree = list => {
  const groupMap = {}
  list.forEach(item => {
    if (groupMap[item.group]) {
      groupMap[item.group].push(item)
    } else {
      groupMap[item.group] = [item]
    }
  })
  const resourceTree = Object.keys(groupMap).map(group => ({
    group,
    id: group,
    _showChildren: false,
    children: groupMap[group]
  }))

  return resourceTree
}
