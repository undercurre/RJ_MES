import request from '@/plugin/axios'

export function GetConfigTypeList (query) {
  return request.get('SfcsProductConfig/GetConfigTypeList', {
    params: query
  })
}
// 根据料号和选择的配置类型判断是否存在重复的数据
export function ConfigTypeIsExistByPartNo (query) {
  return request.get('SfcsProductConfig/ConfigTypeIsExistByPartNo', {
    params: query
  })
}
