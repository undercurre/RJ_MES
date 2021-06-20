import request from '@/plugin/axios'
import qs from 'qs'
// 首页视图
export function Index (query) {
  return request.get('SfcsTinRecord/Index', {
    params: query
  })
}

// 查询
export function LoadData (query) {
  return request.get('SfcsTinRecord/LoadData', {
    params: query
  })
}

// 获取明细数据
export function GetDetailData (query) {
  return request.get('SfcsTinRecord/GetDetailData', {
    params: query
  })
}

// 添加或修改的相关操作
// export function AddOrModifySave (data) {
//   return request.post('SfcsTinRecord/AddOrModifySave', data)
// }
export function AddOrModifySave (data) {
  return request.post('SfcsTinRecord/AddOrModifySave', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 保存分析结果
// export function AddResultSave (data) {
//   return request.post('SfcsTinRecord/AddResultSave', data)
// }
export function AddResultSave (data) {
  return request.post('SfcsTinRecord/AddResultSave', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 通过ID删除记录
// export function DeleteOneById(data) {
//     return request.post('SfcsTinRecord/DeleteOneById', data)
// }
export function DeleteOneById (i) {
  return request({
    url: 'SfcsTinRecord/DeleteOneById?id=' + i,
    method: 'post'
  })
}

// 从APS系统中获取产能
export function GetApsOutput (query) {
  return request.get('SfcsTinRecord/GetApsOutput', {
    params: query
  })
}
