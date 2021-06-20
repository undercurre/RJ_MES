import request from '@/plugin/axios'

// 获取线体下拉框
export function GetLineNameList (query) {
  return request.get('SfcsCollectDefects/GetLineNameList', {
    params: query
  })
}

// 获取站点
export function GetSiteNameList (query) {
  return request.get('SfcsCollectDefects/GetSiteNameList', {
    params: query
  })
}

// 获取工序
export function GetOperNameList (query) {
  return request.get('SfcsCollectDefects/GetOperNameList', {
    params: query
  })
}

// 获取SN数据
export function GetSnDataList (query) {
  return request.get('SfcsCollectDefects/GetSnDataList', {
    params: query
  })
}

// 获取原因代码
export function GetReasonCodeList (query) {
  return request.get('SfcsCollectDefects/GetReasonCodeList', {
    params: query
  })
}

// 获取排除故障
export function GetResponserList (query) {
  return request.get('SfcsCollectDefects/GetResponserList', {
    params: query
  })
}

// 根据线体、站位、工序获取站位信息
export function GetRepairSiteData (query) {
  return request.get('SfcsCollectDefects/GetRepairSiteData', {
    params: query
  })
}

// 根据工序ID获取未维修数量
export function GetRefreshUnrepairedQty (OPER_ID) {
  return request.get('SfcsCollectDefects/GetRefreshUnrepairedQty', {
    params: {
      OPER_ID
    }
  })
}

// 根据流水号获取不良维修信息
export function GetBadDataBySN (query) {
  return request.get('SfcsCollectDefects/GetBadDataBySN', {
    params: query
  })
}

// 保存数据
export function SaveRepairData (data) {
  return request.post('SfcsCollectDefects/SaveRepairData', data)
}

// 保存报废功能
export function SaveScrappedData (SN) {
  return request.post('SfcsCollectDefects/SaveScrappedData', {
    SN
  })
}

// 采集资源
export function SfcsProductResourcesLoadData (query) {
  return request.get('SfcsProductResources/LoadData', {
    params: query
  })
}

// 采集UID
export function SfcsProductUidsLoadData (query) {
  return request.get('SfcsProductUids/LoadData', {
    params: query
  })
}

// 采集零件维护
export function SfcsProductComponentsLoadData (query) {
  return request.get('SfcsProductComponents/LoadData', {
    params: query
  })
}

// 零件Index
export function SfcsProductComponentsIndex () {
  return request.get('SfcsProductComponents/Index')
}

// 获取零件信息
export function GetComponentInfomation (partNo) {
  return request.get('SfcsProductConfig/GetComponentInfomation', {
    params: {
      partNo
    }
  })
}

// 获取零件替换信息
export function GetComponentsReplace (partNo) {
  return request.get('SfcsProductConfig/GetComponentsReplace', {
    params: {
      partNo
    }
  })
}

// 零件替换保存
export function SaveComponentReplace (data) {
  return request.post('SfcsProductConfig/SaveComponentReplace', data)
}

// UID首页
export function CollectUIDIndex (query) {
  return request.get('SfcsProductUids/Index', {
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

// 获取UIDS替换信息
export function GetUIDSReplace (partNo) {
  return request.get('SfcsProductUids/GetUIDSReplace', {
    params: {
      partNo
    }
  })
}

// UID替换保存
export function SaveUIDReplace (data) {
  return request.post('SfcsProductUids/SaveUIDReplace', data)
}

// 首页视图
export function CollectIndex (query) {
  return request.get('SfcsProductResources/Index', {
    params: query
  })
}

// 获取资源替换信息
export function GetResourcesReplace (partNo) {
  return request.get('SfcsProductResources/GetResourcesReplace', {
    params: {
      partNo
    }
  })
}

// 产品资源替换保存
export function SaveResourcesReplace (data) {
  return request.post('SfcsProductResources/SaveResourcesReplace', data)
}

// 流程卡表表页面的接口
export function GetRuncardInfoBySn (sn) {
  return request.get('Kanban/GetRuncardInfoBySn', {
    params: {
      sn
    }
  })
}
