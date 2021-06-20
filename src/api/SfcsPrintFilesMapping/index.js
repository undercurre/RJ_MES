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
  // 机种数据
  LoadModelData (query = {}) {
    return request.get(`${this.controllerName}/LoadModelData`, {
      params: query
    })
  }

  // 双击获取数据(只传ID即可) 获取标签样式图片使用 SfcsPrintFilesController -&gt; GetPathByType(查图片:Photo)
  DoubleClickData (query = null) {
    return request.get(`${this.controllerName}/DoubleClickData`, {
      params: query
    })
  }
  //  保存数据
  SaveData (query) {
    // return request.post(`${this.controllerName}/SaveData`, {
    //   data: {
    //     UpdateRecords: [
    //       query
    //     ]
    //   }
    // })
    return request({
      url: `${this.controllerName}/SaveData`,
      method: 'post',
      data: query
      // {
      //   UpdateRecords: [

      //   ]
      // }
    })
  }
}
export default function (controllerName) {
  const helper = new Helper(controllerName)
  return helper
}
