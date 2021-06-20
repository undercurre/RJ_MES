import request from '@/plugin/axios'
import helper from '@/api/Helper'
const API = helper('SmtStencilStore')
export function Index () {
  return API.Index()
}

export function LoadData (query) {
  return API.LoadData(query)
}

export function SaveData (data) {
  return API.SaveData(data)
}

export function ScrapStencilStore ({
  STENCIL_NO = '',
  UserName = ''
}) {
  return request.post('SmtStencilStore/ScrapStencilStore', {
    STENCIL_NO,
    UserName
  })
}
