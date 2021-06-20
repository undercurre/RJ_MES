import {
  ClearUncodedReport,
  GetCurrentWorkOrder,
  GetfershTopDefectByStation,
  GetRefershHourYieldByStationID,
  GetRefershPassRate,
  PostToUncodedReport
} from '@/api/AOIManualData'
import {
  Station
} from '@/api/CollectProducts'
import {
  GetLins
} from '@/api/ProductLine'
import dayjs from 'dayjs'
import echarts from 'echarts'
import {
  mapGetters
} from 'vuex'
const fs = {
  // 全屏 类
  fullScreen: (function () {
    let isFullScreen = false
    let requestFullScreen = function () { // 全屏
      let de = document.documentElement
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
    let exitFull = function () {
      // 判断各种浏览器，找到正确的方法
      let exitMethod = document.exitFullscreen || // W3C
        document.mozCancelFullScreen || // Chrome等
        document.webkitExitFullscreen || // FireFox
        document.webkitExitFullscreen // IE11
      if (exitMethod) {
        exitMethod.call(document)
      } else if (typeof window.ActiveXObject !== 'undefined') { // for Internet Explorer
        // eslint-disable-next-line
        let wscript = new ActiveXObject('WScript.Shell')
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
export default {
  name: 'AOIManualData',
  fs,
  computed: {
    ...mapGetters([
      'userId',
      'username'
    ])
  },
  data () {
    return {
      form1: {
        REPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      },
      form2: {
        REPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      },
      dialogVisible: false,
      lineLists: [],
      lineId: null,
      currentWoNoIndex: 0,
      workInfo: {},
      lineName: '',
      StationFrom: {
        OPERATION_LINE_ID: '',
        OPERATION_SITE_NAME: '',
        ENABLED: 'Y',
        Page: 1,
        Limit: 10
      },
      StationtotalPage: 0,
      StationtoList: [],
      StationID: null,
      SiteFrom: {},
      StationName: '',
      HourYieldBar: null,
      AoiPassRatePie: null,
      AoiPassRatePie2: null,
      TopDefectBar: null,
      TopDefectBar2: null,
      msgList: [],
      timer: null,
      OPERATION_ID: 0
    }
  },
  created () {
    this.getLines()
    if (!this.lineId) {
      this.dialogVisible = true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  methods: {
    lineChange (e) {
      this.StationFrom.OPERATION_LINE_ID = e
      this.lineLists.map(i => {
        if (i.ID === e) {
          this.lineName = i.OPERATION_LINE_NAME
        }
      })
      this.StationID = ''
      this.StationName = ''
      this.SiteFrom.SiteId = 0
      this.OPERATION_ID = 0
      this.getStatusList()
    },
    async getStatusList () {
      const res = await Station(this.StationFrom)
      this.StationtotalPage = res.TotalCount || 0
      const data = JSON.parse(res.Result)
      this.StationtoList = data || []
      if (this.StationtoList.length === 0) {
        this.StationtoList.push({
          OPERATION_SITE_NAME: '',
          ID: ''
        })
      }
    },
    StationSizeChange (Limit) {
      this.StationFrom.Page = 1
      this.StationFrom.Limit = Limit
      this.getStatusList()
    },
    StationCurrentChange (Page) {
      this.StationFrom.Page = Page
      this.getStatusList()
    },
    StationChange (e) {
      if (this.SiteFrom.OPERATION_LINE_ID !== undefined) {
        this.$message.error(this.$t('SfcsOperationSites._9'))
        return
      }
      this.SiteFrom.SiteId = e
      this.StationtoList.map(v => {
        if (e === v.ID) {
          this.StationName = v.OPERATION_SITE_NAME
          this.OPERATION_ID = v.OPERATION_ID
        }
      })
      this.dialogStation = false
    },
    async getCurrentWorkOrder () {
      const res = await GetCurrentWorkOrder({
        currentOperationLineID: this.lineId,
        currentWoNoIndex: this.currentWoNoIndex
      })
      if (res.Result) {
        this.workInfo = res.Result || {}
      } else {
        this.workInfo = {}
      }
    },
    async getLines () {
      const res = await GetLins({
        USER_ID: this.userId,
        Page: 1,
        Limit: 1000000
      })
      if (res.Result) {
        this.lineLists = JSON.parse(res.Result) || []
      } else {
        this.lineLists = []
      }
    },
    handleClose () {
      if (!this.lineId) {
        this.$message.error(this.$t('_kanban._6'))
      } else if (!this.StationID) {
        this.$message.error('请选择工位')
      } else {
        this.loopData()
        this.dialogVisible = false
      }
    },
    async loadingData () {
      await this.getCurrentWorkOrder()
      this.getRefershHourYieldByStationID()
      this.GetfershTopDefectByStation()
      this.GetfershTopDefectByStation('Today')
      this.GetRefershPassRate()
      this.GetRefershPassRate('Today')
    },
    loopData () {
      if (this.timer) {
        clearInterval(this.timer)
      }
      this.loadingData()
      this.timer = setInterval(() => {
        this.loadingData()
      }, 2 * 60 * 1000)
    },
    async submitChanNengBaogong () {
      if (!this.form1.REPORT_DATE) {
        this.$message.error('请选择报工日期')
        return false
      }
      if (!this.form1.REPORT_TIME) {
        this.$message.error('请选择报工时间')
        return false
      }
      if (!this.form1.CapacityReportQty) {
        this.$message.error('请输入报工数量')
        return false
      }
      const res = await PostToUncodedReport({
        SiteID: this.StationID,
        WO_NO: this.workInfo.WoNo,
        CapacityReportQty: this.form1.CapacityReportQty,
        REPORT_TIME: this.form1.REPORT_DATE + ' ' + this.form1.REPORT_TIME,
        DefectReportQty: 0,
        UserName: this.username
      })
      if (res.Result) {
        this.msgList.unshift({
          type: 'success',
          msg: `工位：${this.StationName} ---- 工单：${this.workInfo.WoNo} >>> 产能报工成功`
        })

        this.loopData()
        this.$message.success('产能报工成功')
      }
    },
    async cancelChangNengBaogong () { // 撤销产能报工
      if (!this.form1.REPORT_DATE) {
        this.$message.error('请选择报工日期')
        return false
      }
      if (!this.form1.REPORT_TIME) {
        this.$message.error('请选择报工日期')
        return false
      }
      // if (!this.form1.CapacityReportQty) {
      //   this.$message.error('请输入报工数量')
      //   return false
      // }
      const res = await ClearUncodedReport({
        SiteID: this.StationID,
        WO_NO: this.workInfo.WoNo,
        CapacityReportQty: this.form1.CapacityReportQty || 0,
        REPORT_TIME: this.form1.REPORT_DATE + ' ' + this.form1.REPORT_TIME,
        DefectReportQty: 0,
        UserName: this.username
      })
      if (res.Result) {
        // this.form1 = {
        //   EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        //   REPORT_TIME: dayjs().format('HH:00')
        // }
        this.msgList.unshift({
          type: 'success',
          msg: `工位：${this.StationName} ---- 工单：${this.workInfo.WoNo} >>> 撤销产能报工成功`
        })
        this.loopData()
        this.$message.success('撤销产能报工成功')
      }
    },
    async submitBuliangBaogong () { // 不良报工
      if (!this.form2.REPORT_DATE) {
        this.$message.error('请选择报工日期')
        return false
      }
      if (!this.form2.REPORT_TIME) {
        this.$message.error('请选择报工日期')
        return false
      }
      if (!this.form2.DefectReportQty) {
        this.$message.error('请输入报工数量')
        return false
      }
      if (!this.form2.DEFECT_CODE) {
        this.$message.error('请输入不良代码')
        return false
      }
      // if (!this.form2.DEFECT_LOC) {
      //   this.$message.error('请输入不良位号')
      //   return false
      // }
      const res = await PostToUncodedReport({
        SiteID: this.StationID,
        WO_NO: this.workInfo.WoNo,
        CapacityReportQty: 0,
        REPORT_TIME: this.form2.REPORT_DATE + ' ' + this.form2.REPORT_TIME,
        DefectReportQty: this.form2.DefectReportQty || 0,
        UserName: this.username,
        DEFECT_CODE: this.form2.DEFECT_CODE || '',
        DEFECT_LOC: this.form2.DEFECT_LOC || ''
      })
      if (res.Result) {
        this.msgList.unshift({
          type: 'success',
          msg: `工位：${this.StationName} ---- 工单：${this.workInfo.WoNo} >>> 不良报工成功`
        })
        this.loopData()
        this.$message.success('不良报工成功')
      }
    },
    async cancelBuliangBaogong () { // 撤销不良报工
      if (!this.form2.REPORT_DATE) {
        this.$message.error('请选择报工日期')
        return false
      }
      if (!this.form2.REPORT_TIME) {
        this.$message.error('请选择报工日期')
        return false
      }
      // if (!this.form2.DefectReportQty) {
      //   this.$message.error('请输入报工数量')
      //   return false
      // }
      // if (!this.form2.DEFECT_CODE) {
      //   this.$message.error('请输入不良代码')
      //   return false
      // }
      // if (!this.form2.DEFECT_LOC) {
      //   this.$message.error('请输入不良位号')
      //   return false
      // }
      const res = await ClearUncodedReport({
        SiteID: this.StationID,
        WO_NO: this.workInfo.WoNo,
        CapacityReportQty: 0,
        REPORT_TIME: this.form2.REPORT_DATE + ' ' + this.form2.REPORT_TIME,
        DefectReportQty: this.form2.DefectReportQty || 0,
        UserName: this.username,
        DEFECT_CODE: this.form2.DEFECT_CODE || '',
        DEFECT_LOC: this.form2.DEFECT_LOC || ''
      })
      if (res.Result) {
        // this.form2 = {
        //   EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        //   REPORT_TIME: dayjs().format('HH:00')
        // }
        this.msgList.unshift({
          type: 'success',
          msg: `工位：${this.StationName} ---- 工单：${this.workInfo.WoNo} >>> 撤销不良报工成功`
        })
        this.loopData()
        this.$message.success('撤销不良报工成功')
      }
    },
    prevGongdan () {
      this.form1 = {
        EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      }
      this.form2 = {
        EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      }
      if (this.currentWoNoIndex >= 4) {
        this.currentWoNoIndex = 4
      } else {
        this.currentWoNoIndex++
      }
      this.loopData()
    },
    handleToEsop () { // 跳转到E-sop
      if (this.workInfo.PartNo === '') {
        this.$message({
          showClose: true,
          message: this.$t('CollectProducts._36'),
          type: 'warning'
        })
        return
      }
      let routeData = this.$router.resolve({
        path: '/SOPsimple/SOP/index',
        query: {
          siteId: this.StationID, // 站点ID
          partNo: this.workInfo.PartNo, // 料号
          operationId: this.OPERATION_ID, // 工位ID
          wono: this.workInfo.WoNo, // 工单
          description: this.workInfo.ModelName, // 机型
          operationlionname: this.lineName, // 线体名称
          operationlionid: this.lineId, // 线体id
          stationname: this.StationName // 工位名称
          // OPERATION_LINE_NAME
        }
      })
      window.open(routeData.href, '_blank')
    },
    handleShuaxin () {
      this.form1 = {
        EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      }
      this.form2 = {
        EPORT_DATE: dayjs().format('YYYY-MM-DD'),
        REPORT_TIME: dayjs().format('HH:00')
      }
      this.currentWoNoIndex = 0
      this.loopData()
    },
    // 今日每小时产能
    async getRefershHourYieldByStationID () {
      const res = await GetRefershHourYieldByStationID({
        currentWoId: this.workInfo.WoId,
        currentOperationSiteID: this.StationID
      })
      if (res.Result) {
        const _data = res.Result.data || []
        if (_data) {
          // if (_data.length === 0) return
          // let legend = []
          // let yAxis = []
          // let timeData = {}
          // let series = []
          // let _series = {}
          // let point = []
          // let colors = [
          //   '#9da7f5',
          //   '#081ae1',
          //   '#819280',
          //   '#118d07',
          //   '#946e9d',
          //   '#80059d',
          //   '#c768ab',
          //   '#c1098a'
          // ]
          // // 构建类型列表 / Y轴列表
          // data.forEach((v, i) => {
          //   if (legend.indexOf(v.PART_NO) === -1) {
          //     legend.push(v.PART_NO + this.$t('smt.sdd'))
          //     legend.push(v.PART_NO)
          //   }
          //
          //   let timeStr = this.getDateStr(v.WORK_TIME)
          //   if (yAxis.indexOf(timeStr) === -1) {
          //     yAxis.push(timeStr)
          //
          //     // 获取到每个时间段数据
          //     timeData[timeStr] = {}
          //     timeData[timeStr][v.PART_NO] = v
          //   } else {
          //     timeData[timeStr][v.PART_NO] = v
          //   }
          // })
          //
          // // 构建异常信息数据
          // for (let time in timeData) {
          //   let outputQty = 0
          //   let index = 1
          //   for (let no in timeData[time]) {
          //     if (index > 1) break
          //     index++
          //     let v = timeData[time][no]
          //
          //     outputQty += v.OUTPUT_QTY
          //     switch (v.STATUS) {
          //       case -2:
          //         point.push({
          //           value: this.$t('smt.in'),
          //           xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
          //           yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
          //           symbol: 'pin',
          //           itemStyle: {
          //             color: 'blue'
          //           },
          //           WORK_TIME: v.WORK_TIME
          //         })
          //         break
          //       case -1:
          //         point.push({
          //           value: this.$t('smt.nl'),
          //           xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
          //           yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
          //           symbol: 'pin',
          //           itemStyle: {
          //             color: 'green'
          //           },
          //           WORK_TIME: v.WORK_TIME
          //         })
          //         break
          //       case 0:
          //       case 1:
          //       case 2:
          //         let str = this.$t('smt.ala') + '：' + v.REPORT_CONTENT + '。'
          //         if (
          //           v.REASON !== '' &&
          //           v.REASON !== undefined &&
          //           v.REASON !== null
          //         ) {
          //           str += this.$t('smt._1') + '：' + v.REASON
          //         }
          //         point.push({
          //           value: str,
          //           xAxis: outputQty - parseInt(v.OUTPUT_QTY / 6),
          //           yAxis: yAxis.indexOf(this.getDateStr(v.WORK_TIME)),
          //           symbol: 'pin',
          //           itemStyle: {
          //             color: 'red'
          //           },
          //           WORK_TIME: v.WORK_TIME
          //         })
          //         break
          //       default:
          //     }
          //   }
          // }
          //
          // // 构建数据列表
          // data.forEach(v => {
          //   // Y轴下标
          //   let index = yAxis.indexOf(this.getDateStr(v.WORK_TIME))
          //
          //   // 标准产能
          //   if (_series[v.PART_NO + this.$t('smt.sdd')] === undefined) {
          //     _series[v.PART_NO + this.$t('smt.sdd')] = []
          //   }
          //
          //   // 标准产能数据列表
          //   let standardData = _series[v.PART_NO + this.$t('smt.sdd')]
          //
          //   let isExist = false
          //   standardData.forEach((d, i2) => {
          //     // 产品号相同、标准产能类型相同、时间不同
          //     if (
          //       d.PART_NO === v.PART_NO &&
          //       d.DTL_TYPE === v.DTL_TYPE &&
          //       d.WORK_TIME !== v.WORK_TIME
          //     ) {
          //       if (
          //         (d.data[index] === 0 || d.data[index] === undefined) &&
          //         !isExist
          //       ) {
          //         d.data[index] = v.STANDARD_CAPACITY_MINUTE
          //         d.minuteData[index] = v.DTL_MINUTES
          //         isExist = true
          //       }
          //     }
          //   })
          //
          //   // 当前数据不存在标准产能数据中----添加进去
          //   if (!isExist) {
          //     let _ser = {
          //       color: '',
          //       type: 'bar',
          //       stack: this.$t('smt.sdd'),
          //       barMaxWidth: 40,
          //       label: {
          //         normal: {
          //           show: true,
          //           formatter: p => {
          //             if (p.value > 0) return p.value
          //             else return ''
          //           } // 当数值为0时不显示0
          //         }
          //       },
          //       data: [],
          //       minuteData: []
          //     }
          //     // 产品下标--用于取颜色
          //     let indexColor = legend.indexOf(v.PART_NO + this.$t('smt.sdd'))
          //
          //     if (v.DTL_TYPE === 0) {
          //       _ser.color = colors[indexColor]
          //       _ser.name = v.PART_NO + '_' + this.GetDtlTypeName(v.DTL_TYPE)
          //     } else if (v.DTL_TYPE === 1) {
          //       _ser.color = 'orange'
          //     } else if (v.DTL_TYPE === 2) {
          //       _ser.color = 'red'
          //     }
          //     if (v.DTL_TYPE > 0) {
          //       _ser.STANDARD_CAPACITY = v.STANDARD_CAPACITY
          //       _ser.name = this.GetDtlTypeName(v.DTL_TYPE)
          //       _ser.label.normal.formatter = p => {
          //         if (p.value === 0) return ''
          //         // 得到分钟数
          //         let minute = this.HourYieldBar.getOption().series[p.seriesIndex].minuteData[p.dataIndex]
          //         return p.seriesName + minute + this.$t('smt.minute')
          //       }
          //     }
          //
          //     _ser.PART_NO = v.PART_NO
          //     _ser.WORK_TIME = v.WORK_TIME
          //     _ser.DTL_TYPE = v.DTL_TYPE
          //
          //     for (let k = 0; k < index; k++) {
          //       _ser.data[k] = 0
          //       _ser.minuteData[k] = 0
          //     }
          //     _ser.data[index] = v.STANDARD_CAPACITY_MINUTE
          //     _ser.minuteData[index] = v.DTL_MINUTES
          //     _series[v.PART_NO + this.$t('smt.sdd')].push(_ser)
          //   }
          //
          //   // 产能
          //   if (_series[v.PART_NO] === undefined) {
          //     _series[v.PART_NO] = {
          //       color: colors[legend.indexOf(v.PART_NO)],
          //       name: v.PART_NO,
          //       type: 'bar',
          //       stack: this.$t('smt.cy'),
          //       barMaxWidth: 40,
          //       label: {
          //         normal: {
          //           show: true,
          //           formatter: p => {
          //             if (p.value > 0) {
          //               return p.value
          //             } else return ''
          //           } // 当数值为0时不显示0
          //         }
          //       },
          //       data: [],
          //       markPoint: {
          //         symbolRotate: -90, // 标注旋转度数
          //         symbolSize: [34, 55], // 气泡大小
          //         label: {
          //           normal: {
          //             fontSize: 10,
          //             show: true,
          //             color: '#fff', // 字体颜色
          //             position: 'insideLeft', // 字体相对定位
          //             distance: 17 // 定位边距
          //           }
          //         },
          //         data: point
          //       }
          //     }
          //     _series[v.PART_NO].data[index] = v.OUTPUT_QTY
          //   } else {
          //     if (index > -1) {
          //       _series[v.PART_NO].data[index] = v.OUTPUT_QTY
          //     }
          //   }
          // })
          //
          // console.log('===========这里呢')
          //
          // // 添加到列表中
          // for (let i in _series) {
          //   let ind = _series[i.replace(this.$t('smt.sdd'), '')].data.length
          //   if (i.indexOf('标准') > -1) {
          //     let seriedata = _series[i]
          //     seriedata.forEach((k, d) => {
          //       // eslint-disable-next-line no-unmodified-loop-condition
          //       for (let i = 0; k < ind; i++) {
          //         if (d.seriedata[i] === undefined) d.seriedata[i] = 0
          //       }
          //       series.push(d)
          //     })
          //   } else {
          //     series.push(_series[i])
          //   }
          // }
          //
          // // 配置信息
          // legend.unshift(this.$t('smt.clc'))
          // legend.unshift(this.$t('smt.rest'))
          // let option = {
          //   legend: {
          //     data: legend
          //   },
          //   yAxis: {
          //     data: yAxis
          //   },
          //   series: series
          // }
          var dataAxis = _data.map(i => i.WORK_HOUR)
          var data = []
          var data2 = []
          var yMax = 0
          _data.map(i => {
            data.push(i.PASS)
            data2.push(i.FAIL)
            if (i.PASS > yMax) {
              yMax = i.PASS
            }
            if (i.FAIL > yMax) {
              yMax = i.FAIL
            }
          })
          yMax = Math.ceil((parseFloat(yMax) / 10)) * 10
          var dataShadow = []
          for (var i = 0; i < data.length; i++) {
            dataShadow.push(yMax)
          }
          var option = {
            title: {
              show: false
            },
            xAxis: {
              data: dataAxis,
              axisLabel: {
                inside: false,
                textStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold'

                }
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              z: 10
            },
            yAxis: {
              axisLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                textStyle: {
                  color: '#999'
                }
              }
            },
            dataZoom: [
              {
                type: 'inside'
              }
            ],
            legend: {
              data: ['产能报工', '不良报工'],
              axisLine: {
                lineStyle: {
                  color: '#fff',
                  fontSize: 16,
                  fontWeight: 'bold'
                }
              },
              textStyle: {
                color: '#fff',
                fontSize: 16
              },
              right: 0
              // orient: 'vertical'
            },
            series: [
              // {
              //   type: 'bar',
              //   itemStyle: {
              //     color: 'rgba(0,0,0,0.05)'
              //   },
              //   barGap: '-100%',
              //   barCategoryGap: '40%',
              //   data: dataShadow,
              //   animation: false
              // },
              {
                name: '产能报工',
                type: 'bar',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#83bff6' },
                      { offset: 0.5, color: '#188df0' },
                      { offset: 1, color: '#188df0' }
                    ]
                  )
                },
                emphasis: {
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                      ]
                    )
                  }
                },
                data: data,
                label: {
                  show: true,
                  position: 'top',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16
                }
              },
              {
                name: '不良报工',
                type: 'bar',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                      { offset: 0, color: '#83f6ad' },
                      { offset: 0.5, color: '#18f04e' },
                      { offset: 1, color: '#18f0ac' }
                    ]
                  )
                },
                emphasis: {
                  itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#83f6ad' },
                        { offset: 0.7, color: '#18f04e' },
                        { offset: 1, color: '#18f0ac' }
                      ]
                    )
                  }
                },
                data: data2,
                label: {
                  show: true,
                  position: 'top',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: 16,
                  formatter: function (data) {
                    if (data.value) {
                      return data.value
                    } else {
                      return ''
                    }
                  }
                }
              }
            ]
          }
          this.HourYieldBar.hideLoading() // 隐藏加载动画
          console.log('HourYieldBar options ', this.HourYieldBar, option)
          this.HourYieldBar.setOption(option) // 加载数据图表
        }
      }
    },
    // 不良现象
    async GetfershTopDefectByStation (Type) {
      const res = await GetfershTopDefectByStation({
        currentWoId: this.workInfo.WoId,
        currentOperationSiteID: this.StationID,
        Type
      })
      if (res.Result) {
        const data = res.Result.data || []
        if (Type) {
          if (true || data.length > 0) {
            let arrxAxis = [] // new Array[]; 数组
            let arrseries = [] // new Array[]; 数组
            for (let i in data) {
              arrxAxis.push(data[i].DEFECT_DESCRIPTION + '(' + data[i].QTY + ')')
              let obj = {} // 对象
              obj.value = data[i].QTY
              obj.name = data[i].DEFECT_DESCRIPTION + '(' + data[i].QTY + ')'
              arrseries.push(obj)
            }
            // eslint-disable-next-line no-undef
            this.TopDefectBar2.hideLoading() // 隐藏加载动画
            // eslint-disable-next-line no-undef
            this.TopDefectBar2.setOption({ // 加载数据图表
              legend: {
                data: arrxAxis
              },
              series: [{
                // 根据名字对应到相应的系列
                data: arrseries
              }]
            })
          }
        } else {
          if (true || data.length > 0) {
            let arrxAxis = [] // new Array[]; 数组
            let arrseries = [] // new Array[]; 数组
            for (let i in data) {
              arrxAxis.push(data[i].DEFECT_DESCRIPTION + '(' + data[i].QTY + ')')
              let obj = {} // 对象
              obj.value = data[i].QTY
              obj.name = data[i].DEFECT_DESCRIPTION + '(' + data[i].QTY + ')'
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
          }
        }
      }
    },
    // 直通率
    async GetRefershPassRate (Type) {
      const res = await GetRefershPassRate({
        currentWoId: this.workInfo.WoId,
        currentOperationSiteID: this.StationID,
        Type
      })
      if (res.Result) {
        const data = res.Result.data || []
        if (Type) {
          if (data) {
            if (true || data.length > 0) {
              this.AoiPassRatePie2.hideLoading() // 隐藏加载动画
              this.AoiPassRatePie2.setOption({
                // 加载数据图表
                title: {
                  left: 'center',
                  top: '62%',
                  subtext:
                    data[0].PASS +
                    ' / ' +
                    data[0].TOTAL +
                    this.$t('smt.ps'),
                  subtextStyle: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold'
                  },
                  show: true
                },
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
        } else {
          if (data) {
            if (true || data.length > 0) {
              this.AoiPassRatePie.hideLoading() // 隐藏加载动画
              this.AoiPassRatePie.setOption({
                // 加载数据图表
                title: {
                  left: 'center',
                  top: '62%',
                  subtext:
                    data[0].PASS +
                    ' / ' +
                    data[0].TOTAL +
                    this.$t('smt.ps'),
                  subtextStyle: {
                    color: '#fff',
                    fontSize: 16,
                    fontWeight: 'bold'
                  },
                  show: true
                },
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
      }
    },
    initEchart () {
      /* ===================每小时产能 柱状图 init============================= */
      this.HourYieldBar = echarts.init(document.getElementById('meixiaoshichanneng'))
      let optionHourYield = null
      var dataAxis = []
      var data = []
      var yMax = 50
      var dataShadow = []

      for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax)
      }

      optionHourYield = {
        title: {
          show: false
        },
        xAxis: {
          data: dataAxis,
          axisLabel: {
            inside: true,
            textStyle: {
              color: '#fff'
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          z: 10
        },
        yAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#999'
            }
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        series: [
          // { // For shadow
          //   type: 'bar',
          //   itemStyle: {
          //     color: 'rgba(0,0,0,0.05)'
          //   },
          //   barGap: '-100%',
          //   barCategoryGap: '40%',
          //   data: dataShadow,
          //   animation: false
          // },
          {
            type: 'bar',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                  { offset: 0, color: '#83bff6' },
                  { offset: 0.5, color: '#188df0' },
                  { offset: 1, color: '#188df0' }
                ]
              )
            },
            emphasis: {
              itemStyle: {
                color: new echarts.graphic.LinearGradient(
                  0, 0, 0, 1,
                  [
                    { offset: 0, color: '#2378f7' },
                    { offset: 0.7, color: '#2378f7' },
                    { offset: 1, color: '#83bff6' }
                  ]
                )
              }
            },
            data: data
          }
        ]
      }
      this.HourYieldBar.setOption(optionHourYield, true)

      /* =====================AOI合格率 仪表盘 init=========================== */
      this.AoiPassRatePie = echarts.init(
        document.getElementById('gongdanhegelv')
      )
      let optionAoiPassRate = null
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
          },
          show: false
        },
        grid: {
          top: 20,
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

      this.AoiPassRatePie2 = echarts.init(
        document.getElementById('jinrihegelv')
      )
      let optionAoiPassRate2 = null
      optionAoiPassRate2 = {
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
          },
          show: false
        },
        grid: {
          top: 20,
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
      this.AoiPassRatePie2.setOption(optionAoiPassRate2, true)

      /* ===================不良代码排名 柱状图 init============================ */
      this.TopDefectBar = echarts.init(document.getElementById('gongdantop5'))
      let optionTopDefect = null
      // app.title = '坐标轴刻度与标签对齐';
      optionTopDefect = {
        title: {
          id: 3,
          text: this.$t('pdl._14'),
          textStyle: {
            color: '#FFF'
          },
          show: false
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
      this.TopDefectBar.setOption(optionTopDefect, true)

      /* ===================不良代码排名 柱状图 init============================ */
      this.TopDefectBar2 = echarts.init(document.getElementById('jinritop5'))
      let optionTopDefect2 = null
      // app.title = '坐标轴刻度与标签对齐';
      optionTopDefect2 = {
        title: {
          id: 3,
          text: this.$t('pdl._14'),
          textStyle: {
            color: '#FFF'
          },
          show: false
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
      this.TopDefectBar2.setOption(optionTopDefect2, true)

      window.onresize = () => {
        this.TopDefectBar.resize()
        this.TopDefectBar2.resize()
        this.HourYieldBar.resize()
        this.AoiPassRatePie.resize()
        this.AoiPassRatePie2.resize()
      }
    }
  }
}
