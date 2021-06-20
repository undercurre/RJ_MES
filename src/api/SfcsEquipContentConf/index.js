import request from '@/plugin/axios'
// 获取巡检列表
export function Index () {
  return request({
    url: 'SfcsEquipContentConf/Index',
    method: 'get'
  })
}
// 获取列表
export function LoadData (query) {
  return request({
    url: 'SfcsEquipContentConf/LoadData',
    method: 'get',
    params: query
  })
}
// 是否激活
export function ChangeEnabled (obj) {
  return request({
    url: 'SfcsEquipContentConf/ChangeEnabled',
    method: 'POST',
    data: obj
  })
}
// 删除
export function DeleteOneById (id) {
  return request({
    url: 'SfcsEquipContentConf/DeleteOneById?id=' + id,
    method: 'post'
  })
}
// 添加或修改视图
export function AddOrModify () {
  return request({
    url: 'SfcsEquipContentConf/AddOrModify',
    method: 'get'
  })
}
// 获取编辑
export function LoadEditData (query) {
  return request({
    url: 'SfcsEquipContentConf/LoadEditData?id=' + query,
    method: 'get'
  })
}

// 获取资源列表
export function LoadImgList (query) {
  return request({
    url: 'SfcsEquipContentConf/LoadImgList?mstId=' + query,
    method: 'get'
  })
}
// 保存
export function AddOrModifySave (query) {
  return request({
    url: 'SfcsEquipContentConf/AddOrModifySave',
    method: 'post',
    data: query
  })
}
