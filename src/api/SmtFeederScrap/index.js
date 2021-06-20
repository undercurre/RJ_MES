import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'SmtFeederScrap/Index',
    method: 'get'
  })
}
// 查询飞达信息
export function GetFeederInfo (query) {
  return request({
    url: 'SmtFeederScrap/LoadData',
    method: 'get',
    params: {
      feeder: query
    }
  })
}
// 保存数据
export function SaveData (query) {
  return request({
    url: 'SmtFeederScrap/SaveData',
    method: 'post',
    data: query
  })
}
