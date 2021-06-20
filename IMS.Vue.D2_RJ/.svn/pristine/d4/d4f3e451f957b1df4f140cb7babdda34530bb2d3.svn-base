<template>
  <custom-container>
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select
          v-model="listQuery.CATEGORY"
          style="width: 150px"
          clearable
          :placeholder="$t('SfcsEquipKeep._1')"
          class="common-top"
        >
          <el-option
            v-for="item in deviceType"
            :key="item.LOOKUP_CODE"
            :label="item.CHINESE"
            :value="item.LOOKUP_CODE"
          />
        </el-select>
        <el-select
          v-model="listQuery.STATION_ID"
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
            v-model="value2"
            type="month"
            placeholder="月份"
            style="width: 200px"
          >
          </el-date-picker>
        </div>
        <el-button
          type="primary"
          icon="el-icon-search"
          class="common-top"
          @click.prevent="search_but"
          >{{ $t("SfcsEquipKeep._8") }}</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-receiving"
          @click.prevent="exportAllData"
          >{{ $t("publics.btn.export") }}</el-button
        >&nbsp;
      </custom-container-header>
    </template>
    <div class="out-table-container">
      <vxe-table
        :span-method="objectSpanMethod"
        :cell-class-name="cellClass"
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
        :data="LoadData"
      >
        <vxe-table-column
          field="NAME"
          title="设备"
          fixed="left"
          width="100"
          align="center"
        >
        </vxe-table-column>
        <vxe-table-column
          field="KEEP_CONTENT"
          title="测试项目"
          width="250"
          fixed="left"
          align="center"
          show-overflow-tooltip
        >
        </vxe-table-column>
        <vxe-table-column
          v-for="(item, index) in curMonDays"
          :key="index"
          min-width="80"
          :field="item"
          :title="item"
          align="center"
          class-name="bigger"
        >
        </vxe-table-column>
      </vxe-table>
    </div>
  </custom-container>
</template>
<style>
.CheckMarker .radio .el-radio__label {
  display: none;
}
</style>
<script>
import { GetConfigs, GetMonthData } from '@/api/SfcsEquipKeep'
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import { mapGetters } from 'vuex'
export default {
  name: 'MonthData',
  components: {
    customContainerHeader,
    customContainer
  },
  created () {
    this.getIndex()
    // this.getLoadData()
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  mounted () {
    for (var i = 1; i <= 30; i++) {
      this.curMonDays.push(i.toString())
    }
  },
  data () {
    return {
      deviceType: [],
      LinesList: [],
      sectionval: '',
      lineval: '',
      value2: '',
      listQuery: {
        Key: null, // 搜索关键字
        CATEGORY: '',
        STATION_ID: '',
        KEEP_BEGDATE: ''
      },
      LoadData: [],
      selected: '',
      curMonDays: [],
      curRow: null,
      curRowCount: 1,
      loading: false
    }
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      var ORGANIZE_ID = this.userinfo.ORGANIZE_ID
      const res = await GetConfigs({ ORGANIZE_ID })
      var data = JSON.parse(res.Result)
      this.deviceType = data.CategoryList
      this.LinesList = data.LineList
    },
    async getLoadData () {
      if (!this.listQuery.CATEGORY) {
        this.$alert('请选择类别', '补充信息', {
          confirmButtonText: '确定'
        })
        return
      }
      if (!this.listQuery.STATION_ID) {
        this.$alert('请选择线体', '补充信息', {
          confirmButtonText: '确定'
        })
        return
      }
      if (!this.value2) {
        this.$alert('请选择月份', '补充信息', {
          confirmButtonText: '确定'
        })
        return
      }
      var date = new Date(this.value2)
      var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      this.listQuery.KEEP_BEGDATE =
        date.getFullYear() + '-' + month[date.getMonth()] + '-1'
      this.loading = true
      const res = await GetMonthData(this.listQuery)
      this.loading = false
      var data = JSON.parse(res.Result)

      var resultData = []
      data.forEach((e) => {
        var findItem = resultData.find(
          (p) => p.NAME === e.NAME && p.KEEP_CONTENT === e.KEEP_CONTENT
        )
        var time = new Date(e.KEEP_TIME)
        if (findItem) {
          findItem[time.getDate()] =
            (e.STATUS === 1 ? '√' : 'X') + (e.MESSAGE ? ` (${e.MESSAGE})` : '')
        } else {
          var obj = {
            NAME: e.NAME,
            KEEP_CONTENT: e.KEEP_CONTENT
          }
          obj[time.getDate()] =
            (e.STATUS === 1 ? '√' : 'X') + (e.MESSAGE ? ` (${e.MESSAGE})` : '')
          resultData.push(obj)
        }
      })
      var days = this.getDays()
      this.curMonDays = []
      for (var i = 1; i <= days; i++) {
        this.curMonDays.push(i.toString())
        resultData.forEach((e) => {
          if (!e[i]) e[i] = '-'
        })
      }

      this.LoadData = resultData
    },
    getDays () {
      var curDate = new Date(this.listQuery.KEEP_BEGDATE)
      var curMonth = curDate.getMonth()
      curDate.setMonth(curMonth + 1)
      curDate.setDate(0)
      return curDate.getDate()
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (
          this.curRow == null ||
          (this.curRow &&
            this.curRow.NAME !== row.NAME &&
            this.curRow.KEEP_CONTENT !== row.KEEP_CONTENT)
        ) {
          this.curRow = row
          var count = 0
          this.LoadData.forEach((e) => {
            if (e.NAME === row.NAME) count++
          })
          this.curRowCount = count
        }

        if (rowIndex % this.curRowCount === 0) {
          return {
            rowspan: this.curRowCount,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
    },
    cellClass ({ row, column, rowIndex, columnIndex }) {
      if (row[columnIndex - 1] && row[columnIndex - 1].includes('X')) {
        return 'bad'
      }
      if (row[columnIndex - 1] === '-') return 'not-fixed'
    },
    // 点击获取表格一行数据
    openDetails (row, column, event) {
      this.tableval = row
      this.radio = this.LoadData.indexOf(row)
    },
    // 搜索
    search_but () {
      this.curRow = null
      this.getLoadData()
    },
    handleSizeChange (val) {
      this.listQuery.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.listQuery.Page = val
      this.getLoadData()
    },
    async exportAllData () {
      this.$refs.xTable.exportData({
        filename: '设备点检月明细',
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
.out-table-container {
  height: calc(100vh - 57px - 54px);
}
.bigger {
  font-size: 20px !important;
}
.bad {
  background-color: #C21F39;
  color: white;
}
.not-fixed {
  background-color: #eee;
}
</style>
