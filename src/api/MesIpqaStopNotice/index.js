import request from '@/plugin/axios'
// 查询线体数据
export function GetLinesList (query) {
  return request({
    url: 'MesIpqaStopNotice/GetLinesList',
    method: 'get',
    params: query
  })
}
// 查询部门数据
export function GetDepartmentList (query) {
  return request({
    url: 'MesIpqaStopNotice/GetDepartmentList',
    method: 'get',
    params: query
  })
}
// 根据工单号获取产品信息
export function GetPartDataByWoNo (query) {
  return request({
    url: 'MesIpqaStopNotice/GetPartDataByWoNo?wo_no=' + query,
    method: 'get'
  })
}
// 查询原因分析数据
export function GetAnalysisOpinionList (query) {
  return request({
    url: 'MesIpqaStopNotice/GetAnalysisOpinionList',
    method: 'get',
    params: query
  })
}
// 获取当前线别在线工单
export function GetWoNoByLineId (query) {
  return request({
    url: 'MesIpqaStopNotice/GetWoNoByLineId?line_id=' + query,
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'MesIpqaStopNotice/LoadData',
    method: 'get',
    params: query
  })
}
// 选择用户
export function ManagLoadData (query) {
  return request({
    url: 'Manager/LoadData',
    method: 'get',
    params: query
  })
}
//  审核
export function AuditBill (query) {
  return request({
    url: 'MesIpqaStopNotice/AuditBill',
    method: 'post',
    data: query
  })
}
//  批准
export function ApprovalBill (query) {
  return request({
    url: 'MesIpqaStopNotice/ApprovalBill',
    method: 'post',
    data: query
  })
}
// 删除
export function DeleteOneById (query) {
  return request({
    url: 'MesIpqaStopNotice/DeleteOneById?id=' + query,
    method: 'post'
  })
}
// 保存数据
export function SaveData (query) {
  return request({
    url: 'MesIpqaStopNotice/SaveData',
    method: 'post',
    data: query
  })
}
