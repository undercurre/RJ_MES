<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
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
      </custom-container-header>
    </template>
    <!-- 表格 -->
    <div class="report-header">
      <div class="report-header-title">工单号 :</div>
      <div class="report-header-content">{{ mainData.WO_NO }}</div>
      <div class="report-header-title">总数 :</div>
      <div class="report-header-content">{{ mainData.TOTAL_PANES }}</div>
      <div class="report-header-title">正常 :</div>
      <div class="report-header-content">{{ mainData.PASS_TOTAL }}</div>
      <div class="report-header-title">异常 :</div>
      <div class="report-header-content">{{ mainData.FAIL_TOTAL }}</div>
      <div class="report-header-title">主板良率 :</div>
      <div class="report-header-content">{{ mainData.PASS_RATE }}%</div>
    </div>
    <div style="font-weight: 600; padding: 10px 20px 10px 0; color: #676767">
      子板品质统计
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
        :mouse-config="{ selected: true }"
      >
        <vxe-table-column
          field="Name"
          :title="$t('IctReport._1')"
          :edit-render="{ name: '$text', props: { readonly: true } }"
        />
        <vxe-table-column
          field="Pass"
          :title="$t('IctReport._2')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="UnPass"
          :title="$t('IctReport._3')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="PassRate"
          :title="$t('IctReport._4')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="UnPassComponent"
          :title="$t('IctReport._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="report">
      <div style="font-weight: 600; padding: 10px 20px 0 20px">
        子板品质走势
      </div>
      <div id="errorCount"></div>
    </div>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import echarts from 'echarts'
import { GetIctDataAsync } from '@/api/Kanban'
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
        WO_NO: ''
        // WO_NO:'',
      },
      mainData: {
        WO_NO: '',
        PASS_TOTAL: 0,
        FAIL_TOTAL: 0,
        TOTAL_PANES: 0,
        PASS_RATE: 0
      }, // 主表统计
      loading: false,
      mainTable: []
    }
  },
  created () {
    // this.getLines()
    // this.getLoadData()
  },
  methods: {
    // async getLines () {
    //   const res = await GetLinesList()
    //   this.LineList = res.Result ? res.Result : []
    // },
    async getLoadData () {
      this.loading = true
      const res = await GetIctDataAsync(this.formData)

      if (res.Result) {
        var data = JSON.parse(res.Result).data[0]
        this.mainData.WO_NO = this.formData.WO_NO
        this.mainData.PASS_TOTAL = data.PASS_TOTAL || 0
        this.mainData.FAIL_TOTAL = data.FAIL_TOTAL || 0
        this.mainData.TOTAL_PANES = data.TOTAL_PANES || 0
        if (this.mainData.PASS_TOTAL > 0 || this.mainData.FAIL_TOTAL > 0) {
          this.mainData.PASS_RATE = (
            (this.mainData.PASS_TOTAL /
              (this.mainData.PASS_TOTAL + this.mainData.FAIL_TOTAL)) *
            100
          ).toFixed()
        } else {
          this.mainData.PASS_RATE = 0
        }
        var mainTableData = []
        var dtlData = JSON.parse(res.Result).dtlData[0]
        if (dtlData) {
          mainTableData.push({
            Name: 'EC Jet',
            Pass: dtlData.PANE_RESULT1_PASS || '',
            UnPass: dtlData.PANE_RESULT1_FAIL || '',
            UnPassComponent: '-',
            PassRate: ''
          })
          mainTableData.push({
            Name: '短路测试',
            Pass: dtlData.PANE_RESULT2_PASS || '',
            UnPass: dtlData.PANE_RESULT2_FAIL || '',
            UnPassComponent: '-',
            PassRate: ''
          })
          mainTableData.push({
            Name: '开路检测',
            Pass: dtlData.PANE_RESULT3_PASS || '',
            UnPass: dtlData.PANE_RESULT3_FAIL || '',
            UnPassComponent: '-',
            PassRate: ''
          })
          mainTableData.push({
            Name: '元件测试',
            Pass: dtlData.PANE_RESULT4_PASS || '',
            UnPass: dtlData.PANE_RESULT4_FAIL || '',
            UnPassComponent: dtlData.TOTAL_COMPONENT_FAILS,
            PassRate: ''
          })
          mainTableData.push({
            Name: 'IC开路测试',
            Pass: dtlData.PANE_RESULT5_PASS || '',
            UnPass: dtlData.PANE_RESULT5_FAIL || '',
            UnPassComponent: '-',
            PassRate: ''
          })
        }

        for (var i = 0; i < mainTableData.length; i++) {
          mainTableData[i].Pass = mainTableData[i].Pass || 0
          mainTableData[i].UnPass = mainTableData[i].UnPass || 0

          if (mainTableData[i].Pass > 0 || mainTableData[i].UnPass > 0) {
            mainTableData[i].PassRate =
              (
                (mainTableData[i].Pass /
                  (mainTableData[i].Pass + mainTableData[i].UnPass)) *
                100
              ).toFixed() + '%'
          } else {
            mainTableData.splice(i, 1)
            i--
          }
        }

        this.totalPage = res.TotalCount
        this.loading = false
        var errorCount = JSON.parse(res.Result).resultData
        var titles = []
        var nums = []
        var nums2 = []
        var pcts = []
        errorCount.forEach((e) => {
          titles.push(e.TEST_DATE)
          nums.push(e.PASS_TOTAL)
          nums2.push(e.FAIL_TOTAL)
          var pct = 0
          if ((e.PASS_TOTAL || 0) + (e.FAIL_TOTAL || 0) > 0) {
            pct = (
              (e.PASS_TOTAL / (e.PASS_TOTAL + e.FAIL_TOTAL)) *
              100
            ).toFixed()
          }
          pcts.push(pct)
        })
        while (titles.length < 5) {
          titles.push('')
          nums.push(0)
          nums2.push(0)
        }
        this.setReport(titles, nums, nums2, pcts)

        this.mainTable = mainTableData
      } else {
        this.loading = false
      }
    },
    setReport (titles, nums, nums2, pcts) {
      console.log(pcts)
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
