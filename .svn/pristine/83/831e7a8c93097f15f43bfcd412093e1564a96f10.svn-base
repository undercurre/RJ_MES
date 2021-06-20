import request from '@/plugin/axios'
// 获取巡检列表
export function Index (query) {
  return request({
    url: 'SfcsEquipmentThrow/Index?ORGANIZE_ID=' + query,
    method: 'get'
  })
}
// 获取列表
export function LoadData (query) {
  console.log(query)
  return request({
    url: 'SfcsEquipmentThrow/LoadData',
    method: 'get',
    params: query
  })
}

// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsEquipmentThrow/AddOrModify',
    method: 'get'
  })
}
// 是否激活
export function ChangeEnabled (obj) {
  return request({
    url: 'SfcsEquipmentThrow/ChangeEnabled',
    method: 'POST',
    data: obj
  })
}

// 编辑和添加保存
export function AddOrModifySave (obj) {
  console.log(obj)
  return request({
    url: 'SfcsEquipmentThrow/SaveData',
    method: 'POST',
    data: obj
  })
}

// 删除
export function DeleteOneById (id) {
  return request({
    url: 'SfcsEquipmentThrow/DeleteOneById?id=' + id,
    method: 'post'
  })
}
export function ExportData (query) {
  return request({
    url: 'SfcsEquipmentThrow/ExportData',
    method: 'get',
    params: query
  })
}

// 获取不良报表列表
export function GetReportDataAsync (query) {
  return request({
    url: 'SfcsEquipmentThrow/LoadReportData',
    method: 'get',
    params: query
  })
}

export function GetModelAndPartByWoNo (query) {
  return request({
    url: 'SfcsEquipmentThrow/GetModelAndPartByWoNo?WO_NO=' + query,
    method: 'get',
    params: query
  })
}
