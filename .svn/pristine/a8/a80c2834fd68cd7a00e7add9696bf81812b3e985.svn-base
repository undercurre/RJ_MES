import request from '@/plugin/axios'

// 首页视图
export function Index () {
  return request.get('SmtFeederRepair/Index')
}

// 查询飞达维修信息
export function LoadData (feeder) {
  return request.get('SmtFeederRepair/LoadData', {
    params: {
      feeder
    }
  })
}

// 获取报修飞达列表
export function GetFeeder2RepairList (query) {
  return request.get('SmtFeederRepair/GetFeeder2RepairList', {
    params: query
  })
}

// 获取根本原因列表
export function GetReasonList (query) {
  return request.get('SmtFeederRepair/GetReasonList', {
    params: query
  })
}

// 获取损坏部件列表
export function GetDamagePartList (query) {
  return request.get('SmtFeederRepair/GetDamagePartList', {
    params: query
  })
}

// 获取检查項目列表
export function GetRepairItemsList (query) {
  return request.get('SmtFeederRepair/GetRepairItemsList', {
    params: query
  })
}

// 获取维修结果列表
export function GetResultList () {
  return request.get('SmtFeederRepair/GetResultList', {

  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SmtFeederRepair/SaveData', data)
}
