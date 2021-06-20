import request from '@/plugin/axios'

// 根据流水号获取不良维修信息
// export function GetBadDataBySN (query) {
//   return request.get('SfcsCollectDefects/GetBadDataBySN', {
//     params: query
//   })
// }

export function UpdateCarton (data) {
  return request.post('SfcsContainerList/UpdateCartonNoBySN?Date=' + data)
}

// 根据SN替换箱号
// export function UpdateCartonNoBySN (data) {
//   return request.post('SfcsContainerList/UpdateCartonNoBySN', data)
// }
//  根据SN替换箱号
export function UpdateCartonNoBySN (query) {
  return request({
    url: 'SfcsContainerList/UpdateCartonNoBySN',
    method: 'post',
    params: query
  })
}

// 箱号置满包装
export function SetCatonFullByCaton (data) {
  return request.post('SfcsContainerList/SetCatonFullByCaton', data)
}

// 新增SN包装过站
export function PackingDoProcess (query) {
  return request.post('AssemblyOperation/AddNewToPacking', query)
}
// 删除SN包装
export function PackingDelBySN (query) {
  return request.post('SfcsContainerList/PackingDelBySN', query)
}
// 修改SN包装
export function PackingModifyBySN (query) {
  return request.post('AssemblyOperation/ModifyPackingBySN', query)
}
