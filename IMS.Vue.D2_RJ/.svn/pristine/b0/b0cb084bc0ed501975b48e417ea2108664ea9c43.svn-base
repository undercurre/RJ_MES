import request from '@/plugin/axios'

// 获取下拉列表
export function Index () {
  return request({
    url: 'SfcsOperationSites/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SfcsOperationSites/LoadData',
    method: 'get',
    params: query
  })
}
// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsOperationSites/AddOrModify',
    method: 'get'
  })
}

// 保存数据
export function AddOrModifySave (query) {
  return request({
    url: 'SfcsOperationSites/AddOrModifySave',
    method: 'post',
    data: query
  })
}

// 通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'SfcsOperationSites/ChangeEnabled',
    method: 'post',
    data: query
  })
}

// 通过料号,工序ID获取站点信息
export function LoadSiteMsg (query) {
  return request({
    url: 'SfcsOperationSites/LoadSiteMsg?id=' + query,
    method: 'post'
  })
}
// 通过料号,工序ID获取站点信息
export function LoadSiteMsgPreview (query) {
  return request({
    url: 'SfcsOperationSites/LoadSiteMsgPreview',
    method: 'get',
    params: query
  })
}

export function ExportData (query) {
  return request.get('SfcsOperationSites/ExportData', {
    params: query
  })
}
