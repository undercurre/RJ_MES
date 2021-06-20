import request from '@/plugin/axios'
// 获取巡检列表
export function Index () {
  return request({
    url: 'SfcsEquipment/Index',
    method: 'get'
  })
}
// 获取列表
export function LoadData (query) {
  return request({
    url: 'SfcsEquipment/LoadData',
    method: 'get',
    params: query
  })
}

// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsEquipment/AddOrModify',
    method: 'get'
  })
}
// 是否激活
export function ChangeEnabled (obj) {
  return request({
    url: 'SfcsEquipment/ChangeEnabled',
    method: 'POST',
    data: obj
  })
}

// 编辑和添加保存
export function AddOrModifySave (obj) {
  return request({
    url: 'SfcsEquipment/AddOrModifySave',
    method: 'POST',
    data: obj
  })
}

// 删除
export function DeleteOneById (id) {
  return request({
    url: 'SfcsEquipment/DeleteOneById?id=' + id,
    method: 'post'
  })
}
export function ExportData (query) {
  return request({
    url: 'SfcsEquipment/ExportData',
    method: 'get',
    params: query
  })
}
