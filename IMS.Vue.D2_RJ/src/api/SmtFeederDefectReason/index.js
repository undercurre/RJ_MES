import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'SmtFeederDefectReason/Index',
    method: 'get'
  })
}
// 查询数据 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SmtFeederDefectReason/LoadData',
    method: 'get',
    params: query
  })
}
// 当前项目是否已被使用
export function ItemIsByUsed (i) {
  return request({
    url: 'SmtFeederDefectReason/ItemIsByUsed?id=' + i,
    method: 'get'
  })
}
// 删除
export function DeleteOneById (i) {
  return request({
    url: 'SmtFeederDefectReason/DeleteOneById?id=' + i,
    method: 'post'
  })
}

// 保存数据
export function SaveData (query) {
  return request({
    url: 'SmtFeederDefectReason/SaveData',
    method: 'post',
    data: query
  })
}
