<template>
  <custom-container>
    <template slot="header">
      <custom-container-header :isFull="true"
                               :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-button icon="el-icon-back"
                   @click="back_but">{{
          $t("SfcsEquipKeep._30")
        }}</el-button>
        <el-button v-if="form.KEEP_CHECK_STATUS == 4"
                   type="primary"
                   icon="el-icon-circle-check"
                   @click="save_but">{{ $t("SfcsEquipKeep._31") }}</el-button>
        <el-button v-if="form.KEEP_CHECK_STATUS == 4"
                   type="warning"
                   icon="el-icon-circle-check"
                   @click="check_but">{{ $t("SfcsEquipKeep._32") }}</el-button>
        <el-button v-if="
            $btnList.indexOf('SfcsEquipKeepreview') !== -1 &&
            form.KEEP_CHECK_STATUS == 4
          "
                   type="success"
                   icon="el-icon-circle-check"
                   @click="SubmitReview_but">{{ $t("SfcsEquipKeep._33") }}</el-button>
      </custom-container-header>
    </template>
    <div>
      <el-form ref="form"
               :model="form"
               label-width="100px">
        <el-row :gutter="24"
                class="compile-row">
          <el-col :span="6"
                  class="compile-col">
            <el-form-item :label="$t('SfcsEquipKeep._73')">
              <el-input v-model="form.PRODUCT_NO"
                        :disabled="disabled"
                        :placeholder="$t('SfcsEquipKeep._34')"
                        class="select"
                        @change="changeCODE" />
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  class="compile-col">
            <el-form-item :label="$t('SfcsEquipKeep._35')">
              <el-select style="width: 100%"
                         v-model="form.STATION_ID"
                         :disabled="disabled"
                         :placeholder="$t('SfcsEquipKeep._36')"
                         class="select"
                         @change="statios_but(form.STATION_ID)">
                <el-option v-for="item in LinesList"
                           :key="item.ID"
                           :label="item.LINE_NAME"
                           :value="item.ID" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  class="compile-col">
            <el-form-item :label="$t('SfcsEquipKeep._83')">
              <el-select style="width: 100%"
                         v-model="form.EQUIP_ID"
                         :disabled="disabled"
                         :placeholder="$t('SfcsEquipKeep._38')"
                         class="select"
                         @change="equip_but(form.EQUIP_ID)">
                <el-option v-for="(item,index) in CategoryTypeList"
                           :key="index"
                           :label="item.CHINESE"
                           :value="item.LOOKUP_CODE" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6"
                  class="compile-col">
            <el-form-item :label="$t('SfcsEquipKeep._39')">
              <el-select style="width: 100%"
                         @change="changeKEEP_TYPE"
                         v-model="form2.KEEP_TYPENAME"
                         :disabled="disabled"
                         :placeholder="$t('SfcsEquipKeep._40')"
                         class="select">
                <el-option v-for="item in KeepTypeList"
                           :key="item.Value"
                           :label="item.label"
                           :value="item.Value" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"
                class="compile-row">
          <el-col :span="6"
                  class="compile-col">
            <el-form-item :label="$t('SfcsEquipKeep._41')">
              <el-select style="width: 100%"
                         v-model="form.EQUIP_STATUS"
                         :disabled="deviceStatus"
                         :placeholder="$t('SfcsEquipKeep._42')"
                         class="select">
                <el-option v-for="item in EquipStatusList"
                           :key="item.Value"
                           :label="item.Text"
                           :value="item.Value" />
              </el-select>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="6" class="compile-col">
            <el-form-item label="点检日期">
              <el-date-picker
                style="width: 100%"
                v-model="form.KEEP_TIME"
                :disabled="deviceStatus"
                type="datetime"
                placeholder="请选择点检日期"
                value-format="yyyy-MM-dd HH:mm:ss"
              />
            </el-form-item>
          </el-col> -->
        </el-row>
      </el-form>
    </div>
    <div class="Addedit-table">
      <vxe-table ref="xTable"
                 border
                 resizable
                 auto-resize
                 keep-source
                 size="medium"
                 align="center"
                 highlight-hover-row
                 width="100%"
                 height="100%"
                 class="table-container1"
                 :data="tableData"
                 :edit-rules="validRules"
                 :mouse-config="{ selected: true }"
                 :edit-config="{ trigger: 'click', mode: 'cell' }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column show-overflow
                          field="ORDER_NO"
                          :title="$t('SfcsEquipKeep._43')"
                          width="70" />
        <vxe-table-column show-overflow
                          field="KEEP_CONTENT"
                          :title="$t('SfcsEquipKeep._44')"
                          min-width="300" />
        <vxe-table-column show-overflow
                          field="KEEP_TOOLS"
                          :title="$t('SfcsEquipKeep._45')"
                          min-width="200" />
        <vxe-table-column show-overflow
                          field="STATUS"
                          :title="$t('SfcsEquipKeep._46')"
                          width="220"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <template v-if="row.BLLSTATUS == 4">
              <div>
                <vxe-radio v-model="row.STATUS"
                           label="1">{{
                  $t("SfcsEquipKeep._47")
                }}</vxe-radio>
                <vxe-radio v-model="row.STATUS"
                           label="0"
                           style="margin-top: 5px">{{ $t("SfcsEquipKeep._48") }}</vxe-radio>
              </div>
            </template>
            <template v-else>
              <div v-if="row.STATUS == 1">{{ $t("SfcsEquipKeep._47") }}</div>
              <div v-else-if="row.STATUS == 0">
                {{ $t("SfcsEquipKeep._48") }}
              </div>
            </template>
          </template>
          <template v-slot="{ row }">
            <div v-if="row.STATUS == 1">{{ $t("SfcsEquipKeep._47") }}</div>
            <div v-else-if="row.STATUS == 0">{{ $t("SfcsEquipKeep._48") }}</div>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          :title="$t('SfcsEquipKeep._49')"
                          width="120">
          <template v-slot="{ row }">
            <template>
              <vxe-button @click="lookRowEvent(row)">{{
                $t("SfcsEquipKeep._50")
              }}</vxe-button>
            </template>
          </template>
        </vxe-table-column>
        <vxe-table-column show-overflow
                          field="MESSAGE"
                          :title="$t('SfcsEquipKeep._51')"
                          width="218"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <template v-if="row.BLLSTATUS == 4">
              <template>
                <textarea v-model="row.MESSAGE"
                          placeholder />
              </template>
            </template>
            <template v-else>
              <div>{{ row.MESSAGE }}</div>
            </template>
          </template>
          <template v-slot="{ row }">{{ row.MESSAGE }}</template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-dialog :close-on-click-modal="false"
               :title="$t('SfcsEquipKeep._50')"
               v-dialogDrag
               top="0"
               :visible.sync="centerDialogVisible"
               class="SfcsEquipKeep-dialog">
      <el-carousel :interval="5000"
                   arrow="always"
                   :autoplay="false"
                   height="calc(100vh - 170px">
        <el-carousel-item v-for="item in workImg"
                          :key="item.ID">
          <img :src="img_url + item.RESOURCE_URL"
               :alt="$t('SfcsEquipKeep._52')"
               width="100%"
               height="100%" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </custom-container>
</template>

<script>
import {
  LoadDtlData,
  AddOrModify,
  GetEquipmentStatus,
  GetKeepConfigData,
  LoadSOPData,
  PostToCheck,
  SaveData
} from '@/api/SfcsEquipKeep'
import customContainer from '@/components/custom-container'
import customContainerHeader from '@/components/custom-container-header'
import { mapGetters } from 'vuex'
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
  components: { customContainerHeader, customContainer },
  computed: {
    ...mapGetters(['userinfo'])
  },
  data () {
    return {
      form: {
        ID: '',
        PRODUCT_NO: '',
        STATION_ID: '',
        EQUIP_STATUS: '',
        EQUIP_ID: '',
        KEEP_TYPE: '',
        KEEP_TIME: getToday(),

        KEEP_CHECK_STATUS: 4,
        KEEP_USER: '',

        insertRecords: [],
        updateRecords: []
      },
      EquipmentList: [],
      CategoryTypeList: [],
      KeepTypeList: [
        {
          KEEP_TYPE: 0,
          label: '日保养',
          Value: 0
        },
        {
          KEEP_TYPE: 3,
          label: '周保养',
          Value: 3
        },
        {
          KEEP_TYPE: 1,
          label: '月保养',
          Value: 1
        },
        {
          KEEP_TYPE: 4,
          label: '季度保养',
          Value: 4
        },
        {
          KEEP_TYPE: 2,
          label: '年保养',
          Value: 2
        }
      ],
      LinesList: [],
      EquipStatusList: [],
      LinesArr: [],
      EquipmentArr: [],
      tableData: [],
      validRules: {
        STATUS: [{ required: true, message: this.$t('SfcsEquipKeep._53') }]
      },
      centerDialogVisible: false,
      img_url: process.env.VUE_APP_BASE_IMG,
      workImg: [],
      ConfigData: {
        equip_id: '',
        keep_type: ''
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
      },
      form2: {},
      MstID: null
    }
  },
  methods: {
    changeKEEP_TYPE (e) {
      this.form.KEEP_TYPE = parseInt(e)
      this.KeepTypeList.map((item) => {
        if (e === item.Value) {
          this.form2.KEEP_TYPENAME = item.label
        }
      })
      this.$forceUpdate()
    },
    // 获取表格
    async getLoadDtlData (val) {
      const response = await LoadDtlData(val)
      const data = JSON.parse(response.Result)
      this.tableData = data
      console.log(this.tableData.length)
      this.$nextTick(function () {
        if (this.tableData.length > 0) {
          this.disabled = true
          this.checkStatus = true
        } else {
          this.disabled = false
        }
      })
    },
    //  获取点检配置列表
    GetConfigData () {
      GetKeepConfigData(this.ConfigData).then((res) => {
        this.keepConfigData = JSON.parse(res.Result)
        if (this.keepConfigData.length === 0) {
          this.$message({
            showClose: true,
            message: this.$t('SfcsEquipKeep._54'),
            type: 'warning'
          })
        }
      })
    },
    // 获取设备状态
    GetEquStatusList (val) {
      GetEquipmentStatus(val).then((response) => {
        this.EquStatusVal = JSON.parse(response.Result)
      })
    },
    // 回车设备编号过滤
    changeCODE (e) {
      console.log(this.EquipmentList, 'this.EquipmentList')
      var Eqi = this.EquipmentArr
      for (var i = 0; i < Eqi.length; i++) {
        if (e === Eqi[i].NAME) {
          this.EquipmentList = this.EquipmentArr
          this.LinesList = this.LinesArr
          this.form.STATION_ID = Eqi[i].STATION_ID
          this.form.EQUIP_ID = Eqi[i].CATEGORY
          this.MstID = Eqi[i].ID
          console.log('有')
          break
        } else {
          this.form.STATION_ID = ''
          this.form.EQUIP_ID = ''
        }
      }
      var ret2 = Eqi.findIndex((v) => {
        return v.NAME === e
      })
      if (ret2 === -1) {
        this.form.PRODUCT_NO = ''
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._55'),
          type: 'warning'
        })
      }
    },
    // 线别过滤
    statios_but (val) {
      // console.log(val)
      this.EquipmentList = []
      this.EquipmentArr.forEach((v) => {
        console.log(v, '111')
        if (val !== v.STATION_ID) {
          if (this.EquipmentList.length === 0) {
            this.form.EQUIP_ID = ''
          }
        } else {
          this.EquipmentList.push(v)
        }
      })
    },
    // 设备名称过滤
    equip_but (val) {
      var Eqi = this.EquipmentList
      for (var i = 0; i < Eqi.length; i++) {
        if (val === Eqi[i].CATEGORY) {
          this.form.PRODUCT_NO = Eqi[i].NAME
          this.form.STATION_ID = Eqi[i].STATION_ID
          break
        } else {
          this.form.PRODUCT_NO = ''
          this.form.STATION_ID = ''
        }
      }
    },
    //  添加或修改视图
    async getAddOrModify (val) {
      const res = await AddOrModify(val)
      // console.log(res.Result, '添加或修改视图')
      const data = res.Result
      if (data) {
        this.form.ID = data.KeepHead.ID
        this.saveID = data.KeepHead.ID
        this.ReviewVal.ID = data.KeepHead.ID
        if (data.KeepHead.ID !== 0) {
          this.form.KEEP_CHECK_STATUS = data.KeepHead.KEEP_CHECK_STATUS

          this.form.PRODUCT_NO = data.KeepHead.PRODUCT_NO
          this.form.STATION_ID = data.KeepHead.STATION_ID
          this.form.EQUIP_ID = data.KeepHead.EQUIP_ID
          this.form.EQUIP_STATUS = String(data.KeepHead.EQUIP_STATUS)
          this.form.KEEP_TYPE = String(data.KeepHead.KEEP_TYPE)
          this.KeepTypeList.map((item) => {
            if (this.form.KEEP_TYPE === item.Value) {
              console.log('111', item.label)
              this.form2.KEEP_TYPENAME = item.label
            }
          })
          this.form.KEEP_TIME = data.KeepHead.KEEP_TIME
          if (this.form.KEEP_CHECK_STATUS !== 4) {
            this.deviceStatus = true
          }
          if (!data.KeepHead.KEEP_USER) {
            this.form.KEEP_USER = this.userinfo.USER_NAME
          }
        }
        this.LinesList = data.LinesList
        this.LinesArr = data.LinesList
        this.EquipmentList = data.EquipmentList
        this.EquipmentArr = data.EquipmentList
        this.CategoryTypeList = data.CategoryTypeList
        console.log(this.EquipmentArr, '====this.EquipmentArr ')
        // this.KeepTypeList = data.KeepTypeList
        this.EquipStatusList = data.EquipStatusList
        console.log(data, 'this.saveIDthis.saveID')
      }
    },
    async lookRowEvent (row) {
      this.centerDialogVisible = true
      const res = await LoadSOPData(row.KEEP_CONTENT_ID)
      this.workImg = JSON.parse(res.Result)
    },
    // 保存
    save_but () {
      if (this.form.PRODUCT_NO === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._56'),
          type: 'warning'
        })
        return
      }
      if (this.form.STATION_ID === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._57'),
          type: 'warning'
        })
        return
      }
      if (this.form.EQUIP_ID === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._58'),
          type: 'warning'
        })
        return
      }
      if (this.form.KEEP_TYPE === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._59'),
          type: 'warning'
        })
        return
      }
      if (this.form.EQUIP_STATUS === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._60'),
          type: 'warning'
        })
        return
      }
      if (this.form.KEEP_TIME === '') {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._61'),
          type: 'warning'
        })
        return
      }
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.form.insertRecords = postdata.insertRecords
        this.form.updateRecords = postdata.updateRecords
        this.$refs.xTable.validate((valid) => {
          if (valid) {
            this.updateData()
          }
        })
      } else {
        // this.updateData()
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._85'),
          type: 'warning'
        })
      }
    },
    updateData () {
      SaveData(this.form).then((res) => {
        if (res.Result) {
          // console.log(res.Result)
          this.form = {}
          this.saveID = res.Result
          this.getAddOrModify(res.Result)
          this.getLoadDtlData(res.Result)
          this.$notify({
            title: this.$t('SfcsEquipKeep._62'),
            message: this.$t('SfcsEquipKeep._63'),
            type: 'success',
            duration: 2000
          })
        }
      })
    },
    // 开始点检
    check_but () {
      // 表格有值不能点击
      if (!this.checkStatus) {
        if (this.form.EQUIP_ID === '') {
          this.$message({
            showClose: true,
            message: this.$t('SfcsEquipKeep._64'),
            type: 'warning'
          })
          return
        }
        if (this.form.KEEP_TYPE === '') {
          this.$message({
            showClose: true,
            message: this.$t('SfcsEquipKeep._65'),
            type: 'warning'
          })
          return
        }
        this.ConfigData.equip_id = this.MstID
        this.ConfigData.keep_type = this.form.KEEP_TYPE
        this.GetEquStatusList(this.MstID)
        this.GetConfigData()
        var that = this
        setTimeout(() => {
          if (this.EquStatusVal !== 0 && this.EquStatusVal !== 1) {
            this.$message({
              showClose: true,
              message: this.$t('SfcsEquipKeep._66'),
              type: 'warning'
            })
            return
          }
          // console.log(this.keepConfigData)
          that.keepConfigData.forEach(function (item) {
            const record = {
              ID: 0,
              ORDER_NO: item.ORDER_NO,
              // KEEP_HEAD_ID: m_id,
              KEEP_CONTENT_ID: item.ID,
              KEEP_CONTENT: item.KEEP_CONTENT,
              KEEP_TOOLS: item.KEEP_TOOLS,
              BLLSTATUS: 4,
              STATUS: null,
              MESSAGE: null
            }
            // 从最后插入
            that.$refs.xTable.insertAt(record, -1)
          })
          if (this.keepConfigData.length > 0) {
            that.checkStatus = true
          }
        }, 200)
      }
    },
    // 提交审核
    SubmitReview_but () {
      if (this.saveID <= 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._67'),
          type: 'warning'
        })
        return
      }
      const insertRecords = this.$refs.xTable.getInsertRecords()
      console.log(insertRecords, 'insertRecordsinsertRecords')
      if (this.tableData.length === 0) {
        this.$message({
          showClose: true,
          message: this.$t('SfcsEquipKeep._68'),
          type: 'warning'
        })
        return
      }
      this.$confirm(
        this.$t('SfcsEquipKeep._69'),
        this.$t('SfcsEquipKeep._70'),
        {
          type: 'warning'
        }
      ).then(() => {
        PostToCheck(this.ReviewVal).then((res) => {
          if (res.ErrorInfo.Status) {
            this.$message({
              type: 'error',
              message: res.ErrorInfo.Message
            })
          } else {
            this.$notify({
              title: this.$t('IpqaMst.IpqaMstList.success'),
              message: this.$t('SfcsEquipKeep._71'),
              type: 'success',
              duration: 2000
            })
            this.$emit('close')
          }
        })
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
    }
  },
  created () {
    this.Bus.on('Edit', (val) => {
      if (val.ID > 0) {
        this.getLoadDtlData(val.ID)
        this.getAddOrModify(val.ID)
        this.form.KEEP_CHECK_STATUS = val.KEEP_CHECK_STATUS
      } else {
        this.getAddOrModify(0)
        this.getLoadDtlData(0)
      }
    })
    this.ReviewVal.Operator = this.userinfo.USER_NAME
    this.form.KEEP_USER = this.userinfo.USER_NAME
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
