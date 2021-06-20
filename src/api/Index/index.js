import request from '@/plugin/axios'
// 搜索按钮对应的处理也是这个方法
export function MVCLoadData (query) {
  return request.get('MesCommitVersion/LoadData', {
    params: query
  })
}
