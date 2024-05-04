//  存放登录相关的请求接口
import request from '@/util/request'

//  获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

//  获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}