<template>
  <d2-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header
        exportMehodsName="exportData"
        importBtnName="SfcsProductConfigImport"
        exportBtnName="SfcsProductConfigExport"
        exportTplName="SfcsProductConfigExportTPL"
      >
        <el-input
          v-model="formData.PART_NO"
          :placeholder="$t('SfcsProductConfig._1')"
          clearable
          style="width:200px"
          @keyup.enter.native="searchClick"
        />
        <el-select
          clearable
          style="width:200px"
          v-model="formData.CONFIG_TYPE"
          :placeholder="$t('SfcsProductConfig._2')"
        >
          <!-- 占位元素 -->
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
          ></div>
          <div
            style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
          ></div>
          <div
            style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
          >
            <el-input
              v-model="listQuery.ChineseName"
              @keyup.enter.native="searchQueryList"
              @input="searchQueryList"
              :placeholder="$t('SfcsProductConfig._2')"
            ></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click.prevent="searchQueryList"
              >{{ $t("publics.btn.search") }}</el-button
            >
          </div>
          <el-option
            style="width: 600px"
            v-for="item in customerList"
            :key="item.LOOKUP_CODE"
            :label="item.CHINESE"
            :value="item.LOOKUP_CODE"
          ></el-option>
          <div
            style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
          >
            <el-pagination
              :pager-count="5"
              :current-page="listQuery.Page"
              :page-size="listQuery.Limit"
              :page-sizes="[10, 20, 30, 40]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="listQuery.totalPage"
              @size-change="listQuerySizeChange"
              @current-change="listQueryCurrentChange"
            />
          </div>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-search"
          @click.prevent="searchClick"
          >{{ $t("publics.btn.search") }}</el-button
        >
        <el-button
          type="success"
          icon="el-icon-plus"
          @click="insertEvent"
          v-if="$btnList.indexOf('SfcsProductConfigAdd') !== -1"
          >{{ $t("publics.btn.add") }}</el-button
        >
      </custom-container-header>
    </template>
    <div class="table-container">
      <vxe-table
        ref="xTable"
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
        :mouse-config="{ selected: true }"
        :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
        :radio-config="{ labelField: 'name', trigger: 'row' }"
        :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
      >
        <vxe-table-column
          field="PART_NO"
          width="200"
          :title="$t('SfcsProductConfig._3')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CHINESE"
          min-width="200"
          :title="$t('SfcsProductConfig._4')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="CONFIG_VALUE"
          min-width="200"
          :title="$t('SfcsProductConfig._5')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="DESCRIPTION"
          min-width="200"
          :title="$t('SfcsProductConfig._6')"
          :edit-render="{ name: '$input', props: { readonly: true } }"
        />
        <vxe-table-column
          field="ENABLED"
          width="130"
          :title="$t('as_src.tb_an')"
          :edit-render="{ autofocus: '.custom-input', type: 'visible' }"
        >
          <template v-slot:edit="{ row }">
            <div>
              <span class="green-txt" v-if="row.ENABLED === 'Y'">{{
                $t("publics.btn.yes")
              }}</span>
              <span v-else class="red-txt">{{ $t("publics.btn.no") }}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          :title="$t('as_cfe.tb_og')"
          min-width="180"
          align="center"
          fixed="right"
        >
          <template v-slot="{ row }">
            <el-button
              type="primary"
              @click="editRow(row, row.$index)"
              v-if="$btnList.indexOf('SfcsProductConfigEdit') !== -1"
              >{{ $t("publics.btn.edit") }}</el-button
            >
            <el-button
              type="danger"
              @click="removeClick(row, row.$index)"
              v-if="$btnList.indexOf('SfcsProductConfigRemove') !== -1"
              >{{ $t("as_cfe.tb_rm") }}</el-button
            >
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination
        :current-page="formData.Page"
        :page-size="formData.Limit"
        :page-sizes="[15, 25, 35, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </template>

    <!-- modal -->
    <el-dialog
      v-dialogDrag
      :title="dialogTxt"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      width="30%"
    >
      <el-form
        class="custom-form"
        label-position="top"
        label-width="80px"
        ref="modifyForm"
        :model="modifyForm"
        :show-message="false"
        :rules="validRules"
        size="small"
      >
        <el-form-item :label="$t('SfcsProductConfig._3')" prop="PART_NO">
          <el-input v-model="modifyForm.PART_NO" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductConfig._4')" prop="CONFIG_TYPE">
          <el-select
            style="width:100%"
            v-model="modifyForm.CHINESE"
            @change="handleChangeConfigType"
            :placeholder="''"
          >
            <!-- 占位元素 -->
            <div
              style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"
            ></div>
            <div
              style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"
            ></div>
            <div
              style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90"
            >
              <el-input
                v-model="listQuery2.ChineseName"
                @keyup.enter.native="searchQueryList2"
                :placeholder="this.$t('publics.tips.enterKeyWord')"
              ></el-input>
              <el-button
                type="primary"
                icon="el-icon-search"
                @click.prevent="searchQueryList2"
                >{{ $t("publics.btn.search") }}</el-button
              >
            </div>
            <el-option
              style="width: 600px"
              v-for="item in customerList2"
              :key="item.LOOKUP_CODE"
              :label="item.CHINESE"
              :value="item.LOOKUP_CODE"
            ></el-option>
            <div
              style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px"
            >
              <el-pagination
                :pager-count="5"
                :current-page="listQuery2.Page"
                :page-size="listQuery2.Limit"
                :page-sizes="[10, 20, 30, 40]"
                layout="total, sizes, prev, pager, next, jumper"
                :total="listQuery2.totalPage"
                @size-change="listQuerySizeChange2"
                @current-change="listQueryCurrentChange2"
              />
            </div>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductConfig._5')" prop="CONFIG_VALUE">
          <el-input v-model="modifyForm.CONFIG_VALUE" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('SfcsProductConfig._6')" prop="DESCRIPTION">
          <el-input v-model="modifyForm.DESCRIPTION" clearable></el-input>
        </el-form-item>
        <el-form-item :label="$t('as_src.tb_an')" prop="ENABLED">
          <el-switch
            v-model="modifyForm.ENABLED"
            :active-text="$t('publics.btn.yes')"
            :inactive-text="$t('publics.btn.no')"
            active-color="#13ce66"
            inactive-color="#cccccc"
            active-value="Y"
            inactive-value="N"
          ></el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{
          $t("publics.btn.cancel")
        }}</el-button>
        <el-button type="primary" @click="handleSubmitForm">{{
          $t("publics.btn.makeSure")
        }}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import { LoadData } from '@/api/SfcsPn'
import pagination from '@/views/mixin/page'
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import { GetConfigTypeList, ConfigTypeIsExistByPartNo } from '@/api/SfcsProductConfig'
import CURD from '@/views/mixin/CURD'
const API = helper('SfcsProductConfig')
export default {
  name: 'SfcsProductConfig',
  mixins: [
    pagination,
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    })
  ],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        PART_NO: '',
        CONFIG_TYPE: '',
        ...this.formData
      },
      loading: false,
      mainTable: [],
      ConfigTypeList: [],
      validRules: {
        PART_NO: [
          {
            required: true,
            message: this.$t('SfcsProductConfig._7')
          }
        ],
        CONFIG_TYPE: [
          {
            required: true,
            message: this.$t('SfcsProductConfig._8')
          }
        ],
        CONFIG_VALUE: [
          {
            required: true,
            message: this.$t('SfcsProductConfig._9')
          }
        ]
      },
      form: {},
      customerList: [],
      listQuery: {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      },
      dialogTxt: '',
      dialogVisible: false,
      modifyForm: {
        PART_NO: '',
        ENABLED: 'Y'
      },
      customerList2: [],
      listQuery2: {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      },
      partForm: {
        PART_NO: ''
      },
      E_PART_NO: '',
      E_CONFIG_TYPE: ''
    }
  },
  methods: {
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getConfigTypeList()
        this.getLoadData()
      }
    },
    async getConfigTypeList () {
      const res = await GetConfigTypeList(this.listQuery)
      if (res.Result) {
        this.customerList = res.Result || []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.customerList.length) {
          this.customerList.push({
            LOOKUP_CODE: '',
            ENABLED: 'Y',
            CHINESE: ''
          })
        }
      }
    },
    async getConfigTypeList2 () {
      const res = await GetConfigTypeList(this.listQuery2)
      if (res.Result) {
        this.customerList2 = res.Result || []
        this.listQuery2.totalPage = res.TotalCount || 0
        if (!this.customerList2.length) {
          this.customerList2.push({
            LOOKUP_CODE: '',
            ENABLED: 'Y',
            CHINESE: ''
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
    insertEvent () {
      this.listQuery2 = {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      }
      this.modifyForm = {}
      this.modifyForm.ENABLED = 'Y'
      this.customerList2 = []
      this.getConfigTypeList2()
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.add')
    },
    editRow (row) {
      this.modifyForm = JSON.parse(JSON.stringify(row))
      this.listQuery2 = {
        Page: 1,
        Limit: 10,
        ChineseName: '',
        totalPage: 0
      }
      this.customerList2 = []
      this.getConfigTypeList2()
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.edit')
      console.log(row, 'rowrow')
      this.E_PART_NO = row.PART_NO
      this.E_CONFIG_TYPE = row.CONFIG_TYPE
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getConfigTypeList()
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getConfigTypeList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getConfigTypeList()
    },
    handleChangeConfigType (e) {
      this.customerList2.map((item) => {
        if (item.LOOKUP_CODE === e) {
          this.modifyForm.CONFIG_TYPE = item.LOOKUP_CODE
          this.modifyForm.CHINESE = item.CHINESE
        }
      })
    },
    searchQueryList2 () {
      this.listQuery2.Page = 1
      this.getConfigTypeList2()
    },
    listQuerySizeChange2 (Limit) {
      this.listQuery2.Page = 1
      this.listQuery2.Limit = Limit
      this.getConfigTypeList2()
    },
    listQueryCurrentChange2 (Page) {
      this.listQuery2.Page = Page
      this.getConfigTypeList2()
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
          // this.PART_NO = row.PART_NO
          // this.E_CHINESE = row.CHINESE
          var statu = true
          // 编辑状态
          if (this.modifyForm.ID !== 0) {
            // 这两个值是否改变，改变触发ConfigTypeIsExistByPartNo 接口
            if (this.E_PART_NO !== this.modifyForm.PART_NO || this.E_CONFIG_TYPE !== this.modifyForm.CONFIG_TYPE) {
              statu = true
            } else {
              statu = false
            }
          } else {
            statu = true
          }
          if (statu) {
            var ExisForm = {
              partno: this.modifyForm.PART_NO,
              configtype: this.modifyForm.CONFIG_TYPE
            }
            const Resdata = await ConfigTypeIsExistByPartNo(ExisForm)
            if (Resdata.Result) {
              this.$message({
                showClose: true,
                message: this.$t('SfcsProductConfig._10'),
                type: 'warning'
              })
              return
            }
          }

          const data = await LoadData(this.partForm)
          if (data.Result.length === 0) {
            this.partForm.PART_NO = ''
            this.modifyForm.PART_NO = ''
            this.$message({
              showClose: true,
              message: this.$t('ssc._21'),
              type: 'warning'
            })
            return
          }
          const res = await API.SaveData(this.form)
          if (res.Result) {
            this.formData = {
              PART_NO: '',
              CONFIG_TYPE: '',
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
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw Error(errInfo[item][0].message)
            })
          } catch (e) {
            console.log(e.message)
          }
        }
      })
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
