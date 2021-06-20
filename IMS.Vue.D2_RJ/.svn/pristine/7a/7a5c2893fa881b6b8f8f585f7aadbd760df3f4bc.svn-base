import request from '@/plugin/axios'

// 获取列表
export function LoadData (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadData',
    method: 'get',
    params: query
  })
}
// 删除单据
export function Delete (query) {
  return request({
    url: 'SimpleSOPRoutes/Delete?id=' + query,
    method: 'post'
  })
}
// 审核
export function AuditByIdAsync (query) {
  return request({
    url: 'SimpleSOPRoutes/AuditByIdAsync',
    method: 'post',
    data: query
  })
}
// 取消审核
export function UnAuditByIdAsync (query) {
  return request({
    url: 'SimpleSOPRoutes/UnAuditByIdAsync',
    method: 'post',
    data: query
  })
}
// SOP复制 执行方法
export function SOPCopySave (query) {
  return request({
    url: 'SimpleSOPRoutes/SOPCopySave',
    method: 'post',
    data: query
  })
}

// 添加或者编辑页面
// 获取明细
export function AddOrModify (query) {
  return request({
    url: 'SimpleSOPRoutes/AddOrModify?id=' + query,
    method: 'get'
  })
}
// 获取工序列表
export function GetOperationList (query) {
  return request({
    url: 'SimpleSOPRoutes/GetOperationList',
    method: 'get',
    params: query
  })
}
// 工序子表
export function LoadDtlData (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadDtlData?id=' + query,
    method: 'get'
  })
}
// 产品图:资源列表
export function LoadResource (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadResource',
    method: 'get',
    params: query
  })
}
// 零件图:资源列表
export function LoadResourceCmpData (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadResourceCmpData',
    method: 'get',
    params: query
  })
}

// 保存单据
export function AddOrModifySave (query) {
  return request({
    url: 'SimpleSOPRoutes/AddOrModifySave',
    method: 'post',
    data: query
  })
}
// 删除当前工序
export function DeleteSub (query) {
  return request({
    url: 'SimpleSOPRoutes/DeleteSub?id=' + query,
    method: 'post'
  })
}

// 获取图片 预览/编辑 资源
export function PreviewSOP (query) {
  return request({
    url: 'SimpleSOPRoutes/PreviewSOP',
    method: 'get',
    params: query
  })
}
// 保存图片说明
export function UpdateMsgInfo (query) {
  return request({
    url: 'SimpleSOPRoutes/UpdateMsgInfo',
    method: 'post',
    data: query
  })
}

// 删除当前删除资源
export function DeleteResource (query) {
  return request({
    url: 'SimpleSOPRoutes/DeleteResource?id=' + query,
    method: 'post'
  })
}

// 是否存在相同的名称的料号
export function IsExistsName (query) {
  return request({
    url: 'SimpleSOPRoutes/IsExistsName',
    method: 'get',
    params: query
  })
}

// 根据零件料号获取零件信息
export function GetPartByPartNo (query) {
  return request({
    url: 'SimpleSOPRoutes/GetPartByPartNo?partNo=' + query,
    method: 'get'
  })
}

// 新SOP复制 执行方法
export function SOPCopySaveNew (query) {
  return request({
    url: 'SimpleSOPRoutes/SOPCopySaveNew',
    method: 'post',
    data: query
  })
}
// 获取零件信息(未使用工艺路线的料号)
export function GetNewPart (query) {
  return request({
    url: 'SimpleSOPRoutes/GetNewPart',
    method: 'get',
    params: query
  })
}
// 批量新的SOP复制 执行方法（2020 - 12 - 09）
export function BatchSOPCopySaveNew (query) {
  return request({
    url: 'SimpleSOPRoutes/BatchSOPCopySaveNew',
    method: 'post',
    data: query
  })
}
// 通过成品料号 获取零件料号
export function LoadDataByPartNo (query) {
  return request({
    url: 'SimpleSOPRoutes/LoadDataByPartNo',
    method: 'get',
    params: query
  })
}
