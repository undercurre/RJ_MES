import request from '@/plugin/axios'

export function Index () {
  return request.get('SmtPlacementHeader/Index')
}

// 查询料单数据
export function LoadData (query) {
  return request.get('SmtPlacementHeader/LoadData', {
    params: query
  })
}

// 明细列表
export function GetDetailData (mstId) {
  return request.get('SmtPlacementHeader/GetDetailData', {
    params: {
      mst_id: mstId
    }
  })
}

// 编辑视图
export function EditView (mstId) {
  return request.get('SmtPlacementHeader/EditView', {
    params: {
      mst_id: mstId
    }
  })
}

// 料单编辑之保存数据
export function SaveData (data) {
  return request.post('SmtPlacementHeader/SaveData', data)
}

// AI料单上传视图
export function ImportAIPlacementView (Type) {
  return request.get('SmtPlacementHeader/ImportAIPlacementView', {
    params: {
      Type
    }
  })
}

// AI料单文件上传信息
export function ImportAIPlacementFile () {
  return request.post('SmtPlacementHeader/ImportAIPlacementFile')
}

// AI料单上传之料单BOM比对
export function AIPlacementCompareByBom (data) {
  return request.post('SmtPlacementHeader/AIPlacementCompareByBom', data)
}

// AI料单上传之保存数据(注,先要作BOM比对,再作保存)
export function AIPlacementSaveData (data) {
  return request.post('SmtPlacementHeader/AIPlacementSaveData', data)
}

// 西门子料单保存数据
export function SiemensPlacementSaveData (data) {
  return request.post('SmtPlacementHeader/SiemensPlacementSaveData', data)
}
