import request from '@/plugin/axios'
class Helper {
  constructor(controllerName) {
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

  // 获取工单流水号范围 数据
  GetRuncardRangerData (query = null) {
    return request.get(`${this.controllerName}/GetRuncardRangerData`, {
      params: query
    })
  }
  // 校验数据并计算流水号范围等信息
  GetCalculateRanger (data) {
    return request.post(`${this.controllerName}/GetCalculateRanger`, data)
  }

  //  保存数据
  SaveData (data) {
    return request.post(`${this.controllerName}/SaveData`, data)
  }
  PrintSnRanger (data) {
    return request.post(`${this.controllerName}/PrintSnRanger`, data)
  }
  PrintSnRangerEx (data) {
    return request.post(`${this.controllerName}/PrintSnRangerEx`, data)
  }
  ExportSNRangerData (query = null) {
    return request.get(`${this.controllerName}/ExportSNRangerData`, {
      params: query
    })
  }
  // 拼板单码打印
  PrintPuzzleSingleCode (data) {
    return request.post(`${this.controllerName}/PrintPuzzleSingleCode`, data)
  }
  //  拼板余码打印
  PrintPuzzleRemainingCodeBySN (query) {
    return request({
      url: `${this.controllerName}/PrintPuzzleRemainingCodeBySN`,
      method: 'post',
      params: query
    })
  }
  // 打印导入的流水号(批量)
  PrintImportRuncardSN (data) {
    return request.post(`${this.controllerName}/PrintImportRuncardSN`, data)
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
