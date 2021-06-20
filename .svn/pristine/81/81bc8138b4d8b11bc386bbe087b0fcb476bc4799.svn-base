import request from '@/plugin/axios'
// 查询所有 搜索按钮对应的处理也是这个方法
export function ListData (query) {
  return request({
    url: 'MesTongsStoreConfig/LoadData',
    method: 'get',
    params: query
  })
}

// 获取选择夹具申请信息
export function LoadDataAndPart (query) {
  return request({
    url: 'MesTongsApply/LoadDataAndPart',
    method: 'get',
    params: query
  })
}

// 判断夹具编码是否存在
export function IsExistCode (query) {
  return request({
    url: 'MesTongsInfo/IsExistCode',
    method: 'get',
    params: query
  })
}

// 夹具信息管理 首页
export function Index () {
  return request({
    url: 'MesTongsInfo/Index',
    method: 'get'
  })
}
//  查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'MesTongsInfo/LoadData',
    method: 'get',
    params: query
  })
}

// 新增/修改视图
export function AddOrModify (val) {
  return request({
    url: 'MesTongsInfo/AddOrModify?id=' + val,
    method: 'get'
  })
}
// 根据ID获取夹具信息
export function GetTongsById (val) {
  return request({
    url: 'MesTongsInfo/GetTongsById?id=' + val,
    method: 'get'
  })
}
// 子表
// 根据料号获取产品信息
export function GetPartByPartNo (val) {
  return request({
    url: 'MesTongsInfo/GetPartByPartNo?partNo=' + val,
    method: 'get'
  })
}
// 根据夹具ID获取夹具操作记录
export function GetTongsOperationData (val) {
  return request({
    url: 'MesTongsInfo/GetTongsOperationData?id=' + val,
    method: 'get'
  })
}
// 根据夹具ID获取保养/激活记录
export function GetMaintainData (val) {
  return request({
    url: 'MesTongsInfo/GetMaintainData?id=' + val,
    method: 'get'
  })
}
//  根据保养主表ID获取保养明细数据
export function GetMaintainDetailData (val) {
  return request({
    url: 'MesTongsInfo/GetMaintainDetailData?id=' + val,
    method: 'get'
  })
}
//  根据夹具ID获取维修记录
export function GetRepairData (val) {
  return request({
    url: 'MesTongsInfo/GetRepairData?id=' + val,
    method: 'get'
  })
}
//  结束激活
export function EndActive (query) {
  return request({
    url: 'MesTongsInfo/EndActive',
    method: 'post',
    data: query
  })
}

// 保存数据
export function AddOrModifySave (query) {
  return request({
    url: 'MesTongsInfo/AddOrModifySave',
    method: 'post',
    data: query
  })
}
// 开始激活
export function BeginActive (val, name) {
  return request({
    url: 'MesTongsInfo/BeginActive',
    method: 'post',
    data: {
      TongsID: val,
      UserName: name
    }
  })
}
// 获取激活事项列表
export function GetActiveItemsData (val) {
  return request({
    url: 'MesTongsInfo/GetActiveItemsData?tongsType=' + val,
    method: 'get'
  })
}

// 夹具入库
export function EnterStore (val) {
  return request({
    url: 'MesTongsInfo/EnterStore',
    method: 'post',
    data: val
  })
}
// 变更储位
export function ChangeStore (val) {
  return request({
    url: 'MesTongsInfo/ChangeStore',
    method: 'post',
    data: val
  })
}

// 领用夹具
export function BorrowTongs (val) {
  return request({
    url: 'MesTongsInfo/BorrowTongs',
    method: 'post',
    data: val
  })
}

// 永久借出
export function PermanentLendTongs (data) {
  return request({
    url: `MesTongsInfo/PermanentLendTongs?tongsId=${data.tongsId}&remark=${data.remark}&LoginName=${data.LoginName}`,
    method: 'post'
  })
}

// 申请入库（批量新增）
export function ApplyGoStore (data) {
  return request.post('MesTongsInfo/ApplyGoStore', data
  )
}

// 获取保养事项列表
export function GetMaintainItemsData (val) {
  return request({
    url: 'MesTongsInfo/GetMaintainItemsData?tongsType=' + val,
    method: 'get'
  })
}
// 开始保养
export function BeginMaintain (val, name) {
  return request({
    url: 'MesTongsInfo/BeginMaintain',
    method: 'post',
    data: {
      TongsID: val,
      UserName: name
    }
  })
}
// 结束保养
export function EndMaintain (val) {
  return request({
    url: 'MesTongsInfo/EndMaintain',
    method: 'post',
    data: val
  })
}
//  获取夹具已经是维修状态但还未做维修动作的维修数据
export function GetRepairByTongsId (val) {
  return request({
    url: 'MesTongsInfo/GetRepairByTongsId?tongsId=' + val,
    method: 'get'
  })
}
// 维修夹具
export function RepairTongs (val) {
  return request({
    url: 'MesTongsInfo/RepairTongs',
    method: 'post',
    data: val
  })
}

export function ApplyGoStoreByModel (val, val2) {
  return request({
    url: `MesTongsInfo/ApplyGoStoreByModel?LoginName=${val2.LoginName}&ORGANIZE_ID=${val2.ORGANIZE_ID}`,
    method: 'post',
    data: val
  })
}

export function ExportData (query) {
  return request.get('MesTongsInfo/ExportData', {
    params: query
  })
}
