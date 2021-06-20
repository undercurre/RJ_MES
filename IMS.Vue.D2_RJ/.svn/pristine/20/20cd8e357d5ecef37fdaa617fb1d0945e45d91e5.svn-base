import request from '@/plugin/axios'

// 获取菜单列表
export function getmenu () {
  return request({
    url: 'Menu/LoadData2Tree',
    method: 'get'
  })
}
// 获取菜单新增或编辑数据
export function getAddOrModify () {
  return request({
    url: 'Menu/AddOrModify',
    method: 'get'
  })
}
//  保存菜单
export function AddOrModifySave (query) {
  return request({
    url: 'Menu/AddOrModifySave',
    method: 'post',
    data: query
  })
}
//  删除菜单
export function MenuDelete (query) {
  return request({
    url: 'Menu/Delete?id=' + query,
    method: 'post'
  })
}
// 路由地址是否存在
export function IsExistsLinkUrl (query) {
  return request({
    url: 'Menu/IsExistsLinkUrl',
    method: 'get',
    params: query
  })
}

// 获取按钮
export function getLoadDataSub (query) {
  return request({
    url: 'Menu/LoadDataSub',
    method: 'get',
    params: query
  })
}

//  保存按钮
export function AddOrModifySubSave (query) {
  return request({
    url: 'Menu/AddOrModifySubSave',
    method: 'post',
    data: query
  })
}

// 删除按钮
export function DeleteSub (id) {
  return request({
    url: 'Menu/DeleteSub?id=' + id,
    method: 'post'
  })
}
// 获取角色的菜单列表数据
export function LoadMenusByRoleId (id) {
  return request({
    url: 'ManagerRole/LoadMenusByRoleId?roleId=' + id,
    method: 'get'
  })
}
// 通过角色Id获取角色的按钮列表
export function GetAllButtonByRoleId (roleId) {
  return request.get('ManagerRole/GetAllButtonByRoleId', {
    params: {
      roleId
    }
  })
}
