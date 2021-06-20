<template>
  <d2-container class="SmtLineSubstitute">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SMT_REPLACE_PN"
                               importBtnName="SmtLineSubstituteImport"
                               exportBtnName="SmtLineSubstituteExport"
                               exportTplName="SmtLineSubstituteExportTPL">
        <el-input v-model="formData.WO_NO"
                  :placeholder="$t('sls.p_1')"
                  clearable
                  style="width: 180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-select v-model="formData.VENDOR_CODE"
                   clearable
                   filterable
                   style="width: 180px"
                   :placeholder="$t('sls.p_4')">
          <div class="select-flex">
            <el-input v-model="vendor.Key"
                      :placeholder="$t('sls.key')"
                      clearable
                      style="width: 87%"
                      @keyup.enter.native="GetVendor" />
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="GetVendor">{{ $t("sls.hd_sf") }}</el-button>
          </div>
          <el-option v-for="item in vendorList"
                     :key="item.VENDOR_CODE"
                     :value="item.VENDOR_CODE"
                     :label="item.VENDOR_NAME"
                     :disabled="item.disabled" />
          <el-pagination class="select-pagination"
                         :current-page="vendor.Page"
                         :page-size="vendor.Limit"
                         :page-sizes="[10, 20, 30, 50]"
                         :pager-count="5"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="Vetotal"
                         @size-change="handleSize"
                         @current-change="handleCurrent" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("sls.hd_sf") }}</el-button>
        <el-button type="success"
                   @click="insertEvent(-1)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtReplacePnAdd') !== -1">{{ $t("sls.add") }}</el-button>
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
                 :edit-rules="validRules"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column min-width="210"
                          field="WO_NO"
                          :title="$t('sls.t_1')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="230"
                          field="PCB_PN"
                          :title="$t('sls.t_2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="220"
                          field="COMPONENT_PN"
                          :title="$t('sls.t_3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="220"
                          field="REPLACE_PN"
                          :title="$t('sls.t_4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="180"
                          field="DESCRIPTION"
                          :title="$t('sls.t_5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }"></vxe-table-column>
        <vxe-table-column min-width="230"
                          field="MAKER_PN"
                          :title="$t('sls.t_6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="160"
                          field="ENABLED"
                          :title="$t('sls.t_7')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch disabled
                         v-model="row.ENABLED"
                         :active-text="$t('sls.yes')"
                         :inactive-text="$t('sls.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column min-width="150"
                          field="BEGINTIME"
                          :title="$t('sls.t_8')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="150"
                          field="ENDTIME"
                          :title="$t('sls.t_9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column :title="$t('sls.tb_og')"
                          width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editBut(row, row.$index)"
                       v-if="$btnList.indexOf('SmtReplacePnEdit') !== -1">{{ $t("sls._2") }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtReplacePnRemove') !== -1">
              {{ $t("sls.tb_rm") }}
            </el-button>
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
    <!-- 编辑页面 -->
    <el-dialog v-dialogDrag
               :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="70%"
               class="Dialog"
               :close-on-click-modal="false">
      <el-form label-position="top"
               ref="TableData"
               :show-message="false"
               :model="TableData"
               :rules="rules"
               label-width="85px"
               class="Dialogform">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="WO_NO">
              <span>{{ $t("sls.t_1") }}</span>
              <el-input v-model="TableData.WO_NO"
                        :placeholder="$t('sls.p_1')" />
            </el-form-item>
            <el-form-item prop="PCB_PN">
              <span>{{ $t("sls.t_2") }}</span>
              <el-input v-model="TableData.PCB_PN"
                        :placeholder="$t('sls.p_6')" />
            </el-form-item>
            <el-form-item prop="COMPONENT_PN">
              <span>{{ $t("sls.t_3") }}</span>
              <el-input v-model="TableData.COMPONENT_PN"
                        :placeholder="$t('sls.p_7')" />
            </el-form-item>
            <el-form-item prop="REPLACE_PN">
              <span>{{ $t("sls.t_4") }}</span>
              <el-input v-model="TableData.REPLACE_PN"
                        :placeholder="$t('sls.p_8')" />
            </el-form-item>
            <el-form-item prop="DESCRIPTION">
              <span>{{ $t("sls.t_5") }}</span>
              <el-select v-model="TableData.DESCRIPTION"
                         clearable
                         filterable
                         style="width: 100%"
                         :placeholder="$t('sls.p_4')"
                         @change="descripClick">
                <div class="select-flex">
                  <el-input v-model="vendor.Key"
                            :placeholder="$t('sls.key')"
                            clearable
                            style="width: 87%"
                            @keyup.enter.native="GetVendor" />
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="GetVendor">{{ $t("sls.hd_sf") }}</el-button>
                </div>
                <el-option v-for="item in vendorList"
                           :key="item.VENDOR_CODE"
                           :value="item.VENDOR_CODE"
                           :label="item.VENDOR_NAME" />
                <el-pagination class="select-pagination"
                               :current-page="vendor.Page"
                               :page-size="vendor.Limit"
                               :page-sizes="[10, 20, 30, 50]"
                               :pager-count="5"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="Vetotal"
                               @size-change="handleSize"
                               @current-change="handleCurrent" />
              </el-select>&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="MAKER_PN">
              <span>{{ $t("sls.t_6") }}</span>
              <el-input v-model="TableData.MAKER_PN"
                        :placeholder="$t('sls.p_5')" />
            </el-form-item>
            <el-form-item prop="BEGINTIME">
              <span>{{ $t("sls.t_8") }}</span>
              <el-date-picker style="width: 100%"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              v-model="TableData.BEGINTIME"
                              type="datetime"
                              :placeholder="$t('sls._3')"></el-date-picker>
            </el-form-item>
            <el-form-item prop="ENDTIME">
              <span>{{ $t("sls.t_9") }}</span>
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss"
                              style="width: 100%"
                              v-model="TableData.ENDTIME"
                              type="datetime"
                              :placeholder="$t('sls._4')"></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('sls.t_7')"
                          style="padding: 0">
              <el-switch v-model="TableData.ENABLED"
                         :active-text="$t('sls.yes')"
                         :inactive-text="$t('sls.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="cancel('form')">{{ $t("se.cancel") }}</el-button>
        <el-button v-if="dialogStatus == 'create'"
                   type="primary"
                   @click="create('form')">{{ $t("se.confirm") }}</el-button>
        <el-button v-else
                   type="primary"
                   @click="update('form')">
          {{ $t("se.confirm") }}
        </el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/SmtLineSubstitute'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SmtReplacePn')
export default {
  name: 'SmtLineSubstitute',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      vendor: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      vendorList: [],
      Vetotal: 0,
      formData: {
        WO_NO: '',
        COMPONENT_PN: '',
        REPLACE_PN: '',
        VENDOR_CODE: '',
        MAKER_PN: '',
        Key: '',
        Page: 1,
        Limit: 15
      },
      loading: false,
      mainTable: [],
      totalPage: 0,
      dialogStatus: '',
      validRules: {
        // WO_NO: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_1')
        //   }
        // ],
        // PCB_PN: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_6')
        //   }
        // ],
        // COMPONENT_PN: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_7')
        //   }
        // ],
        // REPLACE_PN: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_8')
        //   }
        // ]
      },
      formRemov: {
        removeRecords: []
      },
      form: {
        insertRecords: [],
        updateRecords: []
      },
      TableData: {
        ID: 0,
        WO_NO: '',
        PCB_PN: '',
        COMPONENT_PN: '',
        REPLACE_PN: '',
        VENDOR_CODE: '',
        MAKER_PN: '',
        ENABLED: 'N',
        BEGINTIME: '',
        ENDTIME: '',
        DESCRIPTION: ''
      },
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      rules: {
        // WO_NO: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_1'),
        //     trigger: 'blur'
        //   }
        // ],
        // PCB_PN: [
        //   {
        //     required: true,
        //     message: this.$t('sls.p_6'),
        //     trigger: 'blur'
        //   }
        // ],
        COMPONENT_PN: [
          {
            required: true,
            message: this.$t('sls.p_7'),
            trigger: 'blur'
          }
        ],
        REPLACE_PN: [
          {
            required: true,
            message: this.$t('sls.p_8'),
            trigger: 'blur'
          }
        ]
        // BEGINTIME: [
        //   {
        //     required: true,
        //     message: this.$t('sls._3'),
        //     trigger: 'change'
        //   }
        // ],
        // ENDTIME: [{
        //   required: true,
        //   message: this.$t('sls._4'),
        //   trigger: 'change'
        // }]
      },
      dialogFormVisible: false
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    descripClick (e) {
      this.TableData.VENDOR_CODE = e
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        console.log(res, 'resresres')
        this.GetVendor()
      }
    },
    async GetVendor () {
      const res = await API.GetVendorCode(this.vendor)
      this.vendorList = res.Result
      if (this.vendorList.length === 0) {
        var obj = {
          ROWNO: -1,
          VENDOR_CODE: '',
          VENDOR_NAME: '',
          disabled: true
        }
        this.vendorList.push(obj)
      }
      console.log(this.vendorList, 'this.vendorList')
      this.Vetotal = res.TotalCount
      console.log(res, 'GetVendorCode')
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.mainTable = res.Result
      console.log(this.mainTable, '获取表格')
      this.totalPage = res.TotalCount
      this.loading = false
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    handleSize (val) {
      this.vendor.Limit = val
      this.GetVendor()
    },
    handleCurrent (val) {
      this.vendor.Page = val
      this.GetVendor()
    },
    // 搜索
    searchClick () {
      this.getLoadData()
    },
    // 新增
    async insertEvent (row) {
      this.empty()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    // 编辑
    editBut (row) {
      this.empty()
      this.TableData.ID = row.ID
      this.TableData.WO_NO = row.WO_NO
      this.TableData.PCB_PN = row.PCB_PN
      this.TableData.COMPONENT_PN = row.COMPONENT_PN
      this.TableData.REPLACE_PN = row.REPLACE_PN
      this.TableData.VENDOR_CODE = row.VENDOR_CODE
        ? Number(row.VENDOR_CODE)
        : ''
      this.TableData.MAKER_PN = row.MAKER_PN
      this.TableData.ENABLED = row.ENABLED
      this.TableData.BEGINTIME = row.BEGINTIME
      this.TableData.ENDTIME = row.ENDTIME
      this.TableData.DESCRIPTION = row.DESCRIPTION
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      console.log(row)
    },
    // 取消
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs.TableData.resetFields()
    },
    // 确认
    create (formName) {
      this.submit_but(formName)
    },
    // 编辑
    update (formName) {
      this.submit_but(formName)
    },
    // 确认提交
    async submit_but (formName) {
      this.form.insertRecords = []
      this.form.updateRecords = []
      if (this.TableData.ID === 0) {
        this.form.insertRecords.push(this.TableData)
      } else {
        this.form.updateRecords.push(this.TableData)
      }
      this.$refs.TableData.validate(async (valid, errInfo) => {
        if (valid) {
          // if (
          //   (this.TableData.WO_NO === '' || this.TableData.WO_NO === null) &&
          //   (this.TableData.PCB_PN === '' || this.TableData.PCB_PN == null)
          // ) {
          //   this.$message({
          //     showClose: true,
          //     message: this.$t('sls._5'),
          //     type: 'error'
          //   })
          //   return
          // }
          if (
            this.TableData.BEGINTIME &&
            this.TableData.ENDTIME &&
            this.TableData.ENDTIME <= this.TableData.BEGINTIME
          ) {
            this.TableData.ENDTIME = ''
            this.$message({
              showClose: true,
              message: this.$t('sls.invalid'),
              type: 'warning'
            })
            return
          }
          if (this.TableData.COMPONENT_PN === this.TableData.REPLACE_PN) {
            this.$message({
              showClose: true,
              message: this.$t('sls._1'),
              type: 'warning'
            })
            this.TableData.REPLACE_PN = ''
            return
          }

          const res = await API.SaveData(this.form)
          if (res.Result) {
            this.dialogFormVisible = false
            this.getLoadData()
            this.$notify({
              title: this.$t('se.success'),
              message: this.$t('se.savedsus'),
              type: 'success',
              duration: 2000
            })
          }
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    // 删除
    async removeClick (row) {
      console.log(row)
      if (row) {
        this.$confirm(this.$t('sls.fidelete'), this.$t('sls.prompt'), {
          confirmButtonText: this.$t('sls.confirm'),
          cancelButtonText: this.$t('sls.cancel'),
          type: 'warning'
        })
          .then(async () => {
            if (row.ID === 0) {
              this.$refs.xTable.remove(row)
              this.$notify({
                title: this.$t('sls.success'),
                message: this.$t('sls.sudeleted'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.$refs.xTable.remove(row)
              var postdata = this.$refs.xTable.getRecordset()
              this.formRemov.removeRecords = postdata.removeRecords
              API.SaveData(this.formRemov).then((response) => {
                if (response.Result) {
                  this.formRemov = {}
                  this.$notify({
                    title: this.$t('sls.success'),
                    message: this.$t('sls.sudeleted'),
                    type: 'success',
                    duration: 2000
                  })
                }
                this.getLoadData()
              })
            }
          })
          .catch(() => { })
      }
    },
    empty () {
      this.TableData = {
        ID: 0,
        WO_NO: '',
        PCB_PN: '',
        COMPONENT_PN: '',
        REPLACE_PN: '',
        VENDOR_CODE: '',
        MAKER_PN: '',
        ENABLED: 'N',
        BEGINTIME: '',
        ENDTIME: '',
        DESCRIPTION: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.SmtLineSubstitute {
  .SmtLineSubstitute-tanble-dev {
    height: calc(100vh - 2.1rem);
  }
  .dialog-tanble {
    height: calc(100vh - 5rem);
  }
}
.select-flex {
  display: flex;
  justify-content: space-around;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: #fff;
  z-index: 999;
}
</style>
<style>
.select-pagination {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999999;
  background: #fff;
}
.Dialog .el-form--label-top .el-form-item__label {
  padding: 0px;
}
</style>
