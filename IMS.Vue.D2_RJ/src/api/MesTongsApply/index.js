import request from '@/plugin/axios'
import qs from 'qs'

// 首页视图
export function Index (query) {
  return request.get('MesTongsApply/Index', {
    params: query
  })
}

// 获取夹具类别
export function GetTongsTypeList (query) {
  return request.get('MesTongsApply/GetTongsTypeList', {
    params: query
  })
}
// 查询
export function LoadData (query) {
  return request.get('MesTongsApply/LoadData', {
    params: query
  })
}

// 查询申请信息以及对应产品信息
export function LoadDataAndPart (query) {
  return request.get('MesTongsApply/LoadDataAndPart', {
    params: query
  })
}

// 添加或修改视图
export function AddOrModify (query) {
  return request.get('MesTongsApply/AddOrModify', {
    params: query
  })
}

// 添加或修改的相关操作
// export function AddOrModifySave(data) {
//   return request.post('MesTongsApply/AddOrModifySave', data)
// }
export function AddOrModifySave (data) {
  return request.post('MesTongsApply/AddOrModifySave', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 通过ID删除记录
export function DeleteOneById (query) {
  return request({
    url: 'MesTongsApply/DeleteOneById?id=' + query,
    method: 'post'
  })
}

// 通过ID更改激活状态
export function ChangeEnabled (data) {
  return request.post('MesTongsApply/ChangeEnabled', data)
}

// 根据ID获取夹具申请信息
export function GetTongsApplyById (query) {
  return request.get('MesTongsApply/GetTongsApplyById', {
    params: query
  })
}

// 根据夹具申请ID获取对应产品信息
export function GetTongsApplyPartData (query) {
  return request.get('MesTongsApply/GetTongsApplyPartData', {
    params: query
  })
}

// 根据夹具申请ID获取对应已入库夹具信息
export function GetTongsDataByApplyId (query) {
  return request.get('MesTongsApply/GetTongsDataByApplyId', {
    params: query
  })
}

// 审核夹具申请信息
// export function AuditData (data) {
//   return request.post('MesTongsApply/AuditData', data)
// }
export function AuditData (query, data) {
  return request({
    url: `MesTongsApply/AuditData?id=${query}&user=${data}`,
    method: 'post'
  })
}

// 根据料号获取产品信息
export function GetPartByPartNo (query) {
  return request.get('MesTongsInfo/GetPartByPartNo', {
    params: query
  })
}
