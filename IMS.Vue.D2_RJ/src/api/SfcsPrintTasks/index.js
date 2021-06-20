import request from '@/plugin/axios'
//  获取打印任务列表数据
export function GetPrintTasksData (query) {
  return request({
    url: 'SfcsPrintTasks/GetPrintTasksData',
    method: 'post',
    data: query
  })
}
// 重复打印
export function RepeatPrintTasks (query) {
  return request({
    url: 'SfcsPrintTasks/RepeatPrintTasks',
    method: 'post',
    data: query
  })
}
