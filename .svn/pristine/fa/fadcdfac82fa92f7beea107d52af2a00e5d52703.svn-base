
import request from '@/plugin/axios'

// 查询质检列表 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('MesSpotcheckHeader/LoadDataTwo', {
    params: query
  })
}

// 根据抽检批次号获取抽检数据
export function GetSpotcheckDetailByBatchNo (query) {
  return request.get('MesSpotcheckHeader/GetSpotcheckDetailByBatchNo', {
    params: query
  })
}
// 根据抽检批次号获取质检项目
export function GetSpotcheckIteamsByBatchNo (query) {
  return request.get('MesSpotcheckHeader/GetSpotcheckIteamsByBatchNo', {
    params: query
  })
}

// 根据抽检批次号获取抽检不良明细数据
export function GetSpotcheckFailDetail (data) {
  return request.post('MesSpotcheckHeader/GetSpotcheckFailDetail', data)
}

// 审核抽检单
export function VerifySpotcheckHeader (data) {
  return request.post('AssemblyOperation/AuditSpotCheck', data)
}

// 保存QC过程检验的抽检明细
export function SaveFailDetailData (data) {
  return request.post('MesSpotcheckHeader/SaveFailDetailData', data)
}

// 更新抽检项目数据
export function UpdateSpotCheckIteamsData (data) {
  return request.post('MesSpotcheckHeader/UpdateSpotCheckIteamsData', data)
}

// 根据抽检批次号和SN删除质检明细数据
export function DeleteSpotCheckDetailByBatchNo (query) {
  return request.get('MesSpotcheckHeader/DeleteSpotCheckDetailByBatchNo', {
    params: query
  })
}
