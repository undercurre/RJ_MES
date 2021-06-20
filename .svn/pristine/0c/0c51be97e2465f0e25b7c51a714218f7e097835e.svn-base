<template>
  <div class="SMT1 SmtLine">
    <div class="container-fluid" :class="{
        huise: dialogVisible
      }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16" :offset="4">
          <div class="kanban-title-panel">{{ $t("MesTongsBoard._1") }}</div>
        </el-col>
        <el-col :span="4" style="display: flex;align-items: center;height: 100%">
          <a
            href="javascript:void(0)"
            class="tit-btn"
            @click="$options.fs.fullScreen.handleFullScreen(this)"
          >{{ $t("smt.fs") }}</a>
        </el-col>
      </el-row>
      <!-- 头部 end -->
      <div class="row" id="contentDiv" style="height:95%;width:100%">
        <div class="col-md-12" style="height:50%;padding:0px;">
          <div class="col-md-4" style="height:100%;padding:5px 5px 5px 0;">
            <div class="kanban-wo-site-panel kanban-panel-bg">
              <div class="kanban-panel-title kanban-content-header">申请信息</div>
              <div class="kanban-content-body">
                <div style="height:20%;font-size:24px;text-align:center">
                  <div style="height:100%;width:50%;float:left">
                    未审核
                    <br />申请数量
                  </div>
                  <div style="height:100%;width:50%;float:left">
                    已审核
                    <br />未入库数量
                  </div>
                </div>
                <div id="QtyPic" style="height:80%"></div>
              </div>
              <span class="top-left border-span-m"></span>
              <span class="top-right border-span-m"></span>
              <span class="bottom-left border-span-m"></span>
              <span class="bottom-right border-span-m"></span>
            </div>
          </div>
          <div class="col-md-8" style="height:100%;padding:5px 0 5px 5px;">
            <div class="kanban-wo-site-panel kanban-panel-bg">
              <div
                class="kanban-panel-title kanban-content-header"
                style="border-bottom: 1px dashed cyan;"
              >申请到期列表</div>
              <div class="kanban-content-body" id="tableNeedDiv">
                <div id="needList" style="width:100%;">
                  <table class="ListTable table table-striped">
                    <thead>
                      <tr>
                        <th style="width:10%;">产品编码</th>
                        <th style="width:16%;">产品名称</th>
                        <th style="width:17%;">产品规格</th>
                        <th style="width:10%;">版本号</th>
                        <th style="width:7%;">夹具类别</th>
                        <th style="width:7%;">申请数量</th>
                        <th style="width:7%;">未入库数量</th>
                        <th style="width:6%;">状态</th>
                        <th style="width:10%;">需求日期</th>
                        <th style="width:10%;">到期剩余天数</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div id="materTableDiv" class="materTableDiv" style="overflow-y:auto;height:90%;">
                  <table
                    id="needTableList"
                    v-html="text"
                    class="ListTable table table-striped"
                    style="color:white;border-top:0"
                  ></table>
                </div>
              </div>
              <span class="top-left border-span-m"></span>
              <span class="top-right border-span-m"></span>
              <span class="bottom-left border-span-m"></span>
              <span class="bottom-right border-span-m"></span>
            </div>
          </div>
        </div>
        <div class="col-md-12" style="height:46%;padding:0px;">
          <div class="col-md-4" style="height:100%;padding:5px 5px 5px 0;">
            <div class="kanban-wo-site-panel kanban-panel-bg">
              <div class="kanban-panel-title kanban-content-header">夹具状态分布</div>
              <div class="kanban-content-body">
                <div id="StatusQtyDis" style="height: 100%;"></div>
              </div>
              <span class="top-left border-span-m"></span>
              <span class="top-right border-span-m"></span>
              <span class="bottom-left border-span-m"></span>
              <span class="bottom-right border-span-m"></span>
            </div>
          </div>
          <div class="col-md-8" style="height:100%;padding:5px 0 5px 5px;">
            <div class="kanban-wo-site-panel kanban-panel-bg">
              <div
                class="kanban-panel-title kanban-content-header"
                style="border-bottom: 1px dashed cyan;"
              >近15日借出列表</div>
              <div class="kanban-content-body" id="tableBorrowDiv">
                <div id="borrowList" style="width:100%;">
                  <table class="ListTable table table-striped">
                    <thead>
                      <tr>
                        <th style="width:14%;">夹具编号</th>
                        <th style="width:8%;">夹具类别</th>
                        <th style="width:8%;">借出时间</th>
                        <th style="width:10%;">借出人</th>
                        <th style="width:10%;">备注</th>
                        <th style="width:10%;">产品编码</th>
                        <th style="width:13%;">产品名称</th>
                        <th style="width:17%;">产品规格</th>
                        <th style="width:10%;">版本号</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div
                  id="materTableDiv2"
                  class="materTableDiv"
                  style="overflow-y:auto;height:100px;"
                >
                  <table
                    v-html="text2"
                    id="borrowTableList"
                    class="ListTable table table-striped"
                    style="color:white;border-top:0"
                  ></table>
                </div>
              </div>
              <span class="top-left border-span-m"></span>
              <span class="top-right border-span-m"></span>
              <span class="bottom-left border-span-m"></span>
              <span class="bottom-right border-span-m"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GetApplyQty,
  GetApplyList,
  GetTongsStatusDis,
  GetTongsBorrowList
} from '@/api/MesTongsBoard'
import echarts from 'echarts'
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
export default {
  fs,
  name: 'MesTongsBoard',
  data () {
    return {
      timer: null,
      dialogVisible: false,
      ApplicationInformation: null,
      FixtureStatus: null,
      optionQtyPic: {},
      text: undefined,
      text2: undefined
    }
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
    this.$nextTick(() => {
      this.getApplicationInformation()
      this.getFixtureStatus()
      this.loadingData()
    })
    this.loopData()
  },
  methods: {
    // 轮询数据
    loopData () {
      this.timer = setInterval(() => {
        this.loadingData()
      }, 5000)
    },
    async loadingData () {
      await Promise.all([
        this.getApplyList(),
        this.getTongsStatusDis(),
        this.getApplyQty(),
        this.getTongsBorrowList()
      ]).catch(() => {})
    },
    // 获取夹具借出信息列表
    async getTongsBorrowList () {
      const res = await GetTongsBorrowList()
      const data = JSON.parse(res.Result)
      //   console.log('获取夹具借出信息列表:', data)
      let html = ''
      let tabHtml1 =
        '<table class="ListTable table table-striped" style="color:white;text-align:center;"><tbody>'
      let tabHtml2 = '</tbody></table>'
      let trHtml = ''
      let thisId = 0
      let thisBackIndex = 1
      data.map((v, i) => {
        var row = this.getRowCount(v.ID, data)
        var rowspanHtml = ''
        if (row > 1) {
          rowspanHtml = ' rowSpan="' + row + '"'
        }
        if (thisId !== v.ID) {
          thisId = v.ID
          thisBackIndex = thisBackIndex === 0 ? 1 : 0
        }
        if (thisBackIndex === 0) {
          trHtml += '<tr style="background-color:#2b2b5b">'
        } else {
          trHtml += '<tr style="background-color:#040F3C">'
        }
        if (i === 0 || v.ID !== data[i - 1].ID) {
          trHtml +=
            '<td style="width:14%;" ' +
            rowspanHtml +
            '>' +
            this.IsNull(v.CODE) +
            '</td>' +
            '<td style="width:8%;"' +
            rowspanHtml +
            '>' +
            this.getTongsTypeName(this.IsNull(v.TONGS_TYPE)) +
            '</td>' +
            '<td style="width:8%;"' +
            rowspanHtml +
            '>' +
            this.IsNull(v.UPDATE_DATE).split(' ')[0] +
            '</td>' +
            '<td style="width:10%;"' +
            rowspanHtml +
            '>' +
            this.IsNull(v.USER_NAME) +
            '</td>' +
            '<td style="width:10%;"' +
            rowspanHtml +
            '>' +
            this.IsNull(v.REMARK) +
            '</td>'
        }
        trHtml +=
          '<td style="width:10%;">' +
          this.IsNull(v.PART_NO) +
          '</td>' +
          '<td style="width:13%;">' +
          this.IsNull(v.PART_NAME) +
          '</td>' +
          '<td style="width:17%;">' +
          this.IsNull(v.PART_DESC) +
          '</td>' +
          '<td style="width:10%;">' +
          this.IsNull(v.VERSION) +
          '</td>'
        trHtml += '</tr>'
      })
      html += tabHtml1 + trHtml + tabHtml2
      this.text2 = html
      console.log('this.text2:', this.text2)
    },
    // 获取申请信息列表
    async getApplyList () {
      const res = await GetApplyList()
      const data = JSON.parse(res.Result)
      //   console.log('获取申请信息列表:', data)
      let html = ''
      let tabHtml1 =
        '<table class="ListTable table table-striped" style="color:white;text-align:center;"><tbody>'
      let tabHtml2 = '</tbody></table>'
      let trHtml = ''
      let thisId = 0
      let thisBackIndex = 1
      data.map((v, i) => {
        var row = this.getRowCount(v.ID, data)
        var rowspanHtml = ''
        if (row > 1) rowspanHtml = ' rowSpan="' + row + '"'

        var color = this.getBackColorByDiffDay(v.DIFF_DAY)
        v.DATE_DESC = this.getDateDescByDiffDay(v.DIFF_DAY)

        if (thisId !== v.ID) {
          thisId = v.ID
          thisBackIndex = thisBackIndex === 0 ? 1 : 0
        }
        if (thisBackIndex === 0) {
          trHtml += '<tr style="color:' + color + ';background-color:#2b2b5b">'
        } else {
          trHtml += '<tr style="color:' + color + ';background-color:#040F3C">'
        }
        trHtml +=
          '<td style="width:10%;">' +
          this.IsNull(v.PART_NO) +
          '</td>' +
          '<td style="width:16%;">' +
          this.IsNull(v.PART_NAME) +
          '</td>' +
          '<td style="width:17%;">' +
          this.IsNull(v.PART_DESC) +
          '</td>' +
          '<td style="width:10%;">' +
          this.IsNull(v.VERSION) +
          '</td>'

        if (i === 0 || v.ID !== data[i - 1].ID) {
          trHtml +=
            '<td style="width:7%;"' +
            rowspanHtml +
            '>' +
            this.getTongsTypeName(this.IsNull(v.TONGS_TYPE)) +
            '</td>' +
            '<td style="width:7%;" ' +
            rowspanHtml +
            '>' +
            this.IsNull(v.QTY) +
            '</td>' +
            '<td style="width:7%;" ' +
            rowspanHtml +
            '>' +
            this.IsNull(v.SURPLUS_QTY) +
            '</td>' +
            '<td style="width:6%;"' +
            rowspanHtml +
            '>' +
            (v.STATUS === 0 ? '未审核' : '已审核') +
            '</td>' +
            '<td style="width:10%;"' +
            rowspanHtml +
            '>' +
            this.IsNull(v.NEED_DATE.split(' ')[0]) +
            '</td>' +
            '<td style="width:10%;"' +
            rowspanHtml +
            '>' +
            this.IsNull(v.DATE_DESC) +
            '</td>'
        }
        trHtml += '</tr>'
      })
      html += tabHtml1 + trHtml + tabHtml2
      this.text = html
    },
    // 获取申请数量信息
    async getApplyQty () {
      const res = await GetApplyQty()
      const data = JSON.parse(res.result)
      this.optionQtyPic.series[0].data[0].name = data.NOT_STORE_QTY
      this.optionQtyPic.series[0].data[1].name = data.NOT_AUDIT_QTY
      this.ApplicationInformation.hideLoading() // 隐藏加载动画
      this.ApplicationInformation.setOption(this.optionQtyPic, true)
      this.ApplicationInformation.resize()
    },
    // 获取夹具状态分布信息
    async getTongsStatusDis () {
      const res = await GetTongsStatusDis()
      const data = JSON.parse(res.Result)
      console.log('获取夹具状态分布信息:', data)
      var arrxAxis = [] // new Array[]; 数组
      var arrseries = [] // new Array[]; 数组
      var colors = []
      for (var i in data) {
        arrxAxis.push(data[i].STATUS_NAME + '(' + data[i].QTY + ')')
        colors.push(data[i].COLOR)
        var obj = {} // 对象
        obj.value = data[i].QTY
        obj.name = data[i].STATUS_NAME + '(' + data[i].QTY + ')'
        arrseries.push(obj)
      }
      this.FixtureStatus.hideLoading() // 隐藏加载动画
      this.FixtureStatus.setOption({
        // 加载数据图表
        color: colors,
        legend: {
          data: arrxAxis
        },
        series: [
          {
            // 根据名字对应到相应的系列
            data: arrseries
          }
        ]
      })
      this.FixtureStatus.resize()
    },
    // 获取需要跨行的行数
    getRowCount (id, data) {
      let row = 0
      data.map(item => {
        if (item.ID === id) {
          row += 1
        }
      })
      return row
    },
    // 判断字符串是否为null
    IsNull (str) {
      if (str === null || str === undefined) return ''
      return str
    },
    // 获取夹具类别名称
    getTongsTypeName (type) {
      switch (type) {
        case 0:
          return '工装'
        case 1:
          return 'ICT针床'
        case 2:
          return 'FCT针床'
        default:
          return '未知类别'
      }
    },
    // 获取背景颜色
    getBackColorByDiffDay (diffday) {
      if (diffday < 3) {
        return '#fa5353'
      } else if (diffday < 7) {
        return '#faec53'
      } else if (diffday < 15) {
        return '#53fa56'
      } else return '#FFFFFF'
    },
    // 获取到期时间描述
    getDateDescByDiffDay (diffday) {
      if (diffday < 0) return '已到期'
      else if (diffday === 0) return '今日'
      else return diffday + '天'
    },
    /* ===================申请信息 气泡 init============================ */
    getApplicationInformation () {
      let data = [
        {
          name: '已审核\n未入库数量',
          value: '34'
        },
        {
          name: '未审核\n申请数量',
          value: '23'
        }
      ]
      // 偏移量
      let offsetData = [
        [80.5, 55],
        [18.3, 55]
      ]
      // symbolSize 散点气泡大小
      var symbolSizeData = [200, 200]
      var colorData = ['orange', 'red']
      // 循环定义series的data值
      var datas = []
      for (var i = 0; i < data.length; i++) {
        var item = data[i]
        datas.push({
          name: item.name + '\n' + item.value, // + "元\n" + yieldRateData[i] + "%",
          value: offsetData[i],
          symbolSize: symbolSizeData[i],
          label: {
            normal: {
              textStyle: {
                fontSize: 50,
                color: 'blue'
              }
            }
          },
          itemStyle: {
            normal: {
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                {
                  offset: 0,
                  color: '#fff' // "rgba(31,102,162,0.3)"
                },
                {
                  offset: 1,
                  color: colorData[i]
                }
              ]),
              opacity: 1,
              shadowColor: '#2e78eca8',
              shadowBlur: 10,
              shadowOffsetX: 1,
              shadowOffsetY: 1
            }
          }
        })
      }
      this.ApplicationInformation = echarts.init(
        document.getElementById('QtyPic')
      )
      var optionApplicationInformation = null
      optionApplicationInformation = {
        grid: {
          show: false,
          top: 10,
          bottom: 10
        },
        xAxis: [
          {
            gridIndex: 0,
            type: 'value',
            show: false,
            min: 0,
            max: 100,
            nameLocation: 'middle',
            nameGap: 6
          }
        ],
        yAxis: [
          {
            gridIndex: 0,
            min: 0,
            show: false,
            max: 100,
            nameLocation: 'middle',
            nameGap: 30
          }
        ],
        series: [
          {
            type: 'scatter',
            symbol: 'circle',
            symbolSize: 120,
            label: {
              normal: {
                show: true,
                formatter: '{b}',
                color: '#fff',
                textStyle: {
                  fontSize: '20'
                }
              }
            },
            itemStyle: {
              normal: {
                color: '#00acea'
              }
            },
            data: datas
          }
        ]
      }
      this.optionQtyPic = optionApplicationInformation
      this.ApplicationInformation.setOption(optionApplicationInformation, true)
      window.onresize = () => {
        this.ApplicationInformation.resize()
        this.FixtureStatus.resize()
      }
    },
    /* ===================夹具状态数量分布 饼图 init============================ */
    getFixtureStatus () {
      this.FixtureStatus = echarts.init(
        document.getElementById('StatusQtyDis')
      )
      var optionStatusQtyDis = null
      optionStatusQtyDis = {
        // color: ['gray', 'green', 'purple', 'blue', 'orange', 'red', '#a15151'],
        color: ['#5bc2e7', '#6980c5', '#70dfdf', '#f7f1ee', '#3390FF'],
        tooltip: {
          trigger: 'item',
          formatter: '{b} :占比{d}%'
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          textStyle: {
            color: '#ffffff' // 字体颜色
          },
          data: []
        },
        series: [
          {
            name: '不良现象',
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            data: [],
            label: {
              normal: {
                textStyle: {
                  fontSize: 16 // 字体大小
                },
                formatter (data) {
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
      this.FixtureStatus.setOption(optionStatusQtyDis, true)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/assets/style/bootstrap.min.css";
.SmtLine {
  height: 100vh;
  overflow: hidden;
  box-sizing: border-box;
}
.huise:not(#liang) {
  filter: grayscale(100%);
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
  filter: url("data:image/svg+xml;utf8,#grayscale");
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
</style>
<style lang="scss" >
html {
  width: 100%;
  height: 100%;
}

body {
  width: 100%;
  height: 100%;
  color: white;
  font-family: "Microsoft YaHei";
  background-color: #040f3c;
  background-size: 100% 100%;
}

.container-fluid {
  width: 100%;
  height: 100%;
  padding: 0 10px;
}

.kanban-panel-bg {
  position: relative;
  border: 1px solid #54dcf2;
}

.kanban-panel-bg span.border-span,
.kanban-wo-info-panel span.border-span {
  display: block;
  position: absolute;
  width: 35px;
  height: 35px;
}

.kanban-panel-bg span.border-span-m,
.kanban-wo-info-panel span.border-span-m {
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
}

.kanban-panel-bg span.top-left,
.kanban-wo-info-panel span.top-left {
  top: -4px;
  left: -4px;
  border-top: 3px solid #54dcf2;
  border-left: 3px solid #54dcf2;
}

.kanban-panel-bg span.top-right,
.kanban-wo-info-panel span.top-right {
  top: -4px;
  right: -4px;
  border-top: 3px solid #54dcf2;
  border-right: 3px solid #54dcf2;
}

.kanban-panel-bg span.bottom-left,
.kanban-wo-info-panel span.bottom-left {
  bottom: -4px;
  left: -4px;
  border-bottom: 3px solid #54dcf2;
  border-left: 3px solid #54dcf2;
}

.kanban-panel-bg span.bottom-right,
.kanban-wo-info-panel span.bottom-right {
  bottom: -4px;
  right: -4px;
  border-bottom: 3px solid #54dcf2;
  border-right: 3px solid #54dcf2;
}

.kanban-title {
  text-align: center;
  font-size: 25px;
  height: 70px;
  line-height: 70px;
  background: url("../../assets/images/header_bg.png") center center no-repeat;
  background-size: cover;
}

.screen-span {
  height: 50px;
  width: 80px;
}

.kanban-title-panel {
  height: 100%;
  color: #00ffff;
}

.kanban-wo-info {
  text-align: center;
  font-size: 16px;
  height: 185px;
  padding: 10px 15px 20px 15px;
}

.kanban-wo-info-panel {
  position: relative;
  border: 1px solid #54dcf2;
  width: 100%;
  height: 100%;
  line-height: 40px;
}

.kanban-wo-site-panel {
  height: 100%;
}

.kanban-panel-title {
  line-height: 50px;
  font-size: 18px;
  font-weight: bold;
  color: white;
  padding-left: 10px;
  display: block;
  height: 50px;
  text-align: left;
}

.kanban-top-defect-panel {
  height: 100%;
}

.swiper-pagination-bullet {
  background: #00ffff;
}

.swiper-container-horizontal > .swiper-pagination-bullets,
.swiper-pagination-custom,
.swiper-pagination-fraction {
  bottom: 0px;
}

.ListTable {
  width: 100%;
  padding: 0px;
  margin: 0px;
  text-align: center;
  table-layout: fixed;
}

.ListTable.table > thead:first-child > tr:first-child > th {
  text-align: center;
  font-weight: bold;
}

.ListTable.table > thead > tr > th {
  vertical-align: bottom;
  border-bottom: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ListTable.table > tbody > tr > td {
  border-top: none;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  border: 1px solid #21659d;
}

.ListTable.table-striped > tbody > tr:nth-of-type(odd) {
  background-color: transparent;
}

/*滚动条整体样式*/
.materTableDiv::-webkit-scrollbar {
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

.materTableDiv::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #2b2b5b;
}

.kanban-content-header {
  height: 38px;
  line-height: 38px;
}

.kanban-content-body {
  position: absolute;
  width: 100%;
  top: 38px;
  left: 0;
  bottom: 0;
}
.tit-btn {
  color: #00ffff;
  font-size: 15px;
  text-decoration: none;
  font-weight: bold;
  display: block;
  margin-bottom: 10px;
  line-height: 1.5;
}
</style>
