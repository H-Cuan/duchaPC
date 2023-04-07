import request from '../utils/request'
export function token (data) {
  return request.post('/oauth2/token', data)
}
export function login (data) {
  return request.post('/auth/system/idcardLogin', data)
}
export function refresh (data) {
  return request.post('/auth/system/refresh', data)
}
// 获取验证码
export function captcha (data) {
  return request.get('/auth/system/captcha', data)
}
// app列表接口
export function appList (data) {
  return request.get('/auth/supervise/device/index', data)
}
// 人机关联列表接口
export function contact (data) {
  return request.get('/auth/system/user/contact', data)
}
// 退出
export function logout (data) {
  return request.post('/auth/system/logout', data)
}
// 获取登录信息
export function getInfo (data) {
  return request.get('/auth/system/getInfo', data)
}
export function dataDict (data) {
  return request.get('/auth/system/dataDict/list', data)
}
export function content (data) {
  return request.get('/auth/supervise/content/index', data)
}
