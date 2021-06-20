<template>
  <custom-container>
    <template slot="header">
      <custom-container-header
        :isExport="false"
        :isExportTpl="false"
        :isImport="false"
      >
        <el-button icon="el-icon-back" @click="back_but">{{
          $t("SfcsEquipKeep._30")
        }}</el-button>
        <el-button
          type="primary"
          icon="el-icon-circle-check"
          @click="save_but"
          >{{ $t("SfcsEquipKeep._31") }}</el-button
        >
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-row :gutter="24" class="compile-row">
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.LINE_NAME')"
              prop="LINE_ID"
            >
              <el-select
                style="width: 100%"
                v-model="form.LINE_ID"
                :disabled="disabled"
                :placeholder="$t('SfcsEquipKeep._36')"
                class="select"
              >
                <el-option
                  v-for="item in LinesList"
                  :key="item.ID"
                  :label="item.LINE_NAME"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.WO_NO')">
              <el-input
                v-model="form.WO_NO"
                :disabled="disabled"
                placeholder="请输入工单号"
                class="select"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.PART_NO')"
              prop="PART_NO"
            >
              <el-input
                v-model="form.PART_NO"
                :disabled="disabled"
                placeholder="请输入料号"
                @keyup.enter.native="searchPartByCode(form.PART_NO)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.MODEL')" prop="MODEL">
              <el-input
                v-model="form.MODEL"
                :disabled="disabled"
                placeholder="料号回车带出"
                readonly="readonly"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.PRODUCT_DATE')"
              prop="PRODUCT_DATE"
            >
              <el-date-picker
                style="width: 100%"
                v-model="form.PRODUCT_DATE"
                :disabled="deviceStatus"
                type="datetime"
                placeholder="生产日期"
                value-format="yyyy-MM-dd  hh:mm:ss"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.REWORK_QTY')"
              prop="REWORK_QTY"
            >
              <el-input
                v-model="form.REWORK_QTY"
                :disabled="disabled"
                placeholder="请输入返工数量"
                class="select"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.RETURN_QTY')"
              prop="RETURN_QTY"
            >
              <el-input
                v-model="form.RETURN_QTY"
                :disabled="disabled"
                placeholder="请输入退货数量"
                class="select"
              />
            </el-form-item>
          </el-col>
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.COMPLAINT_DATE')"
              prop="COMPLAINT_DATE"
            >
              <el-date-picker
                style="width: 100%"
                v-model="form.COMPLAINT_DATE"
                :disabled="deviceStatus"
                type="datetime"
                placeholder="请选择投诉日期"
                value-format="yyyy-MM-dd hh:mm:ss"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="6" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.CUSTOMERS')"
              prop="CUSTOMERS_ID"
            >
              <el-select
                style="width: 100%"
                v-model="form.CUSTOMERS_ID"
                :disabled="disabled"
                placeholder="请选择客户"
                class="select"
              >
                <el-option
                  v-for="item in CustomersList"
                  :key="item.ID"
                  :label="item.CUSTOMER"
                  :value="item.ID"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="24" class="compile-col">
            <el-form-item
              :label="$t('CutomersComplaint.CONTENT')"
              prop="CONTENT"
            >
              <el-input
                v-model="form.CONTENT"
                :disabled="disabled"
                placeholder="请输入投诉内容"
                class="select"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="24" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.CAUSE')">
              <el-input
                v-model="form.CAUSE"
                :disabled="disabled"
                placeholder="请输入原因分析"
                class="select"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="24" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.INTERIM_MEASURES')">
              <el-input
                v-model="form.INTERIM_MEASURES"
                :disabled="disabled"
                placeholder="请输入临时纠正措施"
                class="select"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="24" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.LONG_MEASURES')">
              <el-input
                v-model="form.LONG_MEASURES"
                :disabled="disabled"
                placeholder="请输入长期纠正措施"
                class="select"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="24" class="compile-row">
          <el-col :span="24" class="compile-col">
            <el-form-item :label="$t('CutomersComplaint.REMARKS')">
              <el-input
                v-model="form.REMARKS"
                :disabled="disabled"
                placeholder="请输入备注"
                class="select"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-dialog
      :close-on-click-modal="false"
      :title="$t('SfcsEquipKeep._50')"
      v-dialogDrag
      top="0"
      :visible.sync="centerDialogVisible"
      class="SfcsEquipKeep-dialog"
    >
      <el-carousel
        :interval="5000"
        arrow="always"
        :autoplay="false"
        height="calc(100vh - 170px"
      >
        <el-carousel-item v-for="item in workImg" :key="item.ID">
          <img
            :src="img_url + item.RESOURCE_URL"
            :alt="$t('SfcsEquipKeep._52')"
            width="100%"
            height="100%"
          />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </custom-container>
</template>

<script>
import {
  AddOrModify,
  SaveData,
  GetCustomerList,
  GetPartDesc
} from '@/api/SfcsCutomersComplaint'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
// eslint-disable-next-line
function getToday () {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}
export default {
  name: 'Addedit',
  components: {
    customContainerHeader,
    customContainer
  },
  computed: {
    ...mapGetters(['userinfo', 'userId'])
  },
  data () {
    return {
      form: {
        ID: 0,
        LINE_ID: '',
        LINE_NAME: '',
        WO_NO: '',
        PART_NO: '',
        MODEL: '',
        PRODUCT_DATE: '',
        REWORK_QTY: '',
        RETURN_QTY: '',
        CONTENT: '',
        CAUSE: '',
        INTERIM_MEASURES: '',
        LONG_MEASURES: '',
        REMARKS: '',
        COMPLAINT_DATE: '',
        CUSTOMERS_ID: '',
        ORGANIZE_ID: '',
        CREATE_USER: this.USER_NAME,
        fileData: ''
      },
      fileData: '',
      formLabelWidth: '80px',
      limitNum: 5,
      EquipmentList: [],
      KeepTypeList: [],
      LinesList: [],
      CustomersList: [],
      EquipStatusList: [],
      LinesArr: [],
      EquipmentArr: [],
      tableData: [],
      centerDialogVisible: false,
      fileList: [],
      workImg: [],
      ConfigData: {
        equip_id: '',
        keep_type: ''
      },
      rules: {
        LINE_ID: [
          {
            required: true,
            message: this.$t('CutomersComplaint._100'),
            trigger: 'blur'
          }
        ],
        CUSTOMERS_ID: [
          {
            required: true,
            message: this.$t('CutomersComplaint._101'),
            trigger: 'blur'
          }
        ],
        PART_NO: [
          {
            required: true,
            message: this.$t('CutomersComplaint._102'),
            trigger: 'blur'
          }
        ],
        MODEL: [
          {
            required: true,
            message: this.$t('CutomersComplaint._103'),
            trigger: 'blur'
          }
        ],
        PRODUCT_DATE: [
          {
            required: true,
            message: this.$t('CutomersComplaint._104'),
            trigger: 'blur'
          }
        ],
        REWORK_QTY: [
          {
            required: true,
            message: this.$t('CutomersComplaint._105'),
            trigger: 'blur'
          }
        ],
        RETURN_QTY: [
          {
            required: true,
            message: this.$t('CutomersComplaint._106'),
            trigger: 'blur'
          }
        ],
        CONTENT: [
          {
            required: true,
            message: this.$t('CutomersComplaint._107'),
            trigger: 'blur'
          }
        ],
        COMPLAINT_DATE: [
          {
            required: true,
            message: this.$t('CutomersComplaint._108'),
            trigger: 'blur'
          }
        ]
      },
      EquStatusVal: 0,
      keepConfigData: [],
      disabled: false,
      deviceStatus: false,
      checkStatus: false,
      saveID: -1, // 判断是否保存
      ReviewVal: {
        ID: '',
        Operator: ''
      }
    }
  },
  methods: {
    //  添加或修改视图
    async getAddOrModify (val) {
      const res = await AddOrModify(val)
      const data = res.Result
      if (data) {
        this.saveID = data.KeepHead.ID
        this.ReviewVal.ID = data.KeepHead.ID
        this.LinesList = data.LinesList
        this.LinesArr = data.LinesList
        this.EquipmentList = data.EquipmentList
        this.EquipmentArr = data.EquipmentList
        this.KeepTypeList = data.KeepTypeList
        this.EquipStatusList = data.EquipStatusList
      }
    },
    // 保存
    save_but () {
      if (this.form.STATION_ID === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._57'),
          type: 'warning'
        })
        return
      }

      this.updateData()
    },
    updateData () {
      this.$refs.form.validate(async (valid, errInfo) => {
        if (valid) {
          this.form.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
          SaveData(this.form).then((res) => {
            if (res.ErrorInfo.Status) {
              this.$message({
                type: 'error',
                message: res.ErrorInfo.Message
              })
            } else {
              this.saveID = res.Result
              this.getAddOrModify(res.Result)
              this.$notify({
                title: this.$t('SfcsEquipKeep._62'),
                message: this.$t('SfcsEquipKeep._63'),
                type: 'success',
                duration: 2000
              })
            }
          })
        } else {
          try {
            Object.keys(errInfo).forEach((item) => {
              this.$message.error(errInfo[item][0].message)
              throw new Error(errInfo[item][0].message)
            })
          } catch (e) {}
        }
      })
    },
    back_but () {
      this.$confirm(
        this.$t('SfcsEquipKeep._72'),
        this.$t('SfcsEquipKeep._70'),
        {
          type: 'warning'
        }
      ).then(() => {
        this.$emit('close')
      })
    },
    async getCustomerList () {
      const res = await GetCustomerList(0)
      const data = res.Result
      this.CustomersList = data
    },
    async searchPartByCode (code) {
      const res = await GetPartDesc(code)
      this.form.MODEL = res.Result
    }
  },
  created () {
    this.Bus.on('Edit', (val) => {
      console.log(val)
      if (val.ID > 0) {
        this.form.ID = val.ID
        this.form.LINE_ID = val.LINE_ID
        this.form.WO_NO = val.WO_NO
        this.form.PART_NO = val.PART_NO
        this.form.MODEL = val.MODEL
        this.form.PRODUCT_DATE = val.PRODUCT_DATE
        this.form.REWORK_QTY = val.REWORK_QTY
        this.form.RETURN_QTY = val.RETURN_QTY
        this.form.CONTENT = val.CONTENT
        this.form.CAUSE = val.CAUSE
        this.form.INTERIM_MEASURES = val.INTERIM_MEASURES
        this.form.LONG_MEASURES = val.LONG_MEASURES
        this.form.REMARKS = val.REMARKS
        this.form.COMPLAINT_DATE = val.COMPLAINT_DATE
        this.form.CUSTOMERS_ID = val.CUSTOMERS_ID
      } else {
      }
    })
    this.getAddOrModify(0)
    this.getCustomerList()
    this.form.CREATE_USER = this.userinfo.USER_NAME
    this.form.ORGANIZE_ID = this.userinfo.ORGANIZE_ID
  }
}
</script>

<style lang="scss" scoped>
.table-container1 {
  height: calc(100vh - 58px - 20px - 86px);
}
</style>
<style>
.SfcsEquipKeep-dialog .el-dialog {
  width: 100%;
  height: 100%;
  margin: 0;
}
</style>
