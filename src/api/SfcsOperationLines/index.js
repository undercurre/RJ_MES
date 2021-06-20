import request from '@/plugin/axios'

// 线体配置 首页
export function Index () {
  return request({
    url: 'SfcsOperationLines/Index',
    method: 'get'
  })
}
//  查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SfcsOperationLines/LoadData',
    method: 'get',
    params: query
  })
}
export function LoadLocationList (query) {
  return request({
    url: 'SfcsOperationLines/LoadLocationList',
    method: 'get',
    params: query
  })
}
export function ExportData (query) {
  return request.get('SfcsOperationLines/ExportData', {
    params: query
  })
}
// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsOperationLines/AddOrModify',
    method: 'get'
  })
}

// 添加或修改的相关操作
export function AddOrModifySave (query) {
  return request({
    url: 'SfcsOperationLines/AddOrModifySave',
    method: 'post',
    data: query
  })
}

// 通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'SfcsOperationLines/ChangeEnabled',
    method: 'post',
    data: query
  })
}

// 线别类型
export function LoadMESLineType () {
  return request.get('SmtLines/LoadMESLineType', {

  })
}
