import request from '@/plugin/axios'
class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  // 查询查询表信息集 搜索按钮对应的处理也是这个方法
  LoadMainData (query = {}) {
    return request.get(`${this.controllerName}/LoadMainData`, {
      params: query
    })
  }
  // 保存表信息数据
  SaveMainData (data) {
    return request.post(`${this.controllerName}/SaveMainData`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
