// 封装axios用于发送请求
import axios from 'axios'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net/', // 你的API基础URL
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  }, error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data
  }, error => {
    // 对响应错误做点什么
    if (error.response) {
      Message.error(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

export default request
