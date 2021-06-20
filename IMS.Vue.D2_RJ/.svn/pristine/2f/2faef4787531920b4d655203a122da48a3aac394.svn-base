import request from '@/plugin/axios'

// 获取产线的工单信息
export function GetKanbanWoData (i) {
  return request({
    url: 'Kanban/GetKanbanWoData?lineId=' + i,
    method: 'get'
  })
}
// 获取产线的站点统计信息
export function GetKanbanSiteData (i) {
  return request({
    url: 'Kanban/GetKanbanSiteData?lineId=' + i,
    method: 'get'
  })
}
// 获取抽检良率
export function GetKanbanSpotCheckData (i) {
  return request({
    url: 'Kanban/GetKanbanSpotCheckData',
    method: 'get',
    params: i
  })
}
// 获取产线FCT工序的合格率
export function GetKanbanPassRateData (i) {
  return request({
    url: 'Kanban/GetKanbanPassRateData?lineId=' + i,
    method: 'get'
  })
}
// 获取产线的呼叫信息
export function GetCallData (query) {
  return request({
    url: 'Kanban/GetCallData',
    method: 'get',
    params: query
  })
}
// 获取产线TOP不良代码信息
export function GetTopDefectData (query) {
  return request({
    url: 'Kanban/GetTopDefectData',
    method: 'get',
    params: query
  })
}
// 获取产线最近X小时的每小时产能
export function GetKanbanHourYidldData (query) {
  return request({
    url: 'Kanban/GetKanbanHourYidldData',
    method: 'get',
    params: query
  })
}
// 产线看板的排产的完成率
export function GetKanbanWorkingPassRateData (i) {
  return request({
    url: 'Kanban/GetKanbanWorkingPassRateData?lineId=' + i,
    method: 'get'
  })
}
// 获取换线时间数据
export function GetChangeLineRecordData (query) {
  return request({
    url: 'Kanban/GetChangeLineRecordData',
    method: 'get',
    params: query
  })
}

// 产线看板不良品信息
export function GetKanbanDefectMsgData (query) {
  return request({
    url: 'Kanban/GetKanbanDefectMsgData?wo_no=' + query,
    method: 'get'
  })
}

// 获取生产线体
export function GetLins (query) {
  return request.get('SfcsOperationLines/LoadData', {
    params: query
  })
}
