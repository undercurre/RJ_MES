<template>
  <d2-container class="PassRateSumMonthReport">
    <template slot="header">
      <custom-container-header :isExport="false">
        <el-select v-model="listQuery.WO_CLASS"
                   clearable
                   style="width:200px"
                   :placeholder="$t('PassRateSumMonthReport._1')"
                   class="common-top">
          <el-option v-for="item in Shiftlist"
                     :key="item.Id"
                     :label="item.val"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-select v-model="listQuery.LINE_TYPE"
                   clearable
                   style="width:200px"
                   :placeholder="$t('PassRateSumMonthReport._2')"
                   class="common-top">
          <el-option v-for="item in Bodyline"
                     :key="item.Id"
                     :label="item.val"
                     :value="item.Id" />
        </el-select>&nbsp;
        <el-date-picker v-model="listQuery.MONTHS"
                        value-format="yyyy-MM"
                        type="month"></el-date-picker>
        <el-button style="margin-left: 10px;"
                   type="primary"
                   icon="el-icon-search"
                   @click.prevent="doFilter">{{ $t("PassRateSumMonthReport._3") }}</el-button>
      </custom-container-header>
    </template>
    <div class="PassRateSumMonthReport-tanble">
      <table class="table table-bordered table-hover">
        <tbody>
          <tr class="header">
            <td>{{$t("PassRateSumMonthReport._4")}}</td>
            <td>{{$t("PassRateSumMonthReport._5")}}</td>
            <td style="color: blue;">{{$t("PassRateSumMonthReport._6")}}</td>
            <td style="color: red;">{{$t("PassRateSumMonthReport._7")}}</td>
            <td>{{$t("PassRateSumMonthReport._8")}}</td>
            <td>{{$t("PassRateSumMonthReport._9")}}</td>
          </tr>
          <tr v-for="(item,index) in mainTable"
              :key="index">
            <td>{{item.CHECK_DATE}}</td>
            <td>{{item.ALL_QTY}}</td>
            <td style="color: blue;">{{item.PASS_QTY}}</td>
            <td style="color: red;">{{item.FAIL_QTY}}</td>
            <td>{{item.PASS_RATE}}%</td>
            <td>{{item.TARGET_RATE}}%</td>
          </tr>
          <tr class="tbody-tr">
            <td>{{$t("PassRateSumMonthReport._10")}}</td>
            <td>{{ALL_QTY_SUM}}</td>
            <td style="color: blue;">{{PASS_QTY_SUM}}</td>
            <td style="color: red;">{{FAIL_QTY_SUM}}</td>
            <td>{{PASS_RATE_SUM}}%</td>
            <td>{{TARGET_RATE_SUM}}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </d2-container>
</template>
<script>
import {
  GetCheckPassRateSumMonthData,
  GetMonthDayData
} from '@/api/MesSpotCheckReport'

import customContainerHeader from '@/components/custom-container-header'
export default {
  name: 'PassRateSumMonthReport',
  components: {
    customContainerHeader
  },
  data () {
    return {
      calldate: [],
      Shiftlist: [
        {
          Id: this.$t('PassRateSumMonthReport._11'),
          val: this.$t('PassRateSumMonthReport._11')
        },
        {
          Id: this.$t('PassRateSumMonthReport._12'),
          val: this.$t('PassRateSumMonthReport._12')
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
          val: this.$t('PassRateSumMonthReport._13')
        }
      ],
      listQuery: {
        WO_CLASS: '',
        LINE_TYPE: '',
        MONTHS: ''
      },
      loading: false,
      mainTable: [],
      ALL_QTY_SUM: 0,
      PASS_QTY_SUM: 0,
      FAIL_QTY_SUM: 0,
      PASS_RATE_SUM: 0,
      TARGET_RATE_SUM: 0,
      day: ''
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
    var currentdate = year + seperator1 + month
    this.listQuery.MONTHS = currentdate
    // this.getDayData()
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
      console.log(this.listQuery)
      this.getList()
    },
    // 获取列表
    async getList () {
      if (!this.listQuery.MONTHS) {
        this.$message({
          showClose: true,
          message: this.$t('PassRateSumDayReport._24'),
          type: 'warning'
        })
        return
      }
      this.loading = true
      const res = await GetCheckPassRateSumMonthData(this.listQuery)
      var data = JSON.parse(res.Result).data
      console.log(JSON.parse(res.Result), 'datadata')

      var d = this.ConvertData(data)
      var ALL_QTY = 0
      var PASS_QTY = 0
      var FAIL_QTY = 0
      var TARGET_RATE = 0
      data.forEach((v, i) => {
        ALL_QTY += parseFloat(v.ALL_QTY)
        PASS_QTY += parseFloat(v.PASS_QTY)
        FAIL_QTY += parseFloat(v.FAIL_QTY)
        TARGET_RATE = v.TARGET_RATE
      })
      this.ALL_QTY_SUM = ALL_QTY
      this.PASS_QTY_SUM = PASS_QTY
      this.FAIL_QTY_SUM = FAIL_QTY
      this.TARGET_RATE_SUM = TARGET_RATE
      if (this.PASS_QTY_SUM === 0 && this.ALL_QTY_SUM === 0) {
        this.PASS_RATE_SUM = 0
      } else {
        this.PASS_RATE_SUM = (
          (parseFloat(this.PASS_QTY_SUM) / parseFloat(this.ALL_QTY_SUM)) *
          100
        ).toFixed(2)
      }

      console.log(
        (
          (parseFloat(this.PASS_QTY_SUM) / parseFloat(this.ALL_QTY_SUM)) *
          100
        ).toFixed(2),
        '(parseFloat(this.PASS_QTY_SUM) / parseFloat(this.ALL_QTY_SUM) * 100).toFixed(2)'
      )
      var AataArr = []
      var DaysArr = []
      console.log(DaysArr, 'DaysArr')
      console.log(this.month, 'month')
      const resmon = await GetMonthDayData(this.listQuery.MONTHS)
      // eslint-disable-next-line no-new-func
      let func = new Function('return (' + resmon.Result + ');')
      DaysArr = func()
      if (DaysArr) {
        DaysArr.map((v, i) => {
          console.log(v)
          if (d[v]) {
            obj = {
              ALL_QTY: d[v].ALL_QTY,
              PASS_QTY: d[v].PASS_QTY,
              FAIL_QTY: d[v].FAIL_QTY,
              PASS_RATE: d[v].PASS_RATE,
              TARGET_RATE: d[v].TARGET_RATE,
              CHECK_DATE: v
            }
          } else {
            obj = {
              ALL_QTY: 0,
              PASS_QTY: 0,
              FAIL_QTY: 0,
              PASS_RATE: 0,
              TARGET_RATE: 0,
              CHECK_DATE: v
            }
          }
          AataArr.push(obj)
        })
        console.log(AataArr, 'AataArr')
        this.mainTable = AataArr
      }
      var obj = {}

      this.loading = false
    },
    ConvertData (list) {
      var data = {}
      list.forEach(function (v, i) {
        data[v.CHECK_DATE] = v
      })
      return data
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
  height: 33px;
  display: block;
  text-align: center;
  line-height: 33px;
  border: 1px solid #e8eaec;
  border-bottom: none;
}
.PassRateSumMonthReport-tanble {
  overflow-y: hidden;
  height: calc(100vh - 190px);
}
td:nth-child(odd) {
  background: #f9f9f9;
}
tr:first-child td {
  background: #f9f9f9;
}
</style>
