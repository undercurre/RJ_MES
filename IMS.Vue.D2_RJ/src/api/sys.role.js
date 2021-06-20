import request from '@/plugin/axios'

// 获取角色列表数据
export function getRoutes (query) {
  return request({
    url: 'ManagerRole/LoadData',
    method: 'get',
    params: query
  })
}
// 角色新增或编辑时, 获取[授权]及[已授权的菜单主键数组]
export function AddOrModify (id) {
  return request({
    url: 'ManagerRole/AddOrModify?id=' + id,
    method: 'get'
  })
}

// 删除角色
export function Delete (id) {
  return request({
    url: 'ManagerRole/Delete?id=' + id,
    method: 'post'
  })
}

// 保存数据
export function saveModifySave (obj) {
  return request({
    url: 'ManagerRole/AddOrModifySave',
    method: 'post',
    data: obj
  })
}

export function Index () {
  return request.get('ManagerRole/Index')
}

// 获取角色的菜单列表数据
export function LoadMenusByRoleId (roleId) {
  return request.get('ManagerRole/LoadMenusByRoleId', {
    params: {
      roleId
    }
  })
}
// 获取pda菜单
export function PadLoadData (obj) {
  return request({
    url: 'SysPdaMenus/LoadData',
    method: 'get',
    params: obj
  })
}
// 获取选中的角色
export function LoadPdaMenusByRole (roleId) {
  return request.get('SysPdaMenus/LoadPdaMenusByRole', {
    params: {
      role_id: roleId
    }
  })
}

// 保存角色对应的授权数据
export function SaveData2Role (data) {
  return request.post('SysPdaMenus/SaveData2Role', data)
}
