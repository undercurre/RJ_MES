import request from '@/plugin/axios'

export function GetStatusList (query) {
  return request.get('SfcsParameters/GetStatusList', {
    params: query
  })
}
// 下拉框
// export function sptLoadData (query) {
//   return request.get('SfcsParameters/LoadData', {
//     params: query
//   })
// }
export function sptLoadData (query) {
  return request({
    url: 'SfcsParameters/LoadData',
    method: 'get',
    params: query
  })
}
// 获取连接设备信息
export function GetMachineType (query) {
  return request.get('SfcsParameters/GetMachineType', {
    params: query
  })
}
// 获取连接设备信息
export function GetMachineDetailInfo (query) {
  return request({
    url: 'SfcsParameters/GetMachineDetailInfo',
    method: 'get',
    params: query
  })
}
//  获取连接设备信息
export function GetPrintTasksData (query) {
  return request({
    url: 'SfcsParameters/SaveMachineDetailInfo',
    method: 'post',
    data: query
  })
}

//  保存
export function sptSaveData (query) {
  return request({
    url: 'SfcsParameters/SaveData',
    method: 'post',
    data: query
  })
}
