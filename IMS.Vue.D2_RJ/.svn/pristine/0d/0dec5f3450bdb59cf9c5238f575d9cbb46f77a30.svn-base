<template>
  <d2-container class="SfcsEquipProduct">
    <template slot="header">
      <custom-container-header>
        <el-select
                  multiple
                  @visible-change="handelVisible"
                  @change="changeModel"
                  v-model="echartForm.LINE_ID"
                  style="width: 200px"
                  :placeholder="$t('_kanban._25')"
                  ref="fieldSelect"
                >
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      top: 0;
                      z-index: 99;
                    "
                  ></div>
                  <div
                    style="
                      position: absolute;
                      width: 100%;
                      height: 6px;
                      background: #fff;
                      background: #fff;
                      bottom: 0;
                      z-index: 99;
                    "
                  ></div>
                  <div
                    style="
                      width: 600px;
                      display: flex;
                      padding: 0 20px 0 10px;
                      position: sticky;
                      top: 6px;
                      background: #fff;
                      z-index: 90;
                    "
                  >
                    <el-input
                      v-model="formData.Key"
                      @input="searchClick"
                      @keyup.enter.native="searchClick"
                      placeholder="请输入线别名称"
                    ></el-input>
                    <el-button
                      type="primary"
                      icon="el-icon-search"
                      @click.prevent="searchClick"
                      >{{ $t("publics.btn.search") }}</el-button
                    >
                  </div>
                  <el-option
                    v-for="item in modelData"
                    :key="item.ID"
                    :label="item.NAME"
                    :value="item.ID"
                    :disabled="item.disabled"
                  >
                    <span style="float: left">{{ item.NAME }}</span>
                  </el-option>
                  <div
                    style="
                      width: 600px;
                      position: sticky;
                      bottom: 6px;
                      background: #fff;
                      z-index: 90;
                      padding-left: 15px;
                    "
                  >
                    <el-pagination
                      :pager-count="5"
                      :current-page="formData.Page"
                      :page-size="formData.Limit"
                      :page-sizes="[10, 20, 30, 40]"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formDataPage"
                      @size-change="modelSizeChange"
                      @current-change="modelCurrentChange"
                    />
                  </div>
        </el-select>&nbsp;
        <el-date-picker
                    style="width:250px"
                    v-model="selectTime"
                    type="daterange"
                    align="right"
                    :unlink-panels="true"
                    :clearable="false"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions">
        </el-date-picker>&nbsp;
        <el-button
                type="primary"
                style="margin-left: 10px;"
                icon="el-icon-search"
                @click="handelStatisticsList"
                >{{ $t("srr._4") }}</el-button
              >&nbsp;
         <el-button
                type="info"
                style="margin-left: 10px;"
                @click="handelResetBtn"
                icon="el-icon-refresh-left"
          >{{ $t("navbar.reset") }}</el-button>&nbsp;
         <el-button
                style="margin-left: 10px;"
                type="success"
                @click="handelExportExcel"
                icon="el-icon-refresh-left"
                >{{ $t("publics.btn.export_document") }}</el-button
              >&nbsp;
        <!-- <el-button
                 style="margin-left: 10px;"
                type="warning"
                @click="handelDetails"
                icon="el-icon-s-order"
                >时段明细</el-button
              > -->
      </custom-container-header>
    </template>
    <!-- 中 -->
    <el-row style="margin-top: 0px">
      <el-tabs
        v-model="eIndex"
        @tab-click="handleClick"
        class="tabHeight"
        type="border-card"
        ref="tableTransfer"
      >
        <el-tab-pane name="BE_DAY" label="生产时段-日">
          <div
            ref="Histogram_BE_DAY"
            id="Histogram_BE_DAY"
            style="height:360px"
          />
        </el-tab-pane>
        <el-tab-pane name="BE_WEEK" label="生产时段-周">
          <div
            ref="Histogram_BE_WEEK"
            id="Histogram_BE_WEEK"
            style="height:360px"
          />
        </el-tab-pane>
        <el-tab-pane name="BE_MONTH" label="生产时段-月">
          <div
            ref="Histogram_BE_MONTH"
            id="Histogram_BE_MONTH"
            style="height:360px"
          />
        </el-tab-pane>
      </el-tabs>
    </el-row>
  <!-- 下 -->
    <el-row style="margin-top: 10px">
      <el-tabs
        class="tabHeight"
        type="border-card"
        ref="tableTransfer"
      >
        <el-tab-pane  label="时段明细">
           <vxe-table ref="DetailsTable"
                   border
                   resizable
                   height="300px"
                   size="medium"
                   align="center"
                   highlight-current-row
                   highlight-hover-row
                   show-overflow
                   auto-resize
                   keep-source
                   stripe
                   :data="exportData"
                   empty-text="没有更多数据了！"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">

                   <vxe-table-column v-for="(item,index) in vxeTabelDetails" :key="index" :field="item.prop"  :title="item.label"></vxe-table-column>
        </vxe-table>
        </el-tab-pane>

      </el-tabs>
    </el-row>

    <!-- 时段明细 -->
    <el-dialog v-dialogDrag
               title="产线时段明细"
               :visible.sync="stsyVisible"
               :close-on-click-modal="false"
               width="60%">
      <div class="Routetable">
        <vxe-table ref="RoutexTable"
                   border
                   resizable
                   height="100%"
                   size="medium"
                   align="center"
                   highlight-current-row
                   highlight-hover-row
                   show-overflow
                   auto-resize
                   keep-source
                   stripe
                   :data="RouteTable"
                   empty-text="没有更多数据了！"
                   :mouse-config="{selected: true}"
                   :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                   :radio-config="{labelField: 'name', trigger: 'row'}"
                   :checkbox-config="{checkField: 'checked', trigger: 'row'}">

                   <vxe-table-column field="LINE_NAME" title="线体名称"></vxe-table-column>
                   <vxe-table-column field="ACTUAL_QTY" title="实际值"></vxe-table-column>
                   <vxe-table-column field="TARGET_QTY" title="目标值"></vxe-table-column>
                   <vxe-table-column field="RATE" title="达成率"></vxe-table-column>
                   <vxe-table-column field="TIME" title="时间"></vxe-table-column>
        </vxe-table>
      </div>
      <!-- 分页 -->
      <div style="margin-top: 15px;">
        <el-pagination :current-page="Systemfine.Page"
                       :page-size="Systemfine.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="Routetotal"
                       @size-change="RouteSizeChange"
                       @current-change="RouteCurrentChange" />
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import {
  GetSiteStatisticsConditionList,
  LineProductionCapacityByTime,
  CapacityRateDetailsByLine
} from '@/api/WorkInProgressReport'
import echarts from 'echarts'
import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'SfcsEquipProduct',
  components: {
    customContainerHeader
  },
  data () {
    return {
      echartForm: {
        LINE_ID: [],
        BEGIN_DATE: '',
        END_DATE: ''
      },
      Systemfine: {
        LINE_ID: [],
        TYPE: 'BE_DAY',
        TIME: '',
        Page: 1,
        Limit: 15,
        Key: ''
      },
      RouteTable: [],
      Routetotal: 0,
      stsyVisible: false,
      pickerOptions: {
        onPick: ({ maxDate, minDate }) => {
          this.selectTime = minDate.getTime()
          if (maxDate) {
            this.selectTime = ''
          }
        },
        disabledDate: (time) => {
          if (this.selectTime !== '') {
            const one = 30 * 24 * 3600 * 1000
            const minTime = this.selectTime - one
            const maxTime = this.selectTime + one
            return time.getTime() < minTime || time.getTime() > maxTime
          }
        }
      },
      selectTime: '',
      modelData: [],
      formData: {
        Key: '',
        Limit: 10,
        Page: 1,
        TYPE: 4
      },
      formDataPage: 0,
      tempData: {},
      eIndex: 'BE_DAY',
      exportData: [], // 处理导出数据
      exportKeys: [], // 导出prop KEY
      legend: [], // 图表注解
      vxeTabelDetails: [],
      colums: null
    }
  },
  mounted () {
    this.getSiteStatisticsConditionList()
  },
  methods: {
    async CapacityRateDetailsByLine () {
      const res = await CapacityRateDetailsByLine(this.Systemfine)
      if (res.Result) {
        this.RouteTable = res.Result ? res.Result : []
        this.Routetotal = res.TotalCount ? res.TotalCount : 0
      }
      console.log(res)
    },
    RouteSizeChange (val) {
      this.Systemfine.Limit = val
      this.CapacityRateDetailsByLine()
    },
    RouteCurrentChange (val) {
      this.Systemfine.Page = val
      this.CapacityRateDetailsByLine()
    },
    dealDisabledDate (time) {
      // 一天的毫秒数 = 8.64e7  判断时在return处可进行加减
      let curDate = (new Date()).getTime()
      let day = 30 * 24 * 3600 * 1000
      let dateRegion = curDate - day
      return time.getTime() > Date.now() || time.getTime() < dateRegion
    },
    // 导出文档
    handelExportExcel () {
      if (this.exportData && this.exportData.length <= 0) {
        return this.$message({
          message: '当前图表暂无数据',
          type: 'warning'
        })
      }
      // let columns = [
      //   {
      //     label: '时间',
      //     prop: 'time'
      //   }
      // ]

      // this.legend.map((item, index) => {
      //   columns.push({
      //     label: item,
      //     prop: this.exportKeys[index]
      //   })
      // })
      console.log(this.vxeTabelDetails)
      // console.log(columns)

      this.$export.excel({
        columns: this.vxeTabelDetails,
        data: this.exportData,
        title: `产线生产时段报表`
      })

      this.$notify.success({
        title: '导出文档',
        message: '导出成功'
      })
    },
    // 重置
    handelResetBtn () {
      this.formData = {
        Key: '',
        Limit: 10,
        Page: 1,
        TYPE: 4
      }
      this.echartForm = {
        LINE_ID: [],
        BEGIN_DATE: '',
        END_DATE: ''
      }
      this.formDataPage = 0
      this.selectTime = ''
    },
    handleClick (tab, event) {
      this.vxeTabelDetails = []
      this.exportData = []
      this.legend = []
      this.exportKeys = []
      console.log(this.tempData)
      if (Object.keys(this.tempData).length === 0) return
      this.getHistogram(this.tempData[tab.name], tab.name)
    },
    // 查询点击
    handelStatisticsList () {
      if (this.echartForm.LINE_ID && this.echartForm.LINE_ID.length <= 0) {
        return this.$message({
          message: '请选择线别',
          type: 'warning'
        })
      }
      if (this.selectTime === '' || (this.selectTime && this.selectTime.length <= 0)) {
        return this.$message({
          message: '请选择截止时间',
          type: 'warning'
        })
      }
      this.echartForm.BEGIN_DATE = this.selectTime[0]
      this.echartForm.END_DATE = this.selectTime[1]
      this.LineProductionCapacityByTime()
      console.log(this.echartForm)
    },
    async LineProductionCapacityByTime () {
      const res = await LineProductionCapacityByTime(this.echartForm)
      if (res.Result) {
        this.tempData = res.Result
        this.getHistogram(this.tempData[this.eIndex], this.eIndex)
      }
    },
    // 获取线体列表
    async getSiteStatisticsConditionList () {
      const res = await GetSiteStatisticsConditionList(this.formData)
      this.modelData = res.Result.data ? res.Result.data : []
      this.formDataPage = res.Result.count ? res.Result.count : 0
    },
    handelVisible (e) {
      if (!e) {
        this.formData.Page = 1
        this.formData.Key = ''
        this.getSiteStatisticsConditionList()
      }
    },
    changeModel (e) {},
    searchClick () {
      this.formData.Page = 1
      this.getSiteStatisticsConditionList()
    },
    modelSizeChange (Limit) {
      this.formData.Limit = Limit
      this.getSiteStatisticsConditionList()
    },
    modelCurrentChange (Page) {
      this.formData.Page = Page
      this.getSiteStatisticsConditionList()
    },
    // 去重处理
    unique (arr) {
      return Array.from(new Set(arr))
    },
    // 数组分组处理
    getDataGroup (data, key) {
      let groups = {}
      data.forEach(c => {
        let value = c[key]
        groups[value] = groups[value] || []
        groups[value].push(c)
      })
      return groups
    },
    // 柱状图
    async getHistogram (data, typeID) {
      console.log(data)
      if (data && data.length !== 0) {
        let arrX = []
        this.legend = []
        await data.map((item, index) => {
          arrX.push(item.TIME)
        })
        arrX = this.unique(arrX)
        data = this.getDataGroup(data, 'LINE_ID')
        console.log(data)

        var series = []
        let flag = 0
        // 处理导出数据
        arrX.map((v) => {
          var obj = {}
          obj.time = v
          this.exportData.push(obj)
        })
        Object.keys(data).forEach((key, index) => {
          this.exportKeys.push(key) // 添加下载key
          // 根据key找线体名称
          if (data[key][0].LINE_NAME == null) {
            this.legend.push('汇总')
          } else {
            this.legend.push(data[key][0].LINE_NAME)
          }
          let obj = { data: [],
            type: 'bar',
            name: this.legend[index],
            customKey: 'Spenan',
            itemStyle: {
              normal: {
                label: {
                  show: false, // 开启显示
                  position: 'top', // 在上方显示
                  textStyle: {
                    // 数值样式
                    color: '#606266',
                    fontSize: 14
                  }
                }
              }
            } }
          data[key].map((item) => {
            obj.data.push(item.RATE)

            if (flag <= data[key].length - 1) {
              this.exportData[flag][key] = item.RATE
            }
            flag++
          })
          flag = 0
          series.push(obj)
        })
        this.vxeTabelDetails = []
        let columns = [
          {
            label: '时间',
            prop: 'time'
          }
        ]

        this.legend.map((item, index) => {
          columns.push({
            label: item,
            prop: this.exportKeys[index]
          })
        })
        this.vxeTabelDetails = columns

        // let flag = 0
        // Object.keys(data).forEach((key) => {
        //   console.log(key)
        //   data[key].map((item, index) => {
        //     console.log(index, data[key].length)
        //     if (flag <= data[key].length) {
        //       exportData[flag++][key] = item.RATE
        //       console.log(exportData)
        //     } else {
        //       flag = 0
        //     }
        //   })
        // })

        console.log('------SPenan')
        console.log(this.exportData)
        console.log('------SPenan')
        console.log(series)

        this.HistogramCheart = echarts.init(
          document.getElementById('Histogram_' + typeID)
        )
        console.log(this.HistogramCheart)
        var optionHistogram = null
        optionHistogram = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          title: {
            text: '产线生产时段图表',
            subtext: '数据来自生产信息'
          },
          legend: {
            data: this.legend
          },
          grid: {
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          dataZoom: [
            {
              show: true,
              realtime: true,
              start: 0,
              end: 100
            },
            {
              type: 'inside',
              realtime: true,
              start: 0,
              end: 100
            }
          ],
          xAxis: {
            type: 'category',
            axisLabel: {
              interval: 0,
              rotate: 40
            },
            data: arrX
          },
          yAxis: {
            type: 'value'
          },
          series
        }
        this.HistogramCheart.hideLoading() // 隐藏加载动画
        this.HistogramCheart.setOption(optionHistogram, true)
        this.HistogramCheart.resize()
        this.HistogramCheart.off('click')
        this.HistogramCheart.on('click', (params) => {
          // 线体ID
          const LINE_ID = parseInt(this.exportKeys[params.seriesIndex])
          this.Systemfine.TYPE = this.eIndex
          this.Systemfine.TIME = params.name
          this.Systemfine.LINE_ID = []
          if (LINE_ID === 0) {
            this.Systemfine.LINE_ID = this.echartForm.LINE_ID
            this.CapacityRateDetailsByLine()
          } else {
            this.Systemfine.LINE_ID.push(LINE_ID)
            this.CapacityRateDetailsByLine()
          }
          this.stsyVisible = true
        })
        window.onresize = () => {
          this.HistogramCheart.resize()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-select__tags {
  white-space: nowrap;
  overflow: hidden;
  flex-wrap: nowrap;
  overflow-x: scroll;
  scrollbar-width: none;
  -ms-overflow-style: none;
}
::v-deep .el-select__tags::-webkit-scrollbar { /* WebKit */
    width: 0;
    height: 0;}

::v-deep .box-card .el-card__body{
    padding-top: 10px  !important;
}
</style>
<style>

</style>
