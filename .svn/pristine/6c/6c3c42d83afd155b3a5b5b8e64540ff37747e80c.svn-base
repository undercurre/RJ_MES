import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'AndonCallContentConfig/Index',
    method: 'get'
  })
}
// 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'MesMessageReceiverGroup/LoadData',
    method: 'get',
    params: query
  })
}
//  保存数据
export function SaveData (query) {
  return request({
    url: 'MesMessageReceiverGroup/SaveData',
    method: 'post',
    data: query
  })
}
//  删除
export function DeleteOneById (query) {
  return request({
    url: 'MesMessageReceiverGroup/DeleteOneById?id=' + query,
    method: 'post'
  })
}

//  通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'MesMessageReceiverGroup/ChangeEnabled',
    method: 'post',
    data: query
  })
}
