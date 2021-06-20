import request from '@/plugin/axios'
// 获取呼叫内容
export function GetCallCodeChinese (callCode) {
  return request.get('SfcsOperationSites/GetCallCodeChinese', {
    params: {
      callCode
    }
  })
}

// 呼叫窗口
export function CallWindow (callTypeCode) {
  return request.get('SfcsOperationSites/CallWindow', {
    params: {
      callTypeCode
    }
  })
}

// 通过站点ID获取该站位对应呼叫记录
export function GetRecordBySiteId (query) {
  return request.get('SfcsOperationSites/GetRecordBySiteId', {
    params: query
  })
}

// 通过站位ID获取该站位对应呼叫记录（点击[呼叫]执行）
export function AddCallRecord (params) {
  return request.post('SfcsOperationSites/AddCallRecord', params)
}

// 通过站位ID获取该站位对应呼叫记录（点击 签到 的action）
export function EditCallRecord (params) {
  return request.post('SfcsOperationSites/EditCallRecord', params)
}

// 作业指导书 首页
export function Index () {
  return request.get('SOP/Index')
}

// 产品图:资源列表
export function LoadResourceProductData (routeId) {
  return request.get('SOP/LoadResourceProductData?routeId=' + routeId)
}

// 零件图:资源列表
export function LoadResourceCmpData (operationRouteId) {
  return request.get('SOP/LoadResourceCmpData?operationRouteId=' + operationRouteId)
}

// 加载作业图列表
export function LoadResourceData (operationRouteId) {
  return request.get('SOP/LoadResourceData?operationRouteId=' + operationRouteId)
}

// 获取员工信息
// eslint-disable-next-line camelcase
export function LoadEmployeeData (user_id) {
  return request.get('SOP/LoadEmployeeData', {
    params: {
      user_id
    }
  })
}

// 获取工序评判标准
// eslint-disable-next-line camelcase
export function LoadSkillStandard (site_id) {
  return request.get('SOP/LoadSkillStandard', {
    parmas: {
      site_id
    }
  })
}
