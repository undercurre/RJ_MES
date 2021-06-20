import request from '@/plugin/axios'

class Helper {
  Index (controllerName, query = null) {
    return request.get(`MesKanbanReport/${controllerName}`, {
      params: query
    })
  }
  AddOrModify (controllerName, query = {}) {
    return request.get(`MesKanbanReport/${controllerName}`, {
      params: query
    })
  }
  LoadData (controllerName, query = {}) {
    return request.get(`MesKanbanReport/${controllerName}`, {
      params: query
    })
  }
  SaveData (controllerName, data) {
    return request.post(`MesKanbanReport/${controllerName}`, data)
  }
}

export default function () {
  const helper = new Helper()
  return helper
}

// 根据条件获取相应的查询列表
export function GetSiteStatisticsConditionList (data) {
  return request.post('Kanban/GetSiteStatisticsConditionList', data)
}
// 获取每小时产能
export function GetHourReportData (query) {
  return request.get('MesKanbanReport/GetHourReportData', {
    params: query
  })
}
// 首件检验（月）
export function GetFirstCheckData (query) {
  return request.get('MesKanbanReport/GetFirstCheckData', {
    params: query
  })
}
// 直通率
export function GetPassRateData (query) {
  return request.get('MesKanbanReport/GetPassRateData', {
    params: query
  })
}
// 工序统计数据
export function GetOperationData (query) {
  return request.get('MesKanbanReport/GetOperationData', {
    params: query
  })
}
// 设备状态数据
export function GetMachineData (query) {
  return request.get('MesKanbanReport/GetMachineData', {
    params: query
  })
}
// 今日排产列表
export function GetPlanPassRateData (query) {
  return request.get('MesKanbanReport/GetPlanPassRateData', {
    params: query
  })
}
// 不良top5
export function GetTopDefectData (query) {
  return request.get('MesKanbanReport/GetTopDefectData', {
    params: query
  })
}
// 安灯呼叫
export function GetAndonCallData (query) {
  return request.get('MesKanbanReport/GetAndonCallData', {
    params: query
  })
}
// 设备保养
export function GetMachineMaintainData (query) {
  return request.get('MesKanbanReport/GetMachineMaintainData', {
    params: query
  })
}
