<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportBtnName="SysPdaMenusExport"
                               importBtnName="SysPdaMenusImport"
                               exportTplName="SysPdaMenusExportTpl"
                               :isExport="false"
                               :isImport="false"
                               :isExportTpl="false">
        <el-input v-model="formData.MENU_NAME"
                  :placeholder="$t('pda.p_1')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.MODULE_NAME"
                  :placeholder="$t('pda.p_2')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-input v-model="formData.FORM_NAME"
                  :placeholder="$t('pda.p_6')"
                  clearable
                  style="width:180px"
                  @keyup.enter.native="searchClick" />&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t("pda.hd_sf") }}</el-button>
        <el-button v-if="$btnList.indexOf('SysPdaMenusAdd') !== -1"
                   type="success"
                   @click="insertEvent">
          <i class="el-icon-plus" />
          &nbsp;{{ $t("pda.add") }}
        </el-button>
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
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
                 @cell-click="vtableCell">
        <vxe-table-column width="150"
                          field="MENU_ID"
                          :title="$t('pda.t_9')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="150"
                          field="MENU_NAME"
                          :title="$t('pda.t_1')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="150"
                          field="MODULE_NAME"
                          :title="$t('pda.t_2')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="150"
                          field="DESCRIPTION"
                          :title="$t('pda.t_3')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column min-width="210"
                          field="PARAM_INFO"
                          :title="$t('pda.t_4')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="180"
                          field="ORDER_SEQ"
                          :title="$t('pda.t_5')"
                          :edit-render="{ name: '$input', props: { readonly: true } }">
        </vxe-table-column>
        <vxe-table-column width="150"
                          field="FORM_NAME"
                          :title="$t('pda.t_6')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column width="200"
                          field="ENABLED"
                          :title="$t('pda.t_8')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch disabled
                         v-model="row.ENABLED"
                         :active-text="$t('pda.yes')"
                         :inactive-text="$t('pda.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('pda.tb_og')"
                          width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button v-if="$btnList.indexOf('SysPdaMenusEdit') !== -1"
                       type="primary"
                       @click="editBut(row, row.$index)">{{
              $t("pda._2")
            }}</el-button>
            <el-button v-if="$btnList.indexOf('SysPdaMenusDelete') !== -1"
                       type="danger"
                       @click="removeClick(row, row.$index)">{{
              $t("pda.tb_rm")
            }}</el-button>
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
               class="Dialog x-di"
               :close-on-click-modal="false">
      <el-form label-position="top"
               ref="TableData"
               :show-message="false"
               :model="TableData"
               :rules="validRules"
               label-width="85px"
               class="Dialogform">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item prop="MENU_ID">
              <span>{{ $t("pda.t_9") }}</span>
              <el-input v-model="TableData.MENU_ID"
                        :placeholder="$t('pda.p_9')" />
            </el-form-item>

            <el-form-item prop="MENU_NAME">
              <span>{{ $t("pda.t_1") }}</span>
              <el-input v-model="TableData.MENU_NAME"
                        :placeholder="$t('pda.p_1')" />
            </el-form-item>

            <el-form-item prop="MODULE_NAME">
              <span>{{ $t("pda.t_2") }}</span>
              <el-input v-model="TableData.MODULE_NAME"
                        :placeholder="$t('pda.p_2')" />
            </el-form-item>

            <el-form-item prop="DESCRIPTION">
              <span>{{ $t("pda.t_3") }}</span>
              <el-input v-model="TableData.DESCRIPTION"
                        :placeholder="$t('pda.p_3')" />
            </el-form-item>
            <el-form-item prop="PARAM_INFO">
              <span>{{ $t("pda.t_4") }}</span>
              <el-input v-model="TableData.PARAM_INFO"
                        :placeholder="$t('pda.p_4')" />
            </el-form-item>
            <el-form-item :label="$t('pda.t_8')"
                          style="padding: 0;">
              <el-switch v-model="TableData.ENABLED"
                         :active-text="$t('pda.yes')"
                         :inactive-text="$t('pda.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="ORDER_SEQ">
              <span>{{ $t("pda.t_5") }}</span>
              <el-input v-model="TableData.ORDER_SEQ"
                        :placeholder="$t('pda.p_5')" />
            </el-form-item>
            <el-form-item prop="FORM_NAME">
              <span>{{ $t("pda.t_6") }}</span>
              <el-input v-model="TableData.FORM_NAME"
                        :placeholder="$t('pda.p_6')" />
            </el-form-item>
            <el-form-item>
              <span>{{ $t("pda.t_7") }}</span>&nbsp;&nbsp;
              <el-button type="success"
                         @click="Mtsadd">{{
                $t("pda.add")
              }}</el-button>
              <div class="mstTable">
                <vxe-table ref="mstTable"
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
                           :data="matTable"
                           :edit-rules="validRules"
                           :mouse-config="{ selected: true }"
                           :edit-config="{
                    trigger: 'click',
                    mode: 'row',
                    showStatus: true
                  }"
                           :radio-config="{ labelField: 'name', trigger: 'row' }"
                           :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
                  <vxe-table-column field="ROLE_NAME"
                                    :title="$t('pda.t_7')" />
                  <vxe-table-column :title="$t('pda.tb_og')"
                                    width="180"
                                    align="center"
                                    fixed="right">
                    <template v-slot="{ row }">
                      <el-button type="danger"
                                 @click="Mtsremove(row, row.$index)">{{ $t("pda.tb_rm") }}</el-button>
                    </template>
                  </vxe-table-column>
                </vxe-table>
              </div>
              <el-dialog width="45%"
                         :visible.sync="innerVisible"
                         append-to-body
                         :title="$t('pda._3')"
                         :close-on-click-modal="false">
                <div style="display: flex;margin-bottom: 10px;">
                  <el-input v-model="vendor.Key"
                            :placeholder="$t('pda._4')"
                            clearable
                            style="width:87%"
                            @keyup.enter.native="GetVendor" />
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="GetVendor">{{ $t("pda.hd_sf") }}</el-button>
                </div>
                <div>
                  <div class="mstTable">
                    <vxe-table ref="mstRef"
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
                               :data="vendorList">
                      <vxe-table-column type="checkbox"
                                        width="60"></vxe-table-column>
                      <vxe-table-column field="Role_Name"
                                        :title="$t('pda.t_7')" />
                    </vxe-table>
                  </div>
                </div>
                <el-pagination class="select-pagination"
                               :current-page="vendor.Page"
                               :page-size="vendor.Limit"
                               :page-sizes="[10, 20, 30, 50]"
                               :pager-count="5"
                               layout="total, sizes, prev, pager, next, jumper"
                               :total="Vetotal"
                               @size-change="handleSize"
                               @current-change="handleCurrent" />
                <div style="margin-top: 15px;text-align: right;">
                  <el-button type="success"
                             icon="el-icon-check"
                             @click="closeBut">&nbsp;{{ $t("publics.btn.makeSure") }}&nbsp;</el-button>
                  <el-button type="danger"
                             icon="el-icon-close"
                             @click="innerVisible = false">&nbsp;{{ $t("publics.btn.cancel") }}&nbsp;</el-button>
                </div>
              </el-dialog>
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
                   @click="update('form')">{{
          $t("se.confirm")
        }}</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<script>
import helper from '@/api/SysPdaMenus'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
const API = helper('SysPdaMenus')
export default {
  name: 'SysPdaMenus',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      mainTable: [],
      vendor: {
        Page: 1,
        Limit: 10,
        Key: ''
      },
      vendorList: [],
      Vetotal: 0,
      loading: false,
      formData: {
        MENU_NAME: '',
        MODULE_NAME: '',
        FORM_NAME: '',
        Page: 1,
        Limit: 15
      },
      totalPage: 0,
      dialogStatus: '',
      validRules: {
        MENU_NAME: [
          {
            required: true,
            message: this.$t('pda.p_1'),
            trigger: 'blur'
          }
        ],
        MODULE_NAME: [
          {
            required: true,
            message: this.$t('pda.p_2'),
            trigger: 'blur'
          }
        ],
        ROLES_STRING: [
          {
            required: true,
            message: this.$t('pda.p_7'),
            trigger: 'change'
          }
        ],
        MENU_ID: [
          {
            required: true,
            message: this.$t('pda.p_9'),
            trigger: 'blur'
          }
        ]
      },
      formRemov: {
        RemoveItem: {}
      },
      form: {
        SysPdaMenus: {},
        RolesList: {}
      },
      RolesList: {
        InsertRecords: [],
        UpdateRecords: [],
        RemoveRecords: []
      },
      TableData: {
        ID: 0, // 主键ID
        MENU_ID: '', // 菜单ID
        MENU_NAME: '', // 菜单名称
        MODULE_NAME: '', // 模块名称
        DESCRIPTION: '', // 说明
        PARAM_INFO: '', // 参数信息
        ORDER_SEQ: '', // 顺序号
        FORM_NAME: '', // 页面名称
        ROLES_STRING: '', // 权限ID字符串: 以,分隔
        ENABLED: 'N', // 是否启用
        User_Name: '' // 操作员
      },
      ROLES_STRING: '',
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      rules: {
        WO_NO: [
          {
            required: true,
            message: this.$t('pda.p_1'),
            trigger: 'blur'
          }
        ],
        PCB_PN: [
          {
            required: true,
            message: this.$t('pda.p_6'),
            trigger: 'blur'
          }
        ],
        COMPONENT_PN: [
          {
            required: true,
            message: this.$t('pda.p_7'),
            trigger: 'blur'
          }
        ],
        REPLACE_PN: [
          {
            required: true,
            message: this.$t('pda.p_8'),
            trigger: 'blur'
          }
        ]
      },
      dialogFormVisible: false,
      matTable: [],
      selList: [],
      innerVisible: false
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.TableData.User_Name = this.userinfo.USER_NAME // 操作员
    this.getIndex()
  },
  methods: {
    currentSel (selval) {
      this.selList = selval
      console.log(selval)
      console.log(selval.Role_Name)
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        this.getLoadRoleData()
      }
      console.log(res)
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      if (res.Result) {
        this.mainTable = res.Result
        this.totalPage = res.TotalCount
        console.log(res)
      }
    },
    async getLoadRoleData () {
      const res = await API.LoadRoleData(this.vendor)
      if (res.Result) {
        this.vendorList = res.Result
        this.Vetotal = res.TotalCount
      }
      console.log(res)
    },
    // 获取角色列表
    async vtableCell ({ row }) {
      const res = await API.LoadDetailData(row.ID)
      if (res.Result) {
        this.matTable = res.Result
      }
      console.log(res, 'res')
      console.log(row.ID)
    },
    handleSize (val) {
      this.vendor.Limit = val
      this.getLoadRoleData()
    },
    handleCurrent (val) {
      this.vendor.Page = val
      this.getLoadRoleData()
    },
    GetVendor () {
      this.vendor.Page = 1
      this.getLoadRoleData()
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
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
      this.TableData.ID = row.ID // 主键ID
      this.TableData.MENU_ID = row.MENU_ID // 菜单ID
      this.TableData.MENU_NAME = row.MENU_NAME // 菜单名称
      this.TableData.MODULE_NAME = row.MODULE_NAME // 模块名称
      this.TableData.DESCRIPTION = row.DESCRIPTION // 说明
      this.TableData.PARAM_INFO = row.PARAM_INFO // 参数信息
      this.TableData.ORDER_SEQ = row.ORDER_SEQ // 顺序号
      this.TableData.FORM_NAME = row.FORM_NAME // 页面名称
      this.TableData.ENABLED = row.ENABLED // 是否激活
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
      console.log(row)
    },
    // 取消
    cancel (formName) {
      // this.$refs.mstRef.clearCheckboxRow()
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
      this.form.SysPdaMenus = {}
      this.form.SysPdaMenus = this.TableData
      this.form.RolesList = this.RolesList
      this.$refs.TableData.validate(async (valid, errInfo) => {
        if (valid) {
          // if (this.matTable.length === 0) {
          //   this.$message.error(this.$t('pda.p_7'))
          //   return
          // }
          var postdata = this.$refs.mstTable.getRecordset()
          this.RolesList.InsertRecords = postdata.insertRecords
          this.RolesList.UpdateRecords = postdata.updateRecords
          this.RolesList.RemoveRecords = postdata.removeRecords
          const res = await API.SaveData(this.form)
          console.log(JSON.stringify(this.form))
          if (res.Result) {
            this.form = {}
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
            Object.keys(errInfo).forEach(item => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) { }
        }
      })
    },
    // 删除
    async removeClick (row) {
      // console.log(this.$refs.mstTable.getTableData(), 'this.$refs.mstTable')
      console.log(row)
      if (row) {
        this.$confirm(this.$t('pda.fidelete'), this.$t('pda.prompt'), {
          confirmButtonText: this.$t('pda.confirm'),
          cancelButtonText: this.$t('pda.cancel'),
          type: 'warning'
        })
          .then(async () => {
            if (row.ID === 0) {
              this.$refs.xTable.remove(row)
              this.$notify({
                title: this.$t('pda.success'),
                message: this.$t('pda.sudeleted'),
                type: 'success',
                duration: 2000
              })
            } else {
              this.formRemov.RemoveItem = row
              API.SaveData(this.formRemov).then(response => {
                if (response.Result) {
                  this.$notify({
                    title: this.$t('pda.success'),
                    message: this.$t('pda.sudeleted'),
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
        ID: 0, // 主键ID
        MENU_ID: '', // 菜单ID
        MENU_NAME: '', // 菜单名称
        MODULE_NAME: '', // 模块名称
        DESCRIPTION: '', // 说明
        PARAM_INFO: '', // 参数信息
        ORDER_SEQ: '', // 顺序号
        FORM_NAME: '', // 页面名称
        ROLES_STRING: '', // 权限ID字符串: 以,分隔
        ENABLED: 'N', // 是否启用
        User_Name: this.userinfo.USER_NAME // 操作员
      }
      this.matTable = []
    },
    // 设置
    Mtsremove (row) {
      this.$refs.mstTable.remove(row)
    },
    Mtsadd () {
      this.innerVisible = true
    },
    closeBut () {
      this.innerVisible = false
      var procesArr = []
      procesArr = this.$refs.mstRef.getCheckboxRecords()
      if (procesArr.length !== 0) {
        const arr1Ids = this.matTable.map(item => Number(item.ROLE_ID))
        const result = procesArr.filter(item => !arr1Ids.includes(item.Id))
        var row = null
        var taht = this
        result.forEach(function (item) {
          const record = {
            ID: 0,
            MST_ID: 0,
            ROLE_ID: item.Id,
            ROLE_NAME: item.Role_Name
          }
          // 从最后插入
          taht.$refs.mstTable.insertAt(record, row).then(({ row }) => {
            taht.$refs.xTable.setActiveRow(row)
          })
        })
        console.log(this.matTable, 'that.matTablethat.matTable')
      }
      this.$refs.mstRef.clearCheckboxRow()
    }
  }
}
</script>
<style>
.x-di .el-dialog {
  margin-top: 5vh !important;
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
.select-pagination {
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999999;
  background: #fff;
}
.mstTable {
  height: calc(100vh - 510px);
  margin-top: 10px;
}
</style>
