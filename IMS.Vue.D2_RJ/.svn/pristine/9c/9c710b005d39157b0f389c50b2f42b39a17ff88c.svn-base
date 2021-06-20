<template>
  <div class="unlock">
    <div class="header">
      <span style="font-size: 14px;color: #606266;padding-right:10px;">{{
        $t("goods.unlo._1")
      }}</span>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click.passive="searchClick">{{ $t("goods.docu._5") }}</el-button>
      <el-button type="danger"
                 icon="el-icon-delete"
                 @click.prevent="eliminateClick">{{ $t("goods.docu._6") }}</el-button>
      <el-drawer :title="$t('goods.unlo._1')"
                 :visible.sync="dialog"
                 direction="ltr"
                 custom-class="demo-drawer"
                 size="30%"
                 ref="drawer">
        <div class="demo-drawer__content">
          <div class="demo-drawer__footer">
            <el-form :model="formData"
                     style="padding: 0 10px;">
              <el-form-item>
                <el-input v-model="formData.HOLD_NUMBER"
                          :placeholder="$t('goods.docu._1')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.SN"
                          :placeholder="$t('goods.unlo._2')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.CARTON_NO"
                          :placeholder="$t('goods.unlo._3')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.PALLET_NO"
                          :placeholder="$t('goods.unlo._4')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.COMPONENT_SN"
                          :placeholder="$t('goods.unlo._5')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.CUSTOMER_COMPONENT_PN"
                          :placeholder="$t('goods.unlo._6')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.MODEL"
                          :placeholder="$t('goods.unlo._7')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.PART_NO"
                          :placeholder="$t('goods.unlo._8')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-input v-model="formData.WO_NO"
                          :placeholder="$t('goods.unlo._9')"
                          clearable
                          @keyup.enter.native="doFilter" />
              </el-form-item>
              <el-form-item>
                <el-select v-model="formData.OPERATION_LINE_ID"
                           clearable
                           filterable
                           :placeholder="$t('goods.unlo._10')"
                           style="width:100%">
                  <el-option v-for="item in LineList"
                             :key="item.ID"
                             :label="item.OPERATION_LINE_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formData.CURRENT_OPERATION_ID"
                           clearable
                           filterable
                           :placeholder="$t('goods.unlo._11')"
                           style="width:100%">
                  <el-option v-for="item in OperationList"
                             :key="item.ID"
                             :label="item.OPERATION_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="formData.OPERATION_SITE_ID"
                           clearable
                           filterable
                           :placeholder="$t('goods.unlo._12')"
                           style="width:100%">
                  <el-option v-for="item in SiteList"
                             :key="item.ID"
                             :label="item.OPERATION_SITE_NAME"
                             :value="item.ID" />
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-date-picker style="width:100%"
                                v-model="daterange"
                                type="datetimerange"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                range-separator="-"
                                :start-placeholder="$t('goods.docu._3')"
                                :end-placeholder="$t('goods.docu._4')">
                </el-date-picker>
              </el-form-item>
            </el-form>
            <div class="drawer-footer">
              <el-button @click="dialog = false"
                         style="width:50%">{{
                $t("goods._5")
              }}</el-button>
              <el-button type="primary"
                         style="width:50%"
                         @click="doFilter">{{
                $t("goods._4")
              }}</el-button>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>
    <el-form class="document-form"
             ref="form"
             :model="form"
             aria-label="left"
             label-width="0px"
             style="padding: 0 0;">
      <el-form-item style="margin-bottom: 0 !important;">
        <el-row :gutter="24">
          <el-col :span="14">
            <span style="font-size: 14px;color: #606266;padding-right: 10px;">{{ $t("goods.unlo._13") }}：</span>
            <el-radio-group v-model="form.OperationType"
                            class="group"
                            @change="groupClick">
              <el-radio :label="0">{{ $t("goods.unlo._14") }}</el-radio>
              <el-radio :label="2">{{ $t("goods.docu._37") }}</el-radio>
              <el-radio :label="1">{{ $t("goods.docu._42") }}</el-radio>
              <el-radio :label="3">{{ $t("goods.docu._38") }}</el-radio>
            </el-radio-group>
          </el-col>
          <el-col :span="10"
                  style="display: flex;align-items: center;">
            <span style="font-size: 14px;color: #606266;padding-right: 10px;">{{ $t("goods.unlo._15") }}：</span>
            <el-upload ref="uploadFile"
                       style="display: flex;"
                       class="upload-demo"
                       :headers="handleUploadHeader()"
                       :action="upload_url"
                       :on-success="handleAvatarSuccess"
                       multiple
                       :limit="1"
                       :on-exceed="handleExceed"
                       :before-upload="beforeUpload"
                       accept="txt"
                       :data="fileDate"
                       v-if="form.OperationType !== ''">
              <el-button size="small">{{ $t("goods.unlo._16") }}</el-button>
            </el-upload>
            <el-button v-else
                       size="small"
                       @click="beforeUploadFile">{{
              $t("goods.unlo._16")
            }}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item class="form-file"></el-form-item>
      <div class="overview">
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
                   @cell-click="overviewCell"
                   :loading="loading"
                   :data="details"
                   :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                   :radio-config="{ labelField: 'name', trigger: 'row' }"
                   :checkbox-config="{ checkStrictly: true }">
          <vxe-table-column class="overview-checkbox"
                            type="checkbox"
                            width="80"
                            :title="$t('goods.docu._23')"></vxe-table-column>
          <vxe-table-column field="HOLD_NUMBER"
                            :title="$t('goods.docu._7')"
                            width="150" />
          <vxe-table-column field="SN"
                            :title="$t('goods.docu._36')"
                            width="150" />
          <vxe-table-column field="CARTON_NO"
                            :title="$t('goods.docu._37')"
                            width="150" />
          <vxe-table-column field="PALLET_NO"
                            :title="$t('goods.docu._38')"
                            width="150" />
          <vxe-table-column field="MODEL"
                            :title="$t('goods.docu._39')"
                            width="150" />
          <vxe-table-column field="PART_NO"
                            :title="$t('goods.docu._40')"
                            min-width="200" />
          <vxe-table-column field="WO_NO"
                            :title="$t('goods.docu._41')"
                            min-width="180" />
          <vxe-table-column field="COMPONENT_SN"
                            :title="$t('goods.docu._42')"
                            width="150" />
          <vxe-table-column field="CUSTOMER_COMPONENT_PN"
                            :title="$t('goods.docu._43')"
                            min-width="200" />
          <vxe-table-column width="130"
                            field="STATUS"
                            :title="$t('goods.docu._44')">
            <template v-slot="{ row }">
              <el-switch v-model="row.STATUS"
                         :active-text="$t('goods.docu._45')"
                         :inactive-text="$t('goods.docu._46')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </template>
          </vxe-table-column>
          <vxe-table-column field="OPERATION_LINE_NAME"
                            :title="$t('goods.docu._47')"
                            width="150" />
          <vxe-table-column field="OPERATION_SITE_NAME"
                            :title="$t('goods.docu._48')"
                            width="150" />
          <vxe-table-column field="OPERATION_NAME"
                            :title="$t('goods.docu._49')"
                            width="150" />
          <vxe-table-column field="HOLD_ACTION"
                            :title="$t('goods.docu._50')"
                            width="150" />
          <vxe-table-column field="CREATE_TIME"
                            :title="$t('goods.docu._51')"
                            width="150" />
          <vxe-table-column field="RELEASE_CAUSE"
                            :title="$t('goods.docu._20')"
                            min-width="170" />
          <vxe-table-column field="RELEASE_EMPNO"
                            :title="$t('goods.docu._52')"
                            width="150" />
          <vxe-table-column field="RELEASE_TIME"
                            :title="$t('goods.docu._35')"
                            width="150" />
        </vxe-table>
      </div>
      <el-pagination :current-page="formData.Page"
                     :page-sizes="[15, 25, 35, 45]"
                     :page-size="formData.Limit"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="Maintotal"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange" />
      <el-form-item>
        <div style="display: flex;padding-top: 10px;">
          <span style="flex: none;font-size: 14px;color: rgb(96, 98, 102);">{{ $t("goods.docu._32") }}：</span>
          <el-input type="textarea"
                    v-model="form.RELEASE_CAUSE"
                    :placeholder="$t('goods.docu._21')"
                    clearable />&nbsp;
        </div>
      </el-form-item>
      <div style="display: flex;"
           v-if="$btnList.indexOf('UnLockProSave') !== -1">
        <el-button style="width: 100%;font-weight: 600;color: red;"
                   @click="batchClick">{{ $t("goods.unlo._17") }}</el-button>
        <el-button style="width: 100%;font-weight: 600;color: red;"
                   @click="unlockSave">{{ $t("goods.unlo._18") }}</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import helper from '@/api/SfcsUnLockProduct'
import { mapGetters } from 'vuex'
const API = helper('SfcsUnLockProduct')
export default {
  name: 'unlock',
  data () {
    return {
      LineList: [],
      OperationList: [],
      SiteList: [],
      formData: {
        Page: 1,
        Limit: 15,
        HOLD_NUMBER: undefined, // 单据
        SN: undefined, // 流水号
        CARTON_NO: undefined, // 卡通号
        PALLET_NO: undefined, // 栈板号
        COMPONENT_SN: undefined, // 零件序号
        CUSTOMER_COMPONENT_PN: undefined, // 零件客户料号
        MODEL: undefined, // 机种
        PART_NO: undefined, // 料号
        WO_NO: undefined, // 工单
        OPERATION_LINE_ID: undefined, // 线别ID
        CURRENT_OPERATION_ID: undefined, // 工序ID
        OPERATION_SITE_ID: undefined, // 站点ID
        BEGIN_TIME: undefined, // 开始日期
        END_TIME: undefined // 结束日期
      },
      Maintotal: 0,
      daterange: '',
      form: {
        HoldProductList: [],
        RELEASE_CAUSE: '', // 解锁原因
        OperationType: '', // 操作类型: 0 产品流水号, 1 零件序号, 2 卡通号, 3 栈板号
        User_Name: '' // 操作人员
      },
      loading: false,
      details: [],
      overview: [],
      dialog: false,
      fileDate: {
        operationType: 0
      },
      upload_url:
        process.env.VUE_APP_API + 'SfcsUnLockProduct/LoadProductData2File',
      annal: []
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.form.User_Name = this.userinfo.USER_NAME
    this.getProductIndex()
  },
  methods: {
    async getProductIndex () {
      const res = await API.ProductIndex()
      if (res.Result) {
        this.LineList = res.Result.LineList
        this.OperationList = res.Result.OperationList
        this.SiteList = res.Result.SiteList
      }
    },
    async getLoadProductData () {
      this.loading = true
      const res = await API.LoadProductData(this.formData)
      this.loading = false
      if (res.Result) {
        console.log(res, 'res')
        this.details = res.Result
        this.Maintotal = res.TotalCount
      }
    },
    doFilter () {
      this.dialog = false
      if (this.daterange) {
        this.formData.BEGIN_TIME = this.daterange[0]
        this.formData.END_TIME = this.daterange[1]
      } else {
        this.formData.BEGIN_TIME = undefined
        this.formData.END_TIME = undefined
      }
      this.formData.Page = 1
      this.getLoadProductData()
    },
    // 主表分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadProductData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadProductData()
    },
    searchClick () {
      this.dialog = true
    },
    groupClick () {
      this.fileDate.operationType = this.form.OperationType
    },
    beforeUploadFile () {
      if (this.form.OperationType === '') {
        this.$message({
          message: this.$t('goods.unlo._19'),
          type: 'warning'
        })
        return false
      } else if (this.$refs.xTable.getRadioRecord() === null) {
        this.$message({
          message: this.$t('goods.unlo._20'),
          type: 'warning'
        })
        return false
      } else if (this.form.RELEASE_CAUSE === '') {
        this.$message({
          message: this.$t('goods.docu._21'),
          type: 'warning'
        })
        return false
      } else {
        return true
      }
    },
    beforeUpload (file) {
      console.log(file)
      var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
      const extension = testmsg === 'txt'
      if (!extension) {
        this.$message({
          message: this.$t('goods.unlo._21'),
          type: 'warning'
        })
      }
      return extension
    },
    handleExceed (files, fileList) {
      this.$message.warning(this.$t('goods.unlo._22'))
    },
    handleAvatarSuccess (res) {
      if (res.Result) {
        this.details = res.Result
        this.Maintotal = res.TotalCount
        console.log(res)
      }
    },
    overviewCell (row) {
      this.$refs.xTable.clearCheckboxRow()
      this.$refs.xTable.toggleCheckboxRow(this.details[row.$rowIndex])
    },
    // 批量
    batchClick () {
      if (this.form.OperationType === '') {
        this.$message({
          message: this.$t('goods.unlo._19'),
          type: 'warning'
        })
        return false
      }
      if (this.form.RELEASE_CAUSE === '') {
        this.$message({
          message: this.$t('goods.docu._21'),
          type: 'warning'
        })
        return false
      }
      this.$refs.xTable.setCheckboxRow(this.details, true)
      this.form.HoldProductList = []
      this.form.HoldProductList = this.details
      this.Seve()
    },
    //  单个
    unlockSave () {
      console.log('122')
      if (this.beforeUploadFile()) {
        this.form.HoldProductList = []
        this.form.HoldProductList.push(this.$refs.xTable.getRadioRecord())
        this.Seve()
      }
    },
    // 保存
    async Seve () {
      this.$confirm(this.$t('goods.unlo._23'), this.$t('goods._3'), {
        confirmButtonText: this.$t('goods._4'),
        cancelButtonText: this.$t('goods._5'),
        type: 'warning'
      })
        .then(() => {
          API.UnLockProductSave(this.form).then(res => {
            if (res.Result) {
              this.$notify({
                title: this.$t('goods._1'),
                message: this.$t('goods._2'),
                type: 'success',
                duration: 2000
              })
              this.annal = res.Result.ResultMsgList
              this.$emit('product', this.annal)
              this.eliminateClick()
            } else {
              console.log(res)
              this.annal.push(res.message)
              this.$emit('product', this.annal)
            }
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    eliminateClick () {
      this.details = []
      this.form = {
        HoldProductList: [],
        RELEASE_CAUSE: '', // 解锁原因
        OperationType: '', // 操作类型: 0 产品流水号, 1 零件序号, 2 卡通号, 3 栈板号
        User_Name: this.userinfo.USER_NAME
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overview {
  height: calc(100vh - 535px - 90px);
}
.form-file .upload-demo {
  display: flex;
}
</style>
<style>
.form-file .el-form-item__content {
  display: flex;
}
.unlock .el-drawer__header {
  margin-bottom: 15px;
}
.unlock .drawer-footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
}
</style>
