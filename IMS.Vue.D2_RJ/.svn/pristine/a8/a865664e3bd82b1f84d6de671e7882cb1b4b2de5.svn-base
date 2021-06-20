import request from '@/plugin/axios'

// 获取工位
export function Station (query) {
  return request({
    url: 'SfcsOperationSites/LoadData',
    method: 'get',
    params: query
  })
}
// 获取工单
export function GetWONO (query) {
  return request({
    url: 'MesProductionLinePreparation/GetWONO',
    method: 'get',
    params: query
  })
}
//  保存站点
export function SaveSite (query) {
  return request({
    url: 'AssemblyOperation/SaveSite',
    method: 'post',
    data: query
  })
}
//  采集数据接口
export function CollectData (query) {
  return request({
    url: 'AssemblyOperation/CollectData',
    method: 'post',
    data: query
  })
}
//  采集过站页数据展示接口
export function CollectProducts (query) {
  return request({
    url: 'CollectProducts/GetCollectProductsData',
    method: 'post',
    data: query
  })
}

//  置满接口
export function SetCatonFull (query) {
  return request({
    url: 'AssemblyOperation/SetCatonFull',
    method: 'post',
    data: query
  })
}

//  产生质检
export function SetQcDocFull (query) {
  return request({
    url: 'AssemblyOperation/SetQcDocFull',
    method: 'post',
    data: query
  })
}

//  lingk栈板作业
export function CollectPalletData (query) {
  return request({
    url: 'AssemblyOperation/CollectPalletData',
    method: 'post',
    data: query
  })
}

//  置满lingk栈板作业
export function SetPalletFull (query) {
  return request({
    url: 'AssemblyOperation/SetPalletFull',
    method: 'post',
    data: query
  })
}

//  保存中转码数据的站点
export function SaveSiteByMiddleCode (query) {
  return request({
    url: 'AssemblyOperation/SaveSiteByMiddleCode',
    method: 'post',
    data: query
  })
}
//  采集中转码数据并生成中转码
export function CollectMiddleCodeData (query) {
  return request({
    url: 'AssemblyOperation/CollectMiddleCodeData',
    method: 'post',
    data: query
  })
}
//  中转码过站处理
export function DoProcessMiddleCode (query) {
  return request({
    url: 'AssemblyOperation/DoProcessMiddleCode',
    method: 'post',
    data: query
  })
}
