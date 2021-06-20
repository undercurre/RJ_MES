import request from '@/plugin/axios'

export function BOMIndex () {
  return request.get('BomVsPlacement/Index')
}

// 导入文件并获取BOM及FE料单数据
export function BOMImportFile (data) {
  return request.post('BomVsPlacement/ImportFile', data)
}

// 比对
export function DOMCompareByBom (data) {
  return request.post('BomVsPlacement/CompareByBom', data)
}
