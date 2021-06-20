import request from '@/plugin/axios'

// 获取产线的工单信息
export function GetKanbanWoData (i) {
  return request({
    url: 'Kanban/GetKanbanWoData?lineId=' + i,
    method: 'get'
  })
}
// 获取设备点检信息
export function GetEquipCheckData (i) {
  return request({
    url: 'Kanban/GetEquipCheckData',
    method: 'get',
    params: i
  })
}
// 获取设备维修信息
export function GetEquipRepairHeadData (i) {
  return request({
    url: 'Kanban/GetEquipRepairHeadData',
    method: 'get',
    params: i
  })
}
// 获取设备点检报表信息
export function GetEquipKeepHeadData (i) {
  return request({
    url: 'Kanban/GetEquipKeepHeadData',
    method: 'get',
    params: i
  })
}

// 获取生产线体
export function SfcsOperationLines (query) {
  return request.get('SfcsOperationLines/LoadData', {
    params: query
  })
}

// 获取贴片线体
export function SmtLines (query) {
  return request.get('SmtLines/LoadData', {
    params: query
  })
}
