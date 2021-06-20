import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('SfcsRework/Index', {
    params: query
  })
}

// 查询新工单列表数据
export function GetNewWorkNoData (query) {
  return request.get('SfcsRework/GetNewWorkNoData', {
    params: query
  })
}

// 根据新工单号查询数据
export function GetNewReworkDataByNewNo (query) {
  return request.get('SfcsRework/GetNewReworkDataByNewNo', {
    params: query
  })
}

// 根据流水号查出返工作业数据信息
export function GetReworkDataBySN (query) {
  return request.get('SfcsRework/GetReworkDataBySN', {
    params: query
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SfcsRework/SaveData', data)
}
