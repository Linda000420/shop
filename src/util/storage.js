//  约定通用键名
const INFO_KEY = 'shop_info'
const HISTORY_KEY = 'history_list'

//  获取个人信息
export const getInfo = () => {
  const defultObj = { token: '', userId: '' }
  const res = localStorage.getItem(INFO_KEY)
  return res ? JSON.parse(res) : defultObj
}

//  设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(obj))
}

//  移除个人信息
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}

//  获取搜索历史
export const getHistory = () => {
  const res = localStorage.getItem(HISTORY_KEY)
  return res ? JSON.parse(res) : []
}

//  设置搜索历史
export const setHistory = (arr) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(arr))
}
