import request from '@/plugin/axios'

// 首页视图
export function Index (query) {
  return request.get('MesBatchManager/Index', {
    params: query
  })
}
// 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('MesBatchManager/LoadData', {
    params: query
  })
}
// 根据批次管理表批次号查询下方物料报表信息
export function GetMesMaterialInfoList (query) {
  return request.get('MesBatchManager/GetMesMaterialInfoList', {
    params: query
  })
}

// 根据批次管理表ID查询附件表数据
export function GetMesBatchResourcesList (query) {
  return request.get('MesBatchManager/GetMesBatchResourcesList', {
    params: query
  })
}

// 根据批次管理表ID查询周转打印表数据
export function GetMesBatchPrintList (query) {
  return request.get('MesBatchManager/GetMesBatchPrintList', {
    params: query
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('MesBatchManager/SaveData', data)
}

// 根据批次号获取数据(新增页面需要根据批次号带出数据)
export function GetMesBatchDataByLOCNO (query) {
  return request.get('MesBatchManager/GetMesBatchDataByLOCNO', {
    params: query
  })
}
// 根据批次号判断批次管理表中是否存在该批次号(新增时需要判断，不能添加重复批次号)
export function JudgeLocNoIsExistByLocNo (query) {
  return request.get('MesBatchManager/JudgeLocNoIsExistByLocNo', {
    params: query
  })
}

// 删除
export function DeleteMesBatchResourcesById (data) {
  return request.post(`MesBatchManager/DeleteMesBatchResourcesById?id=${data}`)
}

// 根据批次管理表ID获取打印时自动带出的数据
export function GetMesBatchPring (query) {
  return request.get('MesBatchManager/GetMesBatchPring', {
    params: query
  })
}

// 新增打印信息(点击打印时需记录打印相关信息)
export function SaveMesBatchPring (data) {
  return request.post('MesBatchManager/SaveMesBatchPring', data)
}

// 获取标签打印上传文件表中周转箱条码最新的一条数据给前台(前台获取文件名生成一个txt文件)
export function BackStageToPagePrintFile (data) {
  return request.post('MesBatchManager/BackStageToPagePrintFile', data)
}
