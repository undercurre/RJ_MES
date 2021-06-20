<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               importBtnName="SmtResourceRulesImport"
                               exportBtnName="SmtResourceRulesExport"
                               exportTplName="SmtResourceRulesExportTPL">
        <el-select v-model="formData.OBJECT_ID"
                   clearable
                   style="width:200px"
                   :placeholder="$t('as_cfe.p_name')"
                   @change="() => {
            listQuery.Page = 1;
            formData.CATEGORY_ID = '';
            getCustomerList()
          }">
          <el-option v-for="item in NameList"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value" />
        </el-select>
        <el-select clearable
                   style="width:200px"
                   v-model="formData.CATEGORY_ID"
                   :placeholder="$t('as_cfe.ps')">
          <!-- 占位元素 -->
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="listQuery.Key"
                      :placeholder="this.$t('publics.tips.enterKeyWord')"
                      clearable />
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="searchQueryList">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option style="width: 600px"
                     v-for="item in customerList"
                     :key="item.CATEGORY_ID"
                     :label="item.CATEGORY_NAME"
                     :value="item.CATEGORY_ID"></el-option>
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
                   @click.prevent="searchClick">{{ $t('as_cfe.sf') }}</el-button>
        <el-button type="success"
                   @click="insertEvent"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SmtResourceRulesAdd') !== -1">{{ $t('as_cfe.add') }}</el-button>
        <!-- <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click.prevent="preserveClick"
        >{{ $t('as_cfe.save') }}</el-button>-->
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
                 :loading="loading"
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="EN_DESC"
                          min-width="150"
                          :title="$t('as_cfe.tb_name')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="CATEGORY_NAME"
                          min-width="150"
                          :title="$t('as_cfe.tb_cy')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="MEANING"
                          :title="$t('as_cfe.tb_ps')"
                          min-width="200"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STANDARD_TIME"
                          min-width="150"
                          :title="$t('as_cfe.tb_tm')"
                          :edit-render="{name: '$input', props: {readonly: true}}" />
        <vxe-table-column field="STANDARD_FLAG"
                          min-width="180"
                          :title="$t('as_cfe.tb_mt')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div>
              <span class="green-txt"
                    v-if="row.STANDARD_FLAG === 'Y'">{{$t('publics.btn.yes')}}</span>
              <span v-else
                    class="red-txt">{{$t('publics.btn.no')}}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="VALID_FLAG"
                          min-width="150"
                          :title="$t('as_cfe.tb_time')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <span class="green-txt"
                    v-if="row.VALID_FLAG === 'Y'">{{$t('publics.btn.yes')}}</span>
              <span v-else
                    class="red-txt">{{$t('publics.btn.no')}}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="EXPOSE_FLAG"
                          min-width="120"
                          :title="$t('as_cfe.tb_ep')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div>
              <span class="green-txt"
                    v-if="row.EXPOSE_FLAG === 'Y'">{{$t('publics.btn.yes')}}</span>
              <span v-else
                    class="red-txt">{{$t('publics.btn.no')}}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="ENABLED"
                          min-width="120"
                          :title="$t('as_cfe.tb_ii')"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row }">
            <div>
              <span class="green-txt"
                    v-if="row.ENABLED === 'Y'">{{$t('publics.btn.yes')}}</span>
              <span v-else
                    class="red-txt">{{$t('publics.btn.no')}}</span>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('as_cfe.tb_og')"
                          min-width="180"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="primary"
                       @click="editRow(row, row.$index)"
                       v-if="$btnList.indexOf('SmtResourceRulesEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SmtResourceRulesRemove') !== -1">{{ $t('as_cfe.tb_rm') }}</el-button>
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
    <!-- modal -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="dialogTxt"
               :visible.sync="dialogVisible"
               width="40%">
      <el-form class="custom-form"
               label-position="top"
               label-width="80px"
               ref="modifyForm"
               :model="modifyForm"
               :show-message="false"
               :rules="validRules"
               size="small">
        <el-row>
          <el-col :span="11">
            <el-form-item :label="$t('as_cfe.tb_name')"
                          prop="OBJECT_ID">
              <el-select style="width: 100%"
                         clearable
                         filterable
                         v-model="modifyForm.OBJECT_ID"
                         placeholder=" "
                         @change="(e) => {
                  listQuery2.Page = 1;
                  modifyForm.CATEGORY_ID = '';
                  changeProcessList(e);
                  getCustomerList2()
                  makeSureTarget(e)
                }">
                <el-option v-for="item in NameList"
                           :value="parseInt(item.value)"
                           :key="parseInt(item.value)"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('as_cfe.tb_ps')"
                          prop="ROUTE_OPERATION_ID">
              <!-- <el-select v-model="modifyForm.ROUTE_OPERATION_ID" style="width: 100%">
                <div
                  style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)"
                >
                  <span
                    style="width: 40%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px"
                  >对象</span>
                  <span
                    style="width: 60%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)"
                  >内容</span>
                </div>
                <el-option
                  style="width: 360px;display: flex"
                  v-for="item in ProcessList"
                  :value="item.value"
                  :key="item.value"
                  :label="item.label"
                >
                  <span
                    style="width: 40%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                  >{{ item.OBJECT_NAME }}</span>
                  <span
                    style="width: 60%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)"
                  >{{ item.label }}</span>
                </el-option>
              </el-select> -->
              <el-select :disabled="ProcessListDisabled"
                         v-model="modifyForm.ROUTE_OPERATION_ID"
                         clearable
                         filterable
                         style="width: 100%"
                         placeholder=" ">
                <el-option v-for="item in ProcessList"
                           :value="item.value"
                           :key="item.value"
                           :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('as_cfe.tb_mt')"
                          prop="STANDARD_FLAG">
              <el-switch v-model="modifyForm.STANDARD_FLAG"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('as_cfe.tb_ep')"
                          prop="EXPOSE_FLAG">
              <el-switch v-model="modifyForm.EXPOSE_FLAG"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="11"
                  :offset="2">
            <el-form-item :label="$t('as_cfe.tb_cy')"
                          prop="CATEGORY_ID">
              <el-select clearable
                         style="width:100%"
                         v-model="modifyForm.CATEGORY_NAME"
                         placeholder=" "
                         @change="handleChangeCate">
                <!-- 占位元素 -->
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
                <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
                <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
                  <el-input v-model="listQuery2.Key"
                            :placeholder="this.$t('publics.tips.enterKeyWord')"></el-input>
                  <el-button type="primary"
                             icon="el-icon-search"
                             @click.prevent="searchQueryList2">{{ $t('publics.btn.search') }}</el-button>
                </div>
                <el-option style="width: 600px"
                           v-for="item in customerList2"
                           :key="item.CATEGORY_ID"
                           :label="item.CATEGORY_NAME"
                           :value="item.CATEGORY_ID"></el-option>
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
            <el-form-item :label="$t('as_cfe.tb_tm')"
                          prop="STANDARD_TIME">
              <el-input v-model="modifyForm.STANDARD_TIME"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('as_cfe.tb_time')"
                          prop="VALID_FLAG">
              <el-switch v-model="modifyForm.VALID_FLAG"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('as_cfe.tb_ii')"
                          prop="ENABLED">
              <el-switch v-model="modifyForm.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
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
import { LoadData as _LoadData } from '@/api/SmtResourceCategory'
const API = helper('SmtResourceRules')
export default {
  name: 'SmtResourceRules',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      formData: {
        CATEGORY_ID: '',
        OBJECT_ID: '',
        ...this.formData
      },
      validRules: {
        OBJECT_ID: [
          {
            required: true,
            message: this.$t('as_cfe.p_name'),
            trigger: 'change'
          }
        ],
        CATEGORY_ID: [
          {
            required: true,
            message: this.$t('as_cfe.p_ty'),
            trigger: 'change'
          }
        ],
        ROUTE_OPERATION_ID: [
          {
            required: true,
            message: this.$t('as_cfe.p_ps'),
            trigger: 'change'
          }
        ],
        STANDARD_TIME: [
          {
            required: true,
            message: this.$t('as_cfe.p_time'),
            trigger: 'blur'
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      NameList: [],
      ProcessList: [],
      defaultProcessList: [],
      listQuery: {
        OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: '',
        totalPage: 0
      },
      customerList: [],
      dialogVisible: false,
      dialogTxt: '',
      modifyForm: {
        ID: 0,
        OBJECT_ID: 0,
        CATEGORY_ID: 0,
        ROUTE_OPERATION_ID: 0,
        STANDARD_TIME: '',
        STANDARD_FLAG: 'N',
        VALID_FLAG: 'N',
        EXPOSE_FLAG: 'N',
        ENABLED: 'N'
      },
      listQuery2: {
        OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: '',
        totalPage: 0
      },
      customerList2: [],
      name: undefined,
      ProcessListDisabled: true
    }
  },
  methods: {
    makeSureTarget (e) {
      this.NameList.map(item => {
        if (item.value === e.toString()) {
          this.name = item.label
        }
      })
      const data = []
      this.ProcessList.map(item => {
        if (this.name === item.OBJECT_NAME) {
          data.push(item)
        }
      })
      this.ProcessListDisabled = false
      this.ProcessList = []
      this.ProcessList = data
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        const { NameList = [], ProcessList = [] } = res.Result
        this.NameList = []
        NameList.map(item => {
          this.NameList.push({
            label: item.NAME,
            value: item.ID,
            disabled: false
          })
        })

        this.ProcessList = []
        ProcessList.map(item => {
          this.ProcessList.push({
            OBJECT_NAME: item.OBJECT_NAME,
            label: item.MEANING,
            value: item.ID,
            disabled: false
          })
        })
        this.defaultProcessList = this.ProcessList
        this.getLoadData()
        this.getCustomerList()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? res.Result : []
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await API.ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async getCustomerList () {
      this.listQuery.OBJECT_ID = this.formData.OBJECT_ID
      const res = await _LoadData(this.listQuery)
      if (res.Result) {
        this.customerList = res.Result ? JSON.parse(res.Result) : []
        this.listQuery.totalPage = res.TotalCount || 0
        if (!this.customerList.length) {
          this.customerList.push({
            CATEGORY_NAME: '',
            CATEGORY_ID: ''
          })
        }
      }
    },
    async getCustomerList2 () {
      this.listQuery2.OBJECT_ID = this.modifyForm.OBJECT_ID
      const res = await _LoadData(this.listQuery2)
      if (res.Result) {
        this.customerList2 = res.Result ? JSON.parse(res.Result) : []
        this.listQuery2.totalPage = res.TotalCount || 0
        if (!this.customerList2.length) {
          this.customerList2.push({
            CATEGORY_NAME: '',
            CATEGORY_ID: ''
          })
        }
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 新增
    insertEvent (row) {
      this.modifyForm = {
        ID: 0,
        OBJECT_ID: '',
        CATEGORY_ID: '',
        ROUTE_OPERATION_ID: '',
        STANDARD_TIME: '',
        STANDARD_FLAG: 'Y',
        VALID_FLAG: 'Y',
        EXPOSE_FLAG: 'Y',
        ENABLED: 'Y'
      }
      this.listQuery2 = {
        OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: '',
        totalPage: 0
      }
      this.customerList2 = []
      this.getCustomerList2()
      this.dialogVisible = true
      this.ProcessListDisabled = true
      this.dialogTxt = this.$t('publics.btn.add')
    },
    editRow (row) {
      this.modifyForm = JSON.parse(JSON.stringify(row))
      this.listQuery2 = {
        OBJECT_ID: '',
        Page: 1,
        Limit: 10,
        Key: '',
        totalPage: 0
      }
      this.customerList2 = []
      this.getCustomerList2()
      this.dialogVisible = true
      this.dialogTxt = this.$t('publics.btn.edit')
    },
    // 删除
    removeClick (row) {
      var postdata = this.$refs.xTable.getRecordset()
      if (row) {
        this.$confirm(this.$t('as_cfe.fidelete'), this.$t('as_cfe.prompt'), {
          confirmButtonText: this.$t('as_cfe.confirm'),
          cancelButtonText: this.$t('as_cfe.cancel'),
          type: 'warning'
        }).then(async () => {
          if (row.ID === 0) {
            this.$refs.xTable.remove(row)
            this.$notify({
              title: this.$t('as_cfe.success'),
              message: this.$t('as_cfe.sudeleted'),
              type: 'success',
              duration: 2000
            })
          } else {
            this.$refs.xTable.remove(row)
            this.form.removeRecords = postdata.removeRecords
            const response = await API.SaveData(this.form)
            if (response.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('as_cfe.success'),
                message: this.$t('as_cfe.sudeleted'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getCustomerList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getCustomerList()
    },
    searchQueryList () {
      this.listQuery.Page = 1
      this.getCustomerList()
    },
    listQuerySizeChange2 (Limit) {
      this.listQuery2.Page = 1
      this.listQuery2.Limit = Limit
      this.getCustomerList2()
    },
    listQueryCurrentChange2 (Page) {
      this.listQuery2.Page = Page
      this.getCustomerList2()
    },
    searchQueryList2 () {
      this.listQuery2.Page = 1
      this.getCustomerList2()
    },
    changeProcessList (e) {
      if (e) {
        let NAME = ''
        this.NameList.map(item => {
          if (item.value === e) {
            NAME = item.label
          }
        })
        if (NAME) {
          this.ProcessList = []
          this.defaultProcessList.map(item => {
            if (item.OBJECT_NAME === NAME) {
              this.ProcessList.push(item)
            }
          })
        } else {
          this.ProcessList = this.defaultProcessList
        }
      } else {
        this.ProcessList = this.defaultProcessList
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
              CATEGORY_ID: '',
              OBJECT_ID: '',
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
    handleChangeCate (e) {
      this.customerList2.map(item => {
        if (parseInt(item.CATEGORY_ID) === parseInt(e)) {
          this.modifyForm.CATEGORY_ID = item.CATEGORY_ID
          this.modifyForm.CATEGORY_NAME = item.CATEGORY_NAME
        }
      })
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
