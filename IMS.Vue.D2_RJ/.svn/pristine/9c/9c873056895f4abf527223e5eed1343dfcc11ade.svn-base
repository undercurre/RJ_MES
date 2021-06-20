import request from '@/plugin/axios'

export function Index () {
  return request.get('Manager/Index')
}

// 获取用户个人资料
export function getObj (id) {
  return request({
    url: 'Manager/ManagerInfo?id=' + id,
    method: 'get'
  })
}

// 修改用户个人资料
export function putMyselfObj (data) {
  return request({
    url: 'Manager/ManagerInfoSave',
    method: 'post',
    data: data
  })
}

// 修改密码
export function ChangePassword (obj) {
  return request({
    url: 'Manager/ChangePassword',
    method: 'post',
    data: obj
  })
}

// 用户信息
export function getInfo (token) {
  return request({
    url: 'Manager/ManagerInfo',
    method: 'get',
    params: {
      token
    }
  })
}

// 获取用户列表
export function page (query) {
  return request({
    url: 'Manager/LoadData',
    method: 'get',
    params: query
  })
}
// 获取角色列表
export function rolelist (query) {
  return request({
    url: 'Manager/AddOrModify',
    method: 'get',
    params: query
  })
}
// 编辑和添加用户实验效
export function IsExistsName (obj) {
  return request({
    url: 'Manager/IsExistsName',
    method: 'POST',
    data: obj
  })
}
// 编辑和添加用户
export function putObj (obj) {
  return request({
    url: 'Manager/AddOrModifySave',
    method: 'POST',
    data: obj
  })
}
// 修改用户状态
export function Status (obj) {
  return request({
    url: 'Manager/ChangeLockStatus',
    method: 'POST',
    data: obj
  })
}
// 删除用户
export function Delete (obj) {
  return request({
    url: 'Manager/Delete?id=' + obj,
    method: 'POST'
  })
}

// 重置密码
export function ResetPassword (data) {
  return request.post('Manager/ResetPassword', data)
}

export function ExportData (query) {
  return request.get('Manager/ExportData', {
    params: query
  })
}

// 获取userInfo
export function GetUserInfoByToken () {
  return request.post('Auth/GetUserInfoByToken')
}
