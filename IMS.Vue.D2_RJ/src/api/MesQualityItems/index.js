import request from '@/plugin/axios'
// import qs from 'qs'
// 首页视图
export function Index () {
  return request.get('MesQualityItems/Index')
}

// 查询数据
export function LoadData (query) {
  return request.get('MesQualityItems/LoadMesQualityItemsList', {
    params: query
  })
}

// 获取检验类别
export function GetTypeList () {
  return request.get('MesQualityItems/GetTypeList')
}

// 保存数据
export function SaveData (data) {
  console.log(JSON.stringify(data))
  // qs.stringify(data)
  return request.post('MesQualityItems/SaveData', data)
}
// 通过ID删除数据
export function DeleteOneById (id) {
  return request.post('MesQualityItems/DeleteOneById?id=' + id)
}
