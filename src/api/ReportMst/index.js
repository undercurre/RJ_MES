import request from '@/plugin/axios'

export function Index () {
  return request.get('ReportMst/Index')
}

export function LoadData (query) {
  return request.get('ReportMst/LoadData', {
    params: query
  })
}

// 查询明细
export function LoadDtlData (query) {
  return request.get('ReportMst/LoadDtlData', {
    params: query
  })
}

// 获取参数列表
export function GetParams (query) {
  return request.get('ReportMst/GetParams', {
    params: query
  })
}

// 查询时获取参数设置及参数数据源
export function GetParamsForQuery (query) {
  return request.get('ReportMst/GetParamsForQuery', {
    params: query
  })
}

// 通过表名获取原始表对应的字段信息集
export function GetIntiTableColumnList (query) {
  return request.get('ReportMst/GetIntiTableColumnList', {
    params: query
  })
}

// SQL获取查询字段列表
export function GetSqlColumnList (query) {
  return request.get('ReportMst/GetSqlColumnList', {
    params: query
  })
}

export function SaveData (data) {
  return request.post('ReportMst/SaveData', data)
}

// 执行SQL
export function QuerySql (data) {
  return request.post('ReportMst/QuerySql', data)
}

// 删除
export function DeleteOneById (data) {
  return request.post('ReportMst/DeleteOneById', data)
}

// 分页下拉框
export function GetSelectPageList (query) {
  return request.get('ReportMst/GetSelectPageList', {
    params: query
  })
}
