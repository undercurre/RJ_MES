import request from '@/plugin/axios'

export function GetCancelReportData (query) {
  return request.get('apiSMT/GetCancelReportData', {
    params: query,
    baseURL: 'http://172.20.62.3:55078/'
  })
}

export function CancelReport (data) {
  return request.post('apiSMT/CancelReport', data, {
    baseURL: 'http://172.20.62.3:55078/'
  })
}
