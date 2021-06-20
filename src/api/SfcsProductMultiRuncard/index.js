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
  // 查询制程名称列表
  GetRoutesList (query = {}) {
    return request.get(`${this.controllerName}/GetRoutesList?part_no=` + query)
  }
  // 查询数据(制程工序列表及连板配置)
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
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
