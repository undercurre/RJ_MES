import request from '@/plugin/axios'
import qs from 'qs'

// 首页视图
export function Index (query) {
  return request.get('MesBurnFileApply/Index', {
    params: query
  })
}

// 查询
export function FileManagerLoadData (query) {
  return request.get('MesBurnFileApply/FileManagerLoadData', {
    params: query
  })
}

// 保存烧录文件数据 传TYPE(首页程序类型下拉数据),PATH,FILENAME
export function SaveBurnFileManager (data) {
  return request.post('MesBurnFileApply/SaveBurnFileManager', data)
}

// 烧录文件编号
export function GetCodeNo (query) {
  return request.get('MesBurnFileApply/GetCodeNo', {
    params: query
  })
}

// 上传文件 会返回路径和文件名
export function UploadImageAndSave (data) {
  return request.post('MesBurnFileApply/UploadImageAndSave', qs.stringify(data))
}
