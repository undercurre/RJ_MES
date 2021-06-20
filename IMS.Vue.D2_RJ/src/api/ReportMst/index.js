import request from '@/plugin/axios'

export function Index () {
  return request.get('ReportMst/Index')
}

export function LoadData (query) {
  return request.post('ReportMst/LoadData', {
    params: query
  })
}

export function SaveData (data) {
  return request.post('ReportMst/SaveData', data)
}

// 获取参数
export function GetParams (id) {
  return request.get('ReportMst/GetParams', {
    params: {
      id
    }
  })
}

// 执行SQL
export function QuerySql (data) {
  return request.post('ReportMst/QuerySql', data)
}
