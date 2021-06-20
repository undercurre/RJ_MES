<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select v-model="formData.LINE_ID"
                   style="width:200px"
                   clearable
                   :placeholder="$t('SfcsEquipKeep._2')"
                   class="common-top">
          <el-option v-for="item in LineList"
                     :key="item.LINE_ID"
                     :label="item.LINE_NAME"
                     :value="item.LINE_ID" />
        </el-select>
        <el-input clearable
                  v-model="formData.WO_NO"
                  :placeholder="$t('SfcsDefectReportWork._1')"
                  style="width:200px"
                  @keyup.enter.native="searchClick" />
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="cleanClick">{{$t('publics.btn.clear')}}</el-button>&nbsp;
        <el-button icon="el-icon-circle-plus"
                   type="primary"
                   @click="addClick">新增</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->

    <div class="container">
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
                   @cell-click="mstRowClick">
          <vxe-table-column field="LINE"
                            :title="$t('SmtDrivingRecordMst._1')"
                            min-width="80"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="WO_NO"
                            :title="$t('SmtDrivingRecordMst._2')"
                            min-width="90"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="PART_NO"
                            :title="$t('SmtDrivingRecordMst._3')"
                            min-width="80"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="MODEL"
                            :title="$t('SmtDrivingRecordMst._4')"
                            min-width="90"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="TABLE_NO"
                            :title="$t('SmtDrivingRecordMst._5')"
                            min-width="80"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="TEST_TIME"
                            :title="$t('SmtDrivingRecordMst._6')"
                            width="160"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_TIME"
                            :title="$t('SmtDrivingRecordMst._8')"
                            width="160"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_USER_NAME"
                            :title="$t('SmtDrivingRecordMst._7')"
                            min-width="80"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="ENABLED"
                            fixed="right"
                            width="200"
                            :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="small"
                         @click="editClick(scope.row)">{{$t('se_cc.edit')}}</el-button>
              <el-button v-if="$btnList.indexOf('SmtDrivingRecordMstDel') !== -1"
                         type="danger"
                         size="small"
                         @click="removeClick(scope.row)">{{$t('se_cc.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 分页 -->
      <div style="padding: 10px 10px; border-left: 1px solid #eee;">
        <el-pagination :current-page="formData.Page"
                       :page-size="formData.Limit"
                       :page-sizes="[15, 25, 35, 45]"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalPage"
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange" />
      </div>
    </div>

    <div class="container child-container"
         v-if="curItem">
      <div style="margin-bottom: 10px;;">
        <el-button icon="el-icon-circle-plus"
                   type="primary"
                   @click="addClick_dtl">新增</el-button>
      </div>
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
                   :loading="loading_dtl"
                   :data="dtlTable">
          <vxe-table-column field="POINT"
                            :title="$t('SmtDrivingRecordDtl._1')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="SEAL"
                            :title="$t('SmtDrivingRecordDtl._2')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="VALUE"
                            :title="$t('SmtDrivingRecordDtl._3')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="STANDER_VALUE"
                            :title="$t('SmtDrivingRecordDtl._4')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="RESULT_DES"
                            :title="$t('SmtDrivingRecordDtl._5')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_TIME"
                            :title="$t('SmtDrivingRecordDtl._6')"
                            width="160"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_USER_NAME"
                            :title="$t('SmtDrivingRecordDtl._7')"
                            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="ENABLED"
                            fixed="right"
                            width="200"
                            :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button type="primary"
                         size="small"
                         @click="editClick_dtl(scope.row)">{{$t('se_cc.edit')}}</el-button>
              <el-button v-if="$btnList.indexOf('SmtDrivingRecordDtlDel') !== -1"
                         type="danger"
                         size="small"
                         @click="removeClick_dtl(scope.row)">{{$t('se_cc.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- modal -->
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="dialogTxt"
               :visible.sync="dialogVisible"
               width="40%">
      <el-form class="MesQualityItems-form"
               label-position="top"
               label-width="80px"
               ref="modifyForm"
               :model="modifyForm"
               :show-message="false"
               :rules="validRules"
               size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('SmtDrivingRecordMst._1')"
                          prop="LINE_ID">
              <el-select v-model="modifyForm.LINE_ID"
                         style="width:100%"
                         clearable
                         :placeholder="$t('SfcsEquipKeep._2')"
                         class="common-top">
                <el-option v-for="item in LineList"
                           :key="item.LINE_ID"
                           :label="item.LINE_NAME"
                           :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordMst._2')"
                          prop="WO_NO">
              <el-input v-model="modifyForm.WO_NO"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordMst._5')"
                          prop="TABLE_NO">
              <el-input v-model="modifyForm.TABLE_NO"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordMst._6')"
                          prop="TEST_TIME">
              <div class="block">
                <el-date-picker v-model="modifyForm.TEST_TIME"
                                type="datetime"
                                placeholder="选择日期时间"
                                align="right"
                                :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary"
                   @click="submitForm">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="dialogTxt"
               :visible.sync="dialogVisible_dtl"
               width="40%">
      <el-form class="MesQualityItems-form"
               label-position="top"
               label-width="80px"
               ref="modifyForm_dtl"
               :model="modifyForm_dtl"
               :show-message="false"
               :rules="validRules"
               size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('SmtDrivingRecordDtl._1')"
                          prop="POINT">
              <el-input v-model="modifyForm_dtl.POINT"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._2')"
                          prop="SEAL">
              <el-input v-model="modifyForm_dtl.SEAL"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._3')"
                          prop="VALUE">
              <el-input v-model="modifyForm_dtl.VALUE"
                        type="number"
                        clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._4')"
                          prop="STANDER_VALUE">
              <el-input v-model="modifyForm_dtl.STANDER_VALUE"
                        type="number"
                        clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible_dtl = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button v-if="$btnList.indexOf('SmtDrivingRecordDtlDel') !== -1"
                   type="primary"
                   @click="submitForm_dtl">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import { mapGetters } from 'vuex'
import {
  Index,
  LoadData,
  // eslint-disable-next-line
  LoadData_Dtl,
  AddOrModifyAsync,
  // eslint-disable-next-line
  AddOrModifyAsync_Dtl,
  DeleteOneById,
  // eslint-disable-next-line
  DeleteOneById_dtl
} from '@/api/SmtDrivingRecord'
export default {
  name: 'SmtDrivingRecord',
  components: {
    customContainerHeader,
    customContainer
  },
  mixins: [pagination],
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      formData: {
        Page: 1,
        Limit: 15,
        WO_NO: '',
        LINE_ID: ''
      },
      dialogVisible: false,
      dialogVisible_dtl: false,
      LineList: [], // 线体/产线
      loading: false,
      loading_dtl: false,
      dialogTxt: '',
      mainTable: [],
      dtlTable: [],
      modifyForm: {},
      modifyForm_dtl: {},
      curItem: null,
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }]
      },
      validRules: {
        LINE_ID: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._200'),
          trigger: 'change'
        }],
        WO_NO: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._201'),
          trigger: 'blur'
        }],
        PART_NO: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._202'),
          trigger: 'blur'
        }],
        MODEL: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._203'),
          trigger: 'blur'
        }],
        TABLE_NO: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._204'),
          trigger: 'change'
        }],
        TEST_TIME: [{
          required: true,
          message: this.$t('SmtDrivingRecordMst._205'),
          trigger: 'change'
        }],
        POINT: [{
          required: true,
          message: this.$t('SmtDrivingRecordDtl._201'),
          trigger: 'change'
        }],
        SEAL: [{
          required: true,
          message: this.$t('SmtDrivingRecordDtl._202'),
          trigger: 'change'
        }],
        VALUE: [{
          required: true,
          message: this.$t('SmtDrivingRecordDtl._203'),
          trigger: 'change'
        }],
        STANDER_VALUE: [{
          required: true,
          message: this.$t('SmtDrivingRecordDtl._204'),
          trigger: 'change'
        }]
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      var ORGANIZE_ID = this.userinfo.ORGANIZE_ID
      const res = await Index({ ORGANIZE_ID })
      this.LineList = res
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      if (res.data) {
        var data = res.data
        data.forEach(e => {
          // eslint-disable-next-line
          var line = this.LineList.find(p => p.LINE_ID == e.LINE_ID)
          if (line) e.LINE = line.LINE_NAME
        })
        this.mainTable = data
        this.totalPage = res.count
        this.loading = false
      } else {
        this.loading = false
      }
    },
    async getLoadData_dtl () {
      this.loading_dtl = true
      const res = await LoadData_Dtl({ MST_ID: this.curItem.ID })
      if (res.data) {
        var data = res.data
        data.forEach(e => {
          // eslint-disable-next-line
          e.RESULT_DES = e.RESULT == 1 ? '合格' : '不合格'
        })
        this.dtlTable = data
        this.loading_dtl = false
      } else {
        this.loading_dtl = false
      }
    },
    // 搜索
    searchClick () {
      this.formData.Page = 1
      this.getLoadData()
    },
    cleanClick () {
      this.formData = {
        Page: 1,
        Limit: 15
      }
      this.getLoadData()
    },
    mstRowClick ({ row, column }) {
      this.curItem = row
      this.getLoadData_dtl()
    },
    // 新增推力测试
    addClick () {
      this.modifyForm = { ID: 0, TABLE_NO: 'FM-MA-038', TEST_TIME: new Date() }
      this.dialogTxt = this.$t('SmtDrivingRecordMst._100')
      this.dialogVisible = true
    },
    // 新增推力测试
    addClick_dtl () {
      this.modifyForm_dtl = { ID: 0 }
      this.dialogTxt = this.$t('SmtDrivingRecordMst._100')
      this.dialogVisible_dtl = true
    },
    // 编辑
    editClick (row) {
      this.dialogTxt = this.$t('SmtDrivingRecordMst._101')
      this.modifyForm = {
        ...row
      }
      this.dialogVisible = true
    },
    // 编辑
    editClick_dtl (row) {
      this.dialogTxt = this.$t('SmtDrivingRecordMst._101')
      this.modifyForm_dtl = {
        ...row
      }

      this.dialogVisible_dtl = true
    },
    // 保存
    submitForm () {
      this.$refs.modifyForm.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.modifyForm.ID === 0) {
            this.modifyForm.CREATE_TIME = new Date()
            this.modifyForm.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
            this.modifyForm.CREATE_USER = this.userinfo.USER_NAME
            this.modifyForm.CREATE_USER_NAME = this.userinfo.NICK_NAME
          }
          const res = await AddOrModifyAsync(this.modifyForm)
          if (res.Result) {
            this.formData = {
              Page: 1,
              Limit: 15,
              WO_NO: '',
              LINE_ID: ''
            }
            this.getLoadData()
            this.dialogVisible = false
            this.$notify({
              title: this.$t('publics.tips.tips'),
              message: this.$t('publics.tips.saveSuccess'),
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
    // 保存
    submitForm_dtl () {
      this.$refs.modifyForm_dtl.validate(async (valid, errInfo) => {
        if (valid) {
          if (this.modifyForm_dtl.ID === 0) {
            this.modifyForm_dtl.CREATE_TIME = new Date()
            this.modifyForm_dtl.CREATE_USER = this.userinfo.USER_NAME
            this.modifyForm_dtl.MST_ID = this.curItem.ID
            this.modifyForm_dtl.CREATE_USER_NAME = this.userinfo.NICK_NAME
            this.modifyForm_dtl.RESULT = this.modifyForm_dtl.VALUE >= this.modifyForm_dtl.STANDER_VALUE ? 1 : 0
          }
          console.log(this.modifyForm_dtl)
          // eslint-disable-next-line
          const res = await AddOrModifyAsync_Dtl(this.modifyForm_dtl)
          if (res.Result) {
            this.getLoadData_dtl()
            this.dialogVisible_dtl = false
            this.$notify({
              title: this.$t('publics.tips.tips'),
              message: this.$t('publics.tips.saveSuccess'),
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
    // 删除
    removeClick (row) {
      this.$confirm(
        `${this.$t('SmtDrivingRecordMst._301')}${row.TABLE_NO}${this.$t(
          'SmtDrivingRecordMst._302'
        )}`,
        this.$t('MesTongsApply._91'), {
        confirmButtonText: this.$t('MesTongsApply._92'),
        cancelButtonText: this.$t('MesTongsApply._93'),
        type: 'warning'
      }
      )
        .then(async () => {
          const res = await DeleteOneById(row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
            this.getLoadData_dtl()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    },
    // 删除
    removeClick_dtl (row) {
      this.$confirm(
        `${this.$t('SmtDrivingRecordDtl._301')}${row.VALUE}${this.$t(
          'SmtDrivingRecordDtl._302'
        )}`,
        this.$t('MesTongsApply._91'), {
        confirmButtonText: this.$t('MesTongsApply._92'),
        cancelButtonText: this.$t('MesTongsApply._93'),
        type: 'warning'
      }
      )
        .then(async () => {
          // eslint-disable-next-line
          const res = await DeleteOneById_dtl(row.ID)
          if (res.Result) {
            this.$message({
              type: 'success',
              message: this.$t('MesTongsApply._94')
            })
            this.getLoadData()
            this.getLoadData_dtl()
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MesTongsApply._95')
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  height: calc(50vh - 60px - 54px) !important;
}

.container {
  box-shadow: 3px 5px 5px #eee;
  margin-bottom: 15px;
}

.child-container {
  border: 1px solid #eee;
  padding: 10px;
}
</style>
