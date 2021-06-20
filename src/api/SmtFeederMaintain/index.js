import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request.get('SmtFeederMaintain/Index')
}
// 料架编号FEEDER 返回数据 同时判断是否存在料架号
export function GetFeederInfo (query) {
  return request.get('SmtFeederMaintain/GetFeederInfo', { params: query })
}
// 料架编号FEEDER  同时判断是否存在料架号返回数据
export function QueryByNewFeeder (query) {
  return request.get('SmtFeederMaintain/QueryByNewFeeder',
    {
      params: {
        feeder: query
      }
    })
}
// 保存数据insertRecords
export function SaveData (query) {
  // return request.post('SmtFeederMaintain/SaveData', query)
  return request({
    url: 'SmtFeederMaintain/SaveData',
    method: 'post',
    data: {
      insertRecords: [
        query
      ]
    }
  })
}
