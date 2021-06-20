import {
  ClearUncodedReport,
  GetCurrentWorkOrder,
  GetRefershHourYieldByStationID,
  PostToUncodedReport,
  LoadDataEX,
  NoCodeReportPrint,
  GetProductionWO
} from '@/api/AOIManualData'
import {
  print
} from '@/api/MaterialBarcode'
import {
  Station
} from '@/api/CollectProducts'
import {
  GetLins
} from '@/api/ProductLine'
import {
  AddOrModify
} from '@/api/SfcsOperationSites'
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
      dialogWoNo: false, // 工单弹框
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
      // HourYieldBar: null,
      // AoiPassRatePie: null,
      // AoiPassRatePie2: null,
      // TopDefectBar: null,
      // TopDefectBar2: null,
      msgList: [],
      // timer: null,
      // OPERATION_ID: 0,
      WoNoList: [],
      WoNoFrom: {
        WO_NO: '',
        Page: 1,
        Limit: 15
      },
      WoNototalPage: 0,
      WoNoBer: '',
      dialogStation: false,
      LineList: []
    }
  },
  created () {
    this.getOrder()
    this.getAddOrModify()
    if (!this.StationID) {
      this.dialogStation = true
    }
    // console.log(this.WoNoBer)
    // if (!this.WoNoBer) {
    //   this.dialogWoNo = true
    // }
  },
  mounted () {
    this.$nextTick(() => {
      this.initEchart()
    })
  },
  methods: {
    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
      }
    },
    operationCjange (e) {
      this.LineList.map(v => {
        if (e === v.Id) {
          this.lineName = v.OPERATION_LINE_NAME
          console.log(v, '====')
        }
      })
      this.StationID = ''
      this.getStatusList()
    },
    async getOrder () {
      const res = await GetProductionWO(this.WoNoFrom)
      this.WoNototalPage = res.Result.count
      this.WoNoList = res.Result.data || []
      if (this.WoNoList.length === 0) {
        this.WoNoList.push({
          LOOKUP_TYPE: '',
          NAME: '',
          ROWNO: ''
        })
      }
    },
    WoNoChange (e) {
      this.LoadDataEX(e)
    },
    async LoadDataEX (WO_NO) {
      const res = await LoadDataEX({ WO_NO })
      if (res.Result) {
        this.workInfo.WoNo = WO_NO // 工单
        this.workInfo.PartNo = res.Result[0].PART_NO // 料号
        this.workInfo.ModelName = res.Result[0].MODEL // 机种
        this.workInfo.WoTarget = res.Result[0].TARGET_QTY // 数量
        this.workInfo.WoId = res.Result[0].ID
        this.dialogWoNo = false
        this.getRefershHourYieldByStationID()// 获取每小时产能
      }
    },
    WoNoSizeChange (Limit) {
      this.WoNoFrom.Page = 1
      this.WoNoFrom.Limit = Limit
      this.getOrder()
    },
    WoNoCurrentChange (Page) {
      this.WoNoFrom.Page = Page
      this.getOrder()
    },
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
      console.log(data)
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
      this.dialogWoNo = true
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
      await this.getOrder()// 选择工单
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
    // 提交报工产能 -打印
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
      // 获取打印标签ID
      const res = await NoCodeReportPrint({
        'USER_NAME': this.username,
        'WO_NO': this.workInfo.WoNo,
        'REPORT_QTY': this.form1.CapacityReportQty,
        'SITE_ID': this.StationID,
        'CATRON_NO': ''
      })
      if (res.ErrorInfo.Status === false && res.Result) {
        // 成功  --调打印接口
        this.BasePrint(res.Result)
      }
    },
    async BasePrint (PrintTaskId) {
      await print({
        PrintTaskId,
        Printer: this.username
      })
        .then(res => {
          if (res.data.Code === 1) {
            if (res.data.Data) {
              // 打印成功
              this.handeSubmitChangNengBaogong() // 调用提交产能接口
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('MesBatchManager._52'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$notify({
                title: this.$t('publics.tips.handleFail'),
                message: res.data.Msg,
                type: 'error',
                duration: 2000
              })
            }
          } else {
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.data.Msg,
              type: 'error',
              duration: 2000
            })
          }
        })
    },
    // 提交产能报功
    async handeSubmitChangNengBaogong () {
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
        this.getRefershHourYieldByStationID()// 获取每小时产能
        // this.loopData()
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
        this.getRefershHourYieldByStationID()// 获取每小时产能
        // this.loopData()
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

      window.onresize = () => {
        this.HourYieldBar.resize()
      }
    }
  }
}
