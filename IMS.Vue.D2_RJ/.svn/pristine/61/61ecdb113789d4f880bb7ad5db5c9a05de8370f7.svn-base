import request from '@/plugin/axios'

// 首页
export function Index () {
  return request.get('MesHomeMemorandum/Index')
}

// 查询
export function MesHomeMemorandumLoadData (query) {
  return request.get('MesHomeMemorandum/LoadData', {
    params: query
  })
}

export function ItemIsByUsed (id) {
  return request.get('MesHomeMemorandum/ItemIsByUsed', {
    params: {
      id
    }
  })
}

// 保存
export function SaveData (data) {
  return request.post('MesHomeMemorandum/SaveData', data)
}

// 删除
export function DeleteOneById (i) {
  return request({
    url: 'MesHomeMemorandum/DeleteOneById?id=' + i,
    method: 'post'
  })
}
