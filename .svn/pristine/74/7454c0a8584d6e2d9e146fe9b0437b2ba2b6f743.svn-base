import request from '@/plugin/axios'
// 呼叫通知首页
export function getIndex () {
  return request({
    url: 'CallContentConfig/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'CallContentConfig/LoadData',
    method: 'get',
    params: query
  })
}
// 添加或修改视图下拉
export function AddOrModify () {
  return request({
    url: 'CallContentConfig/AddOrModify',
    method: 'get'
  })
}
//  通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'CallContentConfig/ChangeEnabled',
    method: 'post',
    data: query
  })
}
//  通过ID删除记录
export function DeleteOneById (query) {
  return request({
    url: 'CallContentConfig/DeleteOneById?id=' + query,
    method: 'post'
  })
}
// 添加或修改的相关操作
export function AddOrModifyServer (query) {
  return request({
    url: 'CallContentConfig/AddOrModifyServer',
    method: 'post',
    data: query
  })
}

export function ExportData (query) {
  return request.get('CallContentConfig/ExportData', {
    params: query
  })
}
