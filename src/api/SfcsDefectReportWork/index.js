import request from '@/plugin/axios'

// 获取全部产线
export function GetLinesList (query) {
  return request.get('Common/GetLinesList', {
    params: query
  })
}

// 获取当前时间范围
export function GetDateNow (query) {
  return request.get('Common/GetDateNow', {
    params: query
  })
}

// 获取产线（通过产线类型）
export function GetLinesListToType (query) {
  return request.get('Common/GetListByType', {
    params: query
  })
}

// 首五件检验类别数据
export function GetListByType (query) {
  return request.get('Common/GetListByType', {
    params: query
  })
}

// 获取所有部门
export function GetDepartmentList (query) {
  return request.get('Common/GetDepartmentList', {
    params: query
  })
}
