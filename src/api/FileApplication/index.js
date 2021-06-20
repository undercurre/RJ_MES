import request from '@/plugin/axios'

// 文件申请 查询数据
export function FileApplyLoadData (query) {
  return request.get('MesBurnFileApply/FileApplyLoadData', {
    params: query
  })
}

// 下表查询
export function ApplyRelationLoadData (query) {
  return request.get('MesBurnFileApply/ApplyRelationLoadData', {
    params: query
  })
}

// 文件申请编号
export function GetApplyNo () {
  return request.get('MesBurnFileApply/GetApplyNo')
}

// 保存数据
export function SaveBurnFileApplyAndRelation (data) {
  return request.post('MesBurnFileApply/SaveBurnFileApplyAndRelation', data)
}

//
export function FileManagerLoadData (query) {
  return request.get('MesBurnFileApply/FileManagerLoadData', {
    params: query
  })
}

// 首页视图
export function Index (query) {
  return request.get('MesBurnFileApply/Index', {
    params: query
  })
}
