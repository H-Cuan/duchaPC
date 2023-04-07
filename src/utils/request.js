import axios from 'axios'
import {
  Message
} from 'element-ui'
import { refresh } from '@/api/user.js'
// import {process}  from "../utils/request"
import router from '@/router'
const Token = window.localStorage.getItem('Token')
const accessToken = window.localStorage.getItem('access_token')
const request = axios.create({
  //  baseURL: process.env.NODE_ENV === 'production' ? window.config.request : process.env.BASE_API,
  baseURL: '/api',
  // baseURL: "http://13.129.190.252:8085/",
  timeout: 20000,
  withCredentials: true,
  SameSite: 'None',
  headers: {
    Authorization: `Bearer ${Token}`,
    'x-api-header': 'yuanxibing',
    'x-access-token': accessToken
  }
  // changeOrigin: true
}
)
// 全局loading
/* eslint-disable no-unused-vars */ const loading = null
// 响应处理
request.interceptors.response.use(res => {
  if (/m3u8/.test(res.data)) {
    return res.data
  }
  if (res.data.code === 10001 || res.data.code === 10006) {
    refresh().then(res => {
      window.sessionStorage.setItem('Token', res.data.token)
    })
    return Promise.reject(res.data.data.message)
  } else if (res.data.code === 10000) {
    return res.data
  } else {
    Message.error(res.data.message)
    if (res.data.message === 'token 被加入黑名单' || res.data.message === '登录用户不合法') {
      window.sessionStorage.clear()
      router.push('/')
      return
    }
    return Promise.reject(res.data.message)
  }
  // return res.data
}, err => {
  Message.error({
    message: err.message
  })
  return Promise.reject(err)
})
// 请求处理
request.interceptors.request.use(config => {
  if (config.url !== 'login') {
    config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('Token')
    // config.headers.withCredentials = false
  }
  if (config.url === 'upload/image') {
    config.headers['Content-Type'] = 'multipart/form-data'
  }
  // if (config.url == "SystemUser/SystemLogin") {   // 如果是登录页直接return
  //     return config
  // }

  return config
}, function (error) {
  Message.error({
    message: '请求超时!'
  })
  return Promise.reject(error)
})
// class Plant {
//     constructor(url) {
//         this.url = url
//     }
//     get(params) {
//         return request.get(this.url, { params })
//     }
//     add(params) {
//         return request.post(this.url, params)
//     }
//     put(id, params) {
//         return request.put(`${this.url}/${id}`, params)
//     }
//     del(id) {
//         return request.delete(`${this.url}/${id}`)
//     }
// }

function Plant (url) {
  this.url = url
  this.get = function (params) {
    return request.get(this.url, { params })
  }
  this.add = function (params) {
    return request.post(this.url, params)
  }
  this.put = function (id, params) {
    return request.put(`${this.url}/${id}`, params)
  }
  this.del = function (id) {
    return request.delete(`${this.url}/${id}`)
  }
}

export {
  Plant
}
export default request
