import request from '@/plugin/axios'

// 采集过站页数据展示接口
export function GetCollectProductsData (data) {
  return request.post('CollectProducts/GetCollectProductsData', data)
}

// 提交无码报工 不良代码数量默认为1
export function PostToUncodedReport (data) {
  return request.post('CollectProducts/PostToUncodedReport', data)
}

// 撤销无码报工
export function ClearUncodedReport (data) {
  return request.post('CollectProducts/ClearUncodedReport', data)
}

// 站点的直通率 获取工单的直通率不用传Type或者为空 获取今天直通率:Type="Today"
export function GetRefershPassRate (query) {
  return request.get('CollectProducts/GetRefershPassRate', {
    params: query
  })
}

// 获取站点的第几小时产能
export function GetRefershHourYieldByStationID (query) {
  return request.get('CollectProducts/GetRefershHourYieldByStationID', {
    params: query
  })
}

// 刷新TOP X 不良现象 获取今天不良现象:Type="Today"
export function GetfershTopDefectByStation (query) {
  return request.get('CollectProducts/GetfershTopDefectByStation', {
    params: query
  })
}

// 获取工单信息 通过线体 可以切换工单 当前工单的下标 0：当前生产工单，1：上一个工单，最多前5个工单
export function GetCurrentWorkOrder (query) {
  return request.get('CollectProducts/GetCurrentWorkOrder', {
    params: query
  })
}

