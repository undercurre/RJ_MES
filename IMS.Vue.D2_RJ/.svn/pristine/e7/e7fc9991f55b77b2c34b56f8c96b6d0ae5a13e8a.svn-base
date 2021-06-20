<template>
  <d2-container>
    <template slot="header">
      <custom-container-header tableName="SFCS_REASON_CONFIG"
                               exportMehodsName="exportData"
                               exportBtnName="SfcsReasonConfigExport"
                               importBtnName="SfcsReasonConfigImport"
                               exportTplName="SfcsReasonConfigExportTpl">
        <el-input style="width: 200px"
                  clearable
                  v-model="formData.REASON_CODE"
                  :placeholder="$t('SfcsReasonConfig._1')"
                  @keyup.enter.native="searchClick"></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-finished"
                   @click="drawer = true">{{ $t('SfcsPn._48') }}</el-button>

        <el-button type="warning"
                   icon="el-icon-refresh"
                   @click.prevent="resetFormData">{{ $t('publics.btn.reset') }}</el-button>
        <el-button icon="el-icon-plus"
                   type="success"
                   @click="insertEvent(null)"
                   v-if="$btnList.indexOf('SfcsReasonConfigAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsReasonConfigSave') !== -1">{{ $t('publics.btn.save') }}</el-button>
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
                 :mouse-config="{selected: true}"
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}"
                 @cell-click="cellClick">
        <vxe-table-column field="REASON_CODE"
                          min-width="160"
                          :title="$t('SfcsReasonConfig._7')"
                          :edit-render="{name:'input'}" />
        <vxe-table-column field="REASON_TYPE"
                          :title="$t('SfcsReasonConfig._8')"
                          min-width="180"
                          :edit-render="{name: 'select', options: list.ReasonCodeList}" />
        <vxe-table-column field="REASON_CLASS"
                          :title="$t('SfcsReasonConfig._9')"
                          min-width="180"
                          :edit-render="{name: 'select', options: list.ReasonTypeList}" />
        <vxe-table-column field="REASON_CATEGORY"
                          :title="$t('SfcsReasonConfig._10')"
                          min-width="180"
                          :edit-render="{name: 'select', options: list.ReasonCategoryList}" />
        <vxe-table-column field="LEVEL_CODE"
                          :title="$t('SfcsReasonConfig._11')"
                          min-width="180"
                          :edit-render="{name: 'select', options: list.LeveLCodeList}" />
        <vxe-table-column field="SOURCE"
                          :title="$t('SfcsReasonConfig._12')"
                          min-width="180"
                          :edit-render="{name: 'select', options: list.SourceList}" />
        <vxe-table-column field="REASON_DESCRIPTION"
                          :title="$t('SfcsReasonConfig._13')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="CHINESE_DESCRIPTION"
                          :title="$t('SfcsReasonConfig._14')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('SfcsReasonConfig._15')"
                          min-width="120"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row, $rowIndex }">
            <div>
              <el-switch v-model="row.ENABLED"
                         :disabled="$rowIndex !== currentRowIndex"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <template slot="footer">
      <el-pagination class="SmtLineSubstitute-pagination"
                     :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
    <!-- 抽屉 -->
    <el-drawer :title="$t('SfcsPn._48')"
               :visible.sync="drawer"
               direction="ltr">
      <div style="padding: 0 20px">
        <el-card class="box-card">
          <div slot="header"
               class="clearfix">
            <span>{{ $t('MesProductionPreMst._19') }}</span>
            <el-button style="float: right; padding: 3px 0"
                       type="text"
                       @click="searchClick(1)">{{ $t('MesProductionPreMst._20') }}</el-button>
            <el-button style="float: right; padding: 3px 0;margin-right: 20px"
                       type="text"
                       @click="resetListQuery">{{ $t('MesProductionPreMst._21') }}</el-button>
          </div>
          <el-form class="custom-form"
                   ref="formData"
                   label-position="top"
                   label-width="80px"
                   :model="formData"
                   size="mini">
            <el-form-item :label="$t('SfcsReasonConfig._8')">
              <el-select style="width: 100%"
                         clearable
                         v-model="formData.REASON_TYPE"
                         :placeholder="$t('SfcsReasonConfig._2')">
                <el-option v-for="item in list.ReasonCodeList.slice(1, list.ReasonCodeList.length)"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsReasonConfig._9')">
              <el-select style="width: 100%"
                         clearable
                         v-model="formData.REASON_CLASS"
                         :placeholder="$t('SfcsReasonConfig._3')">
                <el-option v-for="item in list.ReasonTypeList.slice(1, list.ReasonTypeList.length)"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsReasonConfig._10')">
              <el-select style="width: 100%"
                         clearable
                         v-model="formData.REASON_CATEGORY"
                         :placeholder="$t('SfcsReasonConfig._4')">
                <el-option v-for="item in list.ReasonCategoryList.slice(1, list.ReasonCategoryList.length)"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsReasonConfig._11')">
              <el-select style="width: 100%"
                         clearable
                         v-model="formData.LEVEL_CODE"
                         :placeholder="$t('SfcsReasonConfig._5')">
                <el-option v-for="item in list.LeveLCodeList.slice(1, list.LeveLCodeList.length)"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsReasonConfig._12')">
              <el-select style="width: 100%"
                         clearable
                         v-model="formData.SOURCE"
                         :placeholder="$t('SfcsReasonConfig._6')">
                <el-option v-for="item in list.SourceList.slice(1, list.SourceList.length)"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </el-drawer>
    <!-- 新增表单 -->
    <el-dialog v-dialogDrag
               :title="dialogText"
               :visible.sync="dialogVisible"
               width="60%"
               top="10px"
               :close-on-click-modal="false">
      <div>
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 :rules="validRules"
                 :show-message="false"
                 label-width="120px">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._7')"
                            prop="REASON_CODE">
                <el-input v-model="modifyForm.REASON_CODE"
                          clearable
                          placeholder=" "></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._8')"
                            prop="REASON_TYPE">
                <el-select style="width:100%"
                           v-model="modifyForm.REASON_TYPE"
                           filterable
                           clearable>
                  <el-option v-for="item in list.ReasonCodeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._9')"
                            prop="REASON_CLASS">
                <el-select style="width:100%"
                           v-model="modifyForm.REASON_CLASS"
                           filterable
                           clearable>
                  <el-option v-for="item in list.ReasonTypeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._10')"
                            prop="REASON_CATEGORY">
                <el-select style="width:100%"
                           v-model="modifyForm.REASON_CATEGORY"
                           filterable
                           clearable>
                  <el-option v-for="item in list.ReasonCategoryList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._11')"
                            prop="LEVEL_CODE">
                <el-select style="width:100%"
                           v-model="modifyForm.LEVEL_CODE"
                           filterable
                           clearable>
                  <el-option v-for="item in list.LeveLCodeList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('SfcsReasonConfig._12')"
                            prop="SOURCE">
                <el-select style="width:100%"
                           v-model="modifyForm.SOURCE"
                           filterable
                           clearable>
                  <el-option v-for="item in list.SourceList"
                             :key="item.value"
                             :label="item.label"
                             :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('SfcsReasonConfig._13')"
                        prop="REASON_DESCRIPTION">
            <el-input v-model="modifyForm.REASON_DESCRIPTION"
                      placeholder=" "
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('SfcsReasonConfig._14')"
                        prop="CHINESE_DESCRIPTION">
            <el-input v-model="modifyForm.CHINESE_DESCRIPTION"
                      placeholder=" "
                      clearable></el-input>
          </el-form-item>
          <el-form-item :label="$t('SfcsReasonConfig._15')"
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
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import helper from '@/api/Helper'
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
const API = helper('SfcsReasonConfig')
export default {
  name: 'SfcsReasonConfig',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        REASON_CODE: '',
        REASON_TYPE: '',
        REASON_CLASS: '',
        REASON_CATEGORY: '',
        LEVEL_CODE: '',
        SOURCE: '',
        ...this.formData
      },
      loading: false,
      mainTable: [],
      validRules: {
        REASON_CODE: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._1')
          }
        ],
        REASON_TYPE: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._2')
          }
        ],
        REASON_CATEGORY: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._4')
          }
        ],
        LEVEL_CODE: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._5')
          }
        ],
        SOURCE: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._6')
          }
        ],
        REASON_DESCRIPTION: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._51')
          }
        ],
        CHINESE_DESCRIPTION: [
          {
            required: true,
            message: this.$t('SfcsReasonConfig._50')
          }
        ]
      },
      currentRowIndex: -1,
      list: {
        ReasonCodeList: [],
        ReasonTypeList: [],
        ReasonCategoryList: [],
        LeveLCodeList: [],
        SourceList: [],
        IsEnableList: []
      },
      form: {},
      drawer: false,
      dialogText: '',
      dialogVisible: false,
      modifyForm: {
        REASON_CODE: '',
        REASON_TYPE: '',
        REASON_CLASS: '',
        REASON_CATEGORY: '',
        LEVEL_CODE: '',
        SOURCE: '',
        REASON_DESCRIPTION: '',
        CHINESE_DESCRIPTION: ''
      }
    }
  },
  methods: {
    resetFormData () {
      const { Limit, Key } = this.formData
      this.formData = {
        REASON_CODE: '',
        REASON_TYPE: '',
        REASON_CLASS: '',
        REASON_CATEGORY: '',
        LEVEL_CODE: '',
        SOURCE: '',
        Page: 1,
        Limit,
        Key
      }
      this.getLoadData()
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        Object.keys(this.list).forEach((item) => {
          this.list[item].push({
            label: '',
            value: '',
            disabled: false
          })
        })
        Object.keys(res.Result).forEach((item) => {
          if (item !== 'SourceList') {
            res.Result[item].map((_item) => {
              this.list[item].push({
                label: _item.CHINESE,
                value: _item.LOOKUP_CODE ? _item.LOOKUP_CODE.toString() : '',
                disabled: false
              })
            })
          } else if (item === 'SourceList') {
            res.Result[item].map((_item) => {
              this.list[item].push({
                label: _item.SOURCE,
                value: _item.SOURCE,
                disabled: false
              })
            })
          }
        })
        this.getLoadData()
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
      this.drawer = false
    },
    resetListQuery () {
      const { Limit, Key } = this.formData
      this.formData = {
        REASON_CODE: '',
        REASON_TYPE: '',
        REASON_CLASS: '',
        REASON_CATEGORY: '',
        LEVEL_CODE: '',
        SOURCE: '',
        Page: 1,
        Limit,
        Key
      }
    },
    cellClick (e) {
      const { $rowIndex } = e
      if (this.currentRowIndex !== $rowIndex) {
        this.currentRowIndex = $rowIndex
      }
    },
    async insertEvent (row) {
      // 直接抄 【】
      this.dialogVisible = true
      this.modifyForm = {}
      this.dialogText = this.$t('publics.btn.add')
      this.modifyForm.ENABLED = 'Y'
      // const record = {
      //   ID: 0,
      //   REASON_CODE: '',
      //   REASON_TYPE: '',
      //   REASON_CLASS: '',
      //   REASON_CATEGORY: '',
      //   LEVEL_CODE: '',
      //   SOURCE: '',
      //   REASON_DESCRIPTION: '',
      //   CHINESE_DESCRIPTION: '',
      //   ENABLED: 'Y'
      // }
      // const e = await this.$refs.xTable.insertAt(record, row)
      // this.disabled = true
      // this.currentRowIndex = 0
      // this.$refs.xTable.setActiveCell(e.row, 'MESSAGE_NO')
    },
    // 保存
    preserveClick () {
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(async (valid) => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            const response = await API.SaveData(this.form)
            if (response.Result) {
              this.form = {}
              this.getLoadData()
              this.$notify({
                title: this.$t('publics.tips.success'),
                message: this.$t('publics.tips.submitSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          }
        })
      }
    },
    // 提交
    submitModifyForm () {
      // 直接抄
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          let form = {}
          if (this.modifyForm.ID) {
            form = {
              updateRecords: [this.modifyForm]
            }
          } else {
            this.modifyForm.ID = 0
            form = {
              insertRecords: [this.modifyForm]
            }
          }

          const res = await API.SaveData(form)
          if (res.Result) {
            this.$notify({
              title: this.$t('ssc._12'),
              message: this.$t('ssc._13'),
              type: 'success',
              duration: 2000
            })
            this.resetForm()
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
    },
    resetForm () {
      this.mainTable = []
      this.formData.Page = 1
      this.dialogVisible = false
      this.getLoadData()
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
