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
      <div class="report-header-title">料号 :</div>
      <div class="report-header-content">{{ mainData.PART_NO }}</div>
      <div class="report-header-title">机型 :</div>
      <div class="report-header-content">{{ mainData.MODEL }}</div>
      <div class="report-header-title">PCB测试总数 :</div>
      <div class="report-header-content">{{ mainData.TOTAL }}</div>
      <div class="report-header-title">通过PCB板 :</div>
      <div class="report-header-content">{{ mainData.PASS }}</div>
      <div class="report-header-title">不良PCB板 :</div>
      <div class="report-header-content">{{ mainData.UNPASS }}</div>
      <div class="report-header-title">通过率 :</div>
      <div class="report-header-content">{{ mainData.PASS_RATE }}%</div>
    </div>
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
      >
        <vxe-table-column field="MACHINE" :title="$t('AoiReport._1')" />
        <vxe-table-column field="PN" :title="$t('AoiReport._2')" />
        <vxe-table-column field="ELEMENT_NAME" :title="$t('AoiReport._3')" />
        <vxe-table-column field="ELEMENT_LOC" :title="$t('AoiReport._4')" />
        <vxe-table-column field="NG_NAME" :title="$t('AoiReport._5')" />
        <vxe-table-column field="NUM" :title="$t('AoiReport._6')" />
      </vxe-table>
    </div>
    <div class="report">
      <div style="font-weight: 600; padding: 10px 20px 0 20px">
        {{ $t("AoiReport._7") }}
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
import { GetAoiDataAsync } from '@/api/Kanban'
export default {
  name: 'AoiReport',
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
        // WO_NO:'',
        WO_NO: ''
      },
      mainData: {
        WO_NO: '',
        PART_NO: '',
        MODEL: '',
        TOTAL: 0,
        PASS: 0,
        UNPASS: 0,
        PASS_RATE: 0
      }, // 主表统计
      LineList: [], // 线体/产线
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
      if (!this.formData.WO_NO) {
        // 显示提示
        this.$message({
          message: '请填写工单号',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }

      this.loading = true
      const res = await GetAoiDataAsync(this.formData)

      if (res.Result) {
        var data = JSON.parse(res.Result).data[0]
        if (data) {
          data.PASS_RATE =
            data.UNPASS + data.PASS === 0
              ? 0
              : ((data.PASS / (data.UNPASS + data.PASS)) * 100).toFixed(1)
        }
        this.mainData = data || {}
        this.mainTable = JSON.parse(res.Result).dtlData || []
        this.totalPage = res.TotalCount
        this.loading = false
        var errorCount = JSON.parse(res.Result).resultData
        var titles = []
        var nums = []
        errorCount.forEach((e) => {
          titles.push(e.ELEMENT_LOC + '-' + e.NG_NAME)
          nums.push(e.NUM)
        })
        while (titles.length < 5) {
          titles.push('')
          nums.push(0)
        }
        this.setReport(titles, nums)
      } else {
        this.loading = false
      }
    },
    setReport (titles, nums) {
      var data = []
      nums.forEach((e) => {
        data.push({
          value: e,
          label: {
            show: e !== 0
          }
        })
      })
      var option = {
        grid: [
          {
            top: 40
          },
          {
            top: 40
          }
        ],
        legend: {
          show: false
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
            gridIndex: 1,
            min: 0,

            show: false
          }
        ],
        series: [
          {
            name: '异常 ',
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
