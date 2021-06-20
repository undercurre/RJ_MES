<template>
  <d2-container class="PassRateSumDayReport">
    <template slot="header">
      <custom-container-header :isExport="false">
        <el-select v-model="listQuery.WO_CLASS"
                   clearable
                   style="width:200px"
                   :placeholder="$t('PassRateSumDayReport._1')">
          <el-option v-for="item in Shiftlist"
                     :key="item.Id"
                     :label="item.val"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.LINE_TYPE"
                   clearable
                   style="width:200px"
                   :placeholder="$t('PassRateSumDayReport._2')">
          <el-option v-for="item in Bodyline"
                     :key="item.Id"
                     :label="item.val"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-date-picker v-model="calldate"
                        type="daterange"
                        style="width:240px"
                        :start-placeholder="$t('PassRateSumDayReport._3')"
                        :end-placeholder="$t('PassRateSumDayReport._4')"
                        align="right"
                        value-format="yyyy-MM-dd" />
        <el-button style="margin-left: 10px;"
                   type="primary"
                   icon="el-icon-search"
                   @click.prevent="doFilter">{{ $t("PassRateSumDayReport._5") }}</el-button>
        <el-button style="margin-left: 10px;"
                   type="danger"
                   icon="el-icon-question"
                   @click.prevent="toShouCe">帮助</el-button>
      </custom-container-header>
    </template>
    <div class="PassRateSumDayReport-tanble">
      <table class="table table-bordered table-hover">
        <tbody>
          <tr class="header">
            <td>{{ $t("PassRateSumDayReport._6") }}</td>
            <td>{{ $t("PassRateSumDayReport._7") }}</td>
            <td>{{ $t("PassRateSumDayReport._8") }}</td>
            <td>{{ $t("PassRateSumDayReport._9") }}</td>
            <td style="color: blue;">{{ $t("PassRateSumDayReport._10") }}</td>
            <td style="color: red;">{{ $t("PassRateSumDayReport._11") }}</td>
            <td>{{ $t("PassRateSumDayReport._12") }}</td>
            <td>{{ $t("PassRateSumDayReport._13") }}</td>
            <td>{{ $t("PassRateSumDayReport._14") }}</td>
          </tr>
          <tr v-for="(item,index) in mainTable"
              :key="index">
            <td>{{item.LINE_TYPE}}</td>
            <td>{{item.BATCH_ALL_QTY}}</td>
            <td>{{item.BATCH_PASS_QTY}}</td>
            <td>{{item.ALL_QTY}}</td>
            <td style="color: blue;">{{item.PASS_QTY}}</td>
            <td style="color: red;">{{item.FAIL_QTY}}</td>
            <td>{{item.BATCH_RATE}}%</td>
            <td>{{item.BATCH_QTY_RATE}}%</td>
            <td>{{item.TARGET_RATE}}%</td>
          </tr>
          <tr class="tbody-tr">
            <td>{{ $t("PassRateSumDayReport._15") }}</td>
            <td>{{BATCH_ALL_QTY_SUM}}</td>
            <td>{{BATCH_PASS_QTY_SUM}}</td>
            <td>{{ALL_QTY_SUM}}</td>
            <td style="color: blue;">{{PASS_QTY_SUM}}</td>
            <td style="color: red;">{{FAIL_QTY_SUM}}</td>
            <td>{{BATCH_RATE_SUM}}</td>
            <td>{{BATCH_QTY_RATE_SUM}}</td>
            <td>{{TARGET_RATE_SUM}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="chartDiv">
      <div id="passRateChart"
           style="width:100%;height:100%"></div>
    </div>
  </d2-container>
</template>
<script>
import { GetCheckPassRateSumDayData } from '@/api/MesSpotCheckReport'

import customContainerHeader from '@/components/custom-container-header'
import echarts from 'echarts'
export default {
  name: 'PassRateSumDayReport',
  components: {
    customContainerHeader
  },
  data () {
    return {
      calldate: [],
      Shiftlist: [
        {
          Id: this.$t('PassRateSumDayReport._16'),
          val: this.$t('PassRateSumDayReport._16')
        },
        {
          Id: this.$t('PassRateSumDayReport._17'),
          val: this.$t('PassRateSumDayReport._17')
        }
      ],
      Bodyline: [
        {
          Id: 'SMT',
          val: 'SMT'
        },
        {
          Id: 'AIRI',
          val: 'AI&RI'
        },
        {
          Id: 'PCBA',
          val: this.$t('PassRateSumDayReport._18')
        }
      ],
      listQuery: {
        WO_CLASS: '',
        LINE_TYPE: '',
        BEGIN_TIME: '',
        END_TIME: ''
      },
      loading: false,
      mainTable: [],
      BATCH_ALL_QTY_SUM: 0,
      BATCH_PASS_QTY_SUM: 0,
      ALL_QTY_SUM: 0,
      PASS_QTY_SUM: 0,
      FAIL_QTY_SUM: 0,
      BATCH_RATE_SUM: 0,
      BATCH_QTY_RATE_SUM: 0,
      TARGET_RATE_SUM: 0
    }
  },
  mounted () { },
  created () {
    var date = new Date()
    var seperator1 = '-'
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var strDate = date.getDate()
    if (month >= 1 && month <= 9) {
      month = '0' + month
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = '0' + strDate
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate
    this.calldate[0] = currentdate
    this.calldate[1] = currentdate
    if (this.calldate !== '' && this.calldate !== null) {
      this.listQuery.BEGIN_TIME = this.calldate[0]
      this.listQuery.END_TIME = this.calldate[1]
    } else {
      this.listQuery.BEGIN_TIME = ''
      this.listQuery.END_TIME = ''
    }
    this.getList()
  },
  methods: {
    doFilter () {
      if (this.calldate !== '' && this.calldate !== null) {
        this.listQuery.BEGIN_TIME = this.calldate[0]
        this.listQuery.END_TIME = this.calldate[1]
      } else {
        this.listQuery.BEGIN_TIME = ''
        this.listQuery.END_TIME = ''
      }
      this.getList()
    },
    // 获取列表
    async getList () {
      if (!this.listQuery.BEGIN_TIME) {
        this.$message({
          showClose: true,
          message: this.$t('PassRateSumDayReport._24'),
          type: 'warning'
        })
        return
      }
      this.loading = true
      const res = await GetCheckPassRateSumDayData(this.listQuery)
      var ArrData = []
      var data = JSON.parse(res.Result).data
      console.log(JSON.parse(res.Result), 'datadata')
      this.mainTable = data
      ArrData = data
      var BATCH_AL = 0
      var BATCH_PASS = 0
      var ALL_QTY = 0
      var PASS_QTY = 0
      var FAIL_QTY = 0
      var TARGET_RATE = 0
      ArrData.forEach(function (v, i) {
        console.log(v, i)
        BATCH_AL += parseFloat(v.BATCH_ALL_QTY)
        BATCH_PASS += parseFloat(v.BATCH_PASS_QTY)
        ALL_QTY += parseFloat(v.ALL_QTY)
        PASS_QTY += parseFloat(v.PASS_QTY)
        FAIL_QTY += parseFloat(v.FAIL_QTY)
        TARGET_RATE = v.TARGET_RATE + '%'
      })
      this.BATCH_ALL_QTY_SUM = BATCH_AL
      this.BATCH_PASS_QTY_SUM = BATCH_PASS
      this.ALL_QTY_SUM = ALL_QTY
      this.PASS_QTY_SUM = PASS_QTY
      this.FAIL_QTY_SUM = FAIL_QTY
      this.TARGET_RATE_SUM = TARGET_RATE
      if (this.BATCH_PASS_QTY_SUM === 0 && this.BATCH_ALL_QTY_SUM === 0) {
        this.BATCH_RATE_SUM = '0%'
      } else {
        this.BATCH_RATE_SUM =
          (
            (parseFloat(this.BATCH_PASS_QTY_SUM) /
              parseFloat(this.BATCH_ALL_QTY_SUM)) *
            100
          ).toFixed(2) + '%'
      }
      if (this.PASS_QTY_SUM === 0 && this.ALL_QTY_SUM === 0) {
        this.BATCH_QTY_RATE_SUM = '0%'
      } else {
        this.BATCH_QTY_RATE_SUM =
          (
            (parseFloat(this.PASS_QTY_SUM) / parseFloat(this.ALL_QTY_SUM)) *
            100
          ).toFixed(2) + '%'
      }

      console.log(data, 'this.mainTable')

      this.loading = false
      this.$nextTick(() => {
        this.InitChart(this.mainTable)
      })
    },
    // 获取到图表数据
    GetChartData (list) {
      var xAxisData = []
      var seriesData1 = []
      var seriesData2 = []
      list.forEach(function (v, i) {
        xAxisData.push(v.LINE_TYPE ? v.LINE_TYPE : '')
        seriesData1.push(parseFloat(v.BATCH_QTY_RATE))
        seriesData2.push(parseFloat(v.TARGET_RATE))
      })

      return {
        xAxisData: xAxisData,
        seriesData1: seriesData1,
        seriesData2: seriesData2
      }
    },
    toShouCe () {
      window.open('https://www.kancloud.cn/book/ccb_sh/jzmesword/5f7a015547ff87180867c4c9ad8bdcfc8e5d0901/preview/%E5%90%88%E6%A0%BC%E7%8E%87%E6%B1%87%E6%80%BB%E6%8A%A5%E8%A1%A8%E6%97%A5.md')
    },
    InitChart (list) {
      var d = this.GetChartData(list)
      var passRateChart = echarts.init(
        document.getElementById('passRateChart')
      )
      var option = {
        color: ['blue', '#dd56ed'],
        title: {
          text: this.$t('PassRateSumDayReport._19')
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: [
            this.$t('PassRateSumDayReport._20'),
            this.$t('PassRateSumDayReport._21')
          ]
        },
        toolbox: {
          feature: {
            saveAsImage: { title: this.$t('PassRateSumDayReport._22') }
          }
        },

        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: d.xAxisData
        },
        yAxis: {
          type: 'value',
          min: 0,
          max: 120
        },
        series: [
          {
            name: this.$t('PassRateSumDayReport._20'),
            type: 'line',
            data: d.seriesData1,
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function (p) {
                  return p.value + '%'
                },
                textStyle: {
                  color: 'blue' // color of value
                }
              }
            }
          },
          {
            name: this.$t('PassRateSumDayReport._21'),
            type: 'line',
            data: d.seriesData2,
            label: {
              normal: {
                show: true,
                position: 'bottom',
                formatter: function (p) {
                  return p.value + '%'
                },
                textStyle: {
                  color: '#dd56ed' // color of value
                }
              }
            }
          }
        ]
      }
      passRateChart.setOption(option, true)
      window.onresize = () => {
        passRateChart.resize()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
table {
  border-collapse: collapse;
  position: relative;
  border-bottom: 1px solid #e8eaec;
  color: #606266;
  font-size: 14px;
}

.header {
  position: sticky;
  top: 0;
  left: 0;
  background: #fff;
  box-shadow: 5px 0px 10px 0px #e8eaec;
}
tbody {
  position: relative;
  display: flex;
}
tbody tr {
  display: inline-block;
}
.tbody-tr {
  position: sticky;
  top: 0;
  right: 0;
  background: #fff;
  box-shadow: -4px 0px 10px 0px #e8eaec;
}
th,
td {
  width: 170px;
  height: 26px;
  display: block;
  text-align: center;
  line-height: 26px;
  border: 1px solid #e8eaec;
  border-bottom: none;
}
.PassRateSumDayReport-tanble {
  overflow-y: hidden;
  height: calc(100vh - 448px);
}
.chartDiv {
  padding-top: 15px;
  height: calc(100vh - 490px);
}
td:nth-child(odd) {
  background: #f9f9f9;
}
tr:first-child td {
  background: #f9f9f9;
}
</style>
