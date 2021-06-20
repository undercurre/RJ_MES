<!--
 * @Author: your name
 * @Date: 2020-04-10 20:41:18
 * @LastEditTime: 2020-04-15 11:39:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \IMS.Vue.D2\src\views\QualityLockUnlock\document.vue
 -->
<template>
  <div class="document">
    <div class="header">
      <el-input v-model="formData.HOLD_NUMBER"
                :placeholder="$t('goods.docu._1')"
                clearable
                style="width:200px"
                @keyup.enter.native="doFilter" />&nbsp;
      <el-input v-model="formData.HOLD_EMPNO"
                :placeholder="$t('goods.docu._2')"
                clearable
                style="width:200px"
                @keyup.enter.native="doFilter" />&nbsp;
      <el-date-picker v-model="daterange"
                      type="datetimerange"
                      align="right"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      range-separator="-"
                      :start-placeholder="$t('goods.docu._3')"
                      :end-placeholder="$t('goods.docu._4')">
      </el-date-picker>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="doFilter"
                 style="margin-left: 15px;">{{ $t("goods.docu._5") }}</el-button>
      <el-button type="danger"
                 icon="el-icon-delete"
                 @click.prevent="eliminateClick">{{ $t("goods.docu._6") }}</el-button>
    </div>
    <el-form class="document-form"
             ref="form"
             :model="form"
             aria-label="left"
             label-width="150px"
             style="padding: 10px 0;">
      <el-row :gutter="24">
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._7')">
            <el-input v-model="form.HOLD_NUMBER"
                      disabled
                      :placeholder="$t('goods.docu._1')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._8')">
            <el-input v-model="form.MAIN_CONDITION_CAPTION"
                      disabled
                      :placeholder="$t('goods.docu._9')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._10')">
            <el-input v-model="form.HOLD_ACTION_CAPTION"
                      disabled
                      :placeholder="$t('goods.docu._11')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._12')">
            <el-input v-model="form.SUBSIDIARY_CONDITION_CAPTION"
                      disabled
                      :placeholder="$t('goods.docu._13')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._14')">
            <el-input v-model="form.HOLD_EMPNO"
                      disabled
                      :placeholder="$t('goods.docu._15')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._16')">
            <el-input v-model="form.RELEASE_EMPNO"
                      disabled
                      :placeholder="$t('goods.docu._17')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._18')">
            <el-input v-model="form.HOLD_CAUSE"
                      disabled
                      :placeholder="$t('goods.docu._19')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="$t('goods.docu._20')">
            <el-input v-model="form.RELEASE_CAUSE"
                      :disabled="reddisad"
                      :placeholder="$t('goods.docu._21')"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-button v-if="$btnList.indexOf('UnLockSave') !== -1"
                 style="width: 100%;font-weight: 600;color: red;"
                 @click="unlockSave">{{$t('goods.docu._22')}}</el-button>
    </el-form>
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
                 :loading="loading"
                 :data="overview"
                 :edit-config="{ trigger: 'click', showStatus: true }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }"
                 @cell-click="overviewCell">
        <vxe-table-column show-overflow
                          :title="$t('goods.docu._23')"
                          type="radio"
                          width="90"
                          align="center" />
        <vxe-table-column width="150"
                          field="HOLD_NUMBER"
                          :title="$t('goods.docu._7')" />
        <vxe-table-column min-width="250"
                          field="MAIN_CONDITION_CAPTION"
                          :title="$t('goods.docu._8')" />
        <vxe-table-column min-width="250"
                          field="MAIN_VALUE"
                          :title="$t('goods.docu._24')" />
        <vxe-table-column min-width="220"
                          field="SUBSIDIARY_CONDITION_CAPTION"
                          :title="$t('goods.docu._12')" />
        <vxe-table-column min-width="200"
                          field="SUBSIDIARY_VALUE"
                          :title="$t('goods.docu._25')" />
        <vxe-table-column width="150"
                          field="HOLD_ACTION_CAPTION"
                          :title="$t('goods.docu._10')" />
        <vxe-table-column width="150"
                          field="STATUS"
                          :title="$t('goods.docu._26')">
          <template v-slot="{ row }">
            <span v-if="row.STATUS === 'N'">{{ $t("goods.docu._27") }}</span>
            <span v-else>{{ $t("goods.docu._28") }}</span>
          </template>
        </vxe-table-column>
        <vxe-table-column width="150"
                          field="HOLD_QTY"
                          :title="$t('goods.docu._29')" />
        <vxe-table-column width="150"
                          field="HOLD_CAUSE"
                          :title="$t('goods.docu._30')" />
        <vxe-table-column min-width="160"
                          field="HOLD_EMPNO"
                          :title="$t('goods.docu._31')" />
        <vxe-table-column min-width="170"
                          field="RELEASE_CAUSE"
                          :title="$t('goods.docu._32')" />
        <vxe-table-column width="150"
                          field="RELEASE_EMPNO"
                          :title="$t('goods.docu._33')" />
        <vxe-table-column width="150"
                          field="HOLD_TIME"
                          :title="$t('goods.docu._34')" />
        <vxe-table-column width="150"
                          field="RELEASE_TIME"
                          :title="$t('goods.docu._35')" />
      </vxe-table>
    </div>
    <el-pagination :current-page="formData.Page"
                   :page-sizes="[15, 25, 35, 45]"
                   :page-size="formData.Limit"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="Maintotal"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange" />
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
                 :loading="DetailSloading"
                 :data="details"
                 :edit-config="{ trigger: 'click', mode: 'row', showStatus: true }"
                 :radio-config="{ labelField: 'name' }"
                 :checkbox-config="{ checkField: 'checked' }">
        <vxe-table-column field="HOLD_NUMBER"
                          :title="$t('goods.docu._7')"
                          min-width="150" />
        <vxe-table-column field="SN"
                          :title="$t('goods.docu._36')"
                          width="150" />
        <vxe-table-column field="CARTON_NO"
                          :title="$t('goods.docu._37')"
                          min-width="150" />
        <vxe-table-column field="PALLET_NO"
                          :title="$t('goods.docu._38')"
                          min-width="150" />
        <vxe-table-column field="MODEL"
                          :title="$t('goods.docu._39')"
                          width="150" />
        <vxe-table-column field="PART_NO"
                          :title="$t('goods.docu._40')"
                          min-width="200" />
        <vxe-table-column field="WO_NO"
                          :title="$t('goods.docu._41')"
                          min-width="160" />
        <vxe-table-column field="COMPONENT_SN"
                          :title="$t('goods.docu._42')"
                          width="150" />
        <vxe-table-column field="CUSTOMER_COMPONENT_PN"
                          :title="$t('goods.docu._43')"
                          min-width="190" />
        <vxe-table-column width="130"
                          field="STATUS"
                          :title="$t('goods.docu._44')">
          <template v-slot="{ row }">
            <el-switch disabled
                       v-model="row.STATUS"
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
                          :edit-render="{ name: 'input' }"
                          width="150" />
        <vxe-table-column field="CREATE_TIME"
                          :title="$t('goods.docu._51')"
                          width="150" />

        <vxe-table-column field="RELEASE_CAUSE"
                          :title="$t('goods.docu._32')"
                          :edit-render="{ name: 'input' }"
                          min-width="200" />
        <vxe-table-column field="RELEASE_EMPNO"
                          :title="$t('goods.docu._52')"
                          :edit-render="{ name: 'input' }"
                          width="150" />
        <vxe-table-column field="RELEASE_TIME"
                          :title="$t('goods.docu._35')"
                          :edit-render="{ name: 'input' }"
                          width="150" />
      </vxe-table>
    </div>
  </div>
</template>
<script>
import helper from '@/api/SfcsUnLockProduct'
import { mapGetters } from 'vuex'
const API = helper('SfcsUnLockProduct')
export default {
  name: 'document',
  data () {
    return {
      formData: {
        HOLD_NUMBER: '', // 单据
        HOLD_EMPNO: '', // 工号
        BEGIN_TIME: '', // 开始日期
        END_TIME: '', // 结束日期
        Page: 1,
        Limit: 15
      },
      daterange: '',
      overview: [],
      Maintotal: 0,
      loading: false,
      form: {
        name: ''
      },
      reddisad: false,
      saveData: {
        ID: 0, // 主表ID
        HOLD_NUMBER: '', // 单据
        RELEASE_CAUSE: '', // 解锁原因
        User_Name: '' // 操作人员
      },
      details: [],
      DetailSloading: false
    }
  },
  computed: {
    ...mapGetters(['userinfo'])
  },
  created () {
    this.saveData.User_Name = this.userinfo.USER_NAME
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    // 获取下拉列表
    async getIndex () {
      const res = await API.Index()
      console.log(res, '获取下拉列表')
    },
    async getLoadData () {
      this.loading = true
      const res = await API.LoadData(this.formData)
      this.loading = false
      this.overview = res.Result
      this.Maintotal = res.TotalCount
      console.log(res, '主表')
    },
    // 搜索
    doFilter () {
      if (this.daterange) {
        this.formData.BEGIN_TIME = this.daterange[0]
        this.formData.END_TIME = this.daterange[1]
      } else {
        this.formData.BEGIN_TIME = ''
        this.formData.END_TIME = ''
      }
      this.formData.Page = 1
      this.getLoadData()
    },
    // 主表分页
    handleSizeChange (val) {
      this.formData.Limit = val
      this.getLoadData()
    },
    handleCurrentChange (val) {
      this.formData.Page = val
      this.getLoadData()
    },
    // 点击选中
    overviewCell ({ row }) {
      this.form = row
      this.saveData.ID = this.form.ID
      this.saveData.HOLD_NUMBER = this.form.HOLD_NUMBER
      if (row.STATUS === 'N') {
        this.reddisad = true
      } else {
        this.reddisad = false
      }
      this.GetDetail(row.ID)
      console.log(row, '点击选中')
    },
    async GetDetail (e) {
      this.DetailSloading = true
      const res = await API.GetDetailData(e)
      this.DetailSloading = false
      this.details = res.Result
    },
    // 保存解锁
    unlockSave () {
      this.saveData.RELEASE_CAUSE = this.form.RELEASE_CAUSE
      if (this.saveData.ID === 0) {
        this.$message({
          showClose: true,
          message: this.$t('goods.docu._53'),
          type: 'warning'
        })
        return
      }
      console.log(this.saveData.RELEASE_CAUSE, 'this.saveData.RELEASE_CAUSE ')
      if (this.saveData.RELEASE_CAUSE === '' || this.saveData.RELEASE_CAUSE === null) {
        this.$message({
          showClose: true,
          message: this.$t('goods.docu._21'),
          type: 'warning'
        })
        return
      }
      if (this.reddisad) {
        this.$message({
          showClose: true,
          message: this.$t('goods.docu._55'),
          type: 'warning'
        })
        return
      }
      this.$confirm(this.$t('goods.docu._56'), this.$t('goods._3'), {
        confirmButtonText: this.$t('goods._4'),
        cancelButtonText: this.$t('goods._5'),
        type: 'warning'
      }).then(() => {
        API.UnLockBillSave(this.saveData).then(res => {
          if (res.Result) {
            this.$refs.form.resetFields()
            this.getLoadData()
            this.$notify({
              title: this.$t('goods._1'),
              message: this.$t('goods._2'),
              type: 'success',
              duration: 2000
            })
          }
        })
      }).catch(() => { })
    },
    eliminateClick () {
      this.form = {}
      this.getLoadData()
      this.details = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
<style>
.overview {
  height: calc(100vh - 525px - 105px);
}
</style>
