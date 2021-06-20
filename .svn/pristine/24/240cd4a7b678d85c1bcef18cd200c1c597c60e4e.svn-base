import request from '@/plugin/axios'
// 呼叫通知首页
export function Index () {
  return request({
    url: 'CallNotice/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'CallNotice/LoadData',
    method: 'get',
    params: query
  })
}
// 查询接收信息集
export function LoadDataReceiver (query) {
  return request({
    url: 'CallNotice/LoadDataReceiver?MST_ID=' + query,
    method: 'get'
  })
}
