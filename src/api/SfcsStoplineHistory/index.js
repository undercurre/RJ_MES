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
  // 查询数据 搜索按钮对应的处理也是这个方法
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  //  获取停线维护记录
  GetStopLineMaintain (query = {}) {
    return request.get(`${this.controllerName}/GetStopLineMaintain?id=` + query)
  }
  //  获取停线不良统计
  GetStopLineDefectStatistics (query = {}) {
    return request.get(`${this.controllerName}/GetStopLineDefectStatistics?headerID=` + query)
  }
  //  获取停线所有流水号
  GetStopLineDefectDetail (query = {}) {
    return request.get(`${this.controllerName}/GetStopLineDefectDetail`, {
      params: query
    })
  }

  // 获取产品收集不良详细信息
  GetCollectDefectsDetail (query = {}) {
    return request.get(`${this.controllerName}/GetCollectDefectsDetail?collect_defect_detail_id=` + query)
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
