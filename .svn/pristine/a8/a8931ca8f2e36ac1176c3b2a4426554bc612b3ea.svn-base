import request from '@/plugin/axios'

// 首页视图
export function Index () {
  return request.get('MesProductionPreMst/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('MesProductionPreMst/LoadData', {
    params: query
  })
}

// 获取工单信息
export function GetWoInfo (woNo) {
  return request.get('MesProductionPreMst/GetWoInfo', {
    params: {
      wo_no: woNo
    }
  })
}

// 获取明细信息
export function GetDetailInfo (id) {
  return request.get('MesProductionPreMst/GetDetailInfo', {
    params: {
      id
    }
  })
}

// 保存数据
export function SaveData (data) {
  console.log(JSON.stringify(data))
  return request.post('MesProductionPreMst/SaveData', data)
}

// 机种
export function SfcsModelLoadData (query) {
  return request.get('SfcsModel/LoadData', {
    params: query
  })
}

// 客户
export function SfcsCustomersLoadData (query) {
  return request.get('SfcsCustomers/LoadData', {
    params: query
  })
}

// 贴片线体
export function SmtLinesLoadData (query) {
  return request.get('SmtLines/LoadData', {
    params: query
  })
}

// 生产线体
export function SfcsOperationLinesLoadData (query) {
  return request.get('SfcsOperationLines/LoadData', {
    params: query
  })
}

// 产前确认配置LoadData
export function MesProductionPreConfLoadData (query) {
  return request.get('MesProductionPreConf/LoadData', {
    params: query
  })
}

// 删除
export function DeleteBill (id) {
  return request.post('MesProductionPreMst/DeleteBill', {}, {
    params: {
      id
    }
  })
}
