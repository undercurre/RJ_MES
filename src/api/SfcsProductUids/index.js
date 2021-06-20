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
  // 查询UID数据 搜索按钮对应的处理也是这个方法
  LoadData (query = {}) {
    return request.get(`${this.controllerName}/LoadData`, {
      params: query
    })
  }
  //  查询附件列表
  GetAttachmentList (query = {}) {
    return request.get(`${this.controllerName}/GetAttachmentList?mst_id=` + query)
  }
  //  料号是否存在
  PartNOIsExist (query = {}) {
    return request.get(`${this.controllerName}/PartNOIsExist?part_no=` + query)
  }
  //  添加或修改附件视图
  AddOrModifyAttachment (query = {}) {
    return request.get(`${this.controllerName}/AddOrModifyAttachment`, {
      params: query
    })
  }

  //  保存数据
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
  //  保存附件数据
  SaveAttachmentData (data) {
    return request.post(`${this.controllerName}/SaveAttachmentData`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
