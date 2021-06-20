import request from '@/plugin/axios'

export function Index () {
  return request.get('SmtProducePlan/Index')
}

// 查询料单数据
export function LoadData (query) {
  return request.get('SmtProducePlan/LoadData', {
    params: query
  })
}
// 获取线体
export function SmtLinesLoadData (query) {
  return request.get('SmtLines/LoadData', {
    params: query
  })
}

// 获取DIP线体
export function SfcsOperationLinesLoadData (query) {
  return request.get('SfcsOperationLines/LoadData', {
    params: query
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SmtProducePlan/SaveData', data)
}

// 删除
export function AIPlacementSaveData (data) {
  return request.post('SmtProducePlan/DeleteOneById', {}, {
    params: {
      id: data
    }
  })
}

// 导出模板
export function ExportTPL (planType) {
  return request.get('SmtProducePlan/ExportTPL', {
    params: {
      plan_type: planType
    }
  })
}

// 导出4天计划
export function ExportPlanDataToExcel (query) {
  return request.get('SmtProducePlan/ExportPlanDataToExcel', {
    params: query
  })
}
