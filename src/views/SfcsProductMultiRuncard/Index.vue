<template>
  <d2-container class="SfcsProductMultiRuncard">
    <template slot="header">
      <custom-container-header :isExport="false"
                               :isExportTpl="false"
                               :isImport="false">
        <el-input v-model="formData.part_no"
                  :placeholder="$t('spmr._1')"
                  clearable
                  style="width:200px"
                  @change="searchClick" />&nbsp;
        <el-select v-model="formData.route_id"
                   clearable
                   :placeholder="$t('spmr._5')">
          <el-option v-for="item in ParentCustom"
                     :key="item.ID"
                     :label="item.ROUTE_NAME"
                     :value="item.ID" />
        </el-select>&nbsp;
        <el-button type="primary"
                   icon="el-icon-search"
                   @click.prevent="LoadClick">{{ $t("ssc_rd.sh") }}</el-button>&nbsp;
        <el-button type="success"
                   icon="el-icon-plus"
                   @click.prevent="addClick"
                   v-if="$btnList.indexOf('SfcsProductMultiRuncardAdd') !== -1">{{ $t("srrr._38") }}</el-button>&nbsp;
        <el-button type="danger"
                   icon="el-icon-delete"
                   @click.prevent="eliminateClick">{{ $t("spf._5") }}</el-button>
        <el-button type="success"
                   icon="el-icon-check"
                   @click.prevent="preserveClick"
                   v-if="$btnList.indexOf('SfcsProductMultiRuncardEdit') !== -1">{{ $t("spmr._4") }}</el-button>
      </custom-container-header>
    </template>
    <div class="SfcsProductMultiRuncard-table">
      <vxe-table ref="xTable"
                 border
                 resizable
                 height="100%"
                 size="medium"
                 align="center"
                 highlight-current-row
                 highlight-hover-row
                 show-overflow
                 auto-resize
                 keep-source
                 stripe
                 :data="mainTable"
                 :edit-rules="validRules"
                 :mouse-config="{ selected: true }"
                 :edit-config="{
          trigger: 'click',
          mode: 'cell',
          activeMethod: activeCellMethod
        }"
                 :radio-config="{ labelField: 'name', trigger: 'row' }"
                 :checkbox-config="{ checkField: 'checked', trigger: 'row' }">
        <vxe-table-column field="LINK_OPERATION_CODE"
                          :title="$t('spmr._6')"
                          disabled
                          :edit-render="{ name: 'select', options: SfcsOperationsbox }" />
        <vxe-table-column field="BREAK_OPERATION_CODE"
                          :title="$t('spmr._7')"
                          :edit-render="{ name: 'select', options: SfcsOperationsbox }" />
        <vxe-table-column field="ENABLED"
                          :title="$t('spmr._8')"
                          :edit-render="{ autofocus: '.custom-input', type: 'visible' }">
          <template v-slot:edit="{ row }">
            <div class="rddselect">
              <el-switch v-model="row.ENABLED"
                         :active-text="$t('spmr._18')"
                         :inactive-text="$t('spmr._19')"
                         active-color="#13ce66"
                         inactive-color="#cccccc"
                         active-value="Y"
                         inactive-value="N" />
            </div>
          </template>
        </vxe-table-column>
      </vxe-table>
    </div>
    <el-dialog v-dialogDrag
               :close-on-click-modal="false"
               :title="$t('spmr._26')"
               :visible.sync="dialogVisible"
               width="30%">
      <el-form :model="formAdd"
               :show-message="false"
               ref="formAdd"
               label-width="0px">
        <el-form-item>
          <el-input v-model="formAdd.part_no"
                    :placeholder="$t('spmr._1')"
                    clearable
                    style="width:100%"
                    @change="searchAddClick" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="formAdd.route_id"
                     clearable
                     :placeholder="$t('spmr._5')"
                     style="width:100%"
                     @change="customClick">
            <el-option v-for="item in AddParentCustom"
                       :key="item.ID"
                       :label="item.ROUTE_NAME"
                       :value="item.ID" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formAdd.LINK_OPERATION_CODE"
                     disabled
                     :placeholder="$t('spmr._6')"
                     style="width:100%">
            <el-option v-for="item in AddSfcsOperations"
                       :key="item.ID"
                       :label="item.DESCRIPTION"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formAdd.BREAK_OPERATION_CODE"
                     :placeholder="$t('spmr._9')"
                     style="width:100%">
            <el-option v-for="item in AddSfcsOperations"
                       :key="item.ID"
                       :label="item.DESCRIPTION"
                       :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <span style="display: inline-block;
    padding-right: 10px;">{{ $t("spmr._8") }}</span>
          <el-switch v-model="formAdd.ENABLED"
                     :active-text="$t('spmr._18')"
                     :inactive-text="$t('spmr._19')"
                     active-color="#13ce66"
                     inactive-color="#cccccc"
                     active-value="Y"
                     inactive-value="N" />
        </el-form-item>
        <el-form-item>
          <span class="dialog-footer"
                style="display: inline-block;width: 100%;text-align: center;">
            <el-button @click="dialogVisible = false">{{$t('spmr._28')}}</el-button>
            <el-button type="primary"
                       @click="addVisible">{{$t('spmr._29')}}</el-button>
          </span>
        </el-form-item>
      </el-form>
    </el-dialog>
  </d2-container>
</template>
<script>
import helper from '@/api/SfcsProductMultiRuncard'
import customContainerHeader from '@/components/custom-container-header'
import { LoadData } from '@/api/SfcsRoutes'
const API = helper('SfcsProductMultiRuncard')
export default {
  name: 'SfcsProductMultiRuncard',
  components: {
    customContainerHeader
  },
  data () {
    return {
      dialogVisible: false,
      disa: false,
      ParentCustom: [],
      ParentCustombox: [],
      SfcsOperations: [],
      SfcsOperationsbox: [],

      AddParentCustom: [],
      AddParentCustombox: [],
      AddSfcsOperations: [],
      AddSfcsOperationsbox: [],
      disabled: false,
      formData: {
        part_no: '',
        route_id: ''
      },
      mainTable: [],
      validRules: {
        BREAK_OPERATION_CODE: [
          {
            required: true,
            message: this.$t('spmr._9')
          }
        ]
      },
      form: {
        insertRecords: [],
        updateRecords: [],
        removeRecords: []
      },
      formAdd: {
        ID: 0,
        part_no: '',
        route_id: '',
        LINK_OPERATION_CODE: '', // 连板工序
        BREAK_OPERATION_CODE: '', // 拆板工序
        ENABLED: 'Y'
      }
    }
  },
  created () {
    this.getIndex()
    this.getLoadData()
  },
  methods: {
    async getLoadData () {
      const res = await LoadData()
      console.log(res)
      this.ParentCustom = res.Result
      this.ParentCustombox.push({
        label: '',
        value: '',
        disabled: false
      })
      this.ParentCustom.map(item => {
        this.ParentCustombox.push({
          label: item.ROUTE_NAME,
          value: Number(item.ID),
          disabled: false
        })
      })
    },
    activeCellMethod ({ column, columnIndex }) {
      if (columnIndex === 0) {
        return false
      }
      return true
    },
    async getIndex () {
      const res = await API.Index()
      if (res.Result) {
      }
    },
    // 新增
    addClick () {
      this.formAdd = {
        ID: 0,
        part_no: '',
        route_id: '',
        LINK_OPERATION_CODE: '', // 连板工序
        BREAK_OPERATION_CODE: '', // 拆板工序
        ENABLED: 'Y'
      }
      this.dialogVisible = true
    },
    searchAddClick () {
      if (this.formAdd.part_no !== '') {
        this.GetRoutes()
      }
    },
    async GetRoutes () {
      this.loading = true
      const res = await API.GetRoutesList(this.formAdd.part_no)
      if (res.Result) {
        this.AddParentCustom = res.Result
        this.AddParentCustombox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.AddParentCustom.map(item => {
          this.AddParentCustombox.push({
            label: item.ROUTE_NAM,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.disa = true
      } else {
        this.formAdd.part_no = ''
        this.disa = false
      }
    },
    // 添加
    async customClick () {
      if (this.formAdd.part_no === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._1'),
          type: 'warning'
        })
        return
      }
      if (this.formAdd.route_id === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._5'),
          type: 'warning'
        })
        return
      }
      this.AddSfcsOperations = []
      this.AddSfcsOperationsbox = []
      const res = await API.LoadData(this.formAdd)
      if (res.Result) {
        this.AddSfcsOperations = res.Result.SfcsOperations
        this.AddSfcsOperationsbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.SfcsOperations.map(item => {
          this.AddSfcsOperationsbox.push({
            label: item.DESCRIPTION,
            value: Number(item.Id),
            disabled: false
          })
        })
        if (res.Result.MultiRuncard !== null) {
          this.formAdd.route_id = ''
          this.$message({
            showClose: true,
            message: this.$t('spmr._27'),
            type: 'warning'
          })
        } else {
          var optionid = 0
          this.AddSfcsOperations.map((i, v) => {
            if (v === 0) {
              optionid = i.Id
            }
          })
          this.formAdd.LINK_OPERATION_CODE = optionid
        }
        this.disabled = true
      }
    },
    // 新增确定保存
    addVisible () {
      if (this.formAdd.part_no === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._1'),
          type: 'warning'
        })
        return
      }
      if (this.formAdd.route_id === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._5'),
          type: 'warning'
        })
        return
      }
      if (this.formAdd.BREAK_OPERATION_CODE === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._9'),
          type: 'warning'
        })
        return
      }
      API.SaveData(this.formAdd).then(response => {
        if (response.Result !== void 0) {
          this.$notify({
            title: this.$t('spmr._20'),
            message: this.$t('spmr._21'),
            type: 'success',
            duration: 2000
          })
          this.formAdd = {
            ID: 0,
            part_no: '',
            route_id: '',
            LINK_OPERATION_CODE: '', // 连板工序
            BREAK_OPERATION_CODE: '', // 拆板工序
            ENABLED: 'N'
          }
          this.dialogVisible = false
        }
      })
    },
    // 查询数据(制程工序列表及连板配置)
    async LoadClick () {
      if (this.formData.part_no === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._1'),
          type: 'warning'
        })
        return
      }
      if (this.formData.route_id === '') {
        this.$message({
          showClose: true,
          message: this.$t('spmr._5'),
          type: 'warning'
        })
        return
      }
      this.SfcsOperations = []
      this.SfcsOperationsbox = []
      const res = await API.LoadData(this.formData)
      if (res.Result) {
        this.SfcsOperations = res.Result.SfcsOperations
        this.SfcsOperationsbox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.SfcsOperations.map(item => {
          this.SfcsOperationsbox.push({
            label: item.DESCRIPTION,
            value: Number(item.Id),
            disabled: false
          })
        })
        this.mainTable = []
        if (res.Result.MultiRuncard !== null) {
          const record = {
            ID: res.Result.MultiRuncard.ID,
            PART_NO: res.Result.MultiRuncard.PART_NO, // 料号
            LINK_OPERATION_CODE: res.Result.MultiRuncard.LINK_OPERATION_CODE, // 连板工序
            BREAK_OPERATION_CODE: res.Result.MultiRuncard.BREAK_OPERATION_CODE, // 拆板工序
            ENABLED: res.Result.MultiRuncard.ENABLED
          }
          this.mainTable.push(record)
        }
        this.disabled = true
      } else {
        this.mainTable = []
      }
    },
    // 搜索
    searchClick () {
      if (this.formData.part_no !== '') {
        this.GetRoutesList()
      }
    },
    async GetRoutesList () {
      this.loading = true
      const res = await API.GetRoutesList(this.formData.part_no)
      if (res.Result) {
        this.ParentCustom = res.Result
        this.ParentCustombox.push({
          label: '',
          value: '',
          disabled: false
        })
        this.ParentCustom.map(item => {
          this.ParentCustombox.push({
            label: item.ROUTE_NAM,
            value: Number(item.ID),
            disabled: false
          })
        })
        this.disa = true
      } else {
        this.formData.part_no = ''
        this.disa = false
      }
    },
    //  保存
    preserveClick () {
      var postdata = this.$refs.xTable.getRecordset()
      if (
        postdata.insertRecords.length ||
        postdata.removeRecords.length ||
        postdata.updateRecords.length
      ) {
        this.$refs.xTable.validate(valid => {
          if (valid) {
            this.form.insertRecords = postdata.insertRecords
            this.form.updateRecords = postdata.updateRecords
            this.form.removeRecords = postdata.removeRecords
            console.log(this.form, 'this.formthis.form')
            API.SaveData(this.form.updateRecords[0]).then(response => {
              if (response.Result) {
                this.$notify({
                  title: this.$t('spmr._20'),
                  message: this.$t('spmr._21'),
                  type: 'success',
                  duration: 2000
                })
              }
              this.LoadClick()
            })
          }
        })
      } else {
        this.$message({
          showClose: true,
          message: this.$t('spmr._22'),
          type: 'warning'
        })
      }
    },
    //  清除
    eliminateClick () {
      this.mainTable = []
      this.formData = {
        part_no: '',
        route_id: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.SfcsProductMultiRuncard-table {
  height: calc(100vh - 175px);
}
</style>
