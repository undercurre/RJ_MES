import request from '@/plugin/axios'

// 根据id加载导入特殊SN数据
export function LoadImportRuncardSnByid (id) {
  return request.get('SfcsRuncardRanger/LoadImportRuncardSnByid', {
    params: {
      id
    }
  })
}

// 加载导入特殊SN数据
/**
 * WO_NO
 * USER_NAME
 * BEGIN_TIME
 * END_TIME
 * Page
 * Limit
 * Key
 */
export function LoadImportRuncardSnData (query) {
  return request.get('SfcsRuncardRanger/LoadImportRuncardSnData', {
    params: query
  })
}

// 保存导入特殊SN数据
/**
 * {
      "ID": 0,
      "WO_NO": "string",
      "SN": "string",
      "PARENT_SN": "string",
      "ROUTE_ID": 0,
      "ENABLE": "string",
      "CREATE_TIME": "2020-12-17T01:20:15.545Z",
      "CREATE_BY": "string",
      "UPDATE_TIME": "2020-12-17T01:20:15.545Z",
      "UPDATE_BY": "string",
      "ATTRIBUTE1": "string",
      "ATTRIBUTE2": "string",
      "ATTRIBUTE3": "string",
      "ATTRIBUTE4": "string",
      "ATTRIBUTE5": "string",
      "MAIN_CARD_IMEI": "string",
      "MINOR_CARD_IMEI": "string",
      "BT": "string",
      "MAC": "string",
      "MEID": "string"
    }
 */
export function SaveImportRuncardSnDataByTrans (data) {
  return request.post('SfcsRuncardRanger/SaveImportRuncardSnDataByTrans', data)
}

// 镭雕任务下达数据列表
export function LoadLaserTaskData (query) {
  return request.get('SfcsRuncardRanger/LoadLaserTaskData', {
    params: query
  })
}

// 镭雕任务下达
/**
 * {
  "USER_NAME": "string",
  "TASK_TYPE": 0,
  "ID_LIST": [
    0
  ]
}
  任务类型（1：工单流水号范围；2:导入SN；3:中转码）（必填）
 */
export function LaserTaskReleaseByType (data) {
  return request.post('SfcsRuncardRanger/LaserTaskReleaseByType', data)
}

// 更新镭雕任务状态(批量)
/**
 * {
  "USER_NAME": "string",
  "STATUS_LIST": [
    {
      "ID": 0,
      "ENABLED": "string"
    }
  ]
}
 */
export function UpdateLaserTaskStatus (data) {
  return request.post('SfcsRuncardRanger/UpdateLaserTaskStatus', data)
}

// 加载导入特殊SN主表数据
export function LoadImportRuncardHeaderData (query) {
  return request.get('SfcsRuncardRanger/LoadImportRuncardHeaderData', {
    params: query
  })
}

// 根据主表批量删除导入SN数据
export function SaveImportRuncardHeaderByTrans (data) {
  return request.post('SfcsRuncardRanger/SaveImportRuncardHeaderByTrans', data)
}

// 任务删除
export function DelectLaserTask (data) {
  return request.post('SfcsRuncardRanger/DelectLaserTask', data)
}

// 工单投入查询报表
export function LoadInputSNDataByWoNo (query) {
  return request.get('SfcsRuncardRanger/LoadInputSNDataByWoNo', {
    params: query
  })
}
// 通过Excel导入SN到数据库并进行数据校验(关联表IMPORT_RUNCARD_SN)
export function SaveExcelDataEx (data) {
  return request.post('SfcsRuncardRanger/SaveExcelDataEx', data)
}
