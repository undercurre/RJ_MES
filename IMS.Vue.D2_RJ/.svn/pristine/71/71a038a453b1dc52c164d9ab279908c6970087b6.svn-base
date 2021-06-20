import request from '@/plugin/axios'

class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  Index (query = null) {
    return request.get(`${this.controllerName}/Index`, {
      params: query
    })
  }
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  // 导出数据
  ExportData (query = {}) {
    return request.get(`${this.controllerName}/ExportData`, {
      params: query
    })
  }
  ItemIsByUsed (query = {}) {
    return request.get(`${this.controllerName}/ItemIsByUsed`, {
      params: query
    })
  }
  DeleteOneById (id = 0) {
    return request.post(`${this.controllerName}/DeleteOneById`, {
      id
    })
  }
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
}

export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
