import request from '@/util/request'

//  获取收货地址
export const getAddressList = () => {
  return request.get('/address/list')
}
