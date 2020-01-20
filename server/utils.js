const isParent = (parent, parentId) => {
  if(parent instanceof Array) {
    return parent.includes(parentId)
  } else {
    return parent === parentId
  }
}
const createTree = (data, parentId = '', parentField='parentId') => {
  const tree = []
  data.forEach(item => {
    const newItem = { ...item }
    if(isParent(newItem[parentField], parentId)) {
      const children = createTree(data, String(newItem._id))
      if(children.length > 0) {
        newItem.children = children
      }
      tree.push(newItem)
    }
  })
  return tree
}

module.exports = {
  createTree
}
