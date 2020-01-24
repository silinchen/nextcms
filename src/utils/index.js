import cryptoJS from 'crypto-js'
/**
 * 把数组转成树结构
 * @param {Array} data 
 * @param {String | Number} parentId 
 */
export const _createTree = (data, parentId = '', type = 0) => {
  const tree = []
  data.forEach((item, index) => {
    if((Array.isArray(item.parentId) && item.parentId.includes(parentId)) || item.parentId === parentId) {
      const children = _createTree(data, item._id, type)
      let newItem = {}
      switch(type) {
        case 0:
          newItem = { ...item }
          break
        case 1:
          newItem = { value: item._id, label: item.name }
          break
        case 2:
          newItem = { value: item._id, title: item.name , key: item._id }
          break
        default :
          newItem = { ...item }
          break
      }
      if(children.length > 0) newItem.children = children
      tree.push(newItem)
    }
  })
  return tree
}
export const createLabelAndValueTree = (data, parentId = '') => (_createTree(data, parentId, 1))

export const createTitleAndValueAndKeyTree = (data, parentId = '') => (_createTree(data, parentId, 2))

export const createTree = (data, parentId = '') => (_createTree(data, parentId))

export const findInTree = (data, value, fileds = 'value') => {
  for(let i = 0; i <= data.length - 1; i++) {
    const item = data[i]
    if(typeof item[fileds] !== 'undefined' && item[fileds] === value ) {
      return [item[fileds]]
    }
    if(item.children && item.children.length > 0) {
      const child = findInTree(item.children, value, fileds)
      if(child && child.length > 0) {
        return [item[fileds], ...child]
      }
    }
  }
  return []
}
/**
 * 检查密码强度/复杂度
 * @param {string} password // 密码
 * @param {boolea} returnLevel // 是否返回 level
 * 
 * @return [boolean|number] // 默认返回是否复杂密码，returnLevel 为 true 时，直接返回 level
 */
export const checkPasswordStrength = (password, returnLevel = false) => {
  // 最初级别
  let level = 0
  // 密码长度小于 8 位
  if (password.length < 8) { return returnLevel ? level : false }
  // 如果用户输入的密码 包含了数字
  (/\d/).test(password) && level++
  // 如果用户输入的密码 包含了小写的a到z
  (/[a-z]/).test(password) && level++
  // 如果用户输入的密码 包含了大写的A到Z
  (/[A-Z]/).test(password) && level++
  // 如果用户输入的密码 包含了特殊字符
  (/((?=[\x21-\x7e]+)[^A-Za-z0-9])/).test(password) && level++
  return returnLevel ? level : level >= 3
}

export const md5 = val => cryptoJS.MD5(String(val)).toString()
