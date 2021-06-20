<template>
  <d2-container>
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               tableName="SFCS_OPERATIONS"
                               importBtnName="SfcsOperationsImport"
                               exportBtnName="SfcsOperationsExport"
                               exportTplName="SfcsOperationsExportTPL">
        <el-input v-model="formData.OPERATION_NAME"
                  :placeholder="$t('SfcsOperations._1')"
                  clearable
                  style="width:200px"
                  @keyup.enter.native="search_but" />&nbsp;
        <el-select style="width:200px"
                   clearable
                   v-model="formData.OPERATION_CATEGORY"
                   :placeholder="$t('SfcsOperations._11')">
          <el-option v-for="item in OPERATIONList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CHINESE"
                     :value="item.LOOKUP_CODE" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="search_but">{{ $t('publics.btn.search') }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="add_but"
                   v-if="$btnList.indexOf('SfcsOperationsAdd') !== -1">{{ $t('publics.btn.add') }}</el-button>
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
        <vxe-table-column field="OPERATION_NAME"
                          :title="$t('SfcsOperations._2')" />
        <vxe-table-column field="DESCRIPTION"
                          :title="$t('SfcsOperations._3')" />
        <vxe-table-column field="OPERATION_CATEGORY_NAME"
                          :title="$t('SfcsOperations._4')" />
        <vxe-table-column field="ENABLED"
                          :title="$t('SfcsOperations._5')">
          <template slot-scope="scope">
            <div>
              <el-switch :disabled="$btnList.indexOf('SfcsOperationsChangeEnabled') === -1"
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
                       @click.prevent="edit_but(scope.row)"
                       v-if="$btnList.indexOf('SfcsOperationsEdit') !== -1">{{ $t('publics.btn.edit') }}</el-button>
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
               class="SfcsOperations-form"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-position="top">
        <el-form-item :label="$t('SfcsOperations._6')"
                      prop="OPERATION_NAME">
          <el-input v-model="form.OPERATION_NAME"
                    :placeholder="$t('SfcsOperations._7')" />
        </el-form-item>
        <el-form-item :label="$t('SfcsOperations._8')"
                      prop="DESCRIPTION">
          <el-input v-model="form.DESCRIPTION"
                    :placeholder="$t('SfcsOperations._9')" />
        </el-form-item>
        <el-form-item :label="$t('SfcsOperations._10')"
                      prop="OPERATION_CATEGORY">
          <el-select v-model="form.OPERATION_CATEGORY"
                     style="width:100%"
                     :placeholder="$t('SfcsOperations._11')">
            <el-option v-for="item in OPERATIONList"
                       :key="item.LOOKUP_CODE"
                       :label="item.CHINESE"
                       :value="item.LOOKUP_CODE" />
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('SfcsOperations._17')"
                      prop="OPERATION_CLASS">
          <el-select v-model="form.OPERATION_CLASS"
                     style="width:100%"
                     :placeholder="$t('SfcsOperations._18')">
            <el-option v-for="item in category"
                       :key="item.ID"
                       :label="item.NAME"
                       :value="Number(item.ID)" />
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('SfcsOperations._12')">
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
} from '@/api/SfcsOperations'
import { mapGetters } from 'vuex'
export default {
  name: 'SfcsOperations',
  mixins: [pagination],
  components: {
    customContainerHeader
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      loading: false,
      mainTable: [],
      formData: {
        OPERATION_NAME: '',
        OPERATION_CATEGORY: '',
        ...this.formData
      },
      excite: {
        Id: null,
        Status: null,
        Operator: ''
      },
      category: [],
      OPERATIONList: [],
      form: {},
      addorediText: '',
      innerVisible: false,
      rules: {
        OPERATION_NAME: [
          {
            required: true,
            message: this.$t('SfcsOperations._13'),
            trigger: 'blur'
          }
        ],
        DESCRIPTION: [
          {
            required: true,
            message: this.$t('SfcsOperations._14'),
            trigger: 'blur'
          }
        ],
        OPERATION_CATEGORY: [
          {
            required: true,
            message: this.$t('SfcsOperations._15'),
            trigger: 'change'
          }
        ],
        OPERATION_CLASS: [
          {
            required: true,
            message: this.$t('SfcsOperations._18'),
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
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
      this.totalPage = res.TotalCount || 0
    },
    async exportData () {
      this.loading = true
      const res = await ExportData(this.formData)
      this.loading = false
      this.mainTable = res.Result || []
      this.totalPage = res.TotalCount || 0
    },
    // 获取添加编辑下拉
    async getAddOrModify () {
      const res = await AddOrModify()
      console.log(res, 'resres')
      this.category = res.Result.KindList
      this.OPERATIONList = res.Result.OperationCategoryList
    },
    // 是否启动有效
    change (index, row) {
      this.excite.Id = row.ID
      if (row.ENABLED === 'Y') {
        this.excite.Status = true
      } else {
        this.excite.Status = false
      }
      this.$confirm(this.$t('SfcsOperations._16'), this.$t('Manager.prompt'), {
        confirmButtonText: this.$t('Manager.confirm'),
        cancelButtonText: this.$t('Manager.cancel'),
        type: 'warning'
      })
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
    // 添加
    add_but () {
      this.form = {
        ENABLED: 'Y'
      }
      this.addorediText = this.$t('publics.btn.add')
      this.innerVisible = true
    }, // 编辑
    edit_but (row) {
      this.form = row
      this.form.OPERATION_CLASS = row.OPERATION_CLASS
        ? row.OPERATION_CLASS
        : ''
      this.addorediText = this.$t('publics.btn.edit')
      this.innerVisible = true
    },
    search_but () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cancel () {
      this.form = {}
      this.innerVisible = false
      this.addorediText = ''
    },
    shout_but (formName) {
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
            this.getLoadData()
            this.form = {}
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
    }
  },
  created () {
    this.excite.Operator = this.userinfo.USER_NAME
    this.getIndex()
  }
}
</script>
