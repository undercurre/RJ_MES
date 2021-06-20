import request from '@/plugin/axios'

// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}

// 获取在制品报表数据
export function GetWipStatisticsList (data) {
  return request.post('Kanban/GetWipStatisticsList', data)
}

export function GetWipStatisticsReportDetail (data) {
  return request.post('Kanban/GetWipStatisticsReportDetail', data)
}

// 获取产线生产时段报表数据
export function LineProductionCapacityByTime (data) {
  return request.post('SfcsOperationLines/LineProductionCapacityByTime', data)
}

// 获取产线生产时段报表明细
export function CapacityRateDetailsByLine (data) {
  return request.post('SfcsOperationLines/CapacityRateDetailsByLine', data)
}

// 获取制程不良时段报表数据
export function LineProductionCapacityByFail (data) {
  return request.post('SfcsOperationLines/LineProductionCapacityByFail', data)
}

// 获取制程不良时段报表明细
export function SiteFailDetailsByLine (data) {
  return request.post('SfcsOperationLines/SiteFailDetailsByLine', data)
}
