import request from '@/plugin/axios'

export function Index () {
  return request.get('SfcsEcndoc/Index')
}

// 查询ECN数据 搜索按钮对应的处理也是这个方法
export function LoadEcnDocData (query) {
  return request.get('SfcsEcndoc/LoadEcnDocData', {
    params: query
  })
}

// 查询ECN 明细数据
export function LoadEcnDocDetailData (query) {
  return request.get('SfcsEcndoc/LoadEcnDocDetailData', {
    params: query
  })
}
