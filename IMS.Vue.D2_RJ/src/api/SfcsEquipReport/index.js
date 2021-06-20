import request from '@/plugin/axios'
// 设备点检看板首页
export function Index () {
  return request({
    url: 'SfcsEquipReport/Index',
    method: 'get'
  })
}
//  查询设备数据
export function LoadData (query) {
  return request({
    url: 'SfcsEquipReport/LoadData',
    method: 'get',
    params: query
  })
}
//  查询设备维修记录数据
export function LoadRepairHeadData (query) {
  return request({
    url: 'SfcsEquipReport/LoadRepairHeadData',
    method: 'get',
    params: query
  })
}
//  根据维修记录获取维修配件信息
export function GetEquipRepairDetail (query) {
  return request({
    url: 'SfcsEquipReport/GetEquipRepairDetail?headId=' + query,
    method: 'get'
  })
}
//  获取年月日报表信息
export function LoadEquipKeepData (query) {
  return request({
    url: 'SfcsEquipReport/LoadEquipKeepData',
    method: 'get',
    params: query
  })
}
// 获取年月日报表明细数据
export function GetEquipKeepDetail (query) {
  return request({
    url: 'SfcsEquipReport/GetEquipKeepDetail?id=' + query,
    method: 'get'
  })
}
