import request from '@/plugin/axios'
// 首页试图
export function Index () {
  return request.get('SmtFeederDefect/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('SmtFeederDefect/LoadData', {
    params: query
  })
}

// 当前ID是否已被使用
export function ItemIsByUsed (id) {
  return request.get('SmtFeederDefect/ItemIsByUsed', {
    params: { id }
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SmtFeederDefect/SaveData', data)
}
