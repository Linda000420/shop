//  存放登录相关的请求接口
import request from '@/util/request'

//  获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}
