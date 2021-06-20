import request from '@/plugin/axios'

export function Index () {
  return request.get('SfcsProductPallet/Index')
}

export function LoadData (query) {
  return request.get('SfcsProductPallet/LoadData', {
    params: query
  })
}

export function GetAattachments (query) {
  return request.get('SfcsProductPallet/GetAattachments', {
    params: query
  })
}

export function SaveData (data) {
  return request.post('SfcsProductPallet/SaveData', data)
}

export function checkPn (PART_NO) {
  return request.get('SfcsPn/LoadData', {
    params: {
      PART_NO
    }
  })
}
