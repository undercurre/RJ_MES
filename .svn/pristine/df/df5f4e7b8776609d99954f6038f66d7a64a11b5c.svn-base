import request from '@/plugin/axios'
// 首页视图
export function Index (query) {
  return request.get('SfcsProductOperationMonitor/Index', {
    params: query
  })
}

// 获取当前工序和返工工序
export function GetCurrentReworkOption (query) {
  return request.get('SfcsProductOperationMonitor/GetCurrentReworkOption', {
    params: query
  })
}

// 重复接口调用和验证文档
export function GetDocumentAPI (query) {
  return request.get('SfcsProductOperationMonitor/GetDocumentAPI', {
    params: query
  })
}
// 获取产品抽检方案分页 搜索按钮对应的处理也是这个方法
export function LoadMonitorData (query) {
  return request.get('SfcsProductOperationMonitor/LoadMonitorData', {
    params: query
  })
}

// 保存
export function SaveData (data) {
  return request.post('SfcsProductOperationMonitor/SaveData', data)
}

//
export function SfcsPnLoadData (query) {
  return request.get('SfcsPn/LoadData', {
    params: query
  })
}

export function SfcsRoutesLoadData (query) {
  return request.get('SfcsRoutes/LoadData', {
    params: query
  })
}
