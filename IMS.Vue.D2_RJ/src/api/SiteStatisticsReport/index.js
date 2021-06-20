import request from '@/plugin/axios'

// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}

export function GetSiteStatisticsDataTable (data) {
  return request.post('Kanban/GetSiteStatisticsDataTable', data)
}

export function GetSiteStatisticsDetail (data) {
  return request.post('Kanban/GetSiteStatisticsDetail', data)
}

export function GetSiteStatisticsReportDetail (data) {
  return request.post('Kanban/GetSiteStatisticsReportDetail', data)
}
