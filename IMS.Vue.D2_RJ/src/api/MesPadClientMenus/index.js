import request from '@/plugin/axios'

export function Index () {
  return request.get('MesPadClientMenus/Index')
}

export function LoadData (query) {
  return request.get('MesPadClientMenus/LoadData', {
    params: query
  })
}

export function ItemIsByUsed (id) {
  return request.get('MesPadClientMenus/ItemIsByUsed', {
    params: {
      id
    }
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('MesPadClientMenus/SaveData', data)
}

export function AddOrModify () {
  return request.get('MesPadClientMenus/AddOrModify')
}

export function DeleteOneById (id) {
  return request.post('MesPadClientMenus/DeleteOneById', id)
}

export function LoadDataByRoleId (roleId) {
  return request.get('MesPadClientMenus/LoadDataByRoleId', {
    params: {
      roleId
    }
  })
}

export function SavePadRoleData (data) {
  return request.post('MesPadClientMenus/SavePadRoleData', data)
}
