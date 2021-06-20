import request from '@/plugin/axios'

export function Index (params) {
  return request.get('SfcsEquipWaveDef/Index', {
    params
  })
}

export function LoadData (params) {
  return request.get('SfcsEquipWaveDef/LoadData', {
    params
  })
}

export function AddOrModifyAsync (params) {
  return request({
    url: 'SfcsEquipWaveDef/AddOrModifyAsync',
    method: 'post',
    data: params
  })
}

export function DealAsync (params) {
  return request({
    url: 'SfcsEquipWaveDef/DealAsync',
    method: 'post',
    data: params
  })
}

export function CheckAsync (params) {
  return request({
    url: 'SfcsEquipWaveDef/CheckAsync',
    method: 'post',
    data: params
  })
}

export function LoadDataDtl (params) {
  return request.get('SfcsEquipWaveDef/LoadData_Dtl', {
    params
  })
}

export function AddOrModifyAsyncDtl (params) {
  return request({
    url: 'SfcsEquipWaveDef/AddOrModifyAsync_Dtl',
    method: 'post',
    data: params
  })
}

export function DeleteOneById (id) {
  return request({
    url: 'SfcsEquipWaveDef/DeleteOneById?id=' + id,
    method: 'post'
  })
}

export function DeleteOneByIdDtl (id) {
  return request({
    url: 'SfcsEquipWaveDef/DeleteOneById_Dtl?id=' + id,
    method: 'post'
  })
}
