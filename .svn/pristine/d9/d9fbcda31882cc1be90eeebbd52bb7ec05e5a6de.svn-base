import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'AndonCallContentConfig/Index',
    method: 'get'
  })
}
// 查询所有
export function LoadData (query) {
  return request({
    url: 'AndonCallContentConfig/LoadData',
    method: 'get',
    params: query
  })
}
//  保存数据
export function SaveData (query) {
  return request({
    url: 'AndonCallContentConfig/SaveData',
    method: 'post',
    data: query
  })
}
//  删除
export function DeleteOneById (query) {
  return request({
    url: 'AndonCallContentConfig/DeleteOneById?id=' + query,
    method: 'post'
  })
}
// 添加或修改视图
export function AddOrModify (query) {
  return request({
    url: 'AndonCallContentConfig/AddOrModify',
    method: 'post',
    data: query
  })
}
//  通过ID更改激活状态
export function ChangeEnabled (query) {
  return request({
    url: 'AndonCallContentConfig/ChangeEnabled',
    method: 'post',
    data: query
  })
}

// 获取异常种类、异常类型下拉框值 异常种类:0:安灯 1:停线管控
export function GetParamsOfCallCode (query) {
  return request({
    url: 'AndonCallContentConfig/GetParamsOfCallCode',
    method: 'get',
    params: query
  })
}
