import axios from 'axios'
import { Toast } from 'vant'
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
    //  给提示
    Toast(res.message)
    //  抛出一个错误的 promise
    return Promise.reject(res.message)
  }
  return res
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 导出
export default instance
