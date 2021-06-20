import request from '@/plugin/axios'

// 首页视图
export function Index () {
  return request.get('SysOrganize/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('SysOrganize/LoadData', {
    params: query
  })
}

// 查询组织架构树
export function LoadTreeData () {
  return request.get('SysOrganize/LoadTreeData')
}

// 当前ID是否已被使用
export function ItemIsByUsed (id) {
  return request.get('SysOrganize/ItemIsByUsed', {
    params: {
      id
    }
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SysOrganize/SaveData', data)
}

// 添加或修改视图
export function AddOrModify () {
  return request.get('SysOrganize/AddOrModify')
}

// 删除
export function DeleteOneById (id) {
  return request.post('SysOrganize/DeleteOneById', {}, {
    params: {
      id
    }
  })
}

// 组织类型LoadData
export function TypeLoadData (query) {
  return request.get('SysOrganizeType/LoadData', {
    params: query
  })
}

// 查询 组织架构人员关联数据
export function LoadUserOrganize (query) {
  return request.get('SysOrganize/LoadUserOrganize', {
    params: query
  })
}

// 保存 组织架构人员关联数据
export function SaveUserOrganize (data) {
  return request.post('SysOrganize/SaveUserOrganize', data)
}

// 用户列表
export function ManagerLoadData (query) {
  return request.get('Manager/LoadData', {
    params: query
  })
}
