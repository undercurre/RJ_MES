import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'SfcsPn/Index',
    method: 'get'
  })
}
// 查询
export function LoadData (query) {
  return request({
    url: 'SfcsPn/LoadData',
    method: 'get',
    params: query
  })
}
// 导出数据
export function ExportData (query) {
  return request.get('SfcsPn/ExportData', {
    params: query
  })
}
// 保存数据
export function SaveData (query) {
  return request({
    url: 'SfcsPn/SaveData',
    method: 'post',
    data: query
  })
}

// 客户查询
export function GetClient (query) {
  return request.get('SfcsCustomers/LoadData', {
    params: query
  })
}

// 产品查询
export function GetProduct (query) {
  return request.get('SfcsProductFamily/LoadData', {
    params: query
  })
}

// 机种查询
export function GetModel (query) {
  return request.get('SfcsModel/LoadData', {
    params: query
  })
}
