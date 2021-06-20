import request from '@/plugin/axios'

export function LoadData (query) {
  return request.get('SmtResourceCategory/LoadData', {
    params: query
  })
}
