import request from '@/plugin/axios'
// 获取下拉列表
export function Index () {
  return request({
    url: 'SfcsEquipRepairHead/Index',
    method: 'get'
  })
}
// 获取列表
export function GetEquipmentList (query) {
  return request({
    url: 'SfcsEquipRepairHead/GetEquipmentList',
    method: 'get',
    params: query
  })
}
// 根据设备ID查询对应的维修记录
export function LoadData (query) {
  return request({
    url: 'SfcsEquipRepairHead/LoadData',
    method: 'get',
    params: query
  })
}
// 根据维修记录获取维修配件信息
export function GetEquipRepairDetail (query) {
  return request({
    url: 'SfcsEquipRepairHead/GetEquipRepairDetail?headId=' + query,
    method: 'get'
  })
}
// 添加或修改视图
export function AddOrModify (query) {
  return request({
    url: 'SfcsEquipRepairHead/AddOrModify',
    method: 'get',
    params: query
  })
}
// 删除
export function DeleteOneById (query) {
  return request({
    url: 'SfcsEquipRepairHead/DeleteOneById?id=' + query,
    method: 'post'
  })
}
// 保存操作
export function AddOrModifySave (query) {
  return request({
    url: 'SfcsEquipRepairHead/AddOrModifySave',
    method: 'post',
    data: query
  })
}
