import request from '@/plugin/axios'

// 获取巡检列表
export function Index () {
  return request({
    url: 'SfcsEquipKeep/Index',
    method: 'get'
  })
}
// 获取列表
export function LoadData (query) {
  return request({
    url: 'SfcsCustomersComplaint/LoadData',
    method: 'get',
    params: query
  })
}
// 删除
export function Delete (id) {
  console.log(id)
  return request({
    url: 'SfcsCustomersComplaint/DeleteOneById?Id=' + id,
    method: 'post'
  })
}
// 审核
export function CheckBill (query) {
  return request({
    url: 'SfcsEquipKeep/CheckBill',
    method: 'post',
    data: query
  })
}
// 拒绝
export function RejectBill (query) {
  return request({
    url: 'SfcsEquipKeep/RejectBill',
    method: 'post',
    data: query
  })
}

// 查询明细数据
export function LoadDtlData (query) {
  return request({
    url: 'SfcsEquipKeep/LoadDtlData?m_id=' + query,
    method: 'get'
  })
}
// 查询主表数据
export function LoadMainData (query) {
  return request({
    url: 'SfcsEquipKeep/LoadMainData?id=' + query,
    method: 'get'
  })
}

export function GetKeepConfigData (query) {
  return request({
    url: 'SfcsEquipKeep/GetKeepConfigData',
    method: 'get',
    params: query
  })
}
// 添加或修改视图
export function AddOrModify (query) {
  return request({
    url: 'SfcsEquipKeep/AddOrModify?id=' + query,
    method: 'get'
  })
}

export function GetEquipmentStatus (query) {
  return request({
    url: 'SfcsEquipKeep/GetEquipmentStatus?equip_id=' + query,
    method: 'get'
  })
}
// 获取设备列表
export function GetEquipmentList (query) {
  return request({
    url: 'SfcsEquipKeep/GetEquipmentList',
    method: 'get'
  })
}

// 查询点检作业图数据
export function LoadSOPData (query) {
  return request({
    url: 'SfcsEquipKeep/LoadSOPData?id=' + query,
    method: 'get'
  })
}
// 保存
export function SaveData (query, list) {
  console.log(query)
  return request({
    url: 'SfcsCustomersComplaint/AddOrModifyAsync',
    method: 'post',
    data: query
  })
}
// 提交审核
export function PostToCheck (query) {
  return request({
    url: 'SfcsEquipKeep/PostToCheck',
    method: 'post',
    data: query
  })
}

// 获取配置信息
export function GetConfigs (params) {
  return request.get('SfcsEquipKeep/GetConfigs', {
    params
  })
}

// 获取数据
export function GetMonthData (params) {
  return request.get('SfcsEquipKeep/GetMonthData', {
    params
  })
}

// 添加或修改视图
export function GetCustomerList (query) {
  return request({
    url: 'SfcsCustomersComplaint/GetCustomerList',
    method: 'get'
  })
}

// 获取物料名称
export function GetPartDesc (query) {
  return request({
    url: 'SfcsCustomersComplaint/GetPartDesc?Code=' + query,
    method: 'get'
  })
}

// 获取图片资源
export function GetPhotoList (query) {
  console.log(query)
  return request({
    url: 'SfcsCustomersComplaint/GetPhotoList?ID=' + query,
    method: 'get'
  })
}

//  删除文件
export function DeleteFile (query) {
  return request({
    url: 'SfcsCustomersComplaint/DeleteFile?ID=' + query,
    method: 'post'
  })
}
