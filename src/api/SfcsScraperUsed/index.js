import request from '@/plugin/axios'

export function GetScraperUseDataAsync (params) {
  return request.get('SfcsScraperOperat/GetScraperUseDataAsync', {
    params
  })
}
