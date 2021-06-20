import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('MesTongsBoard/Index', {
    params: query
  })
}

// 获取夹具申请数量信息
export function GetApplyQty (query) {
  return request.get('MesTongsBoard/GetApplyQty', {
    params: query
  })
}

// 获取申请信息列表
export function GetApplyList (query) {
  return request.get('MesTongsBoard/GetApplyList', {
    params: query
  })
}

// 获取夹具状态分布信息
export function GetTongsStatusDis (query) {
  return request.get('MesTongsBoard/GetTongsStatusDis', {
    params: query
  })
}

// 获取夹具借出信息列表
export function GetTongsBorrowList (query) {
  return request.get('MesTongsBoard/GetTongsBorrowList', {
    params: query
  })
}
