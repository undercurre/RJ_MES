import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request.get('MesQualityInfo/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('MesQualityInfo/LoadData', {
    params: query
  })
}

// 获取当前生产信息
export function GetProductionInfo (query) {
  return request.get('MesQualityInfo/GetProductionInfo', {
    params: {
      lineId: query
    }
  })
}
// 获取信息
export function AddOrModifyDetail (query) {
  return request.get('MesQualityInfo/AddOrModifyDetail', {
    params: {
      mstId: query
    }
  })
}

// 获取检验明细数据
export function GetDetailData (query) {
  return request.get('MesQualityInfo/GetDetailData', {
    params: {
      mstId: query
    }
  })
}
// 获取检验明细项目信息
export function GetDetailItemData (query) {
  return request.get('MesQualityInfo/GetDetailItemData', {
    params: {
      mst_id: query
    }
  })
}

// 通过ID删除记录
export function DeleteOneById (id) {
  return request.post('MesQualityInfo/DeleteOneById', {}, {
    params: {
      id
    }
  })
}

// 审核首五件信息
export function AuditData (data) {
  return request.post('MesQualityInfo/AuditData', data)
}

// 添加或修改的相关操作（明细）
export function AddOrModifyDetailSave (data) {
  return request.post('MesQualityInfo/AddOrModifyDetailSave', data)
}
// 添加或修改的相关操作
export function AddOrModifyAsync (data) {
  return request.post('MesQualityInfo/AddOrModifyAsync', data)
  // return request.post('MesQualityInfo/AddOrModifyAsync', qs.stringify(data))
}

// 获取物料确认明细项目信息
export function GetDetailBOMData (query) {
  return request.get('MesQualityInfo/GetDetailBOMData', {
    params: query
  })
}

// 获取BOM信息
export function AddOrModifyBomDetail (query) {
  return request.get('MesQualityInfo/AddOrModifyBomDetail', {
    params: {
      mstId: query
    }
  })
}

// 添加或修改物料确认的相关操作（明细）
export function AddOrModifyBomDetailSave (data) {
  console.log(JSON.stringify(data))
  return request.post('MesQualityInfo/AddOrModifyBomDetailSave', data)
}
