import request from '@/plugin/axios'

export function Index () {
  return request.get('SfcsProductStopline/Index')
}

// 查询制程名称列表
export function GetRoutesList (partNo) {
  return request.get('SfcsProductStopline/GetRoutesList', {
    params: {
      part_no: partNo
    }
  })
}

// 查询数据(制程工序列表及产品停线管控规则配置列表)
export function LoadData (query) { // part_no route_id
  return request.get('SfcsProductStopline/LoadData', {
    params: query
  })
}

// 修改[停线管控模式]時同時修改单位,是否累计误测
export function GetDivisionUnit (stoplineMode) {
  return request.get('SfcsProductStopline/GetDivisionUnit', {
    params: {
      stopline_mode: stoplineMode
    }
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SfcsProductStopline/SaveData', data)
}
// ------------------------------
// 编辑页面 - 呼叫内容下拉框视图（获取异常种类、异常类型、异常标题下拉框）
export function CallConfigIndex () {
  return request.get('SfcsProductStopline/CallConfigIndex')
}

// 查询停线管控页面数据 - New 搜索按钮对应的处理也是这个方法
export function LoadDataNew (query) { // part_no route_id
  return request.get('SfcsProductStopline/LoadDataNew', {
    params: query
  })
}
// 通过ID更改停线管控主表激活状态
export function ChangeEnabled (data) {
  return request.post('SfcsProductStopline/ChangeEnabled', data)
}

// 删除(删除停线管控主表数据)
export function DeleteOneById (data) {
  return request.post('SfcsProductStopline/DeleteOneById?id=' + data)
}
// 根据异常种类、类型和异常标题获取异常内容配置表(ID、异常代码CALL_CODE、内容模板CHINESE)信息
export function GetCallContentConfigByTypeCode (query) {
  return request.get('SfcsProductStopline/GetCallContentConfigByTypeCode', {
    params: query
  })
}

// 根据主表ID获取停线管控主表和呼叫子表数据(主表编辑时需要带出主表信息和呼叫子表信息，CallID为子表ID)
export function GetStopLineAndCallDataByID (query) {
  return request.get('SfcsProductStopline/GetStopLineAndCallDataByID', {
    params: query
  })
}

// 保存停线管控表、呼叫表数据 - New
export function SaveDataNew (data) {
  return request.post('SfcsProductStopline/SaveDataNew', data)
}

// 查询停线管控线别表数据(页面下方展示) 搜索按钮对应的处理也是这个方法
export function LoadDataStopLines (query) {
  return request.get('SfcsProductStopline/LoadDataStopLines', {
    params: query
  })
}

// 通过ID更改停线管控线别表数据激活状态
export function ChangeStopLinesEnabled (data) {
  return request.post('SfcsProductStopline/ChangeStopLinesEnabled', data)
}
// 根据ID删除停线管控线别表数据
export function DeleteStopLinesById (data) {
  return request.post('SfcsProductStopline/DeleteStopLinesById?id=' + data)
}

// 查询数据(新增停线管控线别表页面时)
export function GetStopLinesToAdd (query) {
  return request.get('SfcsProductStopline/GetStopLinesToAdd', {
    params: query
  })
}

// 保存数据(保存停线管控线别表数据)
export function SaveDataStopLines (data) {
  return request.post('SfcsProductStopline/SaveDataStopLines', data)
}
// 查询停线管控产品表数据(页面下方展示) 搜索按钮对应的处理也是这个方法
export function LoadDataLinePN (query) {
  return request.get('SfcsProductStopline/LoadDataLinePN', {
    params: query
  })
}

export function ChangeLinePNEnabled (data) {
  return request.post('SfcsProductStopline/ChangeLinePNEnabled', data)
}
// 根据ID删除停线管控产品表数据
export function DeleteLinePNById (data) {
  return request.post('SfcsProductStopline/DeleteLinePNById?id=' + data)
}

// 查询数据(新增停线管控产品表页面)
export function GetLinePNoAdd (query) {
  return request.get('SfcsProductStopline/GetLinePNoAdd', {
    params: query
  })
}
// 保存停线管控产品表数据
export function SaveLinePNData (data) {
  return request.post('SfcsProductStopline/SaveLinePNData', data)
}
