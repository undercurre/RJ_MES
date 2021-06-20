<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select
          v-model="formData.lineId"
          style="width: 200px"
          clearable
          :placeholder="$t('SfcsEquipKeep._2')"
          class="common-top"
        >
          <el-option
            v-for="item in LinesList"
            :key="item.LINE_ID"
            :label="item.LINE_NAME"
            :value="item.LINE_ID"
          />
        </el-select>
        <div style="display: inline-block">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="日期"
            style="width: 200px"
          >
          </el-date-picker>
        </div>
        <el-input
          clearable
          v-model="formData.WO_NO"
          :placeholder="$t('SfcsDefectReportWork._1')"
          style="width: 200px"
          @keyup.enter.native="searchClick"
        />
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >&nbsp;
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click.prevent="cleanClick"
          >{{ $t("publics.btn.clear") }}</el-button
        >&nbsp;
        <el-button
          type="primary"
          icon="el-icon-receiving"
          @click.prevent="exportAllData"
          >{{ $t("publics.btn.export") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="report-header">
      <div class="report-header-title">工单号 :</div>
      <div class="report-header-content">{{ mainData.WO_NO }}</div>
      <div class="report-header-title">目标产量 :</div>
      <div class="report-header-content">{{ mainData.TARGET_QTY }}</div>
      <div class="report-header-title">当前产量 :</div>
      <div class="report-header-content">{{ mainData.TOTAL }}</div>
      <div class="report-header-title">机型 :</div>
      <div class="report-header-content">{{ mainData.MODEL }}</div>
    </div>
    <div style="font-weight: 600; padding: 10px 20px 10px 0; color: #676767">
      不良现象
    </div>
    <div class="table-container">
      <vxe-table
        ref="xTable"
        border
        resizable
        height="100%"
        size="medium"
        align="center"
        highlight-hover-row
        highlight-current-row
        show-overflow
        auto-resize
        keep-source
        stripe
        :loading="loading"
        :data="mainTable"
      >
        <vxe-table-column
          field="Name"
          :title="$t('SfcsQCReport._0')"
          :edit-render="{ name: '$text', props: { readonly: true } }"
        />
        <vxe-table-column
          field="time8"
          :title="$t('SfcsQCReport._1')"
          :edit-render="{ name: '$text', props: { readonly: true } }"
        />
        <vxe-table-column
          field="time10"
          :title="$t('SfcsQCReport._2')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="time13"
          :title="$t('SfcsQCReport._3')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="time15"
          :title="$t('SfcsQCReport._4')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="time18"
          :title="$t('SfcsQCReport._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="timeOther"
          :title="$t('SfcsQCReport._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="TOTAL"
          :title="$t('SfcsQCReport._7')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="report">
      <div style="font-weight: 600; padding: 10px 20px 0 20px">良率走势</div>
      <div id="errorCount"></div>
    </div>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import { Index, GetQCReportAsync } from '@/api/Kanban'
export default {
  name: 'IctReport',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        WO_NO: '', // 5101-20191114045
        lineId: '', // 64033
        date: ''
      },
      mainData: {}, // 主表统计
      loading: false,
      mainTable: [],
      LinesList: []
    }
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  created () {
    this.getIndex()
    // this.getLoadData()
  },
  methods: {
    async getIndex () {
      var ORGANIZE_ID = this.userinfo.ORGANIZE_ID
      const res = await Index({ ORGANIZE_ID })
      var data = JSON.parse(res.Result)
      this.LinesList = data.LineList
    },
    async getLoadData () {
      if (!this.formData.WO_NO || !this.formData.lineId) {
        this.$message.warning('请填写线体和工单')
        return
      }

      this.loading = true
      const res = await GetQCReportAsync(this.formData)
      if (res.Result) {
        var data = JSON.parse(res.Result).data[0] || {}
        this.mainData = data
        var mainTableData = []
        var dtlData = JSON.parse(res.Result).dtlData
        dtlData.forEach((e) => {
          var obj = mainTableData.find((p) => p.Name === e.DEFECT_DESCRIPTION)
          if (!obj) {
            mainTableData.push({
              Name: e.DEFECT_DESCRIPTION,
              time8: 0,
              time10: 0,
              time13: 0,
              time15: 0,
              time18: 0,
              timeOther: 0,
              TOTAL: 0
            })
            obj = mainTableData.find((p) => p.Name === e.DEFECT_DESCRIPTION)
          }
          if (e.HOUR >= 8 && e.HOUR <= 10) obj.time8 += e.COUNT
          else if (e.HOUR > 10 && e.HOUR <= 12) obj.time10 += e.COUNT
          else if (e.HOUR > 10 && e.HOUR <= 12) obj.time10 += e.COUNT
          else if (e.HOUR > 12 && e.HOUR <= 15) obj.time13 += e.COUNT
          else if (e.HOUR > 15 && e.HOUR <= 17) obj.time15 += e.COUNT
          else if (e.HOUR > 17 && e.HOUR <= 20) obj.time18 += e.COUNT
          else obj.timeOther += e.COUNT
          obj.TOTAL += e.COUNT
        })
        if (dtlData.length > 0) {
          var total = {
            Name: '总计',
            time8: 0,
            time10: 0,
            time13: 0,
            time15: 0,
            time18: 0,
            timeOther: 0,
            TOTAL: 0
          }
          mainTableData.forEach((e) => {
            total.time8 += e.time8
            total.time10 += e.time10
            total.time13 += e.time13
            total.time15 += e.time15
            total.time18 += e.time18
            total.timeOther += e.timeOther
            total.TOTAL += e.TOTAL
          })
          mainTableData.push(total)
          var resultData = JSON.parse(res.Result).resultData

          var checkCount = {
            Name: '检验数',
            time8: 0,
            time10: 0,
            time13: 0,
            time15: 0,
            time18: 0,
            timeOther: 0,
            TOTAL: 0
          }
          resultData.forEach((e) => {
            if (e.HOUR >= 8 && e.HOUR <= 10) checkCount.time8 += e.COUNT
            else if (e.HOUR > 10 && e.HOUR <= 12) checkCount.time10 += e.COUNT
            else if (e.HOUR > 10 && e.HOUR <= 12) checkCount.time10 += e.COUNT
            else if (e.HOUR > 12 && e.HOUR <= 15) checkCount.time13 += e.COUNT
            else if (e.HOUR > 15 && e.HOUR <= 17) checkCount.time15 += e.COUNT
            else if (e.HOUR > 17 && e.HOUR <= 20) checkCount.time18 += e.COUNT
            else checkCount.timeOther += e.COUNT
            checkCount.TOTAL += e.COUNT
          })
          mainTableData.push(checkCount)
          var pct = {
            Name: '良率',
            time8:
              checkCount.time8 === 0
                ? ''
                : 100 -
                  ((total.time8 / checkCount.time8) * 100).toFixed(1) +
                  '%',
            time10:
              checkCount.time10 === 0
                ? ''
                : 100 -
                  ((total.time10 / checkCount.time10) * 100).toFixed(1) +
                  '%',
            time13:
              checkCount.time13 === 0
                ? ''
                : 100 -
                  ((total.time13 / checkCount.time13) * 100).toFixed(1) +
                  '%',
            time15:
              checkCount.time15 === 0
                ? ''
                : 100 -
                  ((total.time15 / checkCount.time15) * 100).toFixed(1) +
                  '%',
            time18:
              checkCount.time18 === 0
                ? ''
                : 100 -
                  ((total.time18 / checkCount.time18) * 100).toFixed(1) +
                  '%',
            timeOther:
              checkCount.timeOther === 0
                ? ''
                : 100 -
                  ((total.timeOther / checkCount.timeOther) * 100).toFixed(1) +
                  '%',
            TOTAL:
              checkCount.TOTAL === 0
                ? ''
                : 100 -
                  ((total.TOTAL / checkCount.TOTAL) * 100).toFixed(1) +
                  '%'
          }
          mainTableData.push(pct)

          var titles = [
            '8:00-10:00',
            '10:01-11:30',
            '13:00-15:00',
            '15:01-17:00',
            '18:00-20:00',
            '其他'
          ]
          var nums = [
            checkCount.time8 - total.time8,
            checkCount.time10 - total.time10,
            checkCount.time13 - total.time13,
            checkCount.time15 - total.time15,
            checkCount.time18 - total.time18,
            checkCount.timeOther - total.timeOther
          ]
          var nums2 = [
            total.time8,
            total.time10,
            total.time13,
            total.time15,
            total.time18,
            total.timeOther
          ]
          var pcts = [
            pct.time8,
            pct.time10,
            pct.time13,
            pct.time15,
            pct.time18,
            pct.timeOther
          ]

          this.setReport(titles, nums, nums2, pcts)
        } else {
          this.setReport([], [], [], [])
        }
        this.mainTable = mainTableData
        this.totalPage = res.TotalCount
        this.loading = false
      } else {
        this.loading = false
      }
    },
    setReport (titles, nums, nums2, pcts) {
      var data = []
      nums.forEach((e) => {
        data.push({
          value: e,
          label: {
            show: e !== 0
          }
        })
      })
      var data2 = []
      nums2.forEach((e) => {
        data2.push({
          value: e,
          label: {
            show: e !== 0
          }
        })
      })
      var option = {
        grid: [
          {
            top: 60
          }
        ],
        legend: {
          show: true,
          x: 'center',
          data: ['正常', '异常', '良率']
        },
        tooltip: {
          trigger: 'axis',
          formatter: (comp, value) => {
            const [serie] = comp

            return `${serie.seriesName} ${serie.name}: ${Math.round(
              serie.value
            )} `
          },
          axisPointer: {
            show: true,
            status: 'shadow',
            z: -1,
            shadowStyle: {
              color: '#E6F7FF'
            },
            type: 'shadow'
          }
        },
        xAxis: [
          {
            position: 'bottom',
            type: 'category',
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ECF1F6'
              }
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 0,
              fontSize: 12,
              color: '#3A3A3C'
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#ECF1F6', '#ECF1F6'],
                width: 0,
                type: 'dashed'
              }
            },
            gridIndex: 0,
            data: titles
          },
          {
            type: 'category',
            gridIndex: 1,
            show: false
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              rotate: 0,
              fontSize: 12,
              color: '#6E7D9C',
              formatter: (value, index) => `${value} `
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: ['#ECF1F6', '#ECF1F6'],
                width: 1,
                type: 'solid'
              }
            },
            min: 0,
            gridIndex: 0
          },
          {
            type: 'value',
            name: '良率',
            nameTextStyle: {
              color: '#396A87',
              fontSize: 14
            },
            position: 'right',
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#396A87',
                width: 2
              }
            },
            axisLabel: {
              show: true,
              formatter: '{value} %', // 右侧Y轴文字显示
              textStyle: {
                color: '#396A87',
                fontSize: 14
              }
            }
          }
        ],
        series: [
          {
            name: '正常',
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#3D8BF0',
              fontWeight: 'bold'
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              color: '#43A7FF'
            },
            type: 'bar',
            data: data,
            barMaxWidth: '20%',
            z: 3
          },
          {
            name: '异常',
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: 'red',
              fontWeight: 'bold'
            },
            xAxisIndex: 0,
            yAxisIndex: 0,
            itemStyle: {
              color: 'red'
            },
            type: 'bar',
            data: data2,
            barMaxWidth: '20%',
            z: 3
          },
          {
            name: '良率',
            yAxisIndex: 1,
            type: 'line',
            smooth: false,
            symbol: 'circle',
            symbolSize: 10,
            label: {
              show: true,
              position: 'top',
              fontSize: 14,
              color: '#00EAFF',
              fontWeight: 'bold',
              formatter: (val) => {
                return val.value + '%'
              }
            },
            lineStyle: {
              normal: {
                width: 2
              }
            },
            itemStyle: {
              normal: {
                color: '#00EAFF',
                borderColor: '#fff',
                borderWidth: 1
              }
            },
            data: pcts
          }
        ]
      }
      var report = echarts.init(document.getElementById('errorCount'))
      report.clear()
      report.setOption(option)
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {}
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.getLoadData()
    },
    async exportAllData () {
      this.$refs.xTable.exportData({
        filename: 'QC报表',
        type: 'csv',
        isHeader: true,
        isFooter: true,
        data: this.mainTable
      })
    }
  }
}
</script>

<style scoped="scoped">
.table-container {
  height: calc(60vh - 60px - 74px - 73px) !important;
}

.report {
  position: absolute;
  top: calc(60vh - 60px);
  bottom: 0px;
  left: 0;
  right: 0px;
  background: white;
  border-top: 1px solid #cfd7e5;
}

#errorCount {
  height: calc(100% - 40px);
}

.report-header {
  display: flex;
  padding: 5px 0 14px 0px;

  border-bottom: 1px dashed #ddd;
}

.report-header-title {
  margin-left: 50px;
  color: #888888;
  font-weight: 600;
  font-size: 14px;
}

.report-header .report-header-title:nth-child(1) {
  margin-left: 0;
}

.report-header-content {
  color: #888888;
  font-size: 14px;
  padding-left: 5px;
}
</style>
