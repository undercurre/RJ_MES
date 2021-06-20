import request from '@/plugin/axios'
// 获取巡检列表
export function getlist (query) {
  return request({
    url: 'IpqaConfig/LoadData',
    method: 'get',
    params: query
  })
}
// 保存
export function savedata (query) {
  return request({
    url: 'IpqaConfig/SaveData',
    method: 'post',
    data: query
  })
}
// 删除
export function delet (query) {
  return request({
    url: 'IpqaConfig/DeleteOneById?id=' + query,
    method: 'post'
  })
}
// 检验
export function GetIpqaConfigIsByUsed (query) {
  return request({
    url: 'IpqaConfig/IpqaConfigIsByUsed?id=' + query,
    method: 'get'
  })
}

// 导出数据
export function ExportData (query) {
  return request.get('IpqaConfig/ExportData', {
    params: query
  })
}
