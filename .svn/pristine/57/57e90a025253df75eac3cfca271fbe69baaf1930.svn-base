<template>
  <div class="SMT1 SMTAutomatic">
    <div class="container-fluid"
         :class="{
        huise: !lineId || dialogVisible
      }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">{{ $t("smt.tit") }}</div>
        </el-col>
        <el-col :span="4"
                style="display: flex;align-items: center;height: 100%">
          <a id="liang"
             href="javascript:void(0)"
             class="tit-btn"
             style="margin-right: 20px"
             @click="dialogVisible = true">{{ $t("_kanban._1") }}</a>
          <a href="javascript:void(0)"
             class="tit-btn"
             @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</a>
        </el-col>
      </el-row>
      <!-- 头部 end -->
      <!-- 工单信息 start -->
      <div class="kanban-wo-info">
        <div class="kanban-wo-info-panel">
          <el-row>
            <el-col :span="1">
              <div class="div-title">{{ $t("smt.tb") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="LineName"
                   class="text-overflow div-value">
                {{ LineName || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="WoNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.wo") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoNo"
                   class="text-overflow div-value">
                {{ WoNo || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="PartNo ? 0 : 5">
              <div class="div-title">{{ $t("smt.po") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="PartNo"
                   class="text-overflow div-value">
                {{ PartNo || " " }}
              </div>
            </el-col>
            <el-col :span="1"
                    :offset="WoModel ? 0 : 5">
              <div class="div-title">{{ $t("smt.wl") }}：</div>
            </el-col>
            <el-col :span="5">
              <div id="WoModel"
                   class="text-overflow div-value">
                {{ WoModel || " " }}
              </div>
            </el-col>
            <span class="top-left border-span-m" />
            <span class="top-right border-span-m" />
            <span class="bottom-left border-span-m" />
            <span class="bottom-right border-span-m" />
          </el-row>
        </div>
      </div>
      <!-- 工单信息 end -->

      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px - 67px);">
        <el-row>
          <el-col :span="6">
            <!-- 工单完成率 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title">
                  <!-- {{ $t("smt.wc") }} -->
                  工单计划完成：
                </div>
                <!-- style="overflow-y: auto;height: 85%;position: relative;" -->
                <!-- <div id="WoYieldPie"
                     style="height: 85%;" /> -->
                <div style="overflow-y: auto;height: calc(100% - 50px);;position: relative;" >
                  <table id="SpotCheckTable"
                         class="ListTable table table-striped SpotCheckTable-tablehaed"
                         style="color:white;"
                         cellspacing="0"
                         border="0"
                         cellpadding="0">
                    <thead>
                      <tr>
                        <th style='width:15%'>序号</th>
                        <th style='width:35%'>工单号</th>
                        <!-- <th style='width:20%'>时间段</th> -->
                        <th style='width:20%'>计划生产</th>
                        <th style='width:20%'>累计生产</th>
                        <th style='width:20%'>是否完成</th>
                        <!-- <th style='width:31%'></th> -->
                      </tr>
                    </thead>
                  </table>
                  <table id="SpotCheckTabletbody"
                         class="ListTable table table-striped"
                         cellspacing="0"
                         border="0"
                         cellpadding="0">
                    <tbody  v-html="Planitemtbody">
                           <!-- <td style='width:20%'>{{item.PLAN_DATE}}</td> -->
                      <!-- <tr id="SpotCheckTabletTr"
                          v-for="(item,index) in Planitem"
                          :key="index">
                        <td style='width:25%'>{{item.WO_NO}}</td>

                        <td style='width:25%'>{{item.PLAN_QUANTITY}}</td>
                        <td style='width:25%'>{{item.O_QTY}}</td>
                        <td style='width:25%'>
                          <span v-if="item.IS_OK == 'Y'">是</span>
                          <span v-else>否</span>
                        </td>
                      </tr> -->
                    </tbody>
                  </table>

                </div>

                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 抽检情况 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title">
                  <span style="float:left"
                        class="title-left">
                    {{ $t("smt.sgs") }}
                  </span>
                  <span id="span_FailQty"
                        class="title-right"
                        style="float:right;padding:0 10px;font-size:12px;box-sizing: border-box">{{ $t("smt.alan") }}：{{ abnormal }}</span>
                  <span id="span_CheckQty"
                        class="title-right"
                        style="float:right;padding:0 10px;font-size:12px;box-sizing: border-box">{{ $t("smt.ssn") }}：{{ Spot_check }}</span>
                </div>
                <div style="overflow-y: auto;height: calc(100% - 50px)">
                  <table id="SpotCheckTable"
                         class="ListTable table table-striped"
                         style="color:white;"
                         v-html="SpotCheckTable" />
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 首件合格率 -->
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("smt.fpr") }}
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
          <el-col :span="12"
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

                    <div class="swiper-slide">
                      <div style="display: flex;height: 12%;padding: 0px 5px 0px 5px;">
                        <div style="width: 46%;">工单完成率：{{OUTPUT_QTY}}/{{TARGET_QTY}}（件)<span style="margin-left:50px">{{PERCEN_QTY}}</span></div>
                        <div style="width: 64%;padding-top: 5px;" id="WoYieldPie" />
                      </div>
                      <div style="height: 88%;" id="HourYieldBar" />
                    </div>

                    <div class="swiper-slide">
                      <div id="ExLineDateBar" />
                    </div>
                  </div>
                  <div id="swiper_p1" class="swiper-pagination" />
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="block">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div style="padding: 15px;display: flex;flex-direction: column;justify-content: space-between;height: 85%;">
                  <div style="word-break: normal;">辅料：{{restiofn.RESOURCE}}</div>
                  <div style="word-break: normal;">钢网：{{restiofn.STENCIL}}</div>
                  <div style="word-break: normal;">前刮刀：{{restiofn.SCRAPER_ONE}}</div>
                  <div style="word-break: normal;">后刮刀：{{restiofn.SCRAPER_TWO}}</div>
                </div>
                <!-- <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("smt.scr") }}
                </div> -->
                <!-- <div id="WorkingPassRatePie"
                     style="height: 85%;" /> -->
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="AoiTitle"
                     class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("smt.aoi") }}：{{AOITOL}}
                </div>
                <!-- <div>AOI合格率（单）：{{AOITOL}}%</div> -->
                <div id="AoiPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <div class="block">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="SPITitle"
                     class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  {{ $t("smt.spi") }}
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
      <!-- 主体 end -->
    </div>

    <el-dialog class="my-dialog"
               :title="$t('_kanban._1')"
               :visible.sync="dialogVisible"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item :label="$t('_kanban._2')">
          <el-select v-model="lineId"
                     :placeholder="$t('_kanban._3')"
                     style="width: 100%"
                     filterable
                     clearable
                     @change="lineChange">
            <el-option v-for="item in lineLists"
                       :key="item.ID"
                       :label="item.LINE_NAME"
                       :value="item.ID"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">
          {{ $t("_kanban._4") }}
        </el-button>
        <el-button type="primary"
                   @click="dialogVisible = false">
          {{ $t("_kanban._5") }}
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style scoped>
@import './SmtLine/index.css';
.SMTAutomatic {
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
</style>
<style lang="scss">
.ListTable.table > tbody > tr > td {
  font-size: 14px !important;
  height: 25px !important;
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

#Planitem {
  transform: translateY(0);
}

.animate {
  transition: all 2s ease-out;
  -webkit-transition: all 2s ease-out;
}
#SpotCheckTabletbody {
  color: white;
  padding: 0;
  border: none;
  position: absolute;
  top: 25px;
  left: 0;
}
</style>

<script>
import {
  CheckSmtLine,
  GetKanbanSpotCheckData,
  GetLines,
  GetSmtChangeLineRecordData,
  GetSmtKanbanFirstPassRateData,
  GetSmtKanbanHourYidldData,
  GetSmtKanbanRestPcbData,
  GetSmtKanbanSpiPassRateData,
  GetSmtKanbanWoData,
  GetSmtKanbanWorkingPassRateData,
  TopDayProducePlan,
  SmtAOIDefectInfo,
  GetRefershHourYield,
  GetSMTOnlineDataByWo
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
  name: 'SMTAutomatic',
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
      Planitem: [],
      OUTPUT_QTY: 0,
      TARGET_QTY: 0,
      PERCEN_QTY: '0%',
      AOITOL: 0,
      restiofn: {},
      Planitemtbody: '',
      MyMarhq: null,
      tblTop: 0,
      MyMarhqOshw: false
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  beforeDestroy () {
    clearInterval(this.timer)
    clearInterval(this.MyMarhq)
    this.MyMarhq = null
  },
  deactivated () {
    clearInterval(this.timer)
  },
  destroyed () {
    clearInterval(this.timer)
  },
  created () {
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

    lineChange (e) {
      this.InitSwiper()
      this.getWoYidldPie()
      this.lineId = e
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
          this.GetSmtKanbanFirstPassRate(),
          this.GetSmtKanbanRestPcb(),
          this.GetSmtKanbanSpiPassRate(),
          // this.GetSmtKanbanWorkingPassRate(),
          // this.GetSmtKanbanHourYidld(),
          this.GetSmtChangeLineRecord(),
          this.getTopDayProducePlan()
        ]).catch(() => {
          if (isShowLoading) loading.close()
        })
        if (isShowLoading) loading.close()
      } else {
        if (isShowLoading) loading.close()
      }
    },

    /**
   * 计算百分比
   * @param   {number} curNum   当前数据
   * @param   {number} totalNum 总数据
   * @param   {number} isHasPercentStr 是否返回%
   * @returns {number} 返回数百分比
   */
    Percentage (curNum, totalNum, isHasPercentStr = true) {
      curNum = parseFloat(curNum)
      totalNum = parseFloat(totalNum)
      if (isNaN(curNum) || isNaN(totalNum)) {
        return '-'
      }
      return isHasPercentStr
        ? totalNum <= 0 ? '0%' : (Math.round(curNum / totalNum * 10000) / 100.00 + '%')
        : totalNum <= 0 ? 0 : (Math.round(curNum / totalNum * 10000) / 100.00)
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
        this.OUTPUT_QTY = data[0].OUTPUT_QTY || 0 // 96010
        this.TARGET_QTY = data[0].TARGET_QTY || 0
        console.log(this.OUTPUT_QTY)
        console.log(this.TARGET_QTY)
        this.PERCEN_QTY = this.Percentage(this.OUTPUT_QTY, this.TARGET_QTY)
        var total = parseFloat(String(this.OUTPUT_QTY / this.TARGET_QTY * 100).substring(0, 2))
        var colo = ''
        if (total <= 50) {
          // console.log('蓝色')
          colo = '#DA462C'
          // console.log(item)
        } else if (total <= 70) {
          colo = '#FF9619'
          // console.log('绿色')
        } else if (total <= 90) {
          colo = '#FFED45'
          // console.log('黄色')
        } else {
          colo = '#1FAE51'
          // console.log('红色')
        }
        this.WoYidldPie.hideLoading() // 隐藏加载动画
        this.WoYidldPie.setOption(
          {
            series: [
              {
                data: [this.OUTPUT_QTY],
                itemStyle: {
                  normal: {
                    color: colo
                  }
                }
              },
              {
                data: [this.TARGET_QTY]
              }
            ]
          })
        this.GetKanbanSpotCheck(this.WoNo)
        this.getSmtAOIDefectInfo(this.WoNo)
        this.GetRefershHourYield(this.WoNo)
        if (data[0].OPERATION_LINE_ID && this.WoNo) {
          this.GetSMTOnlineDataByWo(data[0].OPERATION_LINE_ID, this.WoNo)
        }

        console.log(data, '获取产线的工单信息')
      }
    },
    async GetSMTOnlineDataByWo (id, wo) {
      const res = await GetSMTOnlineDataByWo({ 'LINE_ID': this.lineId, 'WO_ID': id, WO_NO: wo })
      if (res.Result) {
        this.restiofn = res.Result || {}
      }
    },
    // 工单计划完成
    getstust (type) {
      switch (type) {
        case 'Y':
          return '是'
        case 'N':
          return '否'
        default:
          return ''
      }
    },
    async getTopDayProducePlan () {
      clearInterval(this.MyMarhq)
      this.MyMarhq = null
      const res = await TopDayProducePlan({ 'LINE_ID': this.lineId })
      console.log(res)
      const data = res.Result || []
      this.Planitem = data
      var htmltbody = ''
      if (data) {
        if (data.length > 0) {
          data.forEach((v, i) => {
            // this.getstust(v.IS_OK)
            htmltbody += '<tr id="SpotCheckTabletTr"><td style="width: 15%;">' + Number(i + 1) + '</td><td style="width: 35%;">' + v.WO_NO + '</td><td style="width: 20%;">' + v.PLAN_QUANTITY + '</td><td style="width: 20%;">' + v.O_QTY + '</td><td style="width: 20%;">' + this.getstust(v.IS_OK) + '</td></tr>'
          })
        }
      }
      if (data.length < 5) {
        if (data.length !== 0) {
          this.Planitemtbody = htmltbody
        } else {
          this.Planitemtbody = ''
        }
      } else {
        this.Planitemtbody = htmltbody + htmltbody
      }
      // if (!this.MyMarhqOshw) {
      //   this.MyMarhq = setInterval(this.startScroll, 50)
      // }

      // console.log(res.Result, '计划完成')
    },
    startScroll: function () {
      var outerHeight = document.getElementById('SpotCheckTabletTr').offsetHeight
      if (this.tblTop <= -outerHeight * this.Planitem.length) {
        this.tblTop = 0
      } else {
        this.tblTop -= 1
      }
      document.getElementById('SpotCheckTabletbody').style.top = this.tblTop + 'px'
    },
    enter () {
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.MyMarhq)
      })
      clearInterval(this.MyMarhq)
      this.MyMarhqOshw = true
      this.MyMarhq = null
    },
    leave () {
      clearInterval(this.MyMarhq)
      this.MyMarhqOshw = false
      this.MyMarhq = null
      this.MyMarhq = setInterval(this.startScroll, 50)
    },
    // 帕累托图
    async getSmtAOIDefectInfo (WO_NO) {
      const res = await SmtAOIDefectInfo({ 'LINE_ID': this.lineId, 'WO_NO': WO_NO })
      var data = {}
      data.uploadData = res.Result || []
      data.uploadData.sort((a, b) => {
        return b.DEFECT_QTY - a.DEFECT_QTY
      })
      this.AOITOL = res.ResultInfo
      // var data = {
      //   'uploadData': [
      //     { 'DEFECT_QTY': 5421, 'DEFECT_DESCRIPTION': '虚假焊' },
      //     { 'DEFECT_QTY': 6512, 'DEFECT_DESCRIPTION': '元件' },
      //     { 'DEFECT_QTY': 3721, 'DEFECT_DESCRIPTION': '同' },
      //     { 'DEFECT_QTY': 2842, 'DEFECT_DESCRIPTION': '元件破损' },
      //     { 'DEFECT_QTY': 6427, 'DEFECT_DESCRIPTION': '其它不良' }
      //   ]
      // }
      var uploadCnt = []
      var updateCnt = []
      var viewCnt = []
      var areaNameS = []
      var PERCENTAGE = []
      if (data.uploadData) {
        for (var i = 0; i < data.uploadData.length; i++) {
          uploadCnt.push(data.uploadData[i].DEFECT_QTY)
          areaNameS.push(data.uploadData[i].DEFECT_DESCRIPTION)
          PERCENTAGE.push(data.uploadData[i].DEFECT_PERCENTAGE)
        }
      }
      if (data.updateData) {
        for (var j = 0; j < data.updateData.length; j++) {
          updateCnt.push(data.updateData[j].DEFECT_QTY)
        }
      }
      if (data.viewData) {
        for (var v = 0; v < data.viewData.length; v++) {
          viewCnt.push(data.viewData[v].DEFECT_QTY)
        }
      }
      this.AoiPassRatePie.hideLoading() // 隐藏加载动画
      this.AoiPassRatePie.setOption({
        xAxis: [{
          'data': areaNameS
        }],
        series: [
          {
            data: uploadCnt
          }, {
            data: PERCENTAGE,
            label: {
              show: true
            }
          }
        ]
      })
    },
    // 每小时产能
    async GetRefershHourYield (WO_NO) {
      const res = await GetRefershHourYield({ 'LINE_ID': this.lineId, 'WO_NO': WO_NO })
      // console.log(res)
      const data = res.Result.YieldData || []
      var STANDARD_CAPACITY = res.Result.STANDARD_CAPACITY || 0// : 6400
      // var data = [
      //   {
      //     'WORK_HOUR': '09日00时',
      //     'OUTPUT_QTY': 1620,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日01时',
      //     'OUTPUT_QTY': 1476,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日02时',
      //     'OUTPUT_QTY': 1836,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日03时',
      //     'OUTPUT_QTY': 1548,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日04时',
      //     'OUTPUT_QTY': 1638,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日05时',
      //     'OUTPUT_QTY': 1494,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日06时',
      //     'OUTPUT_QTY': 1620,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日08时',
      //     'OUTPUT_QTY': 1440,
      //     'AOI_FAIL': 0
      //   },
      //   {
      //     'WORK_HOUR': '09日09时',
      //     'OUTPUT_QTY': 1620,
      //     'AOI_FAIL': 3
      //   },
      //   {
      //     'WORK_HOUR': '09日10时',
      //     'OUTPUT_QTY': 0,
      //     'AOI_FAIL': 3
      //   }
      // ]
      var zzx1 = []
      var wgx1 = []
      var NameList = []

      data.map(res => {
        zzx1.push(res.OUTPUT_QTY)
        wgx1.push(res.AOI_FAIL)
        NameList.push(res.WORK_HOUR)
      })

      // var option = {
      //   yAxis: [{
      //     name: STANDARD_CAPACITY ? '               每小时目标产能：' + STANDARD_CAPACITY : '',
      //     color: '#fff',
      //     nameTextStyle: {
      //       color: '#ffffff'
      //     }
      //   }, {
      //     type: 'value',
      //     min: 0,
      //     max: 10,
      //     interval: 2,
      //     axisLabel: {
      //       formatter: '{value}'
      //     }
      //   }],
      //   xAxis: {
      //     data: NameList
      //   },
      //   series: [
      //     { data: zzx1, type: 'bar' },
      //     { data: wgx1, type: 'bar' }
      //   ]
      // }
      var option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        xAxis: [
          {
            type: 'category',
            data: NameList,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            name: STANDARD_CAPACITY ? '               每小时目标产能：' + STANDARD_CAPACITY : '',
            color: '#fff',
            nameTextStyle: {
              color: '#ffffff'
            },
            type: 'value',
            min: 0,
            max: 2000,
            interval: 400,
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            min: 0,
            max: 10,
            interval: 2,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            type: 'bar',
            data: zzx1
          },
          {
            type: 'bar',
            data: wgx1
          }
        ]
      }
      this.HourYieldBar.hideLoading() // 隐藏加载动画
      this.HourYieldBar.setOption(option) // 加载数据图表
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
    /* 首件合格率 */
    async GetSmtKanbanFirstPassRate () {
      const res = await GetSmtKanbanFirstPassRateData(this.lineId)
      if (res.Result) {
        console.log(res, '自动化线看板的首件的直通率')
        const data = JSON.parse(res.Result)
        if (data) {
          if (data.length > 0) {
            this.FirstPassRatePie.hideLoading() // 隐藏加载动画
            this.FirstPassRatePie.setOption({
              // 加载数据图表
              title: {
                left: 'center',
                top: 'middle',
                subtext:
                  data[0].PASS + ' / ' + data[0].TOTAL + this.$t('smt.ps')
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
      console.log(res)
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
        // backgroundColor: '#101E40',
        grid: [{
          left: '0%',
          top: '0%',
          right: '0%',
          bottom: '0%',
          containLabel: true
        }],
        //  设置最大容量
        xAxis: [{
          show: false
        }],
        yAxis: [{
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 16
            }
            // yAxis 栏标题
            // formatter: function (data) {
            //   return data + ' :单位'
            // }
          },
          data: []// ["工单完成率："]
        }

        ],
        series: [{
          name: '条',
          type: 'bar',
          stack: 'b',
          yAxisIndex: 0,
          data: [], // dataLine,
          barWidth: 100,
          itemStyle: {
            normal: {
              color: function (params) {
                return '#33CC00'// myColor[params.dataIndex];
              }
            }
          },
          z: 2
        },
        {
          name: '框',
          type: 'bar',
          barGap: '-100%',
          data: [], // [1000],
          barWidth: 100,
          itemStyle: {
            normal: {
              color: '#2F6781'
            }
          },
          z: -1,
          label: {
            normal: {
              show: false,
              position: 'right',
              distance: 10,
              textStyle: {
                color: '#fff',
                fontSize: 16
              }
            }
          }
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
          text: this.$t('smt.lw') + '(分钟)',
          padding: [0, 0, 0, 10],
          textStyle: {
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

      /* =====================首件合格率 仪表盘 init=========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
        title: {
          left: 'center',
          top: 'middle',
          subtext: '0 / 0 ' + this.$t('smt.ps'),
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
        // backgroundColor: '#0e2147',
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (e) {
            return e[0].axisValue + '<br>每小时产能：' + e[0].data + '<br>AOI不良总数；' + e[1].data
          }
        },
        grid: {
          left: '0%',
          right: '2%',
          bottom: '4%',
          top: '16%',
          containLabel: true
        },
        legend: {
          data: ['每小时产能', 'AOI不良总数'],
          left: '40%',
          top: 1,
          textStyle: {
            color: '#00ffff',
            fontSize: 14
          },
          itemWidth: 12,
          itemHeight: 10,
          // itemGap: 35
          color: '#242424'
        },
        xAxis: {
          type: 'category',
          data: [],
          axisLine: {
            lineStyle: {
              show: true,
              lineStyle: {
                color: '#fff'
              }
            }
          },
          axisLabel: {
            // interval: 0,
            // rotate: 40,
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              color: '#fff', // x轴颜色
              fontWeight: 'normal',
              fontSize: '14',
              lineHeight: 22
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            name: '',
            color: '#fff',
            axisLabel: {
              formatter: '{value}',
              color: '#fff'
            }
          },
          {
            type: 'value',
            name: '',
            axisLabel: {
              formatter: '{value}',
              color: '#fff'
            }
          }
        ],
        series: [{
          name: '每小时产能',
          type: 'bar',
          barWidth: '15',
          itemStyle: {
            normal: {
              opacity: 0.7,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'blue'
              }, {
                offset: 1,
                color: '#7EC0EE'
              }]),
              barBorderRadius: 0
            }

          },
          label: {
            show: true,
            position: ['3', '-18'],
            color: '#00f8ff',
            fontSize: 12
          },
          data: []// zzx1
        },
        {
          name: 'AOI不良总数',
          type: 'bar',
          barWidth: '15',
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              opacity: 0.7,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: '#FF2246'
              }, {
                offset: 1,
                color: '#FFC0CB'

              }]),
              barBorderRadius: 0
            }

          },
          label: {
            show: true,
            position: ['0', '-18'],
            color: '#00f8ff',
            fontSize: 12
          },
          data: []// wgx1
        }
        ]
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
        'tooltip': {
          'trigger': 'axis',
          transitionDuration: 0,
          backgroundColor: 'rgba(83,93,105,0.8)',
          borderColor: '#535b69',
          borderRadius: 8,
          borderWidth: 2,
          padding: [5, 10],
          formatter: function (params, ticket, callback) {
            var res = ''
            for (var i = 0, l = params.length; i < l; i++) {
              res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>'
            }
            return res
          },
          axisPointer: {
            type: 'line',
            lineStyle: {
              type: 'dashed',
              color: '#ffff00'
            }
          }
        },
        'grid': {
          'top': '40',
          'left': '30',
          'right': '40',
          'bottom': '40',
          textStyle: {
            color: '#fff'
          }
        },
        'legend': {
          right: '24',
          top: '24',
          itemWidth: 8,
          itemHeight: 12,
          textStyle: {
            color: '#fff',
            fontSize: 10
          },
          'data': ['不良数量']
        },
        'calculable': true,
        xAxis: [{
          'type': 'category',
          'axisTick': {
            'show': false
          },
          'axisLine': {
            'show': false,
            lineStyle: {
              color: '#fff'
            }
          },
          'axisLabel': {
            'interval': 0,
            fontSize: 10,
            formatter: function (value) {
              var ret = ''// 拼接加\n返回的类目项
              var maxLength = 2// 每项显示文字个数
              var valLength = value.length// X轴类目项的文字个数
              var rowN = Math.ceil(valLength / maxLength) // 类目项需要换行的行数
              if (rowN > 1) { // 如果类目项的文字大于3,
                for (var i = 0; i < rowN; i++) {
                  var temp = ''// 每次截取的字符串
                  var start = i * maxLength// 开始截取的位置
                  var end = start + maxLength// 结束截取的位置
                  // 这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                  temp = value.substring(start, end) + '\n'
                  ret += temp // 凭借最终的字符串
                }
                return ret
              } else {
                return value
              }
            }

          },
          'splitArea': {
            'show': false
          },
          'data': [], // areaNameS
          splitLine: {
            show: false
          }
        }],
        'yAxis': [
          {
            type: 'value',
            name: '',
            nameTextStyle: {
              color: 'rgba(255,255,255,0.5)',
              fontSize: 12
            },
            // "min": 0,
            // "max": 50,
            minInterval: 1,
            axisLabel: {
              formatter: '{value}',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255,255,255,0.5)'
              }
            }
          },
          {
            type: 'value',
            name: '',
            nameTextStyle: {
              color: '#fff',
              fontSize: 12
            },
            min: 0,
            max: 100,
            axisLabel: {
              formatter: '{value} %',
              textStyle: {
                color: '#fff',
                fontSize: 12
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff'
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: 'rgba(255,255,255,0.2)'
              }
            }
          }
        ],
        series: [
          {
            name: '数量',
            type: 'bar',
            barGap: '10%',
            itemStyle: {// 图形样式
              normal: {
                color: '#4a4df0'
              }
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#ffc72b',
                  fontSize: 10
                }
              }
            },
            data: [], // uploadCnt
            barWidth: 14
          },
          {
            name: '百分比',
            type: 'line',
            itemStyle: { /* 设置折线颜色 */
              normal: {
                color: '#c7b198'
              }
            },
            yAxisIndex: 1,
            data: []
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

</script>
