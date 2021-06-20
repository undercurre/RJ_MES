import request from '@/plugin/axios'
// 首页视图
export function Index (query) {
  return request.get('SfcsProductSample/Index', {
    params: query
  })
}

// 获取料号
export function PartNoLoadData (query) {
  return request.get('SfcsPn/LoadData', {
    params: query
  })
}

// 查询数据
export function LoadData (query) {
  return request.get('SfcsProductSample/LoadData', {
    params: query
  })
}

// 获取标记工序 如果没有提示: 没有找到生效的制程。 只要传制程ID即可，其他不用传
export function GetOperationList (query) {
  return request.get('SfcsProductSample/GetOperationList', {
    params: query
  })
}

// 保存数据
export function SaveData (data) {
  return request.post('SfcsProductSample/SaveData', data)
}

export function LoadSampleProjectConfigData (query) {
  return request.get('SfcsSampleProjects/LoadSampleProjectConfigData', {
    params: query
  })
}
