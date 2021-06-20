import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('MesCommitVersion/Index', {
    params: query
  })
}
// 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('MesCommitVersion/LoadData', {
    params: query
  })
}
// 当前ID是否已被使用
export function ItemIsByUsed (query) {
  return request.get('MesCommitVersion/ItemIsByUsed', {
    params: query
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('MesCommitVersion/SaveData', data)
}
// 删除
export function DeleteOneById (data) {
  return request.post('MesCommitVersion/DeleteOneById', data)
}
