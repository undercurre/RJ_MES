import request from '@/plugin/axios'

export function Index () {
  return request.get('SysFavorites/Index')
}

export function LoadData (query) {
  return request.get('SysFavorites/LoadData', {
    params: {
      ...query,
      Page: 1,
      Limit: 100000
    }
  })
}

export function SaveData (data) {
  return request.post('SysFavorites/SaveData', data)
}

export function DeleteOneById (id) {
  return request.post('SysFavorites/DeleteOneById', {
    id
  })
}
