import request from '@/plugin/axios'

// 获取抽检合格率汇总报表数据(日)
export function GetCheckPassRateSumDayData (query) {
  return request.get('MesSpotCheckReport/GetCheckPassRateSumDayData', {
    params: query
  })
}

// 获取抽检合格率汇总报表数据(月)
export function GetCheckPassRateSumMonthData (query) {
  return request.get('MesSpotCheckReport/GetCheckPassRateSumMonthData', {
    params: query
  })
}
// 获取提前一个月的日期数据
export function GetMonthDayData (query) {
  return request.get('MesSpotCheckReport/GetMonthDayData', {
    params: {
      beginDate: query
    }
  })
}
// 获取抽检不良明细报表数据
export function GetCheckFailReportData (query) {
  return request.get('MesSpotCheckReport/GetCheckFailReportData', {
    params: query
  })
}
