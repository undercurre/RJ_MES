<template>
  <div class="SMT1 SMTworkshop">
    <div class="container-fluid">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">{{ $t("SMT车间看板") }}</div>
        </el-col>
        <el-col :span="4"
                style="display: flex;align-items: center;height: 100%">
          <a href="javascript:void(0)"
             class="tit-btn"
             @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</a>
        </el-col>
      </el-row>
      <!-- 主体 start -->
      <div style="height: calc((100vh - 50px) - 40px);margin-top: 20px;">
        <el-row>
          <el-col :span="7">
            <!-- SMT周计划 -->
            <div class="block-center">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div id="swiper2"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div id="mapswp-swiper1"
                       class="swiper-wrapper">
                    <!-- <div class="swiper-slide">
                      <div id="HourYieldBar" />
                    </div> -->
                    <!-- + index  -->
                    <!-- v-for="(inst,index) in TaskDate" :key="index" -->
                    <div class="swiper-slide"
                         v-for="(inst,index) in tabledata"
                         :key="index">
                      <div class="kanban-panel-title">
                        <span style="float:left">
                          <!-- {{ $t("SMT周计划") }} -->
                          {{inst.LINE_NAME}}周计划
                        </span>
                      </div>
                      <div style="overflow-y: auto;height: calc(100% - 50px)">
                        <!-- <table id="SpotCheckTable"
                               class="ListTable table table-striped"
                               style="color:white;height: 100%;"
                               v-html="SpotCheckTable" /> -->
                        <table id="SpotCheckTable"
                               class="ListTable table table-striped SpotCheckTable-tablehaed"
                               style="color:white;"
                               cellspacing="0"
                               border="0"
                               cellpadding="0">
                          <thead>
                            <tr>
                              <th style='width:15%'>星期</th>
                              <th style='width:35%'>工单</th>
                              <th style='width:25%'>完成数/排产数</th>
                              <th style='width:25%'>状态</th>
                            </tr>
                          </thead>
                        </table>
                        <table id="SpotCheckTabletbody"
                               class="ListTable table table-striped"
                               cellspacing="0"
                               border="0"
                               cellpadding="0">
                          <tbody>
                            <tr id="SpotCheckTabletTr"
                                v-for="(item,index) in inst.LINE_WEEK_DATA"
                                :key="index">
                              <td style='width:15%;white-space: inherit;'>{{item.WEEK}}</td>
                              <td style='width:35%;white-space: inherit;'><span style="display: block;" v-for="(ins,index) in item.WEEK_WO_DATA"
                                      :key="index">{{ins.WO_NO}}</span></td>
                              <td style='width:25%;white-space: inherit;'><span style="display: block;" v-for="(ins,index) in item.WEEK_WO_DATA"
                                      :key="index">{{ins.O_QTY}}/{{ins.PLAN_QUANTITY}}</span></td>
                              <td style='width:25%;white-space: inherit;'>
                                <span v-for="(ins,index) in item.WEEK_WO_DATA"
                                      :key="index">
                                      <span style="display: block;" v-if="ins.O_QTY <= ins.PLAN_QUANTITY">未完成</span>
                                      <span style="display: block;" v-else>已完成</span>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div id="swiper_p2"
                       class="swiper-pagination" />
                </div>
                <!-- <div class="kanban-panel-title">
                  <span style="float:left"
                        class="title-left">
                    {{ $t("SMT周计划") }}
                  </span>
                </div>
                <div style="overflow-y: auto;height: calc(100% - 50px)">
                  <table id="SpotCheckTable"
                         class="ListTable table table-striped"
                         style="color:white;height: 100%;"
                         v-html="SpotCheckTable" />
                </div> -->
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 线体直通率对比 -->
            <div class="block-center">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("线体直通率对比") }}
                </div>
                <div id="FirstPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="10"
                  style="padding: 0 15px;box-sizing: border-box">
            <div class="block-center">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="padding-top: 10px;box-sizing: border-box">
                <div id="RestPcbCountBar"
                     style="height:100%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block-center">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="padding-top: 10px;box-sizing: border-box">
                <div id="swiper1"
                     class="swiper-container"
                     style="height:100%;padding:0px;">
                  <div id="mapswp-swiper1"
                       class="swiper-wrapper">
                    <!-- <div class="swiper-slide">
                      <div id="HourYieldBar" />
                    </div> -->
                    <!-- + index  -->
                    <div class="swiper-slide"
                         v-for="(inst,index) in TaskDate"
                         :key="index">
                      <div class="roseChart"
                           id="ExLineDateBar"
                           style="padding: 0px" />
                    </div>
                  </div>
                  <div id="swiper_p1"
                       class="swiper-pagination" />
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="7">
            <!-- 异常时间对比 -->
            <div class="block-center">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="AoiTitle"
                     class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("异常时间对比") }}
                </div>
                <div id="AoiPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block-center">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="SPITitle"
                     class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("线体效率对比") }}
                </div>
                <div id="SpiPassRatePie"
                     style="height: 85%;padding-top:-50px" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import './SmtLine/index.css';
.SMTworkshop {
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
  filter: url('data:image/svg+xml;utf8,#grayscale');
  filter: progid:DXImageTransform.Microsoft.BasicImage(grayscale=1);
  -webkit-filter: grayscale(1);
}
.block-center {
  height: calc((100vh - 70px - 20px) / 2 - 14px);
}
</style>
<style lang="scss">
.ListTable.table > tbody > tr > td {
  font-size: 14px !important;
  height: 24px !important;
}

.SpotCheckTable-tablehaed > thead > tr > td {
  font-size: 16px !important;
}

.SpotCheckTable-tablehaed {
  color: white;
  padding: 5px;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: #040f3c;
  z-index: 99;
}
</style>
<script>
import {
  GetSmtKanbanAoiPassRateData,
  // smt
  GetProducePlanInfoWeek,
  GetSmtKanbanAoiPassRateByAllLines,
  GetPlanAchievementRate,
  GetTaskTrackBySMTLine,
  GetEfficiencyBySMTLine
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
export default {
  fs,
  name: 'SmtLine',
  data () {
    return {
      SpotCheckTable: '',
      timer: null,
      TaskDate: [],
      tabledata: []
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
    this.$nextTick(() => {
      this.InitSwiper()
      this.getWoYidldPie()
      this.GetProducePlanInfoWeek()
      this.GetSmtKanbanFirstPassRate()
      // this.GetSmtKanbanAoiPassRate()
      this.GetSmtKanbanRestPcb()
      this.GetSmtKanbanSpiPassRate()
      this.GetSmtChangeLineRecord()
    })

    this.loopData()
  },
  mounted () {

  },
  methods: {
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
    GetStatusName (status) {
      switch (status) {
        case 1:
          return this.$t('已完成')
        case 2:
          return this.$t('未完成')
        case 3:
          return this.$t('进行中')
        case 4:
          return this.$t('未开始')
        default:
          return ''
      }
    },
    loadingData () {
      // this.GetProducePlanInfoWeek()
      // this.GetSmtKanbanAoiPassRate()
      // this.GetSmtKanbanFirstPassRate()
      // this.GetSmtKanbanRestPcb()
      // this.GetSmtKanbanSpiPassRate()
      // this.GetSmtChangeLineRecord()
      this.GetProducePlanInfoWeek()
      this.GetSmtKanbanFirstPassRate()
      // this.GetSmtKanbanAoiPassRate()
      this.GetSmtKanbanRestPcb()
      this.GetSmtKanbanSpiPassRate()
      this.GetSmtChangeLineRecord()
    },
    // 轮询数据
    loopData () {
      this.timer = setInterval(() => {
        this.loadingData(false)
      }, 5000)
    },
    /*  SMT周计划 */
    async GetProducePlanInfoWeek () {
      const res = await GetProducePlanInfoWeek({ user_id: this.userId })
      this.tabledata = res.Result || []
      console.log(res.Result, 'SMT周计划')
      // if (res.Result) {
      //   const data = res.Result || []
      //   // var str = ''
      //   var week1 = ''
      //   var week2 = ''
      //   var week3 = ''
      //   var week4 = ''
      //   var week = new Date().getDay()
      //   if (week === 0) {
      //     // str = '星期日'
      //     week1 = '周日'
      //     week2 = '周一'
      //     week3 = '周二'
      //     week4 = '周三'
      //   } else if (week === 1) {
      //     // str = '周一'
      //     week1 = '周一'
      //     week2 = '周二'
      //     week3 = '周三'
      //     week4 = '周四'
      //   } else if (week === 2) {
      //     // str = '周二'
      //     week1 = '周二'
      //     week2 = '周三'
      //     week3 = '周四'
      //     week4 = '周五'
      //   } else if (week === 3) {
      //     // str = '星期三'
      //     week1 = '周三'
      //     week2 = '周四'
      //     week3 = '周五'
      //     week4 = '周六'
      //   } else if (week === 4) {
      //     // str = '星期四'
      //     week1 = '周四'
      //     week2 = '周五'
      //     week3 = '周六'
      //     week4 = '周日'
      //   } else if (week === 5) {
      //     // str = '星期五'
      //     week1 = '周五'
      //     week2 = '周六'
      //     week3 = '周日'
      //     week4 = '周一'
      //   } else if (week === 6) {
      //     // str = '星期六'
      //     week1 = '周六'
      //     week2 = '周日'
      //     week3 = '周一'
      //     week4 = '周二'
      //   }

      //   var html =
      //     "<thead><tr><th style='width:20%'>" +
      //     this.$t('线体') +
      //     "</th><th style='width:20%'>" +
      //     week1 +
      //     "</th><th style='width:20%'>" +
      //     week2 +
      //     "</th><th style='width:20%'>" +
      //     week3 +
      //     "</th><th style='width:20%'>" +
      //     week4 +
      //     '</th></tr></thead>'
      //   html += '<tbody>'
      //   var list = []
      //   if (data) {
      //     if (data) {
      //       list = data
      //       list.forEach((i, v) => {
      //         html +=
      //           '<tr><td>' +
      //           i.LINE_NAME +
      //           '</td><td>' +
      //           i.Monday +
      //           '</td><td>' +
      //           i.Tuesday +
      //           '</td><td>' +
      //           i.Wednesday +
      //           '</td><td>' +
      //           i.Thursday +
      //           '</td></tr>'
      //         // var week4 = new Date().getDay()
      //         // if (week4 === 0) {
      //         //   // str = '星期日'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Sunday +
      //         //   '</td><td>' +
      //         //   i.Monday +
      //         //   '</td><td>' +
      //         //   i.Tuesday +
      //         //   '</td><td>' +
      //         //   i.Wednesday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 1) {
      //         //   // str = '星期一'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Monday +
      //         //   '</td><td>' +
      //         //   i.Tuesday +
      //         //   '</td><td>' +
      //         //   i.Wednesday +
      //         //   '</td><td>' +
      //         //   i.Thursday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 2) {
      //         //   // str = '星期二'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Tuesday +
      //         //   '</td><td>' +
      //         //   i.Wednesday +
      //         //   '</td><td>' +
      //         //   i.Thursday +
      //         //   '</td><td>' +
      //         //   i.Friday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 3) {
      //         //   // str = '星期三'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Wednesday +
      //         //   '</td><td>' +
      //         //   i.Thursday +
      //         //   '</td><td>' +
      //         //   i.Friday +
      //         //   '</td><td>' +
      //         //   i.Saturday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 4) {
      //         //   // str = '星期四'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Thursday +
      //         //   '</td><td>' +
      //         //   i.Friday +
      //         //   '</td><td>' +
      //         //   i.Saturday +
      //         //   '</td><td>' +
      //         //   i.Sunday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 5) {
      //         //   // str = '星期五'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Friday +
      //         //   '</td><td>' +
      //         //   i.Saturday +
      //         //   '</td><td>' +
      //         //   i.Sunday +
      //         //   '</td><td>' +
      //         //   i.Monday +
      //         //   '</td></tr>'
      //         // } else if (week4 === 6) {
      //         //   // str = '星期六'
      //         //   html +=
      //         //   '<tr><td>' +
      //         //   i.LINE_NAME +
      //         //   '</td><td>' +
      //         //   i.Sunday +
      //         //   '</td><td>' +
      //         //   i.Tuesday +
      //         //   '</td><td>' +
      //         //   i.Monday +
      //         //   '</td><td>' +
      //         //   i.Tuesday +
      //         //   '</td></tr>'
      //         // }
      //       })
      //     }
      //   }
      //   for (var i = 4; i > list.length; i--) {
      //     html += '<tr><td>&nbsp;</td><td></td><td></td></tr>'
      //   }
      //   html += '</tbody>'

      //   if (list.length !== 0) {
      //     this.SpotCheckTable = html
      //   } else {
      //     this.SpotCheckTable = ''
      //   }
      // }
    },
    /* 异常时间对比 */
    async GetSmtKanbanAoiPassRate () {
      const res = await GetSmtKanbanAoiPassRateData(this.lineId)
      if (res.Result) {
        console.log(res, '自动化线看板的AOI的直通率')
        // const data = JSON.parse(res.Result)
        var data = [
          {
            name: '包装1线',
            value: 230
          },
          {
            name: '包装2线',
            value: 450
          },
          {
            name: '包装3线',
            value: 30
          },
          {
            name: '包装4线',
            value: 20
          },
          {
            name: '包装5线',
            value: 100
          }
        ]
        var NameArr = []
        var ValArr = []
        data.map(v => {
          NameArr.push(v.name)
          ValArr.push(v.value)
        })
        if (data) {
          if (data.length > 0) {
            this.AoiPassRatePie.hideLoading() // 隐藏加载动画
            this.AoiPassRatePie.setOption({
              xAxis: {
                data: NameArr
              },
              series: [
                {
                  data: ValArr
                }
              ]
            })
          }
        }
      }
    },
    /* 线体直通率对比 */
    async GetSmtKanbanFirstPassRate () {
      const res = await GetSmtKanbanAoiPassRateByAllLines({ user_id: this.userId })
      if (res.Result) {
        console.log(res, '自动化线看板的首件的直通率')
        const dataval = res.Result || []
        var NameArr = []
        var ValArr = []
        var diArr = []
        dataval.map(v => {
          NameArr.push(v.OPERATION_LINE_NAME || '')
          ValArr.push(v.RATE || '')
          diArr.push(0)
        })
        // if (dataval) {
        //   if (dataval.length > 0) {
        this.FirstPassRatePie.hideLoading() // 隐藏加载动画
        this.FirstPassRatePie.setOption({
          // 加载数据图表
          xAxis: [{
            data: NameArr
          }],
          series: [
            {
              data: ValArr
            },
            {
              data: ValArr
            },
            {
              data: ValArr
            },
            {
              data: diArr
            }
          ]
        })
        //   }
        // }
      }
    },
    /* 计划达成率 */
    async GetSmtKanbanRestPcb () {
      const res = await GetPlanAchievementRate({ user_id: this.userId })
      if (res.Result) {
        const dataval = res.Result || []
        // let data = res.Result || []
        var NameArr = []
        var totalArr = []
        var valArr = []
        dataval.map(v => {
          valArr.push(v.O_QTY)
          NameArr.push(v.LINE_NAME)
          totalArr.push(v.PLAN_QUANTITY)
        })
        // if (dataval) {
        // if (dataval.length > 0) {
        this.RestPcbCountBar.hideLoading() // 隐藏加载动画
        this.RestPcbCountBar.setOption({
          // 加载数据图表
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'none'
            },
            formatter: function (params) { }
          },
          yAxis: [{
            type: 'category',
            inverse: true,
            axisLabel: {
              show: true,
              textStyle: {
                color: '#fff'
              }
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            data: NameArr
          }, {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: true,
            axisLabel: {
              textStyle: {
                color: '#ffffff',
                fontSize: '12'
              },
              formatter: function (params, i) {
                if (Number(dataval[i].O_QTY) === 0 || Number(dataval[i].PLAN_QUANTITY) === 0) {
                  return '0%' + ' ' + dataval[i].O_QTY + '/' + dataval[i].PLAN_QUANTITY
                } else {
                  return parseInt(dataval[i].O_QTY / dataval[i].PLAN_QUANTITY * 100) + '%' + ' ' + dataval[i].O_QTY + '/' + dataval[i].PLAN_QUANTITY
                }
              }
            },
            data: dataval
          }],
          series: [{
            data: valArr
          },
          {
            data: totalArr
          }
          ]
        })
        // }
        // }
      }
    },
    // 线体效率对比
    async GetSmtKanbanSpiPassRate () {
      const res = await GetEfficiencyBySMTLine({ user_id: this.userId })
      if (res.Result) {
        // console.log(res, '自动化线看板的SPI的直通率')
        const dataval = res.Result || []
        var NameArr = []
        var ValArr = []
        var diArr = []
        dataval.map(v => {
          NameArr.push(v.LINE_NAME)
          ValArr.push(v.EFFICIENCY)
          diArr.push(0)
        })
        if (dataval) {
          if (dataval.length > 0) {
            this.SpiPassRatePie.hideLoading() // 隐藏加载动画
            this.SpiPassRatePie.setOption({
              xAxis: [{
                data: NameArr
              }],
              series: [
                {
                  data: ValArr
                },
                {
                  data: ValArr
                },
                {
                  data: ValArr
                },
                {
                  data: diArr
                }
              ]
            })
          }
        }
      }
    },
    // 获取SMT跟踪表数据
    async GetSmtChangeLineRecord () {
      const res = await GetTaskTrackBySMTLine({ user_id: this.userId })
      if (res.Result) {
        const data = res.Result || []
        // const data = [{ 'LINE_NAME': 'SMT1号线', 'TASK_WO': [{ 'WO_NO': 'ZTE2012101350-1', 'O_QTY': 9360.0, 'DATE_BEGIN': '9', 'DATE_END': '16' }] }, { 'LINE_NAME': 'SMT2号线', 'TASK_WO': [] }, { 'LINE_NAME': 'SMT3号线', 'TASK_WO': [] }, { 'LINE_NAME': 'SMT4号线', 'TASK_WO': [] }, { 'LINE_NAME': 'SMT5号线', 'TASK_WO': [{ 'WO_NO': 'CW2101150053-1', 'O_QTY': 5445.0, 'DATE_BEGIN': '9', 'DATE_END': '15' }] }, { 'LINE_NAME': 'SMT6号线', 'TASK_WO': [{ 'WO_NO': 'CW2101150050A-1', 'O_QTY': 8100.0, 'DATE_BEGIN': '8', 'DATE_END': '16' }] }, { 'LINE_NAME': 'SMT7号线', 'TASK_WO': [] }, { 'LINE_NAME': '测试专用线', 'TASK_WO': [] }]
        this.TaskDate = data
        var ydata = []
        var start = []
        var end = []
        var that = this
        var roseCharts = document.getElementsByClassName('roseChart')
        that.$nextTick(function () {
          for (var i = 0; i < data.length; i++) {
            if (data[i].TASK_WO.length) {
              console.log(data[i].TASK_WO, 'data[i].TASK_WO')
              for (var j = 0; j < data[i].TASK_WO.length; j++) {
                ydata.push(data[i].TASK_WO[j].WO_NO)
                start.push(data[i].TASK_WO[j].DATE_BEGIN)
                end.push(data[i].TASK_WO[j].DATE_END - data[i].TASK_WO[j].DATE_BEGIN)
              }
            } else {
              start = []
              end = []
            }
            var myChart = echarts.init(roseCharts[i])
            myChart.setOption({
              tooltip: {
                // formatter: params => {
                //   return params.name + '工单时间长：' + params.value + 'H'
                // }
                formatter: params => {
                  // console.log(data[i], 'data[i]data[i]===')
                  // if (data[i].TASK_WO) {
                  //   var QTY = data[i].TASK_WO.map(taskv => {
                  //     if (Number(params.value) === Number(taskv.DATE_END - taskv.DATE_BEGIN)) {
                  //       return taskv.O_QTY
                  //     }
                  //   })
                  // }
                  // '产能：' +
                  return '工单：' + params.name + '<br/>小时：' + params.value
                }
              },
              color: ['green'],
              title: {
                text: that.$t(data[i].LINE_NAME + '任务跟踪表'),
                padding: [5, 0, 0, 10],
                textStyle: {
                  fontSize: 16,
                  color: '#FFF'
                }
              },
              // legend: {
              //   type: 'plain',
              //   textStyle: {
              //     fontSize: 14, // 字体大小
              //     color: '#FFF' // 字体颜色
              //   },
              //   data: [this.$t('smt.cl')]
              // },
              grid: {
                top: 60,
                left: 1,
                right: 2,
                bottom: 20,
                containLabel: true
              },
              xAxis: {
                min: 0,
                max: 24,
                minInterval: 1,
                maxInterval: 24,
                interval: 1,
                axisLabel: {
                  formatter: val => {
                    return val + 'H' // Math.max(0, parseInt(val / 60)) + 'H'
                  },
                  rotate: 30,
                  textStyle: {
                    color: '#FFF'
                  }
                }
              },
              yAxis: {
                data: ydata, // [233, 456, 445, 44454, 44454],
                axisLabel: {
                  rotate: 30,
                  textStyle: {
                    color: '#FFF'
                  }
                }
              },
              series: [
                {
                  name: '时间',
                  type: 'bar',
                  stack: '总量',
                  itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                  },
                  emphasis: {
                    itemStyle: {
                      barBorderColor: 'rgba(0,0,0,0)',
                      color: 'rgba(0,0,0,0)'
                    }
                  },
                  barWidth: 30,
                  data: start // [0, 4, 5, 3, 2, 0]
                },
                {
                  name: '时间',
                  type: 'bar',
                  stack: '总量',
                  label: {
                    show: true,
                    position: 'inside',
                    formatter: params => {
                      if (data[i].TASK_WO) {
                        var QTY = data[i].TASK_WO.map(taskv => {
                          if (Number(params.value) === Number(taskv.DATE_END - taskv.DATE_BEGIN)) {
                            return taskv.O_QTY
                          }
                        })
                      }
                      QTY = QTY.filter(Boolean)
                      // '产能：' +
                      return QTY
                    }
                  },
                  data: end // [18, 6, 8, 12, 9, 14]
                }
              ]
            })
            start = []
            end = []
            ydata = []
          }
        })
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
      this.swiper2 = new Swiper('#swiper2', {
        slidesPerView: 1,
        loop: false,
        observer: true,
        observeParents: true,
        autoplay: {
          delay: 30000,
          disableOnInteraction: false
        },
        pagination: {
          el: '#swiper_p2',
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
      /* =====================计划达成率 柱状图 init============================== */
      this.RestPcbCountBar = echarts.init(
        document.getElementById('RestPcbCountBar')
      )
      var optionRestPcbCount = null
      optionRestPcbCount = {
        title: {
          id: 2,
          text: this.$t('今日计划达成率'),
          padding: [5, 0, 0, 10],
          textStyle: {
            color: '#FFF',
            fontSize: '16'
          }
        },
        grid: {
          left: '2%',
          right: '2%',
          bottom: '0%',
          top: '10%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none'
          },
          formatter: function (params) {
            return params[0].name + '<br/>' +
              "<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>" +
              params[0].value + '<br/>'
          }
        },
        xAxis: {
          show: false,
          type: 'value'
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          data: []// NameArr
        }, {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12'
            }
          },
          data: []// valArr
        }],
        series: [{
          name: '线体',
          type: 'bar',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 15,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: 'rgb(57,89,255,1)'
              }, {
                offset: 1,
                color: 'rgb(46,200,207,1)'
              }])
            }
          },
          barWidth: 10,
          data: []// valArr
        },
        {
          name: '背景',
          type: 'bar',
          barWidth: 10,
          barGap: '-100%',
          data: [], // totalArr
          itemStyle: {
            normal: {
              color: 'rgba(24,31,68,1)',
              barBorderRadius: 15
            }
          }
        }
        ]
      }
      this.RestPcbCountBar.setOption(optionRestPcbCount, true)

      /* =====================线体直通率对比 init=========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '8%',
          containLabel: true
        },
        color: ['#0b9eff'],
        tooltip: {
          formatter (a) {
            console.log(a)
            return a.name + ':' + a.data + '%'
          }
        },
        xAxis: [{
          type: 'category',
          data: [], // ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
          axisTick: {
            alignWithLabel: true
          },
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            rotate: 30
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            },
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            // show: false
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },

          position: 'left'

        }],
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            }
          },
          data: []// [60, 70, 80, 90, 60, 70, 80, 90]
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, 5],
          z: 12,
          data: []// [60, 70, 80, 90, 60, 70, 80, 90]
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '20',
          data: [], // [60, 70, 80, 90, 60, 70, 80, 90],
          markLine: {
            silent: true,
            symbol: 'none',
            label: {
              position: 'middle',
              formatter: '{b}'
            }

          }
        },
        {
          type: 'effectScatter',

          silent: true,
          tooltip: {
            show: false
          },
          zlevel: 3,

          symbolSize: [20, 10],
          // symbolOffset: [0, 0],
          symbolPosition: 'end',
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            color: '#0b9eff',
            scale: 4
          },
          itemStyle: {
            color: '#0b9eff'
          },
          hoverAnimation: true,
          data: []// [0, 0, 0, 0, 0 ]
        }
        ]
      }
      this.FirstPassRatePie.setOption(optionFirstPassRate, true)

      /* =====================异常时间对比  init=========================== */
      this.AoiPassRatePie = echarts.init(
        document.getElementById('AoiPassRatePie')
      )
      var optionAoiPassRate = null
      optionAoiPassRate = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '6%',
          containLabel: true
        },
        xAxis: {
          data: [],
          axisLine: {
            lineStyle: {
              color: '#3d5269'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14,
            rotate: 30
          }
        },
        yAxis: {
          name: '',
          type: 'value',
          nameTextStyle: {
            color: '#fff',
            fontSize: 14
          },
          axisLine: {
            lineStyle: {
              color: '#3d5269'
            }
          },
          axisLabel: {
            color: '#fff',
            fontSize: 14
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#2d3d53'
            }
          }
        },
        series: [{
          type: 'bar',
          barWidth: 20,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#52CD20'
              }, {
                offset: 1,
                color: '#37C611'
              }], false)
            }
          },
          label: {
            normal: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold',
              color: '#ffffff',
              position: 'top'
            }
          },
          data: []
        }]
      }
      this.AoiPassRatePie.setOption(optionAoiPassRate, true)
      /* =====================线体效率对比 init=========================== */
      this.SpiPassRatePie = echarts.init(
        document.getElementById('SpiPassRatePie')
      )
      var optionSpiPassRate = null
      optionSpiPassRate = {
        grid: {
          left: '2%',
          right: '2%',
          bottom: '2%',
          top: '6%',
          containLabel: true
        },
        color: ['rgba(253, 249, 20, 1)'],
        tooltip: {
          formatter (a) {
            console.log(a)
            return a.name + ':' + a.data + '%'
          }
        },
        xAxis: [{
          type: 'category',
          data: [], // ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月'],
          axisTick: {
            alignWithLabel: true
          },
          nameTextStyle: {
            color: '#fff'
          },
          axisLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14
            },
            rotate: 30
          }
        }],
        yAxis: [{
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#fff'
            },
            formatter: '{value}%'
          },
          splitLine: {
            lineStyle: {
              color: '#fff'
            }
          },
          axisLine: {
            // show: false
            show: true,
            lineStyle: {
              color: '#fff'
            }
          },

          position: 'left'

        }],
        series: [{
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, -5],
          symbolPosition: 'end',
          z: 12,
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: '{c}%'
            }
          },
          data: []// [60, 70, 80, 90, 60, 70, 80, 90]
        }, {
          name: '',
          type: 'pictorialBar',
          symbolSize: [20, 10],
          symbolOffset: [0, 5],
          z: 12,
          data: []// [60, 70, 80, 90, 60, 70, 80, 90]
        }, {
          type: 'bar',
          itemStyle: {
            normal: {
              opacity: 0.7
            }
          },
          barWidth: '20',
          data: [], // [60, 70, 80, 90, 60, 70, 80, 90],
          markLine: {
            silent: true,
            symbol: 'none',
            label: {
              position: 'middle',
              formatter: '{b}'
            }

          }
        },
        {
          type: 'effectScatter',

          silent: true,
          tooltip: {
            show: false
          },
          zlevel: 3,

          symbolSize: [20, 10],
          // symbolOffset: [0, 0],
          symbolPosition: 'end',
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke',
            color: 'rgba(253, 249, 20, .5)',
            scale: 4
          },
          itemStyle: {
            color: 'rgba(253, 249, 20, 1)'
          },
          hoverAnimation: true,
          data: []// [0, 0, 0, 0, 0 ]
        }
        ]
      }
      this.SpiPassRatePie.setOption(optionSpiPassRate, true)
      window.onresize = () => {
        this.RestPcbCountBar.resize()
        // this.WorkingPassRatePie.resize()
        this.FirstPassRatePie.resize()
        // this.HourYieldBar.resize()
        this.AoiPassRatePie.resize()
        this.SpiPassRatePie.resize()
        // this.ExLineDateBar.resize()
        // this.GetSmtChangeLineRecord()
      }
    }
  }
  // watch: {
  //   lineId (val) {
  //     if (val) {
  //       this.loadingData()
  //       this.dialogVisible = false
  //     } else {
  //       Object.assign(this.$data, this.$options.data(), {
  //         lineLists: this.lineLists
  //       })
  //       this.dialogVisible = true
  //     }
  //   }
  // }
}
</script>
