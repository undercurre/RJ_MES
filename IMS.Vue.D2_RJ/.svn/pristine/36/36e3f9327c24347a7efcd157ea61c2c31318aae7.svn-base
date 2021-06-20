import request from '@/plugin/axios'
// 首页视图
export function Index (query) {
  return request.get('SfcsSampleProjects/Index', {
    params: query
  })
}

// 查询数据 抽验方案名称维护查询
export function LoadSampleProjectsData (query) {
  return request.get('SfcsSampleProjects/LoadSampleProjectsData', {
    params: query
  })
}

// 查询方案配置的数据
export function LoadSampleProjectConfigData (query) {
  return request.get('SfcsSampleProjects/LoadSampleProjectConfigData', {
    params: query
  })
}

// 保存产品抽检方案
export function SaveSampleProjectConfigData (data) {
  return request.post('SfcsSampleProjects/SaveSampleProjectConfigData', data)
}

// 保存数据
export function SaveData (data) {
  return request.post('SfcsSampleProjects/SaveData', data)
}
