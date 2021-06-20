import request from '@/plugin/axios'
import qs from 'qs'
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
  // //1.單筆/批量產品序號 //10.產品序號與工序 保存数据
  ProcessSingleOrMultiRuncardSave (query) {
    return request.post(`${this.controllerName}/ProcessSingleOrMultiRuncardSave`, qs.stringify(query), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  // 2.料號與自定義產品序號)和HoldByCustomComponentSerialNumber(7.料號與自定義零件序號) 保存数据
  ProcessDefineSerialNumberSave (query) {
    return request.post(`${this.controllerName}/ProcessDefineSerialNumberSave`, query)
  }
  // 卡通 / 棧板和工單 / 料號 / 機種和零件客戶料號 保存数据
  ProcessInputDataSave (query) {
    return request.post(`${this.controllerName}/ProcessInputDataSave`, query)
  }
  //  單筆/批量零件序號 保存数据
  ProcessSingleOrMultiComponentSave (query) {
    return request.post(`${this.controllerName}/ProcessSingleOrMultiComponentSave`, qs.stringify(query), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
  }
  // 料號/工單與站點和站點 保存数据
  ProcessProductOperationSiteSave (query) {
    return request.post(`${this.controllerName}/ProcessProductOperationSiteSave`, query)
  }

  //  保存数据
  UnLockBillSave (data) {
    return request.post(`${this.controllerName}/UnLockBillSave`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
