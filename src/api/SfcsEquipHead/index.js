import request from '@/plugin/axios'

export function GetSfscEquipHeadDataAsync (params) {
  console.log(params)
  return request.get('SfcsDefectConfig/GetSfscEquipHeadDataAsync', {
    params
  })
}

export function GetSfscEquipHeadCodeDataAsync (params) {
  console.log(params)
  return request.get('SfcsDefectConfig/GetSfscEquipHeadCodeDataAsync', {
    params
  })
}
