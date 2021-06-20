
import request from '@/plugin/axios'
class Helper {
  constructor (controllerName) {
    this.controllerName = controllerName
  }
  // QA/OQA检验 首页
  Index (query = null) {
    return request.get(`${this.controllerName}/Index`, {
      params: query
    })
  }
  // 查询所有 搜索按钮对应的处理也是这个方法
  LoadData (query = null) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  // 获取明细数据
  GetDatailData (query = null) {
    return request.get(`${this.controllerName}/GetDatailData?batch=` + query, {
      params: query
    })
  }
  //  保存数据
  ChangeEnabled (data) {
    return request.post(`${this.controllerName}/AddOrModifySave`, data)
  }

  // // 根据工单号获取产品信息
  GetPartDataByWoNo (query = null) {
    return request.get(`${this.controllerName}/GetPartDataByWoNo?wo_no=` + query)
  }

  //  通过ID删除记录
  DeleteOneById (data) {
    return request.post(`${this.controllerName}/DeleteOneById?id=` + data)
  }
  // 审核抽检单
  AuditSpotCheck (data) {
    // return request.post(`${this.controllerName}/AuditSpotCheck`, data)
    return request({
      url: `${this.controllerName}/AuditSpotCheck`,
      method: 'POST',
      data: data
    })
  }
  // 获取不良信息
  LoadDefectData (query = null) {
    return request.get(`${this.controllerName}/LoadDefectData`, {
      params: query
    })
  }

  // 选择不良信息视图
  SelectDefectIndex (query = null) {
    return request.get(`${this.controllerName}/SelectDefectIndex`, {
      params: query
    })
  }

  // 保存明细
  AddOrEditDetail (data) {
    return request.post(`${this.controllerName}/AddOrEditDetail`, data)
  }

  // 删除明细数据
  DeleteDetail (data) {
    return request.post(`${this.controllerName}/DeleteDetail`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
