<template>
  <custom-container class="SmtDefectsRecords"
                    style="margin-top: 10px">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               exportBtnName="SmtDefectsRecordsExport"
                               importBtnName="SmtDefectsRecordsImport"
                               exportTplName="SmtDefectsRecordsExportTpl">
        <el-select v-model="formData.WORK_CLASS"
                   clearable
                   style="width: 150px"
                   :placeholder="$t('DefectsRecords._01')">
          <el-option v-for="item in WorkClassList"
                     :key="item.LOOKUP_CODE"
                     :label="item.CLASS_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-select v-model="formData.LINE_ID"
                   clearable
                   style="width: 150px"
                   :placeholder="$t('DefectsRecords.LINE_NAME')">
          <el-option v-for="item in LinesList"
                     :key="item.ID"
                     :label="item.LINE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click="search_but">{{
          $t("se.search")
        }}</el-button>
        <el-button type="success"
                   icon="el-icon-plus"
                   @click="add_but">{{
          $t("se.add")
        }}</el-button>
      </custom-container-header>
    </template>
    <!-- 表格内容 -->
    <div class="table-container"
         style="margin-top: 10px">
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
        <vxe-table-column min-width="120"
                          :title="$t('se.sn')">
          <template v-slot="{ $rowIndex }">{{ $rowIndex + 1 }}</template>
        </vxe-table-column>
        <vxe-table-column field="DEFECT_DATE"
                          min-width="150"
                          :title="$t('DefectsRecords.DEFECT_DATE')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="WORK_CLASS"
                          width="100"
                          :title="$t('DefectsRecords.WORK_CLASS')">
          <template v-slot="{ row }">
            <span v-if="row.WORK_CLASS == 0">{{
              $t("DefectsRecords.WORK_CLASSA")
            }}</span>
            <span v-else-if="row.WORK_CLASS == 1">{{
              $t("DefectsRecords.WORK_CLASSB")
            }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="LINE_TYPE"
                          width="140"
                          :title="$t('DefectsRecords.LINE_TYPE')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="LINE_NAME"
                          width="160"
                          :title="$t('DefectsRecords.LINE_NAME')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="MODEL"
                          width="170"
                          :title="$t('DefectsRecords.MODEL')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ALL_QTY"
                          width="150"
                          :title="$t('DefectsRecords.ALL_QTY')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="LOCATION"
                          width="160"
                          :title="$t('DefectsRecords.LOCATION')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="DEFECT_CODE"
                          width="150"
                          :title="$t('DefectsRecords.DEFECT_CODE')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="DEFECT_DESCRIPTION"
                          width="150"
                          :title="$t('DefectsRecords.DEFECT_NAME')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="DEFECT_QTY"
                          width="130"
                          :title="$t('DefectsRecords.DEFECT_QTY')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="CREATE_USER"
                          width="130"
                          :title="$t('DefectsRecords.CREATE_USER')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />

        <vxe-table-column field="ENABLED"
                          width="180"
                          fixed="right"
                          :title="$t('se.o')">
          <template slot-scope="scope">
            <el-button type="primary"
                       size="small"
                       @click="edit_but(scope.row)">{{ $t("se.edit") }}</el-button>
            <el-button type="danger"
                       size="small"
                       @click="remove_but(scope.row)">{{ $t("se.delete") }}</el-button>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <!-- 编辑页面 -->
    <el-dialog :close-on-click-modal="false"
               v-dialogDrag
               :title="textMap[dialogStatus]"
               :visible.sync="dialogFormVisible"
               width="50%">
      <el-form ref="form"
               label-position="top"
               :show-message="false"
               :model="form"
               :rules="rules"
               label-width="85px">
        <el-row :gutter="24">
          <el-col :span="12">
            <!-- 一列 -->
            <el-col :span="12">
              <el-form-item :label="$t('DefectsRecords.DEFECT_DATE')"
                            prop="DEFECT_DATE">
                <el-date-picker style="width: 100%"
                                v-model="form.DEFECT_DATE"
                                type="date"
                                :placeholder="$t('DefectsRecords.DEFECT_DATE')"
                                value-format="yyyy-MM-dd" />
              </el-form-item>
              <el-form-item :label="$t('DefectsRecords.ALL_QTY')"
                            prop="ALL_QTY">
                <el-input v-model="form.ALL_QTY"
                          :placeholder="$t('DefectsRecords.ALL_QTY')" />
              </el-form-item>
            </el-col>
            <!-- 二列 -->
            <el-col :span="12">
              <el-form-item :label="$t('DefectsRecords.WORK_CLASS')"
                            prop="WORK_CLASS">
                <el-select v-model="form.WORK_CLASS"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('DefectsRecords.WORK_CLASS')">
                  <el-option v-for="item in WorkClassList"
                             :key="item.ID"
                             :label="item.CLASS_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('DefectsRecords.LOCATION')"
                            prop="LOCATION">
                <el-input v-model="form.LOCATION"
                          :placeholder="$t('DefectsRecords.LOCATION')" />
              </el-form-item>
            </el-col>
          </el-col>
          <el-col :span="12">
            <!-- 左边 -->
            <el-col :span="12">
              <el-form-item :label="$t('DefectsRecords.LINE_NAME')"
                            prop="LINE_ID">
                <el-select v-model="form.LINE_ID"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('DefectsRecords.LINE_NAME')">
                  <el-option v-for="item in LinesList"
                             :key="item.ID"
                             :label="item.LINE_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('DefectsRecords.DEFECT_NAME')"
                            prop="DEFECT_CODE">
                <el-select v-model="form.DEFECT_CODE"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('DefectsRecords.DEFECT_NAME')">
                  <el-option v-for="item in DefectList"
                             :key="item.DEFECT_CODE"
                             :label="item.DEFECT_DESCRIPTION"
                             :value="item.DEFECT_CODE" />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- 右边 -->
            <el-col :span="12">
              <el-form-item :label="$t('DefectsRecords.MODEL')"
                            prop="MODEL">
                <el-input v-model="form.MODEL"
                          :placeholder="$t('DefectsRecords.MODEL')" />
              </el-form-item>
              <el-form-item :label="$t('DefectsRecords.DEFECT_QTY')"
                            prop="DEFECT_QTY">
                <el-input v-model="form.DEFECT_QTY"
                          :placeholder="$t('DefectsRecords.DEFECT_QTY')" />
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('MesTongsApply._71')">
              <el-input type="textarea"
                        :rows="4"
                        :placeholder="$t('MesTongsApply._72')"
                        v-model="form.REMARK" />
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
    <!-- 底部翻页 -->
    <template slot="footer">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </template>
  </custom-container>
</template>
<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import {
  Index,
  LoadData,
  ChangeEnabled,
  DeleteOneById,
  AddOrModifySave
} from '@/api/SmtDefectsRecords'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
export default {
  name: 'SmtDefectsRecords',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  data () {
    return {
      CategoryList: [],
      LinesList: [],
      DefectList: [],
      WorkClassList: [
        { CLASS_NAME: 'A班', ID: 0 },
        { CLASS_NAME: 'B班', ID: 1 }
      ],
      loading: false,
      mainTable: [],
      InsertRecords: [],
      UpdateRecords: [],
      RemoveRecords: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        ID: undefined,
        DEFECT_DATE: undefined,
        WORK_CLASS: undefined,
        LINE_ID: undefined,
        MODEL: undefined,
        ALL_QTY: undefined,
        DEFECT_QTY: undefined,
        LOCATION: undefined,
        DEFECT_CODE: undefined,
        DEFECT_NAME: undefined,
        CHECK_QTY: undefined,
        CREATE_USER: '',
        ORGANIZE_ID: '',
        REMARK: ''
      },
      // 验证
      rules: {
        DEFECT_DATE: [
          {
            required: true,
            message: this.$t('DefectsRecords._02'),
            trigger: 'blur'
          }
        ],
        WORK_CLASS: [
          {
            required: true,
            message: this.$t('DefectsRecords._03'),
            trigger: 'blur'
          }
        ],
        LINE_ID: [
          {
            required: true,
            message: this.$t('DefectsRecords._04'),
            trigger: 'blur'
          }
        ],
        MODEL: [
          {
            required: true,
            message: this.$t('DefectsRecords._05'),
            trigger: 'blur'
          }
        ],
        ALL_QTY: [
          {
            required: true,
            message: this.$t('DefectsRecords._06'),
            trigger: 'blur'
          }
        ],
        DEFECT_QTY: [
          {
            required: true,
            message: this.$t('DefectsRecords._09'),
            trigger: 'blur'
          }
        ],
        LOCATION: [
          {
            required: true,
            message: this.$t('DefectsRecords._07'),
            trigger: 'blur'
          }
        ],
        DEFECT_CODE: [
          {
            required: true,
            message: this.$t('DefectsRecords._08'),
            trigger: 'blur'
          }
        ]
      },
      DepartmentList: [],
      effect: {
        Id: '',
        Status: '',
        Operator: ''
      },
      img: {
        mst_id: 0,
        resource_id: 0
      },
      upload_url: process.env.VUE_APP_API + 'SfcsEquipment/UploadImage'
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.getIndex()
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      const res = await Index()
      if (res.Result) {
        this.DefectList = res.Result.DefectConfigList
        this.LinesList = res.Result.LinesList
        this.getLoadData()
      }
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      this.loading = false
      console.log(res.Result)
      this.mainTable = res.Result
      this.totalPage = res.TotalCount || 0
    },
    // 搜索
    search_but () {
      this.getLoadData()
    },
    // 是否有效
    change (index, row) {
      console.log(row)
      if (row.ENABLE === 'Y') {
        this.effect.Status = true
      } else {
        this.effect.Status = false
      }
      this.effect.Id = row.ID
      this.$confirm(this.$t('se.ftcuc'), this.$t('se.prompt'), {
        confirmButtonText: this.$t('se.confirm'),
        cancelButtonText: this.$t('se.cancel'),
        type: 'warning'
      })
        .then(() => {
          ChangeEnabled(this.effect).then((res) => {
            if (res.ErrorInfo.Status) {
              this.getLoadData()
              this.$message({
                type: 'error',
                message: res.ErrorInfo.Message
              })
            } else if (res.Result) {
              this.getLoadData()
              this.$message({
                type: 'success',
                message: this.$t('se.Succfied')
              })
            }
          })
        })
        .catch(() => {
          this.getLoadData()
        })
    },
    // 添加
    add_but () {
      this.img.mst_id = 0
      this.img.resource_id = 0
      this.resetTemp()
      this.dialogFormVisible = true
      this.dialogStatus = 'create'
    },
    // 添加时清空表格
    resetTemp () {
      this.form = {
        ID: undefined,
        DEFECT_DATE: undefined,
        WORK_CLASS: undefined,
        LINE_ID: undefined,
        MODEL: undefined,
        ALL_QTY: undefined,
        DEFECT_QTY: undefined,
        LOCATION: undefined,
        DEFECT_NAME: undefined,
        CHECK_QTY: undefined,
        CREATE_USER: '',
        ORGANIZE_ID: '',
        REMARK: '',
        DEFECT_CODE: undefined
      }
    },
    // 编辑
    edit_but (row) {
      this.form.ID = row.ID
      this.form.DEFECT_DATE = row.DEFECT_DATE
      this.form.WORK_CLASS = row.WORK_CLASS
      this.form.LINE_ID = row.LINE_ID
      this.form.MODEL = row.MODEL
      this.form.ALL_QTY = row.ALL_QTY
      this.form.DEFECT_QTY = row.DEFECT_QTY
      this.form.DEFECT_CODE = row.DEFECT_CODE
      this.form.LOCATION = row.LOCATION
      this.form.REMARK = row.REMARK
      this.dialogFormVisible = true
      this.dialogStatus = 'update'
    },
    // 删除
    remove_but (row) {
      if (row) {
        this.$confirm(this.$t('se.fidelete'), this.$t('se.prompt'), {
          confirmButtonText: this.$t('se.confirm'),
          cancelButtonText: this.$t('se.cancel'),
          type: 'warning'
        }).then(() => {
          DeleteOneById(row.ID).then((res) => {
            if (res.Result) {
              this.getLoadData()
              this.$notify({
                title: this.$t('se.success'),
                message: this.$t('se.sudeleted'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      }
    },
    // 取消
    cancel (formName) {
      this.dialogFormVisible = false
      this.$refs[formName].resetFields()
    },
    // 确认
    create (formName) {
      this.submit_but(formName)
    },
    // 编辑
    update (formName) {
      this.submit_but(formName)
    },
    endtimeClick () {
      if (this.form.END_TIME <= this.form.BUY_TIME) {
        this.form.END_TIME = ''
        this.$message({
          showClose: true,
          message: this.$t('se._2'),
          type: 'warning'
        })
      }
    },
    // 确认提交
    submit_but (formName) {
      this.InsertRecords = []
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          this.form.CREATE_USER = this.userinfo.USER_NAME
          this.form.ORGANIZE_ID = this.userinfo.ORGANIZE_ID

          if (this.dialogStatus === 'create') {
            this.InsertRecords.push(this.form)
          }
          if (this.dialogStatus === 'update') {
            this.UpdateRecords.push(this.form)
          }

          const res = await AddOrModifySave({
            InsertRecords: this.InsertRecords,
            UpdateRecords: this.UpdateRecords,
            RemoveRecords: this.RemoveRecords
          })
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
    }
  }
}
</script>
<style lang="scss" scoped>
.avatar-uploader {
  height: 350px;
  line-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  img {
    height: 100%;
  }
}
.upload-button {
  text-align: center;
}
</style>
<style>
.avatar-uploader .el-upload {
  /* width: 100%; */
  height: 100%;
}
.SmtDefectsRecords .el-form-item--small .el-form-item__label {
  line-height: 24px;
  padding-bottom: 0px;
}
</style>
