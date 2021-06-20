import request from '@/plugin/axios'

// 查询料架配置数据
export function LoadConfigData (query) {
  return request.get('MesPartShelf/LoadConfigData', {
    params: query
  })
}
// 查询上下架情况
export function LoadData (query) {
  return request.get('MesPartShelf/LoadData', {
    params: query
  })
}

// 保存上下架数据
export function SaveData (query) {
  return request({
    url: 'MesPartShelf/SaveData',
    method: 'post',
    data: query
  })
}
// 保存料架数据
export function SaveConfigData (query) {
  return request({
    url: 'MesPartShelf/SaveConfigData',
    method: 'post',
    data: query
  })
}
