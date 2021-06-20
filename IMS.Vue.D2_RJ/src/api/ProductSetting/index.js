
import request from '@/plugin/axios'

// 采集零件维护
// 首页视图
export function ComIndex (query) {
  return request.get('SfcsProductComponents/Index', {
    params: query
  })
}

// 查询
export function ComLoadData (query) {
  return request.get('SfcsProductComponents/LoadData', {
    params: query
  })
}
// 保存
export function ComSaveData (data) {
  return request.post('SfcsProductComponents/SaveData', data)
}
// 根据工序ID和资源名称加载作业图列表
export function LoadResourceByIDandName (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadResourceByIDandName',
    method: 'get',
    params: query
  })
}
// 采集箱号维护
// 查询UID数据 搜索按钮对应的处理也是这个方法
export function CaseLoadData (query) {
  return request.get('SfcsProductCarton/LoadData', {
    params: query
  })
}
// 保存数据
export function CaseSaveData (data) {
  return request.post('SfcsProductCarton/SaveData', data)
}

/* //采集资料维护/// */
// 首页视图
export function CollectIndex (query) {
  return request.get('SfcsProductResources/Index', {
    params: query
  })
}
// 查询UID数据 搜索按钮对应的处理也是这个方法
export function CollectLoadData (query) {
  return request.get('SfcsProductResources/LoadData', {
    params: query
  })
}
// 保存数据
export function CollectSaveData (data) {
  return request.post('SfcsProductResources/SaveData', data)
}

/* //采集UID维护/// */
// 首页视图
export function CollectUIDIndex (query) {
  return request.get('SfcsProductUids/Index', {
    params: query
  })
}
// 查询UID数据 搜索按钮对应的处理也是这个方法
export function CollectUIDLoadData (query) {
  return request.get('SfcsProductUids/LoadData', {
    params: query
  })
}
// 保存数据
export function CollectUIDSaveData (data) {
  return request.post('SfcsProductUids/SaveData', data)
}

/* //采集栈板维护/// */
// 查询UID数据 搜索按钮对应的处理也是这个方法
export function PalletLoadData (query) {
  return request.get('SfcsProductPallet/LoadData', {
    params: query
  })
}
// 保存数据
export function PalletSaveData (data) {
  return request.post('SfcsProductPallet/SaveData', data)
}

// 根据料号和选择的配置类型判断是否存在重复的数据
export function ConfigTypeIsExistByPartNo (query) {
  return request.get('SfcsProductConfig/ConfigTypeIsExistByPartNo', {
    params: query
  })
}

// 获取产品制程
export function SfcsRoutesLoadData (query) {
  return request.get('SfcsRoutes/LoadData', {
    params: query
  })
}
// 获取产品制程明细
export function LoadRouteConfig (query) {
  return request.get('SfcsRoutes/LoadRouteConfig', {
    params: query
  })
}
// 获取产品制程明细下拉框
export function SfcsRoutesIndex (query) {
  return request.get('SfcsRoutes/Index', {
    params: query
  })
}
