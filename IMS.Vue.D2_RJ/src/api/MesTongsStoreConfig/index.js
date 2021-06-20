import request from '@/plugin/axios'

class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  // 查询数据 搜索按钮对应的处理也是这个方法
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  // // 新增/修改视图
  AddOrModify (query = null) {
    return request.get(`${this.controllerName}/AddOrModify`, {
      params: {
        id: query
      }
    })
  }
  //  保存数据
  AddOrModifySave (data) {
    return request.post(`${this.controllerName}/AddOrModifySave`, data)
  }
  //  通过ID更改激活状态
  ChangeEnabled (data) {
    return request.post(`${this.controllerName}/ChangeEnabled`, data)
  }
  // 通过ID删除记录
  DeleteOneById (query = null) {
    return request.post(`${this.controllerName}/DeleteOneById?id=` + query)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
