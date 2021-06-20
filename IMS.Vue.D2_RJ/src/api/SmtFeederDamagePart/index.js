import request from '@/plugin/axios'
// 获取下拉列表
export function Index () {
  return request({
    url: 'SmtFeederDamagePart/Index',
    method: 'get'
  })
}
// 查询数据 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SmtFeederDamagePart/LoadData',
    method: 'get',
    params: query
  })
}
// 当前项目是否已被使用
export function ItemIsByUsed (i) {
  return request({
    url: 'SmtFeederDamagePart/ItemIsByUsed?id=' + i,
    method: 'get'
  })
}

// 保存数据
export function SaveData (query) {
  return request({
    url: 'SmtFeederDamagePart/SaveData',
    method: 'post',
    data: query
  })
}
