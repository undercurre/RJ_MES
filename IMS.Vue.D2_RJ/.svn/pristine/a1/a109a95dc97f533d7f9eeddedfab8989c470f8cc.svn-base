<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-select clearable
                   style="width:200px"
                   @input="searchClick"
                   v-model="formData.PRINT_STATUS"
                   :placeholder="$t('SfcsPrintTasks._1')">
          <el-option v-for="item in materialsList"
                     :key="item.code"
                     :label="item.name"
                     :value="item.code" />
        </el-select>
        <el-input clearable
                  v-model="formData.OPERATOR"
                  :placeholder="$t('SfcsPrintTasks._2')"
                  style="width:150px"
                  @input="searchClick"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input clearable
                  v-model="formData.PRINT_DATA"
                  :placeholder="$t('SfcsPrintTasks._30')"
                  style="width:150px"
                  @input="searchClick"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-date-picker v-model="Time"
                        type="daterange"
                        style="width:200px;margin-right: 10px"
                        :start-placeholder="$t('SOPRoutes._4')"
                        :end-placeholder="$t('SOPRoutes._5')"
                        align="right"
                        value-format="yyyy-MM-dd" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t("SfcsPn._48") }}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-printer"
                   @click.prevent="printClick">{{$t('SfcsPrintTasks._3')}}</el-button>&nbsp;
        <el-button type="warning"
                   icon="el-icon-printer"
                   @click="RepeatPrinting">重复打印</el-button>
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :mouse-config="{selected: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 @cell-click="cellClick">
        <vxe-table-column show-overflow
                          :title="$t('ukas._27')"
                          type="radio"
                          min-width="80"
                          align="center"
                          fixed="left" />
        <vxe-table-column min-width="80"
                          :title="$t('se_cc.sn')"
                          fixed="left"
                          field="R">
        </vxe-table-column>
        <vxe-table-column min-width="120"
                          field="CHINESE"
                          :title="$t('SfcsPrintTasks._4')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="110"
                          field="FILE_NAME"
                          :title="$t('SfcsPrintTasks._5')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="PRINT_STATUS"
                          :title="$t('SfcsPrintTasks._6')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible',props: {readonly: true}}">
          <template v-slot:edit="{ row }">
            <span v-if="row.PRINT_STATUS == 0"
                  style="color: red;">{{$t('SfcsPrintTasks._9')}}</span>
            <span v-else-if="row.PRINT_STATUS == 1"
                  style="color:#67C23A;">{{$t('SfcsPrintTasks._10')}}</span>
            <span v-else-if="row.PRINT_STATUS == 2">{{$t('SfcsPrintTasks._11')}}</span>
            <span v-else>{{$t('SfcsPrintTasks._12')}}</span>
            <!-- 打印状态 0：未打印；1：已打印；2：报废 -->
          </template>
        </vxe-table-column>
         <vxe-table-column min-width="180"
                          field="PRINT_DATA"
                          :title="$t('SfcsPrintTasks._29')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="CREATE_TIME"
                          :title="$t('SfcsPrintTasks._7')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="100"
                          field="OPERATOR"
                          :title="$t('SfcsPrintTasks._8')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="160"
                          field="PART_NO"
                          :title="$t('SfcsPrintTasks._15')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="180"
                          field="WO_NO"
                          :title="$t('SfcsPrintTasks._16')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="150"
                          field="CARTON_NO"
                          :title="$t('SfcsPrintTasks._17')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="140"
                          field="PALLET_NO"
                          :title="$t('SfcsPrintTasks._18')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column min-width="170"
                          field="PRINT_NO"
                          :title="$t('SfcsPrintTasks._19')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
      </vxe-table>
    </div>
    <!-- 分页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 抽屉 筛选 -->
    <el-drawer :title="$t('MesProductionPreMst._18')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t("MesProductionPreMst._19") }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick">{{ $t("MesProductionPreMst._20") }}</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t("MesProductionPreMst._21") }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item label="">
              <el-input clearable
                        v-model="formData.PART_NO"
                        :placeholder="$t('SfcsPrintTasks._20')"
                        style="width:100%" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable
                        v-model="formData.WO_NO"
                        :placeholder="$t('SfcsPrintTasks._21')"
                        style="width:100%" />
            </el-form-item>
            <el-form-item label="">

              <el-input clearable
                        v-model="formData.CARTON_NO"
                        :placeholder="$t('SfcsPrintTasks._22')"
                        style="width:100%" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable
                        v-model="formData.PALLET_NO"
                        :placeholder="$t('SfcsPrintTasks._23')"
                        style="width:100%" />
            </el-form-item>
            <el-form-item label="">
              <el-input clearable
                        v-model="formData.PRINT_NO"
                        type="number"
                        :placeholder="$t('SfcsPrintTasks._24')"
                        style="width:100%" />
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
  </d2-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import request from '@/plugin/axios'
import {
  GetPrintTasksData,
  RepeatPrintTasks
} from '@/api/SfcsPrintTasks'
export default {
  name: 'ComplementPrinting',
  components: {
    customContainerHeader
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        PART_NO: '',
        WO_NO: '',
        CARTON_NO: '',
        PALLET_NO: '',
        PRINT_NO: undefined,
        PRINT_DATA: '',
        PRINT_STATUS: '', // 打印状态 0：未打印；1：已打印；2：报废
        CHINESE: '', // 描述(CN)
        OPERATOR: '', // 打印人员
        START_TIME: '', // 开始时间
        END_TIME: '' // 结束时间
      },
      Time: '',
      mainTable: [],
      materialsList: [
        {
          code: 0,
          name: this.$t('SfcsPrintTasks._9')
        },
        {
          code: 1,
          name: this.$t('SfcsPrintTasks._10')
        },
        {
          code: 2,
          name: this.$t('SfcsPrintTasks._11')
        }
      ],
      printData: null,
      drawer: false,
      TaskIdList: []
    }
  },
  created () {
    this.getLoadData()
  },
  methods: {
    typeIndex (index) {
      let vm = this // 处理分页数据的 index
      return (vm.formData.Page - 1) * vm.formData.Limit + index + 1
    },
    async getLoadData () {
      if (this.formData.PRINT_NO === '') {
        this.formData.PRINT_NO = undefined
      }
      this.loading = true
      const res = await GetPrintTasksData(this.formData)
      this.loading = false
      const data = res.Result
      this.mainTable = data.data || []
      console.log(res.Result, '获取表格')
      this.totalPage = data.count ? data.count : 0
    },
    resetListQuery () {
      this.formData = {}
      this.printData = null
      this.formData.Limit = 15
      this.formData.Page = 1
    },
    // 搜索
    searchClick () {
      this.drawer = false
      console.log(this.Time, 'Time')
      if (this.Time) {
        this.formData.START_TIME = this.Time[0]
        this.formData.END_TIME = this.Time[1]
      } else {
        this.formData.START_TIME = ''
        this.formData.END_TIME = ''
      }
      this.formData.Page = 1

      this.getLoadData()
    },
    cellClick (e, column, event) {
      this.printData = e.row
    },
    async printClick () {
      if (!this.printData) {
        return this.$message.error(this.$t('SfcsPrintTasks._13'))
      }
      if (Number(this.printData.PRINT_STATUS) !== 0) {
        return this.$message.error(this.$t('SfcsPrintTasks._14'))
      }
      this.$confirm(
        this.$t('SfcsPrintTasks._25'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          this.downSomething({ PrintTaskId: this.printData.ID, Printer: this.userinfo.USER_NAME })
        })
        .catch(() => {

        })
    },
    // 打印
    async downSomething (query) {
      var that = this
      request({
        url: 'http://localhost:42737/Printer/GetCurrentPrint',
        method: 'get'
      }).then(res => {
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          this.print(query)
        } else {
          this.GetPrintList()
        }
      }).catch(function () {
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 开始打印
    print (query) {
      var that = this
      const loading = this.$loading({
        lock: true, // 同v-loading的修饰符
        text: this.$t('MesBatchManager._54'), // 加载文案
        backgroundColor: 'rgba(55,55,55,0.4)', // 背景色
        spinner: 'el-icon-loading' // 加载图标
      })
      request({
        url: 'http://localhost:42737/Printer/BasePrinter',
        method: 'post',
        data: query
      }).then(res => {
        loading.close()
        console.log(res, 'res.Resultres.Resultres.Result')
        if (res.Code === 1) {
          if (res.Data) {
            this.$notify({
              title: this.$t('publics.tips.success'),
              message: this.$t('MesBatchManager._52'),
              type: 'success',
              duration: 2000
            })
            this.TaskIdList = []
            this.getLoadData()
          } else {
            this.GetPrintList()
            this.$notify({
              title: this.$t('publics.tips.handleFail'),
              message: res.Msg,
              type: 'error',
              duration: 2000
            })
          }
        } else {
          this.$notify({
            title: this.$t('publics.tips.handleFail'),
            message: res.Msg,
            type: 'error',
            duration: 2000
          })
        }
      }).catch(function () {
        loading.close()
        that.$message({
          type: 'error',
          message: that.$t('MesBatchManager._55')
        })
      })
    },
    // 获取打印机列表
    async GetPrintList () {
      this.PrintoShow = true
      const res = await request({
        url: 'http://localhost:42737/Printer/GetPrintList',
        method: 'get'
      })
      if (res.Code === 1) {
        this.PrintList = res.Data
      }
    },
    // 选择名称
    async SetPrinName () {
      const res = await request({
        url: 'http://localhost:42737/Printer/SetPrintName',
        method: 'post',
        data: {
          PrintName: this.PrintName
        }
      })
      if (res.Code === 1) {
        // 重新打印
        if (this.TaskIdList.length) {
          var query = []
          this.TaskIdList.map((i) => {
            query.push({
              PrintTaskId: i,
              Printer: this.userinfo.USER_NAME
            })
          })
          this.print(query[0])
        } else {
          this.print({ PrintTaskId: this.printData.ID, Printer: this.userinfo.USER_NAME })
        }
      } else {
        this.$notify({
          title: this.$t('publics.tips.handleFail'),
          message: res.Msg,
          type: 'error',
          duration: 2000
        })
      }
    },
    // 重复打印
    RepeatPrinting () {
      console.log(this.printData, 'this.printData')
      if (!this.printData) {
        return this.$message.error(this.$t('SfcsPrintTasks._13'))
      }
      if (Number(this.printData.PRINT_STATUS) !== 1) {
        return this.$message.error(this.$t('SfcsPrintTasks._27'))
      }
      var printArr = []
      printArr.push(this.printData)
      this.$confirm(
        this.$t('SfcsPrintTasks._26'),
        this.$t('MesTongsApply._91'),
        {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await RepeatPrintTasks(
            { modelList: printArr, UserName: this.userinfo.USER_NAME }
          )
          if (res.Result) {
            const { MsgList = [], TaskIdList = [] } = res.Result
            if (MsgList.length) {
              const msg = MsgList.join('\r\n')
              this.$message.error(msg)
            }
            if (TaskIdList.length) {
              // console.log('2222')
              const query = []
              TaskIdList.map((i) => {
                query.push({
                  PrintTaskId: i,
                  Printer: this.userinfo.USER_NAME
                })
              })
              this.TaskIdList = TaskIdList
              console.log(query[0], 'quer===y')
              this.downSomething(query[0])
            }
            console.log(res.Result)
          }
        })
        .catch(() => {

        })
    }
  }
}
</script>
