<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="Sfcs_Operation_Sites"
                               importBtnName="SfcsOperationSitesImport"
                               exportBtnName="SfcsOperationSitesExport"
                               exportTplName="SfcsOperationSitesExportTPL">
        <el-input v-model="formData.OPERATION_SITE_NAME"
                  :placeholder="$t('SfcsOperationSites._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-select v-model="formData.OPERATION_LINE_ID"
                   style="width:200px"
                   clearable
                   @clear="OperationClear"
                   :placeholder="$t('SfcsOperationSites._9')">
          <el-option v-for="item in LineList"
                     :key="item.Id"
                     :label="item.OPERATION_LINE_NAME"
                     :value="item.Id" />
        </el-select>
        <el-select v-model="formData.OPERATION_ID"
                   style="width:200px"
                   clearable
                   @clear="operaIDClear"
                   :placeholder="$t('SfcsOperationSites._11')">
          <el-option v-for="item in OperationList"
                     :key="item.Id"
                     :value="item.Id"
                     :label="item.OPERATION_NAME" />
        </el-select>

        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="add_but"
                   v-if="$btnList.indexOf('SfcsOperationSitesAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
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
                 :data="mainTable">
        <vxe-table-column field="OPERATION_SITE_NAME"
                          :title="$t('SfcsOperationSites._2')" />
        <vxe-table-column field="LINE_INCN"
                          :title="$t('SfcsOperationSites._3')" />
        <vxe-table-column field="OPERATION_NAME"
                          :title="$t('SfcsOperationSites._4')" />
        <vxe-table-column field="ENABLED"
                          :title="$t('SfcsOperations._5')">
          <template slot-scope="scope">
            <div>
              <el-switch :disabled="$btnList.indexOf('SfcsOperationSitesChangeEnabled') === -1"
                         v-model="scope.row.ENABLED"
                         :active-text="$t('publics.btn.yes')"
                         :inactive-text="$t('publics.btn.no')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N"
                         @change="change(scope.$index,scope.row)" />
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column :title="$t('publics.field.operate')"
                          width="180"
                          align="center"
                          fixed="right">
          <template slot-scope="scope">
            <el-button type="primary"
                       v-if="$btnList.indexOf('SfcsOperationSitesEdit') !== -1"
                       @click.prevent="edit_but(scope.row)">{{ $t('publics.btn.edit') }}</el-button>
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
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               width="35%"
               :title="addorediText"
               :visible.sync="innerVisible"
               append-to-body>
      <el-form ref="callVal"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-width="120px">

        <el-form-item :label="$t('SfcsOperationSites._8')"
                      prop="OPERATION_LINE_ID">
          <!-- <el-select v-model="form.OPERATION_LINE_ID"
                     clearable
                     :placeholder="$t('SfcsOperationSites._9')">
            <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
              <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
              <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
            </div>
            <el-option style="width: 360px;display: flex"
                       v-for="item in LineList"
                       :key="item.Id"
                       :value="item.OPERATION_LINE_NAME"
                       :label="item.Id">
              <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.OPERATION_LINE_NAME }}</span>
              <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.LINE_NAME_INCN }}</span>
            </el-option>
          </el-select> -->
          <el-select v-model="form.OPERATION_LINE_ID"
                     style="width:100%"
                     @change="OperationName"
                     :placeholder="$t('SfcsOperationSites._9')">
            <el-option v-for="item in LineList"
                       :key="item.Id"
                       :label="item.OPERATION_LINE_NAME"
                       :value="item.Id" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('SfcsOperationSites._10')">
          <el-select v-model="form.OPERATION_ID"
                     clearable
                     @change="ProcessName"
                     style="width:100%"
                     :placeholder="$t('SfcsOperationSites._10')">
            <div style="height: 34px;padding: 0 20px;display: flex;position: sticky;top: 0;background: #fff;z-index: 9;border-bottom: 1px solid rgb(229, 231, 237)">
              <span style="width: 60%;box-size: border-box;padding-right: 10px;color: #606266;line-height: 34px;font-size: 14px">{{ $t('SfcsProductPallet._6') }}</span>
              <span style="width: 40%;color: #606266;line-height: 34px;font-size: 14px;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ $t('SfcsProductPallet._7') }}</span>
            </div>
            <el-option style="width: 360px;display: flex"
                       v-for="item in OperationList"
                       :key="item.Id"
                       :value="item.Id"
                       :label="item.OPERATION_NAME">
              <span style="width: 60%;box-size: border-box;padding-right: 10px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{ item.OPERATION_NAME }}</span>
              <span style="width: 40%;box-size: border-box;padding-left: 10px;border-left: 1px solid rgb(229, 231, 237)">{{ item.DESCRIPTION }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationSites._6')"
                      prop="OPERATION_SITE_NAME">
          <el-input v-model="form.OPERATION_SITE_NAME"
                    :placeholder="$t('SfcsOperationSites._7')"
                    type="text" />
        </el-form-item>
        <el-form-item :label="$t('SfcsOperationSites._12')">
          <el-switch v-model="form.ENABLED"
                     :active-text="$t('publics.btn.yes')"
                     :inactive-text="$t('publics.btn.no')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <div style="margin-top: 20px;text-align: right">
          <el-button type="success"
                     icon="el-icon-check"
                     @click="shout_but">&nbsp;{{ $t('publics.btn.makeSure') }}&nbsp;</el-button>
          <el-button icon="el-icon-close"
                     @click="cancel"
                     type="danger">&nbsp;{{ $t('publics.btn.cancel') }}&nbsp;</el-button>
        </div>
      </el-form>
    </el-dialog>
  </d2-container>
</template>

<script>
import pagination from '@/views/mixin/page'
import customContainerHeader from '@/components/custom-container-header'
import {
  Index,
  LoadData,
  AddOrModify,
  AddOrModifySave,
  ChangeEnabled,
  ExportData
} from '@/api/SfcsOperationSites'
export default {
  name: 'SfcsOperationSites',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  data () {
    return {
      formData: {
        OPERATION_SITE_NAME: '',
        OPERATION_LINE_ID: undefined,
        OPERATION_ID: undefined,
        ...this.formData
      },
      mainTable: [],
      loading: false,
      innerVisible: false,
      addorediText: '',
      rules: {
        OPERATION_SITE_NAME: [
          {
            required: true,
            message: this.$t('SfcsOperationSites._13'),
            trigger: 'blur'
          }
        ],
        OPERATION_LINE_ID: [
          {
            required: true,
            message: this.$t('SfcsOperationSites._14'),
            trigger: 'blur'
          }
        ]
      },
      form: {},
      excite: {
        Id: null,
        Status: null
      },
      LineList: [],
      OperationList: [],
      LineName: '',
      ProName: ''
    }
  },
  methods: {
    OperationClear () {
      console.log('111111')
      this.formData.OPERATION_LINE_ID = undefined
    },
    operaIDClear () {
      this.formData.OPERATION_ID = undefined
    },
    OperationName (row) {
      this.LineName = ''
      this.LineList.map(v => {
        if (row === v.Id) {
          this.LineName = v.OPERATION_LINE_NAME
        }
      })
      if (!this.form.OPERATION_SITE_NAME || this.form.ID === 0) {
        if (this.ProName) {
          this.$set(this.form, 'OPERATION_SITE_NAME', this.LineName + '-' + this.ProName)
          // this.form.OPERATION_SITE_NAME = this.LineName + '-' + this.ProName
        }
      }
    },
    ProcessName (row) {
      // console.log(row, 'ProcessName')
      this.ProName = ''
      this.OperationList.map(v => {
        if (row === v.Id) {
          this.ProName = v.OPERATION_NAME
        }
      })
      if ((!this.form.OPERATION_SITE_NAME || this.form.ID === 0) && this.ProName) {
        if (this.LineName) {
          this.$set(this.form, 'OPERATION_SITE_NAME', this.LineName + '-' + this.ProName)
          // this.form.OPERATION_SITE_NAME = this.LineName + '-' + this.ProName
        }
      }
      // else {
      //   this.form.OPERATION_SITE_NAME = ''
      // }
    },
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.getLoadData()
        this.getAddOrModify()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      this.mainTable = res.Result ? JSON.parse(res.Result) : []
      console.log(this.mainTable, 'this.mainTable')
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    async getAddOrModify () {
      const res = await AddOrModify()
      if (res.Result) {
        this.LineList = res.Result.LineList
        this.OperationList = res.Result.OperationList
      } else {
        this.LineList = this.OperationList = []
      }
    },
    search_but () {
      this.formData.Page = 1
      this.getLoadData()
    },
    // 添加
    add_but () {
      this.form = {
        ENABLED: 'Y',
        ID: 0
      }
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
    },
    // 编辑
    edit_but (row) {
      this.form = row
      this.addorediText = this.$t('publics.btn.edit')
      this.innerVisible = true
    },
    // 是否启动有效
    change (index, row) {
      this.excite.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(
        this.$t('SfcsOperationSites._15'),
        this.$t('Manager.prompt'),
        {
          confirmButtonText: this.$t('Manager.confirm'),
          cancelButtonText: this.$t('Manager.cancel'),
          type: 'warning'
        }
      )
        .then(async () => {
          const response = await ChangeEnabled(this.excite)
          if (response.Result) {
            this.getLoadData()
            this.$message({
              type: 'success',
              message: this.$t('Manager.Succfied')
            })
          } else {
            this.getLoadData()
          }
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    shout_but () {
      this.$refs.callVal.validate(async (valid, errInfo) => {
        if (valid) {
          const response = await AddOrModifySave(this.form)
          if (response.Result) {
            this.$notify({
              title: this.$t('IpqaConfig.AddOrModify.success'),
              message: this.$t('publics.tips.submitSuccess'),
              type: 'success',
              duration: 2000
            })
            this.form = {}
            this.getLoadData()
            this.innerVisible = false
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
    cancel () {
      this.form = {}
      this.innerVisible = false
      this.addorediText = ''
      this.LineName = ''
      this.ProName = ''
    }
  },
  created () {
    this.getIndex()
  }
}
</script>
