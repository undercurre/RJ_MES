import request from '@/plugin/axios'

export function GetStencilUseDataAsync (params) {
  return request.get('SmtStencilMaintain/GetStencilUseDataAsync', {
    params
  })
}
