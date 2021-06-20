import request from '@/plugin/axios'
class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  // 首页视图
  Index (query = null) {
    return request.get(`${this.controllerName}/Index`, {
      params: query
    })
  }
  // 工单查询
  LoadData (query = null) {
    return request.get(`${this.controllerName}/LoadDataEX`, {
      params: query
    })
  }
  //  保存数据
  SaveData (query) {
    // return request.post(`${this.controllerName}/SaveData`, { data: query })
    return request({
      url: `${this.controllerName}/SaveData`,
      method: 'post',
      data: {
        UpdateRecords: [
          query
        ]
      }
    })
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
