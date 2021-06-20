import { CheckLine } from '@/api/Kanban'
import {
  GetCallData,
  GetChangeLineRecordData,
  GetKanbanDefectMsgData,
  GetKanbanHourYidldData,
  GetKanbanPassRateData,
  GetKanbanSiteData,
  GetKanbanSpotCheckData,
  GetKanbanWoData,
  GetKanbanWorkingPassRateData,
  GetLins, GetTopDefectData
} from '@/api/ProductLine'
import echarts from 'echarts'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () { // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        alert(this.$t('pdl.ns'))
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject('WScript.Shell')
        if (wscript !== null) {
          wscript.SendKeys('{F11}')
        }
      }
    }

    return {
      handleFullScreen: function ($this) {
        if (isFullScreen) {
          exitFull()
          isFullScreen = false
        } else {
          requestFullScreen()
          isFullScreen = true
        }
      }
    }
  }())
}

// 获取换线时间列表Y轴数据
function GetDateList (day) {
  var result = []
  for (var i = day; i > 0; i--) {
    var date = new Date()
    date.setDate(new Date().getDate() - (i))
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    result.push(y + '-' + m + '-' + d)
  }
  return result
}
// 判断字符串是否为null
function IsNull (str) {
  if (str == null || str === undefined) { return '' }
  return str
}
export default {
  fs,
  name: 'ProductLine',
  data () {
    return {
      lineId: '',
      // 工单信息
      LineName: '',
      WoNo: '',
      PartNo: '',
      WoModel: '',

      abnormal: '',
      Spot_check: '',
      SpotCheckTable: '',
      AndonCallTable: '',
      CallForm: {
        lineId: 0,
        day: 10,
        topCount: 5
      },
      FectForm: {
        lineId: 0,
        topCount: 5
      },
      HourYidForm: {
        lineId: 0,
        topCount: 5
      },
      RecorForm: {
        lineId: 0,
        topDay: 5
      },
      // 不良品信息
      DefectTable: '',
      span_DefectQty: '',
      span_WaitQty: '',
      span_YesQty: '',
      // 抽检良率
      Spotcheck: {
        lineId: 0,
        wo_no: '',
        topCount: 5
      },
      timer: null,
      dialogVisible: false,
      lineLists: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  created () {
    if (localStorage.getItem('lineId')) {
      this.lineId = localStorage.getItem('lineId')
    }
    this.$nextTick(() => {
      this.initSwiper()
      this.getWoYidldPie()
    })
    this.getLines()
    if (this.$route.query.lineId) {
      this.lineId = parseInt(this.$route.query.lineId)
    }
    if (!this.lineId) {
      this.dialogVisible = true
    }
    this.loopData()
  },
  mounted () {
    localStorage.removeItem('lineId')
  },
  beforeDestroy () {
    clearInterval(this.timer)
  },
  deactivated () {
    clearInterval(this.timer)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  methods: {
    lineChange (e) {
      // this.getWoYidldPie()
      this.lineId = e
    },
    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = (date.getDate()).toString()
      var hour = (date.getHours()).toString()
      return day + this.$t('pdl.day') + hour + this.$t('pdl.time')
    },
    handleClose (done) {
      if (!this.lineId) {
        this.$message.error(this.$t('_kanban._6'))
      } else {
        done()
      }
    },
    async getLines () {
      const res = await GetLins({
        USER_ID: this.userId,
        Page: 1,
        Limit: 1000000000
      })
      if (res.Result) {
        this.lineLists = JSON.parse(res.Result) || []
      }
    },
    loadingData (isShowLoading = true) {
      this.CallForm.lineId = this.lineId
      this.FectForm.lineId = this.lineId
      this.HourYidForm.lineId = this.lineId
      this.RecorForm.lineId = this.lineId
      this.Spotcheck.lineId = this.lineId
      this.getCheckLine(isShowLoading)
    },
    // 轮询
    loopData () {
      this.timer = setInterval(() => {
        if (!this.lineId || this.dialogVisible) {
          return false
        }
        this.loadingData(false)
      }, 5000)
    },
    /* 检测线体是否存在 线体资料不存在 */
    async getCheckLine (isShowLoading = true) {
      let loading = null
      if (isShowLoading) {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      const res = await CheckLine(this.lineId)
      console.log(res, '检测线体是否存在')
      if (res.Result) {
        await Promise.all([
          this.GetKanbanWo(),
          this.GetKanbanSite(),
          this.GetKanbanPassRate(),
          this.GetCall(),
          this.GetTopDefect(),
          this.GetKanbanHourYidld(),
          this.GetKanbanWorkingPassRate(),
          this.GetChangeLineRecord()
        ]).catch(() => {
          if (isShowLoading) loading.close()
        })
        if (isShowLoading) loading.close()
      } else {
        if (isShowLoading) loading.close()
      }
    },
    // 工单信息
    async GetKanbanWo () {
      const res = await GetKanbanWoData(this.lineId)
      if (res.Result) {
        let data = JSON.parse(res.Result) || []
        console.log(data, '获取产线的工单信息')
        if (data.length === 0) {
          data = [{
            HIPTS_ALARM: '',
            MODEL: '',
            MULTI_NO: '',
            OPERATION_LINE_ID: '',
            OPERATION_LINE_NAME: '',
            OUTPUT_QTY: 0,
            PART_NO: '',
            ROUTE_ID: '',
            TARGET_QTY: 0,
            UPDATE_TIME: '',
            WO_ID: '',
            WO_NO: '',
            YIELD: 0
          }]
        }

        this.LineName = data[0].OPERATION_LINE_NAME
        this.WoNo = data[0].WO_NO
        this.PartNo = data[0].PART_NO
        this.WoModel = data[0].MODEL

        this.WoYidldPie.hideLoading() // 隐藏加载动画
        this.WoYidldPie.setOption({ // 加载数据图表
          title: { subtext: data[0].OUTPUT_QTY + ' / ' + data[0].TARGET_QTY + this.$t('pdl.ps') },
          series: [
            {
              // name: data.data[0].OUTPUT_QTY + ' / ' + data.data[0].TARGET_QTY + ' (件)',
              data: [{ value: (parseFloat(data[0].YIELD) * 100).toFixed(2), name: this.$t('pdl.su') }]
            }
          ]
        })
        if (data[0].WO_NO) {
          this.GetKanbanSpotCheck(this.WoNo)
          // this.GetKanbanDefectMsg(this.WoNo)
        }
      }
    },
    // 抽检良率
    async GetKanbanSpotCheck (e) {
      this.Spotcheck.wo_no = e
      const res = await GetKanbanSpotCheckData(this.Spotcheck)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        this.abnormal = data.FAIL_QTY
        this.Spot_check = data.CHECK_QTY
        console.log(res, '获取抽检良率')
        var html = `<thead><tr><th>` + this.$t('pdl.btag') + `</th><th>` + this.$t('pdl.pdr') + `</th><th>` + this.$t('pdl.bat') + `</th></tr></thead>`
        html += '<tbody>'
        var list = []
        if (data) {
          if (data.DetailData) {
            list = data.DetailData
            list.forEach((i, v) => {
              html += '<tr><td>' + v.DEFECT_LOC + '</td><td>' + v.DEFECT_DESCRIPTION + '</td><td>' + v.DEFECTQTY + '</td></tr>'
            })
          }
        }
        for (var i = 5; i > list.length; i--) {
          html += '<tr><td>&nbsp;</td><td></td><td></td></tr>'
        }
        html += '</tbody>'
        if (list.length !== 0) {
          this.SpotCheckTable = html
        } else {
          this.SpotCheckTable = html
        }
      }
    },
    // 站点统计
    async GetKanbanSite () {
      const res = await GetKanbanSiteData(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        console.log(data, '获取产线的站点统计信息')
        // if (data.length > 0) {
        var arr = [] // new Array[]; 数组
        for (var i in data) {
          var obj = {} // 对象
          obj.site = data[i].OPERATION_NAME
          obj.PASS = data[i].PASS
          obj.FAIL = data[i].FAIL
          // obj.REPASS = data.data[i].REPASS;
          // obj.REFAIL = data.data[i].REFAIL;
          arr.push(obj)
        }
        this.WoSiteBar.hideLoading() // 隐藏加载动画
        this.WoSiteBar.setOption({ // 加载数据图表
          dataset: {
            source: arr
          }
        })
        // }
      }
    },
    // 达成率（FCT工序的直通率）
    async GetKanbanPassRate () {
      const res = await GetKanbanPassRateData(this.lineId)
      if (res.Result) {
        let data = JSON.parse(res.Result) || []
        console.log(data, '获取产线FCT工序的合格率')
        if (data.length === 0) {
          data = [{
            OPERATION_LINE_ID: 0,
            PASS: 0,
            RATE: 0,
            TOTAL: 0
          }]
        }
        this.WoPassRatePie.hideLoading() // 隐藏加载动画
        this.WoPassRatePie.setOption({ // 加载数据图表
          // title: { text: "", subtext: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)' },
          series: [
            {
              // name: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)',
              data: [{ value: parseFloat(data[0].RATE).toFixed(2) }]
            }
          ]
        })
      }
    },
    // 安灯呼叫
    async GetCall () {
      const res = await GetCallData(this.CallForm)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '获取产线的呼叫信息')
        var html = `
          <thead><tr> <th>` + this.$t('pdl.sin') + `</th>
          <th>` + this.$t('pdl.call') + `</th>
          <th>` + this.$t('pdl.ti') + `</th>
          <th>` + this.$t('pdl.ss') + `</th>
          </tr>
          </thead>`
        html += '<tbody>'
        if (data) {
          if (data.length > 0) {
            data.forEach((v, i) => {
              if (v.STATUS_NAME === '待处理') {
                v.STATUS_NAME = "<span style='color:#FF5722;'>" + this.$t('pdl._1') + '</span>'
              } else if (v.STATUS_NAME === '处理中') {
                v.STATUS_NAME = "<span style='color:#FFB800;'>" + this.$t('pdl._2') + '</span>'
              } else if (v.STATUS_NAME === '已完结') {
                v.STATUS_NAME = "<span style='color:#ddd;'>" + this.$t('pdl._3') + '</span>'
              } else {
                v.STATUS_NAME = ''
              }
              html += '<tr><td>' + v.OPERATION_SITE_NAME + '</td><td>' + v.CALL_TYPE_NAME + '</td><td>' + v.TIME_SPAN_NAME + '</td><td>' + v.STATUS_NAME + '</td></tr>'
            })
          }
        }
        for (var i = 5; i > data.length; i--) {
          html += '<tr><td></td><td></td><td></td><td></td></tr>'
        }
        html += '</tbody>'
        if (data.length !== 0) {
          this.AndonCallTable = html
        } else {
          this.AndonCallTable = html
        }
      }
    },
    // 不良代码排名
    async GetTopDefect () {
      const res = await GetTopDefectData(this.FectForm)
      if (res.Result) {
        const data = JSON.parse(res.Result).data || []
        // if (data.length > 0) {
        var arrxAxis = [] // new Array[]; 数组
        var arrseries = [] // new Array[]; 数组
        for (var i in data) {
          arrxAxis.push(data[i].DEFECT_DESCRIPTION + '(' + data[i].DEFECT_COUNT + ')')
          var obj = {} // 对象
          obj.value = data[i].DEFECT_COUNT
          obj.name = data[i].DEFECT_DESCRIPTION + '(' + data[i].DEFECT_COUNT + ')'
          arrseries.push(obj)
        }
        // eslint-disable-next-line no-undef
        this.TopDefectBar.hideLoading() // 隐藏加载动画
        // eslint-disable-next-line no-undef
        this.TopDefectBar.setOption({ // 加载数据图表
          legend: {
            data: arrxAxis
          },
          series: [{
            // 根据名字对应到相应的系列
            data: arrseries
          }]
        })
        // }
        console.log(res, '获取产线TOP不良代码信息')
      }
    },
    // 每小时产能
    async GetKanbanHourYidld () {
      const res = await GetKanbanHourYidldData(this.HourYidForm)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        // console.log(data, '获取产线最近X小时的每小时产能')
        // if (data.length === 0) return
        // eslint-disable-next-line no-undef
        // var data = [{
        //   'OPERATION_LINE_ID': 180832,
        //   'OPERATION_LINE_NAME': null,
        //   'WO_ID': null,
        //   'WO_NO': null,
        //   'PART_NO': null,
        //   'MODEL': null,
        //   'WORK_TIME': '2021-03-04 08:00:00',
        //   'OUTPUT_QTY': 10,
        //   'STANDARD_CAPACITY': 0,
        //   'REPORT_ID': 7481,
        //   'STATUS': 0,
        //   'REPORT_CONTENT': '产能超标',
        //   'REASON': null,
        //   'RATE': 0,
        //   'STANDARD_CAPACITY_WORK': 0
        // },
        // {
        //   'OPERATION_LINE_ID': 180832,
        //   'OPERATION_LINE_NAME': null,
        //   'WO_ID': null,
        //   'WO_NO': null,
        //   'PART_NO': null,
        //   'MODEL': null,
        //   'WORK_TIME': '2021-03-04 09:00:00',
        //   'OUTPUT_QTY': 7,
        //   'STANDARD_CAPACITY': 0,
        //   'REPORT_ID': 7482,
        //   'STATUS': 0,
        //   'REPORT_CONTENT': '产能超标',
        //   'REASON': null,
        //   'RATE': 0,
        //   'STANDARD_CAPACITY_WORK': 0
        // }
        // ]
        var page = {}
        page.hourYidldData = data

        var yAxis = []; var seriesData = []; var _series = []; var point = []

        // 构建数据列表
        data.forEach((v, i) => {
          var timeStr = this.getDateStr(v.WORK_TIME)
          if (yAxis.indexOf(timeStr) === -1) {
            yAxis.push(timeStr)
          }

          // 构建异常信息数据
          switch (v.STATUS) {
            case -2:
              point.push({ value: this.$t('pdl._4'), xAxis: v.RATE - (parseInt(v.RATE / 6)), yAxis: i, symbol: 'pin', itemStyle: { color: 'blue' } })
              break
            case -1:
              point.push({ value: this.$t('pdl._5'), xAxis: v.RATE - (parseInt(v.RATE / 6)), yAxis: i, symbol: 'pin', itemStyle: { color: 'green' } })
              break
            case 0:
            case 1:
            case 2:
              var str = this.$t('pdl._6') + '：' + v.REPORT_CONTENT + '。'
              if (v.REASON !== '' && v.REASON !== undefined && v.REASON !== null) { str += this.$t('pdl._7') + '：' + v.REASON }
              point.push({ value: str, xAxis: v.RATE - (parseInt(v.RATE / 6)), yAxis: i, symbol: 'pin', itemStyle: { color: 'red' } })
              break
            default:
          }

          seriesData.push(v.RATE)
        })

        _series.push({
          name: this.$t('pdl._8'),
          type: 'bar',
          stack: this.$t('pdl._8'),
          barMaxWidth: 40,
          label: {
            normal: {
              show: true,
              formatter: function (p, p1) {
                // eslint-disable-next-line no-undef
                var data = page.hourYidldData[p.dataIndex]
                // 当数值为0时不显示0
                if (p.value > 0) { return p.value + '%(' + data.OUTPUT_QTY + ')' } else return ''
              }
            }
          },
          data: seriesData,
          markPoint: {
            symbolRotate: -90, // 标注旋转度数
            symbolSize: [34, 55],
            label: {
              normal: {
                fontSize: 10,
                show: true,
                color: '#fff', // 字体颜色
                position: 'insideLeft', // 字体相对定位
                distance: 17 // 定位边距
              }
            },
            data: point
          }
        })

        var option = {
          yAxis: { data: yAxis },
          series: _series
        }

        // eslint-disable-next-line no-undef
        this.HourYieldBar.hideLoading() // 隐藏加载动画
        // eslint-disable-next-line no-undef
        this.HourYieldBar.setOption(option) // 加载数据图表
      }
    },
    // 排产达成率
    async GetKanbanWorkingPassRate () {
      const res = await GetKanbanWorkingPassRateData(this.lineId)
      if (res.Result) {
        let data = JSON.parse(res.Result) || []
        console.log(data, '产线看板的排产的完成率')
        if (data.length === 0) {
          data = [{
            OPERATION_LINE_ID: 0,
            PASS: 0,
            RATE: 0,
            TOTAL: 0
          }]
        }
        this.WorkingPassRatePie.hideLoading() // 隐藏加载动画
        this.WorkingPassRatePie.setOption({ // 加载数据图表
          title: {
            left: 'center',
            top: 'middle',
            // subtext: data * 100 + this.$t('pdl.ps')
            subtext: data[0].PASS + ' / ' + data[0].TOTAL + this.$t('pdl.ps')
          },
          series: [
            {
              // name: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)',
              // data: [{ value: parseFloat(data.data[0].RATE).toFixed(2), name: '达成率' }]
              data: [{ value: parseFloat(data[0].RATE).toFixed(2) }]
            }
          ]
        })
        console.log('=======1111')
      }
    },
    // 换线时间数据
    async GetChangeLineRecord () {
      const res = await GetChangeLineRecordData(this.RecorForm)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        // console.log(res, '获取换线时间数据')
        // if (data) {
        var seriesData = []
        var yAxis = GetDateList(5)

        if (data.length > 0) {
          var timeData = data[0].TimeValue
          timeData.forEach((i, v) => {
            if (v[4] === 0) {
              seriesData.push({ name: this.$t('pdl._9'), value: [v[0], v[1], v[2], v[3]], itemStyle: { normal: { color: 'green' } } })
            } else {
              seriesData.push({ name: this.$t('pdl.cl'), value: [v[0], v[1], v[2], v[3]], itemStyle: { normal: { color: 'red' } } })
            }
          })
        }

        var option = {
          yAxis: { data: yAxis },
          series: [
            { type: 'bar', name: this.$t('pdl._9') },
            {
              type: 'custom',
              renderItem: function renderItem (params, api) {
                var categoryIndex = api.value(0)
                var start = api.coord([api.value(1), categoryIndex])
                var end = api.coord([api.value(2), categoryIndex])
                var height = api.size([0, 1])[1] * 0.6

                var rectShape = echarts.graphic.clipRectByRect({
                  x: start[0],
                  y: start[1] - height / 2,
                  width: end[0] - start[0],
                  height: height
                }, {
                  x: params.coordSys.x,
                  y: params.coordSys.y,
                  width: params.coordSys.width,
                  height: params.coordSys.height
                })

                return rectShape && {
                  type: 'rect',
                  shape: rectShape,
                  style: api.style()
                }
              },
              itemStyle: {
                normal: {
                  opacity: 2,
                  label: {
                    position: 'left',
                    color: 'red',
                    fontWeight: 900,
                    fontSize: 14,
                    // padding: [0, 0, 0, -14],
                    show: true,
                    formatter: (p) => {
                      if (p.name === '换线时间') { return (parseInt(p.data.value[3] / 60) === 0 ? '' : parseInt(p.data.value[3] / 60) + '时') + ((p.data.value[3] % 60) === 0 ? '' : ((p.data.value[3] % 60) + this.$t('pdl._11'))) } else { return '' }
                    }
                  }
                }
              },
              data: seriesData
            }
          ]
        }
        this.ExLineDateBar.hideLoading() // 隐藏加载动画
        this.ExLineDateBar.setOption(option) // 加载数据
      }
      // }
    },
    // 不良品信息
    async GetKanbanDefectMsg (e) {
      const res = await GetKanbanDefectMsgData(e)
      if (res.Result) {
        const data = JSON.parse(res.Result) || []
        console.log(data, '产线看板不良品信息')
        var html = '<tbody>'
        var waitRepairCount = 0
        data.forEach((v, i) => {
          if (v.STATUS === '待维修') { waitRepairCount += 1 }
          // eslint-disable-next-line no-tabs
          html += "<tr><td style='width:15%'>" + IsNull(v.SN) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:10%'>" + IsNull(v.CHINESE_DESCRIPTION) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:15%'>" + IsNull(v.OPERATION_SITE_NAME) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:16%'>" + IsNull(v.DEFECT_TIME) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:8%'>" + IsNull(v.REPAIRER) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:16%'>" + IsNull(v.REPAIR_TIME) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:8%'>" + IsNull(v.STATUS) + '</td>' +
            // eslint-disable-next-line no-tabs
            "<td style='width:12%'>" + IsNull(v.DESCRIPTION) + '</td></tr>'
          // eslint-disable-next-line no-tabs
        })
        html += '</tbody>'
        this.DefectTable = html
        this.span_DefectQty = data.length
        this.span_WaitQty = waitRepairCount
        this.span_YesQty = data.length - waitRepairCount
      }
    },
    initSwiper () {
      // eslint-disable-next-line
      this.swiper1 = new Swiper('.swiper-container', {
        slidesPerView: 1,
        loop: false,
        autoplay: {
          delay: 30000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    async getWoYidldPie () {
      /* =====================工单完成率 仪表盘 init=========================== */
      this.WoYidldPie = echarts.init(document.getElementById('WoYieldPie'))
      var optionWo = null
      optionWo = {
        title: {
          left: 'center',
          top: 'middle',
          subtextStyle: {
            // 文字颜色
            color: '#FFF',
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 14,
            padding: [50, 0, 0, 0]

          }
        },
        grid: {
          top: 50,
          left: 40,
          right: 40,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          // formatter: "{a} <br/>{b} : {c}%"
          formatter: this.$t('pdl.su') + ': {c}%'
        },
        legend: {
          // top: 30,                // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        series: [
          {
            // name: '0 / 0（件）',
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '58%'],
            radius: '80%',
            title: { // 设置仪表盘中间显示文字样式
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: { // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: { // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [ // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [{ value: 0 }]
          }
        ]
      }
      this.WoYidldPie.setOption(optionWo, true)

      /* =====================站点统计 柱状图 init============================== */
      this.WoSiteBar = echarts.init(document.getElementById('WoSiteBar'))
      var optionSite = null
      optionSite = {
        title: {
          id: 2,
          text: this.$t('pdl._12'),
          textStyle: {
            color: '#FFF'
          }
        },
        color: ['#008B45', '#e5323e', '#f5b031', '#c3b4df', '#59ccf7'],
        legend: {
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        tooltip: {},
        grid: {
          top: 40,
          left: 10,
          right: 30,
          bottom: 0,
          containLabel: true
        },
        dataset: {
          // d imensions: ['site', 'PASS', 'FAIL', 'REPASS', 'REFAIL'],
          dimensions: ['site', 'PASS', 'FAIL'],
          source: []
        },
        xAxis: {
          type: 'category',
          minInterval: 1,
          maxInterval: 1,
          axisLabel: {
            // interval: 0,
            rotate: 20,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
              shadowColor: '#fff', // 阴影颜色。支持的格式同color。
              color: '#FFF',
              width: 1
            }
          }
        },
        yAxis: {
          // name: '数量',
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#FFF'
            // formatter: '{value} 件'
          },
          axisLine: {
            lineStyle: {
              color: '#FFF',
              width: 1
            }
          }
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
                // color: '#FFF'
              }
            },
            barMaxWidth: 35 // 最大宽度
          },
          {
            type: 'bar',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            barMaxWidth: 35 // 最大宽度
          }
        ]
      }

      this.WoSiteBar.setOption(optionSite, true)

      /* =====================排产达成率 仪表盘 init=========================== */
      this.WorkingPassRatePie = echarts.init(document.getElementById('WorkingPassRatePie'))
      var optionWorkingPassRate = null
      optionWorkingPassRate = {
        title: {
          left: 'right',
          // width: '100%',
          // subtext: '0 / 0（件）',
          subtextStyle: {
            // 文字颜色
            color: '#FFF',
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 14,
            padding: [50, 0, 0, 0]
          }
        },
        // center: ['100%', '100%'],          // 默认全局居中
        // radius: '50%',
        grid: {
          top: 50,
          left: 40,
          right: 40,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          // formatter: "{a} <br/>{b} : {c}%"
          formatter: this.$t('pdl.cr') + ': {c}%'
        },
        legend: {
          // top: 30,                // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        series: [
          {
            // name: '0 / 0（件）',
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '58%'],
            radius: '110%',
            title: { // 设置仪表盘中间显示文字样式
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: { // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: { // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [ // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [{ value: 0 }]
          }
        ]
      }
      this.WorkingPassRatePie.setOption(optionWorkingPassRate, true)

      /* =====================当日直通率 仪表盘 init=========================== */
      this.WoPassRatePie = echarts.init(document.getElementById('WoPassRatePie'))
      var optionWoPassRate = null
      optionWoPassRate = {
        title: {
          // text: 'PASS：0',
          textStyle: {
            color: '#FFF',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: 14
          },
          // subtext: "FAIL：0",
          subtextStyle: {
            // 文字颜色
            color: '#FFF',
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
            fontSize: 14
          }
        },
        grid: {
          top: 50,
          left: 40,
          right: 40,
          bottom: 30,
          containLabel: true
        },
        tooltip: {
          // formatter: "{a} <br/>{b} : {c}%"
          formatter: this.$t('pdl._13') + ' : {c}%'
        },
        legend: {
          // top: 30,                // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        series: [
          {
            // name: '0 / 0（件）',
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            title: { // 设置仪表盘中间显示文字样式
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            center: ['50%', '58%'],
            radius: '110%',
            pointer: { // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: { // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [ // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: { // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [{ value: 0 }]
          }
        ]
      }
      this.WoPassRatePie.setOption(optionWoPassRate, true)

      /* ===================不良代码排名 柱状图 init============================ */
      this.TopDefectBar = echarts.init(document.getElementById('TopDefectBar'))
      var optionTopDefect = null
      // app.title = '坐标轴刻度与标签对齐';
      optionTopDefect = {
        title: {
          id: 3,
          text: this.$t('pdl._14'),
          textStyle: {
            color: '#FFF'
          }
        },
        color: ['#F4AA61', '#4EC7B8', '#90C9F6', '#FE8463', '#B5C334'],
        tooltip: {
          trigger: 'item',
          // formatter: "{a} <br/>{b} : {c} ({d}%)"
          formatter: '{b} :' + this.$t('pdl._15') + '{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          },
          data: []
        },
        series: [
          {
            name: this.$t('pdl._16'),
            type: 'pie',
            radius: '60%',
            center: ['50%', '60%'],
            data: [],
            label: {
              // normal: { formatter: '{b}[{d}%]' }
              normal: {
                formatter: (data) => {
                  return data.name.split('(')[0] + ': ' + data.percent + '%'
                }
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      // mychart.clear();
      this.TopDefectBar.setOption(optionTopDefect, true)

      /* ===================每小时产能 柱状图 init============================= */
      this.HourYieldBar = echarts.init(document.getElementById('HourYieldBar'))
      var optionHourYield = null
      optionHourYield = {
        title: {
          id: 4,
          text: this.$t('pdl._17'),
          textStyle: {
            color: '#FFF'
          }
        },
        //         tooltip: {
        //   // formatter: "{a} <br/>{b} : {c}%"
        //   formatter: this.$t('pdl.cr') + ': {c}%'
        // },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
          // formatter: this.$t('pdl.cr') + ': {d}%' + ': {b}%'
        },
        color: ['#9da7f5', '#081ae1', '#819280', '#118d07', '#946e9d', '#80059d', '#c768ab', '#c1098a'],
        // color: ['#4B7CF3', '#F4CB29', '#dd3ee5', '#12e78c', '#FE8463', '#B5C334'],
        // 暗蓝色#4962FC，亮蓝色#4B7CF3，紫色#dd3ee5，绿色#12e78c，橙色#fe8104，青色#01C2F9，亮黄色#F4CB29，暗黄色 #FD9E06
        legend: {
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          },
          data: [this.$t('pdl._18'), this.$t('pdl._19')]
        },
        grid: {
          top: 40,
          left: 10,
          right: 40,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            // interval: 0,
            // rotate: 30,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              color: '#FFF',
              width: 1
            }
          }
        },
        yAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30,
            color: '#FFF'
          },
          axisLine: {
            lineStyle: {
              color: '#FFF',
              width: 1
            }
          },
          data: []
        },
        series: []
      }
      this.HourYieldBar.setOption(optionHourYield, true)

      /* ===================换线时间 柱状图 init============================= */
      this.ExLineDateBar = echarts.init(document.getElementById('ExLineDateBar'))
      var optionLineDate = {
        tooltip: {
          formatter: (params) => {
            var str = params.marker + (params.name === '换线时间' ? params.name + ': ' : '')
            var v = params.value[3]
            var mm = parseInt(v % 60)
            str += parseInt(v) === 0 ? '' : parseInt(v / 60) + this.$t('pdl.hour')
            str += mm === 0 ? '' : mm + this.$t('pdl.minute')
            return str
          }
        },
        color: ['red'],
        title: {
          text: this.$t('pdl.cl'),
          textStyle: {
            color: '#FFF'
          }
        },
        legend: {
          type: 'plain',
          textStyle: {
            fontSize: 14, // 字体大小
            color: '#FFF' // 字体颜色
          },
          data: [this.$t('pdl.cl')]
        },
        grid: {
          top: 60,
          left: 1,
          right: 1,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          min: 480,
          max: 1260,
          minInterval: 1,
          maxInterval: 60,
          axisLabel: {
            formatter: (val) => {
              return Math.max(0, parseInt(val / 60)) + 'H'
            },
            rotate: 30,
            textStyle: {
              color: '#FFF'
            }
          }
        },
        yAxis: {
          data: ['11月13日', '11月14日', '11月15日'],
          axisLabel: {
            rotate: 30,
            textStyle: {
              color: '#FFF'
            }
          }
        },
        series: []
      }
      this.ExLineDateBar.setOption(optionLineDate, true)

      window.onresize = () => {
        this.WoYidldPie.resize()
        this.WoSiteBar.resize()
        this.WoPassRatePie.resize()
        this.WorkingPassRatePie.resize()
        this.TopDefectBar.resize()
        this.HourYieldBar.resize()
        this.ExLineDateBar.resize()
      }
    }
  },
  watch: {
    lineId (val) {
      if (val) {
        this.loadingData()
        this.dialogVisible = false
      } else {
        Object.assign(this.$data, this.$options.data(), {
          lineLists: this.lineLists
        })
        this.dialogVisible = true
      }
    }
  }
}
