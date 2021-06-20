import request from '@/plugin/axios'

// 首页
export function Index () {
  return request.get('AndonCallRuleConfig/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('AndonCallRuleConfig/LoadData', {
    params: query
  })
}

// 保存
export function SaveData (data) {
  return request.post('AndonCallRuleConfig/SaveData', data)
}

// 删除
export function DeleteOneById (data) {
  return request.post(`AndonCallRuleConfig/DeleteOneById?id=${data}`)
}

// 推送规则
export function PersonRuleLoadData (query) {
  return request.get('AndonCallPersonRule/LoadData', {
    params: query
  })
}

// 推送人员
export function GroupRuleReLoadData (query) {
  return request.get('AndonCallGroupRuleRe/LoadData', {
    params: query
  })
}
// 用户
export function ManagerLoadData (query) {
  return request.get('Manager/LoadData', {
    params: query
  })
}

// 接收者
export function MesMessageReceiverGroupLoadData (query) {
  return request.get('MesMessageReceiverGroup/LoadData', {
    params: query
  })
}
// 保存接收者
export function SaveAndonCallGroupRuleRe (data) {
  return request.post('AndonCallGroupRuleRe/SaveData', data)
}

// 删除
export function DeleteGroupRuleRe (data) {
  return request.post(`AndonCallGroupRuleRe/DeleteOneById?id=${data}`)
}
// 标题
export function AndonCallContentConfigLoadData (query) {
  return request.get('AndonCallContentConfig/LoadData', {
    params: query
  })
}
