import request from '@/plugin/axios'

// 首页视图
export function Index () {
  return request.get('SfcsInboundRecordInfo/Index')
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('SfcsInboundRecordInfo/LoadData', query)
}
// 当前ID是否已被使用
export function ItemIsByUsed (query) {
  return request.get('SfcsInboundRecordInfo/ItemIsByUsed?id=' + query)
}
// 保存数据
export function SaveData (data) {
  return request.post('SfcsInboundRecordInfo/SaveData', data)
}
// 添加或修改视图
export function AddOrModify (query) {
  return request.get('SfcsInboundRecordInfo/AddOrModify', query)
}
// 获取完工入库工单列表
export function LoadInboundWoList (query) {
  console.log(query)
  return request.get('SfcsInboundRecordInfo/LoadInboundWoList', {
    params: query
  })
}
// 根据工单号获取完工入库的记录列表
export function LoadInboundInfoListByWo (query) {
  return request.get('SfcsInboundRecordInfo/LoadInboundInfoListByWo', {
    params: query
  })
}
