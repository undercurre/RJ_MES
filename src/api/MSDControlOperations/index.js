import request from '@/plugin/axios'

// 首页视图 烘烤列表使用烘烤标准维护的LoadData方法
export function Index () {
  return request.get('/SmtMsdRuncard/Index')
}
// 輸入料卷编码 测试数据 M200516000043 获取成功就 料卷不能修改(只读), 作业区和执行动作 确认按钮可以操作
export function GetMSDInfo (ReelCode) {
  return request.get('/SmtMsdRuncard/GetMSDInfo', {
    params: {
      ReelCode
    }
  })
}
// 操作變更
export function MsdActionLookUpChanged (data) {
  return request.get('/SmtMsdRuncard/MsdActionLookUpChanged', {
    params: data
  })
}
export function TakeAction (data) {
  console.log('SaveData: ', JSON.stringify(data))
  return request.post('/SmtMsdRuncard/TakeAction', data)
}
