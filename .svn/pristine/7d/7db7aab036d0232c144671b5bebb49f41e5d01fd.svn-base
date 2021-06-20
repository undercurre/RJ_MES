import request from '@/plugin/axios'

// 下载文件记录 查询数据
export function DownLogLoadData (query) {
  return request.get('MesBurnFileApply/DownLogLoadData', {
    params: query
  })
}

// 获取下表
export function DownDetailLoadData (query) {
  return request.get('MesBurnFileApply/DownDetailLoadData', {
    params: query
  })
}

// 通过文件地址获取到下载路径
export function GetDownAddress (data) {
  return request.post('MesBurnFileApply/GetDownAddress', data)
}

// 获取路径下文件记录 选择工单或者SN然后关联出来 下载的内容文件 返回 序号 文件名字 完整路径
export function GetFilesByPath (query) {
  return request.get('MesBurnFileApply/GetFilesByPath', {
    params: query
  })
}

// 保存SN数据
export function SaveBurnSNByTrans (data) {
  return request.post('MesBurnFileApply/SaveBurnSNByTrans', data)
}

// 查询SN下载 统计sn和下载编号的数量(传SN,下载编号即可)返回的结束对应COUNT 搜索按钮对应的处理也是这个方法
export function SNLoadData (query) {
  return request.get('MesBurnFileApply/SNLoadData', {
    params: query
  })
}
