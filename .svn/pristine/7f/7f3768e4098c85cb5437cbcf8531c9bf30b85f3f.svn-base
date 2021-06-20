import request from '@/plugin/axios'

// 根据用户ID和点击次数倒序获取前八条数据 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request.get('MesCommonFunctions/LoadData', {
    params: query
  })
}
// 保存数据
export function SaveData (data) {
  return request.post('MesCommonFunctions/SaveData', data)
}
