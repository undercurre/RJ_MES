import {
  CheckLine,
  GetKanbanWoData
} from '@/api/Kanban'
import {
  GetWoPassTotal,
  GetWoToRate,
  Top5Prouduct,
  GetSiteStatistics,
  GetWoToDayALL
} from '@/api/Kanban/GetWoPassTotal.js'
import { GetTopDefectData } from '@/api/ProductLine'
import { LoadData } from '@/api/SfcsOperationLines'
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
export default {
  fs,
  name: 'Meilian',
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
      ThroughRate: null,
      timer: null,
      dialogVisible: false,
      lineLists: [],
      // 不良
      FectForm: {
        lineId: 0,
        topCount: 5
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
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
  mounted () {

  },
  created () {
    if (this.$route.query.lineId) {
      this.lineId = parseInt(this.$route.query.lineId)
    }
    this.$nextTick(() => {
      this.InitSwiper()
      this.getWoYidldPie()
    })
    this.getLines()
    if (!this.lineId) {
      this.dialogVisible = true
    }
    this.loopData()
  },
  methods: {
    getDateStr (dateStr) {
      var date = new Date(Date.parse(dateStr))
      var day = (date.getDate()).toString()
      var hour = (date.getHours()).toString()
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
      const res = await LoadData({
        USER_ID: this.userId,
        Page: 1,
        Limit: 1000000000
      })
      const data = JSON.parse(res.Result)
      this.lineLists = data || []
    },
    loadingData (isShowLoading = true) {
      this.RestPcForm.lineId = this.lineId
      this.LineForm.lineId = this.lineId
      this.Spotheck.lineId = this.lineId
      this.getCheckLine(isShowLoading)
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
    /* 检查线体是否存在 */
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
      console.log(res, '检查线体是否存在')
      if (res.Result) {
        await Promise.all([
          this.GetCurrent(),
          this.GetWoPass(),
          this.GetWoToRate(),
          this.GetWoToDayALL(),
          this.GetHourlyCapacity(),
          this.Top5Prouduct(),
          this.GetKanbanDefectMsg()
        ]).catch(() => {
          if (isShowLoading) loading.close()
        })
        if (isShowLoading) loading.close()
      } else {
        if (isShowLoading) loading.close()
      }
    },
    /*  线体信息 */
    async GetCurrent () {
      const res = await GetKanbanWoData(this.lineId)
      if (res.Result) {
        const data = JSON.parse(res.Result)
        this.LineName = data[0].OPERATION_LINE_NAME
        this.WoNo = data[0].WO_NO
        this.PartNo = data[0].PART_NO
        this.WoModel = data[0].MODEL
      }
    },
    async GetWoToDayALL () {
      const res = await GetWoToDayALL(this.lineId)
      this.tableData = res.Result ? res.Result : []
    },
    /*  直通率 */
    async GetWoToRate () {
      const res = await GetWoToRate(this.lineId)
      console.log(res.Result, '直通率')
      if (res.Result) {
        const data = res.Result
        // const data = { PassTotal: 63, TargetQty: 2005 }
        if (data) {
          this.ThroughRate.hideLoading() // 隐藏加载动画
          this.ThroughRate.setOption({ // 加载数据图表this.$t('smt.ps')
            series: [{
              data: [{
                value: parseFloat(data * 100).toFixed(2),
                name: this.$t('smt._12')
              }]
            }]
          })
        }
      }
    },
    /*  当前工单完成 */
    async GetWoPass () {
      const res = await GetWoPassTotal(this.lineId)
      if (res.Result) {
        const data = res.Result
        // const data = { PassTotal: 63, TargetQty: 2005 }
        if (data) {
          var helv = 0
          console.log(data, 'datadata')
          if (data.PassTotal) {
            helv = data.PassTotal / data.TargetQty
          } else {
            helv = 0
          }
          // console.log(helv, 'helvhelv')
          this.WoYidldPie.hideLoading() // 隐藏加载动画
          this.WoYidldPie.setOption({ // 加载数据图表this.$t('smt.ps')
            title: {
              left: 'center',
              top: 'middle',
              subtext: data.PassTotal + ' / ' + data.TargetQty + this.$t('smt.ps')
            },
            series: [{
              data: [{
                value: parseFloat(helv * 100).toFixed(2),
                name: this.$t('smt.su')
              }]
            }]
          })
          console.log(data, '获取产线的工单信息')
        }
      }
    },
    /* 不良Top5 */
    async GetKanbanDefectMsg () {
      this.FectForm.lineId = this.lineId
      if (this.FectForm.lineId) {
        const res = await GetTopDefectData(this.FectForm)
        const data = JSON.parse(res.Result).data
        if (data) {
          console.log(res, '不良Top5')
          if (data) {
            if (data.length > 0) {
              var arrxAxis = [] // new Array[]; 数组
              var arrseries = [] // new Array[]; 数组
              for (var i in data) {
                arrxAxis.push(data[i].DEFECT_DESCRIPTION + '(' + data[i].DEFECT_COUNT + ')')
                var obj = {} // 对象
                obj.value = data[i].DEFECT_COUNT
                obj.name = data[i].DEFECT_DESCRIPTION + '(' + data[i].DEFECT_COUNT + ')'
                arrseries.push(obj)
              }
              this.FirstPassRatePie.hideLoading() // 隐藏加载动画
              this.FirstPassRatePie.setOption({ // 加载数据图表
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
      }
    },
    timestampToTime (timestamp) {
      console.log(timestamp, 'timestamptimestamp')
      var tims = new Date(timestamp).getTime()
      var date = new Date(tims)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var D = date.getDate()
      var h = date.getHours()
      return D + this.$t('smt.day') + h + this.$t('smt.time')
    },
    // 站点统计
    async GetHourlyCapacity () {
      const res = await GetSiteStatistics(this.lineId)
      if (res.Result) {
        const data = res.Result
        // const data = [{ PASS: 7, WORK_TIME: '2020-06-20 14:00:00' }]
        console.log(data, '站点统计')
        if (data) {
          // if (data.code === 0) {
          if (data.length > 0) {
            var arr = [] // new Array[]; 数组
            var arr2 = [] // new Array[]; 数组
            var arr3 = [] // new Array[]; 数组
            for (var i in data) {
              var name = {} // 对象
              var pass = {} // 对象
              var fail = {} // 对象
              pass = data[i].PASS
              fail = data[i].FAIL
              name = data[i].OPERATION_SITE_NAME
              arr.push(pass)
              arr2.push(fail)
              arr3.push(name)
            }
            this.RestPcbCountBar.hideLoading() // 隐藏加载动画
            this.RestPcbCountBar.setOption({ // 加载数据图表
              series: [{
                name: '产量',
                type: 'bar',
                data: arr,
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    color: '#FFF'
                  }
                }
              },
              {
                name: '不良数',
                type: 'bar',
                data: arr2,
                label: {
                  normal: {
                    show: true,
                    position: 'top',
                    color: '#FFF'
                  }
                }
              }],
              xAxis: {
                data: arr3
              }
            })
          }
        }
      }
    },
    // 每小时产能
    // async GetHourlyCapacity() {
    //   const res = await GetWoHourPass(this.lineId)
    //   if (res.Result) {
    //     const data = res.Result
    //     // const data = [{ PASS: 7, WORK_TIME: '2020-06-20 14:00:00' }]
    //     console.log(data, '自动化线看板-低水位预警')
    //     var that = this
    //     if (data) {
    //       // if (data.code === 0) {
    //       if (data.length > 0) {
    //         var arr = [] // new Array[]; 数组
    //         for (var i in data) {
    //           var obj = {} // 对象
    //           obj.LOCATION = that.timestampToTime(data[i].WORK_TIME)
    //           obj.REST_PCB_COUNT = data[i].PASS
    //           arr.push(obj)
    //         }
    //         this.RestPcbCountBar.hideLoading() // 隐藏加载动画
    //         this.RestPcbCountBar.setOption({ // 加载数据图表
    //           dataset: {
    //             source: arr
    //           }
    //         })
    //       }
    //     }
    //   }
    // },
    // 每日生产数量
    async Top5Prouduct () {
      const res = await Top5Prouduct(this.lineId)
      if (res.Result) {
        console.log(res, '每日生产数量')
        const data = res.Result
        // const data = [{ "SUM(T.PASS)": 3.0, "WORK_TIME": "2020-07-16 00:00:00" }, { "SUM(T.PASS)": 20.0, "WORK_TIME": "2020-07-18 00:00:00" }, { "SUM(T.PASS)": 14.0, "WORK_TIME": "2020-07-20 00:00:00" }]

        // const data = [{ PASS: 7, WO_NO: 'MO06060085' }, { PASS: 5, WO_NO: 'MO060600908' }, { PASS: 72, WO_NO: 'MO06060054' }]
        if (data) {
          if (data.length === 0) return
          var arr = [] // new Array[]; 数组
          var arr2 = [] // new Array[]; 数组
          for (var i in data) {
            var obj = {} // 对象
            var obj2 = {} // 对象
            obj = data[i]['SUM(T.PASS)']
            obj2 = data[i].WORK_TIME.substring(0, 10)
            console.log('时间：', obj2)
            arr.push(obj)
            arr2.push(obj2)
          }
          this.HourYieldBar.hideLoading() // 隐藏加载动画
          this.HourYieldBar.setOption({ // 加载数据图表
            series: {
              data: arr
            },
            xAxis: {
              data: arr2
            }
          })
        }
      }
    },
    // 今日工单完成
    // async GetWoToDayOrder() {
    //   const res = await GetWoToDayPass(this.lineId)
    //   if (res.Result) {
    //     console.log(res, '获取自动化线最近X小时的每小时产能')
    //     const data = res.Result ? res.Result : {
    //       PASS: 14,
    //       WO_NO: "MO07110022"
    //     }
    //     // const data = [{ PASS: 7, WO_NO: 'MO06060085' }, { PASS: 5, WO_NO: 'MO060600908' }, { PASS: 72, WO_NO: 'MO06060054' }]
    //     if (data) {
    //       if (data.length === 0) return
    //       var arr = [] // new Array[]; 数组
    //       for (var i in data) {
    //         var obj = {} // 对象
    //         obj.LOCATION = data[i].WO_NO
    //         obj.REST_PCB_COUNT = data[i].PASS
    //         arr.push(obj)
    //       }
    //       this.HourYieldBar.hideLoading() // 隐藏加载动画
    //       this.HourYieldBar.setOption({ // 加载数据图表
    //         dataset: {
    //           source: arr
    //         }
    //       })
    //     }
    //   }
    // },
    // 初始化轮播
    InitSwiper () {
      // eslint-disable-next-line
      this.swiper1 = new Swiper('#swiper1', {
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
      /* =====================直通率 仪表盘 init=========================== */
      this.ThroughRate = echarts.init(document.getElementById('ThroughRate'))

      var optionWo = null
      optionWo = {
        title: {
          left: 'center',
          top: 'middle',
          padding: [0, 0, 0, 0],
          textStyle: {
            fontSize: 16
          },
          subtextStyle: {
            // 文字颜色
            color: '#FFF'
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            // fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            // fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
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
          formatter: this.$t('smt._12') + ' : {c}%'
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
        series: [{
          type: 'gauge',
          label: {
            normal: {
              show: true,
              position: 'bottom'
            }
          },
          center: ['50%', '58%'],
          radius: '100%',
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
          data: [{
            value: 0
          }]
        }]
      }
      this.ThroughRate.setOption(optionWo, true)
      /* =====================当前工单完成 仪表盘 init=========================== */
      this.WoYidldPie = echarts.init(document.getElementById('WoYieldPie'))

      // var optionWo = null
      optionWo = {
        title: {
          left: 'center',
          top: 'middle',
          padding: [0, 0, 0, 0],
          textStyle: {
            fontSize: 16
          },
          subtextStyle: {
            // 文字颜色
            color: '#FFF'
            // 字体风格,‘normal‘,‘italic‘,‘oblique‘
            // fontStyle: 'normal',
            // 字体粗细 ‘normal‘,‘bold‘,‘bolder‘,‘lighter‘,100 | 200 | 300 | 400...
            // fontWeight: 'bold',
            // 字体系列
            // fontFamily: 'sans-serif',
            // 字体大小
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
        series: [{
          type: 'gauge',
          label: {
            normal: {
              show: true,
              position: 'bottom'
            }
          },
          center: ['50%', '58%'],
          radius: '100%',
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
          data: [{
            value: 0
          }]
        }]
      }
      this.WoYidldPie.setOption(optionWo, true)

      /* =====================站点统计 柱状图 init============================== */
      this.RestPcbCountBar = echarts.init(
        document.getElementById('RestPcbCountBar')
      )
      var optionRestPcbCount = null
      optionRestPcbCount = {
        title: {
          id: 2,
          text: '站点统计',
          padding: [10, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: 16
          }
        },
        legend: {
          data: ['产量', '不良数'],
          textStyle: {
            color: '#FFF'
          }
        },
        color: ['#4cabce', '#e5323e'],
        grid: {
          top: 50,
          left: 10,
          right: 10,
          bottom: 10,
          containLabel: true
        },
        // dataset: {
        //   // dimensions: ['site', 'PASS', 'FAIL', 'REPASS', 'REFAIL'],
        //   dimensions: ['LOCATION', 'REST_PCB_COUNT'],
        //   source: []
        // },
        xAxis: {
          type: 'category',
          data: [],
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
          type: 'value',
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
        series: []
        // series: [{
        //   data: [120, 200, 150, 80, 70, 110, 130],
        //   type: 'bar',
        //   label: {
        //     normal: {
        //       show: true,
        //       position: 'top'
        //       // color: '#FFF'
        //     }
        //   },
        //   barMaxWidth: 35 // 最大宽度
        // }]
      }
      this.RestPcbCountBar.setOption(optionRestPcbCount, true)

      /* =====================首不良Top5 =========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        title: {
          id: 3,
          text: this.$t('smt._3'),
          padding: [10, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: 16
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
      this.FirstPassRatePie.setOption(optionFirstPassRate, true)

      /* =================== 每日生产数量 柱状图 init============================= */
      this.HourYieldBar = echarts.init(document.getElementById('HourYieldBar'))
      var optionHourYield = null
      optionHourYield = {
        title: {
          id: 2,
          text: '每日生产数量(PCS)',
          padding: [10, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: 16
          }
        },
        // color: ['blue', '#081ae1', '#819280', '#118d07', '#946e9d', '#80059d', '#c768ab', '#c1098a'],
        color: ['orange'],
        grid: {
          top: 50,
          left: 10,
          right: 30,
          bottom: 30,
          containLabel: true
        },
        // dataset: {
        //   // dimensions: ['site', 'PASS', 'FAIL', 'REPASS', 'REFAIL'],
        //   dimensions: ['LOCATION', 'REST_PCB_COUNT'],
        //   source: []
        // },
        xAxis: {
          type: 'category',
          data: [],
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
          type: 'value',
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
        series: [{
          type: 'bar',
          data: [],
          label: {
            normal: {
              show: true,
              position: 'right',
              color: '#FFF'
            }
          },
          barMaxWidth: 35 // 最大宽度
        }]
      }
      this.HourYieldBar.setOption(optionHourYield, true)

      window.onresize = () => {
        this.WoYidldPie.resize()
        this.ThroughRate.resize()
        this.RestPcbCountBar.resize()
        this.FirstPassRatePie.resize()
        this.HourYieldBar.resize()
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
