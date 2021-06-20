import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'MesMessageReceiverGroupDtl/Index',
    method: 'get'
  })
}
// 搜索按钮对应的处理也是这个方法
export function DtlLoadData (query) {
  return request({
    url: 'MesMessageReceiverGroupDtl/LoadData',
    method: 'get',
    params: query
  })
}
//  保存数据
export function DtlSaveData (query) {
  return request({
    url: 'MesMessageReceiverGroupDtl/SaveData',
    method: 'post',
    data: query
  })
}
//  删除
export function DtlDeleteOneById (query) {
  return request({
    url: 'MesMessageReceiverGroupDtl/DeleteOneById?id=' + query,
    method: 'post'
  })
}

//  通过ID更改激活状态
export function DtlChangeEnabled (query) {
  return request({
    url: 'MesMessageReceiverGroupDtl/ChangeEnabled',
    method: 'post',
    data: query
  })
}
