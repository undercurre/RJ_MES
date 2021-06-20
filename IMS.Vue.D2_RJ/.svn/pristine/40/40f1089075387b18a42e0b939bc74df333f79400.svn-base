import request from '@/plugin/axios'
import qs from 'qs'
// 首页视图
export function Index (query) {
  return request.get('SfcsPrintFiles/Index', {
    params: query
  })
}
// 查询数据
export function LoadData (query) {
  return request.get('SfcsPrintFiles/LoadData', {
    params: query
  })
}

// 查找图片和文件的路径 查图片:Photo 查文件:File 主键:ID
// export function GetPathByType (query) {
//   return request.get('SfcsPrintFiles/GetPathByType', {
//     params: query
//   })
// }

export function GetPathByType (query) {
  return request.get('SfcsPrintFiles/GetBase64PathByType', {
    params: query
  })
}

// 判断文件名是否重复了，重复不能使用 在修改的时候使用
export function IsExistFileNmae (query) {
  return request.get('SfcsPrintFiles/IsExistFileNmae', {
    params: query
  })
}

// 保存数据
export function UploadImageAndSave (data) {
  return request.post('SfcsPrintFiles/UploadImageAndSave', qs.stringify(data), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
// 获取模板数据
export function GetPrintFilesDetail (query) {
  return request.get('SfcsPrintFiles/GetPrintFilesDetail', {
    params: query
  })
}
// 保存模板数据
export function SavePrintFilesDetail (data) {
  return request.post('SfcsPrintFiles/SavePrintFilesDetail', data)
}
