import request from '@/plugin/axios'

// 获取下拉列表
export function Index () {
  return request({
    url: 'SmtStencilMaintain/Index',
    method: 'get'
  })
}

// 获取钢网相关信息
// eslint-disable-next-line camelcase
export function GetStencilInfo (stencil_no) {
  return request.get('SmtStencilMaintain/GetStencilInfo', {
    params: {
      stencil_no
    }
  })
}

// 获取钢网保养历史信息列表
// eslint-disable-next-line camelcase
export function LoadData (stencil_no) {
  return request.get('SmtStencilMaintain/LoadData', {
    params: {
      stencil_no
    }
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SmtStencilMaintain/SaveData', data)
}
