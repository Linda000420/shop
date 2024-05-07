import request from '@/util/request'

//  获取个人信息
export const getUserInfo = () => {
  return request.get('/user/info')
}
