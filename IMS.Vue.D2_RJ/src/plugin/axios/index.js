import util from '@/libs/util'
import store from '@/store'
import axios from 'axios'
import { Message } from 'element-ui'

// 创建一个错误
function errorCreate (msg) {
  const error = new Error(msg)
  errorLog(error)
  // throw error
}
// 记录和显示错误
function errorLog (error) {
  // 添加到日志
  store.dispatch('d2admin/log/push', {
    message: '数据请求异常',
    type: 'danger',
    meta: {
      error
    }
  })
  // 打印到控制台
  if (process.env.NODE_ENV === 'development') {
    util.log.danger('>>>>>> Error >>>>>>')
    console.log(error)
  }
  // 显示提示
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
}

// 创建一个 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API,
  timeout: 60000 * 5 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在请求发送之前做一些处理
    const token = util.cookies.get('token')
    // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    config.headers['Authorization'] = `Bearer ${token}`
    const lang = {
      'zh-chs': 'zh-CN,zh;',
      en: 'en-US,en;'
    }
    config.headers['Accept-Language'] = lang[util.cookies.get('lang')]
    return config
  },
  error => {
    // 发送失败
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // dataAxios 是 axios 返回数据中的 data
    const dataAxios = response.data
    const { ErrorInfo } = dataAxios
    if (ErrorInfo && ErrorInfo.Status !== false) { // 系统级别异常
      const msg = ErrorInfo.Message || '操作失败'
      if (process.env.NODE_ENV === 'development') {
        errorCreate(`[code: ${response.status}] ${msg}: ${response.config.url}`)
      } else {
        errorCreate(msg)
      }
      return Promise.resolve({
        message: ErrorInfo.Message,
        warnResult: dataAxios.Result
      })
    }
    return dataAxios
  },
  error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400: error.message = '请求错误'; break
        case 401: error.message = '未授权，请登录'; break
        case 403: error.message = '拒绝访问'; break
        case 404: error.message = `请求地址出错: ${error.response.config.url}`; break
        case 408: error.message = '请求超时'; break
        case 500: error.message = '服务器内部错误'; break
        case 501: error.message = '服务未实现'; break
        case 502: error.message = '网关错误'; break
        case 503: error.message = '服务不可用'; break
        case 504: error.message = '网关超时'; break
        case 505: error.message = 'HTTP版本不受支持'; break
        default: break
      }
    }
    errorLog(error)
    return Promise.reject(error)
  }
)

export default service
