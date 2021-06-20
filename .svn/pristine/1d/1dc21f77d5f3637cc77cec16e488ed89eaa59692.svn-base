import request from '@/plugin/axios'

// 首页视图
export function ChangeLocationIndex () {
  return request.get('SmtStencilStore/ChangeLocationIndex')
}

// 变更储位之钢网编号查询
export function ChangeLocationLoadData (query) {
  return request({
    url: 'SmtStencilStore/ChangeLocationLoadData',
    method: 'get',
    params: { stencil_no: query }
  })
}

// 变更储位保存
export function ChangeLocationSave (query) {
  return request({
    url: 'SmtStencilStore/ChangeLocationSave',
    method: 'post',
    data: query
  })
}
