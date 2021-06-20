import request from '@/plugin/axios'

export function Index (query) {
  return request.get('/Patchlineconfig/Index', {
    params: query
  })
}

export function GetRoutStation (LINE_ID) {
  return request.get('/Patchlineconfig/GetRoutStation', {
    params: {
      LINE_ID
    }
  })
}

export function GetLinesConfig (lineid) {
  return request.get('/Patchlineconfig/GetLinesConfig', {
    params: {
      lineid
    }
  })
}

export function GetStationConfig (stationid) {
  return request.get('/Patchlineconfig/GetStationConfig', {
    params: {
      stationid
    }
  })
}

export function SaveData (data) {
  console.log('SaveData: ', JSON.stringify(data))
  return request.post('/Patchlineconfig/SaveData', data)
}

export function IsExistMacheName (query) {
  return request.get('/Patchlineconfig/IsExistMacheName', {
    params: query
  })
}
