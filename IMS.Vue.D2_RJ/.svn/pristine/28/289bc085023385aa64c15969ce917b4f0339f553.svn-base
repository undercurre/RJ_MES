import request from '@/plugin/axios'

// 获取列表
export function LoadData (query) {
  return request({
    url: 'SOPRoutes/LoadData',
    method: 'get',
    params: query
  })
}
// 删除单据
export function Delete (query) {
  return request({
    url: 'SOPRoutes/Delete?id=' + query,
    method: 'post'
  })
}
// 审核
export function AuditByIdAsync (query) {
  return request({
    url: 'SOPRoutes/AuditByIdAsync',
    method: 'post',
    data: query,
    headers: {
      // contentType: 'application/json'
      contentType: 'application/json-patch+json'
    }
  })
}
// 取消审核
export function UnAuditByIdAsync (query) {
  return request({
    url: 'SOPRoutes/UnAuditByIdAsync',
    method: 'post',
    data: query
  })
}
// SOP复制 执行方法
export function SOPCopySave (query) {
  return request({
    url: 'SOPRoutes/SOPCopySave',
    method: 'post',
    data: query
  })
}

// 添加或者编辑页面
// 获取明细
export function AddOrModify (query) {
  return request({
    url: 'SOPRoutes/AddOrModify?id=' + query,
    method: 'get'
  })
}
// 获取工序列表
export function GetOperationList (query) {
  return request({
    url: 'SOPRoutes/GetOperationList',
    method: 'get',
    params: query
  })
}
// 工序子表
export function LoadDtlData (query) {
  return request({
    url: 'SOPRoutes/LoadDtlData?id=' + query,
    method: 'get'
  })
}
// 产品图:资源列表
export function LoadResource (query) {
  return request({
    url: 'SOPRoutes/LoadResource',
    method: 'get',
    params: query
  })
}
// 零件图:资源列表
export function LoadResourceCmpData (query) {
  return request({
    url: 'SOPRoutes/LoadResourceCmpData',
    method: 'get',
    params: query
  })
}

// 保存单据
export function AddOrModifySave (query) {
  return request({
    url: 'SOPRoutes/AddOrModifySave',
    method: 'post',
    data: query
  })
}
// 删除当前工序
export function DeleteSub (query) {
  return request({
    url: 'SOPRoutes/DeleteSub?id=' + query,
    method: 'post'
  })
}

// 获取图片 预览/编辑 资源
export function PreviewSOP (query) {
  return request({
    url: 'SOPRoutes/PreviewSOP',
    method: 'get',
    params: query
  })
}
// 保存图片说明
export function UpdateMsgInfo (query) {
  return request({
    url: 'SOPRoutes/UpdateMsgInfo',
    method: 'post',
    data: query
  })
}

// 删除当前删除资源
export function DeleteResource (query) {
  return request({
    url: 'SOPRoutes/DeleteResource?id=' + query,
    method: 'post'
  })
}

// 是否存在相同的名称的料号
export function IsExistsName (query) {
  return request({
    url: 'SOPRoutes/IsExistsName',
    method: 'get',
    params: query
  })
}

// 根据零件料号获取零件信息
export function GetPartByPartNo (query) {
  return request({
    url: 'SOPRoutes/GetPartByPartNo?partNo=' + query,
    method: 'get'
  })
}

// 获取文件系统信息
export function GetDocumentSystemData (query) {
  return request({
    url: 'SOPRoutes/GetDocumentSystemData',
    method: 'get',
    params: query
  })
}

// 文控系统
export function UploadDocumentSystem (query) {
  return request({
    url: 'SOPRoutes/UploadDocumentSystem',
    method: 'post',
    data: query
  })
}
