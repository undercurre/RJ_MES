import request from '@/plugin/axios'

// 根据钢网的资源ID获取钢网资源数据
// eslint-disable-next-line
export function GetStencilResourceInfo (resource_id) {
  return request.get('SmtStencilConfig/GetStencilResourceInfo', {
    params: {
      resource_id
    }
  })
}

// 获取钢网资源列表
export function GetStencilResourceList (data) {
  return request.post('SmtStencilConfig/GetStencilResourceList', data)
}

// 根据钢网的资源ID获取钢网资源数据
// eslint-disable-next-line
export function DownloadResource (resource_id) {
  return request.get('SmtStencilConfig/DownloadResource', {
    params: {
      resource_id
    }
  })
}
