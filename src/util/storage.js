//  约定通用键名
const INFO_KEY = 'shop_info'

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
