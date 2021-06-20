import request from '@/plugin/axios'
// 呼叫记录首页
export function Index () {
  return request({
    url: 'CallRecord/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'CallRecord/LoadData',
    method: 'get',
    params: query
  })
}
// 查询呼叫记录处理
export function LoadDataHandle (query) {
  return request({
    url: 'CallRecord/LoadDataHandle?MST_ID=' + query,
    method: 'get'
  })
}
// 获取通知列表
export function LoadDataNotice (query) {
  return request({
    url: 'CallRecord/LoadDataNotice?MST_ID=' + query,
    method: 'get'
  })
}
// 保存添加处理记录
export function AddOrModifyHandleSave (query) {
  return request({
    url: 'CallRecord/AddOrModifyHandleSave',
    method: 'post',
    data: query
  })
}
