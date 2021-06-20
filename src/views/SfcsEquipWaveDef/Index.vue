<template>
  <custom-container>
    <!-- 头部 -->
    <template slot="header">
      <custom-container-header :isImport="false">
        <el-select v-model="formData.STATUS"
                   style="width:200px"
                   clearable
                   :placeholder="$t('SfcsEquipWaveDefMst._0')"
                   class="common-top">
          <el-option :key="0" label="待处理" value="0" />
          <el-option :key="1" label="已处理" value="1" />
          <el-option :key="2" label="已审核" value="2" />
        </el-select>
        <el-select v-model="formData.LINE_ID" style="width:200px" clearable :placeholder="$t('SfcsEquipKeep._2')" class="common-top">
          <el-option v-for="item in LineList" :key="item.LINE_ID" :label="item.LINE_NAME" :value="item.LINE_ID" />
        </el-select>
        <el-input clearable v-model="formData.WO_NO" :placeholder="$t('SfcsDefectReportWork._1')" style="width:200px"
          @keyup.enter.native="searchClick" />
        <el-button type="primary" icon="el-icon-search" @click.prevent="searchClick">{{$t('publics.btn.search')}}</el-button>&nbsp;
        <el-button type="danger" icon="el-icon-delete" @click.prevent="cleanClick">{{$t('publics.btn.clear')}}</el-button>&nbsp;
        <el-button icon="el-icon-circle-plus" type="primary" @click="addClick">新增</el-button>
      </custom-container-header>
    </template>
    <!-- 表格 -->

    <div class="container">
      <div class="table-container">
        <vxe-table ref="xTable" border resizable height="100%" size="medium" align="center" highlight-hover-row
          highlight-current-row show-overflow auto-resize keep-source stripe :loading="loading" :data="mainTable"
          @cell-click="mstRowClick">
          <vxe-table-column field="STATUS_NAME" :title="$t('SfcsEquipWaveDefMst._0')" min-width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="LINE" :title="$t('SfcsEquipWaveDefMst._1')" min-width="140" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="WO_NO" :title="$t('SfcsEquipWaveDefMst._2')" min-width="150" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="PART_NO" :title="$t('SfcsEquipWaveDefMst._11')" min-width="150" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="MODEL" :title="$t('SfcsEquipWaveDefMst._12')" min-width="120" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="WAVE" :title="$t('SfcsEquipWaveDefMst._3')" min-width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="PRESSURE" :title="$t('SfcsEquipWaveDefMst._4')" width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="SPEED" :title="$t('SfcsEquipWaveDefMst._5')" width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CONER" :title="$t('SfcsEquipWaveDefMst._6')" width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="FLOW" :title="$t('SfcsEquipWaveDefMst._7')" width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="FLUX_FROM" :title="$t('SfcsEquipWaveDefMst._8')" width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="SOLDERING_FROM" :title="$t('SfcsEquipWaveDefMst._9')" width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="COLLECT_TIME" :title="$t('SfcsEquipWaveDefMst._10')" min-width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="DEAL" :title="$t('SfcsEquipWaveDefMst._13')" min-width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="DEAL_USER" :title="$t('SfcsEquipWaveDefMst._14')" min-width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="DEAL_TIME" :title="$t('SfcsEquipWaveDefMst._15')" min-width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CHECK_RESULT_NAME" :title="$t('SfcsEquipWaveDefMst._16')" min-width="80"
            :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CHECK_USER" :title="$t('SfcsEquipWaveDefMst._17')" min-width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CHECK_TIME" :title="$t('SfcsEquipWaveDefMst._18')" min-width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_USER" :title="$t('SfcsEquipWaveDefMst._19')" min-width="80" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_TIME" :title="$t('SfcsEquipWaveDefMst._20')" min-width="160" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="ENABLED" fixed="right" width="260" :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button v-if="!(scope.row.STATUS>0)" type="primary" size="small" @click="editClick(scope.row)">{{$t('se_cc.edit')}}</el-button>
              <el-button v-if="[1,2].indexOf(scope.row.STATUS)===-1 && $btnList.indexOf('SfcsEquipWaveDefMstDeal') !== -1" type="primary" size="small" @click="dealClick(scope.row)">{{$t('se_cc.deal')}}</el-button>
              <el-button v-if="scope.row.STATUS==1 && $btnList.indexOf('SfcsEquipWaveDefMstCheck') !== -1" type="primary"
                size="small" @click="checkClick(scope.row)">{{$t('se_cc.check')}}</el-button>
              <el-button v-if="$btnList.indexOf('SfcsEquipWaveDefMstDel') !== -1" type="danger" size="small" @click="removeClick(scope.row)">{{$t('se_cc.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
      <!-- 分页 -->
      <div style="padding: 10px 10px; border-left: 1px solid #eee;">
        <el-pagination :current-page="formData.Page" :page-size="formData.Limit" :page-sizes="[15, 25, 35, 45]" layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>

    <div class="container child-container" v-if="curItem">
      <div style="margin-bottom: 10px;;">
        <el-button icon="el-icon-circle-plus" type="primary" @click="addClick_dtl" v-if="!curItem.STATUS">新增</el-button>
      </div>
      <div class="table-container">
        <vxe-table ref="xTable" border resizable height="100%" size="medium" align="center" highlight-hover-row
          highlight-current-row show-overflow auto-resize keep-source stripe :loading="loading_dtl" :data="dtlTable">
          <vxe-table-column field="TYPE" :title="$t('SfcsEquipWaveDefDtl._1')" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="POINT" :title="$t('SfcsEquipWaveDefDtl._2')" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="COUNT" :title="$t('SfcsEquipWaveDefDtl._3')" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_USER" :title="$t('SfcsEquipWaveDefDtl._4')" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="CREATE_TIME" :title="$t('SfcsEquipWaveDefDtl._5')" :edit-render="{name: '$input', props: {readonly: true}}" />
          <vxe-table-column field="ENABLED" fixed="right" width="260" :title="$t('se_cc.operate')">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="editClick_dtl(scope.row)" v-if="!curItem.STATUS">{{$t('se_cc.edit')}}</el-button>
              <el-button v-if="$btnList.indexOf('SfcsEquipWaveDefDtlDel') !== -1 && !curItem.STATUS" type="danger" size="small" @click="removeClick_dtl(scope.row)">{{$t('se_cc.delete')}}</el-button>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </div>
    <!-- modal -->
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="dialogTxt" :visible.sync="dialogVisible" width="40%">
      <el-form class="MesQualityItems-form" label-position="top" label-width="85px" ref="modifyForm" :model="modifyForm"
        :show-message="false" :rules="validRules" size="small">
        <el-row :gutter="24">
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._1')" prop="LINE_ID">
              <el-select v-model="modifyForm.LINE_ID" style="width:100%" clearable :placeholder="$t('SfcsEquipKeep._2')"
                class="common-top">
                <el-option v-for="item in LineList" :key="item.LINE_ID" :label="item.LINE_NAME" :value="item.LINE_ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._2')" prop="WO_NO">
              <el-input v-model="modifyForm.WO_NO" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._3')" prop="WAVE">
              <el-select v-model="modifyForm.WAVE" style="width:100%" clearable :placeholder="$t('SfcsEquipKeep._2')"
                class="common-top">
                <el-option :key="-1" label="" value="" />
                <el-option :key="0" label="单波" value="单波" />
                <el-option :key="1" label="双波" value="双波" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._4')" prop="PRESSURE">
              <el-input v-model="modifyForm.PRESSURE" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._5')" prop="SPEED">
              <el-input v-model="modifyForm.SPEED" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._6')" prop="CONER">
              <el-input v-model="modifyForm.CONER" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._7')" prop="FLOW">
              <el-input v-model="modifyForm.FLOW" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._8')" prop="FLUX_FROM">
              <el-input v-model="modifyForm.FLUX_FROM" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._9')" prop="SOLDERING_FROM">
              <el-input v-model="modifyForm.SOLDERING_FROM" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._10')" prop="COLLECT_TIME">
              <div class="block">
                <el-date-picker v-model="modifyForm.COLLECT_TIME" type="datetime" placeholder="选择日期时间" align="right"
                  :picker-options="pickerOptions">
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary" @click="submitForm">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="dialogTxt" :visible.sync="dialogVisible_check" width="40%">
      <el-form class="MesQualityItems-form" label-position="top" label-width="80px" ref="modifyForm_check" :model="modifyForm"
        :show-message="false" :rules="validRules" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._16')" prop="CHECK_RESULT">
              <el-select v-model="modifyForm.CHECK_RESULT" style="width:100%" clearable :placeholder="$t('SfcsEquipWaveDefMst._204')"
                class="common-top">
                <el-option :key="0" label="通过" value="Y" />
                <el-option :key="1" label="不通过" value="N" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SfcsEquipWaveDefMst._21')">
              <el-input v-model="modifyForm.REMARK" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_check = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary" @click="submitForm_check">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="dialogTxt" :visible.sync="dialogVisible_deal" width="40%">
      <el-form class="MesQualityItems-form" label-position="top" label-width="80px" ref="modifyForm_deal" :model="modifyForm"
        :show-message="false" :rules="validRules" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('SfcsEquipWaveDefMst._13')" prop="DEAL">
              <el-input v-model="modifyForm.DEAL" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_deal = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary" @click="submitForm_deal">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog v-dialogDrag :close-on-click-modal="false" :title="dialogTxt" :visible.sync="dialogVisible_dtl" width="40%">
      <el-form class="MesQualityItems-form" label-position="top" label-width="80px" ref="modifyForm_dtl" :model="modifyForm_dtl"
        :show-message="false" :rules="validRules" size="small">
        <el-row>
          <el-col :span="24">
            <el-form-item :label="$t('SmtDrivingRecordDtl._1')" prop="TYPE">
              <el-select v-model="modifyForm_dtl.TYPE" style="width:100%" clearable :placeholder="$t('SfcsEquipWaveDefDtl._1')"
                class="common-top">
                <el-option :key="0" label="连焊" value="连焊" />
                <el-option :key="1" label="虚焊" value="虚焊" />
                <el-option :key="2" label="包焊" value="包焊" />
                <el-option :key="3" label="锡珠" value="锡珠" />
                <el-option :key="4" label="拉件" value="拉件" />
                <el-option :key="5" label="其他" value="其他" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._2')" prop="OTHER" v-if="modifyForm_dtl.TYPE==='其他'">
              <el-input v-model="modifyForm_dtl.OTHER" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._2')" prop="POINT">
              <el-input v-model="modifyForm_dtl.POINT" clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('SmtDrivingRecordDtl._3')" prop="COUNT">
              <el-input v-model="modifyForm_dtl.COUNT" type="number" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible_dtl = false">{{ $t('MesQualityItems._30') }}</el-button>
        <el-button type="primary" @click="submitForm_dtl">{{$t('MesQualityItems._31') }}</el-button>
      </span>
    </el-dialog>
  </custom-container>
</template>

<script>
import customContainerHeader from '@/components/custom-container-header'
import customContainer from '@/components/custom-container'
import pagination from '@/views/mixin/page'
import {
  mapGetters
} from 'vuex'
import {
  Index,
  LoadData,
  AddOrModifyAsync,
  LoadDataDtl,
  AddOrModifyAsyncDtl,
  DeleteOneById,
  DeleteOneByIdDtl,
  DealAsync,
  CheckAsync
} from '@/api/SfcsEquipWaveDef'
export default {
  name: 'SfcsEquipWaveDef',
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
        STATUS: '',
        WO_NO: '',
        LINE_ID: ''
      },
      dialogVisible: false,
      dialogVisible_dtl: false,
      dialogVisible_deal: false,
      dialogVisible_check: false,
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
          message: this.$t('SfcsEquipWaveDefMst._200'),
          trigger: 'change'
        }],
        WO_NO: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefMst._201'),
          trigger: 'blur'
        }],
        PART_NO: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefMst._202'),
          trigger: 'blur'
        }],
        MODEL: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefMst._203'),
          trigger: 'blur'
        }],
        TABLE_NO: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefMst._204'),
          trigger: 'change'
        }],
        COLLECT_TIME: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefMst._205'),
          trigger: 'change'
        }],
        POINT: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefDtl._202'),
          trigger: 'change'
        }],
        TYPE: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefDtl._201'),
          trigger: 'change'
        }],
        COUNT: [{
          required: true,
          message: this.$t('SfcsEquipWaveDefDtl._206'),
          trigger: 'change'
        }],
        DEAL: [{
          required: true,
          message: this.$t('SfcsEquipWaveDef._203'),
          trigger: 'change'
        }],
        CHECK: [{
          required: true,
          message: this.$t('SfcsEquipWaveDef._204'),
          trigger: 'change'
        }]
      }
    }
  },
  created () {
    this.getIndex()
  },
  methods: {
    // 获取下拉菜单
    async getIndex () {
      var ORGANIZE_ID = this.userinfo.ORGANIZE_ID
      const res = await Index({
        ORGANIZE_ID
      })
      this.LineList = res
      this.getLoadData()
    },
    async getLoadData () {
      this.loading = true
      const res = await LoadData(this.formData)
      var status = ['', '已处理', '已审核']
      if (res.data) {
        var data = res.data
        data.forEach(e => {
          var line = this.LineList.find(p => p.LINE_ID === e.LINE_ID)
          if (line) e.LINE = line.LINE_NAME
          e.CHECK_RESULT_NAME = e.CHECK_RESULT === 'Y' ? '通过' : '不通过'
          e.STATUS_NAME = e.STATUS === '2' ? ('审核' + e.CHECK_RESULT_NAME) : status[e.STATUS]
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
      const res = await LoadDataDtl({
        MST_ID: this.curItem.ID
      })
      if (res.data) {
        var data = res.data
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
    mstRowClick ({
      row,
      column
    }) {
      this.curItem = row
      this.getLoadData_dtl()
    },
    // 新增推力测试
    addClick () {
      this.modifyForm = {
        ID: 0,
        COLLECT_TIME: new Date()
      }
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._100')
      this.dialogVisible = true
    },
    // 新增推力测试
    addClick_dtl () {
      this.modifyForm_dtl = {
        ID: 0
      }
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._100')
      this.dialogVisible_dtl = true
    },
    // 编辑
    editClick (row) {
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._101')
      this.modifyForm = {
        ...row
      }
      this.dialogVisible = true
    },
    dealClick (row) {
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._101')
      this.modifyForm = {
        ...row
      }

      this.dialogVisible_deal = true
    },
    checkClick (row) {
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._101')
      this.modifyForm = {
        ...row
      }

      this.dialogVisible_check = true
    },
    // 编辑
    editClick_dtl (row) {
      this.dialogTxt = this.$t('SfcsEquipWaveDefMst._101')
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
          const res = await AddOrModifyAsyncDtl(this.modifyForm_dtl)
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
    // 审核
    submitForm_check () {
      this.$refs.modifyForm_check.validate(async (valid, errInfo) => {
        if (valid) {
          this.modifyForm.CHECK_USER = this.userinfo.NICK_NAME
          const res = await CheckAsync(this.modifyForm)
          if (res.Result) {
            this.getLoadData()
            this.dialogVisible_check = false
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
    // 处理
    submitForm_deal () {
      this.$refs.modifyForm_deal.validate(async (valid, errInfo) => {
        if (valid) {
          this.modifyForm.DEAL_USER = this.userinfo.NICK_NAME
          const res = await DealAsync(this.modifyForm)
          if (res.Result) {
            this.getLoadData()
            this.dialogVisible_deal = false
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
        `${this.$t('SfcsEquipWaveDefMst._301')}${row.WO_NO}${this.$t(
          'SfcsEquipWaveDefMst._302'
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
        `${this.$t('SfcsEquipWaveDefDtl._301')}${row.POINT}${this.$t(
          'SfcsEquipWaveDefDtl._302'
        )}`,
        this.$t('MesTongsApply._91'), {
          confirmButtonText: this.$t('MesTongsApply._92'),
          cancelButtonText: this.$t('MesTongsApply._93'),
          type: 'warning'
        }
      )
        .then(async () => {
          const res = await DeleteOneByIdDtl(row.ID)
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
