import request from '@/plugin/axios'
class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  // 首页视图
  Index (query = {}) {
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
  // 获取角色列表数据
  LoadRoleData (query = {}) {
    return request.get(`${this.controllerName}/LoadRoleData`, {
      params: query
    })
  }
  // 查询对应的角色列表
  LoadDetailData (query = {}) {
    return request.get(`${this.controllerName}/LoadDetailData`, {
      params: {
        mst_id: query
      }
    })
  }
  // 保存表信息数据
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
