import request from '@/plugin/axios'
// 获取当前工单的时间完成
export function GetWoPassTotal (lineId) {
  return request.get('Kanban/GetWoPassTotal', {
    params: {
      lineId
    }
  })
}
// 获取每小时产能
export function GetWoHourPass (lineId) {
  return request.get('Kanban/GetWoHourPass', {
    params: {
      lineId
    }
  })
}
// 获取今日工单完成
export function GetWoToDayPass (lineId) {
  return request.get('Kanban/GetWoToDayPass', {
    params: {
      lineId
    }
  })
}

// 获取今日工单汇总
export function GetWoToDayALL (lineId) {
  return request.get('Kanban/GetWoToDayALL', {
    params: {
      lineId
    }
  })
}

// 获取直通率
export function GetWoToRate (lineId) {
  return request.get('Kanban/GetWoToRate', {
    params: {
      lineId
    }
  })
}

// 最近5天的产能
export function Top5Prouduct (lineId) {
  return request.get('Kanban/Top5Prouduct', {
    params: {
      lineId
    }
  })
}

// 获取产线的站点统计信息
export function GetSiteStatistics (lineId) {
  return request.get('Kanban/GetSiteStatistics', {
    params: {
      lineId
    }
  })
}
