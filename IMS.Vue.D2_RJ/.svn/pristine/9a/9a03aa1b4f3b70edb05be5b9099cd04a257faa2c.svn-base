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
  // 查询首付测试记录
  LoadFirstCheckRecordList (query = null) {
    return request.get(`${this.controllerName}/LoadFirstCheckRecordList`, {
      params: query
    })
  }
  // 查询首付测试明细
  LoadFirstCheckRecordDetail (query = null) {
    return request.get(`${this.controllerName}/LoadFirstCheckRecordDetail`, {
      params: query
    })
  }

  // 获取解锁状态
  GetStatusContent (query = null) {
    return request.get(`${this.controllerName}/GetStatusContent`, {
      params: query
    })
  }
  //  保存数据
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
