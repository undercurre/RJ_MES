<template>
  <custom-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
        :isFull="true"
      >
        <el-button icon="el-icon-back" @click="goBack(true)">{{ $t('SmtPlacementHeader._37') }}</el-button>
        <el-button
          type="success"
          icon="el-icon-circle-check"
          @click.prevent="saveData"
        >{{ $t('publics.btn.save') }}</el-button>
        <el-button
          v-if="!ID"
          type="danger"
          icon="el-icon-delete"
          @click.prevent="resetFormData"
        >{{ $t('publics.btn.clear') }}</el-button>
      </custom-container-header>
    </template>
    <div class="block-one">
      <el-form
        :show-message="false"
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="150px"
        size="mini"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item :label="$t('MesProductionPreMst._32')" prop="LINE_ID">
              <el-select
                v-model="ruleForm.LINE_ID"
                placeholder=" "
                style="width: 100%"
                filterable
                clearable
              >
                <el-option
                  v-for="item in linesList"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._33')" prop="PART_NAME">
              <el-input v-model="ruleForm.PART_NAME" readonly></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._34')" prop="MST_NO">
              <el-input v-model="ruleForm.MST_NO" readonly @click.native="handleTipsNoCanEdit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('MesProductionPreMst._35')" prop="WO_NO">
              <el-input v-model="ruleForm.WO_NO" clearable @keyup.native.enter="getWorkInfo"></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._36')" prop="MODEL_NAME">
              <el-input v-model="ruleForm.MODEL_NAME" readonly></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._37')" prop="CREATOR">
              <el-input clearable v-model="ruleForm.CREATOR" readonly></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item :label="$t('MesProductionPreMst._38')" prop="PART_NO">
              <el-input v-model="ruleForm.PART_NO" readonly clearable></el-input>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._39')" prop="PRODUCTION_TIME">
              <el-date-picker
                style="width: 100%"
                placeholder=" "
                v-model="ruleForm.PRODUCTION_TIME"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
              ></el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('MesProductionPreMst._40')" prop="END_STATUS">
              <el-radio-group v-model="ruleForm.END_STATUS">
                <el-radio label="Y">
                  <span style="color: #67C23A">{{ $t('MesProductionPreMst._41') }}</span>
                </el-radio>
                <el-radio label="N">
                  <span style="color: #F56C6C">{{ $t('MesProductionPreMst._42') }}</span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div :style="{
      height: tableHeight
    }">
      <vxe-table
        ref="xTable"
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
      >
        <vxe-table-column type="seq" min-width="50" :title="$t('MesProductionPreMst._43')"></vxe-table-column>
        <vxe-table-column
          field="CONTENT_TYPE_Caption"
          min-width="180"
          :title="$t('MesProductionPreMst._44')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CONTENT"
          min-width="180"
          :title="$t('MesProductionPreMst._45')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="CONFIRM_CONTENT"
          min-width="180"
          :title="$t('MesProductionPreMst._46')"
          :edit-render="{name: '$input', props: {readonly: true}}"
        />
        <vxe-table-column
          field="RESULT"
          min-width="180"
          :title="$t('MesProductionPreMst._47')"
          :edit-render="{autofocus: '.custom-input', type: 'visible'}"
        >
          <template v-slot:edit="{ row }">
            <div>
              <el-radio-group v-model="row.RESULT">
                <el-radio label="Y">
                  <span style="color: #67C23A">{{ $t('MesProductionPreMst._48') }}</span>
                </el-radio>
                <el-radio label="N">
                  <span style="color: #F56C6C">{{ $t('MesProductionPreMst._49') }}</span>
                </el-radio>
              </el-radio-group>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column
          field="DESCRIPTION"
          min-width="180"
          :title="$t('MesProductionPreMst._50')"
          :edit-render="{name: 'input', type: 'visible'}"
        />
      </vxe-table>
    </div>
  </custom-container>
</template>

<script>
import {
  LoadData,
  SmtLinesLoadData,
  SfcsOperationLinesLoadData,
  GetWoInfo,
  GetDetailInfo,
  SaveData,
  MesProductionPreConfLoadData as _LoadData
} from '@/api/MesProductionPreMst'
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'Modify',
  components: {
    customContainer: () => import('@/components/custom-container'),
    customContainerHeader: () => import('@/components/custom-container-header')
  },
  computed: {
    ...mapState({
      ID: state => state.custom.productionPreMst.ID
    }),
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      rules: {
        LINE_ID: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._51'),
            trigger: 'blur'
          }
        ],
        PART_NAME: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._52'),
            trigger: 'blur'
          }
        ],
        WO_NO: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._53'),
            trigger: 'blur'
          }
        ],
        MODEL_NAME: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._54'),
            trigger: 'blur'
          }
        ],
        CREATOR: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._55'),
            trigger: 'blur'
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._56'),
            trigger: 'blur'
          }
        ],
        PRODUCTION_TIME: [
          {
            required: true,
            message: this.$t('MesProductionPreMst._57'),
            trigger: 'blur'
          }
        ]
        // END_STATUS: [
        //   { required: true, message: this.$t('MesProductionPreMst._58'), trigger: 'blur' }
        // ]
      },
      ruleForm: {
        MST_NO: '',
        CUSTOMER_ID: '',
        END_STATUS: '',
        LINE_ID: '',
        MODEL_ID: '',
        ORAGE_ID: 0,
        PRODUCTION_TIME: '',
        PART_NAME: '',
        WO_NO: '',
        MODEL_NAME: '',
        PART_NO: '',
        CREATOR: ''
      },
      linesList: [],
      loading: false,
      mainTable: [],
      validRules: {
        RESULT: [
          { required: true, message: this.$t('MesProductionPreMst._59') }
        ]
      },
      tableHeight: ''
    }
  },
  methods: {
    ...mapMutations({
      SET_ID: 'custom/productionPreMst/SET_ID',
      SET_SHOW_MODIFY: 'custom/productionPreMst/SET_SHOW_MODIFY'
    }),
    goBack (isPopState = false) {
      this.SET_ID(0)
      this.SET_SHOW_MODIFY(false)
      if (isPopState) {
        window.history.go(-1)
      }
    },
    // 添加监听页面返回事件
    addEventListener () {
      window.history.pushState(null, null, window.location.href)
      window.addEventListener(
        'popstate',
        e => {
          this.goBack(false)
        },
        false
      )
    },
    // 获取自动化线体和生产线体
    async getLines () {
      const res = await Promise.all([
        await SmtLinesLoadData({
          USER_ID: this.userinfo.ID
        }),
        await SfcsOperationLinesLoadData({
          USER_ID: this.userinfo.ID
        })
      ])
      if (res) {
        this.linesList = []
        res.map(item => {
          this.linesList = this.linesList.concat(
            (item.Result
              ? typeof item.Result === 'string'
                ? JSON.parse(item.Result)
                : item.Result
              : []
            ).map(_item => {
              return {
                label: _item.LINE_NAME || _item.OPERATION_LINE_NAME,
                value: _item.ID.toString()
              }
            })
          )
        })
      }
    },
    async getLoadData () {
      // 获取单条数据
      const res = await LoadData({
        ID: this.ID
      })
      if (res.Result) {
        this.ruleForm = res.Result[0]
      }
    },
    // 保存按钮
    saveData () {
      this.$refs.ruleForm.validate((valid, errInfo) => {
        if (valid) {
          this.$refs.xTable.validate(async _valid => {
            if (_valid) {
              this.ruleForm.ID = this.ID || 0
              const mainTable = this.mainTable.map(item => {
                return {
                  ID: item.ID || 0,
                  CONF_ID: item.CONF_ID,
                  MST_ID: item.MST_ID,
                  RESULT: item.RESULT,
                  DESCRIPTION: item.DESCRIPTION
                }
              })
              const form = {
                MainData: this.ruleForm
              }
              if (this.ID) {
                form.UpdateRecords = mainTable
              } else {
                form.InsertRecords = mainTable
              }
              const res = await SaveData(form)
              if (res.Result) {
                this.$notify.success({
                  title: this.$t('ssc._12'),
                  message: this.ID
                    ? this.$t('MesProductionPreMst._60')
                    : this.$t('MesProductionPreMst._61')
                })
                if (!this.ID) {
                  // 重置表单
                  this.resetFormData()
                }
              }
            }
          })
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
    // 获取工单信息
    async getWorkInfo () {
      if (!this.ruleForm.WO_NO) {
        this.$message.error(this.$t('MesProductionPreMst._62'))
        return false
      }
      const res = await GetWoInfo(this.ruleForm.WO_NO)
      if (res.Result) {
        const data = res.Result?.[0] || {}
        this.ruleForm.PART_NO = data.PART_NO
        this.ruleForm.MODEL_ID = data.MODEL_ID
        this.ruleForm.MODEL_NAME = data.MODEL_NAME
        this.ruleForm.CUSTOMER_ID = data.CUSTOMER_ID
        this.ruleForm.PART_NAME = data.PN_NAME
        this.ruleForm.ORAGE_ID = 0 // 暂时没有组织id
      }
    },
    // 获取列表
    async getDetailInfo () {
      if (this.ID) {
        const res = await GetDetailInfo(this.ID)
        this.mainTable = res.Result || []
      } else {
        const res = await _LoadData()
        this.mainTable = (res.Result || []).map(item => {
          return {
            ID: 0,
            CONF_ID: item.ID,
            CONTENT_TYPE: item.CONTENT_TYPE,
            CONTENT_TYPE_Caption: item.CONTENT_TYPE_Caption,
            CONTENT: item.CONTENT,
            CONFIRM_CONTENT: item.CONFIRM_CONTENT,
            MST_ID: 0,
            CREATOR: this.userinfo.USER_NAME,
            CREATIME: '',
            RESULT: '',
            DESCRIPTION: ''
          }
        })
      }
    },
    // 计算高度
    computedHeight () {
      window.addEventListener('resize', () => {
        this.computedHeight()
      })
      this.$nextTick(() => {
        const formHeight = this.$refs.ruleForm.$el.offsetHeight
        this.tableHeight = `calc(100vh - 58px - ${formHeight}px - 20px)`
      })
    },
    // 重置表单
    resetFormData () {
      this.ruleForm = {
        MST_NO: '',
        CUSTOMER_ID: '',
        END_STATUS: '',
        LINE_ID: '',
        MODEL_ID: '',
        ORAGE_ID: 0,
        PRODUCTION_TIME: '',
        PART_NAME: '',
        WO_NO: '',
        MODEL_NAME: '',
        PART_NO: '',
        CREATOR: this.userinfo?.USER_NAME || ''
      }
      this.mainTable = []
      this.getDetailInfo()
    },
    handleTipsNoCanEdit () {
      this.$message.warning(this.$t('MesProductionPreMst._63'))
    }
  },
  created () {
    this.addEventListener()
    this.getLines()
    if (this.ID) {
      this.getLoadData()
    }
    this.ruleForm.CREATOR = this.userinfo?.USER_NAME || ''
    this.getDetailInfo()
  },
  updated () {
    this.computedHeight()
  },
  beforeDestroy () {
    this.SET_ID(0)
    this.SET_SHOW_MODIFY(false)
    window.removeEventListener('popstate', () => {})
    window.removeEventListener('resize', () => {})
  }
}
</script>
