import request from '@/plugin/axios'

// 首页
export function Index () {
  return request.get('AndonCallRecord/Index')
}

// 查询数据(呼叫记录页面显示)
export function LoadData (query) {
  return request.get('AndonCallRecord/LoadData', {
    params: query
  })
}

// 查询数据(行编辑时)
export function LoadEditData (query) {
  return request.get('AndonCallRecord/LoadEditData', {
    params: query
  })
}

// 保存
export function SaveRecordHandleData (data) {
  return request.post('AndonCallRecord/SaveRecordHandleData', data)
}

// 新增
export function InsertRecordHandleData (data) {
  return request.post('AndonCallRecord/InsertRecordHandleData', data)
}

// 查询首页预警信息数据
export function LoadEarlyWarningData (query) {
  return request.get('AndonCallRecord/LoadEarlyWarningData', {
    params: query
  })
}

// 查询首页待办信息数据
export function LoadWaitTakeData (query) {
  return request.get('AndonCallRecord/LoadWaitTakeData', {
    params: query
  })
}

// 查询首页待办信息数据
// 首页
export function RuleConfigIndex () {
  return request.get('AndonCallRuleConfig/Index')
}
