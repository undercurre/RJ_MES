import request from '@/plugin/axios'
// 获取下拉列表
export function Index () {
  return request({
    url: 'SfcsScraperClean/Index',
    method: 'get'
  })
}
// 查询刮刀相关记录
export function LoadScraperData (query) {
  return request({
    url: 'SfcsScraperClean/LoadScraperData',
    method: 'get',
    params: {
      scraperNo: query
    }
  })
}
// 查询刮刀清洗记录列表
export function LoadGetScraperCleanHistory (query) {
  return request({
    url: 'SfcsScraperClean/LoadGetScraperCleanHistory',
    method: 'get',
    params: {
      scraperNo: query
    }
  })
}
// 保存数据
export function SaveData (query) {
  return request({
    url: 'SfcsScraperClean/SaveData',
    method: 'post',
    data: query
  })
}
