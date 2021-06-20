<template>
  <custom-container class="SfcsEquipmentThrow"
                    style="margin-top: 10px">
    <template slot="header">
      <custom-container-header exportMehodsName="exportData"
                               exportBtnName="SfcsEquipmentThrowExport"
                               importBtnName="SfcsEquipmentThrowImport"
                               exportTplName="SfcsEquipmentThrowExportTpl">
        <el-select v-model="formData.LINE_ID"
                   clearable
                   style="width: 150px"
                   :placeholder="$t('SfcsEquipmentThrow.LINE_NAME')">
          <el-option v-for="item in LinesList"
                     :key="item.LINE_ID"
                     :label="item.LINE_NAME"
                     :value="item.LINE_ID" />
        </el-select>&nbsp;
        <el-input v-model="formData.WO_NO"
                  style="width: 150px"
                  :placeholder="$t('CutomersComplaint.WO_NO')"
                  clearable
                  class="common-top"
                  @keyup.enter.native="search_but" />
        <el-input v-model="formData.PART_NO"
                  style="width: 150px"
                  :placeholder="$t('CutomersComplaint.PART_NO')"
                  clearable
                  class="common-top"
                  @keyup.enter.native="search_but" />
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
        <vxe-table-column field="LINE_NAME"
                          min-width="150"
                          :title="$t('SfcsEquipmentThrow.LINE_NAME')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="THROW_DATE"
                          width="140"
                          :title="$t('SfcsEquipmentThrow.THROW_DATE')"
                          value-format="yyyy-MM-dd"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="TIME_SLOT"
                          width="160"
                          :title="$t('SfcsEquipmentThrow.TIME_SLOT')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="WO_NO"
                          width="160"
                          :title="$t('SfcsEquipmentThrow.WO_NO')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="PART_NO"
                          width="170"
                          :title="$t('SfcsEquipmentThrow.PART_NO')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="MODEL"
                          width="170"
                          :title="$t('SfcsEquipmentThrow.MODEL')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="ORDER_QTY"
                          width="150"
                          :title="$t('SfcsEquipmentThrow.ORDER_QTY')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="TARGET_QTY"
                          width="160"
                          :title="$t('SfcsEquipmentThrow.TARGET_QTY')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <!--        <vxe-table-column
          field="OPERATION_SITE_NAME"
          width="150"
          :title="$t('SfcsEquipmentThrow.OPERATION_SITE_NAME')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        /> -->
        <vxe-table-column field="EQUIPMENT_NAME"
                          width="150"
                          :title="$t('SfcsEquipmentThrow.EQUIPMENT_NAME')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="THROW_QTY"
                          width="130"
                          :title="$t('SfcsEquipmentThrow.THROW_QTY')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="THROW_RATE"
                          width="130"
                          :title="$t('SfcsEquipmentThrow.THROW_RATE')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="CREATE_TIME"
                          width="150"
                          :title="$t('SfcsEquipmentThrow.CREATE_TIME')"
                          :edit-render="{ name: '$input', props: { readonly: true } }" />
        <vxe-table-column field="CREATE_USER"
                          width="130"
                          :title="$t('SfcsEquipmentThrow.CREATE_USER')"
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
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.LINE_NAME')"
                            prop="LINE_ID">
                <el-select v-model="form.LINE_ID"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           @change="selectGetOperationSite"
                           :placeholder="$t('SfcsEquipmentThrow.LINE_NAME')">
                  <el-option v-for="item in LinesList"
                             :key="item.LINE_ID"
                             :label="item.LINE_NAME"
                             :value="item.LINE_ID" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.EQUIPMENT_NAME')"
                            prop="EQUIPMENT_ID">
                <el-select v-model="form.EQUIPMENT_ID"
                           clearable
                           class="filter-item"
                           style="width: 100%"
                           :placeholder="$t('SfcsEquipmentThrow.EQUIPMENT_NAME')">
                  <el-option v-for="item in SfcsEquipmentList"
                             :key="item.ID"
                             :label="item.NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.THROW_DATE')"
                            prop="THROW_DATE">
                <el-date-picker style="width: 100%"
                                v-model="form.THROW_DATE"
                                type="date"
                                :placeholder="$t('SfcsEquipmentThrow.THROW_DATE')"
                                value-format="yyyy-MM-dd" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.START_TIME')"
                            prop="START_TIME">
                <el-time-select style="width: 100%"
                                placeholder="起始时间"
                                v-model="form.START_TIME"
                                :picker-options="{
                    start: '08:00',
                    step: '00:01',
                    end: '21:30',
                  }">
                </el-time-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.END_TIME')"
                            prop="END_TIME">
                <el-time-select style="width: 100%"
                                placeholder="结束时间"
                                v-model="form.END_TIME"
                                :picker-options="{
                    start: '08:00',
                    step: '00:01',
                    end: '21:30',
                    minTime: START_TIME,
                  }">
                </el-time-select>
              </el-form-item>
            </el-col>
            <!--            <el-col :span="8">
                <el-form-item :label="$t('SfcsEquipmentThrow.OPERATION_SITE_NAME')" prop="SITE_ID">
                <el-select
                  v-model="form.SITE_ID"
                  clearable
                  class="filter-item"
                  style="width: 100%"
                  :placeholder="$t('SfcsEquipmentThrow.OPERATION_SITE_NAME')"
                >
                  <el-option
                    v-for="item in SfcsOperationList"
                    :key="item.ID"
                    :label="item.OPERATION_SITE_NAME"
                    :value="item.ID"
                  />
                </el-select>
              </el-form-item>
              </el-col> -->
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.WO_NO')"
                            prop="WO_NO">
                <el-input v-model="form.WO_NO"
                          @keyup.enter.native="searchModelAndPartByWoNo(form.WO_NO)"
                          :placeholder="$t('SfcsEquipmentThrow.WO_NO')" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.PART_NO')"
                            prop="PART_NO">
                <el-input v-model="form.PART_NO"
                          readonly="readonly"
                          placeholder="工单回车获取" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.MODEL')"
                            prop="MODEL">
                <el-input v-model="form.MODEL"
                          readonly="readonly"
                          placeholder="工单回车获取" />
              </el-form-item>
            </el-col>
          </el-col>
        </el-row>
        <el-row :gutter="24">
          <el-col :span="24">
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.ORDER_QTY')"
                            prop="ORDER_QTY">
                <el-input v-model="form.ORDER_QTY"
                          :placeholder="$t('SfcsEquipmentThrow.ORDER_QTY')" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.TARGET_QTY')"
                            prop="TARGET_QTY">
                <el-input v-model="form.TARGET_QTY"
                          :placeholder="$t('SfcsEquipmentThrow.TARGET_QTY')" />
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item :label="$t('SfcsEquipmentThrow.THROW_QTY')"
                            prop="THROW_QTY">
                <el-input v-model="form.THROW_QTY"
                          :placeholder="$t('SfcsEquipmentThrow.THROW_QTY')" />
              </el-form-item>
            </el-col>
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
    <!-- 分页 -->
    <div style="padding: 10px 10px; border-left: 1px solid #eee">
      <el-pagination :current-page="formData.Page"
                     :page-size="formData.Limit"
                     :page-sizes="[15, 25, 35, 45]"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="totalPage"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
    </div>
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
  AddOrModifySave,
  GetModelAndPartByWoNo
} from '@/api/SfcsEquipmentThrow'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'

export default {
  name: 'SfcsEquipmentThrow',
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
      loading: false,
      mainTable: [],
      InsertRecords: [],
      UpdateRecords: [],
      RemoveRecords: [],
      SfcsEquipmentList: [],
      SfcsOperationSiteList: [],
      SfcsOperationList: [],
      img_url: process.env.VUE_APP_BASE_IMG,
      textMap: {
        update: this.$t('se.editPermission'),
        create: this.$t('se.create')
      },
      dialogStatus: '',
      dialogFormVisible: false,
      form: {
        THROW_DATE: '',
        SITE_ID: '',
        PART_NO: '',
        ORDER_QTY: '',
        TARGET_QTY: '',
        EQUIPMENT_ID: '',
        THROW_QTY: '',
        CREATE_USER: '',
        LINE_ID: '',
        START_TIME: '',
        END_TIME: '',
        MODEL: '',
        WO_NO: ''
      },
      START_TIME: '',
      END_TIME: '',
      // 验证
      rules: {
        LINE_ID: [
          {
            required: true,
            message: this.$t('DefectsRecords._04'),
            trigger: 'blur'
          }
        ],
        WO_NO: [
          {
            required: true,
            message: this.$t('DefectsRecords._05'),
            trigger: 'blur'
          }
        ],
        THROW_DATE: [
          {
            required: true,
            message: this.$t('DefectsRecords._06'),
            trigger: 'blur'
          }
        ],
        START_TIME: [
          {
            required: true,
            message: this.$t('DefectsRecords._09'),
            trigger: 'blur'
          }
        ],
        END_TIME: [
          {
            required: true,
            message: this.$t('DefectsRecords._09'),
            trigger: 'blur'
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('DefectsRecords._07'),
            trigger: 'blur'
          }
        ],
        MODEL: [
          {
            required: true,
            message: this.$t('DefectsRecords._08'),
            trigger: 'blur'
          }
        ],
        ORDER_QTY: [
          {
            required: true,
            message: this.$t('DefectsRecords._08'),
            trigger: 'blur'
          }
        ],
        TARGET_QTY: [
          {
            required: true,
            message: this.$t('DefectsRecords._08'),
            trigger: 'blur'
          }
        ],
        EQUIPMENT_ID: [
          {
            required: true,
            message: this.$t('DefectsRecords._08'),
            trigger: 'blur'
          }
        ],
        THROW_QTY: [
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
      this.form.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
      const res = await Index(this.form.ORGANIZE_ID)
      if (res.Result) {
        this.DefectList = res.Result.DefectConfigList
        this.LinesList = res.Result.AllLinesList
        this.SfcsEquipmentList = res.Result.SfcsEquipmentList
        this.SfcsOperationSiteList = res.Result.SfcsOperationSiteList
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
    // 线体下拉选择事件
    selectGetOperationSite (val) {
      this.form.SITE_ID = ''
      this.SfcsOperationList = []
      this.SfcsOperationSiteList.forEach((res, index) => {
        if (res.LINE_ID === val) {
          this.SfcsOperationList.push(res)
        }
      })
    },
    // 工单回车事件
    async searchModelAndPartByWoNo (val) {
      console.log(1)
      const res = await GetModelAndPartByWoNo(val)
      this.form.PART_NO = res.Result.PART_NO
      this.form.MODEL = res.Result.MODEL
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
        SITE_ID: '',
        PART_NO: '',
        ORDER_QTY: '',
        TARGET_QTY: '',
        EQUIPMENT_ID: '',
        THROW_QTY: '',
        CREATE_USER: '',
        LINE_ID: '',
        START_TIME: '',
        END_TIME: ''
      }
    },
    // 编辑
    edit_but (row) {
      console.log(row.TIME_SLOT.substring(0, 5))
      this.form.ID = row.ID
      this.form.THROW_DATE = row.THROW_DATE
      this.form.START_TIME = row.TIME_SLOT.substring(0, 5)
      this.form.END_TIME = row.TIME_SLOT.substring(6, 12)
      this.form.PART_NO = row.PART_NO
      this.form.ORDER_QTY = row.ORDER_QTY
      this.form.TARGET_QTY = row.TARGET_QTY
      this.form.SITE_ID = row.SITE_ID
      this.form.EQUIPMENT_ID = row.EQUIPMENT_ID
      this.form.WO_NO = row.WO_NO
      this.form.MODEL = row.MODEL
      this.form.LINE_ID = row.LINE_ID
      this.form.THROW_QTY = row.THROW_QTY
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
      this.UpdateRecords = []
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
          console.log(this.InsertRecords)
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
.table-container {
  height: calc(100vh - 60px - 74px - 30px) !important;
}

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

.avatar-uploader .el-upload {
  /* width: 100%; */
  height: 100%;
}

.SfcsEquipmentThrow .el-form-item--small .el-form-item__label {
  line-height: 24px;
  padding-bottom: 0px;
}
</style>
