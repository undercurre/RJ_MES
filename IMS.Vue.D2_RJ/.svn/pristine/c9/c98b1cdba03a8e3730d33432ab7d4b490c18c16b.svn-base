import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('SfcsRoutes/Index', {
    params: query
  })
}

// 制程名称查询数据 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('SfcsRoutes/LoadData', {
    params: query
  })
}

// 制程设定查询数据
export function LoadRouteConfig (query) {
  return request.get('SfcsRoutes/LoadRouteConfig', {
    params: query
  })
}

// 制程名称保存数据
export function SaveData (data) {
  return request.post('SfcsRoutes/SaveData', data)
}

// 制程设定保存数据
export function RoutesConfigSaveData (data) {
  return request.post('SfcsRoutes/RoutesConfigSaveData', data)
}

export function RoutesConfigSaveDataOfNew (data) {
  return request.post('SfcsRoutes/RoutesConfigSaveDataOfNew', data)
}

// 在切换当前工序和维修工序 返回工序的时候，调用 false不存在可以使用，true的时候不给添加或者修改
export function CheckWIPExistedAPI (query) {
  return request.get('SfcsRoutes/CheckWIPExistedAPI', {
    params: query
  })
}
