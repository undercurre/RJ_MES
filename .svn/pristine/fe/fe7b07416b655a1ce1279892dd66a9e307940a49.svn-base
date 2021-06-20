<template>
  <d2-container class="SfcsStoplineHistory">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.BATCH_NO"
                  :placeholder="$t('ukas._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.PART_NO"
                  :placeholder="$t('ukas._2')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.OPERATION_SITE_NAME"
                  :placeholder="$t('ukas._3')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select clearable
                   style="width:200px"
                   :placeholder="$t('ukas._14')"
                   v-model="formData.STATUS">
          <el-option :label="$t('ukas._48')"
                     value="Y" />
          <el-option :label="$t('ukas._49')"
                     value="N" />
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("ukas._4") }}</el-button>
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="eliminateClick">{{ $t("ukas._5") }}</el-button>
        <el-button v-if="$btnList.indexOf('SfcsStoplineHistorySave') !== -1"
                   type="success"
                   icon="el-icon-circle-check"
                   @click.prevent="preserveClick"
                   :disabled="servedisab">{{ $t("ukas._6") }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <div class="form-title">{{ $t("ukas._24") }}</div>
      <el-form ref="form"
               :model="form"
               label-width="140px"
               :show-message="false"
               :rules="rules"
               size="small">
        <el-row :gutter="24">
          <el-col :span="8">
            <el-form-item :label="$t('ukas._7')"
                          prop="BATCH_NO">
              <el-input v-model="form.BATCH_NO"
                        :placeholder="$t('ukas._16')"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('ukas._8')"
                          prop="PART_NO">
              <el-input v-model="form.PART_NO"
                        :placeholder="$t('ukas._17')"
                        disabled />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('ukas._9')"
                          prop="STATUS">
              <el-input v-model="form.STATUS"
                        :placeholder="$t('ukas._18')"
                        disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('ukas._10')"
                          class="item-textarea"
                          prop="ISSUE_MESSAGE">
              <el-input v-model="form.ISSUE_MESSAGE"
                        :placeholder="$t('ukas._19')"
                        type="textarea"
                        disabled />
            </el-form-item>
            <el-form-item :label="$t('ukas._11')"
                          prop="SOLUTION">
              <el-input :disabled="disabedit"
                        v-model="form.SOLUTION"
                        class="item-textarea"
                        :placeholder="$t('ukas._20')"
                        type="textarea" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('ukas._12')"
                          class="item-textarea"
                          prop="ROOT_CAUSE">
              <el-input v-model="form.ROOT_CAUSE"
                        :placeholder="$t('ukas._21')"
                        type="textarea"
                        :disabled="disabedit" />
            </el-form-item>
            <el-form-item :label="$t('ukas._13')"
                          class="item-textarea"
                          prop="RESPONSIBILITY">
              <el-input v-model="form.RESPONSIBILITY"
                        :placeholder="$t('ukas._22')"
                        type="textarea"
                        :disabled="disabedit" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div>
      <div class="form-title">{{ $t("ukas._25") }}</div>
      <div class="SfcsStoplineHistory-table">
        <vxe-table v-loading="loading"
                   ref="xTable"
                   border
                   stripe
                   keep-source
                   highlight-hover-row
                   highlight-current-row
                   show-overflow
                   show-header-overflow
                   show-footer-overflow
                   auto-resize
                   width="100%"
                   height="100%"
                   :edit-config="{ mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :data="annalTable"
                   @cell-click="obtain_but"
                   @radio-change="radioChangeEvent">
          <vxe-table-column show-overflow
                            :title="$t('ukas._27')"
                            type="radio"
                            width="80"
                            align="center" />

          <vxe-table-column show-overflow
                            field="BATCH_NO"
                            :edit-render="{ name: 'input' }"
                            :title="$t('ukas._7')"
                            align="center"
                            width="150" />
          <vxe-table-column field="LOCK_STATUS"
                            :title="$t('ukas._29')"
                            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                            width="150"
                            align="center">
            <template v-slot:edit="{ row }">
              <el-switch disabled
                         v-model="row.LOCK_STATUS"
                         :active-text="$t('ukas._48')"
                         :inactive-text="$t('ukas._49')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </template>
          </vxe-table-column>
          <vxe-table-column show-overflow
                            field="MODEL"
                            :title="$t('ukas._30')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column show-overflow
                            field="PART_NO"
                            :title="$t('ukas._31')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column show-overflow
                            field="OPERATION_SITE_NAME"
                            :title="$t('ukas._32')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column show-overflow
                            field="PASS_COUNT"
                            :title="$t('ukas._33')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />

          <vxe-table-column show-overflow
                            field="FAIL_COUNT"
                            :title="$t('ukas._34')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column show-overflow
                            field="NDF_COUNT"
                            :title="$t('ukas._35')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column show-overflow
                            field="TOTAL_COUNT"
                            :title="$t('ukas._36')"
                            :edit-render="{ name: 'input' }"
                            align="center"
                            width="150" />
          <vxe-table-column width="150"
                            show-overflow
                            field="FAIL_RATE"
                            :title="$t('ukas._37')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="NDF_RATE"
                            :title="$t('ukas._38')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="STOPLINE_MODE"
                            :title="$t('ukas._39')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            field="DIVISION_CRITERIA"
                            :title="$t('ukas._40')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column field="INCLUDE_NDF"
                            :title="$t('ukas._41')"
                            :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
                            width="150"
                            align="center">
            <template v-slot:edit="{ row }">
              <el-switch disabled
                         v-model="row.INCLUDE_NDF"
                         :active-text="$t('ukas._48')"
                         :inactive-text="$t('ukas._49')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </template>
          </vxe-table-column>
          <vxe-table-column width="150"
                            field="ISSUE_TYPE"
                            :title="$t('ukas._42')"
                            :edit-render="{ name: 'select', options: IssueTypeListBox }"
                            align="center" />
          <!-- IssueTypeListBox -->
          <vxe-table-column width="150"
                            show-overflow
                            field="ISSUE_MESSAGE"
                            :title="$t('ukas._43')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="ISSUE_TIME"
                            :title="$t('ukas._44')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="RELEASE_TIME"
                            :title="$t('ukas._45')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="MAINTAIN_BY"
                            :title="$t('ukas._46')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column width="150"
                            show-overflow
                            field="MAINTAIN_STATUS"
                            :title="$t('ukas._47')"
                            :edit-render="{ name: 'input' }"
                            align="center" />
          <vxe-table-column :title="$t('ukas._50')"
                            width="150"
                            align="center"
                            fixed="right">
            <template v-slot="{ row }">
              <el-button type="primary"
                         @click="editRow(row)">{{
                $t("ukas._51")
              }}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <el-pagination class="SfcsStoplineHistory-pagination"
                     :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="total"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
      <el-drawer :title="$t('ukas._51')"
                 :visible.sync="drawer"
                 :with-header="false"
                 size="63.5%">
        <el-tabs v-model="virtueName"
                 type="card">
          <el-tab-pane :label="$t('ukas._52')"
                       name="statistics">
            <div ref="echa"
                 class="statistics-echa"></div>
            <div class="statistics-table">
              <vxe-table ref="xserDate"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         show-header-overflow
                         show-footer-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-config="{ mode: 'row', showStatus: true }"
                         :radio-config="{ labelField: 'name', trigger: 'row' }"
                         :data="statDate">
                <vxe-table-column show-overflow
                                  field="DEFECT_CODE"
                                  :title="$t('ukas._54')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="DEFECT_DESCRIPTION"
                                  :title="$t('ukas._55')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="COUNT"
                                  :title="$t('ukas._56')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
              </vxe-table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('ukas._53')"
                       name="second">
            <span style="margin: 5px;display: block;font-size: 14px;color: #606266;margin-top: 15px;
    font-weight: 600;">{{ $t("ukas._57") }}</span>
            <div class="second-table">
              <vxe-table ref="xserDate"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-config="{ mode: 'row', showStatus: true }"
                         :radio-config="{ labelField: 'name', trigger: 'row' }"
                         @cell-click="secondEcll"
                         :data="serDate">
                <vxe-table-column show-overflow
                                  :title="$t('ukas._27')"
                                  type="radio"
                                  width="100"
                                  align="center" />
                <vxe-table-column width="180"
                                  field="BATCH_NO"
                                  :title="$t('ukas._7')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column width="300"
                                  field="SN"
                                  :title="$t('ukas._58')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column min-width="110"
                                  field="DEFECT_CODE"
                                  :title="$t('ukas._54')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column min-width="200"
                                  field="DEFECT_DESCRIPTION"
                                  :title="$t('ukas._55')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column width="180"
                                  field="DEFECT_TIME"
                                  :title="$t('ukas._59')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
              </vxe-table>
            </div>
            <span style="margin: 5px;display: block;font-size: 14px;color: #606266;margin-top: 15px;
    font-weight: 600;">{{ $t("ukas._60") }}</span>
            <div class="second-table">
              <vxe-table ref="xdetailDate"
                         border
                         stripe
                         keep-source
                         highlight-hover-row
                         highlight-current-row
                         show-overflow
                         auto-resize
                         width="100%"
                         height="100%"
                         :edit-config="{ mode: 'row', showStatus: true }"
                         :radio-config="{ labelField: 'name', trigger: 'row' }"
                         :data="detailDate">
                <vxe-table-column width="200"
                                  show-overflow
                                  field="ORDER_NO"
                                  :title="$t('ukas._61')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
                <vxe-table-column show-overflow
                                  field="DEFECT_DETAIL"
                                  :title="$t('ukas._62')"
                                  :edit-render="{ name: 'input' }"
                                  align="center" />
              </vxe-table>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-drawer>
    </div>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsStoplineHistory'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
import echarts from 'echarts'
const API = helper('SfcsStoplineHistory')
export default {
  name: 'SfcsStoplineHistory',
  components: { customContainerHeader },
  data () {
    return {
      drawer: false,
      servedisab: true,
      rules: {
        SOLUTION: [
          {
            required: true,
            message: this.$t('ukas._20'),
            trigger: 'blur'
          }
        ],
        ROOT_CAUSE: [
          {
            required: true,
            message: this.$t('ukas._21'),
            trigger: 'blur'
          }
        ],
        RESPONSIBILITY: [
          {
            required: true,
            message: this.$t('ukas._22'),
            trigger: 'blur'
          }
        ]
      },
      activeName: 'annal',
      loading: false,
      annalTable: [],
      total: 0,
      formData: {
        BATCH_NO: '',
        PART_NO: '',
        OPERATION_SITE_NAME: '',
        STATUS: '',
        Page: 1,
        Limit: 15
      },
      form: {
        ID: 0,
        BATCH_NO: '', // 单据号
        PART_NO: '', // 料号
        STATUS: '', // 维护状态
        MAINTAIN_STATUS: 0, // 状态
        ISSUE_MESSAGE: '', // 锁定原因
        ROOT_CAUSE: '', // 原因分析
        SOLUTION: '', // 解决方案

        RESPONSIBILITY: '', // 责任归属
        STOPLINE_HISTORY_ID: 0, // 停线历史ID
        MAINTAIN_TIME: '', // 维护时间
        MAINTAIN_BY: '', // 维护人
        MODEL: '', // 机种
        OPERATION_SITE_NAME: '' // 锁定站点
      },
      selectRow: null,
      disabedit: true,
      virtueName: 'statistics',
      water: {
        headerID: 0,
        PART_NO: ''
      },
      statDate: [],
      serDate: [],
      detailDate: [],
      chart: null,
      IssueTypeList: [],
      IssueTypeListBox: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },

  mounted () {
    // window.addEventListener('resize', this.getPage, 20)
  },
  created () {
    this.$nextTick(() => {
      // this.getPage()
    })
    this.form.MAINTAIN_BY = this.userinfo.USER_NAME
    this.getIndex()
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        console.log(res.Result, 'res.Result')
        this.IssueTypeList = res.Result.IssueTypeList
        this.IssueTypeListBox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.IssueTypeList.map(item => {
          this.IssueTypeListBox.push({
            label: item.MEANING,
            value: Number(item.LOOKUP_CODE),
            disabled: false
          })
        })
        this.getLoadData()
      }
    },

    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.annalTable = res.Result
        this.total = res.TotalCount
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },

    // 分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 点击获取表格一行数据
    async obtain_but (e) {
      this.servedisab = false
      let data = e.row
      this.form.BATCH_NO = data.BATCH_NO
      this.form.PART_NO = data.PART_NO
      this.form.ISSUE_MESSAGE = data.ISSUE_MESSAGE
      this.form.MAINTAIN_BY = data.MAINTAIN_BY
      this.form.MODEL = data.MODEL
      this.form.OPERATION_SITE_NAME = data.OPERATION_SITE_NAME
      this.form.STATUS = data.MAINTAIN_STATUS
      console.log(e, '点击获取表格一行数据')
      this.GetMaintain(e.row.ID)
      // console.log(res)
    },
    async GetMaintain (e) {
      const res = await API.GetStopLineMaintain(e)
      if (res.Result) {
        let data = res.Result
        this.form.ID = data.ID
        this.form.RESPONSIBILITY = data.RESPONSIBILITY
        this.form.MAINTAIN_STATUS = data.MAINTAIN_STATUS
        this.form.ROOT_CAUSE = data.ROOT_CAUSE
        this.form.SOLUTION = data.SOLUTION
        this.form.STOPLINE_HISTORY_ID = data.STOPLINE_HISTORY_ID
        this.form.MAINTAIN_TIME = data.MAINTAIN_TIME
        if (data.MAINTAIN_STATUS === 2) {
          this.disabedit = true
        } else {
          this.disabedit = false
        }
      }
    },
    radioChangeEvent ({ row }) {
      this.selectRow = row
    },
    // 清空
    eliminateClick () {
      this.disabedit = true
      this.selectRow = null
      this.$refs.form.resetFields()
      this.$refs.xTable.clearRadioRow()
    },
    //  保存
    async preserveClick () {
      if (this.form.ID !== 0) {
        this.$refs.form.validate((valid, errInfo) => {
          if (valid) {
            this.saveData()
          } else {
            try {
              Object.keys(errInfo).forEach(item => {
                this.$message.error(errInfo[item][0].message)
                throw Error(errInfo[item][0].message)
              })
            } catch (e) { }
          }
        })
      }
    },
    async saveData () {
      await API.SaveData(this.form).then(response => {
        if (response.Result) {
          this.$notify({
            title: this.$t('ukas._63'),
            message: this.$t('ukas._64'),
            type: 'success',
            duration: 2000
          })
          this.eliminateClick()
        }
        this.getLoadData()
      })
    },
    editRow (row) {
      this.drawer = true
      console.log(row)
      this.getStatistics(row.HEADER_ID)
      this.water.headerID = row.HEADER_ID
      this.water.PART_NO = row.PART_NO
      this.getDefectDetail()
      this.GetDefectsDetail(row.HEADER_ID)
      this.$nextTick(() => {
        this.getPage()
      })
    },
    async getStatistics (e) {
      const res = await API.GetStopLineDefectStatistics(e)
      if (res.Result) {
        this.statDate = res.Result
        let data = res.Result
        if (data.length > 0) {
          var arr = []
          var numb = []
          for (var i in data) {
            arr.push(data[i].COUNT)
            numb.push(data[i].DEFECT_CODE)
          }
          this.chart.hideLoading() // 隐藏加载动画
          this.chart.setOption({ // 加载数据图表
            series: {
              data: arr
            },
            xAxis: {
              data: numb
            }
          })
        }
      }
    },
    async getDefectDetail () {
      const res = await API.GetStopLineDefectDetail(this.water)
      if (res.Result) {
        this.serDate = res.Result
      }
    },
    secondEcll ({ row }) {
      this.GetDefectsDetail(row.COLLECT_DEFECT_DETAIL_ID)
    },
    // 获取产品收集不良详细信息
    async GetDefectsDetail (e) {
      const res = await API.GetCollectDefectsDetail(e)
      if (res.Result) {
        this.detailDate = res.Result
      }
    },
    getPage () {
      this.chart = echarts.init(this.$refs.echa)
      var option = {
        tooltip: {},
        legend: {
          data: []
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        series: [{
          name: '',
          type: 'bar',
          data: []
        }],
        color: ['red']
      }
      this.chart.setOption(option, true)
      window.onresize = () => {
        this.chart.resize()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsStoplineHistory {
  .form-title {
    font-size: 14px;
    color: #333;
    font-weight: 600;
  }
  .statistics-echa {
    height: calc(100vh - 412px);
  }
  .statistics-table {
    height: calc(100vh - 425px);
  }
  .SfcsStoplineHistory-table {
    height: calc(100vh - 415px);
  }
  .second-table {
    height: calc(100vh - 460px);
  }
}
</style>
<style>
.SfcsStoplineHistory .el-tabs__header {
  margin: 0;
}
.SfcsStoplineHistory .radio .el-radio__label {
  display: none;
}
.SfcsStoplineHistory .SfcsStoplineHistory-pagination {
  border: 1px solid #e6ebf5;
}
.item-textarea .el-textarea__inner {
  resize: none;
}
</style>
