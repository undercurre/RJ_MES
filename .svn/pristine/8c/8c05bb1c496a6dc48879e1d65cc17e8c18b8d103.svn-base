import request from '@/plugin/axios'

// 查询所有
export function LoadData (query) {
  return request.get('MesFirstCheckInfo/LoadData', {
    params: query
  })
}

// 添加或修改明细获取数据 打开检验情况界面时加载
export function AddOrModifyDetail (query) {
  return request.get('MesFirstCheckInfo/AddOrModifyDetail', {
    params: query
  })
}

// 添加或修改的保存相关操作
export function AddOrModifyAsyncSave (data) {
  return request.post('MesFirstCheckInfo/AddOrModifyAsyncSave', data)
}

// 检验明细添加或修改的保存相关操作
export function AddOrModifyDetailSave (data) {
  return request.post('MesFirstCheckInfo/AddOrModifyDetailSave', data)
}

// 通过ID删除记录
export function DeleteOneById (data) {
  return request.post(`MesFirstCheckInfo/DeleteOneById?id=${data}`)
}

// 删除首五件明细数据
export function DeleteDetail (data) {
  return request.post(`MesFirstCheckInfo/DeleteDetail?id=${data}`)
}

// 根据线别ID获取当前线别生产信息
export function GetProductionInfo (query) {
  return request.get('MesFirstCheckInfo/GetProductionInfo', {
    params: query
  })
}

// 获取首五件检验明细数据
export function GetDetailData (query) {
  return request.get('MesFirstCheckInfo/GetDetailData', {
    params: query
  })
}

// 获取检验明细项目信息
export function GetDetailItemData (query) {
  return request.get('MesFirstCheckInfo/GetDetailItemData', {
    params: query
  })
}

//
export function AuditData (data) {
  return request.post('MesFirstCheckInfo/AuditData', data)
}
// 获取全部产线
export function GetLinesListToType (query) {
  return request.get('Common/GetLinesListToType', {
    params: query
  })
}

// 获取所有部门
export function GetDepartmentList (query) {
  return request.get('Common/GetDepartmentList', {
    params: query
  })
}

// 获取可用的检验项目
export function GetItemsData (query) {
  return request.get('MesFirstCheckItems/GetItemsData', {
    params: query
  })
}
