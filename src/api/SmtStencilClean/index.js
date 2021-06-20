import request from '@/plugin/axios'

// 获取钢网编号相关信息
// eslint-disable-next-line camelcase
export function GetStencilInfo (stencil_no) {
  return request.get('SmtStencilClean/GetStencilInfo', {
    params: {
      stencil_no
    }
  })
}
