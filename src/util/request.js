import axios from 'axios'
import { Toast } from 'vant'
import store from '@/store'
// 创建 axios 实例，将来对创建出来的实例进行自定义配置
// 不会污染原始的 axios 实例
const instance = axios.create({
  baseURL: 'http://smart-shop.itheima.net/index.php?s=/api',
  timeout: 5000
})

// 自定义配置 - 请求/响应 拦截器
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  //  开启 loading，禁止背景点击（节流处理，防止多次无效触发）
  Toast.loading({
    message: '加载中...',
    forbidClick: true,
    loadingType: 'spinner', //  配置 loading 图标
    duration: 0 //  不会自动消失
  })

  //  有 token 就在请求时携带，便于请求需要授权的接口
  const token = store.getters.token
  if (token) {
    config.headers['Access-Token'] = token
    config.headers.platform = 'H5'
  }

  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么（默认 axios 会多包装一层 data，需要响应拦截器中处理一下）
  const res = response.data
  if (res.status !== 200) {
    //  给错误提示
    //  Toast 默认是单例模式，后面调用会覆盖前一个，只能存在一个
    Toast(res.message)
    //  抛出一个错误的 promise
    return Promise.reject(res.message)
  } else {
    //  正确情况直接走业务核心逻辑
    //  清除 toast 提示
    Toast.clear()
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
