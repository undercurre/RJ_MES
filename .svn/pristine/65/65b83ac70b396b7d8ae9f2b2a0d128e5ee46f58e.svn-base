import {
  CheckSmtLine,
  GetKanbanSpotCheckData,
  GetLines,
  GetSmtChangeLineRecordData,
  GetSmtKanbanAoiPassRateData,
  GetSmtKanbanFirstPassRateData,
  GetSmtKanbanHourYidldData,
  GetSmtKanbanRestPcbData,
  GetSmtKanbanSpiPassRateData,
  GetSmtKanbanWoData,
  GetSmtKanbanWorkingPassRateData,

  GetSMTWoInfo, GetStation
} from '@/api/Kanban'
import echarts from 'echarts'
import Swiper from 'swiper'
import 'swiper/css/swiper.css'
import { mapGetters } from 'vuex'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    var isFullScreen = false
    var requestFullScreen = function () {
      // 全屏
      var de = document.documentElement
      if (de.requestFullscreen) {
        de.requestFullscreen()
      } else if (de.mozRequestFullScreen) {
        de.mozRequestFullScreen()
      } else if (de.webkitRequestFullScreen) {
        de.webkitRequestFullScreen()
      } else {
        this.$message({
          showClose: true,
          message: this.$t('smt.ns'),
          type: 'warning'
        })
      }
    }
    // 退出全屏 判断浏览器种类
    var exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      var exitMethod =
        document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') {
        // for Internet Explorer
        // eslint-disable-next-line
        var wscript = new ActiveXObject("WScript.Shell");
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
  })()
}

// 获取换线时间列表Y轴数据
function GetDateList (day) {
  var result = []
  for (var i = day; i > 0; i--) {
    var date = new Date()
    date.setDate(new Date().getDate() - i)
    var y = date.getFullYear()
    var m = date.getMonth() + 1
    var d = date.getDate()
    result.push(y + '-' + m + '-' + d)
  }
  return result
}
// 判断字符串是否为null
function IsNull (str) {
  if (str == null || str === undefined) {
    return ''
  }
  return str
}
export default {
  fs,
  name: 'SmtLine',
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
      RestPcForm: {
        lineId: 82,
        topDay: 10
      },
      LineForm: {
        lineId: 82,
        topDay: 10
      },
      // 抽检良率
      Spotheck: {
        lineId: 0,
        wo_no: '',
        topCount: 5
      },
      WoYidldPie: null,
      timer: null,
      dialogVisible: false,
      lineLists: [],
      MachineList: [],
      // PredictURL: process.env.VUE_CS_API,
      PredictURL: process.env.VUE_APP_CS,
      PredictTime: ''
    }
  },
  computed: {
    ...mapGetters(['userId'])
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
  created () {
    console.log(process.env, 'process.env')
    if (localStorage.getItem('lineId')) {
      this.lineId = localStorage.getItem('lineId')
    }
    this.$nextTick(() => {
      this.InitSwiper()
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
  methods: {
    // 获取机台
    async GetStation () {
      const res = await GetStation({ lineId: this.lineId })
      let data = res.Result || ''
      if (data) {
        if (data instanceof Array) {
          this.GetSMTWoInfo(data.slice(-1)[0].ID)
        } else {
          this.GetSMTWoInfo(data.ID)
        }
      } else {
        this.PredictTime = ''
      }
    },
    async GetSMTWoInfo (e) {
      var obj = {
        lineId: this.lineId,
        stationID: e
      }
      const res = await GetSMTWoInfo(obj)
      let data = res.Result || ''
      if (data) {
        this.PredictTime = data.FISHEDTIME
      } else {
        this.PredictTime = ''
      }
    },
    lineChange (e) {
      this.InitSwiper()
      this.getWoYidldPie()
      this.lineId = e
      this.GetStation()
    },
    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = date.getDate().toString()
      var hour = date.getHours().toString()
      return day + this.$t('smt.day') + hour + this.$t('smt.time')
    },
    // 根据标准产能类型获取类型名称
    GetDtlTypeName (type) {
      switch (type) {
        case 0:
          return this.$t('smt.sdd')
        case 1:
          return this.$t('smt.rest')
        case 2:
          return this.$t('smt.clc')
        default:
          return ''
      }
    },
    handleClose (done) {
      if (!this.lineId) {
        this.$message.error(this.$t('_kanban._6'))
      } else {
        done()
      }
    },
    async getLines () {
      const res = await GetLines({
        USER_ID: this.userId,
        Page: 1,
        Limit: 1000000000
      })
      this.lineLists = res.Result || []
    },
    loadingData (isShowLoading = true) {
      this.RestPcForm.lineId = this.lineId
      this.LineForm.lineId = this.lineId
      this.Spotheck.lineId = this.lineId
      this.getCheckSmtLine(isShowLoading)
    },
    // 轮询数据
    loopData () {
      this.timer = setInterval(() => {
        if (!this.lineId || this.dialogVisible) {
          return false
        }
        this.loadingData(false)
      }, 5000)
    },
    /* 检查自动化线体是否存在 */
    async getCheckSmtLine (isShowLoading = true) {
      let loading = null
      if (isShowLoading) {
        loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
      }
      const res = await CheckSmtLine(this.lineId)
      console.log(res, '检查自动化线体是否存在')
      if (res.Result) {
        await Promise.all([
          this.GetSmtKanbanWo(),
          this.GetSmtKanbanAoiPassRate(),
          this.GetSmtKanbanFirstPassRate(),
          this.GetSmtKanbanRestPcb(),
          this.GetSmtKanbanSpiPassRate(),
          // this.GetSmtKanbanWorkingPassRate(),
          this.GetSmtKanbanHourYidld(),
          this.GetSmtChangeLineRecord()
        ]).catch(() => {
          if (isShowLoading) loading.close()
        })
        if (isShowLoading) loading.close()
      } else {
        if (isShowLoading) loading.close()
      }
    },
    /*  工单信息 */
    async GetSmtKanbanWo () {
      const res = await GetSmtKanbanWoData(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.LineName = data[0].OPERATION_LINE_NAME
        this.WoNo = data[0].WO_NO
        this.PartNo = data[0].PART_NO
        this.WoModel = data[0].MODEL
        this.WoYidldPie.hideLoading() // 隐藏加载动画
        this.WoYidldPie.setOption({
          // 加载数据图表this.$t('smt.ps')
          title: {
            left: 'center',
            top: 'middle',
            subtext:
              data[0].OUTPUT_QTY +
              ' / ' +
              data[0].TARGET_QTY +
              this.$t('smt.ps')
          },
          series: [
            {
              data: [
                {
                  value: parseFloat(data[0].YIELD).toFixed(2),
                  name: this.$t('smt.su')
                }
              ]
            }
          ]
        })
        this.GetKanbanSpotCheck(this.WoNo)
        console.log(data, '获取产线的工单信息')
      }
    },
    /*  抽检良率 */
    async GetKanbanSpotCheck (e) {
      this.Spotheck.wo_no = e
      const res = await GetKanbanSpotCheckData(this.Spotheck)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.abnormal = data.FAIL_QTY
        this.Spot_check = data.CHECK_QTY
        console.log(data, '获取抽检良率') // this.$t('smt.time')
        var html =
          "<thead><tr><th style='width:20%'>" +
          this.$t('smt.bn') +
          "</th><th style='width:17%'>" +
          this.$t('smt.sp') +
          "</th><th style='width:14%'>" +
          this.$t('smt.tn') +
          "</th><th style='width:18%'>" +
          this.$t('smt.pd') +
          "</th><th style='width:31%'>" +
          this.$t('smt.ti') +
          '</th></tr></thead>'
        html += '<tbody>'
        var list = []
        if (data) {
          if (data.DetailData) {
            list = data.DetailData
            list.forEach((i, v) => {
              html +=
                '<tr><td>' +
                i.BATCH_NO.substring(6) +
                '</td><td>' +
                IsNull(i.CHECKER) +
                '</td><td>' +
                IsNull(i.DEFECT_LOC) +
                '</td><td>' +
                IsNull(i.DEFECT_DESCRIPTION) +
                '</td><td>' +
                (IsNull(i.CREATE_TIME) === ''
                  ? IsNull(i.CREATE_DATE)
                  : i.CREATE_TIME) +
                '</td></tr>'
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
          this.SpotCheckTable = ''
        }
      }
    },
    /* AOI合格率 */
    async GetSmtKanbanAoiPassRate () {
      const res = await GetSmtKanbanAoiPassRateData(this.lineId)
      if (res.Result) {
        console.log(res, '自动化线看板的AOI的直通率')
        const data = JSON.parse(res.Result)
        if (data) {
          if (data.length > 0) {
            this.AoiPassRatePie.hideLoading() // 隐藏加载动画
            this.AoiPassRatePie.setOption({
              // 加载数据图表
              // title: { subtext: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)'},
              series: [
                {
                  // name: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)',
                  data: [
                    {
                      value: parseFloat(data[0].RATE).toFixed(2)
                    }
                  ]
                }
              ]
            })
          }
        }
      }
    },
    /* 首件合格率 */
    async GetSmtKanbanFirstPassRate () {
      const res = await GetSmtKanbanFirstPassRateData(this.lineId)
      if (res.Result) {
        console.log(res, '自动化线看板的首件的直通率')
        const data = JSON.parse(res.Result)
        var tal = data[0].PASS + data[0].TOTAL || 0
        if (data) {
          if (data.length > 0) {
            this.FirstPassRatePie.hideLoading() // 隐藏加载动画
            this.FirstPassRatePie.setOption({
              // 加载数据图表
              title: {
                left: 'center',
                top: 'middle',
                subtext:
                  data[0].PASS + ' / ' + tal
              },
              series: [
                {
                  // name: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)',
                  data: [
                    {
                      value: parseFloat(data[0].RATE).toFixed(2),
                      name: this.$t('smt.qd')
                    }
                  ]
                }
              ]
            })
          }
        }
      }
    },
    /* 低水位警报 */
    async GetSmtKanbanRestPcb () {
      const res = await GetSmtKanbanRestPcbData(this.RestPcForm)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '自动化线看板-低水位预警')
        if (data) {
          // if (data.code === 0) {
          if (data.length > 0) {
            var arr = [] // new Array[]; 数组
            for (var i in data) {
              var obj = {} // 对象
              obj.LOCATION = data[i].LOCATION
              obj.REST_PCB_COUNT = data[i].REST_PCB_COUNT
              // obj.FAIL = data.data[i].FAIL;
              // obj.REPASS = data.data[i].REPASS;
              // obj.REFAIL = data.data[i].REFAIL;
              arr.push(obj)
            }
            this.RestPcbCountBar.hideLoading() // 隐藏加载动画
            this.RestPcbCountBar.setOption({
              // 加载数据图表
              dataset: {
                source: arr
              }
            })
            // }
          }
        }
      }
    },
    // SPI合格率
    async GetSmtKanbanSpiPassRate () {
      const res = await GetSmtKanbanSpiPassRateData(this.lineId)
      if (res.Result) {
        console.log(res, '自动化线看板的SPI的直通率')
        const data = JSON.parse(res.Result)
        if (data) {
          if (data.length > 0) {
            this.SpiPassRatePie.hideLoading() // 隐藏加载动画
            this.SpiPassRatePie.setOption({
              // 加载数据图表
              // title: { subtext: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)'},
              series: [
                {
                  // name: data.data[0].PASS + ' / ' + data.data[0].TOTAL + ' (件)',
                  data: [
                    {
                      value: parseFloat(data[0].RATE).toFixed(2)
                    }
                  ]
                }
              ]
            })
          }
        }
      }
    },
    /* 排产达成率 */
    async GetSmtKanbanWorkingPassRate () {
      const res = await GetSmtKanbanWorkingPassRateData(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        console.log(data, '自动化线看板的排产的完成率')
        if (data.length > 0) {
          this.WorkingPassRatePie.hideLoading() // 隐藏加载动画
          this.WorkingPassRatePie.setOption({
            // 加载数据图表
            title: {
              left: 'center',
              top: 'middle',
              subtext: data[0].PASS + ' / ' + data[0].TOTAL + this.$t('smt.ps')
            },
            series: [
              {
                data: [
                  {
                    value: parseFloat(data[0].RATE).toFixed(2)
                  }
                ]
              }
            ]
          })
        }
      }
    },
    // 每小时产能
    async GetSmtKanbanHourYidld () {
      const res = await GetSmtKanbanHourYidldData(this.lineId)
      if (res.Result) {
        console.log(res, '获取自动化线最近X小时的每小时产能')
        const data = JSON.parse(res.Result)
        if (data) {
          if (data.length === 0) return
          var legend = []
          var yAxis = []
          var timeData = {}
          var series = []
          var _series = {}
          var point = []
          var colors = [
            '#9da7f5',
            '#081ae1',
            '#819280',
            '#118d07',
            '#946e9d',
            '#80059d',
            '#c768ab',
            '#c1098a'
          ]
          // 构建类型列表 / Y轴列表
          data.forEach((v, i) => {
            if (legend.indexOf(v.PART_NO) === -1) {
              legend.push(v.PART_NO + this.$t('smt.sdd'))
              legend.push(v.PART_NO)
            }

            var timeStr = this.getDateStr(v.WORK_TIME)
            if (yAxis.indexOf(timeStr) === -1) {
              yAxis.push(timeStr)

              // 获取到每个时间段数据
              timeData[timeStr] = {}
              timeData[timeStr][v.PART_NO] = v
            } else {
              timeData[timeStr][v.PART_NO] = v
            }
          })

          // 构建异常信息数据
          for (var time in timeData) {
            var outputQty = 0
            var index = 1
            for (var no in timeData[time]) {
              if (index > 1) break
              index++
              var v = timeData[time][no]

              outputQty += v.OUTPUT_QTY
              switch (v.STATUS) {
                case -2:
                  point.push({
                    value: this.$t('smt.in'),
                    xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
                    yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
                    symbol: 'pin',
                    itemStyle: {
                      color: 'blue'
                    },
                    WORK_TIME: v.WORK_TIME
                  })
                  break
                case -1:
                  point.push({
                    value: this.$t('smt.nl'),
                    xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
                    yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
                    symbol: 'pin',
                    itemStyle: {
                      color: 'green'
                    },
                    WORK_TIME: v.WORK_TIME
                  })
                  break
                case 0:
                case 1:
                case 2:
                  var str = this.$t('smt.ala') + '：' + v.REPORT_CONTENT + '。'
                  if (
                    v.REASON !== '' &&
                    v.REASON !== undefined &&
                    v.REASON !== null
                  ) {
                    str += this.$t('smt._1') + '：' + v.REASON
                  }
                  point.push({
                    value: str,
                    xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
                    yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
                    symbol: 'pin',
                    itemStyle: {
                      color: 'red'
                    },
                    WORK_TIME: v.WORK_TIME
                  })
                  break
                default:
              }
            }
          }

          // 构建数据列表
          data.forEach(v => {
            // Y轴下标
            var index = yAxis.indexOf(this.getDateStr(v.WORK_TIME))

            // 标准产能
            if (_series[v.PART_NO + this.$t('smt.sdd')] === undefined) {
              _series[v.PART_NO + this.$t('smt.sdd')] = []
            }

            // 标准产能数据列表
            var standardData = _series[v.PART_NO + this.$t('smt.sdd')]

            var isExist = false
            standardData.forEach((d, i2) => {
              // 产品号相同、标准产能类型相同、时间不同
              if (
                d.PART_NO === v.PART_NO &&
                d.DTL_TYPE === v.DTL_TYPE &&
                d.WORK_TIME !== v.WORK_TIME
              ) {
                if (
                  (d.data[index] === 0 || d.data[index] === undefined) &&
                  !isExist
                ) {
                  d.data[index] = v.STANDARD_CAPACITY_MINUTE
                  d.minuteData[index] = v.DTL_MINUTES
                  isExist = true
                }
              }
            })

            // 当前数据不存在标准产能数据中----添加进去
            if (!isExist) {
              var _ser = {
                color: '',
                type: 'bar',
                stack: this.$t('smt.sdd'),
                barMaxWidth: 40,
                label: {
                  normal: {
                    show: true,
                    formatter: p => {
                      if (p.value > 0) return p.value
                      else return ''
                    } // 当数值为0时不显示0
                  }
                },
                data: [],
                minuteData: []
              }
              // 产品下标--用于取颜色
              var indexColor = legend.indexOf(v.PART_NO + this.$t('smt.sdd'))

              if (v.DTL_TYPE === 0) {
                _ser.color = colors[indexColor]
                _ser.name = v.PART_NO + '_' + this.GetDtlTypeName(v.DTL_TYPE)
              } else if (v.DTL_TYPE === 1) {
                _ser.color = 'orange'
              } else if (v.DTL_TYPE === 2) {
                _ser.color = 'red'
              }
              if (v.DTL_TYPE > 0) {
                _ser.STANDARD_CAPACITY = v.STANDARD_CAPACITY
                _ser.name = this.GetDtlTypeName(v.DTL_TYPE)
                _ser.label.normal.formatter = p => {
                  if (p.value === 0) return ''
                  // 得到分钟数
                  var minute = this.HourYieldBar.getOption().series[p.seriesIndex].minuteData[p.dataIndex]
                  return p.seriesName + minute + this.$t('smt.minute')
                }
              }

              _ser.PART_NO = v.PART_NO
              _ser.WORK_TIME = v.WORK_TIME
              _ser.DTL_TYPE = v.DTL_TYPE

              for (var k = 0; k < index; k++) {
                _ser.data[k] = 0
                _ser.minuteData[k] = 0
              }
              _ser.data[index] = v.STANDARD_CAPACITY_MINUTE
              _ser.minuteData[index] = v.DTL_MINUTES
              _series[v.PART_NO + this.$t('smt.sdd')].push(_ser)
            }

            // 产能
            if (_series[v.PART_NO] === undefined) {
              _series[v.PART_NO] = {
                color: colors[legend.indexOf(v.PART_NO)],
                name: v.PART_NO,
                type: 'bar',
                stack: this.$t('smt.cy'),
                barMaxWidth: 40,
                label: {
                  normal: {
                    show: true,
                    formatter: p => {
                      if (p.value > 0) {
                        return p.value
                      } else return ''
                    } // 当数值为0时不显示0
                  }
                },
                data: [],
                markPoint: {
                  symbolRotate: -90, // 标注旋转度数
                  symbolSize: [34, 55], // 气泡大小
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
              }
              _series[v.PART_NO].data[index] = v.OUTPUT_QTY
            } else {
              if (index > -1) {
                _series[v.PART_NO].data[index] = v.OUTPUT_QTY
              }
            }
          })

          console.log('===========这里呢')

          // 添加到列表中
          for (var i in _series) {
            var ind = _series[i.replace(this.$t('smt.sdd'), '')].data.length
            if (i.indexOf('标准') > -1) {
              var seriedata = _series[i]
              seriedata.forEach((k, d) => {
                // eslint-disable-next-line no-unmodified-loop-condition
                for (var i = 0; k < ind; i++) {
                  if (d.seriedata[i] === undefined) d.seriedata[i] = 0
                }
                series.push(d)
              })
            } else {
              series.push(_series[i])
            }
          }

          // 配置信息
          legend.unshift(this.$t('smt.clc'))
          legend.unshift(this.$t('smt.rest'))
          var option = {
            legend: {
              data: legend
            },
            yAxis: {
              data: yAxis
            },
            series: series
          }
          this.HourYieldBar.hideLoading() // 隐藏加载动画
          console.log('HourYieldBar options ', this.HourYieldBar, option)
          this.HourYieldBar.setOption(option) // 加载数据图表
        }
      }
    },
    // 获取换线时间数据
    async GetSmtChangeLineRecord () {
      const res = await GetSmtChangeLineRecordData(this.LineForm)
      if (res.Result) {
        console.log(res, '动化线看板的异常报告')
        const data = JSON.parse(res.Result)
        if (data) {
          var seriesData = []
          var yAxis = GetDateList(5)
          if (data.length > 0) {
            var timeData = data[0].TimeValue

            timeData.forEach((v, i) => {
              if (v[4] === 0) {
                seriesData.push({
                  name: this.$t('smt.oh'),
                  value: [v[0], v[1], v[2], v[3]],
                  itemStyle: {
                    normal: {
                      color: 'green'
                    }
                  }
                })
              } else {
                seriesData.push({
                  name: this.$t('smt.cl'),
                  value: [v[0], v[1], v[2], v[3]],
                  itemStyle: {
                    normal: {
                      color: 'red'
                    }
                  }
                })
              }
            })
          }
          var option = {
            yAxis: {
              data: yAxis
            },
            series: [
              {
                type: 'bar',
                name: this.$t('smt.cl')
              },
              {
                type: 'custom',
                renderItem: (params, api) => {
                  var categoryIndex = api.value(0)
                  var start = api.coord([api.value(1), categoryIndex])
                  var end = api.coord([api.value(2), categoryIndex])
                  var height = api.size([0, 1])[1] * 0.6

                  var rectShape = echarts.graphic.clipRectByRect(
                    {
                      x: start[0],
                      y: start[1] - height / 2,
                      width: end[0] - start[0],
                      height: height
                    },
                    {
                      x: params.coordSys.x,
                      y: params.coordSys.y,
                      width: params.coordSys.width,
                      height: params.coordSys.height
                    }
                  )

                  return (
                    rectShape && {
                      type: 'rect',
                      shape: rectShape,
                      style: api.style()
                    }
                  )
                },
                itemStyle: {
                  normal: {
                    opacity: 0.9,
                    label: {
                      position: 'left',
                      color: 'red',
                      fontWeight: 900,
                      fontSize: 14,
                      // padding: [0, 0, 0, -14],
                      show: true,
                      formatter: p => {
                        if (p.name === '换线时间') {
                          return (
                            (parseInt(p.data.value[3] / 60) === 0
                              ? ''
                              : parseInt(p.data.value[3] / 60) + '时') +
                            (p.data.value[3] % 60 === 0
                              ? ''
                              : (p.data.value[3] % 60) + '分')
                          )
                        } else {
                          return ''
                        }
                      }
                    }
                  }
                },
                data: seriesData
              }
            ]
          }
          this.ExLineDateBar.hideLoading() // 隐藏加载动画
          this.ExLineDateBar.setOption(option) // 加载数据图表
        }
      }
    },
    // 初始化轮播
    InitSwiper () {
      // eslint-disable-next-line
      this.swiper1 = new Swiper("#swiper1", {
        slidesPerView: 1,
        loop: false,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 30000,
          disableOnInteraction: false
        },
        pagination: {
          el: '#swiper_p1',
          clickable: true
        }
      })
      // swiper1.el.onmouseover = function () {
      //   swiper1.autoplay.stop()
      // }
      // // 鼠标覆盖停止自动切换与隐藏前进后退按钮
      // swiper1.el.onmouseout = function () {
      //   swiper1.autoplay.start()
      // }
    },
    async getWoYidldPie () {
      /* =====================工单达成率 仪表盘 init=========================== */
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
          // formatter: '{a} <br/>{b} : {c}%'
          formatter: this.$t('smt.su') + ' : {c}%'
        },
        legend: {
          // top: 30,                // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff', // 字体颜色
            fontWeight: 700
          }
        },
        series: [
          {
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '58%'],
            radius: '110%',
            title: {
              // 设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: {
              // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: {
                // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [
                  // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: {
              // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      }
      this.WoYidldPie.setOption(optionWo, true)

      /* =====================低水位警报 柱状图 init============================== */
      this.RestPcbCountBar = echarts.init(
        document.getElementById('RestPcbCountBar')
      )
      var optionRestPcbCount = null
      optionRestPcbCount = {
        title: {
          id: 2,
          text: this.$t('smt._13'),
          padding: [5, 10, 10, 10],
          textStyle: {
            fontSize: 16,
            color: '#FFF'
          }
        },
        color: ['#e5323e', '#f5b031', '#c3b4df', '#59ccf7'],
        grid: {
          top: 50,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true
        },
        dataset: {
          // dimensions: ['site', 'PASS', 'FAIL', 'REPASS', 'REFAIL'],
          dimensions: ['LOCATION', 'REST_PCB_COUNT'],
          source: []
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            interval: 0,
            rotate: 30,
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
          }
        ]
      }

      this.RestPcbCountBar.setOption(optionRestPcbCount, true)

      /* =====================排产达成率 仪表盘 init=========================== */
      // this.WorkingPassRatePie = echarts.init(
      //   document.getElementById('WorkingPassRatePie')
      // )
      // var optionWorkingPassRate = null
      // optionWorkingPassRate = {
      //   title: {
      //     id: 1,
      //     left: 'center',
      //     top: 'middle',
      //     subtextStyle: {
      //       // 文字颜色
      //       color: '#FFF',
      //       // 字体风格,‘normal‘,‘italic‘,‘oblique‘
      //       fontStyle: 'normal',
      //       // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
      //       fontWeight: 'bold',
      //       // 字体系列
      //       // fontFamily: 'sans-serif',
      //       // 字体大小
      //       fontSize: 14
      //     }
      //   },
      //   grid: {
      //     top: 50,
      //     left: 40,
      //     right: 40,
      //     bottom: 30,
      //     containLabel: true
      //   },
      //   tooltip: {
      //     formatter: this.$t('smt.cr') + ' : {c}%'
      //   },
      //   legend: {
      //     selectedMode: false, // 取消图例上的点击事件
      //     textStyle: {
      //       fontSize: 20, // 字体大小
      //       color: '#ffffff' // 字体颜色
      //     }
      //   },
      //   series: [
      //     {
      //       type: 'gauge',
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'bottom'
      //         }
      //       },
      //       center: ['50%', '58%'],
      //       radius: '110%',
      //       title: {
      //         // 设置仪表盘中间显示文字样式
      //         textStyle: {
      //           // 其余属性默认使用全局文本样式，详见TEXTSTYLE
      //           // fontWeight: 'bolder',
      //           // fontSize: 10,
      //           // fontStyle: 'italic',
      //           color: 'white'
      //         }
      //       },
      //       pointer: {
      //         // 指针样式
      //         length: '80%'
      //       },
      //       axisLine: {
      //         show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
      //         lineStyle: {
      //           // 属性lineStyle控制线条样式
      //           shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
      //           shadowColor: '#fff', // 阴影颜色。支持的格式同color。
      //           color: [
      //             // 表盘颜色
      //             [0.5, '#DA462C'], // 0-50%处的颜色
      //             [0.7, '#FF9618'], // 51%-70%处的颜色
      //             [0.9, '#FFED44'], // 70%-90%处的颜色
      //             [1, '#20AE51'] // 90%-100%处的颜色
      //           ],
      //           width: 15 // 表盘宽度
      //         }
      //       },
      //       axisLabel: {
      //         // 文字样式（及“10”、“20”等文字样式）
      //         color: 'white',
      //         distance: 0 // 文字离表盘的距离
      //       },
      //       detail: {
      //         formatter: '{value}%',
      //         textStyle: {
      //           fontSize: 20
      //         }
      //       },
      //       data: [
      //         {
      //           value: 0
      //         }
      //       ]
      //     }
      //   ]
      // }
      // this.WorkingPassRatePie.setOption(optionWorkingPassRate, true)

      /* =====================首件合格率 仪表盘 init=========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        title: {
          left: 'center',
          top: 'middle',
          subtext: '0/0',
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
          // formatter: '{a} <br/>{b} : {c}%'
          formatter: '{b} : {c}%'
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
            title: {
              // 设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: {
              // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: {
                // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [
                  // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: {
              // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      }
      this.FirstPassRatePie.setOption(optionFirstPassRate, true)

      /* ===================每小时产能 柱状图 init============================= */
      this.HourYieldBar = echarts.init(document.getElementById('HourYieldBar'))
      var optionHourYield = null
      optionHourYield = {
        title: {
          id: 4,
          text: this.$t('smt.cph'),
          padding: [0, 0, 0, 0],
          textStyle: {
            fontSize: 16,
            color: '#FFF'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        color: ['orange', 'red'],
        // color: ['#9da7f5', '#081ae1', '#819280', '#118d07', '#946e9d', '#80059d', '#c768ab', '#c1098a'],
        // color: ['#4B7CF3', '#F4CB29', '#dd3ee5', '#12e78c', '#FE8463', '#B5C334'],
        // 暗蓝色#4962FC，亮蓝色#4B7CF3，紫色#dd3ee5，绿色#12e78c，橙色#fe8104，青色#01C2F9，亮黄色#F4CB29，暗黄色 #FD9E06
        legend: {
          textStyle: {
            // fontSize: 18,//字体大小
            color: '#ffffff' // 字体颜色
          },
          data: [this.$t('smt.al'), this.$t('smt.sd')]
        },
        grid: {
          top: 60,
          left: 1,
          right: 1,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            // interval: 0,
            // rotate: 30,
            rotate: 30,
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
      // eslint-disable-next-line prefer-const
      this.ExLineDateBar = echarts.init(
        document.getElementById('ExLineDateBar')
      )
      var optionLineDate = {
        tooltip: {
          formatter: params => {
            var str =
              params.marker +
              (params.name === '换线时间' ? params.name + ': ' : '')
            var v = params.value[3]
            var mm = parseInt(v % 60)
            str +=
              parseInt(v) === 0 ? '' : parseInt(v / 60) + this.$t('smt.hour')
            str += mm === 0 ? '' : mm + this.$t('smt.minute')
            return str
          }
        },
        color: ['red'],
        title: {
          text: this.$t('smt.cl'),
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
          data: [this.$t('smt.cl')]
        },
        grid: {
          top: 60,
          left: 1,
          right: 1,
          bottom: 20,
          containLabel: true
        },
        xAxis: {
          min: 0,
          max: 1440,
          minInterval: 1,
          maxInterval: 60,
          axisLabel: {
            formatter: val => {
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

      /* =====================AOI合格率 仪表盘 init=========================== */
      this.AoiPassRatePie = echarts.init(
        document.getElementById('AoiPassRatePie')
      )
      var optionAoiPassRate = null
      optionAoiPassRate = {
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
          // formatter: '{a} <br/>{b} : {c}%'
          formatter: this.$t('smt.qd') + ' : {c}%'
        },
        legend: {
          // top: 30
          // 上距离
          selectedMode: false, // 取消图例上的点击事件
          textStyle: {
            fontSize: 20, // 字体大小
            color: '#ffffff' // 字体颜色
          }
        },
        series: [
          {
            // name: '0 / 0 (件)',
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '60%'],
            radius: '110%',
            title: {
              // 设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: {
              // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: {
                // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [
                  // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: {
              // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      }
      this.AoiPassRatePie.setOption(optionAoiPassRate, true)
      /* =====================SPI合格率 仪表盘 init=========================== */
      this.SpiPassRatePie = echarts.init(
        document.getElementById('SpiPassRatePie')
      )
      var optionSpiPassRate = null
      optionSpiPassRate = {
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
            fontSize: 14
          }
        },
        grid: {
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          containLabel: true
        },
        tooltip: {
          // formatter: '{a} <br/>{b} : {c}%'
          formatter: this.$t('smt.qd') + ' : {c}%'
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
            // name: '0 / 0 (件)',
            type: 'gauge',
            label: {
              normal: {
                show: true,
                position: 'bottom'
              }
            },
            center: ['50%', '60%'],
            radius: '110%',
            title: {
              // 设置仪表盘中间显示文字样式
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                // fontWeight: 'bolder',
                // fontSize: 10,
                // fontStyle: 'italic',
                color: 'white'
              }
            },
            pointer: {
              // 指针样式
              length: '80%'
            },
            axisLine: {
              show: true, // 是否显示仪表盘轴线(轮廓线),默认 true。
              lineStyle: {
                // 属性lineStyle控制线条样式
                shadowBlur: 10, // (发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                shadowColor: '#fff', // 阴影颜色。支持的格式同color。
                color: [
                  // 表盘颜色
                  [0.5, '#DA462C'], // 0-50%处的颜色
                  [0.7, '#FF9618'], // 51%-70%处的颜色
                  [0.9, '#FFED44'], // 70%-90%处的颜色
                  [1, '#20AE51'] // 90%-100%处的颜色
                ],
                width: 15 // 表盘宽度
              }
            },
            axisLabel: {
              // 文字样式（及“10”、“20”等文字样式）
              color: 'white',
              distance: 0 // 文字离表盘的距离
            },
            detail: {
              formatter: '{value}%',
              textStyle: {
                fontSize: 20
              }
            },
            data: [
              {
                value: 0
              }
            ]
          }
        ]
      }
      this.SpiPassRatePie.setOption(optionSpiPassRate, true)
      window.onresize = () => {
        this.WoYidldPie.resize()
        this.RestPcbCountBar.resize()
        // this.WorkingPassRatePie.resize()
        this.FirstPassRatePie.resize()
        this.HourYieldBar.resize()
        this.AoiPassRatePie.resize()
        this.SpiPassRatePie.resize()
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
