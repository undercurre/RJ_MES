import request from '@/plugin/axios'

// 获取配置信息
export function Index (params) {
  return request.get('Kanban/Index', {
    params
  })
}
// 产线看板页
export function ProductLine () {
  return request({
    url: 'Kanban/ProductLine',
    method: 'get'
  })
}
// 检测线体是否存在
export function CheckLine (i) {
  return request({
    url: 'Kanban/CheckLine?lineId=' + i,
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

// 检查自动化线体是否存在
export function CheckSmtLine (i) {
  return request({
    url: 'Kanban/CheckSmtLine?lineId=' + i,
    method: 'get'
  })
}

// 自动化线看板的AOI的直通率
export function GetSmtKanbanAoiPassRateData (i) {
  return request({
    url: 'Kanban/GetSmtKanbanAoiPassRateData?lineId=' + i,
    method: 'get'
  })
}
// 自动化线看板的首件的直通率
export function GetSmtKanbanFirstPassRateData (i) {
  return request({
    url: 'Kanban/GetSmtKanbanFirstPassRateData?lineId=' + i,
    method: 'get'
  })
}

// 自动化线看板-低水位预警
export function GetSmtKanbanRestPcbData (query) {
  return request({
    url: 'Kanban/GetSmtKanbanRestPcbData',
    method: 'get',
    params: query
  })
}

// 自动化线看板的SPI的直通率
export function GetSmtKanbanSpiPassRateData (i) {
  return request({
    url: 'Kanban/GetSmtKanbanSpiPassRateData?lineId=' + i,
    method: 'get'
  })
}
// 自动化线看板的排产的完成率
export function GetSmtKanbanWorkingPassRateData (i) {
  return request({
    url: 'Kanban/GetSmtKanbanWorkingPassRateData?lineId=' + i,
    method: 'get'
  })
}
// 获取自动化线最近X小时的每小时产能
export function GetSmtKanbanHourYidldData (i) {
  return request({
    url: 'Kanban/GetSmtKanbanHourYidldData?lineId=' + i,
    method: 'get'
  })
}
// 自动化线看板的异常报告
export function GetSmtChangeLineRecordData (i) {
  return request({
    url: 'Kanban/GetSmtChangeLineRecordData',
    method: 'get',
    params: i
  })
}

// 获取产线的工单信息
export function GetKanbanWoData (i) {
  return request({
    url: 'Kanban/GetKanbanWoData?lineId=' + i,
    method: 'get'
  })
}

// 获取产线的工单信息
export function GetSmtKanbanWoData (lineId) {
  return request.get('Kanban/GetSmtKanbanWoData', {
    params: {
      lineId
    }
  })
}

// 获取线体
export function GetLines (query) {
  return request.get('SmtLines/LoadData', {
    params: query
  })
}

// 根据用户id，获取到隶属该组织的所有组织
export function GetOrganizeList (userid) {
  return request.get('Kanban/GetOrganizeList', {
    params: {
      user_id: userid
    }
  })
}

// 根据组织ID，获取到隶属该组织的所有线别
export function GetorganizeLines (organizeId) {
  return request.get('Kanban/GetLines', {
    params: {
      organizeId
    }
  })
}

// 获取SPI报表数据
export function GetSpiDataAsync (params) {
  return request.get('Kanban/GetSpiDataAsync', {
    params
  })
}
// 获取AOI报表数据
export function GetAoiDataAsync (params) {
  return request.get('Kanban/GetAoiDataAsync', {
    params
  })
}
// 获取AVI报表数据
export function GetAviDataAsync (params) {
  return request.get('Kanban/GetAviDataAsync', {
    params
  })
}
// 获取Ict报表数据
export function GetIctDataAsync (params) {
  return request.get('Kanban/GetIctDataAsync', {
    params
  })
}
// 获取Fct报表数据
export function GetFctDataAsync (params) {
  return request.get('Kanban/GetFctDataAsync', {
    params
  })
}
// 获取辅料报表数据
export function GetResourceRuncardReport (params) {
  return request.get('Kanban/GetResourceRuncardReportAsync', {
    params
  })
}
// 获取QC报表
export function GetQCReportAsync (params) {
  return request.get('Kanban/GetQCReportAsync', {
    params
  })
}

// 获取产能报表
export function GetKanbanHourReportAsync (params) {
  return request.get('Kanban/GetKanbanHourReportAsync', {
    params
  })
}

// 获取产能报表
export function GetProductionReportAsync (params) {
  return request.get('Kanban/GetProductionReportAsync', {
    params
  })
}
// r瑞晶
// Kanban / TopDayProducePlan瑞晶 - SMT产线看板 - 排产计划完成
export function TopDayProducePlan (params) {
  return request.get('Kanban/TopDayProducePlan', {
    params
  })
}
// 每小时产能
export function GetRefershHourYield (params) {
  return request.get('Kanban/GetRefershHourYield', {
    params
  })
}
// AOI不良
export function SmtAOIDefectInfo (params) {
  return request.get('Kanban/SmtAOIDefectInfo', {
    params
  })
}
export function GetSMTOnlineDataByWo (params) {
  return request.get('Kanban/GetSMTOnlineDataByWo', {
    params
  })
}
/* SMT车间看板 */
// SMT周计划
export function GetProducePlanInfoWeek (params) {
  return request.get('Kanban/GetProducePlanInfoWeek', {
    params
  })
}

// 全部线体的自动化线看板的AOI的直通率
export function GetSmtKanbanAoiPassRateByAllLines (params) {
  return request.get('Kanban/GetSmtKanbanAoiPassRateByAllLines', {
    params
  })
}
// SMT今日计划达成率
export function GetPlanAchievementRate (params) {
  return request.get('Kanban/GetPlanAchievementRate', {
    params
  })
}
// SMT线体任务跟踪
export function GetTaskTrackBySMTLine (params) {
  return request.get('Kanban/GetTaskTrackBySMTLine', {
    params
  })
}
// SMT
export function GetEfficiencyBySMTLine (params) {
  return request.get('Kanban/GetEfficiencyBySMTLine', {
    params
  })
}
