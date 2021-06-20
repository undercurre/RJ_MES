<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select
          v-model="formData.WORK_CLASS"
          clearable
          style="width: 150px"
          :placeholder="$t('DefectsRecords._01')"
        >
          <el-option
            v-for="item in WorkClassList"
            :key="item.LOOKUP_CODE"
            :label="item.CLASS_NAME"
            :value="item.ID"
          /> </el-select
        >&nbsp;
        <el-select
          v-model="formData.LINE_ID"
          clearable
          style="width: 150px"
          :placeholder="$t('DefectsRecords.LINE_NAME')"
        >
          <el-option
            v-for="item in LinesList"
            :key="item.ID"
            :label="item.LINE_NAME"
            :value="item.ID"
          /> </el-select
        >&nbsp;
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
    <div style="font-weight: 600; padding: 10px 20px 10px 0; color: #676767">
      不良统计
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
          field="LOCATION"
          :title="$t('DefectsRecords.LOCATION')"
          :edit-render="{ name: '$text', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DEFECT_DESCRIPTION"
          :title="$t('DefectsRecords.DEFECT_NAME')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ALL_QTY"
          :title="$t('DefectsRecords.ALL_QTY')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DEFECT_QTY"
          :title="$t('DefectsRecords.DEFECT_QTY')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <div class="report" style="height: 320px">
      <div style="font-weight: 600; padding: 10px 20px 0 20px">不良走势</div>
      <div id="errorCount" style="height: 100%"></div>
    </div>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import echarts from 'echarts'
import { GetReportDataAsync, Index } from '@/api/SmtDefectsRecords'
export default {
  name: 'DefectReport',
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
      mainTable: [],
      LinesList: [],
      WorkClassList: [
        { CLASS_NAME: 'A班', ID: 0 },
        { CLASS_NAME: 'B班', ID: 1 }
      ]
    }
  },
  created () {
    this.getLines()
    this.getLoadData()
  },
  methods: {
    async getLines () {
      const res = await Index()
      if (res.Result) {
        this.LinesList = res.Result.LinesList
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await GetReportDataAsync(this.formData)
      if (res.Result) {
        var data = res.Result || []
        // eslint-disable-next-line no-tabs
        this.mainTable = data
        this.totalPage = res.TotalCount
        this.loading = false
        var errorCount = res.Result
        var titles = []
        var allqty = []
        var defctqty = []
        var lqty = []
        errorCount.forEach((e) => {
          titles.push(e.XTITEL)
          allqty.push(e.ALL_QTY)
          defctqty.push(e.DEFECT_QTY)
          lqty.push(e.L_QTY)
        })
        while (titles.length < 5) {
          titles.push('')
          allqty.push(0)
          defctqty.push(0)
        }
        this.setReport(titles, allqty, defctqty, lqty)
      } else {
        this.loading = false
      }
    },
    setReport (titles, allqty, defctqty, lqty) {
      var data = []
      allqty.forEach((e) => {
        data.push({
          value: e,
          label: {
            // eslint-disable-next-line
            show: e != 0,
          }
        })
      })
      var data2 = []
      defctqty.forEach((e) => {
        data2.push({
          value: e,
          label: {
            // eslint-disable-next-line
            show: e != 0,
          }
        })
      })
      var option = {
        grid: [
          {
            top: 50
          }
        ],
        legend: {
          show: true,
          x: 'center',
          data: ['送检数', '不良数', '不良率']
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
            name: '不良率',
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
            name: '送检数',
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
            data: allqty,
            barMaxWidth: '20%',
            z: 3
          },
          {
            name: '不良数',
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
            data: defctqty,
            barMaxWidth: '20%',
            z: 3
          },
          {
            name: '不良率',
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
            data: lqty
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
  height: calc(60vh - 60px - 74px - 73px - 30px) !important;
}

.report {
  position: absolute;
  top: calc(60vh - 60px);
  bottom: 80px;
  left: 0;
  right: 20px;
  background: white;
  border-top: 1px solid #cfd7e5;
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
