import request from '@/plugin/axios'

// 获取下拉列表
export function Index () {
  return request({
    url: 'SfcsScraperOperat/Index',
    method: 'get'
  })
}
// 查询所有 搜索按钮对应的处理也是这个方法
export function LoadData (query) {
  return request({
    url: 'SfcsScraperOperat/LoadScraperData',
    method: 'get',
    params: {
      scraperNo: query
    }
  })
}

// 保存数据
export function SaveData (query) {
  return request({
    url: 'SfcsScraperOperat/SaveData',
    method: 'post',
    data: query
  })
}
