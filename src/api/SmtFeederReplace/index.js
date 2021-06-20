import request from '@/plugin/axios'
// 首页视图
export function Index () {
  return request({
    url: 'SmtFeederReplace/Index',
    method: 'get'
  })
}
// 获取料架编号信息
export function LoadData (query) {
  return request({
    url: 'SmtFeederReplace/LoadData',
    method: 'get',
    params: query
  })
}
// 查新条码是否已经存在,存在就为true,不存在为false
export function QueryByNewFeeder (query) {
  return request({
    url: 'SmtFeederReplace/QueryByNewFeeder',
    method: 'get',
    params: {
      feeder: query
    }
  })
}
// 保存数据
export function SaveData (query) {
  return request({
    url: 'SmtFeederReplace/SaveData',
    method: 'post',
    data: {
      updateRecords: [
        {
          ID: query.ID,
          FEEDER: query.FEEDER
          // ORGANIZE_ID: query.ORGANIZE_ID
        }
      ]
    }
  })
}
