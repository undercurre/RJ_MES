<template>
  <div class="SMT1 SMTAutomatic">
    <div class="container-fluid"
         :class="{
        huise: !workshopId || dialogVisible
      }">
      <!-- 头部 start -->
      <el-row class="kanban-title">
        <el-col :span="16"
                :offset="4">
          <div class="kanban-title-panel">车间监控看板</div>
        </el-col>
        <el-col :span="4"
                style="display: flex;align-items: center;height: 100%">
          <a id="liang"
             href="javascript:void(0)"
             class="tit-btn"
             style="margin-right: 20px"
             @click="dialogVisible = true">选择车间</a>
          <a href="javascript:void(0)"
             class="tit-btn"
             @click="$options.fs.fullScreen.handleFullScreen(this)">{{ $t("smt.fs") }}</a>
        </el-col>
      </el-row>
      <!-- 头部 end -->

      <!-- 主体 start -->
      <div style="height: calc(100vh - 70px);">
        <el-row>
          <el-col :span="6">
            <!-- 不良top5 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title">
                  不良top5
                </div>
                <div id="WoYieldPie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 安灯呼叫信息 -->
            <div class="block">
              <div class="kanban-wo-yield-panel kanban-panel-bg">
                <div class="kanban-panel-title">
                  <span style="float:left"
                        class="title-left">
                    安灯呼叫信息
                  </span>
                </div>
                <div style="overflow-y: auto;height: calc(100% - 50px)">
                 <table  id="AndonCallTable"
                           class="ListTable table table-striped"
                           style="color:white;border-collapse:collapse"
                           v-html="AndonCallTable" />
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 直通率 -->
            <div class="block">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div id="SPITitle"
                     class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  直通率({{this.THROUGH_RATE}}%)
                </div>
                <div id="WoPassRatePie"
                     style="height: 85%;padding-top:-50px" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="12"
                  style="padding: 0 15px;box-sizing: border-box">
            <!-- 今日排产列表 -->
            <div class="block">
              <div class="kanban-wo-site-panel kanban-panel-bg"
                   style="box-sizing: border-box">
                <div class="kanban-panel-title">
                  今日排产列表
                </div>
                <div style="overflow-y: auto;height: calc(100% - 50px)">
                 <table :key="Math.random()"  id="AndonCallTable"
                           class="ListTable table table-striped"
                           style="color:white;border-collapse:collapse">
                    <thead>
                      <tr> <th>生产订单</th>
                      <th>排产数量</th>
                      <th>完成数量</th>
                      <th>达成率</th>
                      </tr>
                    </thead>
                    <tbody class="productList">
                        <tr v-for="(item,index) in PlanPassRateTable" :key="index">
                          <td>{{item.WO_NO}}</td>
                          <td>{{item.INPUT_QTY}}</td>
                          <td>{{item.OUTPUT_QTY}}</td>
                          <td>
                            <el-progress  :percentage="item.PASS_RATE"></el-progress>
                          </td>
                        </tr>
                    </tbody>
                 </table>
                </div>
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 工序统计 -->
            <div class="block">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="padding-top: 10px;box-sizing: border-box">
                <div id="ExLineDateBar"  />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 每小时产能 -->
            <div class="block">
              <div class="kanban-hour-yield-panel kanban-panel-bg"
                   style="padding-top: 10px;box-sizing: border-box">
                <div id="HourYieldBar"  />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <!-- 设备状态 -->
            <div class="block">
              <div class="kanban-wo-site-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  设备状态
                </div>
                <div id="WorkingPassRatePie"
                     style="height: 85%;" />
                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 设备保养 -->
             <!-- @mouseenter="mouseEnter" @mouseleave="mouseLeave" -->
            <div class="block" @mouseenter="mouseEnter" @mouseleave="mouseLeave">
              <div class="kanban-top-defect-panel kanban-panel-bg">
                <div class="kanban-panel-title">
                  <span style="float:left"
                        class="title-left">
                    设备保养
                  </span>
                  <span id="span_CheckQty"
                        class="title-right"
                        style="float:right;
                        font-size:12px;
                        box-sizing:
                        border-box;
                        margin-right:10px"
                        :class="index==workIndex?'titleaction':''"
                        v-for="(item,index) in workshopList"
                        :key="index"
                        @click="workShopClick(index)">{{item}}</span>
                </div>
                <div class="equipment">
                  <el-row class="infor" type="flex" justify="center">
                  <el-col class="infor-col" :span="8">
                    <strong>{{machine.MACHINE_QTY}}</strong><br/><span>设备总数</span>
                  </el-col>
                  <el-col class="infor-col" :span="8">
                    <strong>{{machine.HASCHECK_QTY}}</strong><br/><span>已保养数</span>
                  </el-col>
                  <el-col class="infor-col" :span="8">
                    <strong>{{machine.UNCHECK_QTY}}</strong><br/><span>未保养数</span>
                  </el-col>
                </el-row>
                </div>
                <!-- <div v-show="workIndex==0||workIndex==1||workIndex==2" :key="Math.random()"   id="AoiPassRatePie"
                     style="height: 70%;" /> -->

                <div :key="Math.random()" style="overflow-y: auto;height: calc(100% - 100px)">
                  <table
                           class="ListTable table table-striped"
                           style="color:white;
                           border-collapse:collapse;
                           border-top:none">
                    <thead>
                      <tr> <th>设备编号</th>
                      <th>设备名称</th>
                      <th>点检状态</th>
                      </tr>
                    </thead>
                    <tbody class="productList">
                        <tr v-for="(item,index) in machineList" :key="index">
                          <td>{{item.MACHINE_NO}}</td>
                          <td>{{item.MACHINE_NAME}}</td>
                          <td v-if="item.MAINTAIN_STATUS==0"><span style='color:#FF5722;'>未保养</span></td>
                          <td v-else><span style='color:#FFB800;'>已保养</span></td>
                        </tr>
                    </tbody>
                 </table>
                </div>

                <span class="top-left border-span-m" />
                <span class="top-right border-span-m" />
                <span class="bottom-left border-span-m" />
                <span class="bottom-right border-span-m" />
              </div>
            </div>
            <!-- 首件检验(月) -->
            <div class="block">
              <div class="kanban-andon-call-panel kanban-panel-bg">
                <div class="kanban-panel-title"
                     style="max-height:50px;height: 15%;">
                  首件检验(月)
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
        </el-row>
      </div>
      <!-- 主体 end -->
    </div>

    <el-dialog class="my-dialog"
               title="选择车间"
               :visible.sync="dialogVisible"
               width="30%"
               ref="myDialog"
               :close-on-click-modal="false"
               :before-close="handleClose">
      <el-form ref="form"
               label-width="80px"
               size="small"
               label-position="top">
        <el-form-item label="车间">
          <el-select v-model="workshopId"
                     placeholder="请选择车间"
                     style="width: 100%"
                     filterable
                     clearable
                     @change="workShopChange">
            <el-option v-for="item in workList"
                       :key="item.LOOKUP_CODE"
                       :label="item.LINE_NAME_INCN"
                       :value="item.LOOKUP_CODE"></el-option>
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
.block{
  height: calc((100vh - 70px) / 3 - 12px);
}
.title-right{
  line-height: 30px;
  width: inherit;
  padding: 2px 10px 2px 10px;
  cursor: pointer;
  margin-top: 10px;
}
.titleaction{
  background: #4085e6;
  border-radius: 10px 0px 10px 0px;
}
.ListTable.table>thead:first-child>tr:first-child>th{
  line-height: 40px;
}
.ListTable.table-striped>tbody>tr{
  line-height: 40px;
}
.ListTable{
  font-size: 14px;
}
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
.equipment{
  text-align: center;
  font-size: 12px;
  margin-left:4% ;
}
.equipment .infor{
  width: 96%;
  padding: 4px;
  background: #101f3e;
  border: 1px #244e89 solid;
}
.equipment .infor-col{
  border-right: 1px #244e89 solid;
}
.equipment .infor-col strong{
  font-size: 14px;
}
.equipment .infor-col span{
  color:#4085e6 ;
}
.equipment .infor-col:last-child{
  border: none;
}
</style>
<style lang="scss">
.productList>tr>td .el-progress{
width:140px;margin:auto
}
.productList>tr>td .el-progress .el-progress__text{
color: #fff;
}
.ListTable.table > tbody > tr > td {
  font-size: 14px !important;
  height: 25px !important;
}
.ListTable.table>thead:first-child>tr{
  line-height: 40px;
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
  GetHourReportData,
  GetFirstCheckData,
  GetPassRateData,
  GetOperationData,
  GetMachineData,
  GetPlanPassRateData,
  GetTopDefectData,
  GetAndonCallData,
  GetMachineMaintainData
} from '@/api/MesKanbanController'
import {
  LoadLocationList
} from '@/api/SfcsOperationLines'
import echarts from 'echarts'
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
  name: 'Workshop',
  data () {
    return {
      workIndex: 3,
      workshopId: '',
      workshopList: [
        '年保养',
        '月保养',
        '周保养',
        '日保养'
      ],
      // 工单信息
      LineName: '',
      WoNo: '',
      PartNo: '',
      WoModel: '',
      THROUGH_RATE: '0',
      PlanPassRateTable: null,
      abnormal: '',
      Spot_check: '',
      SpotCheckTable: '',
      RestPcForm: {
        workshopId: 82,
        topDay: 10
      },
      LineForm: {
        workshopId: 82,
        topDay: 10
      },
      // 抽检良率
      Spotheck: {
        workshopId: 0,
        wo_no: '',
        topCount: 5
      },
      WoYidldPie: null,
      WorkingBar: null,
      AndonCallTable: null,
      timer: null,
      dialogVisible: false,
      workList: [],
      Planitem: [],
      OUTPUT_QTY: 0,
      TARGET_QTY: 0,
      PERCEN_QTY: '0%',
      AOITOL: 0,
      restiofn: {},
      Planitemtbody: '',
      MyMarhq: null,
      tblTop: 0,
      MyMarhqOshw: false,
      machine: {
        HASCHECK_QTY: 0,
        MACHINE_QTY: 0,
        UNCHECK_QTY: 0
      },
      machineList: []
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
    clearInterval(this.MyMarhq)
  },
  destroyed () {
    clearInterval(this.timer)
    clearInterval(this.MyMarhq)
  },
  created () {
    if (localStorage.getItem('workshopId')) {
      this.workshopId = localStorage.getItem('workshopId')
    }
    this.$nextTick(() => {
      this.getWoYidldPie()
    })
    this.getWorkList()
    if (this.$route.query.workshopId) {
      this.workshopId = parseInt(this.$route.query.workshopId)
    }
    if (!this.workshopId) {
      this.dialogVisible = true
    }
    this.loopData()
    this.loopMachine()
  },
  mounted () {
    localStorage.removeItem('workshopId')
  },
  methods: {
    workShopClick (index) {
      this.workIndex = index
      this.GetMachineMaintainData()
    },
    workShopChange (e) {
      this.getWoYidldPie()
      this.workshopId = e
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
      if (!this.workshopId) {
        this.$message.error('请先选择车间')
      } else {
        done()
      }
    },
    async getWorkList () {
      const res = await LoadLocationList({
        USER_ID: this.userId,
        Page: 1,
        Limit: 1000000000
      })
      this.workList = res.Result || []
    },
    loadingData (isShowLoading = true) {
      this.getCheckSmtLine(isShowLoading)
    },
    // 轮询设备保养
    loopMachine () {
      this.MyMarhq = setInterval(() => {
        if (!this.workshopId || this.dialogVisible) {
          return false
        }
        this.workIndex -= 1
        if (this.workIndex < 0) {
          this.workIndex = 3
        }
        this.GetMachineMaintainData()
      }, 5000)
    },
    // 轮询数据
    loopData () {
      this.timer = setInterval(() => {
        if (!this.workshopId || this.dialogVisible) {
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

      await Promise.all([
        this.GetRefershHourYield(), // 每小时产能
        this.GetRefershCheckData(), // 首件检验
        this.GetReferPassRateData(), // 直通率
        this.GetReferOperationData(), // 工序统计
        this.GetReferMachineData(), // 设备状态
        this.GetReferPlanPassRateData(), // 排产列表
        this.GetReferTopDefectData(), // 不良top5
        this.GetReferCallData(), // 安灯呼叫信息
        this.GetMachineMaintainData() // 设备保养
      ]).catch(() => {
        if (isShowLoading) loading.close()
      })
      if (isShowLoading) loading.close()
    },
    mouseEnter () {
      this.$once('hook:beforeDestroy', () => {
        clearInterval(this.MyMarhq)
      })
      clearInterval(this.MyMarhq)
      this.MyMarhq = null
    },
    mouseLeave () {
      clearInterval(this.MyMarhq)
      this.MyMarhq = null
      this.loopMachine()
    },
    // 获取最大值
    maxNumber (array, key) {
      const res = array instanceof Array
      if (res) {
        var max = 0
        array.map((item) => {
          if (max < item[key]) {
            max = item[key]
          }
        })
        return max
      } else {
        return 0
      }
    },
    // 每小时产能
    async GetRefershHourYield () {
      const res = await GetHourReportData({ 'location': this.workshopId })
      const data = res.Result || []

      var yData = []
      var serData = []

      data.map(res => {
        yData.push(res.HOUR)
        serData.push(res.HOUR_QTY)
      })
      var option = {
        yAxis: [
          {
            type: 'category',
            data: yData,
            axisLabel: {
              formatter: '{value}',
              color: '#fff'
            }
          }
        ],
        series: [
          {
            data: serData

          }
        ]
      }
      this.HourYieldBar.hideLoading() // 隐藏加载动画
      this.HourYieldBar.setOption(option) // 加载数据图表
    },
    /* 首件检验 */
    async GetRefershCheckData () {
      const res = await GetFirstCheckData({ 'location': this.workshopId })
      if (res.Result >= 0) {
        this.FirstPassRatePie.hideLoading() // 隐藏加载动画
        this.FirstPassRatePie.setOption({
          series: [
            {
              data: [
                {
                  value: res.Result
                }
              ]
            }
          ]
        })
      }
    },
    // 直通率
    async GetReferPassRateData () {
      const res = await GetPassRateData({ 'location': this.workshopId })
      if (res.Result) {
        this.THROUGH_RATE = res.Result.THROUGH_RATE
        var max = this.maxNumber(res.Result.OPERATION_PASS_RATE, 'PASS_RATE')
        var indicator = []
        var serData = []
        res.Result.OPERATION_PASS_RATE.map((item) => {
          serData.push(item.PASS_RATE)
          var obj = {}
          obj.name = item.OPERATION_NAME
          obj.max = max
          indicator.push(obj)
        })
        var option = {
          radar: {
            indicator
          },
          series: [
            {
              type: 'radar',
              data: [
                {
                  value: serData
                }
              ]
            }
          ]
        }
        this.WoPassRatePie.hideLoading() // 隐藏加载动画
        this.WoPassRatePie.setOption(option) // 加载数据图表
      }
    },
    // 工序统计
    async GetReferOperationData () {
      const res = await GetOperationData({ 'location': this.workshopId })
      if (res.Result) {
        var source = []
        res.Result.map((item) => {
          var temp = []
          temp.push(item.OPERATION_NAME, item.PASS_QTY, item.FAIL_QTY, item.WIP_QTY)
          source.push(temp)
        })
      }
      source.unshift(['product', 'PASS', 'FAIL', 'WIP'])
      var option = {
        dataset: {
          source
        }
      }
      this.ExLineDateBar.hideLoading() // 隐藏加载动画
      this.ExLineDateBar.setOption(option) // 加载数据图表
    },
    // 设备状态
    async GetReferMachineData () {
      const res = await GetMachineData({ 'location': this.workshopId })
      if (res.Result) {
        var option = {
          series: [
            {
              label: {
                normal: {
                  formatter: '{active|设备总数}' + '\n\r' + '{total|' + res.Result.MACHINE_QTY + '}'
                }
              },
              data: [
                { value: res.Result.USING_QTY, name: `使用中:${res.Result.USING_RATE}% (${res.Result.USING_QTY})` },
                { value: res.Result.REPAIR_QTY, name: `维修中:${res.Result.REPAIR_RATE}% (${res.Result.REPAIR_QTY})` },
                { value: res.Result.IDLE_QTY, name: `闲置中:${res.Result.IDLE_RATE}% (${res.Result.IDLE_QTY})` }
              ]
            }
          ]
        }
        this.WorkingPassRatePie.hideLoading() // 隐藏加载动画
        this.WorkingPassRatePie.setOption(option) // 加载数据图表
      }
    },
    // 今日排产
    async GetReferPlanPassRateData () {
      const res = await GetPlanPassRateData({ 'location': this.workshopId })
      if (res.Result) {
        this.PlanPassRateTable = res.Result
        console.log(this.PlanPassRateTable)
        this.workRenderMachine()
      }
    },
    // 不良top5
    async GetReferTopDefectData () {
      const res = await GetTopDefectData({ 'location': this.workshopId })
      if (res.Result) {
        var serData = []
        res.Result.map((item) => {
          var obj = {}
          obj.name = item.DEFECT_DESCRIPTION
          obj.value = item.FAIL_QTY
          serData.push(obj)
        })
        var option = {
          series: [
            {
              data: serData
            },
            {
              data: serData
            }
          ]
        }
        this.WoYidldPie.hideLoading() // 隐藏加载动画
        this.WoYidldPie.setOption(option) // 加载数据图表
      }
    },
    // 安灯呼叫
    async GetReferCallData () {
      const res = await GetAndonCallData({ 'location': this.workshopId })
      console.log(res)
      if (res.Result) {
        var html = `
          <thead><tr> <th>工位</th>
          <th  width="20%">呼叫类型</th>
          <th width="20%">时间</th>
          <th  width="20%">状态</th>
          </tr>
          </thead>`
        html += '<tbody>'
        res.Result.forEach((v, i) => {
          if (v.STATUS_NAME === '待处理') {
            v.STATUS_NAME = "<span style='color:#FF5722;'>" + this.$t('pdl._1') + '</span>'
          } else if (v.STATUS_NAME === '处理中') {
            v.STATUS_NAME = "<span style='color:#FFB800;'>" + this.$t('pdl._2') + '</span>'
          } else if (v.STATUS_NAME === '已完结') {
            v.STATUS_NAME = "<span style='color:#ddd;'>" + this.$t('pdl._3') + '</span>'
          } else {
            v.STATUS_NAME = ''
          }
          html += '<tr style="line-height:40px"><td>' + v.OPERATION_SITE_NAME + '</td><td>' + v.CALL_TYPE_NAME + '</td><td>' + v.TIME_SPAN_NAME + '</td><td>' + v.STATUS_NAME + '</td></tr>'
        })
      }
      html += '</tbody>'
      this.AndonCallTable = html
    },
    // 设备保养
    async GetMachineMaintainData () {
      var maintainType = 1
      if (this.workIndex === 3) {
        maintainType = 1
      } else if (this.workIndex === 2) {
        maintainType = 2
      } else if (this.workIndex === 1) {
        maintainType = 3
      } else if (this.workIndex === 0) {
        maintainType = 4
      }
      const res = await GetMachineMaintainData({ 'location': this.workshopId, 'maintain_type': maintainType })
      if (res.Result) {
        this.machine = {
          MACHINE_QTY: res.Result.HASCHECK_QTY + res.Result.UNCHECK_QTY,
          HASCHECK_QTY: res.Result.HASCHECK_QTY,
          UNCHECK_QTY: res.Result.UNCHECK_QTY
        }
        this.machineList = res.Result.MACHINE_STATUS
      }
    },
    async getWoYidldPie () {
      /* =====================不良top5 仪表盘 init=========================== */
      this.WoYidldPie = echarts.init(document.getElementById('WoYieldPie'))
      var optionWo = null
      optionWo = {
        color: ['#F4AA61', '#4EC7B8', '#90C9F6', '#FE8463', '#B5C334'],
        series: [
          {
            type: 'pie',
            radius: [0, 86],
            center: ['50%', '46%'],
            label: {
              normal: {
                show: true,
                position: 'inner',
                textStyle: {
                  fontWeight: 300,
                  fontSize: 12 // 文字的字体大小
                },
                formatter: '{d}%'
              }
            },
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          {
            type: 'pie',
            radius: [0, 86],
            center: ['50%', '46%'],
            label: {
              normal: {
                show: true,
                textStyle: {
                  fontWeight: 300,
                  fontSize: 12 // 文字的字体大小
                },
                formatter: '{b}:{c}'
              }
            },
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.WoYidldPie.setOption(optionWo, true)

      /* =====================直通率 仪表盘 init=========================== */
      this.WoPassRatePie = echarts.init(document.getElementById('WoPassRatePie'))
      var optionWoPassRate = {
        radar: {
        // shape: 'circle',
          indicator: [
            { name: '', max: 0 }
          ]
        },
        series: [{
          type: 'radar',
          data: [
            {
              value: []
            }
          ]
        }]
      }
      this.WoPassRatePie.setOption(optionWoPassRate, true)

      /* =====================首件检验月 仪表盘 init=========================== */
      this.FirstPassRatePie = echarts.init(
        document.getElementById('FirstPassRatePie')
      )
      var optionFirstPassRate = null
      optionFirstPassRate = {
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
        color: '#4853e7',
        title: {
          text: '每小时产能',
          padding: [0, 0, 0, 10],
          textStyle: {
            color: '#FFF'
          }
        },
        legend: {
          data: ['产量'],
          right: '10%',
          top: '20px',
          textStyle: {
            color: '#4853e7',
            fontSize: 12
          },
          color: '#4853e7'
        },
        grid: {
          left: '0%',
          right: '6%',
          bottom: '6%',
          top: '20%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              color: '#fff', // x轴颜色
              fontWeight: 'normal',
              fontSize: '14',
              lineHeight: 18
            }
          }
        },
        yAxis: {
          type: 'category',
          data: [],
          axisLabel: {
            formatter: '{value}',
            color: '#fff'
          }
        },
        series: [
          {
            name: '产量',
            type: 'bar',
            data: [],
            itemStyle: {
              normal: {
                label: {
                  formatter: '{c}',
                  show: true,
                  textStyle: {
                    fontSize: '12',
                    color: '#c8aa72'
                  }
                }
              }
            }
          }
        ]
      }
      this.HourYieldBar.setOption(optionHourYield, true)

      /* ===================工序统计 柱状图 init============================= */
      this.ExLineDateBar = echarts.init(
        document.getElementById('ExLineDateBar')
      )
      var optionLineDate = {
        color: ['#7fec6c', '#ec445a', '#edda64'],
        legend: {
          textStyle: {
            color: '#fff',
            fontSize: 12
          },
          right: '10%',
          color: '#4853e7'
        },
        title: {
          text: '工序统计',
          padding: [0, 0, 0, 10],
          textStyle: {
            color: '#FFF'
          }
        },
        grid: {
          left: '0%',
          right: '6%',
          bottom: '8%',
          top: '20%',
          containLabel: true
        },
        dataset: {
          source: []
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              fontFamily: 'Microsoft YaHei',
              color: '#fff', // x轴颜色
              fontWeight: 'normal',
              fontSize: '14',
              lineHeight: 18
            }
          }
        },
        yAxis: {
          axisLabel: {
            formatter: '{value}',
            color: '#fff'
          }
        },
        series: [
          { type: 'bar' },
          { type: 'bar' },
          { type: 'bar' }
        ]
      }
      this.ExLineDateBar.setOption(optionLineDate, true)

      /* =====================设备保养 折线图 init=========================== */
      // this.AoiPassRatePie = echarts.init(
      //   document.getElementById('AoiPassRatePie')
      // )
      // var optionAoiPassRate = null
      // optionAoiPassRate = {
      //   color: ['#c35982', '#5eaee7', '#5abb51'],
      //   legend: {
      //     data: ['数据总量', '更新量', '共享次数'],
      //     icon: 'triangle',
      //     itemWidth: 12,
      //     itemHeight: 8,
      //     textStyle: {
      //       color: '#fff',
      //       fontSize: 12
      //     },
      //     top: '10px'
      //   },
      //   grid: {
      //     top: '20%',
      //     left: '2%',
      //     right: '4%',
      //     bottom: '8%',
      //     containLabel: true
      //   },
      //   xAxis: {
      //     type: 'category',
      //     boundaryGap: false,
      //     axisLabel: {
      //       textStyle: {
      //         fontFamily: 'Microsoft YaHei',
      //         color: '#fff', // x轴颜色
      //         fontWeight: 'normal',
      //         fontSize: '14',
      //         lineHeight: 18
      //       }
      //     },
      //     data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      //   },
      //   yAxis: {
      //     type: 'value',
      //     axisLabel: {
      //       color: '#fff'
      //     }
      //   },
      //   series: [
      //     {
      //       name: '数据总量',
      //       type: 'line',
      //       stack: '总量',
      //       data: [120, 132, 101, 134, 90, 230, 210]
      //     },
      //     {
      //       name: '更新量',
      //       type: 'line',
      //       stack: '总量',
      //       data: [220, 182, 191, 234, 290, 330, 310]
      //     },
      //     {
      //       name: '共享次数',
      //       type: 'line',
      //       stack: '总量',
      //       data: [150, 232, 201, 154, 190, 330, 410]
      //     }
      //   ]
      // }
      // this.AoiPassRatePie.setOption(optionAoiPassRate, true)

      /* =====================设备状态 仪表盘 init=========================== */
      this.WorkingPassRatePie = echarts.init(
        document.getElementById('WorkingPassRatePie')
      )
      var optionSpiPassRate = null
      optionSpiPassRate = {
        color: ['#4091f7', '#ec445a', '#edda64'],
        legend: {
          orient: 'vertical',
          x: 'right',
          y: 'center',
          padding: [0, 30, 0, 0],
          textStyle: {
            color: '#fff',
            fontSize: 14
          },
          align: 'left',
          icon: 'circle',
          itemWidth: 12,
          itemHeight: 12,
          itemGap: 30
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['40%', '80%'],
            center: ['30%', '53%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center',
                color: '#4c4a4a',
                formatter: '{active|设备总数}' + '\n\r' + '{total|' + 0 + '}',
                rich: {
                  total: {
                    fontSize: 18,
                    fontFamily: '微软雅黑',
                    color: '#fff'
                  },
                  active: {
                    fontFamily: '微软雅黑',
                    fontSize: 18,
                    color: '#fff',
                    lineHeight: 30
                  }
                }
              },
              emphasis: {// 中间文字显示
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              },
              tooltip: {
                show: false
              }
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '20',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 0, name: '使用中:0% (0)' },
              { value: 0, name: '维修中:0% (0)' },
              { value: 0, name: '闲置中:0% (0)' }
            ]
          }
        ]
      }
      this.WorkingPassRatePie.setOption(optionSpiPassRate, true)

      window.onresize = () => {
        this.WoYidldPie.resize()
        this.WoPassRatePie.resize()
        this.FirstPassRatePie.resize()
        this.HourYieldBar.resize()
        this.ExLineDateBar.resize()
        // this.AoiPassRatePie.resize()
        this.WorkingPassRatePie.resize()
      }
    }
  },
  watch: {
    workshopId (val) {
      if (val) {
        this.loadingData()
        this.dialogVisible = false
      } else {
        Object.assign(this.$data, this.$options.data(), {
          workList: this.workList
        })
        this.dialogVisible = true
      }
    }
  }
}

</script>
