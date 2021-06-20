import request from '@/plugin/axios'
import qs from 'qs'

// 首页视图
export function Index (query) {
  return request.get('MesPartTempWarehouse/Index', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('MesPartTempWarehouse/LoadData', {
    params: query
  })
}

// 获取明细数据
export function GetDetailData (query) {
  return request.get('MesPartTempWarehouse/GetDetailData', {
    params: query
  })
}

// 获取操作记录数据
export function GetRecordData (query) {
  return request.get('MesPartTempWarehouse/GetRecordData', {
    params: query
  })
}

// 添加或修改视图
export function AddOrModify (query) {
  return request.get('MesPartTempWarehouse/AddOrModify', {
    params: query
  })
}

// 入库
export function InputWarehouse (query) {
  return request.get('MesPartTempWarehouse/InputWarehouse', {
    params: query
  })
}

// 出库
export function OutputWarehouse (query) {
  return request.get('MesPartTempWarehouse/OutputWarehouse', {
    params: query
  })
}

// 添加或修改的相关操作
export function AddOrModifySave (data) {
  return request.post('MesPartTempWarehouse/AddOrModifySave', data)
}

// 通过ID删除记录
export function DeleteOneById (data) {
  return request.post('MesPartTempWarehouse/DeleteOneById', data)
}

// 通过ID更改激活状态
export function ChangeEnabled (data) {
  return request.post('MesPartTempWarehouse/ChangeEnabled', qs.stringify(data))
}

// 根据物料唯一标识获取物料信息（入库）
export function GetReelDataInput (query) {
  return request.get('MesPartTempWarehouse/GetReelDataInput', {
    params: query
  })
}

// 根据物料唯一标识获取物料信息（出库）
export function GetReelDataOutput (query) {
  return request.get('MesPartTempWarehouse/GetReelDataOutput', {
    params: query
  })
}

// 判断物料条码是否在库存明细中存在
export function IsExistReelDetail (query) {
  return request.get('MesPartTempWarehouse/IsExistReelDetail', {
    params: query
  })
}

// 判断物料编码是否已经存在库存数据
export function IsExistPartNo (query) {
  return request.get('MesPartTempWarehouse/IsExistPartNo', {
    params: query
  })
}

// 根据物料编码获取下一个该出库的物料条码
export function GetNextReelId (query) {
  return request.get('MesPartTempWarehouse/GetNextReelId', {
    params: query
  })
}

// 入库操作
export function InputWarehouseData (data) {
  return request.post('MesPartTempWarehouse/InputWarehouseData', qs.stringify(data))
}

// 出库操作
export function OutputWarehouseData (data) {
  return request.post('MesPartTempWarehouse/OutputWarehouseData', qs.stringify(data))
}
