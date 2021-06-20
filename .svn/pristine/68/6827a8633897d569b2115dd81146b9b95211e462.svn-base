import request from '@/plugin/axios'

// 工序配置 首页
export function Index () {
  return request({
    url: 'SfcsOperations/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SfcsOperations/LoadData',
    method: 'get',
    params: query
  })
}
// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsOperations/AddOrModify',
    method: 'get'
  })
}

// 添加或修改的相关操作
export function AddOrModifySave (query) {
  return request({
    url: 'SfcsOperations/AddOrModifySave',
    method: 'post',
    data: query
  })
}

// 通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'SfcsOperations/ChangeEnabled',
    method: 'post',
    data: query
  })
}

export function ExportData (query) {
  return request.get('SfcsOperations/ExportData', {
    params: query
  })
}

// 获取制程工序
export function GetRouteOperationByRouteID (query) {
  return request({
    url: 'SfcsOperations/GetRouteOperationByRouteID',
    method: 'get',
    params: query
  })
}
