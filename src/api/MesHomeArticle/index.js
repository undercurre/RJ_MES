import request from '@/plugin/axios'

// 首页
export function Index () {
  return request.get('MesHomeArticle/Index')
}

// 查询
export function MesHomeArticleLoadData (query) {
  return request.get('MesHomeArticle/LoadData', {
    params: query
  })
}

// 保存
export function SaveData (data) {
  return request.post('MesHomeArticle/SaveData', data)
}

// 删除
export function DeleteOneById (i) {
  return request({
    url: 'MesHomeArticle/DeleteOneById?id=' + i,
    method: 'post'
  })
}
