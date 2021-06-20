<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SfcsProductFamilyImport"
                               exportBtnName="SfcsProductFamilyExport"
                               exportTplName="SfcsProductFamilyExportTPL">
        <el-input v-model="formData.FAMILY_NAME"
                  :placeholder="$t('SfcsProductFamily._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="searchClick" />
        <el-select clearable
                   style="width:200px"
                   v-model="formData.CUSTOMER_ID"
                   :placeholder="$t('SfcsProductFamily._2')">
          <!-- 占位元素 -->
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="listQuery.Key"
                      @input="searchQueryList"
                      @keyup.enter.native="searchQueryList"
                      :placeholder="this.$t('publics.tips.enterKeyWord')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchQueryList">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option style="width: 600px"
                     v-for="item in customerList"
                     :key="item.ID"
                     :label="item.CUSTOMER"
                     :value="item.ID">
            <span style="float: left">{{ item.CUSTOMER }}</span>
            <span style="float: right;">{{ item.NATIONALITY }}</span>
          </el-option>
          <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination :pager-count="5"
                           :current-page="listQuery.Page"
                           :page-size="listQuery.Limit"
                           :page-sizes="[10, 20, 30, 40]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="listQuery.totalPage"
                           @size-change="listQuerySizeChange"
                           @current-change="listQueryCurrentChange" />
          </div>
        </el-select>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="insertEvent"
                   v-if="$btnList.indexOf('SfcsProductFamilyAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="preserveClick"
        >{{ $t('publics.btn.save') }}</el-button>-->
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table ref="xTable"
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
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="CUSTOMER"
                          width="200"
                          :title="$t('SfcsProductFamily._3')"
                          :edit-render="{name:'$input', props: {readonly: true}}" />
        <vxe-table-column field="FAMILY_NAME"
                          width="200"
                          :title="$t('SfcsProductFamily._4')"
                          :edit-render="{name:'$input', props: {readonly: true}}" />
        <vxe-table-column field="DESCRIPTION"
                          width="200"
                          :title="$t('SfcsProductFamily._5')"
                          :edit-render="{name:'$input', props: {readonly: true}}" />
        <vxe-table-column field="ENABLED"
                          min-width="140"
                          :title="$t('as_src.tb_an')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div>
              <span :class="row.ENABLED === 'Y'?'green-txt':'red-txt'">{{ row.ENABLED === 'Y' ? $t('publics.btn.yes') : $t('publics.btn.no') }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="PHASE_IN_DATE"
                          width="220"
                          :title="$t('SfcsProductFamily._6')"
                          :edit-render="{name:'$input', props: {readonly: true}}" />
        <vxe-table-column field="PHASE_OUT_DATE"
                          min-width="220"
                          :title="$t('SfcsProductFamily._7')"
                          :edit-render="{name:'$input', props: {readonly: true}}" />
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editRow(row)"
                       v-if="$btnList.indexOf('SfcsProductFamilyEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row)"
                       v-if="$btnList.indexOf('SfcsProductFamilyRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 新增修改modal -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="dialogTxt"
               :visible.sync="dialogVisible"
               width="30%">
      <el-form :model="modifyForm"
               class="custom-form"
               label-width="80px"
               ref="modifyForm"
               :show-message="false"
               label-position="top"
               :rules="modifyRuleForm">
        <el-form-item :label="$t('SfcsProductFamily._3')"
                      prop="CUSTOMER_ID">
          <el-select clearable
                     style="width:100%"
                     v-model="modifyForm.CUSTOMER"
                     @change="handleCustomer"
                     placeholder=" ">
            <!-- 占位元素 -->
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
            <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
            <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
              <el-input v-model="listQuery2.Key"
                        @input="searchQueryList2"
                        @keyup.enter.native="searchQueryList2"
                        :placeholder="$t('publics.tips.enterKeyWord')"></el-input>
              <el-button type="primary"
                         icon="el-icon-search"
                         @click.prevent="searchQueryList2">{{ $t('publics.btn.search') }}</el-button>
            </div>
            <el-option style="width: 600px"
                       v-for="item in customerList2"
                       :key="item.ID"
                       :label="item.CUSTOMER"
                       :value="item.ID">
              <span style="float: left">{{ item.CUSTOMER }}</span>
              <span style="float: right;">{{ item.NATIONALITY }}</span>
            </el-option>
            <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
              <el-pagination :pager-count="5"
                             :current-page="listQuery2.Page"
                             :page-size="listQuery2.Limit"
                             :page-sizes="[10, 20, 30, 40]"
                             layout="total, sizes, prev, pager, next, jumper"
                             :total="listQuery2.totalPage"
                             @size-change="listQuerySizeChange2"
                             @current-change="listQueryCurrentChange2" />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductFamily._4')"
                      prop="FAMILY_NAME">
          <el-input v-model="modifyForm.FAMILY_NAME"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductFamily._5')"
                      prop="DESCRIPTION">
          <el-input v-model="modifyForm.DESCRIPTION"></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductFamily._6')">
          <el-date-picker style="width:100%"
                          v-model="datePicker"
                          value-format="yyyy-MM-dd"
                          type="daterange"
                          :range-separator="$t('publics.tips.to')"
                          :start-placeholder="$t('publics.tips.beginDate')"
                          :end-placeholder="$t('publics.tips.endDate')"
                          @change="handleChangePicker"></el-date-picker>
        </el-form-item>
        <el-form-item :label="$t('as_src.tb_an')"
                      prop="ENABLED">
          <el-switch v-model="modifyForm.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N"></el-switch>
        </el-form-item>

      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('publics.btn.cancel') }}</el-button>
        <el-button type="primary"
                   @click="handleSubmitForm">{{$t('publics.btn.makeSure') }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>
<script>
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import { GetcustomerList } from '@/api/SfcsProductFamily'
import CURD from '@/views/mixin/CURD'
const API = helper('SfcsProductFamily')
export default {
  name: 'SfcsProductFamily',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: e => API.SaveData(e)
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        CUSTOMER_ID: null,
        FAMILY_NAME: null,
        DESCRIPTION: null,
        ENABLED: null,
        PHASE_IN_DATE: null,
        PHASE_OUT_DATE: null,
        ...this.formData
      },
      loading: false,
      mainTable: [],
      customerList: [],
      validRules: {},
      form: {},
      listQuery: {
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      },
      dialogVisible: false,
      dialogTxt: '',
      customerList2: [],
      listQuery2: {
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      },
      modifyForm: {},
      modifyRuleForm: {
        CUSTOMER_ID: [
          {
            required: true,
            message: this.$t('SfcsProductFamily._8'),
            trigger: 'blur'
          }
        ],
        FAMILY_NAME: [
          {
            required: true,
            message: this.$t('SfcsProductFamily._9'),
            trigger: 'blur'
          }
        ]
      },
      datePicker: ''
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        await this.getcustomerList()
        this.getLoadData()
      }
    },
    async getcustomerList () {
      const res = await GetcustomerList(this.listQuery)
      if (res.Result) {
        this.customerList = res.Result || []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.customerList.length) {
          this.customerList.push({
            CUSTOMER: '',
            ID: ''
          })
        }
      }
    },
    // 用于新增编辑
    async getcustomerList2 () {
      const res = await GetcustomerList(this.listQuery2)
      if (res.Result) {
        this.customerList2 = res.Result || []
        this.listQuery2.totalPage = res.TotalCount || 0
        if (!this.customerList2.length) {
          this.customerList2.push({
            CUSTOMER: '',
            ID: ''
          })
        }
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      } else {
        return false
      }
    },
    getText (val) {
      let result = ''
      this.customerList.map(item => {
        if (item.value && parseInt(item.value) === parseInt(val)) {
          result = item.label
        }
      })
      return result
    },
    // 结束日期不能小于开始日期
    handleChangeEndDate (e, row) {
      if (e < row.PHASE_IN_DATE) {
        this.$message.error(this.$t('SfcsProductFamily._10'))
        row.PHASE_OUT_DATE = ''
      }
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getcustomerList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getcustomerList()
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getcustomerList()
    },
    searchQueryList2 () {
      this.listQuery2.Page = 1
      this.getcustomerList2()
    },
    listQuerySizeChange2 (Limit) {
      this.listQuery2.Page = 1
      this.listQuery2.Limit = Limit
      this.getcustomerList()
    },
    listQueryCurrentChange2 (Page) {
      this.listQuery2.Page = Page
      this.getcustomerList2()
    },
    // 新增
    async insertEvent () {
      this.listQuery2 = {
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      }
      this.customerList2 = []
      await this.getcustomerList2()
      this.modifyForm = {}
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.add')
      this.datePicker = ''
    },
    // 修改按钮
    async editRow (row) {
      this.listQuery2 = {
        Key: '',
        Page: 1,
        Limit: 10,
        totalPage: 0
      }
      this.customerList2 = []
      await this.getcustomerList2()
      this.modifyForm = JSON.parse(JSON.stringify(row))
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.edit')
      console.log(this.modifyForm, 'this.modifyForm')
      this.datePicker = [
        this.modifyForm.PHASE_IN_DATE,
        this.modifyForm.PHASE_OUT_DATE
      ]
    },
    handleChangePicker (e) {
      console.log(e, '11111')
      if (e === null) {
        this.modifyForm.PHASE_IN_DATE = ''
        this.modifyForm.PHASE_OUT_DATE = ''
      } else {
        this.modifyForm.PHASE_IN_DATE = e[0]
        this.modifyForm.PHASE_OUT_DATE = e[1]
      }
    },
    handleSubmitForm () {
      if (this.modifyForm.ID) {
        // 修改
        this.form = {
          updateRecords: [this.modifyForm]
        }
      } else {
        // 新增
        this.form = {
          insertRecords: [this.modifyForm]
        }
      }
      this.submitForm()
    },
    submitForm () {
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          const res = await API.SaveData(this.form)
          if (res.Result) {
            this.formData = {
              CUSTOMER_ID: null,
              FAMILY_NAME: null,
              DESCRIPTION: null,
              ENABLED: null,
              PHASE_IN_DATE: null,
              PHASE_OUT_DATE: null,
              Page: 1,
              Limit: 15,
              Key: ''
            }
            this.form = {}
            this.getLoadData()
            this.dialogVisible = false
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    },
    handleCustomer (e) {
      this.customerList2.map(item => {
        if (parseInt(e) === parseInt(item.ID)) {
          this.modifyForm.CUSTOMER_ID = item.ID
        }
      })
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
