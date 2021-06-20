import request from '@/plugin/axios'

//
export function LoadOnLineData () {
  return request.get('SfcsWo/LoadOnLineData')
}
