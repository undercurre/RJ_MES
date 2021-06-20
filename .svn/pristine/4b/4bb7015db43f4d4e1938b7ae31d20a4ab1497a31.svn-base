import request from '@/plugin/axios'
import qs from 'qs'
// 首五件检验类别数据
export function GetListByType (query) {
  return request.get('Common/GetListByType', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('MesFirstCheckItems/LoadData', {
    params: query
  })
}

// 添加或修改的相关操作
export function AddOrModifyAsync (data) {
  return request.post('MesFirstCheckItems/AddOrModifyAsync', qs.stringify(data))
}

// 通过ID删除记录
export function DeleteOneById (data) {
  return request.post('MesFirstCheckItems/DeleteOneById?Id=' + data)
}
