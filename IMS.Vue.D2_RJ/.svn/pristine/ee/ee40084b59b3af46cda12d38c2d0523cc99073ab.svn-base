import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'SmtDefectsRecords/Index',
    method: 'get'
  })
}
// 查询所有
export function LoadData (query) {
  return request({
    url: 'SmtDefectsRecords/LoadData',
    method: 'get',
    params: query
  })
}
// 获取子表数据
export function GetReportDefectsRecordDtlList (query) {
  return request({
    url: 'SmtDefectsRecords/GetReportDefectsRecordDtlList',
    method: 'get',
    params: query
  })
}
// 获取线体工单信息
export function GetWoInfoByLine (query) {
  return request({
    url: 'SmtDefectsRecords/GetWoInfoByLine',
    method: 'get',
    params: query
  })
}
// 审核
export function Check (query) {
  return request({
    url: 'SmtDefectsRecords/Check',
    method: 'get',
    params: query
  })
}
// 取消审核
export function CancelCheck (query) {
  return request({
    url: 'SmtDefectsRecords/CancelCheck',
    method: 'get',
    params: query
  })
}
//  子表保存、删除数据
export function SaveDataDTL (query) {
  return request({
    url: 'SmtDefectsRecords/SaveData_DTL',
    method: 'post',
    data: query
  })
}

//  保存、删除数据
export function SaveData (query) {
  return request({
    url: 'SmtDefectsRecords/SaveData',
    method: 'post',
    data: query
  })
}
