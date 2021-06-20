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
  // 解锁单据之查询主表数据 搜索按钮对应的处理也是这个方法
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  // 解锁单据之获取明细数据
  GetDetailData (query = {}) {
    return request.get(`${this.controllerName}/GetDetailData?hold_id=` + query)
  }

  //  保存数据
  UnLockBillSave (data) {
    return request.post(`${this.controllerName}/UnLockBillSave`, data)
  }

  // 解锁产品之首页视图
  ProductIndex (query = {}) {
    return request.get(`${this.controllerName}/ProductIndex`, {
      params: query
    })
  }
  // 解锁产品之查询数据
  LoadProductData (query = {}) {
    return request.get(`${this.controllerName}/LoadProductData`, {
      params: query
    })
  }
  //  解锁产品之解除产品锁定保存数据
  UnLockProductSave (data) {
    return request.post(`${this.controllerName}/UnLockProductSave`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
