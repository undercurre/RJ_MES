<template>
  <d2-container>
    <template slot="header">
      <custom-container-header importBtnName="SfcsParametersImport"
                               exportBtnName="SfcsParametersExport"
                               exportTplName="SfcsParametersExportTPL">
        <el-select v-model="empty"
                   filterable
                   clearable
                   :placeholder="$t('SfcsParameters._1')"
                   style="width: 180px"
                   remote
                   :loading="loading"
                   @change="selectChange"
                   @clear="clear">
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;top: 0;z-index: 99"></div>
          <div style="position: absolute;width: 100%;height: 6px;background: #fff;background: #fff;bottom: 0;z-index: 99"></div>
          <div style="width: 600px;display: flex;padding: 0 20px 0 10px;position: sticky;top: 6px;background: #fff;z-index: 90">
            <el-input v-model="listQuery.Key"
                      @input="getStatusList"
                      @keyup.enter.native="getStatusList"
                      :placeholder="$t('SfcsParameters._1')"></el-input>
            <el-button type="primary"
                       icon="el-icon-search"
                       @click.prevent="getStatusList">{{ $t('publics.btn.search') }}</el-button>
          </div>
          <el-option v-for="item in StatusList"
                     :key="item.ROWNO"
                     v-bind="selectBind(item)">
            <span style="float: left">{{ item.LOOKUP_TYPE }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.NAME }}</span>
          </el-option>
          <div style="width: 600px;position: sticky;bottom: 6px;background: #fff;z-index: 90;padding-left: 15px">
            <el-pagination :pager-count="5"
                           :current-page="listQuery.Page"
                           :page-size="listQuery.Limit"
                           :page-sizes="[15, 25, 35, 45]"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="StatustotalPage"
                           @size-change="listQuerySizeChange"
                           @current-change="listQueryCurrentChange" />
          </div>
        </el-select>
        <el-input style="width: 180px"
                  v-model="miaoshu"
                  :placeholder="$t('SfcsParameters._12')"
                  clearable></el-input>
        <el-input style="width: 180px"
                  v-model="formData.MEANING"
                  :placeholder="$t('SfcsParameters._11')"
                  clearable></el-input>
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   @click="insertEvent(null)"
                   icon="el-icon-plus"
                   v-if="$btnList.indexOf('SfcsParametersAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
        <el-button type="primary"
                   icon="el-icon-check"
                   @click.prevent="preserveClick()"
                   v-if="$btnList.indexOf('SfcsParametersEdit') !== -1">{{ $t('publics.btn.save') }}</el-button>
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
                 :edit-config="{trigger: 'click', mode: 'row', showStatus: true}"
                 :radio-config="{labelField: 'name', trigger: 'row'}"
                 :checkbox-config="{checkField: 'checked', trigger: 'row'}">
        <vxe-table-column field="LOOKUP_TYPE"
                          :title="$t('SfcsParameters._2')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="NAME"
                          :title="$t('SfcsParameters._3')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column field="LOOKUP_CODE"
                          :title="$t('SfcsParameters._4')"
                          min-width="120"
                          :edit-render="{name: '$input', props: {type: 'number'}}" />

        <vxe-table-column field="MEANING"
                          :title="$t('SfcsParameters._5')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />

        <vxe-table-column field="DESCRIPTION"
                          :title="$t('SfcsParameters._6')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="CHINESE"
                          :title="$t('SfcsParameters._7')"
                          min-width="180"
                          :edit-render="{name: 'input'}" />
        <vxe-table-column field="ENABLED"
                          :title="$t('ssc._9')"
                          min-width="120"
                          :edit-render="{autofocus: '.custom-input', type: 'visible'}">
          <template v-slot:edit="{ row}">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('plbd.tb_og')"
                          min-width="120"
                          align="center"
                          fixed="right">
          <template v-slot="{ row }">
            <el-button type="danger"
                       @click="removeClick(row, row.$index)"
                       v-if="$btnList.indexOf('SfcsParametersRemove') !== -1">{{ $t('publics.btn.delete') }}</el-button>
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
    <!-- modal -->
    <el-dialog v-dialogDrag
               :title="dialogText"
               :visible.sync="dialogVisible"
               width="60%"
               :close-on-click-modal="false">
      <div>
        <el-form ref="modifyForm"
                 :model="modifyForm"
                 :rules="validRules"
                 :show-message="false"
                 class="custom-form"
                 label-position="top">
          <el-row>
            <el-col span="11"
                    style="margin-right: 10px">
              <el-form-item :label="$t('SfcsParameters._2')"
                            prop="LOOKUP_TYPE">
                <el-input v-model="modifyForm.LOOKUP_TYPE"
                          clearable
                          placeholder=" "></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsParameters._4')"
                            prop="LOOKUP_CODE">
                <el-input v-model="modifyForm.LOOKUP_CODE"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsParameters._6')"
                            prop="DESCRIPTION">
                <el-input v-model="modifyForm.DESCRIPTION"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('ssc._9')"
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
            <el-col span="11">
              <el-form-item :label="$t('SfcsParameters._3')"
                            prop="NAME">
                <el-input v-model="modifyForm.NAME"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsParameters._5')"
                            prop="MEANING">
                <el-input v-model="modifyForm.MEANING"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
              <el-form-item :label="$t('SfcsParameters._7')"
                            prop="CHINESE">
                <el-input v-model="modifyForm.CHINESE"
                          placeholder=" "
                          clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer"
            style="display: flex;justify-content: center;">
        <el-button @click="dialogVisible = false">{{$t('ssc_rd.cancel')}}</el-button>
        <el-button type="primary"
                   @click="submitModifyForm">{{$t('ssc_rd.sure')}}</el-button>
      </span>
    </el-dialog>
  </d2-container>
</template>

<script>
import helper from '@/api/Helper'
import customContainerHeader from '@/components/custom-container-header'
import { GetStatusList } from '@/api/SfcsParameters'
import CURD from '@/views/mixin/CURD'
import pages from '@/views/mixin/page'
const API = helper('SfcsParameters')
export default {
  name: 'SfcsParameters',
  components: {
    customContainerHeader
  },
  mixins: [
    CURD({
      defaultSaveAPI: (e) => API.SaveData(e)
    }),
    pages
  ],
  data () {
    return {
      // 作为select的绑定，不绑定会报错
      empty: '',
      StatusList: [],
      formData: {
        LOOKUP_TYPE: '',
        NAME: '',
        DESCRIPTION: '',
        CHINESE: '',
        MEANING: '',
        // ...this.formData,
        Key: ''
      },
      loading: false,
      miaoshu: '',
      validRules: {
        LOOKUP_TYPE: [
          {
            required: true,
            message: this.$t('SfcsParameters._8')
          }
        ],
        NAME: [
          {
            required: true,
            message: this.$t('SfcsParameters._9')
          }
        ],
        LOOKUP_CODE: [
          {
            required: true,
            message: this.$t('SfcsParameters._10')
          }
        ],
        MEANING: [
          {
            required: true,
            message: this.$t('SfcsParameters._11')
          }
        ],
        DESCRIPTION: [
          {
            required: true,
            message: this.$t('SfcsParameters._13')
          }
        ],
        CHINESE: [
          {
            required: true,
            message: this.$t('SfcsParameters._14')
          }
        ],
        ENABLED: [
          {
            required: true,
            message: this.$t('SfcsParameters._15')
          }
        ]
      },
      dialogText: '',
      dialogVisible: false,
      modifyForm: {},
      listQuery: {
        Key: '',
        Page: 1,
        Limit: 15
      },
      StatustotalPage: 0
    }
  },
  methods: {
    selectBind (item) {
      const obj = {
        label: this.$i18n.locale === 'en' ? item.LOOKUP_TYPE : item.NAME,
        value: this.$i18n.locale === 'en' ? item.LOOKUP_TYPE : item.NAME
      }
      return obj
    },
    selectChange (item) {
      this.formData.LOOKUP_TYPE = this.$i18n.locale === 'en' ? item : ''
      this.formData.NAME = this.$i18n.locale === 'en' ? '' : item
      this.getLoadData()
    },
    clear () {
      this.formData.LOOKUP_TYPE = this.formData.NAME = ''
      this.getLoadData()
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
        this.getLoadData()
        this.getStatusList()
      }
    },
    async getStatusList () {
      const res = await GetStatusList(this.listQuery)
      this.StatustotalPage = res.TotalCount
      this.StatusList = res.Result || []
      if (!this.StatusList.length) {
        this.StatusList.push({
          LOOKUP_TYPE: '',
          NAME: '',
          ROWNO: ''
        })
      }
    },
    listQuerySizeChange (Limit) {
      this.listQuery.Page = 1
      this.listQuery.Limit = Limit
      this.getStatusList()
    },
    listQueryCurrentChange (Page) {
      this.listQuery.Page = Page
      this.getStatusList()
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    insertEvent (row) {
      // 直接抄 【】
      this.dialogVisible = true
      this.modifyForm = {
        ENABLED: 'Y'
      }
      this.dialogText = this.$t('publics.btn.add')
    },
    searchClick () {
      if (this.$i18n.locale === 'zh-chs') {
        this.formData.CHINESE = this.miaoshu
        this.formData.DESCRIPTION = ''
      } else {
        this.formData.DESCRIPTION = this.miaoshu
        this.formData.CHINESE = ''
      }
      this.formData.Page = 1
      this.getLoadData()
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
