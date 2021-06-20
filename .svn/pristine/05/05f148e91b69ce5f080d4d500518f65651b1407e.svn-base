import request from '@/plugin/axios'
class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  //  首页视图
  Index (query = null) {
    return request.get(`${this.controllerName}/Index`, {
      params: query
    })
  }
  //  获取供应商下拉表,需要查询请使用KEY值
  GetVendorCode (query = null) {
    return request.get(`${this.controllerName}/GetVendorCode`, {
      params: query
    })
  }
  // 查询数据 搜索按钮对应的处理也是这个方法
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  // 保存数据
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
  // 导出数据
  ExportData (query = {}) {
    return request.get(`${this.controllerName}/ExportData`, {
      params: query
    })
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
